export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border border-border">
          <h2 className="font-medium text-muted-foreground text-sm">Journal entries</h2>
          <p className="text-3xl font-bold mt-1">0</p>
        </div>
        <div className="p-4 rounded-lg border border-border">
          <h2 className="font-medium text-muted-foreground text-sm">Notes</h2>
          <p className="text-3xl font-bold mt-1">0</p>
        </div>
        <div className="p-4 rounded-lg border border-border">
          <h2 className="font-medium text-muted-foreground text-sm">Tasks</h2>
          <p className="text-3xl font-bold mt-1">0</p>
        </div>
      </div>
    </div>
  )
}
