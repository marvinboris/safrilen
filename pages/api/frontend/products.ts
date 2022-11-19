import { NextApiRequest, NextApiResponse } from "next";

import { Product } from "../../../app/models";
import ApiMessageType from "../../../app/types/api/message";

import { handleError } from "../../../lib/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | ApiMessageType>
) {
    try {
        const products = await Product.find()

        res.json(products.map(product => product.toObject()))
    } catch (error) {
        handleError(res, error)
    }
}