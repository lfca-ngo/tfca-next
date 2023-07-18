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

const getAllUsersByTeamId = async () => {
  const results = await admin.firestore().collection('users').get()

  const users = results.docs.map((doc) => {
    const data = doc.data()
    return { ...data, userId: doc.id }
  })

  // group users by teamId
  const usersByTeamId = users.reduce((acc, user) => {
    if (!acc[user.teamId]) {
      acc[user.teamId] = []
    }

    acc[user.teamId].push(user)
    return acc
  }, {})

  return usersByTeamId
}

const run = async () => {
  await initApp()

  try {
    const users = await getAllUsersByTeamId()

    // count the number of users per team
    const usersPerTeam = Object.keys(users).reduce((acc, teamId) => {
      acc[teamId] = users[teamId].length
      return acc
    }, {})

    // filter out teams that have undefined or null as key
    const filteredUsersPerTeam = Object.keys(usersPerTeam).reduce(
      (acc, teamId) => {
        if (teamId !== 'undefined' && teamId !== 'null') {
          acc[teamId] = usersPerTeam[teamId]
        }
        return acc
      },
      {}
    )

    // sort by number of users
    const sortedUsersPerTeam = Object.keys(filteredUsersPerTeam)
      .sort((a, b) => filteredUsersPerTeam[b] - filteredUsersPerTeam[a])
      .reduce((acc, teamId) => {
        acc[teamId] = filteredUsersPerTeam[teamId]
        return acc
      }, {})
    console.log('users per team', sortedUsersPerTeam)
  } catch (error) {
    console.log('error', error)
  }
}

run()
