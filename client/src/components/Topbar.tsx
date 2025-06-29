'use client'

import { useEffect, useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { theme } from '@/config/theme'

interface TopbarProps {
  onMenuClick: () => void
}

const Topbar = ({ onMenuClick }: TopbarProps) => {
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatted = now.toLocaleString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      setTime(formatted)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="flex justify-between items-center p-4 shadow-md"
      style={{ backgroundColor: theme.colors.bgLight }}
    >
      {/* Hamburger */}
      <button
        onClick={onMenuClick}
        className="text-2xl md:hidden"
        style={{ color: theme.colors.primary }}
      >
        <FaBars />
      </button>

      {/* Dashboard Title */}
      <div
        className="text-lg font-semibold hidden md:block"
        style={{ color: theme.colors.textSecondary }}
      >
        Dashboard
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <div
          className="text-sm hidden sm:block"
          style={{ color: theme.colors.gray }}
        >
          {time}
        </div>

        <div className="flex items-center gap-2">
          <img
            src="/avatar.png"
            alt="User"
            className="w-8 h-8 rounded-full border"
            style={{ borderColor: theme.colors.border }}
          />
          <span
            className="text-sm hidden sm:block"
            style={{ color: theme.colors.textSecondary }}
          >
            Personal
          </span>
        </div>
      </div>
    </div>
  )
}

export default Topbar
