export function SecuritySettings() {
 return (
  <div className="card bg-base-200">
   <div className="card-body">
    <h2 className="card-title">Security Settings</h2>

    <div className="space-y-6">
     <div>
      <h3 className="text-lg font-semibold mb-2">Two-Factor Authentication</h3>
      <p className="text-sm text-base-content/70 mb-4">
       Add an extra layer of security to your account
      </p>
      <button className="btn btn-primary">Enable 2FA</button>
     </div>

     <div className="divider"></div>

     <div>
      <h3 className="text-lg font-semibold mb-2">Connected Wallets</h3>
      <div className="overflow-x-auto">
       <table className="table">
        <thead>
         <tr>
          <th>Wallet</th>
          <th>Connected</th>
          <th>Action</th>
         </tr>
        </thead>
        <tbody>
         <tr>
          <td>Phantom</td>
          <td>
           <div className="badge badge-success">Connected</div>
          </td>
          <td>
           <button className="btn btn-sm btn-error">Disconnect</button>
          </td>
         </tr>
        </tbody>
       </table>
      </div>
     </div>
    </div>

    <div className="divider"></div>

    <div>
     <h3 className="text-lg font-semibold mb-2">Activity Log</h3>
     <div className="overflow-x-auto">
      <table className="table">
       <thead>
        <tr>
         <th>Date</th>
         <th>Activity</th>
         <th>IP Address</th>
        </tr>
       </thead>
       <tbody>
        <tr>
         <td>2024-03-15 10:30</td>
         <td>Login</td>
         <td>192.168.1.1</td>
        </tr>
        <tr>
         <td>2024-03-14 15:45</td>
         <td>Password Changed</td>
         <td>192.168.1.1</td>
        </tr>
       </tbody>
      </table>
     </div>
    </div>
   </div>
  </div>
 );
}
