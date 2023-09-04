import BlogPost from '@blog/_lib/blogPost'
import { BlogImageData } from '@blog/_lib/imagePropsFetcher'
import React from 'react'

export type IsomorphicArticlePartsProps = {
  content: string
  entry?: BlogPost
  imageSize?: { [path: string]: BlogImageData }
}

export type IsomorphicArticleParts =
  | ((props: IsomorphicArticlePartsProps) => React.ReactNode)
  | React.ExoticComponent<IsomorphicArticlePartsProps>