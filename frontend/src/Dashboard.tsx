 // --------------------------------
 // DASHBOARD COMPONENT PROPS
 // --------------------------------
type DashboardProps = {
  totalOrders: number
  pendingOrders: number
  approvedOrders: number
  rejectedOrders: number
}

// --------------------------------
// DASHBOARD COMPONENT
// --------------------------------
function Dashboard({
  totalOrders,
  pendingOrders,
  approvedOrders,
  rejectedOrders
}: DashboardProps) {

  // --------------------------------
  // DISPLAY ORDER SUMMARY
  // --------------------------------
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div>

        <div className="dashboard-card">
          <h3>Pending Orders</h3>
          <p>{pendingOrders}</p>
        </div>

        <div className="dashboard-card">
          <h3>Approved Orders</h3>
          <p>{approvedOrders}</p>
        </div>

        <div className="dashboard-card">
          <h3>Rejected Orders</h3>
          <p>{rejectedOrders}</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
