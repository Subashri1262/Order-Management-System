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
    <div>
      <h2>Dashboard</h2>
      <p>Total Orders: {totalOrders}</p>
      <p>Pending Orders: {pendingOrders}</p>
      <p>Approved Orders: {approvedOrders}</p>
      <p>Rejected Orders: {rejectedOrders}</p>
    </div>
  )
}

export default Dashboard