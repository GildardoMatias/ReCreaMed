import React, { useState } from 'react';
import ApiCalendar from 'react-google-calendar-api';
import { Button, Card } from 'antd'
import { GoogleOutlined, CheckCircleOutlined } from '@ant-design/icons'

//const CLIENT_ID = '245971086169-jepmkkhrdegtq034l5644n51p5jeh7d5.apps.googleusercontent.com'; // D3 personal
const CLIENT_ID = '91034098034-9nsi5epfbpd5ld2gu8629v125je8i151.apps.googleusercontent.com'; // recreameds
// const CLIENT_SECRET = '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'; // Reemplaza con tu secreto de cliente
// const REDIRECT_URI = 'http://localhost:3000'; // Reemplaza con tu URI de redirección
//const API_KEY = 'AIzaSyDNI5xyDzbiMaI2qp7j0ou2YL0N61RYkXA' // Personal D3
const API_KEY = 'AIzaSyB4mdJOL1daKPbkvg3T3-Bw_zLHtCq8umo'

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

    const [authText, setAuthText] = useState(null)

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

    return <div style={{ display: 'flex', flexDirection: 'row', gap: 12, justifyContent: 'flex-end' }}>
        {/* <p>{JSON.stringify(authText)}</p> */}
        {/* <p>{authText && authText.expires_in}</p> */}
        {
            (authText && authText.access_token) ?
                <Card size='small' bodyStyle={{ alignItems: 'center' }}>
                    <CheckCircleOutlined color='green' size={26} style={{ color: '#5fa1c4', fontSize: 22 }} />
                    Sincronizado con Google Calendar
                </Card>
                :
                <Button
                    onClick={(e) => handleItemClick('sign-in')}
                    icon={<GoogleOutlined />}
                >
                    Sincronizar Calendario
                </Button>

        }



        {/* < Button onClick={(e) => handleItemClick('sign-out')}>
            sign - out
        </Button>
        <Button
            onClick={addEvent}
        >
            Create Event
        </Button> */}
    </div>;

}

export const createEvent = (startDate, duration, desc) => {

    const endDate = new Date(startDate);
    endDate.setTime(endDate.getTime() + 1 * (duration ?? 60) * 60 * 1000)

    const eventWithVideoConference = {
        summary: desc,
        start: {
            dateTime: startDate,
            timeZone: "America/Mexico_City",
        },
        end: {
            dateTime: endDate,
            timeZone: "America/Mexico_City",
        },
    };
    if (apiCalendar) {
        apiCalendar
            .createEventWithVideoConference(eventWithVideoConference)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    }

}

// {"access_token":"ya29.a0AfB_byAzh57iKijo9zXH0_6INUzz21v8eXhXpMl9AUQwQEOmX_BBlPywhlQxewx6cEgxePBsoTklBzgWSK-AfTcu9AF84X3TKk5vBPkZqsODJAPy2ou-K6QCG47udKrn-v5rwStSJHdL_cN-GTFHSChu14EpsHrxWwaCgYKAUwSARASFQHGX2MibkHFs-cp2NQPpe6vgaaiyw0169","token_type":"Bearer","expires_in":3599,"scope":"https://www.googleapis.com/auth/calendar"}

// {
//     "result": {
//         "kind": "calendar#event",
//         "etag": "\"3403817418722000\"",
//         "id": "30cfij8rhq7gcl79sak35rt9v8",
//         "status": "confirmed",
//         "htmlLink": "https://www.google.com/calendar/event?eid=MzBjZmlqOHJocTdnY2w3OXNhazM1cnQ5djggZ2lsZGFyZG8ubWF0aWFzLnJAbQ",
//         "created": "2023-12-07T00:25:09.000Z",
//         "updated": "2023-12-07T00:25:09.361Z",
//         "creator": {
//             "email": "gildardo.matias.r@gmail.com",
//             "self": true
//         },
//         "organizer": {
//             "email": "gildardo.matias.r@gmail.com",
//             "self": true
//         },
//         "start": {
//             "dateTime": "2023-12-06T18:25:09-06:00",
//             "timeZone": "America/Mexico_City"
//         },
//         "end": {
//             "dateTime": "2023-12-06T19:25:09-06:00",
//             "timeZone": "America/Mexico_City"
//         },
//         "iCalUID": "30cfij8rhq7gcl79sak35rt9v8@google.com",
//         "sequence": 0,
//         "hangoutLink": "https://meet.google.com/mzt-uhoj-qwi",
//         "conferenceData": {
//             "createRequest": {
//                 "requestId": "6acc5c7b-2588-4f96-9303-7b68f0a535d1",
//                 "conferenceSolutionKey": {
//                     "type": "hangoutsMeet"
//                 },
//                 "status": {
//                     "statusCode": "success"
//                 }
//             },
//             "entryPoints": [
//                 {
//                     "entryPointType": "video",
//                     "uri": "https://meet.google.com/mzt-uhoj-qwi",
//                     "label": "meet.google.com/mzt-uhoj-qwi"
//                 }
//             ],
//             "conferenceSolution": {
//                 "key": {
//                     "type": "hangoutsMeet"
//                 },
//                 "name": "Google Meet",
//                 "iconUri": "https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v6/web-512dp/logo_meet_2020q4_color_2x_web_512dp.png"
//             },
//             "conferenceId": "mzt-uhoj-qwi"
//         },
//         "reminders": {
//             "useDefault": true
//         },
//         "eventType": "default"
//     },
//     "body": "{\n \"kind\": \"calendar#event\",\n \"etag\": \"\\\"3403817418722000\\\"\",\n \"id\": \"30cfij8rhq7gcl79sak35rt9v8\",\n \"status\": \"confirmed\",\n \"htmlLink\": \"https://www.google.com/calendar/event?eid=MzBjZmlqOHJocTdnY2w3OXNhazM1cnQ5djggZ2lsZGFyZG8ubWF0aWFzLnJAbQ\",\n \"created\": \"2023-12-07T00:25:09.000Z\",\n \"updated\": \"2023-12-07T00:25:09.361Z\",\n \"creator\": {\n  \"email\": \"gildardo.matias.r@gmail.com\",\n  \"self\": true\n },\n \"organizer\": {\n  \"email\": \"gildardo.matias.r@gmail.com\",\n  \"self\": true\n },\n \"start\": {\n  \"dateTime\": \"2023-12-06T18:25:09-06:00\",\n  \"timeZone\": \"America/Mexico_City\"\n },\n \"end\": {\n  \"dateTime\": \"2023-12-06T19:25:09-06:00\",\n  \"timeZone\": \"America/Mexico_City\"\n },\n \"iCalUID\": \"30cfij8rhq7gcl79sak35rt9v8@google.com\",\n \"sequence\": 0,\n \"hangoutLink\": \"https://meet.google.com/mzt-uhoj-qwi\",\n \"conferenceData\": {\n  \"createRequest\": {\n   \"requestId\": \"6acc5c7b-2588-4f96-9303-7b68f0a535d1\",\n   \"conferenceSolutionKey\": {\n    \"type\": \"hangoutsMeet\"\n   },\n   \"status\": {\n    \"statusCode\": \"success\"\n   }\n  },\n  \"entryPoints\": [\n   {\n    \"entryPointType\": \"video\",\n    \"uri\": \"https://meet.google.com/mzt-uhoj-qwi\",\n    \"label\": \"meet.google.com/mzt-uhoj-qwi\"\n   }\n  ],\n  \"conferenceSolution\": {\n   \"key\": {\n    \"type\": \"hangoutsMeet\"\n   },\n   \"name\": \"Google Meet\",\n   \"iconUri\": \"https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v6/web-512dp/logo_meet_2020q4_color_2x_web_512dp.png\"\n  },\n  \"conferenceId\": \"mzt-uhoj-qwi\"\n },\n \"reminders\": {\n  \"useDefault\": true\n },\n \"eventType\": \"default\"\n}\n",
//     "headers": {
//         "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
//         "content-encoding": "gzip",
//         "content-length": "694",
//         "content-type": "application/json; charset=UTF-8",
//         "date": "Thu, 07 Dec 2023 00:25:09 GMT",
//         "etag": "\"3403817418722000\"",
//         "expires": "Mon, 01 Jan 1990 00:00:00 GMT",
//         "pragma": "no-cache",
//         "server": "ESF",
//         "vary": "Origin, X-Origin, Referer"
//     },
//     "status": 200,
//     "statusText": null
// }