import { Tweet as ReactTweet, TweetProps } from 'react-tweet'

import { InlineLink } from '@/components/atoms/InlineLink'

import { isTweetAvailable } from './actions'
import { TweetThemeDataWrapper } from './DataWrapper'

/**
 * Temporary fix for react-tweet
 * https://github.com/vercel/react-tweet/issues/135
 * @param props TweetProps
 * @constructor
 */
export async function Tweet(props: TweetProps) {
  const isAvailable = props.id ? await isTweetAvailable(props.id) : false
  const id = props.id

  props.fallback ??= (
    <p className="tw-italic tw-text-center">
      <b>Tweet not found</b>
      <br />
      <small>
        id = <InlineLink href={`https://twitter.com/trpfrog/status/${id}`}>{id}</InlineLink>
      </small>
    </p>
  )

  if (!isAvailable) {
    return props.fallback
  }

  return (
    <div className="tw-grid tw-place-items-center">
      <div style={{ width: 'min(550px, 100%)' }}>
        <TweetThemeDataWrapper>
          <ReactTweet {...props} />
        </TweetThemeDataWrapper>
      </div>
    </div>
  )
}
