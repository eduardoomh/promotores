// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database/connection'
import Promotor from '../../../database/models/Promoter'
import { PromoterDataI } from '../../../interfaces/promoter.interfaces'

type Data =
    | { message: string }
    | PromoterDataI
    | PromoterDataI[]


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    switch (req.method) {
        case 'GET':
            return getPromotores(res)
        case 'POST':
            console.log("entra al promoter post")
            return postPromoter(req, res)
        default:
            return res.status(400).json({ message: 'Endpoint no existe' })
    }

}

const getPromotores = async (res: NextApiResponse<Data>) => {
    await db.connect()
    const promotores = await Promotor.find().sort({ $natural: -1 })

    await db.disconnect()
    return res.status(200).json(promotores)
}

const postPromoter = async (req: NextApiRequest, res: NextApiResponse<Data>) =>{
    const { promoter } = req.body

    const newPromoter = new Promotor({
        ...promoter,
        type: 'active',
        created_at: Date.now(),
        updated_at: Date.now()
    })

    console.log(promoter, newPromoter)

    try{
        await db.connect()
        newPromoter.save()
        await db.disconnect()
        return res.status(201).json(newPromoter)

    }catch(error){
        await db.disconnect()
        console.log(error)
        return res.status(500).json({message: "Algo salió mal, revisar consola del servidor"})
    }
    
}