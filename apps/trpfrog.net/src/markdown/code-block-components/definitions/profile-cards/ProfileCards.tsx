import { Fragment } from 'react'

import { createURL } from '@trpfrog.net/utils'
import { addDays, format } from 'date-fns'
import { z } from 'zod'

import { InlineLink } from '@/components/atoms/InlineLink'
import { RichButton } from '@/components/atoms/RichButton'
import { A, Li, UnorderedList } from '@/components/wrappers'

import styles from './ProfileCards.module.css'
import { SwitchUI } from './SwitchUI'

export const profileDataSchema = z.object({
  name: z.string(),
  club: z.string().optional(),
  twitter: z.string().optional(),
  description: z.string(),
})

export type ProfileData = z.infer<typeof profileDataSchema>

async function CardFormat({ personalDataList }: { personalDataList: ProfileData[] }) {
  const { RenderMarkdown } = await import('@/markdown/RenderMarkdown')
  return (
    <div className={styles.profile_card_grid}>
      {personalDataList.map(personalData => (
        <div className={styles.profile_card} key={personalData.name}>
          <div className={styles.header}>
            <div className={styles.club}>{personalData.club}</div>
            <div className={styles.twitter_id}>
              <InlineLink href={'https://twitter.com/' + personalData.twitter}>
                @{personalData.twitter}
              </InlineLink>
            </div>
          </div>
          <div className={styles.name}>
            {personalData.name}
            <span style={{ fontSize: '0.8em' }}>
              {personalData.name === 'つまみ' ? ' (筆者)' : 'さん'}
            </span>
          </div>
          <div className={styles.description}>
            <RenderMarkdown markdown={personalData.description} mode="inline" />
          </div>
        </div>
      ))}
    </div>
  )
}

async function ListFormat({ personalDataList }: { personalDataList: ProfileData[] }) {
  const { RenderMarkdown } = await import('@/markdown/RenderMarkdown')
  return (
    <UnorderedList>
      {personalDataList.map(personalData => (
        <Fragment key={personalData.name}>
          <Li>
            {personalData.name}
            {personalData.name === 'つまみ' ? ' (筆者)' : 'さん'}
          </Li>
          <UnorderedList key={personalData.name + '-info'}>
            <Li>{personalData.club}</Li>
            <Li>
              <InlineLink href={'https://twitter.com/' + personalData.twitter}>
                @{personalData.twitter}
              </InlineLink>
            </Li>
            <Li>
              <RenderMarkdown markdown={personalData.description} mode="inline" />
            </Li>
          </UnorderedList>
        </Fragment>
      ))}
    </UnorderedList>
  )
}

export function ProfileCards(props: { profileDataList: ProfileData[]; held?: string }) {
  const { profileDataList, held } = props

  const twitterSearchLink = createURL('/search', 'https://twitter.com/', {
    q: profileDataList.map(e => 'from:' + e.twitter).join(' OR '),
    until: held ? format(addDays(held, 1), 'yyyy-MM-dd') + '_04:00:00_JST' : '',
    f: 'live',
    pf: 'on',
  })

  return (
    <>
      <SwitchUI
        primaryChildren={<CardFormat personalDataList={profileDataList} />}
        primaryButtonText={'リスト表示に切り替え'}
        secondaryChildren={<ListFormat personalDataList={profileDataList} />}
        secondaryButtonText={'カード表示に切り替え'}
      />
      {twitterSearchLink !== '' && (
        <RichButton as={A} openInNewTab href={twitterSearchLink}>
          当日の同行者のツイートを見る
        </RichButton>
      )}
    </>
  )
}
