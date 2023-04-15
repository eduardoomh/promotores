import mongoose, { Model, Schema } from 'mongoose'
import { MetadataDataI } from '../../interfaces/metadata.interfaces'

const metadataSchema = new Schema({
    store_keys: {
        client_id:{
            type: String,
            required: true
        },
        client_secret:{
            type: String,
            required: true
        },
        store_url:{
            type: String,
            required: true
        }
    },
    promoter_codes: [
		{
            promoter: {
                type: Schema.Types.ObjectId,
                ref: "Promoter",
                required: true
              },
              code: {
                type: String
              }
		},
	],
})

const MetadataModel: Model<MetadataDataI> = mongoose.models.Metadata || mongoose.model('Metadata', metadataSchema)
export default MetadataModel