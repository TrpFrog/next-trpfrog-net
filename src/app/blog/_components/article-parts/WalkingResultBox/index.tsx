import React from 'react'

import { ArticleParts } from '@blog/_components/ArticleParts'
import { parseColonSeparatedList } from '@blog/_lib/rawTextParser'

import styles from './index.module.scss'

export const walkingResultBoxParts = {
  name: 'result-box',
  Component: ({ content }) => {
    const data = parseColonSeparatedList(content)
    return (
      <div className={styles.result_box_grid}>
        {data.map(({ key: title, value }) => {
          return (
            <div key={title} className={styles.result_box}>
              <div className={styles.result_box_title}>{title}</div>
              <div className={styles.result_box_value}>{value}</div>
            </div>
          )
        })}
      </div>
    )
  },
} as const satisfies ArticleParts
