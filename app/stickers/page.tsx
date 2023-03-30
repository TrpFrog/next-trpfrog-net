import type {NextPage} from 'next'
import Link from "next/link";
import Image from "next/legacy/image";
import Title from "../../components/Title";
import Block from "../../components/Block";
import styles from "../../styles/stickers.module.scss";
import NextSeoWrapper from "../../components/utils/NextSeoWrapper";

export default function Index() {
  return (
    <div id="main_wrapper">
      <NextSeoWrapper description={'つまみスタンプ素材集'}/>
      <Title title={'スタンプ素材集'}>
        <p>
          つまみスタンプの元画像の5倍に拡大したやつです。<br/>
          良識の範囲内でご自由にどうぞ。(Twitterの会話とか)
        </p>
        <a href={'https://store.line.me/stickershop/product/8879469/ja'}>LINEスタンプ発売中！</a>
      </Title>
      <Block>
        <div className={styles.icon_grid}>
          {Array.from(Array(80), (v, k) => k).map(i => (
            // @ts-ignore
            (<Link href={'/stickers/' + i} key={i}>
              <Image
                src={'stickers/' + i}
                width={100}
                height={100}
                objectFit={'contain'}
                quality={15}
                alt={i + '番目のスタンプ画像'}
              />
            </Link>)
          ))}
        </div>
      </Block>
    </div>
  );
}
