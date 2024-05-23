import { useSelector } from 'react-redux'
import { formatCurrency } from '../../utils/helpers'
import DeleteItem from './DeleteItem'
import UpdateItemQuantity from './UpdateItemQuantity'
import { getCurrentQuantityById } from './cartSlice'

function CartItem({ item }) {
    const { pizzaId, name, quantity, totalPrice, imageUrl } = item
    const currentQuantity = useSelector(getCurrentQuantityById(pizzaId))

    return (
        <li className="flex flex-wrap items-center py-3">
            <img
                src={imageUrl}
                alt={name}
                className="w-16 object-cover sm:w-28"
            />
            <p className="ml-3">
                {quantity}&times; {name}
            </p>
            <div className="flex items-center justify-between gap-2 sm:ml-auto sm:gap-6">
                <p className="text-sm font-bold">
                    {formatCurrency(totalPrice)}
                </p>
                <UpdateItemQuantity
                    pizzaId={pizzaId}
                    currentQuantity={currentQuantity}
                />
                <DeleteItem pizzaId={pizzaId} />
            </div>
        </li>
    )
}

export default CartItem
