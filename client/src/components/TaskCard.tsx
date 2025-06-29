'use client'

import Link from 'next/link'
import { theme } from '@/config/theme'

interface TaskCardProps {
  title: string
  count?: number
  href?: string
  highlightColor?: string
}

const TaskCard = ({ title, count = 0, href = '#', highlightColor }: TaskCardProps) => {
  const badgeBg = count > 0 ? (highlightColor || theme.colors.primaryLight) : theme.colors.grayLight
  const badgeText = count > 0 ? theme.colors.primary : theme.colors.gray

  return (
    <Link
      href={href}
      className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition group text-sm font-medium"
      style={{ borderBottom: `1px solid ${theme.colors.border}`, color: theme.colors.textSecondary }}
    >
      <span>{title}</span>
      <span
        className="inline-block text-xs px-2 py-1 rounded-full font-bold"
        style={{
          backgroundColor: badgeBg,
          color: badgeText,
        }}
      >
        {count}
      </span>
    </Link>
  )
}

export default TaskCard




// import Link from 'next/link'

// interface TaskCardProps {
//   title: string
//   count?: number
//   href?: string
// }

// const TaskCard = ({ title, count = 0, href = '#' }: TaskCardProps) => {
//   return (
//     <Link
//       href={href}
//       className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition group text-sm font-medium text-gray-800 border-b"
//     >
//       <span>{title}</span>
//       <span
//         className={`inline-block text-xs px-2 py-1 rounded-full font-bold 
//           ${count > 0 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-500'}`}
//       >
//         {count}
//       </span>
//     </Link>
//   )
// }

// export default TaskCard
