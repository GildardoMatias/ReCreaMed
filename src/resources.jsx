import { message } from 'antd'
export const API = "https://api.recreamed.com/api/"
export const S_API = "https://api.recreamed.com/session/"
export const IMAGE_API = "https://api.recreamed.com/images/"

export const logout = async () => {
    // Send exit time to set schedule
    const userType = localStorage.getItem('userType')
    if (userType === 'Recepcion') await sendSchedule()

    localStorage.removeItem('sessionToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    window.location.href = '/';
}

const sendSchedule = async () => {
    const { _id } = usuario;
    const scheduleBody = {
        usuario: _id,
        fecha_hora_entrada: localStorage.getItem("fecha_hora_entrada"),
        fecha_hora_salida: new Date(),
        notas: ''
    }
    await sendDataBody('asistencias/add', scheduleBody).then(() => localStorage.removeItem('fecha_hora_entrada'))
}

export const usuario = JSON.parse(localStorage.getItem('userData'));

export async function getData(endpoint) {
    return await fetch(API + endpoint, { mode: 'cors' })
        .then(response => response.json())
        .then(data => { return data })
}

export async function sendData(endpoint) {

    return await fetch(API + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
        .then((response) => {
            return response;
        })
        .catch(error => console.error('Error:', error))
};

export async function deleteData(endpoint) {

    return await fetch(API + endpoint, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
        .then(response => {
            console.log('Success:', response);
            message.info(response.message)
        })
        .catch(error => console.error('Error:', error))
};

export async function updateData(endpoint, values) {

    return await fetch(API + endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    }).then(res => res.json())
        .then(response => {
            // console.log('Success:', response);
            message.success(response.message || response.error);
            return response;
        })
        .catch(error => console.error('Error:', error))
};
export async function sendDataBody(endpoint, values) {

    return await fetch(API + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    }).then(res => res.json())
        .then(response => {
            return response
        })
        .catch(error => console.error('Error:', error))
};

export const Footer = () =>
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 88,
        backgroundColor: '#3c75ef',
    }}>

        <p style={{ color: 'white' }}>
            Desarrollado por <strong> <a href="https://www.realidadcreativa.com" style={{ marginLeft: 6, color: 'white' }}>realidadcreativa.com</a></strong> | © Realidad Creativa - 2023
        </p>

    </div>

export const estados = ["Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "CDMX", "Chiapas", "Chihuahua", "Coahuila", "Colima", "Durango", "Estado de Mexico", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "México", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"];

// Only use for Doctors, Administrators and receptionists
export const myHorarios = usuario && usuario.horarios && usuario.horarios.map(function (item) {
    return item;
})
export const myHospitals = usuario && usuario.horarios && usuario.horarios.map(function (item) {
    return item['sucursal'];
})
export const ids_hospitales = usuario && usuario.horarios && usuario.horarios.map(function (item) {
    return item['sucursal']['_id'];
})
