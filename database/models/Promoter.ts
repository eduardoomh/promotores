import mongoose, { Model, Schema } from 'mongoose'
import { PromoterDataI } from '../../interfaces/promoter.interfaces'

const promoterSchema = new Schema({
    promoter_codes: [{
        type: String
    }],
    name: {
        type: String
    },
    last_name: {
        type: String
    },
    phone: {
        type: String
    },
    cell_phone: {
        type: String
    },
    email: {
        type: String
    },
    rfc: {
        type: String
    },
    address: {
        type: String
    },
    postal_code: {
        type: String
    },
    type: {
        type: String,
        enum: {
            values: ['active', 'inactive'],
            message: '{VALUE} no es un estado permitido'
        },
        default: 'pending'
    },
    balance: {
        type: Number,
        default: 0,
        required: false,
    },
    created_at: {
        type: Number,
    },
    updated_at: {
        type: Number,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const PromoterModel: Model<PromoterDataI> = mongoose.models.Promoter || mongoose.model('Promoter', promoterSchema)
export default PromoterModel