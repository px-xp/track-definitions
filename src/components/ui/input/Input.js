'use client'

import { forwardRef } from 'react'
import Info from '../info/Info'
import { LABEL_STYLE } from '@/utils/ui-constants'

const Input = forwardRef(({ onChange, info, onBlur, name, label, disabled, value, chunkWidth}, ref) => {
    return (<div className="flex-1 px-2">
        <label className={LABEL_STYLE}>
            {label.toUpperCase()}
        </label>
        <Info info={info}/>
        <input
        ref={ref}
        name={name}
        type="text"
        id={name}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        value={value}
        className="mt-1 block w-full rounded bg-gray-100 dark:focus:bg-gray-900 dark:bg-gray-700 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        />
    </div>)
})

export default Input