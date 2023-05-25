import mongoose, { Model, Schema } from 'mongoose'
import { CommissionDataI } from '../../interfaces/commission.interfaces'

const ProductsSchema =  new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    image_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
})
const CouponSchema = new Schema({
    id:{
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    discount_type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
        required: true
    },
    products: [ProductsSchema],
    status: {
        type: String,
        required: true
    },
})

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
    coupon: {
        type: CouponSchema,
        required: true
    },
    discount_type: {
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