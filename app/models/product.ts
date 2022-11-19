import { Model, Schema } from "mongoose"
import slugify from 'slugify'

const directory = '/images/products/'

export interface ProductInterface {
    name: string
    description: string
    price: number
    photo?: string
    slug?: string
    isActive: boolean
    createdAt?: Date
    updatedAt?: Date
}

export const ProductSchema = new Schema<ProductInterface, Model<ProductInterface>>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
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
ProductSchema.virtual('link').get(function () { return `/products/${this.slug}` })

ProductSchema.pre<ProductInterface>("save", function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});