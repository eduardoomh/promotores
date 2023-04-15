// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database/connection'
import Commission from '../../../database/models/Commission'
import { CommissionDataI } from '../../../interfaces/commission.interfaces'

type Data =
    | { message: string }
    | CommissionDataI
    | CommissionDataI[]


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    switch (req.method) {
        case 'GET':
            return getCommissions(res)
        case 'POST':
            console.log("entra al promoter post")
            return postCommission(req, res)
        default:
            return res.status(400).json({ message: 'Endpoint no existe' })
    }

}

const getCommissions = async (res: NextApiResponse<Data>) => {
    await db.connect()
    const comisiones = await Commission.find().sort({ $natural: -1 }).populate('promoter')

    await db.disconnect()
    return res.status(200).json(comisiones)
}

const postCommission = async (req: NextApiRequest, res: NextApiResponse<Data>) =>{
    const { commission } = req.body

    const newCommission = new Commission({
        ...commission,
        created_at: Date.now(),
        updated_at: Date.now()
    })

    try{
        await db.connect()
        await newCommission.save()
        const savedCommission = await Commission.findById(newCommission._id).populate('promoter')
        await db.disconnect()
        return res.status(201).json(savedCommission as CommissionDataI)

    }catch(error){
        await db.disconnect()
        console.log(error)
        return res.status(500).json({message: "Algo salió mal, revisar consola del servidor"})
    }
    
}