import mongoose, { Model, Schema } from 'mongoose'
import { CommissionDataI } from '../../interfaces/commission.interfaces'

const commissionSchema = new Schema({
    promoter: {
        type: Schema.Types.ObjectId,
        ref: "Promoter",
        required: true
    },
    code: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    commission: {
        type: Number,
        required: true
    },
    created_at: {
        type: Number,
    },
    updated_at: {
        type: Number,
    }
})

const CommissionModel: Model<CommissionDataI> = mongoose.models.Commission || mongoose.model('Commission', commissionSchema)
export default CommissionModel