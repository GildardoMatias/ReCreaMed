import React from 'react'
import { Button } from 'antd'
export default function Cita() {

    var gapi = window.gapi
    var CLIENT_ID = '304555086627-ej94bugbu0cjugpungprg2j0k4je3p9q.apps.googleusercontent.com';
    var API_KEY = 'AIzaSyA8fRG8GwQ3Gi-4bTk8EO2__sCQUXTKZd4';
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    var SCOPES = "https://www.googleapis.com/auth/calendar.events";

    const handleClick = () => {
        gapi.load('client:auth2', () => {
            console.log('Loaded client');
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES
            })

            gapi.client.load('calendar','v3', () => {console.log('TOMAPto');})

            gapi.auth2.getAuthInstance().signIn()
        });
    }
    
    return (
        <div>
            citas
            <Button onClick={handleClick}>NOUS</Button>
        </div>
    )
}
