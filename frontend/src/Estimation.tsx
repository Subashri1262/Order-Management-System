import { useState } from 'react'
import type { Customer, EstimationRecord } from './types'

// --------------------------------
// ESTIMATION COMPONENT PROPS
// --------------------------------
type EstimationProps = {
  customers: Customer[]
  estimations: EstimationRecord[]

  createEstimation: (
    estimationId: string,
    customerId: string,
    description: string,
    estimatedAmount: string
  ) => void

  submitEstimation: (estimationId: string) => void
  approveEstimation: (estimationId: string) => void
}

// --------------------------------
// ESTIMATION COMPONENT
// --------------------------------
function Estimation({
  customers,
  estimations,
  createEstimation,
  submitEstimation,
  approveEstimation
}: EstimationProps) {

  // --------------------------------
  // STATE VARIABLES
  // --------------------------------
  const [estimationId, setEstimationId] = useState("")
  const [selectedCustomerId, setSelectedCustomerId] = useState("")
  const [description, setDescription] = useState("")
  const [estimatedAmount, setEstimatedAmount] = useState("")

  // --------------------------------
  // CREATE ESTIMATION
  // --------------------------------
  const handleCreateEstimation = () => {

    // Validate required fields
    if (
      estimationId.trim() === "" ||
      selectedCustomerId === "" ||
      description.trim() === "" ||
      estimatedAmount === ""
    ) {
      alert("Please fill all fields")
      return
    }

    // Validate the estimated amount
    if (
      !Number.isFinite(Number(estimatedAmount)) ||
      Number(estimatedAmount) <= 0
    ) {
      alert("Please enter a valid estimated amount")
      return
    }

    // Check whether Estimation ID already exists
    if (
      estimations.some(
        (item) => item.estimationId === estimationId.trim()
      )
    ) {
      alert("Estimation ID already exists")
      return
    }

    // Create Estimation
    createEstimation(
      estimationId.trim(),
      selectedCustomerId,
      description.trim(),
      estimatedAmount
    )

    // Clear the form after creation
    setEstimationId("")
    setSelectedCustomerId("")
    setDescription("")
    setEstimatedAmount("")

    alert("Estimation created successfully!")
  }

  // --------------------------------
  // DISPLAY ESTIMATION FORM AND LIST
  // --------------------------------
  return (
    <div>
      <h2>Estimation</h2>

      {/* --------------------------------
          CREATE ESTIMATION
      -------------------------------- */}
      <h3>Create Estimation</h3>

      {/* ESTIMATION ID */}
      <input
        type="text"
        placeholder="Enter Estimation ID"
        value={estimationId}
        onChange={(e) => setEstimationId(e.target.value)}
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

      {/* DESCRIPTION */}
      <input
        type="text"
        placeholder="Enter Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />

      {/* ESTIMATED AMOUNT */}
      <input
        type="number"
        placeholder="Enter Estimated Amount (₹)"
        value={estimatedAmount}
        onChange={(e) => setEstimatedAmount(e.target.value)}
      />

      <br />

      {/* CREATE BUTTON */}
      <button onClick={handleCreateEstimation}>
        Create Estimation
      </button>

      {/* --------------------------------
          ESTIMATION LIST
      -------------------------------- */}
      <h3>Estimation List</h3>

      {estimations.length === 0 && (
        <p>No estimations created yet.</p>
      )}

      {estimations.map((estimation) => {

        // Find the customer linked to this estimation
        const customer = customers.find(
          (item) => item.customerId === estimation.customerId
        )

        return (
          <div key={estimation.estimationId}>
            <p>
              <strong>{estimation.estimationId}</strong>
              {" - "}
              {customer?.name ?? "Unknown Customer"}
              {" - "}
              {estimation.description}
              {" - "}
              ₹{estimation.estimatedAmount}
              {" - "}
              {estimation.status}
            </p>

            {/* SUBMIT FOR REVIEW */}
            {estimation.status === "Draft" && (
              <button
                onClick={() => submitEstimation(estimation.estimationId)}
              >
                Submit for Review
              </button>
            )}

            {" "}

            {/* APPROVE ESTIMATION */}
            {estimation.status === "In Review" && (
              <button
                onClick={() => approveEstimation(estimation.estimationId)}
              >
                Approve
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Estimation