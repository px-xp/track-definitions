'use client'

// Decouples options from ui to save on memory

import { DEPTH, POTNUMBER, ASSIGN_TYPE, AUTOMATION_TYPE, DRUMLANES, TYPE, MAXRATE, OUTPORT, OUTCHAN, INCHAN, INPORT } from './constants'

const optionMap = {
    type: TYPE,
    maxrate: MAXRATE,
    outport: OUTPORT,
    outchan: OUTCHAN,
    inport: INPORT,
    inchan: INCHAN,
    nrpn: {
        depth: DEPTH
    },
    assign: {
        potnumber: POTNUMBER,
        type: ASSIGN_TYPE,
    },
    drumlane: {
        row: POTNUMBER,
        chan: DRUMLANES
    },
    automation: {
        depth: DEPTH,
        type: AUTOMATION_TYPE
    },
    notfound: []
}

const getSelectOptions = (fieldSetName, keyName) => {
    if (optionMap[fieldSetName]) {
        if (keyName == void 0) return optionMap[fieldSetName]
        return optionMap[fieldSetName][keyName] ?? optionMap['notfound']
    }
    return optionMap['notfound']
}

export {
    getSelectOptions
}