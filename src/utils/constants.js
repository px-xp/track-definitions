'use client'

const MIDICHANS = Array.from({ length: 16 }, (_, index) => index + 1)

const GX = Array.from({ length: 4 }, (_, index) => `G${index + 1}`)

const CVX = Array.from({ length: 4 }, (_, index) => `CV${index + 1}`)

const CVGX = Array.from({ length: 4 }, (_, index) => `CVG${index + 1}`)

const POTNUMBER = Array.from({ length: 8 }, (_, index) => index + 1)

const DRUMLANES = ['NULL'].concat(MIDICHANS, GX, CVGX, CVX)

const TYPE = [
    'NULL',
    'POLY',
    'MPE',
    'DRUM'
]

const OUTPORT = ['NULL', 'A', 'B', 'C', 'D', 'USBD', 'USBH'].concat(GX, CVX, CVGX)

const OUTCHAN = ['NULL'].concat(MIDICHANS)

const INCHAN = ['NULL', 'ALL'].concat(MIDICHANS)

const MAXRATE =  ['NULL'].concat([192, 96, 64, 48, 32, 24, 16, 12, 8, 6, 4, 3, 2, 1].sort((a,b) => a - b))

const INPORT = ['NONE', 'ALLACTIVE', 'A', 'B', 'USBH', 'USBD', 'CVG', 'NULL']

const ASSIGN_TYPE = ['CC', 'PB', 'AT', 'CV', 'NRPN', 'NULL']

const AUTOMATION_TYPE = ['CC', 'PB', 'AT', 'CV', 'NRPN']

const DEPTH = [7, 14]

const MAX_AUTOMATION_LANES = 64

const MAX_DRUMLANES = 8

const COLLECTIONS = ['Drumlane', 'ProgramChange', 'Automation', 'CC', 'NRPN', 'Assign']

export {
    TYPE,
    OUTPORT,
    OUTCHAN,
    INCHAN,
    MAXRATE,
    INPORT,
    DRUMLANES,
    ASSIGN_TYPE,
    AUTOMATION_TYPE,
    DEPTH,
    MAX_AUTOMATION_LANES,
    MAX_DRUMLANES,
    POTNUMBER,
    COLLECTIONS,
}