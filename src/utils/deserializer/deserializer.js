'use client'

import Parsers from './parsers'

// Deserializes a track definition file.
export default async function deserializer(fileContent) {
    const newState = {}
    let parent = void 0

    const lines = fileContent.split('\n')

    lines.forEach((line) => {
      if (!line.startsWith('#') && line.length) {
        line = sanitizeLine(line)
        const openParent = isOpenParent(line)
        if (openParent) {
            parent = openParent
            if (!newState[parent]) {
                newState[parent] = []
            }
            return
        }

        const closeParent = isCloseParent(line)
        if (closeParent) {
            parent = void 0
            return
        }

        const result = parseLine(line, parent)
        if (parent && result) {
            newState[parent].push(result)
            return
        }

        if (!parent) {
            const parseType = line.split(' ')[0]
            
            if (Parsers[parseType]) {
                const { key, parser } = Parsers[parseType]
                const result = parser(line)
                
                if (result) {
                    newState[key] = result
                }
            }
        }
      }
    })

    return newState
}

const openParent = {
    '[CC]': 'cc',
    '[ASSIGN]': 'as',
    '[DRUMLANES]': 'ds',
    '[NRPN]': 'nn',
    '[AUTOMATION]': 'at',
    '[PC]': 'pc',
    '[COMMENT]': 'c'
} 

const closeParent = new Set([
    '[/CC]',
    '[/ASSIGN]',
    '[/DRUMLANES]',
    '[/NRPN]',
    '[/AUTOMATION]',
    '[/PC]',
    '[/COMMENT]'
])

function sanitizeLine(line) {
    const hashIndex = line.indexOf('#')
    if (hashIndex !== -1) {
        // If '#' is found, extract the substring before '#'
        return line.substring(0, hashIndex)
    }
    return line
}

function isOpenParent(line) {
    if (openParent[line]) return openParent[line]
}

function isCloseParent(line) {
    return closeParent.has(line)
}

function parseLine(line, parent) {
    if (parent) {
        return Parsers[parent](line)
    }
}