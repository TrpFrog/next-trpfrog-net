import React from 'react'
import ReturnButton from './ReturnButton'
import MainWrapper from '@/components/atoms/MainWrapper'

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <MainWrapper>
      {children}
      <ReturnButton />
    </MainWrapper>
  )
}