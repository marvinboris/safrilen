import { Model, Schema } from "mongoose"

export interface FeatureInterface {
    id?: string
    firstName: string
    email: string
    createdAt?: Date
    updatedAt?: Date
}

export const FeatureSchema = new Schema<FeatureInterface, Model<FeatureInterface>>({
    firstName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
}, { timestamps: true })