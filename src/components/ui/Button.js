'use client'

const Button = ({ text, onClick, children, bg }) => {
    const style = `cursor-pointer inline-flex px-2 py-2 rounded items-center ${bg}`
    return (<div className="flex-1/2">
        <button 
        onClick={onClick}
        className={style}>
            {children}
            <span>{text}</span>
        </button>
    </div>)
}

export default Button