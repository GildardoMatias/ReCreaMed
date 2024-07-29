import React, { useState, useEffect } from 'react'
import { sendDataBody } from '../../resources'
import { Button} from 'antd'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './checkoutForm';

const stripePromise = loadStripe('pk_test_51KtKDMAGvuqPNUwvUumU2NTmwdxD6v0QHYeewNv2xu8h0gYTuItBy8Nuh2ynYtbg0dLl6dL7htl4F0LJlaRoASnN00YndlN1Po')

export default function Stripe() {

    const [, setSetupBegan] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [, setAccount] = useState({})
    const [clientSecret, setClientSecret] = useState(null)


    useEffect(() => { fetchAccount() }, [])

    useEffect(() => {
        createPaymentIntent()
    }, [])

    const createPaymentIntent = async () => {
        // sendData('stripe/create-payment-intent').then((rs) => {
        //     const { clientSecret } = rs;
        //     console.log(clientSecret)
        //     setClientSecret(clientSecret)
        // })

        return await fetch('http://localhost:4000/api/stripe/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then((rs) => {
                const { clientSecret } = rs;
                console.log(clientSecret)
                setClientSecret(clientSecret)
            })
            .catch(error => console.error('Error:', error))
    }


    const fetchAccount = async () => {
        // sendData('stripe/account/get').then(rs => {
        //     console.log('initial response', rs)
        //     if (rs.success) {
        //         setSetupBegan(rs.setSetupBegan)
        //         setIsLoading(false)
        //         setAccount(rs.account)
        //     } else {
        //         // Failed
        //         setError(rs.message)
        //         setIsLoading(false)
        //     }
        // })
        return await fetch('http://localhost:4000/api/stripe/account/get', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then((rs) => {
                console.log('initial response', rs)
            if (rs.success) {
                setSetupBegan(rs.setSetupBegan)
                setIsLoading(false)
                setAccount(rs.account)
            } else {
                // Failed
                setError(rs.message)
                setIsLoading(false)
            }
            })
            .catch(error => console.error('Error:', error))
    }

    // Primero se ejecuta setup y cuando devuelva el id de cuenta ahora si get account
    const onStartAccountSetup = () => {
        // On video, jumps from onClickBeginsetup to this method. We're going directly
        setIsLoading(true)
        sendDataBody('stripe/account/setup', { countryCode: 'MX' }).then((rs) => {
            if (rs.success) fetchAccount()
            else {
                setError(rs.message)
                setIsLoading(false)
            }
        })
    }

    // Finalizar form de los datos requeridos
    // const onFinish = (values) => {
    //     setIsLoading(true)
    //     console.log('Success:', values);
    //     sendDataBody('stripe/account/save', values).then((rs) => {
    //         if (rs.success) fetchAccount()
    //         else {
    //             setError(rs.message)
    //             setIsLoading(false)
    //         }
    //     })
    // };
   

    if (isLoading) return <p>Cargando...</p>

    if (!setSetupBegan) return <div>
        {error && <p>{error}</p>}
        <Button onClick={onStartAccountSetup}>Begin Setup</Button>
    </div>
    const options = {
        // passing the client secret obtained from the server
        clientSecret: clientSecret,
    };

    // Video at 7:20
    return (
        <div>
            {error && <p>{error}</p>}
            {/* <p>handler</p>
            <h4>Stripe</h4> */}
            {
                stripePromise && clientSecret && <Elements stripe={stripePromise}
                    options={options}
                >
                    <CheckoutForm />
                </Elements>
            }

            {/* {
                account.requirements && account.requirements.currently_due ?

                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off">
                        {

                            account.requirements.currently_due.map((fieldKey) => {
                                //  Here Will be an input for each fieldKey con su onFinishSaveFields 
                                // return <div>{fieldKey}</div>
                                return <Form.Item
                                    key={fieldKey}
                                    label={fieldKey}
                                    name={fieldKey}
                                // rules={[{required: true,message: 'Please input your username!'}]}
                                >
                                    <Input />
                                </Form.Item>
                            })
                        }
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
                    </Form>


                    : <p>All setup</p>

            } */}

        </div>
    )
}
