import { useState } from "react"

// --------------------------------
// IMPORT COMPONENTS
// --------------------------------
import "./App.css"
import Dashboard from "./Dashboard"
import CreateOrder from "./CreateOrder"
import OrderList from "./OrderList"
import EditOrder from "./EditOrder"
import Navbar from "./Navbar"
import Customers from "./Customers"
import Estimation from "./Estimation"
import Proposal from "./Proposal"
import ProjectsWorkOrders from "./ProjectsWorkOrders"

// --------------------------------
// IMPORT SHARED TYPES
// --------------------------------
import type {
  Customer,
  Order,
  EstimationRecord,
  ProposalRecord,
  WorkOrder,
  Project,
} from "./types"

// --------------------------------
// MAIN APPLICATION
// --------------------------------
function App() {

  // --------------------------------
  // NAVIGATION STATE
  // --------------------------------
  const [activePage, setActivePage] = useState("Dashboard")

  // --------------------------------
  // ORDER STATE VARIABLES
  // --------------------------------
  const [orderId, setOrderId] = useState("")
  const [orders, setOrders] = useState<Order[]>([])

  // Store original Order ID
  const [originalOrder, setOriginalOrder] = useState("")

  // Store the complete Order being edited
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)

  // Store Order search text
  const [searchOrder, setSearchOrder] = useState("")

  // --------------------------------
  // CUSTOMER STATE VARIABLES
  // --------------------------------
  const [customers, setCustomers] = useState<Customer[]>([])

  // Store Customer form values
  const [newCustomerName, setNewCustomerName] = useState("")
  const [newCustomerEmail, setNewCustomerEmail] = useState("")
  const [newCustomerPhone, setNewCustomerPhone] = useState("")

  // Store Customer ID currently being edited
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
  // WORK ORDER STATE VARIABLES
  // --------------------------------
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([])

  // --------------------------------
  // PROJECT STATE VARIABLES
  // --------------------------------
  const [projects, setProjects] = useState<Project[]>([])

  // --------------------------------
  // CREATE ORDER
  // --------------------------------
  const createOrder = (proposal: ProposalRecord) => {

    // Check whether Order ID is entered
    if (orderId.trim() === "") {
      alert("Please enter an Order ID.")
      return
    }

    // Check whether the selected Proposal is accepted
    if (proposal.status !== "Accepted") {
      alert("Only accepted Proposals can be used to create an Order.")
      return
    }

    // Check duplicate Order ID
    if (orders.some((order) => order.orderId === orderId.trim())) {
      alert("Order ID already exists.")
      return
    }

    // Create Order using accepted Proposal details
    const newOrder: Order = {
      orderId: orderId.trim(),
      customerId: proposal.customerId,
      proposalId: proposal.proposalId,
      proposalRevision: proposal.revision,
      description: proposal.description,
      proposedAmount: proposal.proposedAmount,
      formalPoNumber: "",
      formalPoDate: "",
      status: "Draft",
    }

    // Save the new Order
    setOrders((previousOrders) => [...previousOrders, newOrder])

    // Clear Order ID field
    setOrderId("")

    alert("Order created successfully!")
  }

  // --------------------------------
  // DELETE ORDER
  // --------------------------------
  // --------------------------------
// DELETE ORDER
// --------------------------------
const deleteOrder = (orderId: string) => {

  // Find Work Orders linked to this Order
  const linkedWorkOrders = workOrders.filter(
    (workOrder) => workOrder.orderId === orderId
  )

  // Find Projects linked to those Work Orders
  const linkedProjects = projects.filter((project) =>
    linkedWorkOrders.some(
      (workOrder) => workOrder.workOrderId === project.workOrderId
    )
  )

  // Build deletion warning
  let warningMessage = `Are you sure you want to delete Order ${orderId}?`

  if (linkedWorkOrders.length > 0) {
    warningMessage += `\n\n${linkedWorkOrders.length} linked Work Order(s) will also be deleted.`
  }

  if (linkedProjects.length > 0) {
    warningMessage += `\n${linkedProjects.length} linked Project(s) will also be deleted.`
  }

  warningMessage += "\n\nThis action cannot be undone."

  // Ask for confirmation
  const confirmed = window.confirm(warningMessage)

  // Stop deletion if user cancels
  if (!confirmed) {
    return
  }

  // Delete linked Projects
  setProjects((previousProjects) =>
    previousProjects.filter(
      (project) =>
        !linkedWorkOrders.some(
          (workOrder) =>
            workOrder.workOrderId === project.workOrderId
        )
    )
  )

  // Delete linked Work Orders
  setWorkOrders((previousWorkOrders) =>
    previousWorkOrders.filter(
      (workOrder) => workOrder.orderId !== orderId
    )
  )

  // Delete selected Order
  setOrders((previousOrders) =>
    previousOrders.filter((order) => order.orderId !== orderId)
  )

  // Clear edit state if this Order was being edited
  if (editingOrder?.orderId === orderId) {
    setEditingOrder(null)
    setOriginalOrder("")
  }

  alert("Order and its linked records deleted successfully!")
}
  // --------------------------------
  // SELECT ORDER FOR EDITING
  // --------------------------------
  const editOrder = (order: Order) => {

    // Prevent editing an accepted Order
    if (order.status === "Order Accepted") {
      alert("Order Accepted cannot be edited.")
      return
    }

    // Store original Order ID
    setOriginalOrder(order.orderId)

    // Load complete Order details into edit form
    setEditingOrder({ ...order })
  }

  // --------------------------------
  // UPDATE ORDER
  // --------------------------------
  const updateOrder = () => {

    // Check whether an Order is selected
    if (!editingOrder || originalOrder === "") {
      alert("Please select an Order to edit.")
      return
    }

    // Check empty Order ID
    const newOrderId = editingOrder.orderId.trim()

    if (newOrderId === "") {
      alert("Please enter an Order ID.")
      return
    }

    // Check empty Description
    if (editingOrder.description.trim() === "") {
      alert("Please enter the Order Description.")
      return
    }

    // Check empty Proposed Amount
    if (
      editingOrder.proposedAmount.trim() === "" ||
      Number(editingOrder.proposedAmount) < 0 ||
      !Number.isFinite(Number(editingOrder.proposedAmount))
    ) {
      alert("Please enter a valid Proposed Amount.")
      return
    }

    // Find the original Order
    const existingOrder = orders.find(
      (order) => order.orderId === originalOrder
    )

    // Stop if the Order does not exist
    if (!existingOrder) {
      alert("The selected Order could not be found.")
      return
    }

    // Prevent editing an accepted Order
    if (existingOrder.status === "Order Accepted") {
      alert("Order Accepted cannot be edited.")
      setEditingOrder(null)
      setOriginalOrder("")
      return
    }

    // Check duplicate Order ID, excluding the original Order
    const duplicateOrder = orders.some(
      (order) =>
        order.orderId !== originalOrder &&
        order.orderId.toLowerCase() === newOrderId.toLowerCase()
    )

    if (duplicateOrder) {
      alert("Order ID already exists.")
      return
    }

    // Update editable Order details
    setOrders((previousOrders) =>
      previousOrders.map((order) =>
        order.orderId === originalOrder
          ? {
              ...order,
              orderId: newOrderId,
              description: editingOrder.description.trim(),
              proposedAmount: editingOrder.proposedAmount.trim(),
            }
          : order
      )
    )

    // Clear edit state
    setEditingOrder(null)
    setOriginalOrder("")

    alert("Order updated successfully!")
  }

  // --------------------------------
  // UPDATE ORDER STATUS
  // --------------------------------
  const updateStatus = (orderId: string, newStatus: string) => {

    // Update only the valid Order status transitions
    setOrders((previousOrders) =>
      previousOrders.map((order) => {
        if (order.orderId !== orderId) {
          return order
        }

        // Draft to In Review
        if (order.status === "Draft" && newStatus === "In Review") {
          return { ...order, status: "In Review" }
        }

        // In Review to Approved
        if (order.status === "In Review" && newStatus === "Approved") {
          return { ...order, status: "Approved" }
        }

        // Formal Order Received to Order Accepted
        if (
          order.status === "Formal Order Received" &&
          newStatus === "Order Accepted"
        ) {
          return { ...order, status: "Order Accepted" }
        }

        return order
      })
    )
  }

  // --------------------------------
  // SAVE FORMAL PURCHASE ORDER
  // --------------------------------
  const saveFormalOrder = (
    orderId: string,
    poNumber: string,
    poDate: string
  ) => {

    // Save formal PO details for the approved Order
    setOrders((previousOrders) =>
      previousOrders.map((order) =>
        order.orderId === orderId && order.status === "Approved"
          ? {
              ...order,
              formalPoNumber: poNumber,
              formalPoDate: poDate,
              status: "Formal Order Received",
            }
          : order
      )
    )

    alert("Formal Purchase Order recorded successfully!")
  }

  // --------------------------------
  // ORDER SUMMARY
  // --------------------------------
  const totalOrders = orders.length

  const pendingOrders = orders.filter(
    (order) =>
      order.status === "Draft" ||
      order.status === "In Review"
  ).length

  const approvedOrders = orders.filter(
    (order) =>
      order.status === "Approved" ||
      order.status === "Formal Order Received" ||
      order.status === "Order Accepted"
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
      alert("Please enter customer name.")
      return
    }

    // Generate Customer ID
    const newCustomer: Customer = {
      customerId: `CUS${customers.length + 1}`,
      name: newCustomerName.trim(),
      email: newCustomerEmail.trim(),
      phone: newCustomerPhone.trim(),
    }

    // Save Customer
    setCustomers((previousCustomers) => [...previousCustomers, newCustomer])

    // Clear Customer form
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
      alert("Please enter customer name.")
      return
    }

    // Update selected Customer
    setCustomers((previousCustomers) =>
      previousCustomers.map((customer) =>
        customer.customerId === editingCustomerId
          ? {
              ...customer,
              name: newCustomerName.trim(),
              email: newCustomerEmail.trim(),
              phone: newCustomerPhone.trim(),
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

    // Create new Estimation
    const newEstimation: EstimationRecord = {
      estimationId,
      customerId,
      description,
      estimatedAmount,
      status: "Draft",
    }

    // Save Estimation
    setEstimations((previousEstimations) => [...previousEstimations, newEstimation])
  }

  // --------------------------------
  // SUBMIT ESTIMATION FOR REVIEW
  // --------------------------------
  const submitEstimation = (estimationId: string) => {

    // Change Draft to In Review
    setEstimations((previousEstimations) =>
      previousEstimations.map((estimation) =>
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
    setEstimations((previousEstimations) =>
      previousEstimations.map((estimation) =>
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

    // Create initial Proposal revision
    const newProposal: ProposalRecord = {
      proposalId,
      revision: 0,
      estimationId,
      customerId,
      description,
      proposedAmount,
      status: "Draft",
    }

    // Save Proposal
    setProposals((previousProposals) => [...previousProposals, newProposal])
  }

  // --------------------------------
  // UPDATE PROPOSAL STATUS
  // --------------------------------
  const updateProposalStatus = (
    proposalId: string,
    revision: number,
    newStatus: string
  ) => {

    // Update matching Proposal revision
    setProposals((previousProposals) =>
      previousProposals.map((proposal) =>
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
    setProposals((previousProposals) =>
      previousProposals.map((proposal) =>
        proposal.proposalId === proposalId &&
        proposal.revision === revision &&
        proposal.status === "Draft"
          ? {
              ...proposal,
              description,
              proposedAmount,
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

    // Update previous revision
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
      status: "Draft",
    }

    // Keep previous revision and add new revision
    setProposals([...updatedProposals, revisedProposal])
  }

  // --------------------------------
  // CREATE WORK ORDER
  // --------------------------------
  const createWorkOrder = (order: Order, workOrderDate: string) => {

    // Check whether a Work Order already exists for this Order
    if (workOrders.some((item) => item.orderId === order.orderId)) {
      alert("A Work Order already exists for this Order.")
      return
    }

    // Generate the next Work Order ID
    const newWorkOrderId = `WO${String(workOrders.length + 1).padStart(3, "0")}`

    // Create Work Order using existing Order details
    const newWorkOrder: WorkOrder = {
      workOrderId: newWorkOrderId,
      orderId: order.orderId,
      customerId: order.customerId,
      description: order.description,
      workOrderDate,
      status: "Created",
    }

    // Save the new Work Order
    setWorkOrders((previousWorkOrders) => [...previousWorkOrders, newWorkOrder])

    alert("Work Order created successfully!")
  }

  // --------------------------------
  // CREATE PROJECT
  // --------------------------------
  const createProject = (
    workOrder: WorkOrder,
    projectName: string,
    startDate: string,
    targetCompletionDate: string
  ) => {

    // Check whether a Project already exists for this Work Order
    if (projects.some((item) => item.workOrderId === workOrder.workOrderId)) {
      alert("A Project already exists for this Work Order.")
      return
    }

    // Generate the next Project ID
    const newProjectId = `PRJ${String(projects.length + 1).padStart(3, "0")}`

    // Create Project using selected Work Order
    const newProject: Project = {
      projectId: newProjectId,
      workOrderId: workOrder.workOrderId,
      projectName,
      startDate,
      targetCompletionDate,
      status: "Created",
    }

    // Save the new Project
    setProjects((previousProjects) => [...previousProjects, newProject])

    alert("Project created successfully!")
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
            proposals={proposals}
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
            saveFormalOrder={saveFormalOrder}
          />

          <EditOrder
            editingOrder={editingOrder}
            setEditingOrder={setEditingOrder}
            customers={customers}
            updateOrder={updateOrder}
          />
        </>
      )}

      {/* PROJECTS & WORK ORDERS */}
      {activePage === "Projects & Work Orders" && (
        <ProjectsWorkOrders
          orders={orders}
          customers={customers}
          workOrders={workOrders}
          projects={projects}
          createWorkOrder={createWorkOrder}
          createProject={createProject}
        />
      )}
    </div>
  )
}

export default App
