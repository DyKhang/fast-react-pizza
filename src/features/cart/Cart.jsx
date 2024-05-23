import LinkButton from '../../ui/LinkButton'
import Button from '../../ui/Button'
import CartItem from './CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, getCart } from './cartSlice'
import EmptyCart from './EmptyCart'

function Cart() {
    const cart = useSelector(getCart)
    const username = useSelector((state) => state.user.username)
    const dispatch = useDispatch()
    function handleClearCart() {
        dispatch(clearCart())
    }

    if (!cart.length) return <EmptyCart />

    return (
        <div className="px-4 py-3">
            <LinkButton to="/menu">&larr; Back to menu</LinkButton>
            <h2 className="mt-7 text-xl font-semibold">
                Your cart, {username}
            </h2>
            <ul className="mt-3 divide-y divide-stone-200 border-b">
                {cart.map((item) => (
                    <CartItem key={item.pizzaId} item={item} />
                ))}
            </ul>
            <div className="mt-5 flex space-x-6">
                <Button to="/order/new" type="primary">
                    Order pizzas
                </Button>
                <Button type="secondary" onClick={handleClearCart}>
                    Clear cart
                </Button>
            </div>
        </div>
    )
}

export default Cart