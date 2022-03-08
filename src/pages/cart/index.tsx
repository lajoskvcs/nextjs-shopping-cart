import Layout from '@/components/Layout';

const CartPage = () => {

    return (
        <>
            <div className="flex justify-center">
                <h1>Cart</h1>
            </div>
            <div className="flex justify-center mt-12">
                <ul className="steps">
                    <li className="step step-primary">Cart items</li>
                    <li className="step">Personal info</li>
                    <li className="step">Shipping options</li>
                    <li className="step">Payment options</li>
                    <li className="step">Checkout summary</li>
                    <li className="step">🥳</li>
                </ul>
            </div>
        </>
    );
}

export default CartPage;
