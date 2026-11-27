
import { useState } from "react"
import type { Order, Customer } from "./types"

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

  saveFormalOrder: (
    orderId: string,
    poNumber: string,
    poDate: string
  ) => void
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
  updateStatus,
  saveFormalOrder,
}: OrderListProps) {
  // Store PO details for each Order
  const [poNumbers, setPoNumbers] = useState<Record<string, string>>({})
  const [poDates, setPoDates] = useState<Record<string, string>>({})

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

      {/* NO ORDERS FOUND */}
      {filteredOrders.length === 0 && <p>No orders found.</p>}

      {/* DISPLAY ORDERS */}
      {filteredOrders.map((order) => {
        // Find the customer linked to this Order
        const customer = customers.find(
          (item) => item.customerId === order.customerId
        )

        return (
          <div key={order.orderId} className="section">
            {/* ORDER DETAILS */}
            <h3>{order.orderId}</h3>

            <p>
              <strong>Customer:</strong>{" "}
              {customer?.name ?? "Unknown Customer"}
            </p>

            <p>
              <strong>Proposal:</strong> {order.proposalId} - R
              {order.proposalRevision}
            </p>

            <p>
              <strong>Description:</strong> {order.description}
            </p>

            <p>
              <strong>Proposed Amount:</strong> {order.proposedAmount}
            </p>

            <p>
              <strong>Status:</strong> {order.status}
            </p>

            {/* --------------------------------
                EDIT ORDER ID
            -------------------------------- */}
            <button onClick={() => editOrder(order)}>
              Edit
            </button>

            {/* --------------------------------
                DELETE ORDER
            -------------------------------- */}
            <button onClick={() => deleteOrder(order.orderId)}>
              Delete
            </button>

            {/* --------------------------------
                DRAFT → IN REVIEW
            -------------------------------- */}
            {order.status === "Draft" && (
              <button
                onClick={() =>
                  updateStatus(order.orderId, "In Review")
                }
              >
                Submit for Review
              </button>
            )}

            {/* --------------------------------
                IN REVIEW → APPROVED
            -------------------------------- */}
            {order.status === "In Review" && (
              <button
                onClick={() =>
                  updateStatus(order.orderId, "Approved")
                }
              >
                Approve Order
              </button>
            )}

            {/* --------------------------------
                APPROVED → FORMAL ORDER RECEIVED
                RECORD CLIENT PO DETAILS
            -------------------------------- */}
            {order.status === "Approved" && (
              <div>
                <h4>Record Formal Purchase Order</h4>

                <input
                  type="text"
                  placeholder="Client PO Number"
                  value={poNumbers[order.orderId] ?? ""}
                  onChange={(e) =>
                    setPoNumbers((prev) => ({
                      ...prev,
                      [order.orderId]: e.target.value,
                    }))
                  }
                />

                <input
                  type="date"
                  value={poDates[order.orderId] ?? ""}
                  onChange={(e) =>
                    setPoDates((prev) => ({
                      ...prev,
                      [order.orderId]: e.target.value,
                    }))
                  }
                />

                <button
                  onClick={() => {
                    const poNumber = poNumbers[order.orderId] ?? ""
                    const poDate = poDates[order.orderId] ?? ""

                    if (!poNumber.trim()) {
                      alert("Please enter the client PO number.")
                      return
                    }

                    if (!poDate) {
                      alert("Please select the PO date.")
                      return
                    }

                    saveFormalOrder(
                      order.orderId,
                      poNumber,
                      poDate
                    )
                  }}
                >
                  Save Formal PO
                </button>
              </div>
            )}

            {/* --------------------------------
                DISPLAY SAVED FORMAL PO DETAILS
            -------------------------------- */}
            {(order.status === "Formal Order Received" ||
              order.status === "Order Accepted") && (
              <div>
                <p>
                  <strong>Client PO Number:</strong>{" "}
                  {order.formalPoNumber}
                </p>

                <p>
                  <strong>Client PO Date:</strong>{" "}
                  {order.formalPoDate}
                </p>
              </div>
            )}

            {/* --------------------------------
                FORMAL ORDER RECEIVED → ORDER ACCEPTED
            -------------------------------- */}
            {order.status === "Formal Order Received" && (
              <button
                onClick={() =>
                  updateStatus(order.orderId, "Order Accepted")
                }
              >
                Accept Order
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default OrderList
