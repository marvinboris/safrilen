import { Service } from "../models";
import { ServiceInterface } from "../models/service";

const services: ServiceInterface[] = [
    { photo: 'sigmund-r6tyWx_Mm9g-unsplash.jpg', title: "Fourniture d'équipement", body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?`, isActive: true },
    { photo: 'emmanuel-ikwuegbu-_2AlIm-F6pw-unsplash.jpg', title: "Installation", body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?`, isActive: true },
    { photo: 'christopher-burns-8KfCR12oeUM-unsplash.jpg', title: "Maintenance", body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?`, isActive: true },
    { photo: 'riccardo-annandale-7e2pe9wjL9M-unsplash.jpg', title: "Formation", body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?`, isActive: true },
]

export default async function servicesSeed() {
    await Promise.all(services.map(async service => await Service.create(service)))
}