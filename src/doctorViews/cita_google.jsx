import React from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons';

export default function CitaGoogle(props) {
    var gapi = window.gapi
    /* 
      Update with your own Client Id and Api key 
    */
    var CLIENT_ID = "304555086627-ej94bugbu0cjugpungprg2j0k4je3p9q.apps.googleusercontent.com"
    var API_KEY = "AIzaSyA8fRG8GwQ3Gi-4bTk8EO2__sCQUXTKZd4"
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    var SCOPES = "https://www.googleapis.com/auth/calendar.events"

    const handleClick = () => {
        gapi.load('client:auth2', () => {
            console.log('loaded client')

            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            })

            gapi.client.load('calendar', 'v3', () => console.log('bam!'))

            gapi.auth2.getAuthInstance().signIn()
                .then(() => {
                    var event = {
                        'summary': 'Cita 5 con el medico',
                        'location': 'Morelia Mich',
                        'description': 'Cita 5 con meet incluido',
                        'start': {
                            'dateTime': '2022-08-04T09:00:00-07:00',
                            'timeZone': 'America/Los_Angeles'
                        },
                        'end': {
                            'dateTime': '2022-08-04T17:00:00-07:00',
                            'timeZone': 'America/Los_Angeles'
                        },
                        'recurrence': [
                            'RRULE:FREQ=DAILY;COUNT=2'
                        ],
                        'attendees': [
                            { 'email': 'lpage@example.com' },
                            { 'email': 'sbrin@example.com' }
                        ],
                        'reminders': {
                            'useDefault': false,
                            'overrides': [
                                { 'method': 'email', 'minutes': 24 * 60 },
                                { 'method': 'popup', 'minutes': 10 }
                            ]
                        },
                        'conferenceData': {
                            'createRequest': {
                                'requestId': "cita123",
                                'conferenceSolutionKey': { type: "hangoutsMeet" },
                            },
                        },
                    }

                    var request = gapi.client.calendar.events.insert({
                        'calendarId': 'primary',
                        'resource': event
                    }, { conferenceDataVersion: 1 })

                    request.execute(event => {
                        console.log(event)
                        window.open(event.htmlLink)
                    })


                    /*
                        Uncomment the following block to get events
                    */

                    // get events
                    gapi.client.calendar.events.list({
                        'calendarId': 'primary',
                        'timeMin': (new Date()).toISOString(),
                        'showDeleted': false,
                        'singleEvents': true,
                        'maxResults': 10,
                        'orderBy': 'startTime'
                    }).then(response => {
                        const events = response.result.items
                        console.log('EVENTS: ', events)
                    })



                })
        })
    }

    return (
        <Button onClick={handleClick} size='small' type="primary" >Generar Cita</Button>
    )
}
