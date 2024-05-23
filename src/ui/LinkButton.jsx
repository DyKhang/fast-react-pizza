import { Link, useNavigate } from 'react-router-dom'

function LinkButton({ children, to }) {
    const navigate = useNavigate()
    const className = 'text-sm text-blue-600 hover:text-blue-400'
    if (to === -1)
        return (
            <button onClick={() => navigate(to)} className={className}>
                {children}
            </button>
        )
    return (
        <Link to={to} className={className}>
            {children}
        </Link>
    )
}

export default LinkButton