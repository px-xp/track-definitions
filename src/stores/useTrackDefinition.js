'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MAX_AUTOMATION_LANES, MAX_DRUMLANES } from '@/utils/constants'
//import { strToU8, strFromU8, compressSync, decompressSync } from 'fflate'

// const hashStorage = {
//     getItem(key) {
//         const params = new URLSearchParams(location.hash.slice(1))
//         const value = params.get(key) ?? ''
//         const compressed = new Uint8Array(value.split('-'))
//         const decompressed = decompressSync(compressed)
//         const orig = strFromU8(decompressed) 
//         return orig
//     },
//     setItem(key, newValue) {
//         const params = new URLSearchParams(location.hash.slice(1))
//         const compressed = compressSync(strToU8(newValue))
//         const finalValue = compressed.join('-').toString()
//         params.set(key, finalValue)
//         location.hash = params.toString()
//     },
//     removeItem(key) {
//         const params = new URLSearchParams(location.hash.slice(1))
//         params.delete(key)
//         location.hash = params.toString()
//     }
// }

let key = 0

function Drumlane(data) {
    key++
    return {
        id: key,
        fieldSetName: 'drumlane', 
        formItems:[
        {
            key: `ds-${key}-row`,
            label: 'row',
            type: 'select',
            value: data.row || '1',
            keyName: 'row',
        },
        {
            key: `ds-${key}-name`,
            label: 'name',
            keyName: 'name',
            type: 'input',
            value: data.name || 'boom-bada-boom',
        },
        {
            key: `ds-${key}-trig`,
            type: 'input',
            label: 'trigger',
            keyName: 'trig',
            value: data.trig || '1'
        },
        {
            key: `ds-${key}-chan`,
            label: 'channel',
            type: 'select',
            keyName: 'chan',
            value: data.chan || 'NULL',
        },
        {
            key: `ds-${key}-notenumber`,
            label: 'note',
            type: 'input',
            keyName: 'notenumber',
            value: data.notenumber || 'NULL',
        },
    ]}
}

function ProgramChange(data) {
    key++
    return {
        fieldSetName: 'pc',
        id: key,
        formItems: [
            {
                key: `pc-${key}-number`,
                label: 'number',
                type: 'input',
                keyName: 'number',
                value: data.number || '',
            },
            {
                key: `pc-${key}-name`,
                label: 'name',
                type: 'input',
                keyName: 'name',
                value: data.name || ''
            }
        ]
    }
}

function CC(data) {
    key++
    return {
        fieldSetName: 'cc',
        id: key,
        info: [
            'If DEFAULT is specified, it must be a valid number between 0 and 127.'
        ],
        formItems: [
            {
                key: `ctch-${key}-number`,
                label: 'number',
                type: 'input',
                keyName: 'number',
                value: data.number || '',
            },
            {
                key: `ctch-${key}-name`,
                label: 'name',
                type: 'input',
                keyName: 'name',
                value: data.name || ''
            },
            {
                key: `ctch-${key}-default`,
                label: 'default',
                type: 'input',
                keyName: 'default',
                value: data.default || '',
            },
        ]
    }
}

function NRPN(data) {
    key++
    return {
        fieldSetName: 'nrpn',
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
                value: data.msb || '0',
            },
            {
                key: `nrpn-${key}-lsb`,
                label: 'lsb',
                type: 'input',
                keyName: 'lsb',
                value: data.lsb || '0',
            },
            {
                key: `nrpn-${key}-depth`,
                label: 'depth',
                type: 'select',
                keyName: 'depth',
                value: data.depth || '7',
            },
            {
                key: `nrpn-${key}-default`,
                label: 'default',
                keyName: 'default',
                type: 'input',
                value: data.default || ''
            },
            {
                key: `nrpn-${key}-name`,
                label: 'name',
                keyName: 'name',
                type: 'input',
                value: data.name || ''
            }
        ]
    }
}

function Assign(data) {
    key++
    return {
        fieldSetName: 'assign',
        id: key,
        info: [
            '<u>POTNUMBER</u> must be between 1 and 8.',
            'If <u>TYPE<u> is CC, value must be between 0 and 119. If <u>TYPE</u> is PB or AT, any text after <u>TYPE</u> will be ignored.',
        ],
        formItems: [
            {
                key: `assign-${key}-pot`,
                label: 'pot',
                type: 'select',
                keyName: 'potnumber',
                value: data.potnumber || '1',
            },
            {
                key: `assign-${key}-type`,
                label: 'type',
                keyName: 'type',
                type: 'select',
                value: data.type || 'CC',
            },
            {
                key: `assign-${key}-value`,
                label: 'value',
                keyName: 'value',
                type: 'input',
                value: data.value || ''
            },
            {
                key: `assign-${key}-default`,
                keyName: 'default',
                label: 'default',
                type: 'input',
                value: data.default || ''
            },
        ]
    }
}

function Automation(data) {
    key++
    return {
        fieldSetName: 'automation',
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
                value: data.type || 'CC',
            },
            {
                key: `at-${key}-val`,
                label: 'value',
                type: 'input',
                keyName: 'value',
                value: data.value || ''
            },
        ]
    }
}


function collectionUpdater(d, id, key, v) {
    if (d.id == id) {
        d.formItems.map(item => {
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
            addDrumlane: (data) => set((state) => ({
                ds: ((state.ds.length < MAX_DRUMLANES) ? state.ds.concat([Drumlane(data || {})]) : state.ds)
            })),
            updateDrumlane: (v, key, id) => set((state) => ({
                ds: state.ds.map(d => collectionUpdater(d, id, key, v))
            })),
            destroyDrumlane: (id) => set((state) => ({
                ds: state.ds.filter(d => {
                    return d.id != id 
                })
            })),

            addProgramChange: (data) => set((state) => ({
                pc: state.pc.concat([ProgramChange(data || {})])
            })),
            updateProgramChange: (v, key, id) => set((state) => ({
                pc: state.pc.map(d => collectionUpdater(d, id, key, v))
            })),
            destroyProgramChange: (id) => set((state) => ({
                pc: state.pc.filter(d => {
                    return d.id != id 
                })
            })),

        
            addCC: (data) => set((state) => ({
                cc: state.cc.concat(CC(data || {}))
            })),
            updateCC: (v, key, id) => set((state) => ({
                cc: state.cc.map(d => collectionUpdater(d, id, key, v))
            })),
            destroyCC: (id) => set((state) => ({
                cc: state.cc.filter(d => {
                    return d.id != id 
                })
            })),

            addNRPN: (data) => set((state) => ({
                nn: state.nn.concat([NRPN(data || {})])
            })),
            updateNRPN: (v, key, id) => set((state) => ({
                nn: state.nn.map(d => collectionUpdater(d, id, key, v))
            })),
            destroyNRPN: (id) => set((state) => ({
                nn: state.nn.filter(d => {
                    return d.id != id 
                })
            })),

            addAutomation: (data) => set((state) => ({
                at: ((state.at.length < MAX_AUTOMATION_LANES) ? state.at.concat([Automation(data || {})]): state.at)
            })),
            updateAutomation: (v, key, id) => set((state) => ({
                at: state.at.map(d => collectionUpdater(d, id, key, v))
            })),
            destroyAutomation: (id) => set((state) => ({
                at: state.at.filter(d => {
                    return d.id != id 
                })
            })),

            addAssign: (data) => set((state) => ({
                as: state.as.concat([Assign(data || {})])
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
                }

                const collections = {
                    DRUMLANES: get().ds,
                    PC: get().pc,
                    CC: get().cc,
                    NRPN: get().nn,
                    ASSIGN: get().as,
                    AUTOMATION: get().at,
                }

                Object.keys(collections).forEach(collectionKey => {
                    const collection = collections[collectionKey]
                    obj[collectionKey] = collection.reduce((accumulator, d) => {
                        return accumulator.concat(d.formItems.reduce((obj, item) => {
                            obj[item.keyName] = item.value
                            return obj
                        }, {}))
                    }, [])
                })
                
                return obj
            },
            
            reset: () => {
                set(baseState)
            },
 
            updateFromUpload: (uploadState) => {
                get().reset()
                if (uploadState.tn) get().updateTrackname(uploadState.tn)
                if (uploadState.ty) get().updateType(uploadState.ty)
                if (uploadState.oc) get().updateOutchan(uploadState.oc)
                if (uploadState.op) get().updateOutport(uploadState.op)
                if (uploadState.ip) get().updateInport(uploadState.ip)
                if (uploadState.ic) get().updateInchan(uploadState.ic)
                if (uploadState.mr) get().updateMaxrate(uploadState.mr)
                if (uploadState.c) get().updateComment(uploadState.c)
            
                uploadState.ds?.forEach(d => {
                    get().addDrumlane(d)
                })
                uploadState.cc?.forEach(d => {
                    get().addCC(d)
                })
                uploadState.nn?.forEach(d => {
                    get().addNRPN(d)
                })
                uploadState.as?.forEach(d => {
                    get().addAssign(d)
                })
                uploadState.at?.forEach(d => {
                    get().addAutomation(d)
                })
                uploadState.pc?.forEach(d => {
                    get().addProgramChange(d)
                })
            }
        }),
        {
            name: 't',
            skipHydration: true,
        }
    ))

export default useTrackDefinition