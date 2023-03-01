const API = "https://api.recreamed.com/api/"

console.log('starting...')

async function getData(endpoint) {
    return await fetch(API + endpoint, { mode: 'cors' })
        .then(response => response.json())
        .then(data => { return data })
}

async function sendDataBody(endpoint, values) {
    const url = API + endpoint;
    console.log('sendin to ', url)
    return await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    }).then(res => res.json())
        .then(response => {
            return response
        })
        .catch(error => console.error('Error:', error))
};

const datos = [
    {
        "medicos_asignados": [],
        "tratamiento_actual": [],
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "_id": "626943c7f8254c72c3017798",
        "rol": "SuperAdministrador",
        "horarios": [
            {
                "sucursal": {
                    "_id": "625705929a6437369f835bc7",
                    "logo": "b65dd9e7-ea5d-4ce3-a6e8-28499a6174e0.jpg",
                    "nombre": "Vista Bella"
                },
                "horario": "11-13",
                "_id": "63e6795d51a4e3b6714e7db3"
            }
        ],
        "id_medicoasignado": "625706149a6437369f835bce",
        "name": "SuperAdministrador",
        "email": "superadmin@realidadcreativa.com",
        "password": "$2b$10$zEqu26nxUnAWpHPEGTpcjOeHwL.tNCaq3vbjAdUf3XpZEqLmdzvKa",
        "avatar": "https://",
        "telefono": 4341026429,
        "cedula": "",
        "numinterior": "",
        "numexterior": "",
        "calle": "",
        "colonia": "",
        "municipio": "",
        "estado": "",
        "codigopostal": 0,
        "estatus": 0,
        "certificacion": "",
        "universidad": "",
        "remember_token": false,
        "createdAt": "2022-04-27T13:23:19.727Z",
        "updatedAt": "2023-02-10T17:05:33.256Z",
        "__v": 0
    },
    {
        "medicos_asignados": [],
        "tratamiento_actual": [],
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "_id": "626c20e033ef7f0ab2de0407",
        "rol": "Recepcion",
        "horarios": [
            {
                "sucursal": {
                    "_id": "625705929a6437369f835bc7",
                    "logo": "b65dd9e7-ea5d-4ce3-a6e8-28499a6174e0.jpg",
                    "nombre": "Vista Bella"
                },
                "horario": "8-14",
                "_id": "626c20e033ef7f0ab2de0408"
            }
        ],
        "id_medicoasignado": "626943e0f8254c72c301779c",
        "name": "Rcepcionista",
        "email": "recepcion@realidadcreativa.com",
        "password": "$2b$10$DbEuCg5tdHUY2xO1IUl.1uDZ/UaRwXAyumNbgP8F9rDJ4ypa3Rega",
        "avatar": "https://",
        "telefono": 1234567890,
        "numinterior": "4",
        "numexterior": "425",
        "calle": "San Juan",
        "colonia": "Prados Verdes",
        "municipio": "Municipio",
        "estado": "Michoacan",
        "codigopostal": 60297,
        "estatus": 1,
        "certificacion": "",
        "createdAt": "2022-04-29T17:31:12.034Z",
        "updatedAt": "2023-02-20T14:58:47.519Z",
        "__v": 0
    },
    {
        "medicos_asignados": [],
        "tratamiento_actual": [],
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "_id": "626c211e33ef7f0ab2de040b",
        "rol": "Administrador",
        "horarios": [
            {
                "id_sucursal": "625705929a6437369f835bc7",
                "horario": "8-14",
                "_id": "626c211e33ef7f0ab2de040c"
            }
        ],
        "id_medicoasignado": "626943e0f8254c72c301779c",
        "name": "Administrador 2",
        "email": "administrador2@realidadcreativa.com",
        "password": "$2b$10$pHcsrRihBTkgekY.vtFCV.WzMnnEXFS0Q6UJ30RsHV.1WF9xyYyJu",
        "avatar": "https://",
        "telefono": 1234567890,
        "numinterior": "4",
        "numexterior": "425",
        "calle": "San Juan",
        "colonia": "Prados Verdes",
        "municipio": "Municipio",
        "estado": "Michoacan",
        "codigopostal": 60297,
        "estatus": 1,
        "certificacion": "",
        "createdAt": "2022-04-29T17:32:14.640Z",
        "updatedAt": "2022-04-29T17:32:14.640Z",
        "__v": 0
    },
    {
        "tratamiento_actual": [],
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "_id": "62f2f484c59fcc36f37f5276",
        "rol": "Medico",
        "horarios": [
            {
                "sucursal": {
                    "_id": "62f2f366c59fcc36f37f526f",
                    "logo": "92df22a5-0966-4a59-9a65-5b435a04e210.png",
                    "nombre": "SPANISH COUNSELING SERVICES"
                },
                "horario": "15:00 a 20:00 horas",
                "_id": "62f2f484c59fcc36f37f5277"
            }
        ],
        "medicos_asignados": [],
        "name": "Emilio Anguiano",
        "email": "gattopersona@gmail.com",
        "password": "$2b$10$kOJmnj9muP3fO1OzcR/uIu1MJesdOZyAwt7M.i411sXrSarNOGrDa",
        "avatar": "e8884056-2a70-400d-9572-2cdb370529e9.jpg",
        "telefono": 5127792881,
        "numinterior": "1",
        "numexterior": "1",
        "calle": "a",
        "colonia": "a",
        "municipio": "a",
        "estado": "Michoacan",
        "codigopostal": 1,
        "estatus": 1,
        "createdAt": "2022-08-09T23:57:56.528Z",
        "updatedAt": "2022-09-26T18:23:30.882Z",
        "__v": 0
    },
    {
        "tratamiento_actual": [],
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "_id": "62f55811c59fcc36f37f53fe",
        "rol": "Recepcion",
        "horarios": [
            {
                "sucursal": {
                    "_id": "625705929a6437369f835bc7",
                    "logo": "b65dd9e7-ea5d-4ce3-a6e8-28499a6174e0.jpg",
                    "nombre": "Vista Bella"
                },
                "horario": "7:00 am - 11:00 am",
                "_id": "62f55811c59fcc36f37f53ff"
            }
        ],
        "medicos_asignados": [],
        "name": "Recepcionista 2",
        "email": "recepcion2@realidadcreativa.com",
        "password": "$2b$10$uDkYfZL3nmwGCdBp8GrrLenYltmWaxozMxFhelPMGAAoG29Fhsn.S",
        "avatar": "https://",
        "telefono": 1234567890,
        "cedula": "1234567890",
        "numinterior": "4",
        "numexterior": "123",
        "calle": "San Juan",
        "colonia": "Prados Verdes",
        "municipio": "La Huerta",
        "estado": "Michoacan",
        "codigopostal": 58000,
        "estatus": 1,
        "createdAt": "2022-08-11T19:27:13.927Z",
        "updatedAt": "2022-08-11T19:27:13.927Z",
        "__v": 0
    },
    {
        "tratamiento_actual": [],
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "_id": "62f558c0c59fcc36f37f5406",
        "rol": "Recepcion",
        "horarios": [
            {
                "sucursal": {
                    "_id": "625705929a6437369f835bc7",
                    "logo": "b65dd9e7-ea5d-4ce3-a6e8-28499a6174e0.jpg",
                    "nombre": "Vista Bella"
                },
                "horario": "7:00 am - 11:00 am",
                "_id": "62f558c0c59fcc36f37f5407"
            }
        ],
        "medicos_asignados": [],
        "name": "Recepcionista 3",
        "email": "recepcion3@realidadcreativa.com",
        "password": "$2b$10$irzUiGHwhU2Sha0iMt9zCuA3x4eM7gSkaQYxhZ8bjmOFUhk3g0Ehm",
        "avatar": "https://",
        "telefono": 1234567890,
        "cedula": "1234567890",
        "numinterior": "4",
        "numexterior": "123",
        "calle": "San Juan",
        "colonia": "Prados Verdes",
        "municipio": "La Huerta",
        "estado": "Michoacan",
        "codigopostal": 58000,
        "estatus": 1,
        "createdAt": "2022-08-11T19:30:08.679Z",
        "updatedAt": "2022-08-11T19:30:08.679Z",
        "__v": 0
    },
    {
        "_id": "62f55bffc59fcc36f37f541f",
        "rol": "Medico",
        "horarios": [
            {
                "sucursal": {
                    "_id": "62f15933ad98342a3d9d7edb",
                    "logo": "931e947a-18d8-49bd-95ea-50620b24e641.png",
                    "nombre": "Clinica Superior"
                },
                "horario": "8:00 am - 12:00 am",
                "_id": "6306a17ada4b72f93caa5704"
            }
        ],
        "medicos_asignados": [],
        "name": "Gildardo Matias",
        "email": "medico@realidadcreativa.com",
        "password": "$2b$10$VX8SMSuJWNx4OeiFPpM.v.WMHMBKv9V7eFa8EoKus9inmdAz3gs2S",
        "avatar": "335c78a3-eb37-4a58-b7a5-545db7588f35.jpg",
        "telefono": 1234567890,
        "cedula": "1234567890",
        "numinterior": "4",
        "numexterior": "987",
        "calle": "San Juan",
        "colonia": "Prados Verdes",
        "municipio": "La Huerta",
        "estado": "Michoacan",
        "codigopostal": 58000,
        "estatus": 1,
        "certificacion": "Sin certificacion Updated",
        "universidad": "UMSNH",
        "createdAt": "2022-08-11T19:43:59.556Z",
        "updatedAt": "2023-02-02T03:51:14.628Z",
        "__v": 0,
        "configuracion": {
            "costo_cita": 600,
            "tratamientos_ofrecidos": [
                {
                    "tratamiento": "Ketamina 1",
                    "costo": 1200,
                    "_id": "63d32c12eb98a113a8e61bcb"
                },
                {
                    "tratamiento": "Ketamina 3",
                    "costo": 1205,
                    "_id": "63d32ca8eb98a113a8e61bd4"
                }
            ],
            "_id": "63d32ca8eb98a113a8e61bd2"
        },
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "tratamiento_actual": []
    },
    {
        "tratamiento_actual": [],
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "_id": "62fd911f578d2b4669e0e056",
        "rol": "Medico",
        "horarios": [
            {
                "sucursal": {
                    "_id": "62fc4929c59fcc36f37f54c1",
                    "logo": "e3fb6a26-f406-4af4-a80b-8b16e2ff95ed.webp",
                    "nombre": "CACISME"
                },
                "horario": "Lunes 16:00 a 20:00 horas",
                "_id": "62fd911f578d2b4669e0e057"
            },
            {
                "sucursal": {
                    "_id": "62fc4929c59fcc36f37f54c1",
                    "logo": "e3fb6a26-f406-4af4-a80b-8b16e2ff95ed.webp",
                    "nombre": "CACISME"
                },
                "horario": "Miércoles 16:00 a 20:00 horas",
                "_id": "62fd9233578d2b4669e0e06e"
            },
            {
                "sucursal": {
                    "_id": "62fc4929c59fcc36f37f54c1",
                    "logo": "e3fb6a26-f406-4af4-a80b-8b16e2ff95ed.webp",
                    "nombre": "CACISME"
                },
                "horario": "Viernes 16:00 a 20:00 horas",
                "_id": "62fd9240578d2b4669e0e077"
            },
            {
                "sucursal": {
                    "_id": "62e9357f14629809cdfc2c72",
                    "logo": "b05ca96e-f8f5-4f28-8c05-9a0c4d91740b.jpg",
                    "nombre": "CIDERALT"
                },
                "_id": "6331fa219811c8b706435d51"
            }
        ],
        "medicos_asignados": [],
        "name": "Misael Tapia Orozco",
        "email": "misaeltapiao@yahoo.com",
        "password": "$2b$10$q7P9trbSLIS7q1MTw18AquAcMpkWLUSLmxHt375zeLeZEz3V6WXhG",
        "avatar": "1225d8aa-9395-4fb3-abd3-26021fc2fd06.webp",
        "telefono": 4431271635,
        "estatus": 1,
        "createdAt": "2022-08-18T01:08:47.450Z",
        "updatedAt": "2022-09-26T19:14:41.510Z",
        "__v": 0,
        "universidad": "UMSNH",
        "cedula": "7531578"
    },
    {
        "_id": "62fd9982578d2b4669e0e18b",
        "rol": "Paciente",
        "horarios": [],
        "medicos_asignados": [],
        "name": "Eduardo Alvarez",
        "responsable": {
            "nombre": "Manuel Alvarez",
            "telefono": 4432578342,
            "_id": "62fd9982578d2b4669e0e18c"
        },
        "email": "eduardo@hotmail.com",
        "password": "$2b$10$fom2ID13AOM8/LsnCnOL7OnvIPNUDSRp0TFE.Ad1GBwuZggrZnjvG",
        "avatar": "https://",
        "telefono": 4432345643,
        "cedula": "",
        "municipio": "Morelia",
        "estado": "Michoacan",
        "codigopostal": 58000,
        "estatus": 1,
        "certificacion": "",
        "universidad": "",
        "createdAt": "2022-08-18T01:44:34.065Z",
        "updatedAt": "2022-11-19T00:46:40.402Z",
        "__v": 0,
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "tratamiento_actual": []
    },
    {
        "tratamiento_actual": [],
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "_id": "63039acabd637f93fb6fb11b",
        "rol": "Paciente",
        "horarios": [],
        "medicos_asignados": [
            {
                "_id": "62f55bffc59fcc36f37f541f",
                "horarios": [
                    {
                        "sucursal": "62f15933ad98342a3d9d7edb",
                        "horario": "8:00 am - 12:00 am",
                        "_id": "6306a17ada4b72f93caa5704"
                    }
                ],
                "name": "Gildardo Matias"
            }
        ],
        "name": "Ignacio Lopez",
        "responsable": {
            "_id": "63039acabd637f93fb6fb11c"
        },
        "email": "Ignacio@gmail.com",
        "password": "$2b$10$4KyoHR70GMlqbhlIPrkDB.IUDAHZnQf3GfO58I7TDaf0DGKhj6C9m",
        "avatar": "6ff2ed37-f6bb-4b0a-9979-649eea9af3af.jpg",
        "telefono": 1234567890,
        "cedula": "",
        "municipio": "Morelos",
        "estado": "Morelos",
        "codigopostal": 38000,
        "estatus": 1,
        "certificacion": "",
        "universidad": "",
        "createdAt": "2022-08-22T15:03:38.563Z",
        "updatedAt": "2022-08-24T22:17:47.004Z",
        "__v": 0
    },
    {
        "tratamiento_actual": [],
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "_id": "6304fa3cd1624dcf3fff4912",
        "rol": "Medico",
        "horarios": [
            {
                "sucursal": {
                    "_id": "625705929a6437369f835bc7",
                    "logo": "b65dd9e7-ea5d-4ce3-a6e8-28499a6174e0.jpg",
                    "nombre": "Vista Bella"
                },
                "horario": "",
                "_id": "6304fa3cd1624dcf3fff4913"
            }
        ],
        "medicos_asignados": [],
        "name": "Gildardo 2",
        "email": "gildardo2@gmail.com",
        "password": "$2b$10$h7BzE4EIYb6KcQIrg.oeD.1lGHf6TfATC82iXoFG4nq13A2WkETsC",
        "avatar": "1b511bb0-2543-4f3c-a692-c6da20a0eaa0.jpg",
        "telefono": 4342416019,
        "estatus": 1,
        "createdAt": "2022-08-23T16:03:08.282Z",
        "updatedAt": "2023-02-09T22:20:31.615Z",
        "__v": 0,
        "universidad": "Universidad Michoacana de San Nicolas de Hidalgo",
        "configuracion": {
            "costo_cita": 450,
            "tratamientos_ofrecidos": [
                {
                    "tratamiento": "ketamina 1",
                    "costo": 3200,
                    "_id": "63d0326eeb98a113a8e615d1"
                },
                {
                    "tratamiento": "ketamina 2",
                    "costo": 5000,
                    "_id": "63d0370beb98a113a8e61612"
                },
                {
                    "tratamiento": "ketamina 2",
                    "costo": 5000,
                    "_id": "63d0377beb98a113a8e6161c"
                }
            ],
            "_id": "63d0377beb98a113a8e61619"
        }
    },
    {
        "tratamiento_actual": [],
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "_id": "63311b999811c8b706435c24",
        "rol": "Medico",
        "horarios": [
            {
                "sucursal": {
                    "_id": "62fc4929c59fcc36f37f54c1",
                    "logo": "e3fb6a26-f406-4af4-a80b-8b16e2ff95ed.webp",
                    "nombre": "CACISME"
                },
                "_id": "6331f6019811c8b706435d3e"
            },
            {
                "sucursal": {
                    "_id": "62e9357f14629809cdfc2c72",
                    "logo": "b05ca96e-f8f5-4f28-8c05-9a0c4d91740b.jpg",
                    "nombre": "CIDERALT"
                },
                "_id": "6331f6019811c8b706435d3f"
            }
        ],
        "medicos_asignados": [],
        "name": "David Farias",
        "email": "israel_difa@hotmail.com",
        "password": "$2b$10$UKIjpulkyKIo5ZD0xVjbuuFVKyErzHDvnCJuYb4bHLRHZnxRu4yxy",
        "avatar": "90196a41-9370-4d9a-b3fc-2eaa0128360a.jpg",
        "telefono": 5539402052,
        "estatus": 1,
        "createdAt": "2022-09-26T03:25:14.016Z",
        "updatedAt": "2022-10-27T22:35:46.311Z",
        "__v": 0
    },
    {
        "tratamiento_actual": [],
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "_id": "63311bdb9811c8b706435c2c",
        "rol": "Medico",
        "horarios": [
            {
                "sucursal": {
                    "_id": "62fc4929c59fcc36f37f54c1",
                    "logo": "e3fb6a26-f406-4af4-a80b-8b16e2ff95ed.webp",
                    "nombre": "CACISME"
                },
                "_id": "6331f6be9811c8b706435d46"
            },
            {
                "sucursal": {
                    "_id": "62e9357f14629809cdfc2c72",
                    "logo": "b05ca96e-f8f5-4f28-8c05-9a0c4d91740b.jpg",
                    "nombre": "CIDERALT"
                },
                "_id": "6331f6be9811c8b706435d47"
            }
        ],
        "medicos_asignados": [],
        "name": "Tzihueriti Castillo",
        "email": "tzihue@hotmail.com",
        "password": "$2b$10$P76WVr0hJDCTsqTDtLC33uAjNziJfVwOB2RlitJGZjAkUvcGNt8j6",
        "avatar": "676ae33c-2a7a-4622-8eb6-18dea465503e.jpg",
        "telefono": 4432369926,
        "estatus": 1,
        "createdAt": "2022-09-26T03:26:19.875Z",
        "updatedAt": "2022-09-26T19:00:14.005Z",
        "__v": 0
    },
    {
        "_id": "634f0989f43ee52aa1ce2236",
        "rol": "Paciente",
        "horarios": [],
        "medicos_asignados": [
            {
                "_id": "62f55bffc59fcc36f37f541f",
                "horarios": [
                    {
                        "sucursal": "62f15933ad98342a3d9d7edb",
                        "horario": "8:00 am - 12:00 am",
                        "_id": "6306a17ada4b72f93caa5704"
                    }
                ],
                "name": "Gildardo Matias"
            },
            {
                "_id": "6304fa3cd1624dcf3fff4912",
                "horarios": [
                    {
                        "sucursal": "625705929a6437369f835bc7",
                        "horario": "",
                        "_id": "6304fa3cd1624dcf3fff4913"
                    }
                ],
                "name": "Gildardo 2"
            }
        ],
        "name": "Arturo",
        "responsable": {
            "_id": "634f0989f43ee52aa1ce2237"
        },
        "email": "arturo@realidadcreativa.com",
        "password": "$2b$10$A2N95LUd/3U9MQJbSqdg8.dXPkG26VRw5RTBzva5RjraLgfkaw1lS",
        "avatar": "2dbb5b2d-94e9-48df-886c-fc46c6f053bc.png",
        "telefono": 1234567890,
        "cedula": "",
        "numinterior": "4",
        "numexterior": "234",
        "calle": "San Juan",
        "colonia": "Encinos",
        "municipio": "Maravatio",
        "estado": "Michoacan",
        "codigopostal": 56000,
        "estatus": 1,
        "certificacion": "",
        "universidad": "",
        "sexo": "H",
        "edad": 35,
        "diagnostico": "Sin diagnostico",
        "peso": 68,
        "talla": 32,
        "ocupacion": "Comerciante",
        "estado_civil": "Casado",
        "escolaridad": "Primaria",
        "ciudad": "Maravatio",
        "lugar_de_nacimiento": "Maravatio",
        "fuma": true,
        "alcohol": true,
        "drogas": "Antes",
        "cuales_drogas": "Cocaina",
        "tratamiento_actual": [
            "insulina",
            "Oeprasol",
            "Levonogestrel"
        ],
        "enfermedades_familiares": [
            "Diabetes",
            "Hipertension",
            "Colesterol alto"
        ],
        "enfermedades_medicas": [
            "Gastritis",
            "Colitis"
        ],
        "createdAt": "2022-10-18T20:16:09.700Z",
        "updatedAt": "2023-01-31T17:43:42.900Z",
        "__v": 0
    },
    {
        "_id": "6356f221f43ee52aa1ce2346",
        "rol": "Recepcion",
        "horarios": [
            {
                "sucursal": {
                    "_id": "625705929a6437369f835bc7",
                    "logo": "b65dd9e7-ea5d-4ce3-a6e8-28499a6174e0.jpg",
                    "nombre": "Vista Bella"
                },
                "horario": "7:00 am - 11:00 am",
                "_id": "6356f221f43ee52aa1ce2347"
            }
        ],
        "medicos_asignados": [
            {
                "_id": "62f55bffc59fcc36f37f541f",
                "horarios": [
                    {
                        "sucursal": "62f15933ad98342a3d9d7edb",
                        "horario": "8:00 am - 12:00 am",
                        "_id": "6306a17ada4b72f93caa5704"
                    }
                ],
                "name": "Gildardo Matias"
            }
        ],
        "name": "Recepcionista 4",
        "email": "recepcion4@realidadcreativa.com",
        "password": "$2b$10$wgE51GExh/cQpsi2Ivmbe.EImAlBLxRKu7kxqLhbO0F5BHk4zWs6.",
        "avatar": "https://",
        "telefono": 4341026429,
        "cedula": "",
        "numinterior": "",
        "numexterior": "",
        "calle": "",
        "colonia": "",
        "municipio": "",
        "estado": "",
        "codigopostal": 0,
        "estatus": 0,
        "certificacion": "",
        "universidad": "",
        "remember_token": false,
        "tratamiento_actual": [],
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "createdAt": "2022-10-24T20:14:25.578Z",
        "updatedAt": "2022-10-24T20:14:25.578Z",
        "__v": 0
    },
    {
        "_id": "635944c7f43ee52aa1ce243a",
        "rol": "Administrador",
        "horarios": [
            {
                "sucursal": {
                    "_id": "625705929a6437369f835bc7",
                    "logo": "b65dd9e7-ea5d-4ce3-a6e8-28499a6174e0.jpg",
                    "nombre": "Vista Bella"
                },
                "horario": "7:00 am - 11:00 am",
                "_id": "635944c7f43ee52aa1ce243b"
            },
            {
                "sucursal": {
                    "_id": "62f15933ad98342a3d9d7edb",
                    "logo": "931e947a-18d8-49bd-95ea-50620b24e641.png",
                    "nombre": "Clinica Superior"
                },
                "horario": "11:00 am - 13:00 pm",
                "_id": "63d1fe48eb98a113a8e6185d"
            }
        ],
        "medicos_asignados": [
            {
                "_id": "62f55bffc59fcc36f37f541f",
                "horarios": [
                    {
                        "sucursal": "62f15933ad98342a3d9d7edb",
                        "horario": "8:00 am - 12:00 am",
                        "_id": "6306a17ada4b72f93caa5704"
                    }
                ],
                "name": "Gildardo Matias"
            },
            {
                "_id": "6304fa3cd1624dcf3fff4912",
                "horarios": [
                    {
                        "sucursal": "625705929a6437369f835bc7",
                        "horario": "",
                        "_id": "6304fa3cd1624dcf3fff4913"
                    }
                ],
                "name": "Gildardo 2"
            }
        ],
        "name": "Administrador",
        "email": "administrador@realidadcreativa.com",
        "password": "$2b$10$34Isq.p.8SpHwFdxFj4Vy.9ZvM0L9EN9H0Z0NEWt3pIZ7AIVPeeei",
        "avatar": "https://",
        "telefono": 4341026429,
        "cedula": "",
        "numinterior": "",
        "numexterior": "",
        "calle": "",
        "colonia": "",
        "municipio": "",
        "estado": "",
        "codigopostal": 0,
        "estatus": 0,
        "certificacion": "",
        "universidad": "",
        "remember_token": false,
        "tratamiento_actual": [],
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "createdAt": "2022-10-26T14:31:35.591Z",
        "updatedAt": "2023-01-26T04:15:04.958Z",
        "__v": 0
    },
    {
        "_id": "635af83e149c455a0eae93e0",
        "rol": "Administrador",
        "horarios": [
            {
                "sucursal": null,
                "horario": "9:00 am - 4:00 pm",
                "_id": "635bf3556c75e15cc214dde6"
            }
        ],
        "medicos_asignados": [],
        "name": "Gildardo",
        "email": "amatias@recreamed.com",
        "password": "$2b$10$GLiOoyLfCqEMzNPTospeVee5r8CXj5EZ3uXFnT43IFR8ofVWG/YEi",
        "avatar": "https://",
        "telefono": 4341026429,
        "cedula": "",
        "numinterior": "",
        "numexterior": "",
        "calle": "",
        "colonia": "",
        "municipio": "",
        "estado": "",
        "codigopostal": 0,
        "estatus": 0,
        "certificacion": "",
        "universidad": "",
        "remember_token": false,
        "tratamiento_actual": [],
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "createdAt": "2022-10-27T21:29:34.117Z",
        "updatedAt": "2022-10-28T15:20:53.690Z",
        "__v": 0
    },
    {
        "_id": "635bf5dd5ac48647d1c415f4",
        "rol": "Administrador",
        "horarios": [
            {
                "sucursal": {
                    "_id": "62e9357f14629809cdfc2c72",
                    "logo": "b05ca96e-f8f5-4f28-8c05-9a0c4d91740b.jpg",
                    "nombre": "CIDERALT"
                },
                "horario": "3:00 pm - 8:00 pm",
                "_id": "635bf5dd5ac48647d1c415f5"
            }
        ],
        "medicos_asignados": [
            {
                "_id": "63311bdb9811c8b706435c2c",
                "horarios": [
                    {
                        "sucursal": "62fc4929c59fcc36f37f54c1",
                        "_id": "6331f6be9811c8b706435d46"
                    },
                    {
                        "sucursal": "62e9357f14629809cdfc2c72",
                        "_id": "6331f6be9811c8b706435d47"
                    }
                ],
                "name": "Tzihueriti Castillo"
            },
            {
                "_id": "63311b999811c8b706435c24",
                "horarios": [
                    {
                        "sucursal": "62fc4929c59fcc36f37f54c1",
                        "_id": "6331f6019811c8b706435d3e"
                    },
                    {
                        "sucursal": "62e9357f14629809cdfc2c72",
                        "_id": "6331f6019811c8b706435d3f"
                    }
                ],
                "name": "David Farias"
            },
            {
                "_id": "62fd911f578d2b4669e0e056",
                "horarios": [
                    {
                        "sucursal": "62fc4929c59fcc36f37f54c1",
                        "horario": "Lunes 16:00 a 20:00 horas",
                        "_id": "62fd911f578d2b4669e0e057"
                    },
                    {
                        "sucursal": "62fc4929c59fcc36f37f54c1",
                        "horario": "Miércoles 16:00 a 20:00 horas",
                        "_id": "62fd9233578d2b4669e0e06e"
                    },
                    {
                        "sucursal": "62fc4929c59fcc36f37f54c1",
                        "horario": "Viernes 16:00 a 20:00 horas",
                        "_id": "62fd9240578d2b4669e0e077"
                    },
                    {
                        "sucursal": "62e9357f14629809cdfc2c72",
                        "_id": "6331fa219811c8b706435d51"
                    }
                ],
                "name": "Misael Tapia Orozco"
            }
        ],
        "name": "Melissa Anton",
        "email": "melissaanton59@gmail.com",
        "password": "$2b$10$i2BSLURoLvUnm6FWbfhTWuWudjwdxatOR.tNpY3qvBW1mx6kll3vG",
        "avatar": "https://",
        "telefono": 4351063115,
        "cedula": "",
        "numinterior": "",
        "numexterior": "",
        "calle": "",
        "colonia": "",
        "municipio": "",
        "estado": "",
        "codigopostal": 0,
        "estatus": 0,
        "certificacion": "",
        "universidad": "",
        "remember_token": false,
        "tratamiento_actual": [],
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "createdAt": "2022-10-28T15:31:41.860Z",
        "updatedAt": "2023-02-20T14:56:16.231Z",
        "__v": 0
    },
    {
        "_id": "636c3fe69a3c0025d9f5c7d9",
        "rol": "Paciente",
        "horarios": [],
        "medicos_asignados": [
            {
                "_id": "63311b999811c8b706435c24",
                "horarios": [
                    {
                        "sucursal": "62fc4929c59fcc36f37f54c1",
                        "_id": "6331f6019811c8b706435d3e"
                    },
                    {
                        "sucursal": "62e9357f14629809cdfc2c72",
                        "_id": "6331f6019811c8b706435d3f"
                    }
                ],
                "name": "David Farias"
            }
        ],
        "name": "Tzihueriti Castillo Correa ",
        "responsable": {
            "nombre": "Tzihueriti castillo ",
            "telefono": 4432369926,
            "_id": "636c3fe69a3c0025d9f5c7da"
        },
        "email": "tzihue1@hotmail.com",
        "password": "$2b$10$lefR5Xz9xLP1N3TzbWgaxOLmja.XwrSjZ5BRYyc2isLC/HstxvZNG",
        "avatar": "noimg.jpg",
        "telefono": 4432369926,
        "cedula": "",
        "numinterior": "",
        "numexterior": "",
        "calle": "",
        "colonia": "",
        "municipio": "Morelia ",
        "estado": "Michoacan",
        "codigopostal": 58220,
        "estatus": 1,
        "certificacion": "",
        "universidad": "",
        "sexo": "H",
        "edad": 38,
        "diagnostico": "A",
        "peso": 70,
        "talla": 65,
        "ocupacion": "Psicólogo ",
        "estado_civil": "CASADO ",
        "escolaridad": "MAESTRIA ",
        "ciudad": "Morelia",
        "lugar_de_nacimiento": "Michoacán",
        "drogas": "Ahora",
        "tratamiento_actual": [],
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "createdAt": "2022-11-10T00:03:50.058Z",
        "updatedAt": "2023-02-08T19:40:07.548Z",
        "__v": 0,
        "configuracion": {
            "_id": "63e3f9eb51a4e3b6714e7978",
            "tratamientos_ofrecidos": []
        }
    },
    {
        "_id": "636ea0359a3c0025d9f5c996",
        "rol": "Administrador",
        "horarios": [
            {
                "sucursal": {
                    "_id": "62e9357f14629809cdfc2c72",
                    "logo": "b05ca96e-f8f5-4f28-8c05-9a0c4d91740b.jpg",
                    "nombre": "CIDERALT"
                },
                "horario": "7:00 am - 4:00 pm",
                "_id": "636ea0359a3c0025d9f5c997"
            }
        ],
        "medicos_asignados": [
            {
                "_id": "63311bdb9811c8b706435c2c",
                "horarios": [
                    {
                        "sucursal": "62fc4929c59fcc36f37f54c1",
                        "_id": "6331f6be9811c8b706435d46"
                    },
                    {
                        "sucursal": "62e9357f14629809cdfc2c72",
                        "_id": "6331f6be9811c8b706435d47"
                    }
                ],
                "name": "Tzihueriti Castillo"
            },
            {
                "_id": "63311b999811c8b706435c24",
                "horarios": [
                    {
                        "sucursal": "62fc4929c59fcc36f37f54c1",
                        "_id": "6331f6019811c8b706435d3e"
                    },
                    {
                        "sucursal": "62e9357f14629809cdfc2c72",
                        "_id": "6331f6019811c8b706435d3f"
                    }
                ],
                "name": "David Farias"
            },
            {
                "_id": "62fd911f578d2b4669e0e056",
                "horarios": [
                    {
                        "sucursal": "62fc4929c59fcc36f37f54c1",
                        "horario": "Lunes 16:00 a 20:00 horas",
                        "_id": "62fd911f578d2b4669e0e057"
                    },
                    {
                        "sucursal": "62fc4929c59fcc36f37f54c1",
                        "horario": "Miércoles 16:00 a 20:00 horas",
                        "_id": "62fd9233578d2b4669e0e06e"
                    },
                    {
                        "sucursal": "62fc4929c59fcc36f37f54c1",
                        "horario": "Viernes 16:00 a 20:00 horas",
                        "_id": "62fd9240578d2b4669e0e077"
                    },
                    {
                        "sucursal": "62e9357f14629809cdfc2c72",
                        "_id": "6331fa219811c8b706435d51"
                    }
                ],
                "name": "Misael Tapia Orozco"
            }
        ],
        "name": "Marisol González Flores",
        "email": "mgcacisme@gmail.com",
        "password": "$2b$10$UBV4sPtG5Qyi5iF5DfVvEecSIvdu8e2W47xRtQoag58sDzV/MWc2y",
        "avatar": "https://",
        "telefono": 4431420218,
        "cedula": "",
        "numinterior": "",
        "numexterior": "",
        "calle": "",
        "colonia": "",
        "municipio": "",
        "estado": "",
        "codigopostal": 0,
        "estatus": 0,
        "certificacion": "",
        "universidad": "",
        "remember_token": false,
        "tratamiento_actual": [],
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "createdAt": "2022-11-11T19:19:17.388Z",
        "updatedAt": "2022-11-11T19:19:17.388Z",
        "__v": 0
    },
    {
        "_id": "638674a6e2c587930958c87c",
        "rol": "Paciente",
        "horarios": [],
        "medicos_asignados": [
            {
                "_id": "63311b999811c8b706435c24",
                "horarios": [
                    {
                        "sucursal": "62fc4929c59fcc36f37f54c1",
                        "_id": "6331f6019811c8b706435d3e"
                    },
                    {
                        "sucursal": "62e9357f14629809cdfc2c72",
                        "_id": "6331f6019811c8b706435d3f"
                    }
                ],
                "name": "David Farias"
            }
        ],
        "name": "Carlos villanueva padilla ",
        "responsable": {
            "nombre": "DAVID ISRAEL ",
            "_id": "638674a6e2c587930958c87d"
        },
        "email": "carlos.ivilla23@gmail.com",
        "password": "$2b$10$tiur2Im1Frsz3mQCswp/AumEZe7/UCRAF.BycZ6REEkN7eoDi6Gxu",
        "avatar": "noimg.jpg",
        "telefono": 4425958736,
        "cedula": "",
        "municipio": "Morelia ",
        "estado": "Michoacan",
        "codigopostal": 58254,
        "estatus": 1,
        "certificacion": "",
        "universidad": "",
        "sexo": "H",
        "edad": 22,
        "peso": 157,
        "talla": 87,
        "ocupacion": "ESTUDIANTE",
        "estado_civil": "Soltero",
        "escolaridad": "Medio Superior",
        "ciudad": "MORELIA",
        "lugar_de_nacimiento": "IRAPUATO ",
        "drogas": "Nunca",
        "tratamiento_actual": [],
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "createdAt": "2022-11-29T21:07:50.535Z",
        "updatedAt": "2022-11-29T21:07:50.535Z",
        "__v": 0
    },
    {
        "_id": "63c56553fa456556a1476b27",
        "rol": "Medico",
        "horarios": [],
        "medicos_asignados": [],
        "name": "Mario Zamudio Vázquez",
        "email": "dr.mariozv.tyo@gmail.com",
        "password": "$2b$10$WOcKfrPf44SzId1cmmPK2.IqUo/1jF/42HMVrG9Da8tql0HNCkRMG",
        "avatar": "ac9a5aec-f4e1-420b-bfa1-2f0daff49e75.png",
        "telefono": 4431615532,
        "estatus": 1,
        "tratamiento_actual": [],
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "createdAt": "2023-01-16T14:55:15.880Z",
        "updatedAt": "2023-01-16T14:56:31.906Z",
        "__v": 0
    },
    {
        "_id": "63cf030d260a399f72f7a36d",
        "rol": "Paciente",
        "horarios": [],
        "medicos_asignados": [
            {
                "_id": "63311b999811c8b706435c24",
                "horarios": [
                    {
                        "sucursal": "62fc4929c59fcc36f37f54c1",
                        "_id": "6331f6019811c8b706435d3e"
                    },
                    {
                        "sucursal": "62e9357f14629809cdfc2c72",
                        "_id": "6331f6019811c8b706435d3f"
                    }
                ],
                "name": "David Farias"
            }
        ],
        "name": "Christian gustavo hurtado Martínez ",
        "responsable": {
            "_id": "63cf030d260a399f72f7a36e"
        },
        "email": "christianpsic_hurtado@hotmail.com",
        "password": "$2b$10$FZHCrSpesCybXFzNIVYo.Ox6CN/XLgVXGb/8bWBwAPkH8tbXvB3Xe",
        "avatar": "noimg.jpg",
        "telefono": 4431686663,
        "cedula": "",
        "estatus": 1,
        "certificacion": "",
        "universidad": "",
        "tratamiento_actual": [],
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "createdAt": "2023-01-23T21:58:37.063Z",
        "updatedAt": "2023-01-23T21:58:37.063Z",
        "__v": 0
    },
    {
        "_id": "63cf0434260a399f72f7a387",
        "rol": "Paciente",
        "horarios": [],
        "medicos_asignados": [
            {
                "_id": "63311b999811c8b706435c24",
                "horarios": [
                    {
                        "sucursal": "62fc4929c59fcc36f37f54c1",
                        "_id": "6331f6019811c8b706435d3e"
                    },
                    {
                        "sucursal": "62e9357f14629809cdfc2c72",
                        "_id": "6331f6019811c8b706435d3f"
                    }
                ],
                "name": "David Farias"
            }
        ],
        "name": "Afrodita medina gonzalez ",
        "responsable": {
            "_id": "63cf0434260a399f72f7a388"
        },
        "email": "afromdn1914@gmail.com",
        "password": "$2b$10$B5H99vUzInUzTqBbfzUJa.6lkPPNwAXAqqsoYQZLLgLRwdiiaTLD2",
        "avatar": "noimg.jpg",
        "telefono": 4433642586,
        "cedula": "",
        "estatus": 1,
        "certificacion": "",
        "universidad": "",
        "tratamiento_actual": [],
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "createdAt": "2023-01-23T22:03:32.167Z",
        "updatedAt": "2023-02-08T19:42:23.503Z",
        "__v": 0
    },
    {
        "_id": "63cf04f9260a399f72f7a3c5",
        "rol": "Paciente",
        "horarios": [],
        "medicos_asignados": [
            {
                "_id": "63311b999811c8b706435c24",
                "horarios": [
                    {
                        "sucursal": "62fc4929c59fcc36f37f54c1",
                        "_id": "6331f6019811c8b706435d3e"
                    },
                    {
                        "sucursal": "62e9357f14629809cdfc2c72",
                        "_id": "6331f6019811c8b706435d3f"
                    }
                ],
                "name": "David Farias"
            }
        ],
        "name": " Rosalba Rocha Rocha",
        "responsable": {
            "_id": "63cf04f9260a399f72f7a3c6"
        },
        "email": "mantis.catalan@gmail.com",
        "password": "$2b$10$npsV8MViyjUxbBr0WCyjcejkhPjQannKmURfrjre0sx/s0uHNONae",
        "avatar": "noimg.jpg",
        "telefono": 4433487113,
        "cedula": "",
        "estatus": 1,
        "certificacion": "",
        "universidad": "",
        "tratamiento_actual": [],
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "createdAt": "2023-01-23T22:06:49.018Z",
        "updatedAt": "2023-02-02T01:06:18.350Z",
        "__v": 0
    },
    {
        "_id": "63db0d6e1a315335987cf3fa",
        "rol": "Paciente",
        "horarios": [],
        "medicos_asignados": [
            {
                "_id": "63311b999811c8b706435c24",
                "horarios": [
                    {
                        "sucursal": "62fc4929c59fcc36f37f54c1",
                        "_id": "6331f6019811c8b706435d3e"
                    },
                    {
                        "sucursal": "62e9357f14629809cdfc2c72",
                        "_id": "6331f6019811c8b706435d3f"
                    }
                ],
                "name": "David Farias"
            }
        ],
        "name": "Astrid Juarez",
        "responsable": {
            "_id": "63db0d6e1a315335987cf3fb"
        },
        "email": "juarezlopezastrid@gmail.com",
        "password": "$2b$10$SAH2pFzjriUIuP68.o1fVOYqQOcjpzYwsmk0wpRntxyb4GIvnh.32",
        "avatar": "noimg.jpg",
        "telefono": 4431882851,
        "cedula": "",
        "estatus": 1,
        "certificacion": "",
        "universidad": "",
        "tratamiento_actual": [],
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "createdAt": "2023-02-02T01:10:06.624Z",
        "updatedAt": "2023-02-02T01:10:06.624Z",
        "__v": 0
    },
    {
        "_id": "63db352a1a315335987cf4b0",
        "rol": "Paciente",
        "horarios": [],
        "medicos_asignados": [
            {
                "_id": "6304fa3cd1624dcf3fff4912",
                "horarios": [
                    {
                        "sucursal": "625705929a6437369f835bc7",
                        "horario": "",
                        "_id": "6304fa3cd1624dcf3fff4913"
                    }
                ],
                "name": "Gildardo 2"
            }
        ],
        "name": "Camila Flor",
        "responsable": {
            "_id": "63db352a1a315335987cf4b1"
        },
        "email": "camilaflor@realidadcreativa.com",
        "password": "$2b$10$WFJdbYPdn8LJEIdvDu1VSOk7tUnRuPcHloou1E7h0WWs9H0bco9sK",
        "avatar": "1971572b-3f76-4da3-8226-3105e9c22b8a.webp",
        "telefono": 1234568790,
        "cedula": "",
        "estatus": 1,
        "certificacion": "",
        "universidad": "",
        "tratamiento_actual": [],
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "createdAt": "2023-02-02T03:59:38.316Z",
        "updatedAt": "2023-02-02T03:59:38.316Z",
        "__v": 0
    },
    {
        "_id": "63e67cee51a4e3b6714e7eef",
        "rol": "Recepcion",
        "horarios": [
            {
                "sucursal": {
                    "_id": "62e9357f14629809cdfc2c72",
                    "logo": "b05ca96e-f8f5-4f28-8c05-9a0c4d91740b.jpg",
                    "nombre": "CIDERALT"
                },
                "horario": "16:00 a 20:00 horas",
                "_id": "63e67cee51a4e3b6714e7ef0"
            }
        ],
        "medicos_asignados": [],
        "name": "Salvador Tinoco Lucas",
        "email": "salvadortinolucas@outlook.com",
        "password": "$2b$10$uzADN53aZZl9vcVOuyBi.uRIKlKqpNtY22mSFRq9srQDyxm2F4F.6",
        "avatar": "https://",
        "telefono": 4432357505,
        "estatus": 1,
        "tratamiento_actual": [],
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "createdAt": "2023-02-10T17:20:46.839Z",
        "updatedAt": "2023-02-10T20:33:49.811Z",
        "__v": 0
    },
    {
        "_id": "63f7d1703893a1af317c0f74",
        "rol": "Paciente",
        "horarios": [],
        "medicos_asignados": [
            {
                "_id": "6304fa3cd1624dcf3fff4912",
                "horarios": [
                    {
                        "sucursal": "625705929a6437369f835bc7",
                        "horario": "",
                        "_id": "6304fa3cd1624dcf3fff4913"
                    }
                ],
                "name": "Gildardo 2"
            }
        ],
        "name": "Emilia Diaz",
        "responsable": {
            "_id": "63f7d1703893a1af317c0f75"
        },
        "email": "ami.diaz@eudoramail.com",
        "password": "$2b$10$S5Lh90crn5OP83kIwFt8c.kSk..nhIg7QsfjpIUuuLud4akqAxRhm",
        "avatar": "noimg.jpg",
        "telefono": 4432356773,
        "cedula": "",
        "estatus": 1,
        "certificacion": "",
        "universidad": "",
        "tratamiento_actual": [],
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "createdAt": "2023-02-23T20:49:52.673Z",
        "updatedAt": "2023-02-23T20:49:52.673Z",
        "__v": 0
    },
    {
        "_id": "63f80b9e3893a1af317c11ad",
        "rol": "Paciente",
        "horarios": [],
        "medicos_asignados": [
            {
                "_id": "6304fa3cd1624dcf3fff4912",
                "horarios": [
                    {
                        "sucursal": "625705929a6437369f835bc7",
                        "horario": "",
                        "_id": "6304fa3cd1624dcf3fff4913"
                    }
                ],
                "name": "Gildardo 2"
            }
        ],
        "name": "Angel Gildardo",
        "responsable": {
            "_id": "63f80b9e3893a1af317c11ae"
        },
        "email": "gildardo3@gmail.com",
        "password": "$2b$10$0ZPI/3PmZxyHxaALbJLVoO2XTJeDbeo9zGY9fkz6ORuZg1j0QRKIW",
        "avatar": "noimg.jpg",
        "telefono": 1234567890,
        "cedula": "",
        "estatus": 1,
        "certificacion": "",
        "universidad": "",
        "tratamiento_actual": [],
        "enfermedades_familiares": [],
        "enfermedades_medicas": [],
        "createdAt": "2023-02-24T00:58:06.810Z",
        "updatedAt": "2023-02-24T00:58:06.810Z",
        "__v": 0
    }
]


getData('users').then((rs) => {
    rs.forEach(e => {
        console.log(`${e.name} - ${e.avatar}`)
    });
})
console.log('done :)')