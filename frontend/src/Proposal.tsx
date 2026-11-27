
import { useState } from 'react'
import type { Customer, EstimationRecord, ProposalRecord } from './types'

// --------------------------------
// PROPOSAL COMPONENT PROPS
// --------------------------------
type ProposalProps = {
  customers: Customer[]
  estimations: EstimationRecord[]
  proposals: ProposalRecord[]

  createProposal: (
    proposalId: string,
    estimationId: string,
    customerId: string,
    description: string,
    proposedAmount: string
  ) => void

  updateProposalStatus: (
    proposalId: string,
    revision: number,
    newStatus: string
  ) => void

  reviseProposal: (
    proposalId: string,
    revision: number
  ) => void

  updateProposalDetails: (
    proposalId: string,
    revision: number,
    description: string,
    proposedAmount: string
  ) => void
}

// --------------------------------
// PROPOSAL COMPONENT
// --------------------------------
function Proposal({
  customers,
  estimations,
  proposals,
  createProposal,
  updateProposalStatus,
  reviseProposal,
  updateProposalDetails
}: ProposalProps) {

  // --------------------------------
  // CREATE PROPOSAL STATE
  // --------------------------------
  const [proposalId, setProposalId] = useState("")
  const [selectedEstimationId, setSelectedEstimationId] = useState("")
  const [description, setDescription] = useState("")
  const [proposedAmount, setProposedAmount] = useState("")

  // --------------------------------
  // EDIT PROPOSAL STATE
  // --------------------------------
  const [editingProposalId, setEditingProposalId] = useState("")
  const [editingRevision, setEditingRevision] = useState<number | null>(null)
  const [editingDescription, setEditingDescription] = useState("")
  const [editingAmount, setEditingAmount] = useState("")

  // --------------------------------
  // CREATE PROPOSAL
  // --------------------------------
  const handleCreateProposal = () => {

    // Validate required fields
    if (
      proposalId.trim() === "" ||
      selectedEstimationId === "" ||
      description.trim() === "" ||
      proposedAmount === ""
    ) {
      alert("Please fill all fields")
      return
    }

    // Validate the proposed amount
    if (
      !Number.isFinite(Number(proposedAmount)) ||
      Number(proposedAmount) <= 0
    ) {
      alert("Please enter a valid proposed amount")
      return
    }

    // Check for duplicate Proposal ID
    if (
      proposals.some(
        (proposal) => proposal.proposalId === proposalId.trim()
      )
    ) {
      alert("Proposal ID already exists")
      return
    }

    // Find the selected Estimation
    const selectedEstimation = estimations.find(
      (estimation) => estimation.estimationId === selectedEstimationId
    )

    // Stop if the Estimation is unavailable
    if (!selectedEstimation) {
      alert("Please select a valid Estimation")
      return
    }

    // Create Proposal using the linked customer
    createProposal(
      proposalId.trim(),
      selectedEstimation.estimationId,
      selectedEstimation.customerId,
      description.trim(),
      proposedAmount
    )

    // Clear the form
    setProposalId("")
    setSelectedEstimationId("")
    setDescription("")
    setProposedAmount("")

    alert("Proposal created successfully!")
  }

  // --------------------------------
  // SELECT APPROVED ESTIMATION
  // --------------------------------
  const handleEstimationChange = (estimationId: string) => {
    setSelectedEstimationId(estimationId)

    // Find selected Estimation
    const selectedEstimation = estimations.find(
      (item) => item.estimationId === estimationId
    )

    // Populate Description and Amount
    if (selectedEstimation) {
      setDescription(selectedEstimation.description)
      setProposedAmount(selectedEstimation.estimatedAmount)
    }
    else {
      setDescription("")
      setProposedAmount("")
    }
  }

  // --------------------------------
  // START EDITING A DRAFT PROPOSAL
  // --------------------------------
  const handleEditProposal = (proposal: ProposalRecord) => {
    setEditingProposalId(proposal.proposalId)
    setEditingRevision(proposal.revision)
    setEditingDescription(proposal.description)
    setEditingAmount(proposal.proposedAmount)
  }

  // --------------------------------
  // SAVE EDITED PROPOSAL
  // --------------------------------
  const handleSaveProposal = () => {

    // Validate required fields
    if (
      editingDescription.trim() === "" ||
      editingAmount === ""
    ) {
      alert("Please fill all fields")
      return
    }

    // Validate amount
    if (
      !Number.isFinite(Number(editingAmount)) ||
      Number(editingAmount) <= 0
    ) {
      alert("Please enter a valid proposed amount")
      return
    }

    // Update only the selected proposal version
    if (editingRevision !== null) {
      updateProposalDetails(
        editingProposalId,
        editingRevision,
        editingDescription.trim(),
        editingAmount
      )
    }

    // Clear editing state
    setEditingProposalId("")
    setEditingRevision(null)
    setEditingDescription("")
    setEditingAmount("")
  }

  // --------------------------------
  // CANCEL PROPOSAL EDITING
  // --------------------------------
  const cancelEditing = () => {
    setEditingProposalId("")
    setEditingRevision(null)
    setEditingDescription("")
    setEditingAmount("")
  }

  // --------------------------------
  // DISPLAY PROPOSAL FORM AND LIST
  // --------------------------------
  return (
    <div>
      <h2>Proposals</h2>

      {/* --------------------------------
          CREATE NEW PROPOSAL
      -------------------------------- */}
      <h3>Create New Proposal</h3>

      {/* PROPOSAL ID */}
      <input
        type="text"
        placeholder="Enter Proposal ID"
        value={proposalId}
        onChange={(e) => setProposalId(e.target.value)}
      />

      <br />

      {/* SELECT APPROVED ESTIMATION */}
      <select
        value={selectedEstimationId}
        onChange={(e) => handleEstimationChange(e.target.value)}
      >
        <option value="">Select Approved Estimation</option>

        {estimations
          .filter((item) => item.status === "Approved")
          .map((item) => (
            <option
              key={item.estimationId}
              value={item.estimationId}
            >
              {item.estimationId}
            </option>
          ))}
      </select>

      <br />

      {/* PROPOSAL DESCRIPTION */}
      <input
        type="text"
        placeholder="Enter Proposal Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />

      {/* PROPOSED AMOUNT */}
      <input
        type="number"
        placeholder="Enter Proposed Amount"
        value={proposedAmount}
        onChange={(e) => setProposedAmount(e.target.value)}
      />

      <br />

      {/* CREATE PROPOSAL BUTTON */}
      <button onClick={handleCreateProposal}>
        Create Proposal
      </button>

      {/* --------------------------------
          PROPOSAL LIST
      -------------------------------- */}
      <h3>Created Proposals</h3>

      {proposals.length === 0 && (
        <p>No proposals created yet.</p>
      )}

      {proposals.map((proposal) => {

        // Find linked customer
        const customer = customers.find(
          (item) => item.customerId === proposal.customerId
        )

        // Check whether this proposal is currently being edited
        const isEditing =
          editingProposalId === proposal.proposalId &&
          editingRevision === proposal.revision

        return (
          <div key={`${proposal.proposalId}-R${proposal.revision}`}>
            <p>
              <strong>
                {proposal.proposalId} - R{proposal.revision}
              </strong>
              {" - "}
              {customer?.name ?? "Unknown Customer"}
              {" - "}
              {proposal.description}
              {" - "}
              ₹{proposal.proposedAmount}
              {" - "}
              {proposal.status}
            </p>

            {/* --------------------------------
                EDIT DRAFT PROPOSAL
            -------------------------------- */}
            {isEditing && (
              <div>
                <h4>Edit Proposal</h4>

                {/* EDIT DESCRIPTION */}
                <input
                  type="text"
                  placeholder="Enter Description"
                  value={editingDescription}
                  onChange={(e) =>
                    setEditingDescription(e.target.value)
                  }
                />

                <br />

                {/* EDIT AMOUNT */}
                <input
                  type="number"
                  placeholder="Enter Proposed Amount"
                  value={editingAmount}
                  onChange={(e) => setEditingAmount(e.target.value)}
                />

                <br />

                {/* SAVE EDIT */}
                <button onClick={handleSaveProposal}>
                  Save Changes
                </button>

                {" "}

                {/* CANCEL EDIT */}
                <button onClick={cancelEditing}>
                  Cancel
                </button>
              </div>
            )}

            {/* EDIT DRAFT BUTTON */}
            {proposal.status === "Draft" && !isEditing && (
              <button onClick={() => handleEditProposal(proposal)}>
                Edit Draft
              </button>
            )}

            {/* SUBMIT FOR REVIEW */}
            {proposal.status === "Draft" && (
              <button
                onClick={() =>
                  updateProposalStatus(
                    proposal.proposalId,
                    proposal.revision,
                    "In Review"
                  )
                }
              >
                Submit for Review
              </button>
            )}

            {/* INTERNAL APPROVAL */}
            {proposal.status === "In Review" && (
              <button
                onClick={() =>
                  updateProposalStatus(
                    proposal.proposalId,
                    proposal.revision,
                    "Approved"
                  )
                }
              >
                Approve
              </button>
            )}

            {/* SEND PROPOSAL TO CLIENT */}
            {proposal.status === "Approved" && (
              <button
                onClick={() =>
                  updateProposalStatus(
                    proposal.proposalId,
                    proposal.revision,
                    "Sent to Client"
                  )
                }
              >
                Send to Client
              </button>
            )}

            {/* CLIENT ACCEPTANCE */}
            {proposal.status === "Sent to Client" && (
              <button
                onClick={() =>
                  updateProposalStatus(
                    proposal.proposalId,
                    proposal.revision,
                    "Accepted"
                  )
                }
              >
                Client Accept
              </button>
            )}

            {/* CREATE NEW REVISION */}
            {proposal.status === "Sent to Client" && (
              <button
                onClick={() =>
                  reviseProposal(
                    proposal.proposalId,
                    proposal.revision
                  )
                }
              >
                Create Revision
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Proposal