
import type { Order, Customer } from "./types"

// --------------------------------
// EDIT ORDER COMPONENT PROPS
// --------------------------------
type EditOrderProps = {
  editingOrder: Order | null
  setEditingOrder: (order: Order | null) => void
  customers: Customer[]
  updateOrder: () => void
}

// --------------------------------
// EDIT ORDER COMPONENT
// --------------------------------
function EditOrder({
  editingOrder,
  setEditingOrder,
  customers,
  updateOrder,
}: EditOrderProps) {

  // Do not display the form until an Order is selected
  if (!editingOrder) {
    return null
  }

  // Find the Customer linked to this Order
  const customer = customers.find(
    (item) => item.customerId === editingOrder.customerId
  )

  // --------------------------------
  // DISPLAY EDIT ORDER FORM
  // --------------------------------
  return (
    <div className="section">
      <h2>Edit Order</h2>

      {/* ORDER ID */}
      <label>Order ID</label>
      <input
        type="text"
        placeholder="Enter Order ID"
        value={editingOrder.orderId}
        onChange={(e) =>
          setEditingOrder({
            ...editingOrder,
            orderId: e.target.value,
          })
        }
      />

      {/* CUSTOMER - NOT EDITABLE */}
      <label>Customer</label>
      <input
        type="text"
        value={customer?.name ?? "Unknown Customer"}
        disabled
      />

      {/* PROPOSAL DETAILS - NOT EDITABLE */}
      <p><strong>Proposal ID:</strong> {editingOrder.proposalId}</p>
      <p><strong>Proposal Revision:</strong> R{editingOrder.proposalRevision}</p>

      {/* DESCRIPTION */}
      <label>Description</label>
      <textarea
        placeholder="Enter Order Description"
        value={editingOrder.description}
        onChange={(e) =>
          setEditingOrder({
            ...editingOrder,
            description: e.target.value,
          })
        }
      />

      {/* PROPOSED AMOUNT */}
      <label>Proposed Amount</label>
      <input
        type="number"
        placeholder="Enter Proposed Amount"
        value={editingOrder.proposedAmount}
        onChange={(e) =>
          setEditingOrder({
            ...editingOrder,
            proposedAmount: e.target.value,
          })
        }
      />

      {/* ORDER STATUS - NOT EDITABLE HERE */}
      <p><strong>Current Status:</strong> {editingOrder.status}</p>

      {/* FORMAL PO DETAILS - NOT EDITABLE HERE */}
      {editingOrder.formalPoNumber && (
        <div>
          <p><strong>Client PO Number:</strong> {editingOrder.formalPoNumber}</p>
          <p><strong>Client PO Date:</strong> {editingOrder.formalPoDate}</p>
        </div>
      )}

      {/* UPDATE ORDER BUTTON */}
      <button
        onClick={updateOrder}
        disabled={editingOrder.status === "Order Accepted"}
      >
        Update Order
      </button>
    </div>
  )
}

export default EditOrder
