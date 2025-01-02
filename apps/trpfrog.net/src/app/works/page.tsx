import * as path from 'path'

import { Metadata } from 'next'

import { Image } from '@/components/atoms/Image'
import { MainWrapper } from '@/components/atoms/MainWrapper'
import { RichButton } from '@/components/atoms/RichButton'
import { Block } from '@/components/molecules/Block'
import { Title } from '@/components/organisms/Title'
import { A } from '@/components/wrappers'

import { formatDateToDisplay } from '@/lib/date'
import { readMarkdowns } from '@/lib/mdLoader'

import { Keywords } from './Keywords'
import { WorksFrontmatterSchema } from './schema'

import { RenderMarkdown } from '@/markdown/RenderMarkdown'

export const metadata = {
  title: 'Works',
  description: 'つまみさんの作った作品・ソフトウェア・Webサイトのまとめページです。',
} satisfies Metadata

export default async function Index() {
  // load all md files under /app/works/contents/*.md
  const contents = await readMarkdowns(
    path.join(process.cwd(), 'src', 'app', 'works', 'contents'),
    WorksFrontmatterSchema,
  )

  return (
    <MainWrapper gridLayout>
      <Title title={metadata.title} description={metadata.description}>
        <p>最終更新: 2023/5/31</p>
      </Title>
      {contents.map(({ metadata, content }) => {
        return (
          <Block key={metadata.title} title={metadata.title} h2icon={metadata.h2icon}>
            {metadata.image && (
              <Image
                className="tw-mx-auto tw-my-4 tw-bg-transparent"
                src={metadata.image?.path}
                width={metadata.image?.width}
                height={metadata.image?.height}
                alt={metadata.title + 'の画像'}
              />
            )}
            {metadata.keywords && <Keywords keywords={metadata.keywords} />}
            <p>
              <b>Released:</b> {formatDateToDisplay(metadata.date)}{' '}
            </p>
            <RenderMarkdown markdown={content} mode="block" />
            <p style={{ display: 'flex', flexFlow: 'row wrap', gap: '8px 6px' }}>
              {Object.entries(metadata.links ?? {}).map(([linkTxt, url]) => {
                return (
                  <RichButton as={A} openInNewTab key={linkTxt} href={url as string}>
                    {linkTxt}
                  </RichButton>
                )
              })}
            </p>
          </Block>
        )
      })}
    </MainWrapper>
  )
}
