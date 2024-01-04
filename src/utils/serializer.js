'use client'
// Serializes JSON Track Definition in text format.

const collectionRenderers = {
    'DRUMLANES': renderDrumRow,
    'PC': renderPC,
    'CC': renderCC,
    'NRPN': renderNRPN,
    'ASSIGN': renderAssign,
    'AUTOMATION': renderAutomation,
    'COMMENT': renderComment,
}

export function PreviewSerializer(json) {
    const result = []

    const metadata = [
        'VERSION',
        'TRACKNAME',
        'TYPE',
        'OUTPORT', 
        'OUTCHAN',
        'INPORT',
        'INCHAN',
        'MAXRATE',
    ]
    
    metadata.forEach(k => {
        result.push(`${k} ${json[k]}\n`)
    })

    Object.keys(collectionRenderers).forEach(k => {
        CollectionPreview(json, k, collectionRenderers[k], result)
    })

    return result.join('\n')
}

function CollectionPreview(data, key, renderRow, result) {
    if (data[key] && data[key].length) {
        let rows = [`[${key}]`]
        data[key].forEach(r => renderRow(r, rows))
        rows.push(`[/${key}]\n`)
        result.push(rows.join('\n'))
    }
}

function renderDrumRow(row, rows) {
    rows.push(
        `${row.row}:${row.trig}:${row.chan}:${row.notenumber} ${row.name}`
    )
}

function renderNRPN(row, rows) {
    let base = (row.default) ? `:DEFAULT=${row.default} ${row.name}` : ` ${row.name}` 
    if (row.msb) {
        rows.push(`${row.msb}:${row.lsb}:${row.depth}${base}`)
    } else {
        rows.push(`:${row.lsb}:${row.depth}${base}`)
    }
}

function renderCC(row, rows) {
    if (row.default) {
        rows.push(`${row.number}:DEFAULT=${row.default} ${row.name}`)
    } else {
        rows.push(`${row.number} ${row.name}`)
    }
}

function renderAssign(row, rows) {
    if (row.default) {
        rows.push(`${row.potnumber} ${row.type}:${row.value} DEFAULT=${row.default}`)
    } else {
        rows.push(`${row.potnumber} ${row.type}:${row.value}`)
    }
}

function renderAutomation(row, rows) {
    rows.push(`${row.type}:${row.value}`)
}

function renderPC(row, rows) {
    rows.push(`${row.number} ${row.name}`)
}

function renderComment(row, rows) {
    rows.push(row)
}