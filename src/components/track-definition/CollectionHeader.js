'use client'

import { PlusCircleIcon } from '@heroicons/react/24/outline'

export function CollectionHeader({text, action}) {
    return (<div className="pt-2 block align-middle content-center justify-center tracking-wide text-small font-semibold mb-3">
        <span className="uppercase">{text}</span>
    </div>)
}