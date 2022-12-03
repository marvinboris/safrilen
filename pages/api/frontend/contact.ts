import { NextApiRequest, NextApiResponse } from "next";

import { message } from "../../../app/helpers/utils";
import ApiMessageType from "../../../app/types/api/message";

import sendMail from "../../../lib/nodemailer";
import { getCms, handleError } from "../../../lib/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | ApiMessageType>
) {
    try {
        const cms = getCms()
        const { name, email, subject, message: _message } = req.body

        await sendMail({
            to: 'jaris.ultio.21@gmail.com',
            subject: 'Nouveau message de contact',
            html: `
            <div class="max-w-lg mx-auto bg-white text-slate-700" style="margin-left: auto; margin-right: auto; max-width: 32rem; background-color: #fff; color: #334155;">
                <header class="flex items-center justify-center bg-slate-100" style="display: flex; align-items: center; justify-content: center; background-color: #f1f5f9;">
                    <img src="${process.env.APP_URL}/images/logo.png" alt="Logo" class="h-10 object-center" style="height: 40px; -o-object-position: center; object-position: center;">
                </header>
        
                <main class="px-3 py-12" style="padding-left: 12px; padding-right: 12px; padding-top: 48px; padding-bottom: 48px;">
                    <h2 class="mb-3" style="margin-bottom: 12px;">${"Nouveau message de contact"}</h2>
                    <p>${"En voici les détails:"}</p>
                    <ul>
                        <li>${"Nom"}: <strong>${name}</strong></li>
                        <li>${"Adresse mail"}: <strong>${email}</strong></li>
                        <li>${"Objet"}: <strong>${subject}</strong></li>
                        <li>${"Message"}: <strong>${_message}</strong></li>
                    </ul>
                </main>
            </div>
            `
        })

        res.json({ message: message(cms.frontend.messages.contact.success, 'success') })
    } catch (error) {
        handleError(res, error)
    }
}