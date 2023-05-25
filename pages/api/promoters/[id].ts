// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database/connection'
import Promotor from '../../../database/models/Promoter'
import { PromoterDataI } from '../../../interfaces/promoter.interfaces'
import User from '../../../database/models/User'

type Data =
    | { message: string }
    | PromoterDataI

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
            return updatePromoter(req, res)
        case 'DELETE':
            return deletePromoter(req, res)
        default:
            return res.status(400).json({ message: 'El método no existe' })
    }

}

const getEntry = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query

    await db.connect()
    const entryToGet = await Promotor.findById(id)
    await db.disconnect()

    if (!entryToGet) {
        return res.status(400).json({ message: 'No existe entrada con ese Id' })
    }

    res.status(200).send(entryToGet)

}

const updatePromoter = async (req: NextApiRequest, res: NextApiResponse) => {

    const { id } = req.query

    await db.connect()
    const promoterToUpdate = await Promotor.findById(id)

    if (!promoterToUpdate) {
        await db.disconnect()
        return res.status(400).json({ message: 'No hay promotores con ese Id' })
    }

    const { promoter } = req.body
    const existUser = await User.findOne({ _id: promoter.user_id })

    if (!existUser) {
        res.status(400).json({ message: "El usuario no existe, intente de nuevo." })
    }

    try {
        const updatedPromotor = await Promotor.findByIdAndUpdate(
            id,
            { 
                ...promoter,
                email: existUser?.email
            },
            { runValidators: true, new: true }
        )
        db.disconnect()
        res.status(200).json(updatedPromotor)

    } catch (error: any) {
        await db.disconnect()
        res.status(400).json({ message: error.errors.status.message })
    }


    //entryToUpdate.description = description
    //entryToUpdate.status = status
    //entryToUpdate.save()



}

const deletePromoter = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    try {
        await db.connect()
        const promoterDelete = await Promotor.deleteOne({ _id: id })
        await db.disconnect()
        if (!promoterDelete.deletedCount) {
            return res.status(400).json({ 
                success: false,
                message: 'El promotor no existe' 
            })
        }
        res.status(200).send({
            success: true,
            message: 'Promotor eliminado correctamente' 
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ 
            success: false,
            message: 'Ha ocurrido un error inesperado' 
        })
    }

}

