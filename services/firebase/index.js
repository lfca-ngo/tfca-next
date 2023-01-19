import { getApp, initializeApp } from 'firebase/app'
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore'

const REFERRALS_COLLECTION = 'referrals'

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

// Helper functions for tracking
export const trackAcceptedInvite = ({ invitedByUserId, userId }) => {
  return setDoc(
    doc(firestore, REFERRALS_COLLECTION, invitedByUserId),
    {
      acceptedInvites: {
        [`${userId}11`]: {
          actionCount: 0,
        },
      },
    },
    { merge: true }
  )
}

export const trackInvite = ({
  invitedUserId,
  invitedUserName,
  shortLink,
  teamId,
  userId,
  userName,
}) => {
  // add to invites of this user
  return setDoc(
    doc(firestore, REFERRALS_COLLECTION, userId),
    {
      invites: {
        [`${invitedUserId}`]: {
          name: invitedUserName,
          shortLink: shortLink,
        },
      },
      name: userName,
      teamId: teamId || null,
      userId: userId,
    },
    { merge: true }
  )
}

export const getTeamScores = async (teamId) => {
  try {
    const referralsRef = collection(firestore, REFERRALS_COLLECTION)
    const q = query(referralsRef, where('teamId', '==', teamId))
    const querySnapshot = await getDocs(q)
    const teamScores = []
    querySnapshot.forEach((doc) => {
      teamScores.push(doc.data())
    })

    return teamScores
  } catch (error) {}
}
