import Link from 'next/link'
import Script from 'next/script'

export default function Template({ children }) {
    return (<div className="container mx-auto p-2">
        <nav className="flex items-center justify-between flex-wrap p-6">
            <div className="flex items-center">
                <div className="text-xl font-semibold tracking-tight antialiased">Instrument Definitions</div>
            </div>
            <div className="flex block items-center content-center">
                <ul className="flex">
                    <li className="mr-6 hover:text-blue-600"><Link href="/">Editor Tool</Link></li>
                    <li className="mr-6 hover:text-blue-600"><Link href="/spec">Spec</Link></li>
                    <li className="mr-6 hover:text-blue-600"><Link href="/about">About</Link></li>
                    <li className="mr-6 hover:text-blue-600"><Link href="/repository">Repository</Link></li>
                    <li className="mr-6 hover:text-blue-600"><a target="_blank" rel="noopener noreferrer" href="https://github.com/px-xp/track-definitions">GitHub</a></li>
                </ul>
            </div>
        </nav>
        <div>{children}</div>
        <footer className="mx-auto px-4">
            <div className="py-8 text-center text-sm">© 2024 - Present px-xp. All rights reserved.</div>
        </footer>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-4Z6H89W415" />
        <Script id="google-analytics">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-4Z6H89W415');
        `}
        </Script>
    </div>)
}