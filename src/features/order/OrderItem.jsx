import { formatCurrency } from '../../utils/helpers'

function OrderItem({ item, isLoadingIngredients, ingredients, image }) {
    const { quantity, name, totalPrice } = item

    return (
        <li className="flex items-center py-3">
            <img
                src={image}
                alt="pizza-image"
                className="w-16 object-cover sm:w-28"
            />
            <div className="ml-3 text-sm">
                <p>
                    <span className="font-bold">{quantity}&times;</span> {name}
                </p>
                <p className="text-sm capitalize italic text-stone-500">
                    {isLoadingIngredients
                        ? 'Loading...'
                        : ingredients?.join(', ')}
                </p>
            </div>
            <p className="ml-auto font-bold">{formatCurrency(totalPrice)}</p>
        </li>
    )
}

export default OrderItem
