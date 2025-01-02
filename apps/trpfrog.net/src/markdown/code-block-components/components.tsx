import { cautionCCBC, infoboxCCBC } from './definitions/alert'
import {
  centeringCCBC,
  centeringWithSizeBoldCCBC,
  centeringWithSizeCCBC,
} from './definitions/centering'
import { conversationCCBC } from './definitions/conversation'
import { dangerouslySetInnerHtmlCCBC } from './definitions/dangerously-set-inner-html'
import { defineComponentCCBC, useDefinedComponentCCBC } from './definitions/define-component'
import { horizontalImagesCCBC } from './definitions/horizontal-images'
import { horizontalScrollCCBC } from './definitions/horizontal-scroll'
import { ignoreReadCountCCBC } from './definitions/ignore-read-count'
import { linkEmbedCCBC } from './definitions/link-embed'
import { mermaidCCBC } from './definitions/mermaid'
import { nextPageCCBC } from './definitions/next-page'
import { profileCardsCCBC } from './definitions/profile-cards'
import { resultBoxCCBC } from './definitions/result-box'
import { deprecatedShowAllCCBC } from './definitions/show-all'
import { titledFrameCCBC } from './definitions/titled-frame'
import { twitterCCBC } from './definitions/twitter'
import { twitterArchivedCCBC } from './definitions/twitter-archived'
import { markdownUseEffectCCBC } from './definitions/use-effect'
import { autoYouTubeCCBC, youtubeCCBC } from './definitions/youtube'
import { CustomCodeBlockComponent } from './types'

// prettier-ignore
export const components = {
  'next-page': nextPageCCBC,
  'conversation': conversationCCBC,
  'link-embed': linkEmbedCCBC,
  'horizontal-scroll': horizontalScrollCCBC,
  'horizontal-images': horizontalImagesCCBC,
  'youtube': youtubeCCBC,
  'auto-youtube': autoYouTubeCCBC,
  'centering': centeringCCBC,
  'centering-with-size': centeringWithSizeCCBC,
  'centering-with-size-bold': centeringWithSizeBoldCCBC,
  'ignore-read-count': ignoreReadCountCCBC,
  'dangerously-set-inner-html': dangerouslySetInnerHtmlCCBC,
  'mermaid': mermaidCCBC,
  'titled-frame': titledFrameCCBC,
  'caution': cautionCCBC,
  'infobox': infoboxCCBC,
  'twitter': twitterCCBC,
  'twitter-archived': twitterArchivedCCBC,
  'profile-cards': profileCardsCCBC,
  'result-box': resultBoxCCBC,
  'show-all': deprecatedShowAllCCBC,
  'use-effect': markdownUseEffectCCBC,
  'define-component': defineComponentCCBC,
  'use-defined-component': useDefinedComponentCCBC,
} as const satisfies Record<string, CustomCodeBlockComponent>
