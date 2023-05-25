// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database/connection'
import Metadata from '../../../database/models/Metadata'
import { MetadataDataI } from '../../../interfaces/metadata.interfaces'

type Data =
    | { message: string }
    | MetadataDataI
    | MetadataDataI[]


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    switch (req.method) {
        case 'GET':
            return getMetadata(res)
        case 'POST':
            return postMetadata(req, res)
        default:
            return res.status(400).json({ message: 'Endpoint no existe' })
    }

}

const getMetadata = async (res: NextApiResponse<Data>) => {
    await db.connect()
    const configurations = await Metadata.find().sort({ $natural: -1 })

    await db.disconnect()
    return res.status(200).json(configurations)
}

const postMetadata = async (req: NextApiRequest, res: NextApiResponse<Data>) =>{
    const { store_keys } = req.body

    const newMetadata = new Metadata({
        store_keys,
        promoter_codes: []
    })

    try{
        await db.connect()
        newMetadata.save()
        await db.disconnect()
        return res.status(201).json(newMetadata)

    }catch(error){
        await db.disconnect()
        console.log(error)
        return res.status(500).json({message: "Algo salió mal, revisar consola del servidor"})
    }
    
}