'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { DRUMLANES, ASSIGN_TYPE, AUTOMATION_TYPE, DEPTH, MAX_AUTOMATION_LANES, MAX_DRUMLANES, POTNUMBER } from '@/utils/constants'
import { strToU8, strFromU8, compressSync, decompressSync } from 'fflate'

const hashStorage = {
    getItem(key) {
        const params = new URLSearchParams(location.hash.slice(1))
        const value = params.get(key) ?? ''
        const compressed = new Uint8Array(value.split('-'))
        const decompressed = decompressSync(compressed)
        const orig = strFromU8(decompressed) 
        return orig
    },
    setItem(key, newValue) {
        const params = new URLSearchParams(location.hash.slice(1))
        const compressed = compressSync(strToU8(newValue))
        params.set(key, compressed.join('-').toString())
        location.hash = params.toString()
    },
    removeItem(key) {
        const params = new URLSearchParams(location.hash.slice(1))
        params.delete(key)
        location.hash = params.toString()
    }
}


let key = 0
function getKey() {
    key++
    return key
}

function Drumlane(options) {
    key++
    return {
        id: key,
        fieldSetName: 'DRUMLANE', 
        formItems:[
        {
            key: `ds-${key}-row`,
            label: 'row',
            type: 'select',
            value: 1,
            keyName: 'row',
            options: options.POTNUMBER
        },
        {
            key: `ds-${key}-name`,
            label: 'name',
            keyName: 'name',
            type: 'input',
            value: 'boom-bada-boom',
        },
        {
            key: `ds-${key}-trig`,
            type: 'input',
            label: 'trigger',
            keyName: 'trig',
            value: '1'
        },
        {
            key: `ds-${key}-chan`,
            label: 'channel',
            type: 'select',
            keyName: 'chan',
            value: 'NULL',
            options: options.DRUMLANES
        },
        {
            key: `ds-${key}-notenumber`,
            label: 'note',
            type: 'input',
            keyName: 'notenumber',
            value: 'NULL',
        },
    ]}
}

function ProgramChange() {
    key++
    return {
        fieldSetName: 'PC',
        id: key,
        formItems: [
            {
                key: `pc-${key}-number`,
                label: 'number',
                type: 'input',
                keyName: 'number',
                value: '',
            },
            {
                key: `pc-${key}-name`,
                label: 'name',
                type: 'input',
                keyName: 'name',
                value: ''
            }
        ]
    }
}

function CCFormItem(key) {
    return {
        fieldSetName: 'CC',
        id: key,
        info: [
            'If DEFAULT is specified, it must be a valid number between 0 and 127.'
        ],
        formItems: [
            {
                key: `cc-${key}-number`,
                label: 'number',
                type: 'input',
                keyName: 'number',
                value: '',
            },
            {
                key: `cc-${key}-name`,
                label: 'name',
                type: 'input',
                keyName: 'name',
                value: ''
            },
            {
                key: `cc-${key}-default`,
                label: 'default',
                type: 'input',
                keyName: 'default',
                value: void 0,
            },
        ]
    }
}

function CC(key) {
    return {
        id: key,
        number: '',
        name: '',
        default: ''
    }
}

function NRPN(options) {
    key++
    return {
        fieldSetName: 'NRPN',
        id: key,
        info: [
            '<u>PC</u> must be between 1 and 128. <u>MSB/LSB</u> must be between 0 and 128 or NULL.'
        ],
        formItems: [
            {
                key: `nrpn-${key}-msb`,
                label: 'msb',
                type: 'input',
                keyName: 'msb',
                value: 0,
            },
            {
                key: `nrpn-${key}-lsb`,
                label: 'lsb',
                type: 'input',
                keyName: 'lsb',
                value: 0,
            },
            {
                key: `nrpn-${key}-depth`,
                label: 'depth',
                type: 'select',
                keyName: 'depth',
                value: 7,
                options: options.DEPTH,
            },
            {
                key: `nrpn-${key}-default`,
                label: 'default',
                keyName: 'default',
                type: 'input',
                value: ''
            },
            {
                key: `nrpn-${key}-name`,
                label: 'name',
                keyName: 'name',
                type: 'input',
                value: ''
            }
        ]
    }
}

function Assign(options) {
    key++
    return {
        fieldSetName: 'ASSIGN',
        id: key,
        info: [
            '<u>POTNUMBER</u> must be between 1 and 8.',
            'If <u>TYPE<u> is CC, value must be between 0 and 119. If <u>TYPE</u> is PB or AT, any text after <u>TYPE</u> will be ignored.',
        ],
        formItems: [
            {
                key: `assign-${key}-pot`,
                label: 'pot number',
                type: 'select',
                keyName: 'potnumber',
                value: 1,
                options: options.POTNUMBER
            },
            {
                key: `assign-${key}-type`,
                label: 'type',
                keyName: 'type',
                type: 'select',
                value: options.ASSIGN_TYPE[0],
                options: options.ASSIGN_TYPE
            },
            {
                key: `assign-${key}-value`,
                label: 'value',
                keyName: 'value',
                type: 'input',
                value: ''
            },
            {
                key: `assign-${key}-default`,
                keyName: 'default',
                label: 'default',
                type: 'input',
                value: ''
            },
        ]
    }
}

function Automation(options) {
    key++
    return {
        fieldSetName: 'AUTOMATION',
        id: key,
        info: [
            '<u>POTNUMBER</u> must be between 1 and 8.',
            'If <u>TYPE<u> is CC, value must be between 0 and 119. If <u>TYPE</u> is PB or AT, any text after <u>TYPE</u> will be ignored.',
        ],
        formItems: [
            {
                key: `at-${key}-type`,
                label: 'type',
                type: 'select',
                keyName: 'type',
                value: options.AUTOMATION_TYPE[0],
                options: options.AUTOMATION_TYPE
            },
            {
                key: `at-${key}-val`,
                label: 'value',
                type: 'input',
                keyName: 'value',
                value: ''
            },
        ]
    }
}


function collectionUpdater(d, id, key, v) {
    if (d.id == id) {
        d[key] = v
        d.map(item => {
            if (item.keyName == key) item.value = v
            return item
        })
    }
    return d
}

const baseState = {
    v: '1',
    tn: '',
    ty: 'NULL',
    op: 'NULL',
    oc: 'NULL',
    ip: 'NONE',
    ic: 'NULL',
    mr: 'NULL',
    ds: [],
    pc: [],
    cc: [],
    nn: [],
    as: [],
    at: [],
    c: '',
    dsFormItems: [],
    pcFormItems: [],
    ccFormItems: [],
    asFormItems: [],
    atFormItems: [],
}

const useTrackDefinition = create(
    persist(
        (set, get) => ({
            ...baseState,
    
            updateTrackname: (trackname) => set(() => ({tn: trackname})),
            updateType: (type) => set(() => ({ty: type})),
            updateOutchan: (outchan) => set(() => ({oc: outchan})),
            updateOutport: (outport) => set(() => ({op: outport})),
            updateInport: (inport) => set(() => ({ip: inport})),
            updateInchan: (inchan) => set(() => ({ic: inchan})),
            updateMaxrate: (maxrate) => set(() => ({mr: maxrate})),
            updateComment: (comment) => set(() => ({c: comment})),

            // Collection Actions
            addDrumlane: () => set((state) => ({
                ds: ((state.ds.length < MAX_DRUMLANES) ? state.ds.concat([Drumlane({DRUMLANES, POTNUMBER})]) : state.ds)
            })),
            updateDrumlane: (v, key, id) => set((state) => ({
                ds: state.ds.map(d => collectionUpdater(d, id, key, v))
            })),
            destroyDrumlane: (id) => set((state) => ({
                ds: state.ds.filter(d => {
                    return d.id != id 
                })
            })),

            addProgramChange: () => set((state) => ({
                pc: state.pc.concat([ProgramChange()])
            })),
            updateProgramChange: (v, key, id) => set((state) => ({
                pc: state.pc.map(d => collectionUpdater(d, id, key, v))
            })),
            destroyProgramChange: (id) => set((state) => ({
                pc: state.pc.filter(d => {
                    return d.id != id 
                })
            })),

            newCC: (cc) => set((state) => ({
                cc: state.cc.concat([cc])
            })),
            newCCFormItem: (ccFormItem) => set((state) => ({
                ccFormItems: state.ccFormItems.concat([ccFormItem])
            })),
            addCC: () => {
                const key = getKey()
                get().newCC(CC(key))
                get().newCCFormItem(CCFormItem(key))
            },

            updateCC: (v, key, id) => set((state) => ({
                cc: state.cc.map(d => collectionUpdater(d, id, key, v))
            })),
            destroyCC: (id) => set((state) => ({
                cc: state.cc.filter(d => {
                    return d.id != id 
                })
            })),

            addNRPN: () => set((state) => ({
                nn: state.nn.concat([NRPN({DEPTH})])
            })),
            updateNRPN: (v, key, id) => set((state) => ({
                nn: state.nn.map(d => collectionUpdater(d, id, key, v))
            })),
            destroyNRPN: (id) => set((state) => ({
                nn: state.nn.filter(d => {
                    return d.id != id 
                })
            })),

            addAutomation: () => set((state) => ({
                at: ((state.at.length < MAX_AUTOMATION_LANES) ? state.at.concat([Automation({AUTOMATION_TYPE, DEPTH})]): state.at)
            })),
            updateAutomation: (v, key, id) => set((state) => ({
                at: state.at.map(d => collectionUpdater(d, id, key, v))
            })),
            destroyAutomation: (id) => set((state) => ({
                at: state.at.filter(d => {
                    return d.id != id 
                })
            })),

            addAssign: () => set((state) => ({
                as: state.as.concat([Assign({POTNUMBER, ASSIGN_TYPE})])
            })),
            updateAssign: (v, key, id) => set((state) => ({
                as: state.as.map(d => collectionUpdater(d, id, key, v))
            })),
            destroyAssign: (id) => set((state) => ({
                as: state.as.filter(d => {
                    return d.id != id 
                })
            })),

            // Rendering
            toUIJSON: () => {
                console.log('preview')
                const obj = {
                    VERSION: '1',
                    TYPE: get().ty,
                    TRACKNAME: get().tn,
                    OUTPORT: get().op,
                    OUTCHAN: get().oc,
                    INPORT: get().ip,
                    INCHAN: get().ic,
                    MAXRATE: get().mr,
                    COMMENT: (get().c.length) ? [get().c] : [],
                    CC: get().cc,
                }

                // const collections = {
                //     //DRUMLANES: get().ds,
                //     //PC: get().pc,
                //     CC: get().cc,
                //     //NRPN: get().nn,
                //     //ASSIGN: get().as,
                //     //AUTOMATION: get().at,
                // }

                // Object.keys(collections).forEach(collectionKey => {
                //     const collection = collections[collectionKey]
                //     obj[collectionKey] = collection.reduce((accumulator, d) => {
                //         return accumulator.concat(d.reduce((obj, item) => {
                //             obj[item.keyName] = item.value
                //             return obj
                //         }, {}))
                //     }, [])
                // })
                
                return obj
            },
            
            reset: () => {
                set(baseState)
            },
 
            updateFromUpload: (uploadState) => set(() => ({
                //cc: (uploadState.cc?.length ? state.cc.splice(0, state.cc.length).concat(uploadState.cc) : state.cc),
                tn: uploadState.tn,
                c: uploadState.c,
                mr: uploadState.mr,
                ty: uploadState.ty,
                op: uploadState.op,
                oc: uploadState.oc,
                ip: uploadState.ip,
                ic: uploadState.ic,
            }))
            //     ds: (uploadState.ds?.length ? state.ds.splice(0, state.ds.length).concat(uploadState.ds) : state.ds),
            //     as: (uploadState.as?.length ? state.as.splice(0, state.as.length).concat(uploadState.as) : state.as),
            //     nn: (uploadState.nn?.length ? state.nn.splice(0, state.nn.length).concat(uploadState.nn) : state.nn),
            //     at: (uploadState.at?.length ? state.at.splice(0, state.at.length).concat(uploadState.at) : state.at),
            //     cc: (uploadState.cc?.length ? state.cc.splice(0, state.cc.length).concat(uploadState.cc) : state.cc),
            //     pc: (uploadState.pc?.length ? state.pc.splice(0, state.pc.length).concat(uploadState.pc) : state.pc)
            // })
        
        }),
        {
            name: 't',
            storage: createJSONStorage(() => hashStorage),
            skipHydration: true,
        }
    ))

export default useTrackDefinition