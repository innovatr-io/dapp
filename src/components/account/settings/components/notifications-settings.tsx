export function NotificationsSettings() {
  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <h2 className="card-title">Notification Preferences</h2>
        
        <div className="space-y-4">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Email Notifications</span>
              <input type="checkbox" className="toggle toggle-primary" defaultChecked />
            </label>
          </div>

          <div className="divider">Email Preferences</div>

          <div className="space-y-2">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">New investment opportunities</span>
                <input type="checkbox" className="checkbox checkbox-primary" defaultChecked />
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Project updates</span>
                <input type="checkbox" className="checkbox checkbox-primary" defaultChecked />
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Distribution notifications</span>
                <input type="checkbox" className="checkbox checkbox-primary" defaultChecked />
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Marketing communications</span>
                <input type="checkbox" className="checkbox checkbox-primary" />
              </label>
            </div>
          </div>

          <div className="card-actions justify-end">
            <button className="btn btn-primary">Save Preferences</button>
          </div>
        </div>
      </div>
    </div>
  );
}
