'use client'

import { useId, useState } from 'react'

import { useReward } from 'react-rewards'
import seedrandom from 'seedrandom'
import { match } from 'ts-pattern'

import * as styles from './index.css.ts'

import useSound from '@/../node_modules/use-sound'

export const balloonColors = ['blue', 'green', 'orange'] as const

type BalloonProps = {
  className?: string
  width: string
  height: string
  isBurst: boolean
  color: (typeof balloonColors)[number] | 'random'
  onBurst?: () => void
}

export function useBalloonSound() {
  const [isSoundEnabled, setSoundEnabled] = useState(false)
  const soundURL =
    'https://res.cloudinary.com/trpfrog/video/upload/v1652447772/balloon/break-immeditary.mp3'
  const [playFunction] = useSound(soundURL, { interrupt: false })
  const playSound = isSoundEnabled ? playFunction : () => {}
  return { isSoundEnabled, setSoundEnabled, playSound }
}

const colors: Record<(typeof balloonColors)[number], string[]> = {
  // Generated by GPT-3.5
  blue: [
    '#00FFFF', // Cyan
    '#40E0D0', // Turquoise
    '#00CED1', // Dark Turquoise
    '#20B2AA', // Light Sea Green
    '#00BFFF', // Deep Sky Blue
  ],
  green: [
    '#B4D455', // Light Yellow Green
    '#9ACD32', // Medium Yellow Green
    '#7FFF00', // Chartreuse
    '#7CFC00', // Lawn Green
    '#ADFF2F', // Green Yellow
  ],
  orange: [
    '#FFA500', // Orange
    '#FF8C00', // Dark Orange
    '#FF7F50', // Coral
    '#FF6347', // Tomato
    '#FF4500', // Orange Red
  ],
}

export const Balloon = (props: BalloonProps) => {
  const balloonId = useId()
  const { playSound } = useBalloonSound()
  const [seed] = useState(balloonId + Date.now().toString())

  const color =
    props.color === 'random'
      ? balloonColors[Math.floor(seedrandom(seed)() * balloonColors.length)]
      : props.color

  const { reward } = useReward(balloonId, 'confetti', {
    zIndex: 100,
    startVelocity: 8,
    elementCount: 35,
    decay: 0.95,
    elementSize: 6,
    spread: 50,
    position: 'absolute',
    colors: colors[color],
  })

  const ariaLabel = match({ isBurst: props.isBurst, color })
    .with({ isBurst: true }, () => '割れた風船')
    .with({ color: 'blue' }, () => '青い風船')
    .with({ color: 'green' }, () => '緑の風船')
    .with({ color: 'orange' }, () => 'オレンジの風船')
    .exhaustive()

  return (
    <button
      suppressHydrationWarning={props.color === 'random'}
      style={{
        width: props.width,
        height: props.height,
        backgroundSize: `${props.width} ${props.height}`,
      }}
      disabled={props.isBurst}
      aria-label={ariaLabel}
      className={`${styles.balloon} ${props.className}`}
      data-broken-balloon={props.isBurst}
      data-balloon-color={color}
      onClick={() => {
        if (!props.isBurst) {
          playSound()
          reward()
          props.onBurst?.()
        }
      }}
    >
      <span className="tw-inline-block" id={balloonId} />
    </button>
  )
}
