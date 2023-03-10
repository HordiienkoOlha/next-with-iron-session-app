// import type { User } from './user'

import { Octokit } from 'octokit'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
// import { NextApiRequest, NextApiResponse } from 'next'
const octokit = new Octokit()

async function loginRoute(req, res) {
  const { username } = await req.body

  try {
    const {
      data: { login, avatar_url },
    } = await octokit.rest.users.getByUsername({ username })

    const user = { isLoggedIn: true, login, avatarUrl: avatar_url }
    req.session.user = user
    await req.session.save()
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: (error).message })
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions)
