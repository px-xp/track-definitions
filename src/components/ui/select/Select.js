'use client'

import { forwardRef } from 'react'
import Info from '../info/Info'
import { LABEL_STYLE } from '@/utils/ui-constants'
import { getSelectOptions } from '@/utils/ui-helpers'

const Select = forwardRef(({ onChange, info, onBlur, name, label, defaultValue, fieldsetName, keyName}, ref) => {
    const selectOptions = getSelectOptions(fieldsetName, keyName)

    return (<div className={`flex-1 px-2`}>
        <label className={LABEL_STYLE}>
            {label.toUpperCase()}
        </label>
        <Info info={info}/>
        <select
        ref={ref}
        name={name}
        type="text"
        id={name}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={label}
        value={defaultValue}
        className="mt-1 block w-full rounded bg-gray-100 dark:bg-gray-700 border-transparent focus:border-gray-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-0"
        >
         {selectOptions.map((opt) => {return <option key={opt} value={opt}>{opt}</option>})}
        </select>
    </div>)
})

Select.displayName = 'Select'

export default Select