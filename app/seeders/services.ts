import { Service } from "../models";
import { ServiceInterface } from "../models/service";

const services: ServiceInterface[] = [
    // { photo: 'riccardo-annandale-7e2pe9wjL9M-unsplash.jpg', title: "Gestion stratégique de l'énergie", body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?`, isActive: true },
    // { photo: 'emmanuel-ikwuegbu-_2AlIm-F6pw-unsplash.jpg', title: "Contrôle, diagnostic et maintenance des installations", body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?`, isActive: true },
    // { photo: 'roberto-sorin-ZZ3qxWFZNRg-unsplash.jpg', title: "Recyclage de l'énergie", body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?`, isActive: true },
    // { photo: 'sigmund-r6tyWx_Mm9g-unsplash.jpg', title: "Equipement de protection individuelle", body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?`, isActive: true },
    // { photo: 'christopher-burns-8KfCR12oeUM-unsplash.jpg', title: "Service après vente", body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?`, isActive: true },

    { photo: 'riccardo-annandale-7e2pe9wjL9M-unsplash.jpg', title: "Fourniture d'énergie", body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?`, isActive: true },
    { photo: 'emmanuel-ikwuegbu-_2AlIm-F6pw-unsplash.jpg', title: "Installations", body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?`, isActive: true },
    { photo: 'roberto-sorin-ZZ3qxWFZNRg-unsplash.jpg', title: "Maintenance", body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?`, isActive: true },
    { photo: 'sigmund-r6tyWx_Mm9g-unsplash.jpg', title: "Formation", body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?`, isActive: true },
]

export default async function servicesSeed() {
    for await (const service of services) {
        Service.create(service)
    }
}