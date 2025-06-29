'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { menuList } from '@/config/sidebarMenu'
import { theme } from '@/config/theme'
import { AnimatePresence, motion } from 'framer-motion'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar = ({ isOpen: sidebarVisible, onClose }: SidebarProps) => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({})
  const pathname = usePathname()

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarVisible && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed z-40 top-0 left-0 h-full w-64 transform transition-transform duration-300
        ${sidebarVisible ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static md:block`}
        style={{
          backgroundColor: theme.colors.sidebar_background,
          color: theme.colors.textPrimary,
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-4 border-b"
          style={{ borderColor: theme.colors.primaryLight }}
        >
          <div className="text-xl font-bold">
            LOGO<span style={{ color: theme.colors.accent }}>ERP</span>
          </div>
          <button
            className="md:hidden text-2xl"
            onClick={onClose}
            style={{ color: theme.colors.textPrimary }}
          >
            ×
          </button>
        </div>

        {/* Menu */}
        <ul className="p-2 text-sm space-y-1">
          {menuList.map((item) => {
            const Icon = item.icon
            const isItemOpen = openMenus[item.key]

            return (
              <li key={item.key}>
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleMenu(item.key)}
                      className="flex justify-between items-center w-full p-2 rounded hover:bg-white/10 transition"
                      style={{ color: theme.colors.textPrimary }}
                    >
                      <span className="flex gap-2 items-center">
                        <Icon /> {item.label}
                      </span>
                      {isItemOpen ? <FaMinus className="text-xs" /> : <FaPlus className="text-xs" />}
                    </button>

                    <AnimatePresence>
                      {isItemOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="ml-4 mt-1 overflow-hidden border-l pl-3"
                          style={{ borderColor: theme.colors.primaryLight }}
                        >
                          {item.subItems.map((sub, index) => {
                            const SubIcon = sub.icon
                            return (
                              <li key={index}>
                                <Link
                                  href={sub.path}
                                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded transition ${
                                    pathname === sub.path ? 'bg-white/10 font-semibold' : 'hover:bg-white/10'
                                  }`}
                                  style={{ color: theme.colors.textPrimary }}
                                >
                                  <SubIcon className="text-xs" /> {sub.label}
                                </Link>
                              </li>
                            )
                          })}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.path}
                    className={`flex items-center gap-2 p-2 rounded transition ${
                      pathname === item.path ? 'bg-white/10 font-semibold' : 'hover:bg-white/10'
                    }`}
                    style={{ color: theme.colors.textPrimary }}
                  >
                    <Icon /> {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default Sidebar
