// app/dashboard/page.tsx (or src/app/crm/page.tsx)
'use client'

import TaskCard from '@/components/TaskCard'
import { moduleColors } from '@/config/moduleColors'

const tasks = [
  { title: 'Add Inquiry', count: 2, href: '/crm/inquiry', highlightColor: moduleColors.crm },
  { title: 'Follow-up Tasks', count: 5, href: '/crm/followup', highlightColor: moduleColors.crm },
  { title: 'Dispatch', count: 0, href: '/inventory/dispatch', highlightColor: moduleColors.inventory },
  { title: 'Payment Review', count: 1, href: '/finance/review', highlightColor: moduleColors.finance },
]

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-2 max-w-md">
      {tasks.map((task) => (
        <TaskCard
          key={task.title}
          title={task.title}
          count={task.count}
          href={task.href}
          highlightColor={task.highlightColor}
        />
      ))}
    </div>
  )
}
