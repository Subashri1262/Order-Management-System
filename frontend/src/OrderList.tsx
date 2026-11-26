import type { Order, Customer } from './types'

// --------------------------------
// ORDER LIST COMPONENT PROPS
// --------------------------------
type OrderListProps = {
  orders: Order[]
  customers: Customer[]

  searchOrder: string
  setSearchOrder: (value: string) => void

  editOrder: (order: Order) => void
  deleteOrder: (orderId: string) => void

  updateStatus: (orderId: string, newStatus: string) => void
}

// --------------------------------
// ORDER LIST COMPONENT
// --------------------------------
function OrderList({
  orders,
  customers,
  searchOrder,
  setSearchOrder,
  editOrder,
  deleteOrder,
  updateStatus
}: OrderListProps) {

  // --------------------------------
  // FILTER ORDERS BY ORDER ID
  // --------------------------------
  const filteredOrders = orders.filter((order) =>
    order.orderId.toLowerCase().includes(searchOrder.toLowerCase())
  )

  // --------------------------------
  // DISPLAY ORDER LIST
  // --------------------------------
  return (
    <div>
      <h2>Order List</h2>

      {/* SEARCH ORDER */}
      <input
        type="text"
        placeholder="Search Order ID"
        value={searchOrder}
        onChange={(e) => setSearchOrder(e.target.value)}
      />

      {/* --------------------------------
          DISPLAY ORDERS
      -------------------------------- */}
      {filteredOrders.length === 0 && (
        <p>No orders found.</p>
      )}

      {filteredOrders.map((order) => {

        // Find the customer linked to this order
        const customer = customers.find(
          (item) => item.customerId === order.customerId
        )

        return (
          <div key={order.orderId}>
            <p>
              <strong>{order.orderId}</strong>
              {" - "}
              {customer?.name ?? "Unknown Customer"}
              {" - "}
              {order.status}
            </p>

            {/* EDIT ORDER */}
            <button onClick={() => editOrder(order)}>
              Edit
            </button>

            {" "}

            {/* DELETE ORDER */}
            <button onClick={() => deleteOrder(order.orderId)}>
              Delete
            </button>

            {" "}

            {/* APPROVE ORDER */}
            {order.status === "Pending" && (
              <button
                onClick={() => updateStatus(order.orderId, "Approved")}
              >
                Approve
              </button>
            )}

            {" "}

            {/* REJECT ORDER */}
            {order.status === "Pending" && (
              <button
                onClick={() => updateStatus(order.orderId, "Rejected")}
              >
                Reject
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default OrderList