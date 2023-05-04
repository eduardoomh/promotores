// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database/connection'
import Movement from '../../../database/models/Movement'
import Promoter from '../../../database/models/Promoter'
import PromoterModel from '../../../database/models/Promoter'
import { MovementDataI } from '../../../interfaces/movement.interfaces'

type Data =
    | { message: string }
    | MovementDataI
    | MovementDataI[]


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    switch (req.method) {
        case 'GET':
            return getMovements(res)
        case 'POST':
            console.log("entra al promoter post")
            return postMovements(req, res)
        default:
            return res.status(400).json({ message: 'Endpoint no existe' })
    }

}

const getMovements = async (res: NextApiResponse<Data>) => {
    await db.connect()
    const movements = await Movement.find().sort({ $natural: -1 }).populate('promoter')

    await db.disconnect()
    return res.status(200).json(movements)
}

const postMovements = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { movement } = req.body
    await db.connect()
    const promoterExist = await PromoterModel.findOne({ _id: movement.promoter })

    console.log(movement)
    if (!promoterExist) {
        return res.status(500).json({ message: "Algo salió mal, usuario no existe" })
    }

    const movementData = { ...movement };
    delete movementData.amount

    let newBalance = promoterExist.balance + movement.amount

    const newMovement = new Movement({
        ...movementData,
        balance: {
            amount: movement.amount,
            before: promoterExist.balance,
            after: newBalance
        },
        created_at: Date.now(),
        updated_at: Date.now()
    })

    try {
        await newMovement.save()
        const savedMovement = await Movement.findById(newMovement._id).populate('promoter')
        await Promoter.findByIdAndUpdate(
            promoterExist._id,
            {
                balance: newBalance
            },
            {
                runValidators: true, 
                new: true
            }
        )

        await db.disconnect()
        return res.status(201).json(savedMovement as MovementDataI)

    } catch (error) {
        await db.disconnect()
        console.log(error)
        return res.status(500).json({ message: "Algo salió mal, revisar consola del servidor" })
    }

}