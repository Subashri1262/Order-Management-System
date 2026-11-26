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