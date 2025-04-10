import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart } from '../features/cartSlice';

const CartPage = () => {
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const total = cart.reduce(
        (sum, item) =>
            // console.log(item.pricePerUnit, '\n',item.weight, '\n',item.quantity)
         
            sum +
            parseFloat(item.pricePerUnit) * parseFloat(item.weight) * parseInt(item.quantity, 10),
        0
    );

    return (
        <div>
            <h2>Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id}>
                                <strong>{item.name}</strong> - ${item.pricePerUnit.toFixed(2)} x {item.weight} kg x {item.quantity}
                                <button onClick={() => dispatch(removeItem(item.id))}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <p>Total: ${total.toFixed(2)}</p>
                    <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
                </>
            )}
        </div>
    );
};

export default CartPage;