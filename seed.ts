import dotenv from 'dotenv'
import mongoose from "mongoose";

import { Feature, Image, Product, Role, Service, Testimonial, User } from './app/models';

import featuresSeed from "./app/seeders/features";
import imagesSeed from './app/seeders/images';
import productsSeed from './app/seeders/products';
import rolesSeed from "./app/seeders/roles";
import servicesSeed from './app/seeders/services';
import testimonialsSeed from './app/seeders/testimonials';
import usersSeed from "./app/seeders/users";

dotenv.config({ path: './.env.local' })

mongoose.connect(process.env.MONGODB_URI!)
    .catch(error => {
        console.log(error.message)
        process.exit(1)
    })
    .then(async () => {
        console.log('Connected for seeding DB.')

        if (process.argv[2] === '-d') await destroyData()
        else await importData()

        mongoose.disconnect()
    })

const importData = async () => {
    try {
        await Feature.deleteMany()
        await Image.deleteMany()
        await Role.deleteMany()
        await Service.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        await Testimonial.deleteMany()

        await featuresSeed()
        await imagesSeed()
        await rolesSeed()
        await servicesSeed()
        await productsSeed()
        await usersSeed()
        await testimonialsSeed()

        console.log("DB seeded")
        process.exit(0)
    } catch (error) {
        console.log("DB not seeded", error)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Feature.deleteMany()
        await Image.deleteMany()
        await Role.deleteMany()
        await Service.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        await Testimonial.deleteMany()

        console.log("Data destroyed")
        process.exit(0)
    } catch (error) {
        console.log("Data not destroyed", error)
        process.exit(1)
    }
}