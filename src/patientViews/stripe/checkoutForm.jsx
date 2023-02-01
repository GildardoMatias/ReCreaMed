import React from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { Button, Form, Input } from 'antd'
import { useState } from 'react'

export default function CheckoutForm() {

    const [isProcessing, setIsProcessing] = useState(false)
    const [message, setMessage] = useState("")

    const stripe = useStripe()
    const elements = useElements()

    const onFinish = async (values) => {
        // values.preventDefault();
        // console.log('Success:', values);
        if (!stripe || !elements) return;
        setIsProcessing(true)
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/completion`
            },
            redirect: 'if_required'
        })
        if (error) setMessage(error.message)
        else if (paymentIntent && paymentIntent.status === 'succeeded') setMessage(`PaymentStatus ${paymentIntent.status}`)
        else setMessage('Error Inesperado')
        setIsProcessing(false)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            {/* <h1>CheckoutForm</h1> */}
            <h6>Pagar</h6>
            <form id="payment-form" onSubmit={onFinish}>
                <PaymentElement />
                {/* <button id="submit">Pagard</button> */}
                <br /> <Button>Pagar</Button>
            </form>
            {/* <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
             

                <PaymentElement />

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form> */}
            <p>{message}</p>
        </div>
    )
}
