// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database/connection'
import User from '../../../../database/models/User'
import { UserDataI } from '../../../../interfaces/user.interfaces'

type Data =
    | { message: string }
    | UserDataI

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { role } = req.query

    if (role !== 'promoter' && role !== 'admin') {
        return res.status(400).json({ message: 'El Rol no es válido: ' + role })
    }

    switch (req.method) {
        case 'GET':
            return getUsersByRole(req, res)
        default:
            return res.status(400).json({ message: 'El método no existe' })
    }

}

const getUsersByRole = async (req: NextApiRequest, res: NextApiResponse) => {
    const { role } = req.query

    await db.connect()
    const usersByRole = await User.find({role})
    await db.disconnect()

    if (!usersByRole) {
        return res.status(400).json({ message: `No existen usuarios con el rol ${role}` })
    }

    res.status(200).send(usersByRole)

}

