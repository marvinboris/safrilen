import Image from "next/image";
import Link from "next/link";

import { PublicationInterface } from "../../../../app/models/publication";

export default function PublicationBlock({ photo, title, description, link }: PublicationInterface & { link?: string }) {
    return <div className="rounded-[30px] overflow-hidden shadow">
        <Link href={link!} className="block aspect-[4/3] w-full relative">
            <Image fill src={photo!} alt={title} className="image-cover" />
        </Link>

        <div className="bg-white pt-4 pb-5 px-6">
            <Link href={link!} className="font-semibold text-lg">{title}</Link>
            <div className="text-sm truncate" title={description}>{description}</div>
        </div>
    </div>
}