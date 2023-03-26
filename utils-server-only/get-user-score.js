const SCORE_WEIGHTS = {
  acceptedInvitesCount: 0.5,
  completedActions: 1,
  invitesCount: 0.1,
  totalActionsTriggered: 1,
}

export const getWeightedUserScore = (user) => {
  return {
    ...user,
    acceptedInvitesCount:
      user.acceptedInvitesCount * SCORE_WEIGHTS.acceptedInvitesCount,
    completedActions:
      Object.keys(user.completedActions || {}).length *
      SCORE_WEIGHTS.completedActions,
    invitesCount: user.invitesCount * SCORE_WEIGHTS.invitesCount,
    totalActionsTriggered:
      user.totalActionsTriggered * SCORE_WEIGHTS.totalActionsTriggered,
  }
}
