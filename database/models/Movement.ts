import mongoose, { Model, Schema } from 'mongoose'
import { MovementDataI } from '../../interfaces/movement.interfaces'

const movementsSchema = new Schema({
    order_number: {
        type: String,
        required: true
    },
    promoter: {
        type: Schema.Types.ObjectId,
        ref: "Promoter",
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    commission:{
        type: Number,
        required: true
    },
    code:{
        type: String,
        required: true
    },
    balance: {
        amount:{
            type: Number,
            required: true
        },
        before: {
            type: Number,
            required: true
        },
        after:{
            type: Number,
            required: true
        }
    },
    created_at: {
        type: Date,
        required: true
    }
})

const MovementsModel: Model<MovementDataI> = mongoose.models.Movement || mongoose.model('Movement', movementsSchema)
export default MovementsModel