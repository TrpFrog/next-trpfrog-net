import styles from './ResultBox.module.css'

export function ResultBox(props: { record: { key: string; value: string }[] }) {
  return (
    <div className={styles.result_box_grid}>
      {props.record.map(({ key: title, value }) => {
        return (
          <div key={title} className={styles.result_box}>
            <div className={styles.result_box_title}>{title}</div>
            <div className={styles.result_box_value}>{value}</div>
          </div>
        )
      })}
    </div>
  )
}
