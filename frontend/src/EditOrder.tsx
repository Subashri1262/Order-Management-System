// --------------------------------
// EDIT ORDER COMPONENT PROPS
// --------------------------------
type EditOrderProps = {
  editingOrder: string
  setEditingOrder: (value: string) => void
  updateOrder: () => void
}

// --------------------------------
// EDIT ORDER COMPONENT
// --------------------------------
function EditOrder({
  editingOrder,
  setEditingOrder,
  updateOrder
}: EditOrderProps) {

  // --------------------------------
  // DISPLAY EDIT ORDER FORM
  // --------------------------------
  return (
    <div>
      <h3>Edit Order</h3>

      {/* ORDER ID TO EDIT */}
      <input
        type="text"
        placeholder="Enter new Order ID"
        value={editingOrder}
        onChange={(e) => setEditingOrder(e.target.value)}
      />

      <br />

      {/* UPDATE ORDER BUTTON */}
      <button
        onClick={updateOrder}
        disabled={editingOrder === ""}
      >
        Update Order
      </button>
    </div>
  )
}

export default EditOrder