import { safeGetObjectsCount } from './get-objects-count'

const SCORE_WEIGHTS = {
  acceptedInvitesCount: 0.5,
  completedActions: 1,
  invitesCount: 0.1,
  totalActionsTriggered: 1,
}

export const getWeightedUserScore = ({ user, userScore }) => {
  return {
    acceptedInvitesCount:
      userScore?.acceptedInvitesCount * SCORE_WEIGHTS.acceptedInvitesCount,
    completedActions:
      safeGetObjectsCount(user?.completedActions) *
      SCORE_WEIGHTS.completedActions,
    invitesCount:
      safeGetObjectsCount(user?.invites) * SCORE_WEIGHTS.invitesCount,
    totalActionsTriggered:
      userScore?.totalActionsTriggered * SCORE_WEIGHTS.totalActionsTriggered,
  }
}
