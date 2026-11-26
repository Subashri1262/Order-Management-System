import type { Customer } from './types'

// --------------------------------
// CREATE ORDER COMPONENT PROPS
// --------------------------------
type CreateOrderProps = {
  orderId: string
  setOrderId: (value: string) => void

  selectedCustomerId: string
  setSelectedCustomerId: (value: string) => void

  customers: Customer[]
  createOrder: () => void
}

// --------------------------------
// CREATE ORDER COMPONENT
// --------------------------------
function CreateOrder({
  orderId,
  setOrderId,
  selectedCustomerId,
  setSelectedCustomerId,
  customers,
  createOrder
}: CreateOrderProps) {

  // --------------------------------
  // DISPLAY CREATE ORDER FORM
  // --------------------------------
  return (
    <div>
      <h2>Create Order</h2>

      {/* ORDER ID */}
      <input
        type="text"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />

      <br />

      {/* SELECT CUSTOMER */}
      <select
        value={selectedCustomerId}
        onChange={(e) => setSelectedCustomerId(e.target.value)}
      >
        <option value="">Select Customer</option>

        {customers.map((customer) => (
          <option
            key={customer.customerId}
            value={customer.customerId}
          >
            {customer.name}
          </option>
        ))}
      </select>

      <br />

      {/* CREATE ORDER BUTTON */}
      <button onClick={createOrder}>
        Create Order
      </button>
    </div>
  )
}

export default CreateOrder