import Link from 'next/link'

export default function Template({ children }) {
    return (<div className="container mx-auto p-2">
        <nav className="flex items-center justify-between flex-wrap p-6">
            <div className="flex items-center">
                <div className="text-xl font-semibold tracking-tight antialiased">Track Definitions</div>
            </div>
            <div className="flex block items-center content-center">
                <ul className="flex">
                    <li className="mr-6 hover:text-blue-600"><Link href="/">Creator Tool</Link></li>
                    <li className="mr-6 hover:text-blue-600"><Link href="/spec">Spec</Link></li>
                    <li className="mr-6 hover:text-blue-600"><Link href="/about">About</Link></li>
                </ul>
            </div>
        </nav>
        <div>{children}</div>
        <footer className="mx-auto px-4">
            <div className="py-8 text-center text-sm">© 2024 - Present px-xp. All rights reserved.</div>
        </footer>
    </div>)
}