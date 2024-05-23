import { useSelector } from 'react-redux'

function Username() {
    const user = useSelector((state) => state.user)

    if (!user.username) return null

    return (
        <div className="hidden text-sm font-semibold sm:block sm:text-base">
            {user.username}
        </div>
    )
}

export default Username
