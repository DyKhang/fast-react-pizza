import { Form, redirect, useActionData, useNavigation } from 'react-router-dom'
import { createOrder } from '../../services/apiRestaurant'
import Button from '../../ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice'
import EmptyCart from '../cart/EmptyCart'
import store from '../../store'
import { useState } from 'react'
import { formatCurrency } from '../../utils/helpers'
import { fetchAddress } from '../user/userSlice'
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str
    )

function CreateOrder() {
    const [withPriority, setWithPriority] = useState(false)
    const cart = useSelector(getCart)
    const {
        username,
        status: addressStatus,
        position,
        address,
        error: errorAddress,
    } = useSelector((state) => state.user)

    const isLoadingAddress = addressStatus === 'loading'

    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'

    const formErrors = useActionData()
    const dispatch = useDispatch()

    const totalCartPrice = useSelector(getTotalCartPrice)
    const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0
    const totalPrice = totalCartPrice + priorityPrice

    if (!cart.length) return <EmptyCart />

    return (
        <div className="px-4 py-6">
            <h2 className="mb-8 text-xl font-semibold">
                Ready to order? Let's go!
            </h2>

            <Form method="POST">
                <div className="form-group">
                    <label className="form-group__label">Name</label>
                    <input
                        className="input grow"
                        type="text"
                        name="customer"
                        required
                        defaultValue={username}
                    />
                </div>

                <div className="form-group">
                    <label className="form-group__label">Phone number</label>
                    <div className="grow">
                        <input
                            type="tel"
                            name="phone"
                            required
                            className="input w-full"
                        />
                        {formErrors?.phone && (
                            <p className="mt-2 text-sm text-red-500">
                                {formErrors.phone}
                            </p>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-group__label">Address</label>
                    <div className="grow">
                        <input
                            type="text"
                            name="address"
                            disabled={isLoadingAddress}
                            required
                            className="input w-full"
                            defaultValue={address}
                        />
                        {addressStatus === 'error' && (
                            <p className="mt-2 text-sm text-red-500">
                                {errorAddress}
                            </p>
                        )}
                    </div>

                    {!position.latitude && !position.longitude && (
                        <Button
                            disabled={isLoadingAddress}
                            type="small"
                            onClick={(e) => {
                                e.preventDefault()
                                dispatch(fetchAddress())
                            }}
                        >
                            Get position
                        </Button>
                    )}
                </div>

                <div className="mb-6 flex items-center gap-2">
                    <input
                        className="h-6 w-6 accent-yellow-300"
                        type="checkbox"
                        name="priority"
                        id="priority"
                        value={withPriority}
                        onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <label htmlFor="priority" className="select-none">
                        Want to yo give your order priority?
                    </label>
                </div>

                <div>
                    <input
                        type="hidden"
                        name="cart"
                        value={JSON.stringify(cart)}
                    />
                    <input
                        type="hidden"
                        name="position"
                        value={
                            position.longitude && position.latitude
                                ? `${position.longitude}, ${position.latitude}`
                                : ''
                        }
                    />
                    <Button
                        disable={isSubmitting || isLoadingAddress}
                        type="primary"
                    >
                        {isSubmitting
                            ? 'Placing order...'
                            : `Order now ${formatCurrency(totalPrice)}`}
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export async function action({ request }) {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        priority: data.priority === 'true',
    }
    const errors = {}
    if (!isValidPhone(order.phone)) errors.phone = 'Incorrect phone number!'

    if (Object.keys(errors).length > 0) return errors

    const newOrder = await createOrder(order)

    store.dispatch(clearCart())

    return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder
