import { ChevronDoubleRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";

import { useContentContext } from "../../../../app/contexts/content";
import { classNames } from "../../../../app/helpers/utils";
import { ServiceInterface } from "../../../../app/models/service";

export default function ServiceBlock({ title, link, photo, white }: ServiceInterface & { _id: string, link: string, white?: boolean }) {
    const { content } = useContentContext()
    const { cms: { frontend: { components: { service_block } } } } = content!

    return <Link href={link} className={classNames("pb-5 block group w-full md:w-auto", white ? 'text-white' : '')}>
        <div className="aspect-video relative overflow-hidden rounded-[45px] w-full">
            {photo && <Image width={1920} height={1920} src={photo} alt={title} className="group-hover:scale-110 transition-all duration-200" />}
        </div>

        <div className="font-semibold text-xl truncate mt-3" title={title}>{title}</div>

        <div className='inline-flex items-center text-sm group'><span>{service_block.read_more}</span><ChevronDoubleRightIcon className="w-3 ml-1 group-hover:ml-2 group-hover:w-4 transition-all duration-200 text-yellow" /></div>
    </Link>
}