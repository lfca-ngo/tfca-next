/* eslint-disable no-console */
import admin from 'firebase-admin'
import { initializeApp } from 'firebase-admin/app'
import { readFile } from 'fs/promises'

const initApp = async () => {
  const serviceAccount = JSON.parse(
    await readFile(new URL('./firebase_admin_key.json', import.meta.url))
  )

  // initialize the app with a service account, granting admin privileges
  initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

const getAllUsersByTeamId = async (teamId) => {
  const results = await admin
    .firestore()
    .collection('users')
    .where('teamId', '==', teamId)
    .get()

  return results.docs.map((doc) => doc.data())
}

const run = async () => {
  await initApp()

  // get the team id as a param from the command line
  const teamId = process.argv[2]
  console.log('getting data for team id', teamId)

  if (!teamId) return console.log('missing team id')

  try {
    const users = await getAllUsersByTeamId(teamId)

    // iterate over all users
    // group and count the completedActions
    const completedActions = users.reduce((acc, user) => {
      if (!user.completedActions) return acc

      Object.keys(user.completedActions).forEach((key) => {
        if (!acc[key]) {
          acc[key] = 0
        }
        acc[key] += 1
      })
      return acc
    }, {})

    // do the same for the invites of each user
    const invites = users.reduce((acc, user) => {
      if (!user.invites) return acc

      Object.keys(user.invites).forEach((key) => {
        if (!acc[key]) {
          acc[key] = 0
        }
        acc[key] += 1
      })
      return acc
    }, {})

    console.log('completedActions: ', completedActions)
    console.log('invites: ', invites)

    // count total of completedActions
  } catch (error) {
    console.log('error', error)
  }
}

run()
