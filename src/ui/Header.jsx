import { Link } from 'react-router-dom'
import SearchOrder from '../features/order/SearchOrder'
import Username from '../features/user/Username'

function Header() {
    return (
        <header className="flex items-center justify-between bg-yellow-100 px-8 py-6">
            <Link
                to="/"
                className="text-sm font-semibold uppercase tracking-widest sm:text-base"
            >
                Fast React Pizza Co.
            </Link>
            <SearchOrder />
            <Username />
        </header>
    )
}

export default Header
