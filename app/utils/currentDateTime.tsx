'use client'

import React, { useState, useEffect } from 'react'

interface CurrentDateTimeProps {
  diyStyle: string
  year?: boolean
  month?: boolean
  day?: boolean
  hours?: boolean
  minutes?: boolean
  seconds?: boolean
}

function getCurrentDateTime() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  return { year, month, day, hours, minutes, seconds }
}

export function CurrentDateTime({
  diyStyle,
  year,
  month,
  day,
  hours,
  minutes,
  seconds,
}: CurrentDateTimeProps) {
  // Starting from `null` (not `getCurrentDateTime()`) avoids a hydration
  // mismatch: `new Date()` evaluated during the server render will always
  // differ from the client's clock by however many seconds the request took,
  // so the "real" value can only be set once mounted client-side.
  const [currentDateTime, setCurrentDateTime] = useState<ReturnType<
    typeof getCurrentDateTime
  > | null>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see comment above the useState call: this intentionally differs from any server-rendered value
    setCurrentDateTime(getCurrentDateTime())
    const intervalId = setInterval(() => {
      setCurrentDateTime(getCurrentDateTime())
    }, 1000) // Update every second

    return () => clearInterval(intervalId) // Clean up interval on unmount
  }, [])

  if (!currentDateTime) {
    return <div className={diyStyle} />
  }

  return (
    <div className={diyStyle}>
      {year && currentDateTime.year}
      {month && `-${currentDateTime.month}`}
      {day && `-${currentDateTime.day}`}
      {(hours || minutes || seconds) && ' '}
      {hours && currentDateTime.hours}
      {minutes && `:${currentDateTime.minutes}`}
      {seconds && `:${currentDateTime.seconds}`}
    </div>
  )
}
