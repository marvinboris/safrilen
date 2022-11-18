import { NextApiRequest, NextApiResponse } from "next";

import { Image, Service, Testimonial, User } from "../../../../app/models";

import { getAccount, getCms, handleError } from "../../../../lib/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | { error: string }>
) {
    try {
        const cms = getCms()
        const manager = await getAccount(req)

        const users = await User.count()
        const testimonials = await Testimonial.count()
        const services = await Service.count()
        const images = await Image.count()

        res.json({
            blocks: { users, testimonials, services, images },
        })
    } catch (error) {
        handleError(res, error)
    }
}