export function QuickActions() {
  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Quick Actions</h2>
        <div className="space-y-2">
          <button className="btn btn-secondary w-full">View Analytics</button>
          <button className="btn btn-accent w-full">Manage Distributions</button>
          <button className="btn btn-ghost w-full">Project Guidelines</button>
        </div>
      </div>
    </div>
  )
}
