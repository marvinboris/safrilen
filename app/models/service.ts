import { Model, Schema } from "mongoose"
import slugify from 'slugify'

const directory = '/images/services/'

export interface ServiceInterface {
    id?: string
    title: string
    body: string
    photo?: string
    slug?: string
    isActive: boolean
    createdAt?: Date
    updatedAt?: Date
}

export const ServiceSchema = new Schema<ServiceInterface, Model<ServiceInterface>>({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true,
        get: (photo: string) => directory + photo
    },
    slug: {
        type: String,
        unique: true
    },
    isActive: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true, toObject: { getters: true, virtuals: true } })

// Virtuals
ServiceSchema.virtual('link').get(function () { return `/services/${this.slug}` })

ServiceSchema.pre<ServiceInterface>("save", function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});