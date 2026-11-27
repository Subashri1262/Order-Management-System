
import { useState } from "react"
import type { Customer, WorkOrder, Project, Invoice } from "./types"

// --------------------------------
// COMPONENT PROPS
// --------------------------------
type ExecutionInvoicingProps = {
  customers: Customer[]
  workOrders: WorkOrder[]
  projects: Project[]
  invoices: Invoice[]

  updateWorkOrderProgress: (
    workOrderId: string,
    progress: number,
    progressDescription: string
  ) => void

  createInvoice: (
    project: Project,
    milestoneName: string,
    amount: string,
    invoiceDate: string
  ) => void
}

// --------------------------------
// EXECUTION & INVOICING COMPONENT
// --------------------------------
function ExecutionInvoicing({
  customers,
  workOrders,
  projects,
  invoices,
  updateWorkOrderProgress,
  createInvoice,
}: ExecutionInvoicingProps) {

  // --------------------------------
  // WORK ORDER PROGRESS FORM
  // --------------------------------
  const [selectedWorkOrderId, setSelectedWorkOrderId] = useState("")
  const [progress, setProgress] = useState("0")
  const [progressDescription, setProgressDescription] = useState("")

  // Find selected Work Order
  const selectedWorkOrder = workOrders.find(
    (workOrder) => workOrder.workOrderId === selectedWorkOrderId
  )

  // Find related Project and Customer
  const relatedProject = projects.find(
    (project) => project.workOrderId === selectedWorkOrderId
  )

  const workOrderCustomer = customers.find(
    (customer) => customer.customerId === selectedWorkOrder?.customerId
  )

  // Load existing progress when selecting a Work Order
  const handleWorkOrderChange = (workOrderId: string) => {
    setSelectedWorkOrderId(workOrderId)

    const selected = workOrders.find(
      (workOrder) => workOrder.workOrderId === workOrderId
    )

    setProgress(String(selected?.progress ?? 0))
    setProgressDescription(selected?.progressDescription ?? "")
  }

  // Save latest Work Order progress
  const handleProgressUpdate = () => {
    if (!selectedWorkOrder) {
      alert("Please select a Work Order.")
      return
    }

    if (
      progress.trim() === "" ||
      !Number.isFinite(Number(progress)) ||
      Number(progress) < 0 ||
      Number(progress) > 100
    ) {
      alert("Progress must be between 0 and 100.")
      return
    }

    if (progressDescription.trim() === "") {
      alert("Please enter a progress description.")
      return
    }

    updateWorkOrderProgress(
      selectedWorkOrder.workOrderId,
      Number(progress),
      progressDescription.trim()
    )
  }

  // --------------------------------
  // MILESTONE INVOICE FORM
  // --------------------------------
  const [selectedProjectId, setSelectedProjectId] = useState("")
  const [milestoneName, setMilestoneName] = useState("")
  const [invoiceAmount, setInvoiceAmount] = useState("")
  const [invoiceDate, setInvoiceDate] = useState("")

  // Find selected Project
  const selectedProject = projects.find(
    (project) => project.projectId === selectedProjectId
  )

  // Find related Work Order and Customer
  const invoiceWorkOrder = workOrders.find(
    (workOrder) => workOrder.workOrderId === selectedProject?.workOrderId
  )

  const invoiceCustomer = customers.find(
    (customer) => customer.customerId === invoiceWorkOrder?.customerId
  )

  // Create milestone invoice after validating all fields
  const handleInvoiceCreate = () => {
    if (!selectedProject) {
      alert("Please select a Project.")
      return
    }

    if (milestoneName.trim() === "") {
      alert("Please enter a milestone name.")
      return
    }

    if (
      invoiceAmount.trim() === "" ||
      !Number.isFinite(Number(invoiceAmount)) ||
      Number(invoiceAmount) <= 0
    ) {
      alert("Please enter a valid invoice amount.")
      return
    }

    if (invoiceDate.trim() === "") {
      alert("Please select an invoice date.")
      return
    }

    // Create invoice only after all validations pass
    createInvoice(
      selectedProject,
      milestoneName.trim(),
      invoiceAmount,
      invoiceDate
    )

    // Clear the form after successful validation
    setMilestoneName("")
    setInvoiceAmount("")
    setInvoiceDate("")
  }

  // --------------------------------
  // DISPLAY PAGE
  // --------------------------------
  return (
    <div className="execution-page">

      <h2>Execution & Invoicing</h2>

      <div className="execution-grid">

        {/* WORK ORDER PROGRESS */}
        <div className="execution-panel">

          <h3>Work Order Progress</h3>

          <label>Select Work Order</label>
          <select
            value={selectedWorkOrderId}
            onChange={(e) => handleWorkOrderChange(e.target.value)}
          >
            <option value="">Select Work Order</option>

            {workOrders.map((workOrder) => (
              <option
                key={workOrder.workOrderId}
                value={workOrder.workOrderId}
              >
                {workOrder.workOrderId}
              </option>
            ))}
          </select>

          {selectedWorkOrder && (
            <>
              <div className="execution-details">
                <p>
                  <strong>Customer:</strong>{" "}
                  {workOrderCustomer?.name || "Not available"}
                </p>

                <p>
                  <strong>Project:</strong>{" "}
                  {relatedProject?.projectName || "Not created"}
                </p>

                <p>
                  <strong>Current Status:</strong>{" "}
                  {selectedWorkOrder.status}
                </p>
              </div>

              <label>Completion Percentage (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
              />

              <label>Progress Description</label>
              <textarea
                value={progressDescription}
                onChange={(e) => setProgressDescription(e.target.value)}
                placeholder="Enter latest work progress"
              />

              <button onClick={handleProgressUpdate}>
                Update Progress
              </button>
            </>
          )}

          {workOrders.length === 0 && (
            <p className="execution-empty">
              No Work Orders available.
            </p>
          )}

        </div>

        {/* MILESTONE INVOICING */}
        <div className="execution-panel">

          <h3>Milestone Invoicing</h3>

          <label>Select Project</label>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
          >
            <option value="">Select Project</option>

            {projects.map((project) => (
              <option
                key={project.projectId}
                value={project.projectId}
              >
                {project.projectId} - {project.projectName}
              </option>
            ))}
          </select>

          {selectedProject && (
            <>
              <div className="execution-details">
                <p>
                  <strong>Project:</strong>{" "}
                  {selectedProject.projectName}
                </p>

                <p>
                  <strong>Customer:</strong>{" "}
                  {invoiceCustomer?.name || "Not available"}
                </p>
              </div>

              <label>Milestone Name</label>
              <input
                type="text"
                value={milestoneName}
                onChange={(e) => setMilestoneName(e.target.value)}
                placeholder="Example: Phase 1 Completion"
              />

              <label>Invoice Amount</label>
              <input
                type="number"
                min="0"
                value={invoiceAmount}
                onChange={(e) => setInvoiceAmount(e.target.value)}
                placeholder="Enter amount"
              />

              <label>Invoice Date</label>
              <input
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
              />

              <button onClick={handleInvoiceCreate}>
                Create Invoice
              </button>
            </>
          )}

          {projects.length === 0 && (
            <p className="execution-empty">
              No Projects available.
            </p>
          )}

        </div>

      </div>

      {/* INVOICE RECORDS */}
      <div className="execution-invoice-list">

        <h3>Invoice Records</h3>

        {invoices.length === 0 ? (
          <p className="execution-empty">
            No invoices created yet.
          </p>
        ) : (
          <div className="execution-table-container">
            <table>
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Project ID</th>
                  <th>Milestone</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.invoiceId}>
                    <td>{invoice.invoiceId}</td>
                    <td>{invoice.projectId}</td>
                    <td>{invoice.milestoneName}</td>
                    <td>{invoice.amount}</td>
                    <td>{invoice.invoiceDate}</td>
                    <td>{invoice.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  )
}

export default ExecutionInvoicing
