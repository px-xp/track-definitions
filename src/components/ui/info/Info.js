'use client'

import { InformationCircleIcon } from '@heroicons/react/24/outline' 

const Info = ({ info, bg }) => {
    if (info) {
        const style = `text-small ${bg}`
        return (
            <p className="align-middle">
                <InformationCircleIcon className="w-5 h-5 inline"/>
                <span className={style} >&nbsp;{info}</span>
            </p>
        )
    }
}

export default Info