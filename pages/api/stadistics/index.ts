// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database/connection'
import User from '../../../database/models/User'
import Movement from '../../../database/models/Movement'
import Commission from '../../../database/models/Commission'

interface StatsI {
    promoters: number;
    admins: number;
    commissions: number;
    movements: number;
}

type Data =
    | { message: string }
    | StatsI


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    switch (req.method) {
        case 'GET':
            return getStats(res)
        default:
            return res.status(400).json({ message: 'Endpoint no existe' })
    }

}

const getStats = async (res: NextApiResponse<Data>) => {
    await db.connect()
    const promoters = (await User.find({ role: "promoter" })).length
    const admins = (await User.find({ role: "admin" })).length
    const commissions = (await Commission.find()).length
    const movements = (await Movement.find()).length

    await db.disconnect()
    return res.status(200).json({
        promoters,
        admins,
        commissions,
        movements
    })
}
