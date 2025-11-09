/**
 * Visitor Status Constants
 */
export const VISITOR_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;

export type VisitorStatus = typeof VISITOR_STATUS[keyof typeof VISITOR_STATUS];

