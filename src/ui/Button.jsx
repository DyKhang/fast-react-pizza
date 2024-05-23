import { Link } from 'react-router-dom'

function Button({ children, disabled, to, type, onClick }) {
    const base =
        'inline-block rounded-full bg-yellow-300  font-semibold uppercase text-stone-800 transition-colors duration-500 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed'

    const styles = {
        primary: base + ' px-4 py-2',
        small: base + ' px-3 py-2 text-sm',
        round:
            base +
            ' w-[35px] h-[35px] rounded-full text-sm flex items-center justify-center',
        secondary:
            'inline-block px-3.5 py-2.5 rounded-full border-2 border-stone-200 bg-transparent font-semibold uppercase text-stone-800 transition-colors duration-500 hover:opacity-80 focus:outline-none disabled:cursor-not-allowed',
    }
    if (to)
        return (
            <Link
                to={to}
                className={`${styles[type]} flex items-center justify-center`}
            >
                {children}
            </Link>
        )

    if (onClick)
        return (
            <div disabled={disabled}>
                <button className={styles[type]} onClick={onClick}>
                    {children}
                </button>
            </div>
        )

    return (
        <div disabled={disabled}>
            <button className={styles[type]}>{children}</button>
        </div>
    )
}

export default Button
