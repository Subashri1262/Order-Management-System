
import { useState } from "react"
import type { ProposalRecord } from "./types"

// --------------------------------
// CREATE ORDER COMPONENT
// --------------------------------
type Props = {
  orderId: string
  setOrderId: (value: string) => void
  proposals: ProposalRecord[]
  createOrder: (proposal: ProposalRecord) => void
}

function CreateOrder({
  orderId,
  setOrderId,
  proposals,
  createOrder,
}: Props) {
  // Show only Proposals accepted by the client
  const acceptedProposals = proposals.filter(
    (proposal) => proposal.status === "Accepted"
  )

  // Store the selected Proposal and revision
  const [selectedProposalId, setSelectedProposalId] = useState("")

  // Find the exact selected Proposal revision
  const selectedProposal = acceptedProposals.find(
    (proposal) =>
      `${proposal.proposalId}-R${proposal.revision}` === selectedProposalId
  )

  // --------------------------------
  // CREATE ORDER
  // --------------------------------
  const handleCreateOrder = () => {
    if (!orderId.trim()) {
      alert("Please enter an Order ID.")
      return
    }

    if (!selectedProposal) {
      alert("Please select an accepted Proposal.")
      return
    }

    createOrder(selectedProposal)
    setSelectedProposalId("")
  }

  return (
    <div className="section">
      <h2>Create Order</h2>

      {/* Enter Order ID */}
      <input
        type="text"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />

      {/* Select Accepted Proposal */}
      <select
        value={selectedProposalId}
        onChange={(e) => setSelectedProposalId(e.target.value)}
      >
        <option value="">Select Accepted Proposal</option>

        {acceptedProposals.map((proposal) => (
          <option
            key={`${proposal.proposalId}-R${proposal.revision}`}
            value={`${proposal.proposalId}-R${proposal.revision}`}
          >
            {proposal.proposalId} - R{proposal.revision} - {proposal.description}
          </option>
        ))}
      </select>

      {/* Display selected Proposal details */}
      {selectedProposal && (
        <div>
          <p>
            <strong>Customer ID:</strong> {selectedProposal.customerId}
          </p>

          <p>
            <strong>Description:</strong> {selectedProposal.description}
          </p>

          <p>
            <strong>Proposed Amount:</strong> {selectedProposal.proposedAmount}
          </p>
        </div>
      )}

      {/* Create Order Button */}
      <button onClick={handleCreateOrder}>
        Create Order
      </button>

      {/* Message when no accepted Proposals exist */}
      {acceptedProposals.length === 0 && (
        <p>No accepted Proposals available. Accept a Proposal first.</p>
      )}
    </div>
  )
}

export default CreateOrder
