import { Publication } from "../models";
import { PublicationInterface } from "../models/publication";

const publications: PublicationInterface[] = [
    { body: "Lorem ipsum dolor", photo: '7.png', title: "Onduleurs électriques", description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?`, isActive: true },
    { body: "Lorem ipsum dolor", photo: '8.png', title: "Onduleurs solaires", description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?`, isActive: true },
    { body: "Lorem ipsum dolor", photo: 'Grupo-electrogeno-Dagartech_Industrial-insonorizado-grande_CTA.png', title: "Groupes électrogènes", description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?`, isActive: true },
    { body: "Lorem ipsum dolor", photo: '6.png', title: "Équipements de protection individuelle", description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?`, isActive: true },
]

export default async function publicationsSeed() {
    await Promise.all(publications.map(async publication => await Publication.create(publication)))
}