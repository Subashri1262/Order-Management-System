// --------------------------------
// CUSTOMER TYPE
// --------------------------------
export type Customer = {
  customerId: string
  name: string
  email: string
  phone: string
}

// --------------------------------
// ORDER TYPE
// --------------------------------
export type Order = {
  orderId: string
  customerId: string

  // Link the Order to the accepted Proposal
  proposalId: string
  proposalRevision: number

  // Details inherited from the accepted Proposal
  description: string
  proposedAmount: string

  // Official client Purchase Order details
  formalPoNumber: string
  formalPoDate: string

  // Order workflow status
  status: string
}

// --------------------------------
// ESTIMATION TYPE
// --------------------------------
export type EstimationRecord = {
  estimationId: string
  customerId: string
  description: string
  estimatedAmount: string
  status: string
}

// --------------------------------
// PROPOSAL TYPE
// --------------------------------
export type ProposalRecord = {
  proposalId: string
  revision: number
  estimationId: string
  customerId: string
  description: string
  proposedAmount: string
  status: string
}

// --------------------------------
// WORK ORDER TYPE
// --------------------------------
export type WorkOrder = {
  workOrderId: string
  orderId: string
  customerId: string
  description: string
  workOrderDate: string
  status: string
}

// --------------------------------
// PROJECT TYPE
// --------------------------------
export type Project = {
  projectId: string
  workOrderId: string
  projectName: string
  startDate: string
  targetCompletionDate: string
  status: string
}
