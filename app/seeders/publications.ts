import { Publication } from "../models";
import { PublicationInterface } from "../models/publication";

const publications: PublicationInterface[] = [
    { description: "Ce qu'il faut savoir sur l'énergie solaire.", photo: 'anders-j-hxUcl0nUsIY-unsplash.jpg', title: "L'énergie solaire", body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?`, isActive: true },
    { description: "L'électricité de la plus grande à la plus petite échelle.", photo: 'alexandre-debieve-FO7JIlwjOtU-unsplash.jpg', title: "Les circuits imprimés", body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?`, isActive: true },
    { description: "Les rudiments du bon électricien.", title: 'Les bases du câblage', photo: "nicolas-thomas-3GZi6OpSDcY-unsplash.jpg", body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?`, isActive: true },
]

export default async function publicationsSeed() {
    await Promise.all(publications.map(async publication => await Publication.create(publication)))
}