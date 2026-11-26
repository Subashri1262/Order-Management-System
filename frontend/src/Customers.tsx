import type { Customer } from './types'

// --------------------------------
// CUSTOMER COMPONENT PROPS
// --------------------------------
type CustomersProps = {
  customers: Customer[]

  newCustomerName: string
  setNewCustomerName: (value: string) => void

  newCustomerEmail: string
  setNewCustomerEmail: (value: string) => void

  newCustomerPhone: string
  setNewCustomerPhone: (value: string) => void

  createCustomer: () => void
  editingCustomerId: string
  editCustomer: (customer: Customer) => void
  updateCustomer: () => void
}

// --------------------------------
// CUSTOMER COMPONENT
// --------------------------------
function Customers({
  customers,
  newCustomerName,
  setNewCustomerName,
  newCustomerEmail,
  setNewCustomerEmail,
  newCustomerPhone,
  setNewCustomerPhone,
  createCustomer,
  editingCustomerId,
  editCustomer,
  updateCustomer
}: CustomersProps) {

  // --------------------------------
  // DISPLAY CUSTOMER FORM AND LIST
  // --------------------------------
  return (
    <div>
      <h2>Customers</h2>

      {/* CUSTOMER NAME */}
      <input
        type="text"
        placeholder="Enter Customer Name"
        value={newCustomerName}
        onChange={(e) => setNewCustomerName(e.target.value)}
      />

      <br />

      {/* CUSTOMER EMAIL */}
      <input
        type="email"
        placeholder="Enter Customer Email"
        value={newCustomerEmail}
        onChange={(e) => setNewCustomerEmail(e.target.value)}
      />

      <br />

      {/* CUSTOMER PHONE */}
      <input
        type="text"
        placeholder="Enter Customer Phone"
        value={newCustomerPhone}
        onChange={(e) => setNewCustomerPhone(e.target.value)}
      />

      <br />

      {/* CREATE OR UPDATE CUSTOMER */}
      {editingCustomerId === "" ? (
        <button onClick={createCustomer}>
          Add Customer
        </button>
      ) : (
        <button onClick={updateCustomer}>
          Update Customer
        </button>
      )}

      {/* --------------------------------
          CUSTOMER LIST
      -------------------------------- */}
      <h3>Customer List</h3>

      {customers.length === 0 && (
        <p>No customers created yet.</p>
      )}

      {customers.map((customer) => (
        <div key={customer.customerId}>
          <p>
            <strong>{customer.customerId}</strong>
            {" - "}
            {customer.name}
            {" - "}
            {customer.email}
            {" - "}
            {customer.phone}
          </p>

          {/* EDIT CUSTOMER */}
          <button onClick={() => editCustomer(customer)}>
            Edit
          </button>
        </div>
      ))}
    </div>
  )
}

export default Customers