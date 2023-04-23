// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database/connection'
import User from '../../../database/models/User'
import { UserDataI } from '../../../interfaces/user.interfaces'
import { encrypt } from '../../../utils/HashHelpers'

type Data =
    | { message: string }
    | UserDataI
    | UserDataI[]


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    switch (req.method) {
        case 'GET':
            return getUsers(res)
        case 'POST':
            return postUser(req, res)
        default:
            return res.status(400).json({ message: 'Endpoint no existe' })
    }

}

const getUsers = async (res: NextApiResponse<Data>) => {
    await db.connect()
    const users = await User.find().sort({ $natural: -1 })

    await db.disconnect()
    return res.status(200).json(users)
}

const postUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { user } = req.body
    const { password, email } = user

    const existUser = await User.findOne({email})
    if(existUser){
        return res.status(500).json({ message: "Ya existe un usuario con el mismo correo, intenta nuevamente." })
    }

    const hashPassword = await encrypt(password)
    const newUser = new User({
        ...user,
        password: hashPassword,
        created_at: Date.now(),
        updated_at: Date.now()
    })

    try {
        await db.connect()
        newUser.save()
        await db.disconnect()
        return res.status(201).json(newUser)

    } catch (error) {
        await db.disconnect()
        console.log(error)
        return res.status(500).json({ message: "Algo salió mal, revisar consola del servidor" })
    }

}