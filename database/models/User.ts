import mongoose, { Model, Schema } from 'mongoose'
import { UserDataI } from '../../interfaces/user.interfaces'

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: {
            values: ['promoter', 'admin'],
            message: '{VALUE} no es un rol permitido'
        },
        default: 'promoter'
    },
    created_at: {
        type: Number,
    },
    updated_at: {
        type: Number,
    }
})

const UserModel: Model<UserDataI> = mongoose.models.User || mongoose.model('User', userSchema)
export default UserModel