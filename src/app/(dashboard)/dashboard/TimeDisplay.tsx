'use client'

import { ClockIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

export function TimeDisplay() {
    const [time, setTime] = useState<string>('')

    useEffect(() => {
        // Устанавливаем начальное время
        setTime(new Date().toLocaleTimeString())
        
        // Обновляем время каждую секунду
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className={`flex items-center space-x-2 text-muted-foreground`}>
            <ClockIcon className={`h-5 w-5`} />
            <span className={`text-sm`}>Last updated: {time}</span>
        </div>
    )
} 