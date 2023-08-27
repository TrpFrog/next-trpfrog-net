'use client';

import "easymde/dist/easymde.min.css";
import React, {useCallback, useMemo} from "react";

import dynamic from 'next/dynamic'
import {useKeyboardEvent, useUnmountEffect} from "@react-hookz/web";
import type { SimpleMDEReactProps } from "react-simplemde-editor";
import useSparseCallback from "@/hooks/useSparseCallback";
import toast from "react-hot-toast";
import {setTimeoutPromise} from "@/lib/setTimeoutPromise";
import type {UploadApiResponse} from "cloudinary";
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

type Props = {
  rawMarkdown: string
  setPost: ((value: string) => void)
  slug: string
}

function useSaveArticle(slug: string, articleText: string, delayMs: number) {
  const [alreadySaved, setAlreadySaved] = React.useState(true)

  const isSaveKeyPressed = useCallback((e: KeyboardEvent) => (
    ((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey)) && e.key == 's'
  ), [])

  useKeyboardEvent(isSaveKeyPressed, (e) => {
    e.preventDefault()

    if (alreadySaved) {
      toast('Already saved!', { icon: '👍', duration: 2000 })
      return
    }

    void toast.promise(
      setTimeoutPromise(() => {
        setAlreadySaved(false)
        void fetch(`/blog/edit/${slug}/api/save`, {
          method: 'POST',
          body: articleText,
        })
      }, delayMs),
      {
        loading: 'Saving...',
        success: <b>Saved!</b>,
        error: <b>Something went wrong...</b>,
      }
    )
  }, [slug, articleText, setAlreadySaved])

  useUnmountEffect(() => {
    if (!alreadySaved) {
      alert('You have unsaved changes! Please save before leaving the page.')
    }
  })

  return {
    markAsUnsaved: useCallback(() => setAlreadySaved(false), [setAlreadySaved])
  }
}

function useUploadFunction(slug: string) {
  return useCallback((
    file: File,
    onSuccess: (imageUrl: string) => void,
    onError: (errorMessage: string) => void
  ) => {
    const formData = new FormData()
    formData.append('image', file)

    const uploadPromise = toast.promise(
      (async () => {
        const res = await fetch(`/blog/edit/${slug}/api/upload-image`, {
          method: 'POST',
          body: formData,
        })
        if (!res.ok) {
          throw new Error(`Upload failed (${res.status} ${res.statusText})`)
        }
        return res
      })(),
      {
        loading: 'Uploading...',
        success: <b>Uploaded!</b>,
        error: <b>Something went wrong...</b>,
      }
    )
    uploadPromise
      .then(res => res.json())
      .then(({ data: { format, public_id} }: { data: UploadApiResponse }) => {
        onSuccess(`/${public_id}.${format}`)
      })
      .catch(err => onError(err.message))
  }, [slug])
}

function useToastErrorCallback() {
  return useCallback((errorMessage: string) => {
    console.error(errorMessage)
    toast.error(errorMessage, { duration: 6000 })
  }, [])
}

export default React.memo(function Editor({ setPost, slug, rawMarkdown }: Props) {

  const delayMs = 2000
  const { markAsUnsaved } = useSaveArticle(slug, rawMarkdown, delayMs)
  const sparseSetter = useSparseCallback(setPost, [setPost], delayMs)

  const changeHandler = useCallback((value: string) => {
    markAsUnsaved()
    sparseSetter(value)
  }, [sparseSetter, markAsUnsaved])

  const imageUploadFunction = useUploadFunction(slug)
  const errorCallback = useToastErrorCallback()

  const options = useMemo(() => ({
    renderingConfig: {
      codeSyntaxHighlighting: false,
    },
    unorderedListStyle: '-',

    uploadImage: true,
    imageUploadFunction,

    nativeSpellcheck: false,
    errorCallback,
  } satisfies SimpleMDEReactProps['options']), [imageUploadFunction, errorCallback])

  return (
    <>
      <SimpleMDE
        value={rawMarkdown}
        onChange={changeHandler}
        options={options}
      />
    </>
  )
})
