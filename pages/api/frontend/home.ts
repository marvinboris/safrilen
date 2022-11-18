import { NextApiRequest, NextApiResponse } from "next";

import { Image, Testimonial } from "../../../app/models";
import ApiMessageType from "../../../app/types/api/message";

import { handleError } from "../../../lib/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | ApiMessageType>
) {
    try {
        const images = await Image.find().limit(12)
        const testimonials = await Testimonial.find().limit(3)

        res.json({
            images: images.map(image => image.toObject()),
            testimonials: testimonials.map(testimonial => testimonial.toObject()),
        })
    } catch (error) {
        handleError(res, error)
    }
}