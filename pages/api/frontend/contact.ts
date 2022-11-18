import { NextApiRequest, NextApiResponse } from "next";

import { Image, Testimonial } from "../../../app/models";
import ApiMessageType from "../../../app/types/api/message";
import sendMail from "../../../lib/nodemailer";

import { handleError } from "../../../lib/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | ApiMessageType>
) {
    try {
        const { name, email, subject, message } = req.body

        await sendMail({
            to: 'jaris.ultio.21@gmail.com',
            subject: 'Nouveau message de contact',
            html: `
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/plus-jakarta-display.min.css" />
                <main style="font-family: 'Plus Jakarta Display', sans-serif; color: #5A657D;">
                    <h2>Nouveau message de contact</h2>
                    <p>En voici les détails :</p>
                    <ul>
                    <li>Nom : <strong>${name}</strong></li>
                    <li>Adresse mail : <strong>${email}</strong></li>
                    <li>Objet : <strong>${subject}</strong></li>
                    <li>Message : <strong>${message}</strong></li>
                    </ul>
                </main>
            `
        })

        res.json({
        })
    } catch (error) {
        handleError(res, error)
    }
}