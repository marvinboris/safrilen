import { Product } from "../models";
import { ProductInterface } from "../models/product";

const products: ProductInterface[] = [
    { price: 5000000, photo: 'Grupo-electrogeno-Dagartech_Industrial-insonorizado-grande_CTA.png', name: "Groupes électrogènes", description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?`, isActive: true },
    { price: 30000, photo: '6.png', name: "Équipements de protection individuelle", description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?`, isActive: true },
    { price: 20000, photo: '7.png', name: "Onduleurs électriques", description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?`, isActive: true },
    { price: 100000, photo: '8.png', name: "Produits solaires", description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur debitis ea repellat ducimus et asperiores minus esse! Voluptate illum ullam explicabo veniam adipisci recusandae ipsa maxime natus eligendi voluptatum?`, isActive: true },
]

export default async function productsSeed() {
    for await (const product of products) {
        Product.create(product)
    }
}