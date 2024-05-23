import { useSelector } from 'react-redux'
import CreateUser from '../features/user/CreateUser'
import Button from './Button'

function Home() {
    const username = useSelector((state) => state.user.username)

    return (
        <div className="my-10 px-4 text-center sm:my-16">
            <h1 className="mb-8 font-semibold sm:text-lg md:text-3xl">
                The best pizza.🍕
                <br />
                Straight out of the oven, straight to you.
            </h1>

            {!username ? (
                <CreateUser />
            ) : (
                <div className="flex flex-col items-center gap-2">
                    <h2 className="text-xl font-semibold">Hello {username}</h2>
                    <Button to="/menu" type="primary">
                        Continue to order
                    </Button>
                </div>
            )}
            <img
                src="./icons/pizza-icon.svg"
                alt=""
                className="absolute bottom-0 right-[-120px] z-[-1] hidden w-[600px] sm:block"
            />
        </div>
    )
}

export default Home
