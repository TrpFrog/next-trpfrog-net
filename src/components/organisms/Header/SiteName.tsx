import { useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'

import { SITE_NAME } from '@/lib/constants'
import { tv } from '@/lib/tailwind/variants'

export type TitleWithPageNameProps = {
  siteTitle?: string
  pageTitle?: string
  showPageTitle?: boolean
}

const createStyles = tv({
  slots: {
    wrapper: [
      'tw-items-left tw-translate-y-0.5 *:tw-leading-none',
      'tw-flex tw-flex-col tw-gap-0.5 tw-text-white hover:tw-text-trpfrog-50',
    ],
    title: 'tw-text-[1.7rem] tw-font-extrabold sp:tw-text-[1.4rem]',
    subtitle: 'tw-line-clamp-1 tw-text-base tw-font-semibold sp:tw-text-[11px]',
  },
  variants: {
    showPageTitle: {
      false: {
        subtitle: 'tw-hidden',
      },
    },
  },
})

function usePageTitle() {
  const [pageTitle, setPageTitle] = useState('')
  const pathname = usePathname()
  useEffect(() => {
    window.setTimeout(() => {
      setPageTitle(document?.title.split(' - ')[0] ?? '')
    }, 500)
  }, [pathname])
  return pageTitle
}

export function SiteName(props: TitleWithPageNameProps) {
  const pathname = usePathname() ?? '/'
  const siteTitle =
    props.siteTitle ??
    (pathname.startsWith('/blog/') ? 'つまみログ' : SITE_NAME)
  const pageTitleFromHook = usePageTitle()
  const pageTitle = props.pageTitle ?? pageTitleFromHook

  const styles = createStyles({ showPageTitle: props.showPageTitle ?? false })

  return (
    <div className={styles.wrapper()}>
      <h1 className={styles.title()}>{siteTitle}</h1>
      {pageTitle ? <h2 className={styles.subtitle()}>{pageTitle}</h2> : null}
    </div>
  )
}
