import ModulePanel from '@/components/ModulePanel'
import TaskCard from '@/components/TaskCard'

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      {/* CRM Panel */}
      <ModulePanel title="CRM">
        <TaskCard title="Add Inquiry" count={1} />
        <TaskCard title="Inquiry Follow Up" />
        <TaskCard title="New Quotation Creation" />
        <TaskCard title="Pending Quotation Approval" count={2} />
        <TaskCard title="Quotation Follow Up" count={3} />
        <TaskCard title="Pending Dispatch" />
      </ModulePanel>

      {/* MRP Panel */}
      <ModulePanel title="MRP">
        <TaskCard title="Direct Work Order" />
        <TaskCard title="Sales Order Wise Planning" />
        <TaskCard title="Mini-Max Planning" />
        <TaskCard title="Reject Product Planning" count={4} />
      </ModulePanel>

      {/* Other Panels */}
      <ModulePanel title="Purchase" />
      <ModulePanel title="Production" />
      <ModulePanel title="Inventory" />
      <ModulePanel title="Finance" />
      <ModulePanel title="Service" />

    </div>
  )
}
