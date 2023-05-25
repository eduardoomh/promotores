// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database/connection'
import Metadata from '../../../database/models/Metadata'
import Promotor from '../../../database/models/Promoter'
import { PromoterDataI } from '../../../interfaces/promoter.interfaces'

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
            return updateMetadata(req, res)
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

const updateMetadata = async (req: NextApiRequest, res: NextApiResponse) => {

    const { id } = req.query

    await db.connect()
    const metaToUpdate = await Metadata.findById(id)

    if (!metaToUpdate) {
        await db.disconnect()
        return res.status(400).json({ message: 'No hay metadata con ese Id' })
    }

    const { store_keys } = req.body

    try {
        const updatedMeta = await Metadata.findByIdAndUpdate(id, { store_keys }, { runValidators: true, new: true })
        db.disconnect()
        res.status(200).json(updatedMeta)

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

    await db.connect()
    const promoterDelete = await Promotor.deleteOne({_id: id})
    await db.disconnect()

    if (!promoterDelete) {
        return res.status(400).json({ message: 'No existe entrada con ese Id' })
    }

    res.status(200).send(promoterDelete)

}
