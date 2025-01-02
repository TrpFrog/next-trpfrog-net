'use client'
import { useState } from 'react'
import * as React from 'react'

type Props = {
  key?: React.Key
  primaryButtonText: string
  primaryChildren: React.ReactNode
  secondaryChildren: React.ReactNode
  secondaryButtonText: string
}

export function SwitchUI(props: Props) {
  const [showPrimary, setShowPrimary] = useState(true)
  return (
    <React.Fragment key={props.key}>
      {showPrimary ? (
        <p>
          <button
            onClick={() => {
              setShowPrimary(false)
            }}
          >
            {props.primaryButtonText}
          </button>
        </p>
      ) : (
        <p>
          <button
            onClick={() => {
              setShowPrimary(true)
            }}
          >
            {props.secondaryButtonText}
          </button>
        </p>
      )}
      {showPrimary ? props.primaryChildren : props.secondaryChildren}
    </React.Fragment>
  )
}
