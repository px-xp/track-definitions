'use client'

const TYPattern = /^TYPE (POLY|MPE|DRUM|NULL)$/
const OPPattern = /^OUTPORT (\d{1,2}|A|B|C|D|USBH|USBD|G[1-4]|CV[1-4]|CVG[1-4]|NULL)$/
const OCPattern = /^OUTCHAN (NULL|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16)$/
const IPPattern = /^INPORT (NONE|ALLACTIVE|A|B|USBH|USBD|CVG|NULL)$/
const ICPattern = /^INCHAN (NULL|ALL|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16)$/
const MRPattern = /^MAXRATE (NULL|192|96|64|48|32|24|16|12|8|6|4|3|2|1)$/
const CCPattern = /^(\d+)(?::DEFAULT=(\d+))? (\S.+)$/
const PCPattern = /^(.+)\s+(\S.+)$/
const DSPattern = /^([1-8]):((?:\d+|NULL)):(\d{1,2}|G[1-4]|CV[1-4]|CVG[1-4]|NULL):((?:\d+|NULL)) (.+)$/
const NNPattern = /^(\d{1,3})?:(\d{1,4}):(?:(7|14))((:DEFAULT=(\d{1,3})))? (\S.+)$/
const ATPattern = /^(CC|CV|NRPN|AT|PB):(\S+)$/
const ASPattern = /^(1|2|3|4|5|6|7|8) (CC|PB|AT|CV|NRPN|NULL):(\S+)((\sDEFAULT=(\S.+))?)$/

const Parsers = {
    'ds': (line) => {
        const match = DSPattern.exec(line)
        if (match) {
            return {
                row: match[1],
                trig: match[2],
                chan: match[3],
                notenumber: match[4],
                name: match[5]
            }
        }
    },
    'cc': (line) => {
        const match = CCPattern.exec(line)
        if (match) {
            return {
                number: match[1],
                default: ((match[2] !== void 0) ? match[2] : void 0),
                name: match[3]
            }
        }
    },
    'as': (line) => {
        const match = ASPattern.exec(line)
        if (match) {
            return {
                potnumber: match[1],
                type: match[2],
                value: match[3],
                default: match[6]
            }
        }
    },
    'at': (line) => {
        const match = ATPattern.exec(line)
        if (match) {
            return {
                type: match[1],
                value: match[2]
            }
        }
    },
    'pc': (line) => {
        const match = PCPattern.exec(line)
        if (match) {
            const number = match[1]
            const name = match[2]
            return {
                number,
                name,
            }
        }
    },
    'c': (line) => {
        return line
    },
    'nn': (line) => {
        const match = NNPattern.exec(line)
        if (match) {
            return {
                msb: match[1],
                lsb: match[2],
                depth: match[3],
                default: match[6],
                name: match[7]
            }
        }
    },
    'VERSION': {
        key: 'v',
        parser: () => { return '1' }
    },
    'TYPE': {
        key: 'ty',
        parser: (line) => {
            const match = TYPattern.exec(line)
            if (match) return match[1]
        }
    },
    'MAXRATE': {
        key: 'mr',
        parser: (line) => {
            const match = MRPattern.exec(line)
            if (match) return match[1]
        }
    },
    'TRACKNAME': {
        key: 'tn',
        parser: (line) => {
            const result = line.split(' ')
            return result[1]
        }
    },
    'INCHAN': {
        key: 'ic',
        parser: (line) => {
            const match = ICPattern.exec(line)
            if (match) return match[1]
        }
    },
    'INPORT': {
        key: 'ip',
        parser: (line) => {
            const match = IPPattern.exec(line)
            if (match) return match[1]
        }
    },
    'OUTCHAN': {
        key: 'oc',
        parser: (line) => {
            const match = OCPattern.exec(line)
            if (match) return match[1]
        }
    },
    'OUTPORT': {
        key: 'op',
        parser: (line) => {
            const match = OPPattern.exec(line)
            if (match) return match[1]
        }
    },
}

export default Parsers