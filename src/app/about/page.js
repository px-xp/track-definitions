import Header from '@/components/ui/Header'

export default function Page() {
  return (<div className="max-w-prose">
    <Header text="About"/>
    <p className="font-semibold">What?</p>
    <br/>
    <p>Instrument Definitions are used by Squarp&apos;s HAPAX to be able to programatically configure tracks.</p>
    <br/>
    <p>The hope of this project was to ease the creating and editing Instrument Definitions on Squarp&apos;s HAPAX. Another goal was to encourage the sharing of definitions.</p>
    <br/>
    <p>If you have created a definition and would like to share it. Please make a GitHub issue and add the definition there as a text file.</p>
    <br/>
    <p>This tool is still being developed. If you have ideas please file a GitHub Issue.</p>
    <br/>
    <p>All the creating and editing logic runs in your browser. No data, besides general user interaction data, is transferred to a server.</p>
    <br/>
    <br/>
    <p className="font-bold">How do I use the creator tool?</p>
    <br/>
    <p>The <span className="font-semibold">Upload Definition</span> button will attempt to parse a text (.txt) file containing a definition. The data will be automatically loaded into the form.</p>
    <br/>
    <p><span className="font-semibold">Save to Disk</span> saves the current Definition to your &apos;Downloads&apos; folder as a text file.
    This file should be able to be read by the HAPAX. The filename is composed of the trackname and the date.
    The date is help prevent accidentally overwriting an existing Definition.</p>
    <br/>
    <p>Definitions are saved in the browser&apos;s local storage. If you refresh the page or close the browser, the data will be 
    there when you come back.</p>
    <br/>
    <p>The creator tool does not perform validation, it assumes you have read the specification.</p>
    <br/>
    <br/>    
    <p className="font-bold">I found a bug!</p>
    <br/>
    <p>Please submit an issue on GitHub.</p>
    <br/>
    <br/>
    <p className="font-bold">Disclaimers</p>
    <br/>
    <p>This tool was not created by Squarp.</p>

    <p>If you have questions, comments, and/or concerns feel free to email me at arfpoodle [at] gmail [dot] com, or file an issue on GitHub.</p>

    <br/>
    <br/>
    <p className="font-bold">End User License Agreement</p>
    <br/>
    I am not responsible for any damage to your personal property by using this tool. It is possible this tool becomes out of date with the latest firmware.

    You will not use this tool for evil, only for exploring the sonic realms.

    This tool is licensed by the Creative Commons License CC BY-NC-SA.
  </div>)
}
