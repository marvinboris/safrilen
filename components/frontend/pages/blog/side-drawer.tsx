import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

import { useContentContext } from "../../../../app/contexts/content";
import { PublicationInterface } from "../../../../app/models/publication";

import Input from "../../ui/form/input";

type Props = {
    publications: (PublicationInterface & { link?: string })[]
}

export default function BlogSideDrawer({ publications }: Props) {
    const { content } = useContentContext()
    const { cms: { frontend: { pages: { publications: cms } } } } = content!

    const publicationsContent = publications.map(publication => <div key={`publication-${publication.id}`}>
        <div className="flex items-center space-x-4">
            <Link href={publication.link!} className="flex-none block aspect-square w-20 relative overflow-hidden rounded-xl">
                <Image fill src={publication.photo!} alt={publication.title} className="image-cover absolute inset-0" />
            </Link>

            <div className="space-y-2">
                <Link href={publication.link!} className="font-semibold text-sm">{publication.title}</Link>
                <div className="text-xs line-clamp-2">{publication.description}</div>
            </div>
        </div>
    </div>)

    return <div className='space-y-6'>
        <div>
            <Input inputSize='sm' type="search" name='search' icon={MagnifyingGlassIcon} placeholder={cms.search} />
        </div>

        <div>
            <div className='mb-2 font-medium'>{cms.recent}</div>
            <div className="space-y-2">{publicationsContent}</div>
        </div>
    </div>
}