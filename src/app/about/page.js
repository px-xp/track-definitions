import Header from '@/components/ui/Header'

export default function Page() {
  return (<div className="max-w-prose">
    <Header text="About"/>
    <p className="font-semibold">What?</p>
    <br/>
    <p>Track Definitions are used by Squarp&apos;s HAPAX to be able to programatically configure tracks.</p>
    <p>The hope of this project was to ease the creating and editing Track Definitions on Squarp&apos;s HAPAX. Another goal was to encourage the sharing Track Definitions.</p>
    <br/>
    <br/>
    <p className="font-semibold">How do I use the creator tool?</p>
    <br/>
    <p>The Upload Definition button will attempt to parse a text (.txt) file containing a valid Track Definition. The data will be automatically loaded into the form.</p>
    <br/>
    <p>Save to Disk saves the current Track Definition to your &apos;Downloads&apos; folder as a text file.
    This file should be able to be read by the HAPAX. The filename is composed of the trackname and the date.
    The date is help prevent accidentally overwriting an existing Track Definition.</p>
    <br/>
    <p>Track Definitions are saved in the browser&apos;s local storage. If you refresh the page or close the browser, the data will be 
    there when you come back.</p>
    <br/>
    <p>The creator tool does not perform validation, it assumes you have read the specification.</p>
    <br/>
    <br/>    
    <p className="font-semibold">I found a bug!</p>
    <br/>
    <p>Please submit an issue on GitHub.</p>
    <br/>
    <br/>
    <p className="font-semibold">Disclaimers</p>
    <br/>
    <p>This tool was not created by Squarp.</p>

    <p>If you have questions, comments, and/or concerns feel free to email me at arfpoodle [at] gmail [dot] com, or file an issue on GitHub.</p>

    <br/>
    <br/>
    <p className="font-semibold">End User License Agreement</p>
    <br/>
    I am not responsible for any damage to your personal property by using this tool. It is possible this tool becomes out of date with the latest firmware.

    You will not use this tool for evil, only for exploring the sonic realms.

    This tool is licensed by the Creative Commons License CC BY-NC-SA.
  </div>)
}
