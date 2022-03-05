export const getReadTimeSecond = (markdown: string) => {
    const imageRegex = new RegExp('\!\\[(.*?)\]\\(.*?\\)', 'g')
    const linkRegex = new RegExp('\\[(.*?)\]\\(.*?\\)', 'g')
    const linkRemoved = markdown.replace(imageRegex, '').replace(linkRegex, '$1')

    let codeRemoved = linkRemoved
        .split('```')
        .filter((e, index) =>
            index % 2 === 0
            || e.startsWith('centering')
        )
        .join('')
        .replace(/[ 　\n*#]/g, '')
        .replace(/centering/g, '')

    const twitterArchives = linkRemoved
        .split('```')
        .filter((e, index) => index % 2 === 1 && e.startsWith('twitter-archived'))
        .map(e => e
            .split('\n')
            .filter(l => l.startsWith('tweet:'))[0] // extract tweet line
            .slice('tweet:'.length).trim() // remove 'tweet:'
            .replace(/<.*?>/g, '') // remove tags
        ).join('')

    const images = (markdown.match(imageRegex) || []).length

    const length = images * 20 + codeRemoved.length + twitterArchives.length * 0.6

    return Math.floor(length * 60 / 700);
}

export const formatReadTime = (readTimeSec: number) => {
    let readMin = Math.floor(readTimeSec / 60)
    let readSec = Math.round((readTimeSec % 60) / 10) * 10
    if (readSec === 60) {
        readSec = 0
        readMin++
    }

    return {
        minutes: readMin.toString(),
        seconds: readSec !== 0 ? readSec.toString() : '00'
    }
}
