import path from 'path';

import { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { Service } from '../../../../../app/models';

import { getCms, handleError, methodNotAllowed } from "../../../../../lib/utils";
import { manageResource } from '../../../../../lib/utils/resource';

export const data = async (req: NextApiRequest) => {
    const { page = 1, show = 10, search = '' } = req.query
    let total = 0

    const regex = new RegExp(search as string, 'i')

    const data = await Service
        .find({
            $or: [
                { title: regex },
                { body: regex },
            ]
        })
    total = data.length

    const services = (show === 'All' ? data :
        data.filter((_, index) => (+page - 1) * +show <= index && index < +page * +show)
    ).map(service => ({ ...service.toObject() }))

    return { services, total }
}

export const uploadDir = path.join(process.cwd(), 'public', 'images', 'services')
export const resource = 'services'
export const resourceConfig = {
    singular: 'service',
    fields: ['title', 'body', 'isActive'],
    file: { name: 'photo', uploadDir }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | { error: string }>
) {
    // const type = req.query.manager as string

    try {
        const cms = getCms()
        // const manager = await getAccount(req)
        const manage = manageResource(req, res, {
            data,
            model: Service,
            cms, resource,
            ...resourceConfig,
        })

        if (req.method === 'GET') return manage.get()
        else if (req.method === 'POST') return manage.post({
            validate: {
                title: { required: true },
                body: { required: true },
            },
            fields: {
                isActive: fields => fields.isActive == '1',
            }
        })
        else methodNotAllowed(req, res)
    } catch (error) {
        handleError(res, error)
    }
}

export const config: PageConfig = {
    api: {
        bodyParser: false,
    }
}