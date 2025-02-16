import React, { useState } from "react";
import "./PaymentPage.css";

const PaymentPage = () => {
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: "",
        cardHolder: "",
        expiryDate: "",
        cvv: "",
        amount: "",
    })
    const [paymentHistory, setPaymentHistory] = useState([])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setPaymentDetails((prev) => ({ ...prev, [name]: value }))
    }

    const handlePayment = () => {
        if (
            !paymentDetails.cardNumber ||
            !paymentDetails.cardHolder ||
            !paymentDetails.expiryDate ||
            !paymentDetails.cvv ||
            !paymentDetails.amount
        ) {
            alert("Please fill in all payment details.")
            return
        }

        // Mock payment processing (replace with real payment gateway integration)
        alert("Payment successful!")
        setPaymentHistory((prev) => [
            ...prev,
            {
                id: Date.now(),
                ...paymentDetails,
                date: new Date().toLocaleDateString(),
            },
        ]);
        setPaymentDetails({
            cardNumber: "",
            cardHolder: "",
            expiryDate: "",
            cvv: "",
            amount: "",
        })
    }

    return (
        <div className="payment-page">
            <h1>Secure Payment</h1>
            <h2>Enter Payment Details</h2>
            <div className="payment-form">
                
                <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={paymentDetails.cardNumber}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="cardHolder"
                    placeholder="Card Holder Name"
                    value={paymentDetails.cardHolder}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="expiryDate"
                    placeholder="Expiry Date (MM/YY)"
                    value={paymentDetails.expiryDate}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="cvv"
                    placeholder="CVV"
                    value={paymentDetails.cvv}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={paymentDetails.amount}
                    onChange={handleInputChange}
                />
                <button onClick={handlePayment}>Pay Now</button>
            </div>
            <div className="payment-history">
                <h2>Payment History</h2>
                {paymentHistory.length === 0 ? (
                    <p>No payments made yet.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Card Holder</th>
                                <th>Amount</th>
                                <th>Card Number (Last 4)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentHistory.map((payment) => (
                                <tr key={payment.id}>
                                    <td>{payment.date}</td>
                                    <td>{payment.cardHolder}</td>
                                    <td>${payment.amount}</td>
                                    <td>{payment.cardNumber.slice(-4)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default PaymentPage;
