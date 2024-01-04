export default function Template({ children }) {
    return (<div className="container mx-auto p-2">
        <nav className="flex items-center justify-between flex-wrap p-6">
            <div className="flex items-center">
                <div className="text-xl font-semibold tracking-tight antialiased">Track Definitions</div>
            </div>
            <div className="flex block justify-end">
                <ul className="flex space-x-4">
                    <li className="mr-6"><a className="hover:text-blue-600" href="/">Home</a></li>
                    <li className="mr-6 hover:text-blue-600"><a href="/about">About</a></li>
                    <li className="mr-6 hover:text-blue-600"><a href="/spec">Spec</a></li>
                    <li className="mr-6 hover:text-blue-600"><a href="/creator">Creator Tool</a></li>
                    <li className="mr-6 hover:text-blue-600"><a href="/repository">Repository</a></li>
                </ul>
            </div>
        </nav>
        <div>{children}</div>
        <footer className="mx-auto px-4">
            <div className="py-8 text-center text-sm">© 2024 - Present px-xp. All rights reserved.</div>
        </footer>
    </div>)
}