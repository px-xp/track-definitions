import Header from '@/components/ui/Header'
import Link from 'next/link'

export default function Page() {
    return (<div>
        <Header text="Instrument Definition Repository"/>
        <p>Want to submit your own definition? Please submit an issue on GitHub with your definition as a .txt file.</p>
        <br/>
        <ul>
            <li><a target="_blank" rel="noopener noreferrer" href="track-definitions/definitions/blofeld.txt">Blofeld</a></li>
        </ul>
    </div>)
}