
import { useState } from "react"
import type {
  Order,
  Customer,
  WorkOrder,
  Project,
} from "./types"

// --------------------------------
// COMPONENT PROPS
// --------------------------------
type Props = {
  orders: Order[]
  customers: Customer[]
  workOrders: WorkOrder[]
  projects: Project[]

  createWorkOrder: (order: Order, workOrderDate: string) => void

  createProject: (
    workOrder: WorkOrder,
    projectName: string,
    startDate: string,
    targetCompletionDate: string
  ) => void
}

// --------------------------------
// PROJECTS & WORK ORDERS COMPONENT
// --------------------------------
function ProjectsWorkOrders({
  orders,
  customers,
  workOrders,
  projects,
  createWorkOrder,
  createProject,
}: Props) {

  // --------------------------------
  // WORK ORDER FORM STATE
  // --------------------------------
  const [selectedOrderId, setSelectedOrderId] = useState("")
  const [workOrderDate, setWorkOrderDate] = useState("")

  // --------------------------------
  // PROJECT FORM STATE
  // --------------------------------
  const [selectedWorkOrderId, setSelectedWorkOrderId] = useState("")
  const [projectName, setProjectName] = useState("")
  const [startDate, setStartDate] = useState("")
  const [targetCompletionDate, setTargetCompletionDate] = useState("")

  // --------------------------------
  // ELIGIBLE ORDERS
  // --------------------------------
  const eligibleOrders = orders.filter(
    (order) =>
      order.status === "Order Accepted" &&
      !workOrders.some((item) => item.orderId === order.orderId)
  )

  // Find selected Order
  const selectedOrder = eligibleOrders.find(
    (order) => order.orderId === selectedOrderId
  )

  // Find selected Order customer
  const selectedCustomer = customers.find(
    (customer) => customer.customerId === selectedOrder?.customerId
  )

  // --------------------------------
  // CREATE WORK ORDER
  // --------------------------------
  const handleCreateWorkOrder = () => {
    if (!selectedOrder) {
      alert("Please select an accepted Order.")
      return
    }

    if (!workOrderDate) {
      alert("Please select the Work Order Date.")
      return
    }

    createWorkOrder(selectedOrder, workOrderDate)

    // Clear form
    setSelectedOrderId("")
    setWorkOrderDate("")
  }

  // --------------------------------
  // ELIGIBLE WORK ORDERS
  // --------------------------------
  const eligibleWorkOrders = workOrders.filter(
    (workOrder) =>
      !projects.some(
        (project) => project.workOrderId === workOrder.workOrderId
      )
  )

  // Find selected Work Order
  const selectedWorkOrder = eligibleWorkOrders.find(
    (workOrder) => workOrder.workOrderId === selectedWorkOrderId
  )

  // Find selected Work Order customer
  const projectCustomer = customers.find(
    (customer) => customer.customerId === selectedWorkOrder?.customerId
  )

  // --------------------------------
  // CREATE PROJECT
  // --------------------------------
  const handleCreateProject = () => {
    if (!selectedWorkOrder) {
      alert("Please select a Work Order.")
      return
    }

    if (!projectName.trim()) {
      alert("Please enter the Project Name.")
      return
    }

    if (!startDate) {
      alert("Please select the Project Start Date.")
      return
    }

    if (!targetCompletionDate) {
      alert("Please select the Target Completion Date.")
      return
    }

    if (targetCompletionDate < startDate) {
      alert("Target Completion Date cannot be before the Start Date.")
      return
    }

    createProject(
      selectedWorkOrder,
      projectName.trim(),
      startDate,
      targetCompletionDate
    )

    // Clear form
    setSelectedWorkOrderId("")
    setProjectName("")
    setStartDate("")
    setTargetCompletionDate("")
  }

  // --------------------------------
  // DISPLAY PAGE
  // --------------------------------
  return (
    <div className="project-workorder-page">

      <h2>Projects & Work Orders</h2>

      {/* =================================
          TOP ROW - CREATION FORMS
      ================================= */}
      <div className="pw-grid">

        {/* --------------------------------
            CREATE WORK ORDER
        -------------------------------- */}
        <div className="pw-panel">

          <h3>Create Work Order</h3>

          <label>Select Accepted Order</label>

          <select
            value={selectedOrderId}
            onChange={(e) => setSelectedOrderId(e.target.value)}
          >
            <option value="">Select Accepted Order</option>

            {eligibleOrders.map((order) => (
              <option key={order.orderId} value={order.orderId}>
                {order.orderId}
              </option>
            ))}
          </select>

          {/* Selected Order Details */}
          {selectedOrder && (
            <div className="pw-details">
              <p><strong>Customer:</strong> {selectedCustomer?.name ?? "Unknown Customer"}</p>
              <p><strong>Description:</strong> {selectedOrder.description}</p>
            </div>
          )}

          <label>Work Order Date</label>

          <input
            type="date"
            value={workOrderDate}
            onChange={(e) => setWorkOrderDate(e.target.value)}
          />

          <button onClick={handleCreateWorkOrder}>
            Create Work Order
          </button>

          {eligibleOrders.length === 0 && (
            <p className="pw-empty">
              No accepted Orders available.
            </p>
          )}

        </div>

        {/* --------------------------------
            CREATE PROJECT
        -------------------------------- */}
        <div className="pw-panel">

          <h3>Create Project</h3>

          <label>Select Work Order</label>

          <select
            value={selectedWorkOrderId}
            onChange={(e) => setSelectedWorkOrderId(e.target.value)}
          >
            <option value="">Select Work Order</option>

            {eligibleWorkOrders.map((workOrder) => (
              <option
                key={workOrder.workOrderId}
                value={workOrder.workOrderId}
              >
                {workOrder.workOrderId}
              </option>
            ))}
          </select>

          {/* Selected Work Order Details */}
          {selectedWorkOrder && (
            <div className="pw-details">
              <p><strong>Customer:</strong> {projectCustomer?.name ?? "Unknown Customer"}</p>
              <p><strong>Description:</strong> {selectedWorkOrder.description}</p>
            </div>
          )}

          <label>Project Name</label>

          <input
            type="text"
            placeholder="Enter Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

          <label>Project Start Date</label>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <label>Target Completion Date</label>

          <input
            type="date"
            value={targetCompletionDate}
            onChange={(e) => setTargetCompletionDate(e.target.value)}
          />

          <button onClick={handleCreateProject}>
            Create Project
          </button>

          {eligibleWorkOrders.length === 0 && (
            <p className="pw-empty">
              No Work Orders available for Project creation.
            </p>
          )}

        </div>
      </div>

      {/* =================================
          BOTTOM ROW - LISTS
      ================================= */}
      <div className="pw-grid pw-list-grid">

        {/* --------------------------------
            WORK ORDER LIST
        -------------------------------- */}
        <div className="pw-panel">

          <h3>Work Order List ({workOrders.length})</h3>

          {workOrders.length === 0 ? (
            <p>No Work Orders created yet.</p>
          ) : (
            <div className="pw-table-container">
              <table>
                <thead>
                  <tr>
                    <th>Work Order</th>
                    <th>Client Order</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {workOrders.map((workOrder) => {
                    const customer = customers.find(
                      (item) => item.customerId === workOrder.customerId
                    )

                    return (
                      <tr key={workOrder.workOrderId}>
                        <td>{workOrder.workOrderId}</td>
                        <td>{workOrder.orderId}</td>
                        <td>{customer?.name ?? "Unknown"}</td>
                        <td>{workOrder.workOrderDate}</td>
                        <td>{workOrder.status}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>

        {/* --------------------------------
            PROJECT LIST
        -------------------------------- */}
        <div className="pw-panel">

          <h3>Project List ({projects.length})</h3>

          {projects.length === 0 ? (
            <p>No Projects created yet.</p>
          ) : (
            <div className="pw-table-container">
              <table>
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Project Name</th>
                    <th>Work Order</th>
                    <th>Customer</th>
                    <th>Target Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {projects.map((project) => {
                    const workOrder = workOrders.find(
                      (item) => item.workOrderId === project.workOrderId
                    )

                    const customer = customers.find(
                      (item) => item.customerId === workOrder?.customerId
                    )

                    return (
                      <tr key={project.projectId}>
                        <td>{project.projectId}</td>
                        <td>{project.projectName}</td>
                        <td>{project.workOrderId}</td>
                        <td>{customer?.name ?? "Unknown"}</td>
                        <td>{project.targetCompletionDate}</td>
                        <td>{project.status}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>

    </div>
  )
}

export default ProjectsWorkOrders