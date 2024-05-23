import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchOrder() {
    const [query, setQuery] = useState('')

    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault()
        if (!query) return
        navigate(`order/${query}`)
        setQuery('')
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="w-28 transition-all duration-200 sm:w-[25%] sm:focus-within:w-[27%]"
        >
            <input
                type="text"
                placeholder="Search order #"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-full bg-white px-4 py-2 text-[0.675rem] placeholder:text-stone-900 focus:outline-none sm:text-sm"
            />
        </form>
    )
}

export default SearchOrder
