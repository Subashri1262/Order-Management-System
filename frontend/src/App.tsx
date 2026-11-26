import { useState } from 'react'

// Import Components
import Dashboard from './Dashboard'
import CreateOrder from './CreateOrder'
import OrderList from './OrderList'
import EditOrder from './EditOrder'
import Navbar from './Navbar'
import Customers from './Customers'
import Estimation from './Estimation'
import Proposal from './Proposal'

// Import Shared Types
import type {
  Customer,
  Order,
  EstimationRecord,
  ProposalRecord
} from './types'

function App() {

  // --------------------------------
  // NAVIGATION STATE
  // --------------------------------
  const [activePage, setActivePage] = useState("Dashboard")

  // --------------------------------
  // ORDER STATE VARIABLES
  // --------------------------------
  const [orderId, setOrderId] = useState("")
  const [selectedCustomerId, setSelectedCustomerId] = useState("")

  // Stores all orders
  const [orders, setOrders] = useState<Order[]>([])

  // Stores original and edited Order IDs
  const [originalOrder, setOriginalOrder] = useState("")
  const [editingOrder, setEditingOrder] = useState("")

  // Stores Order search text
  const [searchOrder, setSearchOrder] = useState("")

  // --------------------------------
  // CUSTOMER STATE VARIABLES
  // --------------------------------
  const [customers, setCustomers] = useState<Customer[]>([])

  // Stores Customer form values
  const [newCustomerName, setNewCustomerName] = useState("")
  const [newCustomerEmail, setNewCustomerEmail] = useState("")
  const [newCustomerPhone, setNewCustomerPhone] = useState("")

  // Stores Customer ID currently being edited
  const [editingCustomerId, setEditingCustomerId] = useState("")

  // --------------------------------
  // ESTIMATION STATE VARIABLES
  // --------------------------------
  const [estimations, setEstimations] = useState<EstimationRecord[]>([])

  // --------------------------------
  // PROPOSAL STATE VARIABLES
  // --------------------------------
  const [proposals, setProposals] = useState<ProposalRecord[]>([])

  // --------------------------------
  // CREATE ORDER
  // --------------------------------
  const createOrder = () => {

    // Check required fields
    if (orderId.trim() === "" || selectedCustomerId === "") {
      alert("Please fill all fields")
      return
    }

    // Check duplicate Order ID
    if (orders.some((order) => order.orderId === orderId.trim())) {
      alert("Order ID already exists")
      return
    }

    // Create Order
    setOrders([...orders, {
      orderId: orderId.trim(),
      customerId: selectedCustomerId,
      status: "Pending"
    }])

    // Clear form
    setOrderId("")
    setSelectedCustomerId("")

    alert("Order created successfully!")
  }

  // --------------------------------
  // DELETE ORDER
  // --------------------------------
  const deleteOrder = (orderId: string) => {

    // Remove selected Order
    setOrders(
      orders.filter((order) => order.orderId !== orderId)
    )
  }

  // --------------------------------
  // SELECT ORDER FOR EDITING
  // --------------------------------
  const editOrder = (order: Order) => {

    // Store original and new Order ID
    setOriginalOrder(order.orderId)
    setEditingOrder(order.orderId)
  }

  // --------------------------------
  // UPDATE ORDER
  // --------------------------------
  const updateOrder = () => {

    // Check empty Order ID
    if (editingOrder.trim() === "") {
      alert("Please enter an Order ID")
      return
    }

    // Check whether the new ID already exists
    if (
      editingOrder.trim() !== originalOrder &&
      orders.some((order) => order.orderId === editingOrder.trim())
    ) {
      alert("Order ID already exists")
      return
    }

    // Update selected Order
    setOrders(
      orders.map((order) =>
        order.orderId === originalOrder
          ? { ...order, orderId: editingOrder.trim() }
          : order
      )
    )

    // Clear edit state
    setEditingOrder("")
    setOriginalOrder("")

    alert("Order updated successfully!")
  }

  // --------------------------------
  // UPDATE ORDER STATUS
  // --------------------------------
  const updateStatus = (orderId: string, newStatus: string) => {

    // Change status only for Pending Orders
    setOrders(
      orders.map((order) =>
        order.orderId === orderId && order.status === "Pending"
          ? { ...order, status: newStatus }
          : order
      )
    )
  }

  // --------------------------------
  // ORDER SUMMARY
  // --------------------------------
  const totalOrders = orders.length

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length

  const approvedOrders = orders.filter(
    (order) => order.status === "Approved"
  ).length

  const rejectedOrders = orders.filter(
    (order) => order.status === "Rejected"
  ).length

  // --------------------------------
  // CREATE CUSTOMER
  // --------------------------------
  const createCustomer = () => {

    // Check required Customer name
    if (newCustomerName.trim() === "") {
      alert("Please enter customer name")
      return
    }

    // Create Customer
    setCustomers([...customers, {
      customerId: `CUS${customers.length + 1}`,
      name: newCustomerName.trim(),
      email: newCustomerEmail.trim(),
      phone: newCustomerPhone.trim()
    }])

    // Clear form
    setNewCustomerName("")
    setNewCustomerEmail("")
    setNewCustomerPhone("")

    alert("Customer created successfully!")
  }

  // --------------------------------
  // SELECT CUSTOMER FOR EDITING
  // --------------------------------
  const editCustomer = (customer: Customer) => {

    // Load selected Customer details
    setEditingCustomerId(customer.customerId)
    setNewCustomerName(customer.name)
    setNewCustomerEmail(customer.email)
    setNewCustomerPhone(customer.phone)
  }

  // --------------------------------
  // UPDATE CUSTOMER
  // --------------------------------
  const updateCustomer = () => {

    // Check Customer name
    if (newCustomerName.trim() === "") {
      alert("Please enter customer name")
      return
    }

    // Update selected Customer
    setCustomers(
      customers.map((customer) =>
        customer.customerId === editingCustomerId
          ? {
              ...customer,
              name: newCustomerName.trim(),
              email: newCustomerEmail.trim(),
              phone: newCustomerPhone.trim()
            }
          : customer
      )
    )

    // Clear form and edit state
    setEditingCustomerId("")
    setNewCustomerName("")
    setNewCustomerEmail("")
    setNewCustomerPhone("")

    alert("Customer updated successfully!")
  }

  // --------------------------------
  // CREATE ESTIMATION
  // --------------------------------
  const createEstimation = (
    estimationId: string,
    customerId: string,
    description: string,
    estimatedAmount: string
  ) => {

    // Add new Estimation
    setEstimations([...estimations, {
      estimationId,
      customerId,
      description,
      estimatedAmount,
      status: "Draft"
    }])
  }

  // --------------------------------
  // SUBMIT ESTIMATION FOR REVIEW
  // --------------------------------
  const submitEstimation = (estimationId: string) => {

    // Change Draft to In Review
    setEstimations(
      estimations.map((estimation) =>
        estimation.estimationId === estimationId &&
        estimation.status === "Draft"
          ? { ...estimation, status: "In Review" }
          : estimation
      )
    )
  }

  // --------------------------------
  // APPROVE ESTIMATION
  // --------------------------------
  const approveEstimation = (estimationId: string) => {

    // Change In Review to Approved
    setEstimations(
      estimations.map((estimation) =>
        estimation.estimationId === estimationId &&
        estimation.status === "In Review"
          ? { ...estimation, status: "Approved" }
          : estimation
      )
    )
  }

  // --------------------------------
  // CREATE PROPOSAL
  // --------------------------------
  const createProposal = (
    proposalId: string,
    estimationId: string,
    customerId: string,
    description: string,
    proposedAmount: string
  ) => {

    // Add new Proposal R0
    setProposals([...proposals, {
      proposalId,
      revision: 0,
      estimationId,
      customerId,
      description,
      proposedAmount,
      status: "Draft"
    }])
  }

  // --------------------------------
  // UPDATE PROPOSAL STATUS
  // --------------------------------
  const updateProposalStatus = (
    proposalId: string,
    revision: number,
    newStatus: string
  ) => {

    // Update only the matching Proposal revision
    setProposals(
      proposals.map((proposal) =>
        proposal.proposalId === proposalId &&
        proposal.revision === revision
          ? { ...proposal, status: newStatus }
          : proposal
      )
    )
  }

  // --------------------------------
  // UPDATE PROPOSAL DETAILS
  // --------------------------------
  const updateProposalDetails = (
    proposalId: string,
    revision: number,
    description: string,
    proposedAmount: string
  ) => {

    // Update only the matching Draft revision
    setProposals(
      proposals.map((proposal) =>
        proposal.proposalId === proposalId &&
        proposal.revision === revision &&
        proposal.status === "Draft"
          ? {
              ...proposal,
              description,
              proposedAmount
            }
          : proposal
      )
    )
  }

  // --------------------------------
  // CREATE PROPOSAL REVISION
  // --------------------------------
  const reviseProposal = (
    proposalId: string,
    revision: number
  ) => {

    // Find the Proposal revision
    const existingProposal = proposals.find(
      (proposal) =>
        proposal.proposalId === proposalId &&
        proposal.revision === revision
    )

    // Stop if the Proposal does not exist
    if (!existingProposal) {
      return
    }

    // Allow revision only for these statuses
    if (
      existingProposal.status !== "Revision Requested" &&
      existingProposal.status !== "Sent to Client"
    ) {
      return
    }

    // Calculate next revision number
    const newRevision = revision + 1

    // Update the previous version to Revision
    const updatedProposals = proposals.map((proposal) =>
      proposal.proposalId === proposalId &&
      proposal.revision === revision
        ? { ...proposal, status: "Revision Requested" }
        : proposal
    )

    // Create new revision by copying previous details
    const revisedProposal: ProposalRecord = {
      ...existingProposal,
      revision: newRevision,
      status: "Draft"
    }

    // Keep previous revision and add new revision
    setProposals([...updatedProposals, revisedProposal])
  }

  // --------------------------------
  // DISPLAY APPLICATION
  // --------------------------------
  return (
    <div>
      <h1>Order Management System</h1>

      {/* NAVIGATION */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* DASHBOARD */}
      {activePage === "Dashboard" && (
        <Dashboard
          totalOrders={totalOrders}
          pendingOrders={pendingOrders}
          approvedOrders={approvedOrders}
          rejectedOrders={rejectedOrders}
        />
      )}

      {/* CUSTOMERS */}
      {activePage === "Customers" && (
        <Customers
          customers={customers}
          newCustomerName={newCustomerName}
          setNewCustomerName={setNewCustomerName}
          newCustomerEmail={newCustomerEmail}
          setNewCustomerEmail={setNewCustomerEmail}
          newCustomerPhone={newCustomerPhone}
          setNewCustomerPhone={setNewCustomerPhone}
          createCustomer={createCustomer}
          editingCustomerId={editingCustomerId}
          editCustomer={editCustomer}
          updateCustomer={updateCustomer}
        />
      )}

      {/* ESTIMATION */}
      {activePage === "Estimation" && (
        <Estimation
          customers={customers}
          estimations={estimations}
          createEstimation={createEstimation}
          submitEstimation={submitEstimation}
          approveEstimation={approveEstimation}
        />
      )}

      {/* PROPOSALS */}
      {activePage === "Proposals" && (
        <Proposal
          customers={customers}
          estimations={estimations}
          proposals={proposals}
          createProposal={createProposal}
          updateProposalStatus={updateProposalStatus}
          reviseProposal={reviseProposal}
          updateProposalDetails={updateProposalDetails}
        />
      )}

      {/* ORDERS */}
      {activePage === "Orders" && (
        <>
          <CreateOrder
            orderId={orderId}
            setOrderId={setOrderId}
            selectedCustomerId={selectedCustomerId}
            setSelectedCustomerId={setSelectedCustomerId}
            customers={customers}
            createOrder={createOrder}
          />

          <OrderList
            orders={orders}
            customers={customers}
            searchOrder={searchOrder}
            setSearchOrder={setSearchOrder}
            editOrder={editOrder}
            deleteOrder={deleteOrder}
            updateStatus={updateStatus}
          />

          <EditOrder
            editingOrder={editingOrder}
            setEditingOrder={setEditingOrder}
            updateOrder={updateOrder}
          />
        </>
      )}
    </div>
  )
}

export default App