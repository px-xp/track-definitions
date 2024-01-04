'use client'

import FormItems from './FormItems'

const Fieldset = ({ formItems, fieldsetName, fieldsetKey, fieldsetDestroy, register, onChange}, ref) => { 
    return (<fieldset id={`${fieldsetName}-${fieldsetKey}`}>
        <FormItems 
        formItems={formItems}
        onChange={onChange}
        register={register}
        id={fieldsetKey}
        destroyHandler={fieldsetDestroy}
        key={fieldsetKey}/>
    </fieldset>)
}

export default Fieldset