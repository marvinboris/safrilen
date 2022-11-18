import { NextApiRequest, NextApiResponse } from "next";

import { Service } from "../../app/models";
import ApiMessageType from "../../app/types/api/message";

import { getCms, handleError } from "../../lib/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | ApiMessageType>
) {
    try {
        const cms = getCms()
        const services = await Service.find()

        res.json({ cms, services: services.map(service => service.toObject()) })
    } catch (error) {
        handleError(res, error)
    }
}