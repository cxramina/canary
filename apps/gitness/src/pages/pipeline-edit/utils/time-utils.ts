/**
 * Formats timestamp, such as, "2024-09-10T13:38:55-07:00" is formatted as "1 hour ago"
 * @param timestamp
 * @returns formatted timestamp
 */
export const timeAgo = (timestamp: string): string => {
  const date = new Date(timestamp)
  const now = new Date()

  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second')
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return rtf.format(-diffInMinutes, 'minute')
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return rtf.format(-diffInHours, 'hour')
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) {
    return rtf.format(-diffInDays, 'day')
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return rtf.format(-diffInMonths, 'month')
  }

  const diffInYears = Math.floor(diffInMonths / 12)
  return rtf.format(-diffInYears, 'year')
}

/**
 * Formats epoch timestamp, such as, "1726260316887" is formatted as "1 hour ago"
 * @param timestamp
 * @returns formatted timestamp
 */
export const timeAgoFromEpochTime = (timestamp: number): string => {
  const now = Date.now()

  // Convert the difference from milliseconds to seconds
  const diffInSeconds = Math.floor((now - timestamp) / 1000)

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second')
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return rtf.format(-diffInMinutes, 'minute')
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return rtf.format(-diffInHours, 'hour')
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) {
    return rtf.format(-diffInDays, 'day')
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return rtf.format(-diffInMonths, 'month')
  }

  const diffInYears = Math.floor(diffInMonths / 12)
  return rtf.format(-diffInYears, 'year')
}

/**
 * @param startTs
 * @param endTs
 * @returns duration in "1h 2m 3s" format
 */
export const formatDuration = (startTs?: number, endTs?: number): string => {
  if (!startTs || !endTs) return '0s'

  const diffInSeconds = Math.floor((endTs - startTs) / 1000)

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

  const seconds = diffInSeconds % 60
  const minutes = Math.floor(diffInSeconds / 60) % 60
  const hours = Math.floor(diffInSeconds / 3600)

  let formattedDuration = ''

  if (hours > 0) {
    formattedDuration += `${rtf.format(-hours, 'hour')} `
  }
  if (minutes > 0 || hours > 0) {
    // Always show minutes if hours are present
    formattedDuration += `${rtf.format(-minutes, 'minute')} `
  }
  formattedDuration += `${rtf.format(-seconds, 'second')}`

  return formattedDuration.trim()
}
