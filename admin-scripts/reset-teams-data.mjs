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

const deleteUsers = async (users) => {
  const batch = admin.firestore().batch()

  users.forEach((user) => {
    const docRef = admin.firestore().collection('users').doc(user.userId)
    batch.delete(docRef)
  })

  return batch.commit()
}

const resetTeamsData = async (teamId) => {
  const users = await getAllUsersByTeamId(teamId)
  console.log('...deleting users:', users.length)
  await deleteUsers(users)
  return true
}

const run = async () => {
  await initApp()

  // get the team id as a param from the command line
  const teamId = process.argv[2]
  console.log('deleting data for team id', teamId)

  if (!teamId) return console.log('missing team id')

  try {
    await resetTeamsData(teamId)
  } catch (error) {
    console.log('error', error)
  }
}

run()
