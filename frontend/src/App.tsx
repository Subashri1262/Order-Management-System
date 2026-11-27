import { useState } from "react"

// ================================================
// 1. IMPORT COMPONENTS
// ================================================
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
import ExecutionInvoicing from "./ExecutionInvoicing"
import JobClosure from "./JobClosure"

// ================================================
// 2. IMPORT SHARED TYPES
// ================================================
import type {
  Customer,
  Order,
  EstimationRecord,
  ProposalRecord,
  WorkOrder,
  Project,
  Invoice,
} from "./types"

// ================================================
// 3. MAIN APPLICATION
// ================================================
function App() {

  // ================================================
  // 4. APPLICATION NAVIGATION
  // ================================================
  const [activePage, setActivePage] = useState("Dashboard")

  // ================================================
  // 5. ORDER MODULE - STATE VARIABLES
  // ================================================
  const [orderId, setOrderId] = useState("")
  const [orders, setOrders] = useState<Order[]>([])
  const [originalOrder, setOriginalOrder] = useState("")
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)
  const [searchOrder, setSearchOrder] = useState("")

  // ================================================
  // 6. CUSTOMER MODULE - STATE VARIABLES
  // ================================================
  const [customers, setCustomers] = useState<Customer[]>([])
  const [newCustomerName, setNewCustomerName] = useState("")
  const [newCustomerEmail, setNewCustomerEmail] = useState("")
  const [newCustomerPhone, setNewCustomerPhone] = useState("")
  const [editingCustomerId, setEditingCustomerId] = useState("")

  // ================================================
  // 7. ESTIMATION MODULE - STATE VARIABLES
  // ================================================
  const [estimations, setEstimations] = useState<EstimationRecord[]>([])

  // ================================================
  // 8. PROPOSAL MODULE - STATE VARIABLES
  // ================================================
  const [proposals, setProposals] = useState<ProposalRecord[]>([])

  // ================================================
  // 9. WORK ORDER MODULE - STATE VARIABLES
  // ================================================
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([])

  // ================================================
  // 10. PROJECT MODULE - STATE VARIABLES
  // ================================================
  const [projects, setProjects] = useState<Project[]>([])

  // ================================================
  // 11. INVOICING MODULE - STATE VARIABLES
  // ================================================
  const [invoices, setInvoices] = useState<Invoice[]>([])

  // ================================================
  // 12. ORDER MODULE - FUNCTIONS
  // ================================================

  // Create an Order from an accepted Proposal
  const createOrder = (proposal: ProposalRecord) => {
    if (orderId.trim() === "") {
      alert("Please enter an Order ID.")
      return
    }

    if (proposal.status !== "Accepted") {
      alert("Only accepted Proposals can be used to create an Order.")
      return
    }

    if (orders.some((order) => order.orderId === orderId.trim())) {
      alert("Order ID already exists.")
      return
    }

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

    setOrders((previousOrders) => [...previousOrders, newOrder])
    setOrderId("")

    alert("Order created successfully!")
  }

  // Delete an Order and its linked Work Orders, Projects and Invoices
  const deleteOrder = (orderId: string) => {
    const linkedWorkOrders = workOrders.filter(
      (workOrder) => workOrder.orderId === orderId
    )

    const linkedProjects = projects.filter((project) =>
      linkedWorkOrders.some(
        (workOrder) => workOrder.workOrderId === project.workOrderId
      )
    )

    const linkedInvoices = invoices.filter((invoice) =>
      linkedProjects.some(
        (project) => project.projectId === invoice.projectId
      )
    )

    let warningMessage = `Are you sure you want to delete Order ${orderId}?`

    if (linkedWorkOrders.length > 0) {
      warningMessage += `\n\n${linkedWorkOrders.length} linked Work Order(s) will also be deleted.`
    }

    if (linkedProjects.length > 0) {
      warningMessage += `\n${linkedProjects.length} linked Project(s) will also be deleted.`
    }

    if (linkedInvoices.length > 0) {
      warningMessage += `\n${linkedInvoices.length} linked Invoice(s) will also be deleted.`
    }

    warningMessage += "\n\nThis action cannot be undone."

    if (!window.confirm(warningMessage)) {
      return
    }

    // Delete linked records first
    setInvoices((previousInvoices) =>
      previousInvoices.filter(
        (invoice) =>
          !linkedProjects.some(
            (project) => project.projectId === invoice.projectId
          )
      )
    )

    setProjects((previousProjects) =>
      previousProjects.filter(
        (project) =>
          !linkedWorkOrders.some(
            (workOrder) => workOrder.workOrderId === project.workOrderId
          )
      )
    )

    setWorkOrders((previousWorkOrders) =>
      previousWorkOrders.filter(
        (workOrder) => workOrder.orderId !== orderId
      )
    )

    setOrders((previousOrders) =>
      previousOrders.filter((order) => order.orderId !== orderId)
    )

    if (editingOrder?.orderId === orderId) {
      setEditingOrder(null)
      setOriginalOrder("")
    }

    alert("Order and its linked records deleted successfully!")
  }

  // Select an Order for editing
  const editOrder = (order: Order) => {
    if (order.status === "Order Accepted") {
      alert("Order Accepted cannot be edited.")
      return
    }

    setOriginalOrder(order.orderId)
    setEditingOrder({ ...order })
  }

  // Save changes to the selected Order
  const updateOrder = () => {
    if (!editingOrder || originalOrder === "") {
      alert("Please select an Order to edit.")
      return
    }

    const newOrderId = editingOrder.orderId.trim()

    if (newOrderId === "") {
      alert("Please enter an Order ID.")
      return
    }

    if (editingOrder.description.trim() === "") {
      alert("Please enter the Order Description.")
      return
    }

    if (
      editingOrder.proposedAmount.trim() === "" ||
      Number(editingOrder.proposedAmount) < 0 ||
      !Number.isFinite(Number(editingOrder.proposedAmount))
    ) {
      alert("Please enter a valid Proposed Amount.")
      return
    }

    const existingOrder = orders.find(
      (order) => order.orderId === originalOrder
    )

    if (!existingOrder) {
      alert("The selected Order could not be found.")
      return
    }

    if (existingOrder.status === "Order Accepted") {
      alert("Order Accepted cannot be edited.")
      setEditingOrder(null)
      setOriginalOrder("")
      return
    }

    const duplicateOrder = orders.some(
      (order) =>
        order.orderId !== originalOrder &&
        order.orderId.toLowerCase() === newOrderId.toLowerCase()
    )

    if (duplicateOrder) {
      alert("Order ID already exists.")
      return
    }

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

    setEditingOrder(null)
    setOriginalOrder("")

    alert("Order updated successfully!")
  }

  // Update Order status based on valid workflow transitions
  const updateStatus = (orderId: string, newStatus: string) => {
    setOrders((previousOrders) =>
      previousOrders.map((order) => {
        if (order.orderId !== orderId) {
          return order
        }

        if (order.status === "Draft" && newStatus === "In Review") {
          return { ...order, status: "In Review" }
        }

        if (order.status === "In Review" && newStatus === "Approved") {
          return { ...order, status: "Approved" }
        }

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

  // Record the customer's formal Purchase Order
  const saveFormalOrder = (
    orderId: string,
    poNumber: string,
    poDate: string
  ) => {
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

  // Calculate Order summary for Dashboard
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

  // ================================================
  // 13. CUSTOMER MODULE - FUNCTIONS
  // ================================================

  // Create a new Customer
  const createCustomer = () => {
    if (newCustomerName.trim() === "") {
      alert("Please enter customer name.")
      return
    }

    const newCustomer: Customer = {
      customerId: `CUS${customers.length + 1}`,
      name: newCustomerName.trim(),
      email: newCustomerEmail.trim(),
      phone: newCustomerPhone.trim(),
    }

    setCustomers((previousCustomers) => [
      ...previousCustomers,
      newCustomer,
    ])

    setNewCustomerName("")
    setNewCustomerEmail("")
    setNewCustomerPhone("")

    alert("Customer created successfully!")
  }

  // Load Customer details into the edit form
  const editCustomer = (customer: Customer) => {
    setEditingCustomerId(customer.customerId)
    setNewCustomerName(customer.name)
    setNewCustomerEmail(customer.email)
    setNewCustomerPhone(customer.phone)
  }

  // Save changes to the selected Customer
  const updateCustomer = () => {
    if (newCustomerName.trim() === "") {
      alert("Please enter customer name.")
      return
    }

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

    setEditingCustomerId("")
    setNewCustomerName("")
    setNewCustomerEmail("")
    setNewCustomerPhone("")

    alert("Customer updated successfully!")
  }

  // ================================================
  // 14. ESTIMATION MODULE - FUNCTIONS
  // ================================================

  // Create an Estimation
  const createEstimation = (
    estimationId: string,
    customerId: string,
    description: string,
    estimatedAmount: string
  ) => {
    const newEstimation: EstimationRecord = {
      estimationId,
      customerId,
      description,
      estimatedAmount,
      status: "Draft",
    }

    setEstimations((previousEstimations) => [
      ...previousEstimations,
      newEstimation,
    ])
  }

  // Submit Estimation for review
  const submitEstimation = (estimationId: string) => {
    setEstimations((previousEstimations) =>
      previousEstimations.map((estimation) =>
        estimation.estimationId === estimationId &&
        estimation.status === "Draft"
          ? { ...estimation, status: "In Review" }
          : estimation
      )
    )
  }

  // Approve Estimation
  const approveEstimation = (estimationId: string) => {
    setEstimations((previousEstimations) =>
      previousEstimations.map((estimation) =>
        estimation.estimationId === estimationId &&
        estimation.status === "In Review"
          ? { ...estimation, status: "Approved" }
          : estimation
      )
    )
  }

  // ================================================
  // 15. PROPOSAL MODULE - FUNCTIONS
  // ================================================

  // Create the first Proposal revision
  const createProposal = (
    proposalId: string,
    estimationId: string,
    customerId: string,
    description: string,
    proposedAmount: string
  ) => {
    const newProposal: ProposalRecord = {
      proposalId,
      revision: 0,
      estimationId,
      customerId,
      description,
      proposedAmount,
      status: "Draft",
    }

    setProposals((previousProposals) => [
      ...previousProposals,
      newProposal,
    ])
  }

  // Update Proposal status
  const updateProposalStatus = (
    proposalId: string,
    revision: number,
    newStatus: string
  ) => {
    setProposals((previousProposals) =>
      previousProposals.map((proposal) =>
        proposal.proposalId === proposalId &&
        proposal.revision === revision
          ? { ...proposal, status: newStatus }
          : proposal
      )
    )
  }

  // Update Proposal details
  const updateProposalDetails = (
    proposalId: string,
    revision: number,
    description: string,
    proposedAmount: string
  ) => {
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

  // Create a new Proposal revision while preserving the previous one
  const reviseProposal = (
    proposalId: string,
    revision: number
  ) => {
    const existingProposal = proposals.find(
      (proposal) =>
        proposal.proposalId === proposalId &&
        proposal.revision === revision
    )

    if (!existingProposal) {
      return
    }

    if (
      existingProposal.status !== "Revision Requested" &&
      existingProposal.status !== "Sent to Client"
    ) {
      return
    }

    const newRevision = revision + 1

    const updatedProposals = proposals.map((proposal) =>
      proposal.proposalId === proposalId &&
      proposal.revision === revision
        ? { ...proposal, status: "Revision Requested" }
        : proposal
    )

    const revisedProposal: ProposalRecord = {
      ...existingProposal,
      revision: newRevision,
      status: "Draft",
    }

    setProposals([...updatedProposals, revisedProposal])
  }

  // ================================================
  // 16. WORK ORDER MODULE - FUNCTIONS
  // ================================================

  // Create a Work Order from an accepted Client Order
  const createWorkOrder = (order: Order, workOrderDate: string) => {
    if (workOrders.some((item) => item.orderId === order.orderId)) {
      alert("A Work Order already exists for this Order.")
      return
    }

    const newWorkOrderId = `WO${String(workOrders.length + 1).padStart(3, "0")}`

    const newWorkOrder: WorkOrder = {
      workOrderId: newWorkOrderId,
      orderId: order.orderId,
      customerId: order.customerId,
      description: order.description,
      workOrderDate,
      status: "Created",
      progress: 0,
      progressDescription: "",
    }

    setWorkOrders((previousWorkOrders) => [
      ...previousWorkOrders,
      newWorkOrder,
    ])

    alert("Work Order created successfully!")
  }

  // Update the latest Work Order progress
  const updateWorkOrderProgress = (
    workOrderId: string,
    progress: number,
    progressDescription: string
  ) => {
    if (progress < 0 || progress > 100) {
      alert("Progress must be between 0 and 100.")
      return
    }

    // Do not allow progress changes after formal closure
    const selectedWorkOrder = workOrders.find(
      (workOrder) => workOrder.workOrderId === workOrderId
    )

    if (!selectedWorkOrder || selectedWorkOrder.status === "Closed") {
      alert("A closed Work Order cannot be updated.")
      return
    }

    setWorkOrders((previousWorkOrders) =>
      previousWorkOrders.map((workOrder) =>
        workOrder.workOrderId === workOrderId
          ? {
              ...workOrder,
              progress,
              progressDescription,
              status:
                progress === 100
                  ? "Completed"
                  : progress > 0
                  ? "In Progress"
                  : "Created",
            }
          : workOrder
      )
    )

    alert("Work Order progress updated successfully!")
  }

  // ================================================
  // 17. PROJECT MODULE - FUNCTIONS
  // ================================================

  // Create a Project from a Work Order
  const createProject = (
    workOrder: WorkOrder,
    projectName: string,
    startDate: string,
    targetCompletionDate: string
  ) => {
    if (projects.some((item) => item.workOrderId === workOrder.workOrderId)) {
      alert("A Project already exists for this Work Order.")
      return
    }

    const newProjectId = `PRJ${String(projects.length + 1).padStart(3, "0")}`

    const newProject: Project = {
      projectId: newProjectId,
      workOrderId: workOrder.workOrderId,
      projectName,
      startDate,
      targetCompletionDate,
      status: "Created",
    }

    setProjects((previousProjects) => [
      ...previousProjects,
      newProject,
    ])

    alert("Project created successfully!")
  }

  // ================================================
  // 18. INVOICING MODULE - FUNCTIONS
  // ================================================

  // Create a milestone invoice for a Project
  const createInvoice = (
    project: Project,
    milestoneName: string,
    amount: string,
    invoiceDate: string
  ) => {
    if (milestoneName.trim() === "") {
      alert("Please enter a milestone name.")
      return
    }

    if (
      amount.trim() === "" ||
      !Number.isFinite(Number(amount)) ||
      Number(amount) <= 0
    ) {
      alert("Please enter a valid invoice amount.")
      return
    }

    if (invoiceDate.trim() === "") {
      alert("Please select an invoice date.")
      return
    }

    const newInvoiceId = `INV${String(invoices.length + 1).padStart(3, "0")}`

    const newInvoice: Invoice = {
      invoiceId: newInvoiceId,
      projectId: project.projectId,
      milestoneName: milestoneName.trim(),
      amount: amount.trim(),
      invoiceDate,
      status: "Issued",
    }

    setInvoices((previousInvoices) => [
      ...previousInvoices,
      newInvoice,
    ])

    alert("Milestone invoice created successfully!")
  }

  // ================================================
  // 19. JOB CLOSURE MODULE - FUNCTIONS
  // ================================================

  // Close a Work Order only after it reaches 100% completion
  const closeWorkOrder = (workOrderId: string) => {
    const selectedWorkOrder = workOrders.find(
      (workOrder) => workOrder.workOrderId === workOrderId
    )

    if (!selectedWorkOrder || selectedWorkOrder.status !== "Completed") {
      alert("Only completed Work Orders can be closed.")
      return
    }

    if (!window.confirm("Are you sure you want to close this Work Order?")) {
      return
    }

    setWorkOrders((previousWorkOrders) =>
      previousWorkOrders.map((workOrder) =>
        workOrder.workOrderId === workOrderId
          ? { ...workOrder, status: "Closed" }
          : workOrder
      )
    )

    alert("Work Order closed successfully!")
  }

  // Close a Project only after its related Work Order is closed
  const closeProject = (projectId: string) => {
    const selectedProject = projects.find(
      (project) => project.projectId === projectId
    )

    if (!selectedProject) {
      alert("Project not found.")
      return
    }

    const relatedWorkOrder = workOrders.find(
      (workOrder) => workOrder.workOrderId === selectedProject.workOrderId
    )

    if (!relatedWorkOrder || relatedWorkOrder.status !== "Closed") {
      alert("Close the related Work Order before closing this Project.")
      return
    }

    if (!window.confirm("Are you sure you want to close this Project?")) {
      return
    }

    setProjects((previousProjects) =>
      previousProjects.map((project) =>
        project.projectId === projectId
          ? { ...project, status: "Closed" }
          : project
      )
    )

    alert("Project closed successfully!")
  }

  // ================================================
  // 20. DISPLAY APPLICATION PAGES
  // ================================================
  return (
    <div>
      <h1>Order Management System</h1>

      {/* MAIN NAVIGATION */}
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

      {/* EXECUTION & INVOICING */}
      {activePage === "Execution & Invoicing" && (
        <ExecutionInvoicing
          customers={customers}
          workOrders={workOrders}
          projects={projects}
          invoices={invoices}
          updateWorkOrderProgress={updateWorkOrderProgress}
          createInvoice={createInvoice}
        />
      )}

      {/* JOB CLOSURE */}
      {activePage === "Job Closure" && (
        <JobClosure
          workOrders={workOrders}
          projects={projects}
          closeWorkOrder={closeWorkOrder}
          closeProject={closeProject}
        />
      )}
    </div>
  )
}

export default App
