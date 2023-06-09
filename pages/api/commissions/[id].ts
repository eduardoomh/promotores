// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database/connection'
import Commission from '../../../database/models/Commission'
import { CommissionDataI } from '../../../interfaces/commission.interfaces'

type Data =
    | { message: string }
    | CommissionDataI

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { id } = req.query

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'El id no es válido: ' + id })
    }

    switch (req.method) {
        case 'POST':
            return getCommission(req, res)
        case 'PATCH':
            return updateCommission(req, res)
        case 'DELETE':
            return deleteCommission(req, res)
        default:
            return res.status(400).json({ message: 'El método no existe' })
    }

}

const getCommission = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query

    await db.connect()
    const entriesToGet = await Commission.find({promoter: id}).populate('promoter')
    await db.disconnect()

    if (!entriesToGet) {
        return res.status(400).json({ message: 'No existe entrada con ese Id' })
    }

    res.status(200).send(entriesToGet)

}

const updateCommission = async (req: NextApiRequest, res: NextApiResponse) => {

    const { id } = req.query

    await db.connect()
    const commissionToUpdate = await Commission.findById(id)

    if (!commissionToUpdate) {
        await db.disconnect()
        return res.status(400).json({ message: 'No hay promotores con ese Id' })
    }

    const { commission } = req.body

    try {
        const updatedCommission = await Commission.findByIdAndUpdate(id, 
            { ...commission }, { runValidators: true, new: true }).populate('promoter')
        db.disconnect()
        res.status(200).json(updatedCommission)

    } catch (error: any) {
        await db.disconnect()
        res.status(400).json({ message: error.errors.status.message })
    }


}

const deleteCommission = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    try {
        await db.connect()
        const commissionDelete = await Commission.deleteOne({ _id: id })
        await db.disconnect()
        if (!commissionDelete.deletedCount) {
            return res.status(400).json({ 
                success: false,
                message: 'La comisión no existe' 
            })
        }
        res.status(200).send({
            success: true,
            message: 'Comisión eliminada correctamente' 
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ 
            success: false,
            message: 'Ha ocurrido un error inesperado' 
        })
    }

}