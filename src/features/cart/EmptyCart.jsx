import LinkButton from '../../ui/LinkButton'

function EmptyCart() {
    return (
        <div className="mt-5 p-2">
            <LinkButton to="/menu">&larr; Back to menu</LinkButton>
            <p className="mt-3 font-semibold">
                Your cart is still empty. Start adding some pizzas 🤕
            </p>
        </div>
    )
}

export default EmptyCart
