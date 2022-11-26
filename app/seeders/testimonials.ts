import { Testimonial } from "../models";
import { TestimonialInterface } from "../models/testimonial";

const testimonials: TestimonialInterface[] = [
    { name: "SONARA", body: "Une jeune équipe dynamique que nous recommandons fortement.", title: "Société Nationale de Raffinerie", photo: "logo-sonara.png", isActive: true },
    { name: "ANTIC", body: "Une expertise comme on en trouve rarement.", title: "Agence Nationale des TIC", photo: "logo-antic.png", isActive: true },
]

export default async function testimonialsSeed() {
    await Testimonial.insertMany(testimonials)
}