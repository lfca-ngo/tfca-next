import { getApp, initializeApp } from 'firebase/app'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore'

const USERS_COLLECTION = 'users'
const TEAMS_COLLECTION = 'teams'

// Helper to get count of entries in object
const safeGetObjectsCount = (object) => {
  if (typeof object !== 'object') return 0
  return Object.keys(object).length
}

const config = {
  apiKey: process.env.FB_API_KEY,
  appId: process.env.FB_APP_ID,
  authDomain: process.env.FB_AUTH_DOMAIN,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
}

function createFirebaseApp(config) {
  try {
    return getApp()
  } catch {
    return initializeApp(config)
  }
}

const app = createFirebaseApp(config)
export const firestore = getFirestore(app)

/**
 * Track invites that are generated by the current user
 * to invite others to the app
 */
export const trackInvite = ({
  invitedUserId,
  invitedUserName,
  referredByTeamId,
  referredByUserId, // user that is creating the invite
  senderName,
  shortLink,
  teamId,
  userId,
}) => {
  // add to invites of this user
  return setDoc(
    doc(firestore, USERS_COLLECTION, userId),
    {
      invites: {
        [`${invitedUserId}`]: {
          name: invitedUserName,
          shortLink: shortLink,
        },
      },
      name: senderName,
      referredByTeamId: referredByTeamId || null,
      referredByUserId: referredByUserId || null,
      teamId: teamId || null,
      userId: userId,
    },
    { merge: true }
  )
}

/**
 * Track accepted invites, when a user who came
 * via referral starts using the app
 */

export const trackAcceptedInvite = ({
  invitedUserId,
  referredByTeamId,
  referredByUserId,
}) => {
  return setDoc(
    doc(firestore, USERS_COLLECTION, invitedUserId),
    {
      referredByTeamId,
      referredByUserId,
    },
    { merge: true }
  )
}

/**
 * Update completed actions for user
 */
export const updateCompletedActions = ({ actionId, userId }) => {
  // add to invites of this user
  return setDoc(
    doc(firestore, USERS_COLLECTION, userId),
    {
      completedActions: {
        [actionId]: serverTimestamp(),
      },
    },
    { merge: true }
  )
}

/**
 * Read team scores to show on the leaderboard
 */

const updateUserScore = (currentScore, referredUser) => {
  const completedActionsCount = safeGetObjectsCount(
    referredUser.completedActions
  )

  if (!currentScore) {
    return {
      acceptedInvitesCount: 1,
      totalActionsTriggered: completedActionsCount,
    }
  } else {
    return {
      acceptedInvitesCount: currentScore.acceptedInvitesCount + 1,
      totalActionsTriggered:
        currentScore.totalActionsTriggered + completedActionsCount,
    }
  }
}

export const getTeamScores = async (teamId) => {
  try {
    const usersRef = collection(firestore, USERS_COLLECTION)
    // get all users invited by this team
    const usersReferredByTeamIdQuery = query(
      usersRef,
      where('referredByTeamId', '==', teamId)
    )
    const usersReferredByTeamIdQuerySnapshot = await getDocs(
      usersReferredByTeamIdQuery
    )

    const usersScores = {}
    // for all users referred by this team, split them to
    // the individual users who referred them
    usersReferredByTeamIdQuerySnapshot.forEach((doc) => {
      const data = doc.data()

      const referredByUserId = data.referredByUserId
      // update the score of the user who created the referral
      usersScores[referredByUserId] = updateUserScore(
        usersScores[referredByUserId],
        data
      )
    })

    // get users meta data
    const usersWithTeamIdQuery = query(usersRef, where('teamId', '==', teamId))
    const usersWithTeamIdQuerySnapshot = await getDocs(usersWithTeamIdQuery)

    // create object with meta data
    const teamScores = []
    usersWithTeamIdQuerySnapshot.forEach((doc) => {
      const userData = doc.data()

      teamScores.push({
        invitesCount: safeGetObjectsCount(userData.invites),
        userId: doc.id,
        ...userData, // meta data
        // scores
        ...(usersScores[doc.id] || {
          acceptedInvitesCount: 0, // @TODO: replace
          totalActionsTriggered: 0,
        }),
      })
    })

    return teamScores
  } catch (error) {
    throw error.message
  }
}

export const getUserScore = async (userId) => {
  try {
    const usersRef = collection(firestore, USERS_COLLECTION)
    // get all users invited by this team
    const usersReferredByUserIdQuery = query(
      usersRef,
      where('referredByUserId', '==', userId)
    )
    const usersReferredByUserIdQuerySnapshot = await getDocs(
      usersReferredByUserIdQuery
    )

    let userScore
    // for all users referred by this user, calculate
    // the total score of this user
    usersReferredByUserIdQuerySnapshot.forEach((doc) => {
      const data = doc.data()
      // update the score of the user who created the referral
      userScore = updateUserScore(userScore, data)
    })

    // get users meta data
    const userRef = doc(firestore, USERS_COLLECTION, userId)
    const userSnap = await getDoc(userRef)

    const user = userSnap.exists() ? userSnap.data() : null

    return {
      user,
      userScore: {
        ...userScore,
        invitesCount: safeGetObjectsCount(user.invites),
      },
    }
  } catch (error) {
    throw error.message
  }
}

/**
 * Create or update team
 */
export const setTeam = async ({ companyId, teamId, userId }) => {
  const teamRef = doc(firestore, TEAMS_COLLECTION, teamId)
  const teamDoc = await getDoc(teamRef)
  const teamData = teamDoc.data()

  // if team id already exists, check if the user requesting
  // the change has the right to do, if yes -> allow update
  if (teamDoc.exists() && companyId !== teamData?.companyId) {
    throw 'Team exists and user does not have the right to update it'
  }

  // create or update a team
  return setDoc(
    doc(firestore, TEAMS_COLLECTION, teamId),
    {
      companyId: companyId,
      createdAt: serverTimestamp(),
      createdBy: userId,
      teamId: teamId,
    },
    {
      merge: true,
    }
  )
}

/**
 * Get all created teams
 */
export const getAllTeams = async () => {
  const teamsRef = collection(firestore, TEAMS_COLLECTION)
  const teamsDoc = await getDocs(teamsRef)

  return teamsDoc.data()
}
