import Image from "next/image";
import Link from "next/link";

import { classNames } from "../../../../app/helpers/utils";
import { ProductInterface } from "../../../../app/models/product";

export default function ProductBlock({ name, price, link, photo, white }: ProductInterface & { _id: string, link: string, white?: boolean }) {
    return <Link href={link} className={classNames("block rounded-[30px] bg-white overflow-hidden shadow-lg relative z-0 p-3 pb-5", white ? '' : 'before:bg-primary/[0.05] before:absolute before:inset-0 before:-z-10 after:absolute after:inset-0 after:-z-20 after:bg-grid-primary/[0.05]')}>
        <div className="mt-8 mb-3">
            <Image width={1920} height={1920} src={photo!} alt={name} className="object-contain w-full h-28" />
        </div>
        
        <div className="text-sm line-clamp-2 mb-1.5">{name}</div>

        <div>
            <span className="font-bold text-lg">{price}</span>{' '}<span className="opacity-50 text-xs">XAF</span>
        </div>
    </Link>
}