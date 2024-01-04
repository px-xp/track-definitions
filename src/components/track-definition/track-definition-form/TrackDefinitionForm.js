'use client'

import useTrackDefinition from '@/stores/useTrackDefinition'
import Fieldset from './Fieldset'
import FormItems  from './FormItems'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { CollectionHeader } from '../CollectionHeader'

export default function TrackDefinitionForm() {
    const useLocal = (prop) => useTrackDefinition(state => state[prop])

    useEffect(() => {
        useTrackDefinition.persist.rehydrate();
      }, [])

    // Settings Singular
    const v = useLocal('v')
    const tn =useLocal('tn')
    const ty = useLocal('ty')
    const op = useLocal('op')
    const oc = useLocal('oc')
    const ip = useLocal('ip')
    const ic = useLocal('ic')
    const mr = useLocal('mr')
    const c = useLocal('c')

    const updateTrackname = useLocal('updateTrackname')
    const updateOutport = useLocal('updateOutport')
    const updateOutchan = useLocal('updateOutchan')
    const updateType = useLocal('updateType')
    const updateMaxrate = useLocal('updateMaxrate')
    const updateComment = useLocal('updateComment')
    const updateInchan = useLocal('updateInchan')
    const updateInport = useLocal('updateInport')

    // Multiform
    const ds = useLocal('ds')
    const cc = useLocal('cc')
    const nn = useLocal('nn')
    const at = useLocal('at')
    const as = useLocal('as')
    const pc = useLocal('pc')

    const destroyers = {}
    destroyers.Assign = useLocal('destroyAssign')
    destroyers.CC = useLocal('destroyCC')
    destroyers.NRPN = useLocal('destroyNRPN')
    destroyers.Drumlane = useLocal('destroyDrumlane')
    destroyers.Automation = useLocal('destroyAutomation')
    destroyers.ProgramChange = useLocal('destroyProgramChange')

    const updaters = {}
    updaters.Assign = useLocal('updateAssign')
    updaters.CC = useLocal('updateCC')
    updaters.NRPN = useLocal('updateNRPN')
    updaters.Drumlane = useLocal('updateDrumlane')
    updaters.Automation = useLocal('updateAutomation') 
    updaters.ProgramChange = useLocal('updateProgramChange')

    const adders = {}
    adders.Assign = useLocal('addAssign')
    adders.CC = useLocal('addCC')
    adders.NRPN = useLocal('addNRPN')
    adders.Drumlane = useLocal('addDrumlane')
    adders.Automation = useLocal('addAutomation') 
    adders.ProgramChange = useLocal('addProgramChange')

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
                fieldsetName: 'type',
                value: ty,
                onChange: updateType,
            },
            {
                label: 'maxrate',
                name: 'mr',
                type: 'select',
                key: 'maxrate',
                value: mr,
                fieldsetName: 'maxrate',
                onChange: updateMaxrate
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
            fieldsetName: 'outport',
            value: op,
            onChange: updateOutport
        },
        {
            label: 'outchan',
            name: 'oc',
            type: 'select',
            key: 'outchan',
            fieldsetName: 'outchan',
            value: oc,
            onChange: updateOutchan
        },
        {
            label: 'inport',
            name: 'ip',
            type: 'select',
            key: 'inport',
            fieldsetName: 'inport',
            value: ip,
            onChange: updateInport
        },
        {
            label: 'inchan',
            name: 'ic',
            type: 'select',
            key: 'inchan',
            fieldsetName: 'inchan',
            value: ic,
            onChange: updateInchan
        }],
        [
        {
            label: 'comments',
            name: 'c',
            key: 'comments',
            value: c,
            type: 'input',
            onChange: updateComment
        }]
    ]

    return (<><form className="w-full">
        <div>
            {baseFormData.map((chunk, index) => {
                return <FormItems 
                formItems={chunk}
                register={register}
                key={`baseform-${index}`} />
            })}

        <CollectionHeader text="Drumlanes"/>
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

        <p className="p-2 cursor-pointer bg-purple-100 hover:bg-purple-300 dark:text-black w-full" onClick={() => adders.Drumlane()}>Add Drumlane</p>
        
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

        <p className="p-2 cursor-pointer bg-yellow-100 hover:bg-yellow-300 dark:text-black w-full" onClick={() => adders.CC()}>Add CC</p>


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

        <p className="p-2 cursor-pointer bg-pink-100 hover:bg-pink-300 dark:text-black w-full" onClick={() => adders.ProgramChange()}>Add PC</p>

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

        <p className="p-2 cursor-pointer bg-rose-100 hover:bg-rose-400 dark:text-black w-full" onClick={() => adders.Assign()}>Add Assign</p>

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

        <p className="p-2 cursor-pointer bg-teal-100 hover:bg-teal-400 dark:text-black w-full" onClick={() => adders.NRPN()}>Add NRPN</p>
        
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

        <p className="p-2 cursor-pointer bg-blue-100 hover:bg-blue-400 dark:text-black w-full" onClick={() =>adders.Automation()}>Add Automation</p>

        </div>
    </form>
    </>)
}