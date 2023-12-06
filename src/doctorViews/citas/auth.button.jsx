import React, { useState } from 'react';
import ApiCalendar from 'react-google-calendar-api';
import { Button } from 'antd'

const CLIENT_ID = '245971086169-jepmkkhrdegtq034l5644n51p5jeh7d5.apps.googleusercontent.com'; // Reemplaza con tu ID de cliente
const CLIENT_SECRET = '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'; // Reemplaza con tu secreto de cliente
const REDIRECT_URI = 'http://localhost:3000'; // Reemplaza con tu URI de redirección
const API_KEY = 'AIzaSyDNI5xyDzbiMaI2qp7j0ou2YL0N61RYkXA'

const config = {
    "clientId": CLIENT_ID,
    "apiKey": API_KEY,
    "scope": "https://www.googleapis.com/auth/calendar",
    "discoveryDocs": [
        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
    ]
}

const apiCalendar = new ApiCalendar(config)

export default function AuthButton() {

    const [authText, setAuthText] = useState('null')

    const handleItemClick = async (name) => {
        if (name === 'sign-in') {
            const response = await apiCalendar.handleAuthClick();
            console.log('auth-response', response)
            setAuthText(response)
        } else if (name === 'sign-out') {
            apiCalendar.handleSignoutClick();
        }
    }

    const addEvent = () => {
        const eventFromNow = {
            summary: "Evento recreamed de prueba",
            time: 30,
        };

        apiCalendar
            .createEventFromNow(eventFromNow)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    return <div style={{ display: 'flex', flexDirection: 'row', gap: 12 }}>
        <p>{JSON.stringify(authText)}</p>
        <Button
            onClick={(e) => handleItemClick('sign-in')}
        >
            sign -in
        </Button>
        < Button onClick={(e) => handleItemClick('sign-out')}>
            sign - out
        </Button>
        <Button
            onClick={addEvent}
        >
            Create Event
        </Button>
    </div>;

}


// {"access_token":"ya29.a0AfB_byAzh57iKijo9zXH0_6INUzz21v8eXhXpMl9AUQwQEOmX_BBlPywhlQxewx6cEgxePBsoTklBzgWSK-AfTcu9AF84X3TKk5vBPkZqsODJAPy2ou-K6QCG47udKrn-v5rwStSJHdL_cN-GTFHSChu14EpsHrxWwaCgYKAUwSARASFQHGX2MibkHFs-cp2NQPpe6vgaaiyw0169","token_type":"Bearer","expires_in":3599,"scope":"https://www.googleapis.com/auth/calendar"}