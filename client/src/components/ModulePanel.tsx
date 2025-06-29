'use client'

import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { theme } from '@/config/theme'

interface ModulePanelProps {
  title: string
  children: React.ReactNode
}

const ModulePanel = ({ title, children }: ModulePanelProps) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="bg-white shadow-md rounded-xl mb-5 w-full transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-5 py-3 font-semibold rounded-t-xl text-lg tracking-wide"
        style={{
          background: `linear-gradient(to right, ${theme.colors.dashboard_main_menu}, ${theme.colors.dashboard_sub_menu})`,
          color: theme.colors.textPrimary, // ✅ dynamic font color
        }}
      >
        <span>{title}</span>
        <FaChevronDown
          className={`transform transition-transform duration-200 ease-in-out ${!isOpen ? 'rotate-180' : ''}`}
          style={{ color: theme.colors.textPrimary }} // ✅ icon font color
        />
      </button>
      {isOpen && (
        <div className="px-5 py-3">
          {children}
        </div>
      )}
    </div>
  )
}

export default ModulePanel
