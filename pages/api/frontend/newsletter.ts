import { NextApiRequest, NextApiResponse } from "next";

import { message } from "../../../app/helpers/utils";
import { Subscriber } from "../../../app/models";
import ApiMessageType from "../../../app/types/api/message";

import sendMail from "../../../lib/nodemailer";
import { getCms, handleError } from "../../../lib/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | ApiMessageType>
) {
    try {
        const cms = getCms()
        const { firstName, email } = req.body

        await Subscriber.create({ firstName, email })

        await sendMail({
            to: email,
            subject: 'Bienvenue à la newsletter de Safrilen',
            html: `
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/plus-jakarta-display.min.css" />
                <main style="font-family: 'Plus Jakarta Display', sans-serif; color: #5A657D;">
                    <h2>Bienvenue à la newsletter de Safrilen</h2>
                    <p>Vous recevrez désormais nos publications.</p>
                </main>
            `
        })

        res.json({ message: message(cms.frontend.messages.newsletter.success, 'success') })
    } catch (error) {
        handleError(res, error)
    }
}