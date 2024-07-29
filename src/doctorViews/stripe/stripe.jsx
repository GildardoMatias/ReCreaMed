import React, { useState, useEffect } from 'react'
import {  sendData } from '../../resources'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './checkoutForm';

const stripePromise = loadStripe('pk_test_51KtKDMAGvuqPNUwvUumU2NTmwdxD6v0QHYeewNv2xu8h0gYTuItBy8Nuh2ynYtbg0dLl6dL7htl4F0LJlaRoASnN00YndlN1Po')

export default function Stripe() {

    // const [setupBegan, setSetupBegan] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    // const [account, setAccount] = useState({})
    const [clientSecret, setClientSecret] = useState(null)


    useEffect(() => { fetchAccount() }, [])

    useEffect(() => {
        sendData('stripe/create-payment-intent').then((rs) => {
            const { clientSecret } = rs;
            console.log(clientSecret)
            setClientSecret(clientSecret)
        })
    }, [])



    const fetchAccount = () => {
        sendData('stripe/account/get').then(rs => {
            console.log('initial response', rs)
            if (rs.success) {
                // setSetupBegan(rs.setSetupBegan)
                setIsLoading(false)
                // setAccount(rs.account)
            } else {
                // Failed
                setError(rs.message)
                setIsLoading(false)
            }
        })
    }

    // Primero se ejecuta setup y cuando devuelva el id de cuenta ahora si get account
    // const onStartAccountSetup = () => {
    //     // On video, jumps from onClickBeginsetup to this method. We're going directly
    //     setIsLoading(true)
    //     sendDataBody('stripe/account/setup', { countryCode: 'MX' }).then((rs) => {
    //         if (rs.success) fetchAccount()
    //         else {
    //             setError(rs.message)
    //             setIsLoading(false)
    //         }
    //     })
    // }

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

    // if (!setSetupBegan) return <div>
    //     {error && <p>{error}</p>}
    //     <Button onClick={onStartAccountSetup}>Begin Setup</Button>
    // </div>
    const options = {
        // passing the client secret obtained from the server
        clientSecret: clientSecret,
    };

    // Video at 7:20
    return (
        <div>
            {error && <p>{error}</p>}
            <p>handler</p>
            <h4>Stripe</h4>
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
