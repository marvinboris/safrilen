import { Product } from "../models";
import { ProductInterface } from "../models/product";

const products: ProductInterface[] = [
    { price: 5000000, photo: '15565044-1.jpg', name: "Groupes électrogènes", description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?`, isActive: true },
    { price: 30000, photo: 'EPI-pour-la-tête.png', name: "Équipements de protection individuelle", description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?`, isActive: true },
    { price: 20000, photo: 'TS-700-248B_3.png', name: "Onduleurs DC/AC", description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?`, isActive: true },
    { price: 100000, photo: '60db0912dc413.png', name: "Panneaux solaires", description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?`, isActive: true },
]

export default async function productsSeed() {
    for await (const product of products) {
        Product.create(product)
    }
}