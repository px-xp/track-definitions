'use client'

import Input from '@/components/ui/input/Input'
import Select from '@/components/ui/select/Select'
import { TrashIcon } from '@heroicons/react/24/outline' 

const FormItems = ({ formItems, register, onChange, id, destroyHandler, fieldsetName }) => {
    let destroy = <></>
    if (destroyHandler) {
        destroy = <div className="flex items-center">
            <TrashIcon onClick={e => destroyHandler(id) } className="cursor-pointer inline h-5 w-5 text-red-500 hover:text-red-800"/>
        </div>
    }
    return (<>
        <div className="flex flex-wrap mb-6">
        {formItems.map(formItem => {
            // Handle global form changes or per item form change.
            const onChangeHandler = onChange || formItem.onChange
            const registerKey = `${formItem.key}-${id}`
            switch (formItem.type) {

                case 'select':
                    return <Select 
                    info={formItem.info} 
                    key={formItem.key} 
                    name={formItem.name} 
                    options={formItem.options} 
                    label={formItem.label}
                    keyName={formItem.keyName}
                    fieldsetName={fieldsetName || formItem.fieldsetName}
                    defaultValue={formItem.value}
                    {...register(
                        registerKey, {
                            onChange: (e) => onChangeHandler(e.target.value, formItem.keyName, id)
                        })
                    }/>

                case 'input':
                    return <Input 
                    info={formItem.info} 
                    key={formItem.key} 
                    label={formItem.label}
                    disabled={formItem.disabled}
                    value={formItem.value}
                    name={formItem.name}
                    {...register(
                        registerKey, 
                        {
                            onChange: (e) => onChangeHandler(e.target.value, formItem.keyName, id)
                        })
                    }/>

                default:
                    throw new Error('cannot render formitem :0')
            }
        })}
        {destroy}
        </div>
    </>)
}

export default FormItems