// import React, { useState, useEffect } from 'react'
// import { google } from 'googleapis';
// import { OAuth2Client } from 'google-auth-library';

// const CLIENT_ID = '245971086169-jepmkkhrdegtq034l5644n51p5jeh7d5.apps.googleusercontent.com'; // Reemplaza con tu ID de cliente
// const CLIENT_SECRET = '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'; // Reemplaza con tu secreto de cliente
// const REDIRECT_URI = 'http://localhost:3000'; // Reemplaza con tu URI de redirección

// const oAuth2Client = new OAuth2Client({
//     clientId: CLIENT_ID,
//     clientSecret: CLIENT_SECRET,
//     redirectUri: REDIRECT_URI,
// });

// const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

// export default function CitaGoogle() {

//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [eventCreated, setEventCreated] = useState(false);

//     useEffect(() => {
//         checkAuthentication();
//     }, []);

//     // Verificar si el usuario ya está autenticado
//     const checkAuthentication = () => {
//         const token = oAuth2Client.getToken();
//         if (token) {
//             setIsAuthenticated(true);
//             oAuth2Client.setCredentials(token);
//         }
//     }

//     const handleLogin = async () => {
//         const authorizeUrl = oAuth2Client.generateAuthUrl({
//             access_type: 'offline',
//             scope: 'https://www.googleapis.com/auth/calendar',
//         });

//         // Redirecciona al usuario para la autenticación
//         window.location.href = authorizeUrl;
//     };

//     return (
//         <div>
//             {isAuthenticated ? (
//                 <div>
//                     <h2>¡Autenticado con Google!</h2>
//                     {/* <button onClick={handleCreateEvent}>Crear Evento</button> */}
//                     {/* {eventCreated && <p>Evento creado con éxito.</p>} */}
//                 </div>
//             ) : (
//                 <button onClick={handleLogin}>Iniciar sesión con Google</button>
//             )}
//         </div>
//     )
// }