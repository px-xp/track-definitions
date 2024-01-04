'use client'

import useTrackDefinition from '../../../stores/useTrackDefinition'
import Fieldset from './Fieldset'
import FormItems  from './FormItems'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { OUTPORT, OUTCHAN, INCHAN, INPORT, MAXRATE, TYPE, COLLECTIONS } from '@/utils/constants'
import { CollectionHeader } from '../CollectionHeader'
import Button from '../../ui/Button'

export default function TrackDefinitionForm() {
    const localUse = (prop) => useTrackDefinition(state => state[prop])

    // useEffect(() => {
    //     useTrackDefinition.persist.rehydrate();
    //   }, [])

    // Settings
    // Singular
    const v = localUse('v')
    const tn =localUse('tn')
    const ty = localUse('ty')
    const op = localUse('op')
    const oc = localUse('oc')
    const ip = localUse('ip')
    const ic = localUse('ic')
    const mr = localUse('mr')
    const c = localUse('c')

    const updateTrackname = localUse('updateTrackname')
    const updateOutport = localUse('updateOutport')

    // Multiform
    const ds = localUse('ds')
    const cc = localUse('ccFormItems')
    const nn = localUse('nn')
    const at = localUse('at')
    const as = localUse('as')
    const pc = localUse('pc')

    // Actions
    const destroyers = COLLECTIONS.reduce((accumulator, value) => {
        accumulator[value] = localUse(`destroy${value}`)
        return accumulator
    }, {})

    const updaters = COLLECTIONS.reduce((accumulator, value) => {
        accumulator[value] = localUse(`update${value}`)
        return accumulator
    }, {})

    const adders = COLLECTIONS.reduce((accumulator, value) => {
        accumulator[value] = localUse(`add${value}`)
        return accumulator
    }, {}) 

    const { register } = useForm()

    const baseFormData = [
        [
            {
                label: 'version',
                type: 'input',
                name: 'v',
                key: 'version',
                value: v,
                disabled: true,
                defaultValue: 1,
                onChange: () => {},
            },
            {
                label: 'type',
                type: 'select',
                name: 'ty',
                key: 'select',
                value: ty,
                onChange: localUse('updateType'),
                options: TYPE,
            },
            {
                label: 'maxrate',
                name: 'mr',
                type: 'select',
                key: 'maxrate',
                value: mr,
                options: MAXRATE,
                onChange: localUse('updateMaxrate')
            },
        ],
        [
            {
                label: 'trackname',
                type: 'input',
                name: 'tn',
                key: 'trackname',
                info: `Supports all alphanumeric ASCII, and ' ', '_', '-', '+' - can also be NULL.`,
                value: tn,
                onChange: updateTrackname
            }
        ],
        [
        {
            label: 'outport',
            name: 'op',
            type: 'select',
            key: 'outport',
            value: op,
            options: OUTPORT,
            onChange: updateOutport
        },
        {
            label: 'outchan',
            name: 'oc',
            type: 'select',
            key: 'outchan',
            value: oc,
            options: OUTCHAN,
            onChange: localUse('updateOutchan')
        },
        {
            label: 'inport',
            name: 'ip',
            type: 'select',
            key: 'inport',
            value: ip,
            options: INPORT,
            onChange: localUse('updateInport')
        },
        {
            label: 'inchan',
            name: 'ic',
            type: 'select',
            key: 'inchan',
            value: ic,
            options: INCHAN,
            onChange: localUse('updateInchan')
        }],
        [
        {
            label: 'comments',
            name: 'c',
            key: 'comments',
            value: c,
            type: 'input',
            onChange: localUse('updateComment')
        }]
    ]

    return (<><form className="w-full">
        <div>
            {baseFormData.map((chunk, index) => {
                return <FormItems 
                formItems={chunk}
                chunkWidth={chunk.length}
                register={register}
                key={`baseform-${index}`} />
            })}

        {/* <CollectionHeader text="Drumlanes"/>
        {ds.map((value, key) => {
            return <Fieldset
            key={key}
            formItems={value.formItems}
            onChange={updaters.Drumlane}
            fieldsetName={value.fieldSetName}
            fieldsetKey={value.id}
            fieldsetDestroy={destroyers.Drumlane}
            register={register} />
        })}

        <Button bg="bg-purple-100 hover:bg-purple-500 dark:text-black w-full" onClick={adders.Drumlane}>Add Drumlane</Button>
         */}
        <CollectionHeader text="Control Changes"/>
        {cc.map((value, key) => {
            return <Fieldset
            key={key}
            formItems={value.formItems}
            onChange={updaters.CC}
            fieldsetName={value.fieldSetName}
            fieldsetKey={value.id}
            fieldsetDestroy={destroyers.CC}
            register={register} />
        })}

        <Button bg="bg-yellow-100 hover:bg-yellow-400 dark:text-black w-full" onClick={adders.CC}>Add CC</Button>
{/* 
        <CollectionHeader text="Program Changes"/>
        {pc.map((value, key) => {
            return <Fieldset
            key={key}
            formItems={value.formItems}
            onChange={updaters.ProgramChange}
            fieldsetName={value.fieldSetName}
            fieldsetKey={value.id}
            fieldsetDestroy={destroyers.ProgramChange}
            register={register} />
        })}

        <Button bg="bg-pink-100 hover:bg-pink-300 dark:text-black w-full" onClick={adders.ProgramChange}>Add PC</Button>

        <CollectionHeader text="Assigns"/>
        {as.map((value, key) => {
            return <Fieldset
            key={key}
            formItems={value.formItems}
            onChange={updaters.Assign}
            fieldsetName={value.fieldSetName}
            fieldsetKey={value.id}
            fieldsetDestroy={destroyers.Assign}
            register={register} />
        })}

        <Button bg="bg-rose-100 hover:bg-rose-400 dark:text-black w-full" onClick={adders.Assign}>Add Assign</Button>

        <CollectionHeader text="Non-Registered Parameter Numbers"/>
        {nn.map((value, key) => {
            return <Fieldset
            key={key}
            formItems={value.formItems}
            onChange={updaters.NRPN}
            fieldsetName={value.fieldSetName}
            fieldsetKey={value.id}
            fieldsetDestroy={destroyers.NRPN}
            register={register} />
        })}

        <Button bg="bg-teal-100 hover:bg-teal-400 dark:text-black w-full" onClick={adders.NRPN}>Add NRPN</Button>
        
        <CollectionHeader text="Automations"/>
        {at.map((value, key) => {
            return <Fieldset
            key={key}
            formItems={value.formItems}
            onChange={updaters.Automation}
            fieldsetName={value.fieldSetName}
            fieldsetKey={value.id}
            fieldsetDestroy={destroyers.Automation}
            register={register} />
        })}

        <Button bg="bg-blue-100 hover:bg-blue-400 dark:text-black w-full" onClick={adders.Automation}>Add Automation</Button> */}

        </div>
    </form>
    </>)
}