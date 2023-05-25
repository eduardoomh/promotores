// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database/connection'
import User from '../../../database/models/User'
import { UserDataI } from '../../../interfaces/user.interfaces'
import { encrypt } from '../../../utils/HashHelpers'

type Data =
    | { message: string }
    | UserDataI

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { id } = req.query

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'El id no es válido: ' + id })
    }

    switch (req.method) {
        case 'GET':
            return getEntry(req, res)
        case 'PATCH':
            return updateUser(req, res)
        case 'DELETE':
            return deleteUser(req, res)
        default:
            return res.status(400).json({ message: 'El método no existe' })
    }

}

const getEntry = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query

    await db.connect()
    const entryToGet = await User.findById(id)
    await db.disconnect()

    if (!entryToGet) {
        return res.status(400).json({ message: 'No existe entrada con ese Id' })
    }

    res.status(200).send(entryToGet)

}

const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {

    const { id } = req.query

    await db.connect()
    const userToUpdate = await User.findById(id)

    if (!userToUpdate) {
        await db.disconnect()
        return res.status(400).json({ message: 'No hay usuarios con ese Id' })
    }

    const { user } = req.body

    try {
        let userData = user
        if (user?.password) {
            userData = {
                ...userData,
                password: await encrypt(user?.password),
            }
        }
        const updatedPromotor = await User.findByIdAndUpdate(
            id, {
            ...userData,
            updated_at: Date.now()
        },
            { runValidators: true, new: true }
        )
        db.disconnect()
        res.status(200).json(updatedPromotor)

    } catch (error: any) {
        await db.disconnect()
        res.status(400).json({ message: error.errors.status.message })
    }

}

const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    try {
        await db.connect()
        const userDelete = await User.deleteOne({ _id: id })
        await db.disconnect()
        if (!userDelete.deletedCount) {
            return res.status(400).json({ 
                success: false,
                message: 'El usuario no existe' 
            })
        }
        res.status(200).send({
            success: true,
            message: 'Usuario eliminado correctamente' 
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ 
            success: false,
            message: 'Ha ocurrido un error inesperado' 
        })
    }

}
