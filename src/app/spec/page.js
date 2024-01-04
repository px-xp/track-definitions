import Header from "@/components/ui/Header"

export default function Page() {
    return (<div className="container mx-auto">
      <Header text="Specification"/>
      <pre className="font-mono bg-slate-100 dark:bg-slate-800 p-4 whitespace-pre text-wrap break-word">
        <code>
          VERSION 1 # Currently, this should only be 1.
          <br/>
          <br/>
          # Supports all alphanumeric ASCII, and ' ', '_', '-', '+' - can also be NULL
          <br/>
          TRACKNAME NULL
          <br/>
          <br/>
          # Can be POLY, DRUM, MPE, or NULL
          <br/>
          TYPE NULL
          <br/>
          <br/>
          # Can be A, B, C, D, USBD, USBH, CVGx (x between 1&4), CVx, Gx, or NULL
          <br/>
          OUTPORT NULL
          <br/>
          <br/>
          # Can be x (between 1-16), or NULL -- this is ignored if output port is not MIDI
          <br/>
          OUTCHAN NULL
          <br/>
          <br/>
          # Can be NONE, ALLACTIVE, A, B, USBH, USBD, CVG, or NULL
          <br/>
          INPORT NULL
          <br/>
          <br/>
          # Can be x (between 1-16), ALL, or NULL. This definition will be ignored if INPORT is NONE, ALLACTIVE or CVG
          <br/>
          INCHAN NULL
          <br/>
          <br/>
          # This defines the default 'MAX RATE' for automation lanes.
          <br/>
          # Can be NULL, 192, 96, 64, 48, 32, 24, 16, 12, 8, 6, 4, 3, 2, 1
          <br/>
          MAXRATE NULL
          <br/>
          <br/>
          # DRUMLANES
          <br/>
          # Syntax: ROW:TRIG:CHAN:NOTENUMBER NAME
          <br/>
          # ROW must be between 1 and 8
          <br/>
          # TRIG can be between 0 and 127, or NULL
          <br/>     
          # CHAN can be a number between 1 and 16, Gx, CVx, CVGx (x between 1 and 4), or NULL
          <br/>
          # NOTENUMBER can be between 0 and 127, or NULL
          <br/>
          # NAME supports all alphanumeric ASCII, and ' ', '_', '-', '+' - can also be NULL
          <br/>
          # Please note this section will be discarded for tracks which are not DRUM tracks
          <br/>
          [DRUMLANES]
          <br/>
          [/DRUMLANES]
          <br/>
          <br/>
          # PC
          <br/>
          # Syntax: NUMBER NAME
          <br/>
          # number must be either:
          <br/>
          #   - A number (for simple PC)
          <br/>
          #   - Three numbers, delimited by ':', which represent PC:MSB:LSB. You can put 'NULL' to not set the MSB/LSB.
          <br/>
          # PC must be between 1...128
          <br/>
          # MSB/LSB must be between 0...127
          <br/>       
          [PC]
          <br/>
          [/PC]
          <br/>
          <br/>
          # CC
          <br/>
          # Syntax: CC_NUMBER NAME or CC_NUMBER:DEFAULT=xx NAME
          <br/>
          # DEFAULT_VALUE must be a valid number between 0 and 127
          <br/>
          [CC]
          <br/>
          [/CC]
          <br/>
          <br/>
          # NRPN
          <br/>
          # Syntax: "MSB:LSB:DEPTH NAME" or "MSB:LSB:DEPTH:DEFAULT=xx NAME"
          <br/>
          # Lsb & msb should be between 0 and 127
          <br/>
            # Note: LSB can be over 127 ONLY if MSB is 0 or omitted
            <br/>
            # e.g. '0:1026:7 FOO', or ':2000:7 BAR' 
            <br/>
            # the examples above would be equivalent to '8:2:7 FOO' and '15:80:7 BAR' respectively
            <br/>
          # DEPTH can be 7 or 14
          <br/>
          # For NRPN: DEFAULT_VALUE must be a valid number, either between 0 and 127 (for 7 bit NRPNs) or between 0 and 16383 (for 14bit NRPNs)
          <br/>
          [NRPN]
          <br/>
          [/NRPN]
          <br/>
          <br/>
          # ASSIGN
          <br/>
          # Syntax: POT_NUMBER TYPE:VALUE or POT_NUMBER TYPE:VALUE DEFAULT=DEFAULT_VALUE
          <br/>
          # POT_NUMBER must be between 1 and 8
          <br/>
          # TYPE can be "CC", "PB" (pitchbend), "AT" (aftertouch), "CV", "NRPN", or "NULL" (this won't assign the pot).
          <br/>
          # Non explicitly-defined pots will be considered "NULL"
          <br/>
          # VALUE VALIDATION
          <br/>
          #### For CC: Value must be a valid number between 0 and 119
          <br/>
          #### For PB and AT, any text after the TYPE will be ignored
          <br/>
          #### For CV, value must be between 1 and 4
          <br/>
          #### For NRPN, value must be MSB:LSB:DEPTH, with both lsb & msb bebtween 0 and 127, and DEPTH being either 7 or 14
          <br/>
          # DEFAULT VALUE
          <br/>
          #### For CC: DEFAULT_VALUE must be a valid number between 0 and 127
          <br/>
          #### For PB: DEFAULT_VALUE must be a valid number between 0 and 16383
          <br/>
          #### For NRPN: DEFAULT_VALUE must be a valid number, either between 0 and 127 (for 7 bit NRPNs) or between 0 and 16383 (for 14bit NRPNs)
          <br/>
          #### For CV: DEFAULT_VALUE must be either a valid number between 0 and 65535, or a voltage between -5V and 5V, e.g. "-4.25V" or "1.7V"
          <br/>
          #### Please note default value will be ignored for PB and AT messages.
          <br/>
          [ASSIGN]
          <br/>
          [/ASSIGN]
          <br/>
          <br/>
          # AUTOMATION
          <br/>
          # Syntax: TYPE:VALUE
          <br/>
          # TYPE can be "CC", "PB" (pitchbend), "AT" (aftertouch), "CV", or "NRPN"
          <br/>
          # VALUE VALIDATION
          <br/>
          #### For CC: Value must be a valid number between 0 and 119
          <br/>
          #### For PB and AT, any text after the TYPE will be ignored
          <br/>
          #### For CV, value must be between 1 and 4
          <br/>
          #### For NRPN, value must be MSB:LSB:DEPTH, with both lsb & msb bebtween 0 and 127, and DEPTH being either 7 or 14
          <br/>
          # NOTE: You are limited to 64 automation lanes
          <br/>
          [AUTOMATION]
          <br/>
          [/AUTOMATION]
          <br/>
          <br/>
          # This section will be readable from Hapax.
          <br/>
          [COMMENT]
          <br/>
          [/COMMENT]
          <br/>
          <br/>
        </code>
      </pre>
      <br/>
      <p className="text-center ordinal">Version as of January, 3<sup>rd</sup>, 2024.</p>
    </div>)
  }
  