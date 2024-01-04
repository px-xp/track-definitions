import { expect, test } from 'vitest'
import Parsers from './parsers'

test('ds', () => {
    const r = Parsers.ds('1:0:G4:26 BAR') 
    expect(r.row).toBe('1')
    expect(r.trig).toBe('0')
    expect(r.chan).toBe('G4')
    expect(r.notenumber).toBe('26')
    expect(r.name).toBe('BAR')
})

test('ds NULL', () => {
    const r = Parsers.ds('1:NULL:G4:NULL BAR') 
    expect(r.row).toBe('1')
    expect(r.trig).toBe('NULL')
    expect(r.chan).toBe('G4')
    expect(r.notenumber).toBe('NULL')
    expect(r.name).toBe('BAR')
})

test('cc NUMBER NAME', () => {
    const r = Parsers.cc('1 BAR') 
    expect(r.number).toBe('1')
    expect(r.name).toBe('BAR')
    expect(r.default).toBe(void 0)
})

test('cc NUMBER:DEFAULT=xx NAME', () => {
    const r = Parsers.cc('1:DEFAULT=66 BAR') 
    expect(r.number).toBe('1')
    expect(r.name).toBe('BAR')
    expect(r.default).toBe('66')
})

test('pc NUMBER NAME', () => {
    const r = Parsers.pc('1 BAR') 
    expect(r.number).toBe('1')
    expect(r.name).toBe('BAR')
})

test('pc NUMBER NAME', () => {
    const r = Parsers.pc('1 BAR') 
    expect(r.number).toBe('1')
    expect(r.name).toBe('BAR')
})

test('pc NUMBER:MSB:LSB NAME', () => {
    const r = Parsers.pc('1:5:20 BAR') 
    expect(r.number).toBe('1:5:20')
    expect(r.name).toBe('BAR')
})

test('pc NUMBER:NULL:LSB NAME', () => {
    const r = Parsers.pc('1:NULL:126 BAR') 
    expect(r.number).toBe('1:NULL:126')
    expect(r.name).toBe('BAR')
})

test('pc NUMBER:NULL:NULL NAME', () => {
    const r = Parsers.pc('1 BAR') 
    expect(r.number).toBe('1')
    expect(r.name).toBe('BAR')
})

test('c COMMENT', () => {
    const r = Parsers.c('FOO')
    expect(r).toBe('FOO')
})

test('nn MSB:LSB:DEPTH NAME', () => {
    const r = Parsers.nn('1:2:7 FOO')
    expect(r.msb).toBe('1')
    expect(r.lsb).toBe('2')
    expect(r.depth).toBe('7')
    expect(r.default).toBe(void 0)
    expect(r.name).toBe('FOO')
})

test('nn MSB:LSB:DEPTH:DEFAULT=xx NAME', () => {
    const r = Parsers.nn('1:2:14:DEFAULT=121 FOO')
    expect(r.msb).toBe('1')
    expect(r.lsb).toBe('2')
    expect(r.depth).toBe('14')
    expect(r.default).toBe('121')
    expect(r.name).toBe('FOO')
})

test('as POT TYPE:VALUE', () => {
    const r = Parsers.as('2 PB:4')
    expect(r.potnumber).toBe('2')
    expect(r.type).toBe('PB')
    expect(r.value).toBe('4')
    expect(r.default).toBe(void 0)
}) 

test('as POT TYPE:VALUE DEFAULT=xx', () => {
    const r = Parsers.as('6 CV:2 DEFAULT=26')
    expect(r.potnumber).toBe('6')
    expect(r.type).toBe('CV')
    expect(r.value).toBe('2')
    expect(r.default).toBe('26')
})

test('as POT NPRN:VALUE DEFAULT=xx', () => {
    const r = Parsers.as('2 NRPN:4:30:7 DEFAULT=26')
    expect(r.potnumber).toBe('2')
    expect(r.type).toBe('NRPN')
    expect(r.value).toBe('4:30:7')
    expect(r.default).toBe('26')
})

test('as POT NPRN:VALUE', () => {
    const r = Parsers.as('2 NRPN:4:30:7')
    expect(r.potnumber).toBe('2')
    expect(r.type).toBe('NRPN')
    expect(r.value).toBe('4:30:7')
    expect(r.default).toBe(void 0)
})

test('at TYPE:VALUE', () => {
    const r = Parsers.at('CC:7')
    expect(r.type).toBe('CC')
    expect(r.value).toBe('7')
})

test('at NRPN:VALUE', () => {
    const r = Parsers.at('NRPN:7:4:14')
    expect(r.type).toBe('NRPN')
    expect(r.value).toBe('7:4:14')
})

test('mr MAXRATE VALUE', () => {
    const r = Parsers.MAXRATE.parser('MAXRATE 96')
    expect(r).toBe('96')
})

test('op OUTPORT G4', () => {
    const r = Parsers.OUTPORT.parser('OUTPORT G4')
    expect(r).toBe('G4')
})

test('ty TYPE DRUM', () => {
    const r = Parsers.TYPE.parser('TYPE DRUM')
    expect(r).toBe('DRUM')
})