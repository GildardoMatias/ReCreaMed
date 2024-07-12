const fs = require('fs');
const { Parser } = require('json2csv');

const objects = [
    {
        "_id": "65d781ddf9e7953007713c1f",
        "usuario": {
            "_id": "65bbf1adf104743ebf0d1393",
            "name": "VERONICA ZARAGOZA CAMPUZANO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-01T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3600 - Ketamina con Terapia",
        "id_servicio": "6554e6d1d0c21c88d7160a60",
        "comentarios": "SALA 2 DOSIS 6",
        "createdAt": "2024-02-22T17:18:21.597Z",
        "updatedAt": "2024-02-22T17:18:21.597Z",
        "__v": 0
    },
    {
        "_id": "65d8ba8cab7cec68159d1f54",
        "usuario": {
            "_id": "64014da3799c5d19e0489d9e",
            "name": "CLAUDIA RANGEL SOTO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-01T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-02-23T15:32:28.840Z",
        "updatedAt": "2024-02-23T15:32:28.840Z",
        "__v": 0
    },
    {
        "_id": "65dce565aa4aa5f9e9f4a3a3",
        "usuario": {
            "_id": "64ee812034b0c38a180238ad",
            "name": "Esperanza Lievanos"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-01T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-02-26T19:24:21.421Z",
        "updatedAt": "2024-02-26T19:24:21.421Z",
        "__v": 0
    },
    {
        "_id": "65df47aef7793b5e1a6077bb",
        "usuario": {
            "_id": "6421da37dd7d2c4aea809149",
            "name": "WILLIAM HITT"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "6421d561dd7d2c4aea808e10",
            "name": "Guadalupe Zamudio Hernández"
        },
        "fecha_hora": "2024-03-05T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Consulta Adicciones - $600 - ",
        "id_servicio": "653172ca83776ca8ad729879",
        "comentarios": "SALA 2",
        "createdAt": "2024-02-28T14:48:14.925Z",
        "updatedAt": "2024-02-28T14:48:14.925Z",
        "__v": 0
    },
    {
        "_id": "65df6261f7793b5e1a6080fa",
        "usuario": {
            "_id": "65df6237f7793b5e1a608051",
            "name": "MARIA ROSAS HERNANDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-02T15:00:00.000Z",
        "duracion": 90,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-02-28T16:42:09.458Z",
        "updatedAt": "2024-02-29T16:19:49.208Z",
        "__v": 0
    },
    {
        "_id": "65df7256f7793b5e1a60810a",
        "usuario": {
            "_id": "64ee812034b0c38a180238ad",
            "name": "Esperanza Lievanos"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-02T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-02-28T17:50:14.947Z",
        "updatedAt": "2024-02-28T17:50:14.947Z",
        "__v": 0
    },
    {
        "_id": "65dfc440f7793b5e1a6085cf",
        "usuario": {
            "_id": "6553e10eb842eca931e77c32",
            "name": "DIEGO ANTONIO GUTIERREZ VEGA "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-06T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-02-28T23:39:44.413Z",
        "updatedAt": "2024-02-28T23:39:44.413Z",
        "__v": 0
    },
    {
        "_id": "65e0ae8ebba8ca8c2a9e3096",
        "usuario": {
            "_id": "65e0ae67bba8ca8c2a9e2fef",
            "name": "KEVIN JAHIR CORTES JAIMES"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-02T15:00:00.000Z",
        "duracion": 90,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-02-29T16:19:26.479Z",
        "updatedAt": "2024-02-29T16:19:55.869Z",
        "__v": 0
    },
    {
        "_id": "65e0af65bba8ca8c2a9e30b0",
        "usuario": {
            "_id": "642627edfd79d28f49d63189",
            "name": "ALEJANDRINA GONZALEZ GAYTAN"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-01T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-02-29T16:23:01.546Z",
        "updatedAt": "2024-02-29T16:23:01.546Z",
        "__v": 0
    },
    {
        "_id": "65e0afa3bba8ca8c2a9e30b8",
        "usuario": {
            "_id": "65e0ae67bba8ca8c2a9e2fef",
            "name": "KEVIN JAHIR CORTES JAIMES"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-07T00:00:00.000Z",
        "duracion": 90,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-02-29T16:24:03.287Z",
        "updatedAt": "2024-02-29T16:24:03.287Z",
        "__v": 0
    },
    {
        "_id": "65e10b62bba8ca8c2a9e37da",
        "usuario": {
            "_id": "65e109dbbba8ca8c2a9e370c",
            "name": "KAREN ANGEL RUIZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-01T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-02-29T22:55:30.458Z",
        "updatedAt": "2024-02-29T22:55:30.458Z",
        "__v": 0
    },
    {
        "_id": "65e2122613d255e0e9ff406f",
        "usuario": {
            "_id": "65bbf1adf104743ebf0d1393",
            "name": "VERONICA ZARAGOZA CAMPUZANO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-19T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3600 - Ketamina con Terapia",
        "id_servicio": "6554e6d1d0c21c88d7160a60",
        "comentarios": "SALA 2 DOSIS 7 CON TERAPIA ",
        "createdAt": "2024-03-01T17:36:38.889Z",
        "updatedAt": "2024-03-16T15:01:55.099Z",
        "__v": 0
    },
    {
        "_id": "65e2242313d255e0e9ff4538",
        "usuario": {
            "_id": "65df6237f7793b5e1a608051",
            "name": "MARIA ROSAS HERNANDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-04T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-03-01T18:53:23.923Z",
        "updatedAt": "2024-03-01T18:53:23.923Z",
        "__v": 0
    },
    {
        "_id": "65e351f4164f5d150a9b9de5",
        "usuario": {
            "_id": "65d4fbf20e039dfd91a4febe",
            "name": "XIMENA ESPERANZA RESENDIZ OLASCOAGUA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-05T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 4",
        "createdAt": "2024-03-02T16:21:08.720Z",
        "updatedAt": "2024-03-02T16:21:08.720Z",
        "__v": 0
    },
    {
        "_id": "65e6001180e568bf5aff3b02",
        "usuario": {
            "_id": "65677f6769730be2742b1623",
            "name": "JULIO ONOFRE QUIÑONES CAMPOS "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-05T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "KETA REFUERZO SALA 2",
        "createdAt": "2024-03-04T17:08:33.223Z",
        "updatedAt": "2024-03-04T17:10:14.148Z",
        "__v": 0
    },
    {
        "_id": "65e61a6580e568bf5aff3d4b",
        "usuario": {
            "_id": "65e109dbbba8ca8c2a9e370c",
            "name": "KAREN ANGEL RUIZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-05T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA WILLIAM HITT DOSIS 2",
        "createdAt": "2024-03-04T19:00:53.506Z",
        "updatedAt": "2024-03-04T19:00:53.506Z",
        "__v": 0
    },
    {
        "_id": "65e674ec80e568bf5aff4303",
        "usuario": {
            "_id": "65e109dbbba8ca8c2a9e370c",
            "name": "KAREN ANGEL RUIZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-08T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 3",
        "createdAt": "2024-03-05T01:27:08.732Z",
        "updatedAt": "2024-03-08T15:21:50.633Z",
        "__v": 0
    },
    {
        "_id": "65e73feb54f4a5aa7f84fc1e",
        "usuario": {
            "_id": "646284b8b555e198f5a5efcc",
            "name": "MARIA GUADALUPE RUIZ ALANIS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-11T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-03-05T15:53:15.198Z",
        "updatedAt": "2024-03-05T15:53:15.198Z",
        "__v": 0
    },
    {
        "_id": "65e795ff54f4a5aa7f850ca9",
        "usuario": {
            "_id": "6424e95f96ee3c69af13facd",
            "name": "ORLANDO HERNANDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-07T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-03-05T22:00:31.658Z",
        "updatedAt": "2024-03-05T22:00:31.658Z",
        "__v": 0
    },
    {
        "_id": "65e8bbdc05fbd2ea530586b9",
        "usuario": {
            "_id": "65d4fbf20e039dfd91a4febe",
            "name": "XIMENA ESPERANZA RESENDIZ OLASCOAGUA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-08T01:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 5+ TERAPIA",
        "createdAt": "2024-03-06T18:54:20.491Z",
        "updatedAt": "2024-03-06T18:54:30.263Z",
        "__v": 0
    },
    {
        "_id": "65e900b705fbd2ea53058966",
        "usuario": {
            "_id": "6553e10eb842eca931e77c32",
            "name": "DIEGO ANTONIO GUTIERREZ VEGA "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-12T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-03-06T23:48:07.946Z",
        "updatedAt": "2024-03-11T23:03:36.790Z",
        "__v": 0
    },
    {
        "_id": "65e900db05fbd2ea53058973",
        "usuario": {
            "_id": "6553e10eb842eca931e77c32",
            "name": "DIEGO ANTONIO GUTIERREZ VEGA "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-15T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-03-06T23:48:43.067Z",
        "updatedAt": "2024-03-14T21:02:30.405Z",
        "__v": 0
    },
    {
        "_id": "65e9052205fbd2ea530589db",
        "usuario": {
            "_id": "65e0ae67bba8ca8c2a9e2fef",
            "name": "KEVIN JAHIR CORTES JAIMES"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-09T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 3",
        "createdAt": "2024-03-07T00:06:58.748Z",
        "updatedAt": "2024-03-07T00:06:58.748Z",
        "__v": 0
    },
    {
        "_id": "65e9056205fbd2ea530589e3",
        "usuario": {
            "_id": "65e0ae67bba8ca8c2a9e2fef",
            "name": "KEVIN JAHIR CORTES JAIMES"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-14T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 4",
        "createdAt": "2024-03-07T00:08:02.119Z",
        "updatedAt": "2024-03-07T00:08:02.119Z",
        "__v": 0
    },
    {
        "_id": "65e9eb7ac5452a5c46fd8370",
        "usuario": {
            "_id": "65e9eb45c5452a5c46fd82c9",
            "name": "ALEJANDRO NATANAEL  REYES SOSA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-07T16:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-03-07T16:29:46.151Z",
        "updatedAt": "2024-03-07T16:29:46.151Z",
        "__v": 0
    },
    {
        "_id": "65e9fa08c5452a5c46fd846f",
        "usuario": {
            "_id": "65316db183776ca8ad729435",
            "name": "ALAN JASSIEL RODRIGUEZ LUNA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-07T23:30:00.000Z",
        "duracion": 90,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 5",
        "createdAt": "2024-03-07T17:31:52.075Z",
        "updatedAt": "2024-03-07T17:31:52.075Z",
        "__v": 0
    },
    {
        "_id": "65e9fd7ec5452a5c46fd8477",
        "usuario": {
            "_id": "65e9eb45c5452a5c46fd82c9",
            "name": "ALEJANDRO NATANAEL  REYES SOSA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-11T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-03-07T17:46:38.653Z",
        "updatedAt": "2024-03-07T17:46:38.653Z",
        "__v": 0
    },
    {
        "_id": "65e9fe27c5452a5c46fd867f",
        "usuario": {
            "_id": "65e9fe02c5452a5c46fd85d8",
            "name": "APOLINAR IBARRA GONZALEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-11T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "SALA 1 EMT PRIMERA VEZ",
        "createdAt": "2024-03-07T17:49:27.084Z",
        "updatedAt": "2024-03-07T19:54:11.612Z",
        "__v": 0
    },
    {
        "_id": "65ef5ec0004633050be5533e",
        "usuario": {
            "_id": "65e9fe02c5452a5c46fd85d8",
            "name": "APOLINAR IBARRA GONZALEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-12T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-03-11T19:42:56.107Z",
        "updatedAt": "2024-03-11T19:42:56.107Z",
        "__v": 0
    },
    {
        "_id": "65ef8786004633050be554e9",
        "usuario": {
            "_id": "646284b8b555e198f5a5efcc",
            "name": "MARIA GUADALUPE RUIZ ALANIS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-13T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-03-11T22:36:54.891Z",
        "updatedAt": "2024-03-11T22:36:54.891Z",
        "__v": 0
    },
    {
        "_id": "65f0766fb4d02889887d82f5",
        "usuario": {
            "_id": "645bd353b555e198f5a597d9",
            "name": "MARIANA VARGAS GUTIERREZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311bdb9811c8b706435c2c",
            "name": "Tzihueriti Castillo"
        },
        "fecha_hora": "2024-03-12T20:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531727583776ca8ad729758",
        "comentarios": "SALA 2 TERAPIA PSI",
        "createdAt": "2024-03-12T15:36:15.757Z",
        "updatedAt": "2024-03-12T15:36:15.757Z",
        "__v": 0
    },
    {
        "_id": "65f07692b4d02889887d82fd",
        "usuario": {
            "_id": "64ee80ee34b0c38a18023847",
            "name": "ADRIANA HERNANDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-12T20:30:00.000Z",
        "duracion": 120,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "SALA AUDIOVISUAL (ESTUDIO)",
        "createdAt": "2024-03-12T15:36:50.410Z",
        "updatedAt": "2024-03-12T15:36:50.410Z",
        "__v": 0
    },
    {
        "_id": "65f1e63dc3ba47cc12f4c443",
        "usuario": {
            "_id": "65d408ddc46c27ab949492ec",
            "name": "XIMENA RESENDIZ OLASCOAGA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-15T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3600 - Ketamina con Terapia",
        "id_servicio": "6554e6d1d0c21c88d7160a60",
        "comentarios": "SALA 2 +TERAPIA",
        "createdAt": "2024-03-13T17:45:33.636Z",
        "updatedAt": "2024-03-14T23:46:41.434Z",
        "__v": 0
    },
    {
        "_id": "65f1ea07c3ba47cc12f4c677",
        "usuario": {
            "_id": "65e109dbbba8ca8c2a9e370c",
            "name": "KAREN ANGEL RUIZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-15T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 4",
        "createdAt": "2024-03-13T18:01:43.449Z",
        "updatedAt": "2024-03-13T18:01:43.449Z",
        "__v": 0
    },
    {
        "_id": "65f225e0c3ba47cc12f4c76f",
        "usuario": {
            "_id": "646284b8b555e198f5a5efcc",
            "name": "MARIA GUADALUPE RUIZ ALANIS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-15T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-03-13T22:17:04.560Z",
        "updatedAt": "2024-03-13T22:17:04.560Z",
        "__v": 0
    },
    {
        "_id": "65f22f77c3ba47cc12f4c7b4",
        "usuario": {
            "_id": "64014da3799c5d19e0489d9e",
            "name": "CLAUDIA RANGEL SOTO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-15T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-03-13T22:57:59.101Z",
        "updatedAt": "2024-03-13T22:57:59.101Z",
        "__v": 0
    },
    {
        "_id": "65f22fb8c3ba47cc12f4c7bc",
        "usuario": {
            "_id": "65b7f59565958be2a4818db6",
            "name": "CLAUDIA MALDONADO ELIZALDE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-15T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-03-13T22:59:04.117Z",
        "updatedAt": "2024-03-13T22:59:04.117Z",
        "__v": 0
    },
    {
        "_id": "65f38c7319acae9091767d1b",
        "usuario": {
            "_id": "64272993fd79d28f49d63675",
            "name": "VANESSA IVONNE RODRIGUEZ ROSAS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-15T01:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 REF",
        "createdAt": "2024-03-14T23:46:59.674Z",
        "updatedAt": "2024-03-14T23:46:59.674Z",
        "__v": 0
    },
    {
        "_id": "65f456804c1bbc6c28337e4b",
        "usuario": {
            "_id": "65662866a3808cd753824c08",
            "name": "MARIA JOSE SALDAÑA GIL"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-15T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-03-15T14:09:04.818Z",
        "updatedAt": "2024-03-15T14:09:04.818Z",
        "__v": 0
    },
    {
        "_id": "65f463444c1bbc6c2833811c",
        "usuario": {
            "_id": "65f4632a4c1bbc6c28338073",
            "name": "CARLOS ALBERTO BRAVO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-15T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-03-15T15:03:32.114Z",
        "updatedAt": "2024-03-15T15:03:32.114Z",
        "__v": 0
    },
    {
        "_id": "65f463534c1bbc6c28338124",
        "usuario": {
            "_id": "65f4632a4c1bbc6c28338073",
            "name": "CARLOS ALBERTO BRAVO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-14T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-03-15T15:03:47.106Z",
        "updatedAt": "2024-03-15T15:03:47.106Z",
        "__v": 0
    },
    {
        "_id": "65f463614c1bbc6c2833812c",
        "usuario": {
            "_id": "65f4632a4c1bbc6c28338073",
            "name": "CARLOS ALBERTO BRAVO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-12T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-03-15T15:04:01.455Z",
        "updatedAt": "2024-03-15T15:04:01.455Z",
        "__v": 0
    },
    {
        "_id": "65f479534c1bbc6c283382b0",
        "usuario": {
            "_id": "64014da3799c5d19e0489d9e",
            "name": "CLAUDIA RANGEL SOTO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-16T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-03-15T16:37:39.724Z",
        "updatedAt": "2024-03-15T16:37:39.724Z",
        "__v": 0
    },
    {
        "_id": "65f4c8c24c1bbc6c28338313",
        "usuario": {
            "_id": "65f4632a4c1bbc6c28338073",
            "name": "CARLOS ALBERTO BRAVO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-16T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-15T22:16:34.358Z",
        "updatedAt": "2024-03-15T22:16:34.358Z",
        "__v": 0
    },
    {
        "_id": "65f4cb3f4c1bbc6c2833831b",
        "usuario": {
            "_id": "646284b8b555e198f5a5efcc",
            "name": "MARIA GUADALUPE RUIZ ALANIS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-19T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-15T22:27:11.732Z",
        "updatedAt": "2024-03-15T22:27:11.732Z",
        "__v": 0
    },
    {
        "_id": "65f5b4f85024349c29c8880a",
        "usuario": {
            "_id": "65e0ae67bba8ca8c2a9e2fef",
            "name": "KEVIN JAHIR CORTES JAIMES"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-16T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 5",
        "createdAt": "2024-03-16T15:04:24.345Z",
        "updatedAt": "2024-03-16T15:04:24.345Z",
        "__v": 0
    },
    {
        "_id": "65f5c75d5024349c29c88a09",
        "usuario": {
            "_id": "65e0ae67bba8ca8c2a9e2fef",
            "name": "KEVIN JAHIR CORTES JAIMES"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-21T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 6",
        "createdAt": "2024-03-16T16:22:53.890Z",
        "updatedAt": "2024-03-16T16:22:53.890Z",
        "__v": 0
    },
    {
        "_id": "65f5cbe85024349c29c88aa8",
        "usuario": {
            "_id": "65f4632a4c1bbc6c28338073",
            "name": "CARLOS ALBERTO BRAVO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-19T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-16T16:42:16.403Z",
        "updatedAt": "2024-03-16T16:42:16.403Z",
        "__v": 0
    },
    {
        "_id": "65f5cc0b5024349c29c88ab0",
        "usuario": {
            "_id": "64014da3799c5d19e0489d9e",
            "name": "CLAUDIA RANGEL SOTO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-19T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-16T16:42:51.281Z",
        "updatedAt": "2024-03-16T16:42:51.281Z",
        "__v": 0
    },
    {
        "_id": "65f9bf4072f754a529ec01cc",
        "usuario": {
            "_id": "65d408ddc46c27ab949492ec",
            "name": "XIMENA RESENDIZ OLASCOAGA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-20T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALLA 2 DOSIS 7",
        "createdAt": "2024-03-19T16:37:20.159Z",
        "updatedAt": "2024-03-19T16:37:20.159Z",
        "__v": 0
    },
    {
        "_id": "65f9c30172f754a529ec01d4",
        "usuario": {
            "_id": "64014da3799c5d19e0489d9e",
            "name": "CLAUDIA RANGEL SOTO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-21T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-03-19T16:53:21.014Z",
        "updatedAt": "2024-03-19T16:53:21.014Z",
        "__v": 0
    },
    {
        "_id": "65f9c34a72f754a529ec02be",
        "usuario": {
            "_id": "641500a9799c5d19e048ecfb",
            "name": "FRANCISCO BOLAÑOS CARMONA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-19T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-03-19T16:54:35.002Z",
        "updatedAt": "2024-03-19T16:54:35.002Z",
        "__v": 0
    },
    {
        "_id": "65f9c36d72f754a529ec02c6",
        "usuario": {
            "_id": "641500a9799c5d19e048ecfb",
            "name": "FRANCISCO BOLAÑOS CARMONA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-18T17:00:00.000Z",
        "duracion": 180,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-03-19T16:55:09.372Z",
        "updatedAt": "2024-03-19T16:55:09.372Z",
        "__v": 0
    },
    {
        "_id": "65f9cc3d72f754a529ec0469",
        "usuario": {
            "_id": "654c051e0a58d870c8efabdb",
            "name": "VERONICA ZARAGOZA CAMPUZANO "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-02T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3600 - Ketamina con Terapia",
        "id_servicio": "6554e6d1d0c21c88d7160a60",
        "comentarios": "SALA WILLIAM HITT DOSIS 8 +TER CON TIZIHUE ",
        "createdAt": "2024-03-19T17:32:45.281Z",
        "updatedAt": "2024-04-01T19:53:27.846Z",
        "__v": 0
    },
    {
        "_id": "65f9ed5b72f754a529ec0a5d",
        "usuario": {
            "_id": "6553e10eb842eca931e77c32",
            "name": "DIEGO ANTONIO GUTIERREZ VEGA "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-19T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-03-19T19:54:03.379Z",
        "updatedAt": "2024-03-19T19:54:03.379Z",
        "__v": 0
    },
    {
        "_id": "65f9f1ba72f754a529ec0bcf",
        "usuario": {
            "_id": "65f9f19f72f754a529ec0aef",
            "name": "MARIA DE LOS ANGELES GONZALEZ HERRERA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-25T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "PX NUEVA EMT",
        "createdAt": "2024-03-19T20:12:42.276Z",
        "updatedAt": "2024-03-19T20:12:42.276Z",
        "__v": 0
    },
    {
        "_id": "65fa135b72f754a529ec0dc7",
        "usuario": {
            "_id": "646284b8b555e198f5a5efcc",
            "name": "MARIA GUADALUPE RUIZ ALANIS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-21T23:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-03-19T22:36:11.144Z",
        "updatedAt": "2024-03-20T21:21:52.858Z",
        "__v": 0
    },
    {
        "_id": "65fa136d72f754a529ec0dcf",
        "usuario": {
            "_id": "646284b8b555e198f5a5efcc",
            "name": "MARIA GUADALUPE RUIZ ALANIS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-22T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-03-19T22:36:29.794Z",
        "updatedAt": "2024-03-19T22:36:29.794Z",
        "__v": 0
    },
    {
        "_id": "65fa138672f754a529ec0dee",
        "usuario": {
            "_id": "65f4632a4c1bbc6c28338073",
            "name": "CARLOS ALBERTO BRAVO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-20T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-03-19T22:36:54.169Z",
        "updatedAt": "2024-03-20T15:25:10.405Z",
        "__v": 0
    },
    {
        "_id": "65fa139c72f754a529ec0df6",
        "usuario": {
            "_id": "641500a9799c5d19e048ecfb",
            "name": "FRANCISCO BOLAÑOS CARMONA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-20T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-03-19T22:37:16.223Z",
        "updatedAt": "2024-03-19T22:37:16.223Z",
        "__v": 0
    },
    {
        "_id": "65fa1cd072f754a529ec0ebe",
        "usuario": {
            "_id": "6553e10eb842eca931e77c32",
            "name": "DIEGO ANTONIO GUTIERREZ VEGA "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-22T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-03-19T23:16:32.613Z",
        "updatedAt": "2024-03-21T19:27:46.065Z",
        "__v": 0
    },
    {
        "_id": "65fa254772f754a529ec0ec8",
        "usuario": {
            "_id": "65e0ae67bba8ca8c2a9e2fef",
            "name": "KEVIN JAHIR CORTES JAIMES"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-23T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 7",
        "createdAt": "2024-03-19T23:52:39.990Z",
        "updatedAt": "2024-03-19T23:52:48.250Z",
        "__v": 0
    },
    {
        "_id": "65faffb5ce234b36b9df56ff",
        "usuario": {
            "_id": "65f4632a4c1bbc6c28338073",
            "name": "CARLOS ALBERTO BRAVO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-21T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-20T15:24:37.293Z",
        "updatedAt": "2024-03-20T15:24:37.293Z",
        "__v": 0
    },
    {
        "_id": "65fafff0ce234b36b9df570c",
        "usuario": {
            "_id": "641500a9799c5d19e048ecfb",
            "name": "FRANCISCO BOLAÑOS CARMONA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-21T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-20T15:25:36.363Z",
        "updatedAt": "2024-03-20T15:25:36.363Z",
        "__v": 0
    },
    {
        "_id": "65fb5e7b3ce837e978e14943",
        "usuario": {
            "_id": "65fb5e113ce837e978e1489a",
            "name": "PERLA IVETT ARIZMENDI HERNÁNDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-11T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-03-20T22:08:59.353Z",
        "updatedAt": "2024-03-21T19:24:00.526Z",
        "__v": 0
    },
    {
        "_id": "65fc511cf00a2deb72b73145",
        "usuario": {
            "_id": "65f4632a4c1bbc6c28338073",
            "name": "CARLOS ALBERTO BRAVO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-22T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-21T15:24:12.923Z",
        "updatedAt": "2024-03-21T15:24:12.923Z",
        "__v": 0
    },
    {
        "_id": "65fc513df00a2deb72b7314d",
        "usuario": {
            "_id": "641500a9799c5d19e048ecfb",
            "name": "FRANCISCO BOLAÑOS CARMONA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-22T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-21T15:24:45.942Z",
        "updatedAt": "2024-03-21T15:24:45.942Z",
        "__v": 0
    },
    {
        "_id": "65fc5158f00a2deb72b73155",
        "usuario": {
            "_id": "65f4632a4c1bbc6c28338073",
            "name": "CARLOS ALBERTO BRAVO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-23T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-21T15:25:12.140Z",
        "updatedAt": "2024-03-21T15:25:12.140Z",
        "__v": 0
    },
    {
        "_id": "65fc5173f00a2deb72b7315d",
        "usuario": {
            "_id": "641500a9799c5d19e048ecfb",
            "name": "FRANCISCO BOLAÑOS CARMONA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-23T16:00:00.000Z",
        "duracion": 120,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-21T15:25:39.185Z",
        "updatedAt": "2024-03-21T17:32:43.711Z",
        "__v": 0
    },
    {
        "_id": "65fc6f1ef00a2deb72b73241",
        "usuario": {
            "_id": "64014da3799c5d19e0489d9e",
            "name": "CLAUDIA RANGEL SOTO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-23T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-21T17:32:14.985Z",
        "updatedAt": "2024-03-21T17:32:14.985Z",
        "__v": 0
    },
    {
        "_id": "65fcc5c5f00a2deb72b73384",
        "usuario": {
            "_id": "646284b8b555e198f5a5efcc",
            "name": "MARIA GUADALUPE RUIZ ALANIS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-25T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-03-21T23:41:57.906Z",
        "updatedAt": "2024-03-21T23:41:57.906Z",
        "__v": 0
    },
    {
        "_id": "65feea8fd6deffd831da0937",
        "usuario": {
            "_id": "64e9469d93005e8568759013",
            "name": "Alvaro Medina Chavez"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-23T15:00:00.000Z",
        "duracion": 90,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-03-23T14:43:27.392Z",
        "updatedAt": "2024-03-23T14:43:27.392Z",
        "__v": 0
    },
    {
        "_id": "65ff0828d6deffd831da0ace",
        "usuario": {
            "_id": "65e0ae67bba8ca8c2a9e2fef",
            "name": "KEVIN JAHIR CORTES JAIMES"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-28T00:00:00.000Z",
        "duracion": 90,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 8",
        "createdAt": "2024-03-23T16:49:44.412Z",
        "updatedAt": "2024-03-23T16:49:44.412Z",
        "__v": 0
    },
    {
        "_id": "65ff0bead6deffd831da0b9b",
        "usuario": {
            "_id": "64e9469d93005e8568759013",
            "name": "Alvaro Medina Chavez"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-25T18:00:00.000Z",
        "duracion": 90,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-03-23T17:05:46.799Z",
        "updatedAt": "2024-03-23T17:05:46.799Z",
        "__v": 0
    },
    {
        "_id": "65ff0c00d6deffd831da0ba3",
        "usuario": {
            "_id": "64e9469d93005e8568759013",
            "name": "Alvaro Medina Chavez"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-28T18:00:00.000Z",
        "duracion": 90,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 3",
        "createdAt": "2024-03-23T17:06:08.826Z",
        "updatedAt": "2024-03-23T17:06:08.826Z",
        "__v": 0
    },
    {
        "_id": "65ff170fd6deffd831da0e85",
        "usuario": {
            "_id": "641500a9799c5d19e048ecfb",
            "name": "FRANCISCO BOLAÑOS CARMONA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-25T17:00:00.000Z",
        "duracion": 120,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-23T17:53:19.715Z",
        "updatedAt": "2024-03-23T17:53:19.715Z",
        "__v": 0
    },
    {
        "_id": "65ff173cd6deffd831da0eba",
        "usuario": {
            "_id": "641500a9799c5d19e048ecfb",
            "name": "FRANCISCO BOLAÑOS CARMONA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-26T17:00:00.000Z",
        "duracion": 120,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-23T17:54:04.513Z",
        "updatedAt": "2024-03-23T17:54:04.513Z",
        "__v": 0
    },
    {
        "_id": "65ff2065d6deffd831da1594",
        "usuario": {
            "_id": "64014da3799c5d19e0489d9e",
            "name": "CLAUDIA RANGEL SOTO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-25T14:30:00.000Z",
        "duracion": 30,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala",
        "createdAt": "2024-03-23T18:33:09.441Z",
        "updatedAt": "2024-03-23T18:33:21.934Z",
        "__v": 0
    },
    {
        "_id": "65ff209bd6deffd831da15a1",
        "usuario": {
            "_id": "64014da3799c5d19e0489d9e",
            "name": "CLAUDIA RANGEL SOTO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-27T15:00:00.000Z",
        "duracion": 30,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-23T18:34:03.461Z",
        "updatedAt": "2024-03-23T18:34:03.461Z",
        "__v": 0
    },
    {
        "_id": "65ff20e2d6deffd831da15a9",
        "usuario": {
            "_id": "64014da3799c5d19e0489d9e",
            "name": "CLAUDIA RANGEL SOTO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-28T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-23T18:35:14.010Z",
        "updatedAt": "2024-03-23T18:35:14.010Z",
        "__v": 0
    },
    {
        "_id": "65ff21d5d6deffd831da1606",
        "usuario": {
            "_id": "65f4632a4c1bbc6c28338073",
            "name": "CARLOS ALBERTO BRAVO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-26T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "sala 1 emt",
        "createdAt": "2024-03-23T18:39:17.570Z",
        "updatedAt": "2024-03-23T18:39:17.570Z",
        "__v": 0
    },
    {
        "_id": "65ff21ecd6deffd831da160e",
        "usuario": {
            "_id": "65f4632a4c1bbc6c28338073",
            "name": "CARLOS ALBERTO BRAVO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-27T15:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-03-23T18:39:40.945Z",
        "updatedAt": "2024-03-23T18:39:40.945Z",
        "__v": 0
    },
    {
        "_id": "65ff21ffd6deffd831da1616",
        "usuario": {
            "_id": "65f4632a4c1bbc6c28338073",
            "name": "CARLOS ALBERTO BRAVO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-28T15:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-03-23T18:39:59.401Z",
        "updatedAt": "2024-03-23T18:39:59.401Z",
        "__v": 0
    },
    {
        "_id": "6601a854539db2837db8f58b",
        "usuario": {
            "_id": "65f9f19f72f754a529ec0aef",
            "name": "MARIA DE LOS ANGELES GONZALEZ HERRERA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-26T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-25T16:37:40.896Z",
        "updatedAt": "2024-03-25T16:37:40.896Z",
        "__v": 0
    },
    {
        "_id": "6601a8f3539db2837db8f593",
        "usuario": {
            "_id": "65f9f19f72f754a529ec0aef",
            "name": "MARIA DE LOS ANGELES GONZALEZ HERRERA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-27T16:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-25T16:40:19.243Z",
        "updatedAt": "2024-03-25T16:40:51.471Z",
        "__v": 0
    },
    {
        "_id": "6601a969539db2837db8f5a8",
        "usuario": {
            "_id": "65f9f19f72f754a529ec0aef",
            "name": "MARIA DE LOS ANGELES GONZALEZ HERRERA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-26T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-25T16:42:17.560Z",
        "updatedAt": "2024-03-25T16:42:17.560Z",
        "__v": 0
    },
    {
        "_id": "6601ae9e539db2837db8f60d",
        "usuario": {
            "_id": "646284b8b555e198f5a5efcc",
            "name": "MARIA GUADALUPE RUIZ ALANIS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-01T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-25T17:04:30.037Z",
        "updatedAt": "2024-03-25T17:04:30.037Z",
        "__v": 0
    },
    {
        "_id": "6601b253539db2837db8f79a",
        "usuario": {
            "_id": "6601b233539db2837db8f6f1",
            "name": "MARTHA ELENA HURTADO MARTINEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-26T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "SALA 1 EMT DRT",
        "createdAt": "2024-03-25T17:20:19.900Z",
        "updatedAt": "2024-03-25T17:20:19.900Z",
        "__v": 0
    },
    {
        "_id": "6601b641539db2837db8fa88",
        "usuario": {
            "_id": "6553e10eb842eca931e77c32",
            "name": "DIEGO ANTONIO GUTIERREZ VEGA "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-25T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-03-25T17:37:05.686Z",
        "updatedAt": "2024-03-25T17:37:05.686Z",
        "__v": 0
    },
    {
        "_id": "66020770539db2837db8fc94",
        "usuario": {
            "_id": "6553e10eb842eca931e77c32",
            "name": "DIEGO ANTONIO GUTIERREZ VEGA "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-28T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-25T23:23:28.833Z",
        "updatedAt": "2024-03-27T23:25:54.050Z",
        "__v": 0
    },
    {
        "_id": "6602eec0ebe92a3cf4b1359b",
        "usuario": {
            "_id": "65d408ddc46c27ab949492ec",
            "name": "XIMENA RESENDIZ OLASCOAGA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-28T16:30:00.000Z",
        "duracion": 90,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 8 + TERAPÍA TZIHUE",
        "createdAt": "2024-03-26T15:50:24.078Z",
        "updatedAt": "2024-03-26T15:50:36.366Z",
        "__v": 0
    },
    {
        "_id": "660304dfebe92a3cf4b13c49",
        "usuario": {
            "_id": "6603047eebe92a3cf4b13ba0",
            "name": "OSIEL ZAVALA VARGAS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-01T23:00:00.000Z",
        "duracion": 90,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "SALA 1 EMT (DRT, TDHA)",
        "createdAt": "2024-03-26T17:24:47.378Z",
        "updatedAt": "2024-03-26T17:24:47.378Z",
        "__v": 0
    },
    {
        "_id": "660327c1ebe92a3cf4b14bfe",
        "usuario": {
            "_id": "65f9f19f72f754a529ec0aef",
            "name": "MARIA DE LOS ANGELES GONZALEZ HERRERA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-27T14:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-26T19:53:37.316Z",
        "updatedAt": "2024-03-26T19:53:37.316Z",
        "__v": 0
    },
    {
        "_id": "66033be7ebe92a3cf4b14e9c",
        "usuario": {
            "_id": "6603257bebe92a3cf4b14b55",
            "name": "LOURDES GUADALUPE FIERROS ALBOR"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-26T20:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-03-26T21:19:35.830Z",
        "updatedAt": "2024-03-26T22:07:50.042Z",
        "__v": 0
    },
    {
        "_id": "66034761ebe92a3cf4b14eab",
        "usuario": {
            "_id": "6603257bebe92a3cf4b14b55",
            "name": "LOURDES GUADALUPE FIERROS ALBOR"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-03-28T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-03-26T22:08:33.707Z",
        "updatedAt": "2024-03-26T22:08:33.707Z",
        "__v": 0
    },
    {
        "_id": "6603603febe92a3cf4b14f3c",
        "usuario": {
            "_id": "6601b233539db2837db8f6f1",
            "name": "MARTHA ELENA HURTADO MARTINEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-28T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-26T23:54:39.792Z",
        "updatedAt": "2024-03-26T23:54:39.792Z",
        "__v": 0
    },
    {
        "_id": "660360b2ebe92a3cf4b14f44",
        "usuario": {
            "_id": "6601b233539db2837db8f6f1",
            "name": "MARTHA ELENA HURTADO MARTINEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-28T17:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-26T23:56:34.868Z",
        "updatedAt": "2024-03-27T16:17:11.910Z",
        "__v": 0
    },
    {
        "_id": "6604708412435142430e986b",
        "usuario": {
            "_id": "6604705a12435142430e97c4",
            "name": "NANCY QUIÑONES RADILLA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-27T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-03-27T19:16:20.973Z",
        "updatedAt": "2024-03-27T19:16:20.973Z",
        "__v": 0
    },
    {
        "_id": "66048db312435142430e995b",
        "usuario": {
            "_id": "6604705a12435142430e97c4",
            "name": "NANCY QUIÑONES RADILLA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-29T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-03-27T21:20:51.326Z",
        "updatedAt": "2024-03-27T21:20:51.326Z",
        "__v": 0
    },
    {
        "_id": "6604a47712435142430e9ae7",
        "usuario": {
            "_id": "6424e95f96ee3c69af13facd",
            "name": "ORLANDO HERNANDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-03-28T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-03-27T22:57:59.304Z",
        "updatedAt": "2024-03-27T22:57:59.304Z",
        "__v": 0
    },
    {
        "_id": "6605a05a53a73090ec050d25",
        "usuario": {
            "_id": "64014da3799c5d19e0489d9e",
            "name": "CLAUDIA RANGEL SOTO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-01T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-28T16:52:42.798Z",
        "updatedAt": "2024-03-28T16:52:42.798Z",
        "__v": 0
    },
    {
        "_id": "6605a07e53a73090ec050d2d",
        "usuario": {
            "_id": "64014da3799c5d19e0489d9e",
            "name": "CLAUDIA RANGEL SOTO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-03T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-28T16:53:18.232Z",
        "updatedAt": "2024-03-28T16:53:18.232Z",
        "__v": 0
    },
    {
        "_id": "6605a09e53a73090ec050d35",
        "usuario": {
            "_id": "64014da3799c5d19e0489d9e",
            "name": "CLAUDIA RANGEL SOTO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-06T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-28T16:53:50.222Z",
        "updatedAt": "2024-04-01T17:56:30.896Z",
        "__v": 0
    },
    {
        "_id": "6605b0b453a73090ec050d64",
        "usuario": {
            "_id": "6601b233539db2837db8f6f1",
            "name": "MARTHA ELENA HURTADO MARTINEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-01T14:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-28T18:02:28.806Z",
        "updatedAt": "2024-03-28T18:02:28.806Z",
        "__v": 0
    },
    {
        "_id": "6605b0d653a73090ec050d6c",
        "usuario": {
            "_id": "6601b233539db2837db8f6f1",
            "name": "MARTHA ELENA HURTADO MARTINEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-02T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-28T18:03:02.359Z",
        "updatedAt": "2024-03-28T18:03:02.359Z",
        "__v": 0
    },
    {
        "_id": "6605b10153a73090ec050d74",
        "usuario": {
            "_id": "6601b233539db2837db8f6f1",
            "name": "MARTHA ELENA HURTADO MARTINEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-04T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-28T18:03:45.749Z",
        "updatedAt": "2024-03-28T18:03:45.749Z",
        "__v": 0
    },
    {
        "_id": "6605b12353a73090ec050d7c",
        "usuario": {
            "_id": "6601b233539db2837db8f6f1",
            "name": "MARTHA ELENA HURTADO MARTINEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-04T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-28T18:04:19.239Z",
        "updatedAt": "2024-03-28T18:04:19.239Z",
        "__v": 0
    },
    {
        "_id": "6605b13e53a73090ec050d84",
        "usuario": {
            "_id": "6601b233539db2837db8f6f1",
            "name": "MARTHA ELENA HURTADO MARTINEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-05T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-03-28T18:04:46.501Z",
        "updatedAt": "2024-03-28T18:04:46.501Z",
        "__v": 0
    },
    {
        "_id": "6605be4853a73090ec050e27",
        "usuario": {
            "_id": "65feea60d6deffd831da0890",
            "name": "ALVARO MEDINA CHAVEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-01T18:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 4",
        "createdAt": "2024-03-28T19:00:24.726Z",
        "updatedAt": "2024-03-28T19:00:24.726Z",
        "__v": 0
    },
    {
        "_id": "6605be5f53a73090ec050e2f",
        "usuario": {
            "_id": "65feea60d6deffd831da0890",
            "name": "ALVARO MEDINA CHAVEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-05T18:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 5",
        "createdAt": "2024-03-28T19:00:47.636Z",
        "updatedAt": "2024-03-28T19:00:47.636Z",
        "__v": 0
    },
    {
        "_id": "6605c61a53a73090ec050e50",
        "usuario": {
            "_id": "6603257bebe92a3cf4b14b55",
            "name": "LOURDES GUADALUPE FIERROS ALBOR"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-01T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA  2 DOSIS 3",
        "createdAt": "2024-03-28T19:33:46.056Z",
        "updatedAt": "2024-03-28T19:33:46.056Z",
        "__v": 0
    },
    {
        "_id": "6605c63153a73090ec050e58",
        "usuario": {
            "_id": "6603257bebe92a3cf4b14b55",
            "name": "LOURDES GUADALUPE FIERROS ALBOR"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-05T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 1 DOSIS 4",
        "createdAt": "2024-03-28T19:34:09.015Z",
        "updatedAt": "2024-04-04T00:05:58.483Z",
        "__v": 0
    },
    {
        "_id": "6605fd9e53a73090ec05128d",
        "usuario": {
            "_id": "6553e10eb842eca931e77c32",
            "name": "DIEGO ANTONIO GUTIERREZ VEGA "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-01T22:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-03-28T23:30:38.606Z",
        "updatedAt": "2024-03-28T23:30:38.606Z",
        "__v": 0
    },
    {
        "_id": "6606fb6aaf4f8100bbf2708e",
        "usuario": {
            "_id": "6604705a12435142430e97c4",
            "name": "NANCY QUIÑONES RADILLA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-02T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 3",
        "createdAt": "2024-03-29T17:33:30.175Z",
        "updatedAt": "2024-03-29T17:33:30.175Z",
        "__v": 0
    },
    {
        "_id": "6606fb98af4f8100bbf27096",
        "usuario": {
            "_id": "6604705a12435142430e97c4",
            "name": "NANCY QUIÑONES RADILLA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-04T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 1 DOSIS 4",
        "createdAt": "2024-03-29T17:34:16.079Z",
        "updatedAt": "2024-04-03T17:20:01.972Z",
        "__v": 0
    },
    {
        "_id": "660ad39b500810d39f29b6d1",
        "usuario": {
            "_id": "65f4632a4c1bbc6c28338073",
            "name": "CARLOS ALBERTO BRAVO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-01T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-01T15:32:43.216Z",
        "updatedAt": "2024-04-01T15:32:43.216Z",
        "__v": 0
    },
    {
        "_id": "660ad3c3500810d39f29b6d9",
        "usuario": {
            "_id": "65f4632a4c1bbc6c28338073",
            "name": "CARLOS ALBERTO BRAVO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-01T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-04-01T15:33:23.123Z",
        "updatedAt": "2024-04-01T15:33:23.123Z",
        "__v": 0
    },
    {
        "_id": "660add78500810d39f29b9a6",
        "usuario": {
            "_id": "646284b8b555e198f5a5efcc",
            "name": "MARIA GUADALUPE RUIZ ALANIS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-05T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-01T16:14:48.397Z",
        "updatedAt": "2024-04-01T16:14:48.397Z",
        "__v": 0
    },
    {
        "_id": "660addb1500810d39f29b9ae",
        "usuario": {
            "_id": "646284b8b555e198f5a5efcc",
            "name": "MARIA GUADALUPE RUIZ ALANIS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-05T14:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-01T16:15:45.430Z",
        "updatedAt": "2024-04-01T16:15:45.430Z",
        "__v": 0
    },
    {
        "_id": "660b49c3500810d39f29c2a6",
        "usuario": {
            "_id": "6553e10eb842eca931e77c32",
            "name": "DIEGO ANTONIO GUTIERREZ VEGA "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-02T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-01T23:56:51.060Z",
        "updatedAt": "2024-04-01T23:56:51.060Z",
        "__v": 0
    },
    {
        "_id": "660b4ac6500810d39f29c2ae",
        "usuario": {
            "_id": "6603047eebe92a3cf4b13ba0",
            "name": "OSIEL ZAVALA VARGAS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-03T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-02T00:01:10.947Z",
        "updatedAt": "2024-04-02T00:01:10.947Z",
        "__v": 0
    },
    {
        "_id": "660c33b9e1cba73ce7aae18a",
        "usuario": {
            "_id": "65035c05d3d36b06dbd7ffdf",
            "name": "CRISTOFER BRANDON MUNGUIA MOLINA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-15T23:00:00.000Z",
        "duracion": 90,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOIS REF",
        "createdAt": "2024-04-02T16:35:05.219Z",
        "updatedAt": "2024-04-11T23:19:24.997Z",
        "__v": 0
    },
    {
        "_id": "660c3aa6e1cba73ce7aae3dc",
        "usuario": {
            "_id": "6604705a12435142430e97c4",
            "name": "NANCY QUIÑONES RADILLA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-08T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 5",
        "createdAt": "2024-04-02T17:04:38.132Z",
        "updatedAt": "2024-04-05T15:15:17.457Z",
        "__v": 0
    },
    {
        "_id": "660c3ac0e1cba73ce7aae3e4",
        "usuario": {
            "_id": "6604705a12435142430e97c4",
            "name": "NANCY QUIÑONES RADILLA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-10T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 6",
        "createdAt": "2024-04-02T17:05:04.175Z",
        "updatedAt": "2024-04-08T18:32:03.399Z",
        "__v": 0
    },
    {
        "_id": "660c3af9e1cba73ce7aae3ec",
        "usuario": {
            "_id": "6604705a12435142430e97c4",
            "name": "NANCY QUIÑONES RADILLA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-15T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 7",
        "createdAt": "2024-04-02T17:06:01.790Z",
        "updatedAt": "2024-04-02T17:06:01.790Z",
        "__v": 0
    },
    {
        "_id": "660c3b09e1cba73ce7aae3f4",
        "usuario": {
            "_id": "6604705a12435142430e97c4",
            "name": "NANCY QUIÑONES RADILLA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-17T14:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 8",
        "createdAt": "2024-04-02T17:06:17.267Z",
        "updatedAt": "2024-04-15T18:06:49.078Z",
        "__v": 0
    },
    {
        "_id": "660c403ae1cba73ce7aae3fc",
        "usuario": {
            "_id": "65bbf1adf104743ebf0d1393",
            "name": "VERONICA ZARAGOZA CAMPUZANO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-02T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 1 REF",
        "createdAt": "2024-04-02T17:28:26.852Z",
        "updatedAt": "2024-04-02T17:28:26.852Z",
        "__v": 0
    },
    {
        "_id": "660c4057e1cba73ce7aae404",
        "usuario": {
            "_id": "65bbf1adf104743ebf0d1393",
            "name": "VERONICA ZARAGOZA CAMPUZANO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-16T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 SOLO TERAPIA CON TZIHUE",
        "createdAt": "2024-04-02T17:28:55.878Z",
        "updatedAt": "2024-04-02T17:28:55.878Z",
        "__v": 0
    },
    {
        "_id": "660c495ae1cba73ce7aae510",
        "usuario": {
            "_id": "661714cab0c5f426d2e3b7b5",
            "name": "BLOQUEO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311bdb9811c8b706435c2c",
            "name": "Tzihueriti Castillo"
        },
        "fecha_hora": "2024-04-08T22:00:00.000Z",
        "duracion": 120,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Bloqueo - $0 - Bloqueo de citas",
        "id_servicio": "661711e8b0c5f426d2e3b5b4",
        "comentarios": "TERAPIA SALA AUDVISUAL",
        "createdAt": "2024-04-02T18:07:22.926Z",
        "updatedAt": "2024-04-10T22:40:31.987Z",
        "__v": 0
    },
    {
        "_id": "660c49afe1cba73ce7aae522",
        "usuario": {
            "_id": "661714cab0c5f426d2e3b7b5",
            "name": "BLOQUEO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311bdb9811c8b706435c2c",
            "name": "Tzihueriti Castillo"
        },
        "fecha_hora": "2024-04-15T17:00:00.000Z",
        "duracion": 300,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Bloqueo - $0 - Bloqueo de citas",
        "id_servicio": "661711e8b0c5f426d2e3b5b4",
        "comentarios": "SALA AUDIOVISUAL ",
        "createdAt": "2024-04-02T18:08:47.089Z",
        "updatedAt": "2024-04-10T22:44:15.068Z",
        "__v": 0
    },
    {
        "_id": "660c4ba0e1cba73ce7aae52f",
        "usuario": {
            "_id": "661714cab0c5f426d2e3b7b5",
            "name": "BLOQUEO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311bdb9811c8b706435c2c",
            "name": "Tzihueriti Castillo"
        },
        "fecha_hora": "2024-04-15T22:00:00.000Z",
        "duracion": 120,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Bloqueo - $0 - Bloqueo de citas",
        "id_servicio": "661711e8b0c5f426d2e3b5b4",
        "comentarios": "SALA 1 AUDIOVISUAL ",
        "createdAt": "2024-04-02T18:17:04.011Z",
        "updatedAt": "2024-04-10T22:44:36.207Z",
        "__v": 0
    },
    {
        "_id": "660c4bf4e1cba73ce7aae537",
        "usuario": {
            "_id": "661714cab0c5f426d2e3b7b5",
            "name": "BLOQUEO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311bdb9811c8b706435c2c",
            "name": "Tzihueriti Castillo"
        },
        "fecha_hora": "2024-04-22T17:00:00.000Z",
        "duracion": 300,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Bloqueo - $0 - Bloqueo de citas",
        "id_servicio": "661711e8b0c5f426d2e3b5b4",
        "comentarios": "SALA AUDIOVISUAL ",
        "createdAt": "2024-04-02T18:18:28.430Z",
        "updatedAt": "2024-04-10T22:45:19.742Z",
        "__v": 0
    },
    {
        "_id": "660c4c16e1cba73ce7aae53f",
        "usuario": {
            "_id": "661714cab0c5f426d2e3b7b5",
            "name": "BLOQUEO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311bdb9811c8b706435c2c",
            "name": "Tzihueriti Castillo"
        },
        "fecha_hora": "2024-04-22T22:00:00.000Z",
        "duracion": 120,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Bloqueo - $0 - Bloqueo de citas",
        "id_servicio": "66171186b0c5f426d2e3b483",
        "comentarios": "SALA AUDIOVISUAL",
        "createdAt": "2024-04-02T18:19:02.146Z",
        "updatedAt": "2024-04-10T22:46:47.374Z",
        "__v": 0
    },
    {
        "_id": "660c4c2ce1cba73ce7aae547",
        "usuario": {
            "_id": "661714cab0c5f426d2e3b7b5",
            "name": "BLOQUEO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311bdb9811c8b706435c2c",
            "name": "Tzihueriti Castillo"
        },
        "fecha_hora": "2024-04-29T17:00:00.000Z",
        "duracion": 300,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Bloqueo - $0 - Bloqueo de citas",
        "id_servicio": "661711e8b0c5f426d2e3b5b4",
        "comentarios": "SALA AUDIOVISUAL",
        "createdAt": "2024-04-02T18:19:24.439Z",
        "updatedAt": "2024-04-10T22:47:07.560Z",
        "__v": 0
    },
    {
        "_id": "660c4c4ce1cba73ce7aae554",
        "usuario": {
            "_id": "661714cab0c5f426d2e3b7b5",
            "name": "BLOQUEO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311bdb9811c8b706435c2c",
            "name": "Tzihueriti Castillo"
        },
        "fecha_hora": "2024-04-29T22:00:00.000Z",
        "duracion": 120,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Bloqueo - $0 - Bloqueo de citas",
        "id_servicio": "661711e8b0c5f426d2e3b5b4",
        "comentarios": "SALA AUDIOVISUAL",
        "createdAt": "2024-04-02T18:19:56.778Z",
        "updatedAt": "2024-04-10T22:47:24.008Z",
        "__v": 0
    },
    {
        "_id": "660ca8e2e1cba73ce7aae96a",
        "usuario": {
            "_id": "6603047eebe92a3cf4b13ba0",
            "name": "OSIEL ZAVALA VARGAS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-03T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-03T00:54:58.785Z",
        "updatedAt": "2024-04-03T00:54:58.785Z",
        "__v": 0
    },
    {
        "_id": "660d76ecd5049f2d55361f7f",
        "usuario": {
            "_id": "636c3fe69a3c0025d9f5c7d9",
            "name": "TZIHUERITI CASTILLO CORREA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-21T16:00:00.000Z",
        "duracion": 240,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $24000 - TA",
        "id_servicio": "6554e709d0c21c88d7160b2d",
        "comentarios": "SALA 2 TTO ALTERNATIVO",
        "createdAt": "2024-04-03T15:34:04.743Z",
        "updatedAt": "2024-04-03T15:34:04.743Z",
        "__v": 0
    },
    {
        "_id": "660d80dfd5049f2d55362311",
        "usuario": {
            "_id": "6553e10eb842eca931e77c32",
            "name": "DIEGO ANTONIO GUTIERREZ VEGA "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-03T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-04-03T16:16:31.206Z",
        "updatedAt": "2024-04-03T16:16:31.206Z",
        "__v": 0
    },
    {
        "_id": "660d8633d5049f2d55362622",
        "usuario": {
            "_id": "660d860ad5049f2d5536257b",
            "name": "HECTOR PATIÑO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-05T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "SALA 1 EMT PRIMERA VEZ",
        "createdAt": "2024-04-03T16:39:15.345Z",
        "updatedAt": "2024-04-04T23:44:08.749Z",
        "__v": 0
    },
    {
        "_id": "660d8fe3d5049f2d553626c0",
        "usuario": {
            "_id": "64150125799c5d19e048ed6b",
            "name": "PAMELA ALEXANDRA HUATO RAMIREZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-04T16:00:00.000Z",
        "duracion": 240,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $24000 - TA",
        "id_servicio": "6554e709d0c21c88d7160b2d",
        "comentarios": "SALA 2 MED ALT",
        "createdAt": "2024-04-03T17:20:35.193Z",
        "updatedAt": "2024-04-03T22:30:04.665Z",
        "__v": 0
    },
    {
        "_id": "660d9002d5049f2d553626d9",
        "usuario": {
            "_id": "64150125799c5d19e048ed6b",
            "name": "PAMELA ALEXANDRA HUATO RAMIREZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-04T18:30:00.000Z",
        "duracion": 210,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $24000 - TA",
        "id_servicio": "6554e709d0c21c88d7160b2d",
        "comentarios": "SALA 2",
        "createdAt": "2024-04-03T17:21:06.468Z",
        "updatedAt": "2024-04-03T17:35:26.184Z",
        "__v": 0
    },
    {
        "_id": "660dd788d5049f2d55362ca3",
        "usuario": {
            "_id": "6553e10eb842eca931e77c32",
            "name": "DIEGO ANTONIO GUTIERREZ VEGA "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-05T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-03T22:26:16.102Z",
        "updatedAt": "2024-04-03T22:26:16.102Z",
        "__v": 0
    },
    {
        "_id": "660de92ad5049f2d55362d96",
        "usuario": {
            "_id": "6603047eebe92a3cf4b13ba0",
            "name": "OSIEL ZAVALA VARGAS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-06T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-03T23:41:30.716Z",
        "updatedAt": "2024-04-03T23:41:30.716Z",
        "__v": 0
    },
    {
        "_id": "660f0a6df00926a772b99534",
        "usuario": {
            "_id": "660f0a4bf00926a772b9948d",
            "name": "GUSTAVO FELICES ESTRADA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-05T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-04-04T20:15:41.800Z",
        "updatedAt": "2024-04-04T20:15:41.800Z",
        "__v": 0
    },
    {
        "_id": "660f2303f00926a772b9987f",
        "usuario": {
            "_id": "660f21b1f00926a772b997d6",
            "name": "EMMANUEL TREVIÑO MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-05T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT ",
        "createdAt": "2024-04-04T22:00:35.123Z",
        "updatedAt": "2024-04-04T22:00:35.123Z",
        "__v": 0
    },
    {
        "_id": "66100597951f038efa0a42f3",
        "usuario": {
            "_id": "646284b8b555e198f5a5efcc",
            "name": "MARIA GUADALUPE RUIZ ALANIS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-09T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-05T14:07:19.398Z",
        "updatedAt": "2024-04-05T14:07:19.398Z",
        "__v": 0
    },
    {
        "_id": "66102ed7951f038efa0a4505",
        "usuario": {
            "_id": "660f21b1f00926a772b997d6",
            "name": "EMMANUEL TREVIÑO MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-06T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-05T17:03:19.217Z",
        "updatedAt": "2024-04-05T17:03:19.217Z",
        "__v": 0
    },
    {
        "_id": "66103801951f038efa0a4693",
        "usuario": {
            "_id": "661037d9951f038efa0a45ea",
            "name": "STELLAN JOEL AHVANDER"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-06T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-04-05T17:42:25.763Z",
        "updatedAt": "2024-04-05T17:42:25.763Z",
        "__v": 0
    },
    {
        "_id": "6610556e9d52dcc84690346d",
        "usuario": {
            "_id": "660d860ad5049f2d5536257b",
            "name": "HECTOR PATIÑO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-08T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-05T19:47:58.780Z",
        "updatedAt": "2024-04-05T19:47:58.780Z",
        "__v": 0
    },
    {
        "_id": "66105af6c953ad748036ea67",
        "usuario": {
            "_id": "65feea60d6deffd831da0890",
            "name": "ALVARO MEDINA CHAVEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-10T18:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 6",
        "createdAt": "2024-04-05T20:11:34.078Z",
        "updatedAt": "2024-04-05T20:11:34.078Z",
        "__v": 0
    },
    {
        "_id": "66107a2cc953ad748036ec8c",
        "usuario": {
            "_id": "6553e10eb842eca931e77c32",
            "name": "DIEGO ANTONIO GUTIERREZ VEGA "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-12T23:30:00.000Z",
        "duracion": 30,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-05T22:24:44.107Z",
        "updatedAt": "2024-04-11T21:11:53.061Z",
        "__v": 0
    },
    {
        "_id": "66108a1cc953ad748036ed1c",
        "usuario": {
            "_id": "6601b233539db2837db8f6f1",
            "name": "MARTHA ELENA HURTADO MARTINEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-08T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-05T23:32:44.518Z",
        "updatedAt": "2024-04-05T23:32:44.518Z",
        "__v": 0
    },
    {
        "_id": "66108a33c953ad748036ed24",
        "usuario": {
            "_id": "6601b233539db2837db8f6f1",
            "name": "MARTHA ELENA HURTADO MARTINEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-09T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-05T23:33:07.758Z",
        "updatedAt": "2024-04-05T23:33:07.758Z",
        "__v": 0
    },
    {
        "_id": "66108a61c953ad748036ed2c",
        "usuario": {
            "_id": "6601b233539db2837db8f6f1",
            "name": "MARTHA ELENA HURTADO MARTINEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-10T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-05T23:33:53.164Z",
        "updatedAt": "2024-04-05T23:33:53.164Z",
        "__v": 0
    },
    {
        "_id": "6610926ac953ad748036edae",
        "usuario": {
            "_id": "6603047eebe92a3cf4b13ba0",
            "name": "OSIEL ZAVALA VARGAS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-06T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-06T00:08:10.815Z",
        "updatedAt": "2024-04-06T00:08:10.815Z",
        "__v": 0
    },
    {
        "_id": "6611878ea57e5edfcf1f2464",
        "usuario": {
            "_id": "6603047eebe92a3cf4b13ba0",
            "name": "OSIEL ZAVALA VARGAS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-08T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-06T17:34:06.139Z",
        "updatedAt": "2024-04-06T17:34:06.139Z",
        "__v": 0
    },
    {
        "_id": "661187a3a57e5edfcf1f246c",
        "usuario": {
            "_id": "6603047eebe92a3cf4b13ba0",
            "name": "OSIEL ZAVALA VARGAS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-10T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-06T17:34:27.688Z",
        "updatedAt": "2024-04-06T17:34:27.688Z",
        "__v": 0
    },
    {
        "_id": "661187c6a57e5edfcf1f2474",
        "usuario": {
            "_id": "6603047eebe92a3cf4b13ba0",
            "name": "OSIEL ZAVALA VARGAS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-11T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-06T17:35:02.664Z",
        "updatedAt": "2024-04-06T17:35:02.664Z",
        "__v": 0
    },
    {
        "_id": "661187f8a57e5edfcf1f247c",
        "usuario": {
            "_id": "6603047eebe92a3cf4b13ba0",
            "name": "OSIEL ZAVALA VARGAS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-12T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-06T17:35:52.184Z",
        "updatedAt": "2024-04-06T17:35:52.184Z",
        "__v": 0
    },
    {
        "_id": "66118809a57e5edfcf1f2484",
        "usuario": {
            "_id": "6603047eebe92a3cf4b13ba0",
            "name": "OSIEL ZAVALA VARGAS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-13T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-06T17:36:09.932Z",
        "updatedAt": "2024-04-06T17:36:09.932Z",
        "__v": 0
    },
    {
        "_id": "661196cba57e5edfcf1f2547",
        "usuario": {
            "_id": "660f21b1f00926a772b997d6",
            "name": "EMMANUEL TREVIÑO MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-11T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "EMT  Sala 1",
        "createdAt": "2024-04-06T18:39:07.768Z",
        "updatedAt": "2024-04-06T18:39:07.768Z",
        "__v": 0
    },
    {
        "_id": "661196e5a57e5edfcf1f254f",
        "usuario": {
            "_id": "660f21b1f00926a772b997d6",
            "name": "EMMANUEL TREVIÑO MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-12T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-06T18:39:33.070Z",
        "updatedAt": "2024-04-06T18:39:33.070Z",
        "__v": 0
    },
    {
        "_id": "6611c843a57e5edfcf1f2557",
        "usuario": {
            "_id": "6615924ab68fb742243243c3",
            "name": "DENISE DAVALOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-08T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT  Sala 1",
        "createdAt": "2024-04-06T22:10:11.877Z",
        "updatedAt": "2024-04-10T00:29:56.478Z",
        "__v": 0
    },
    {
        "_id": "66140a6dbd10d66b818c415d",
        "usuario": {
            "_id": "65f4632a4c1bbc6c28338073",
            "name": "CARLOS ALBERTO BRAVO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-09T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-08T15:17:01.953Z",
        "updatedAt": "2024-04-08T15:17:01.953Z",
        "__v": 0
    },
    {
        "_id": "6614108abd10d66b818c4348",
        "usuario": {
            "_id": "6614106bbd10d66b818c429b",
            "name": "MARTHA MARTINEZ CASTAÑEDA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-10T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-04-08T15:43:06.979Z",
        "updatedAt": "2024-04-10T16:51:06.164Z",
        "__v": 0
    },
    {
        "_id": "6614252abd10d66b818c43a5",
        "usuario": {
            "_id": "65bacef159368c1600970283",
            "name": "PATRICIA ALEJANDRA CRUZ PAREDES"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-09T22:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-04-08T17:11:06.383Z",
        "updatedAt": "2024-04-08T17:11:06.383Z",
        "__v": 0
    },
    {
        "_id": "66142562bd10d66b818c43ad",
        "usuario": {
            "_id": "65bacef159368c1600970283",
            "name": "PATRICIA ALEJANDRA CRUZ PAREDES"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-11T22:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-04-08T17:12:02.315Z",
        "updatedAt": "2024-04-08T17:12:02.315Z",
        "__v": 0
    },
    {
        "_id": "66143f1bbd10d66b818c45ea",
        "usuario": {
            "_id": "661037d9951f038efa0a45ea",
            "name": "STELLAN JOEL AHVANDER"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-08T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-04-08T19:01:47.572Z",
        "updatedAt": "2024-04-08T19:01:47.572Z",
        "__v": 0
    },
    {
        "_id": "66144755bd10d66b818c45f2",
        "usuario": {
            "_id": "65677f6769730be2742b1623",
            "name": "JULIO ONOFRE QUIÑONES CAMPOS "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-09T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-04-08T19:36:53.574Z",
        "updatedAt": "2024-04-08T19:36:53.574Z",
        "__v": 0
    },
    {
        "_id": "66155ea7b68fb742243240e4",
        "usuario": {
            "_id": "65f4632a4c1bbc6c28338073",
            "name": "CARLOS ALBERTO BRAVO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-10T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-09T15:28:39.703Z",
        "updatedAt": "2024-04-09T15:28:39.703Z",
        "__v": 0
    },
    {
        "_id": "66157282b68fb742243241c0",
        "usuario": {
            "_id": "6603257bebe92a3cf4b14b55",
            "name": "LOURDES GUADALUPE FIERROS ALBOR"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-09T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 5",
        "createdAt": "2024-04-09T16:53:22.106Z",
        "updatedAt": "2024-04-09T16:53:22.106Z",
        "__v": 0
    },
    {
        "_id": "66157b67b68fb742243242f7",
        "usuario": {
            "_id": "66157b4ab68fb74224324250",
            "name": "FATIMA HERRERA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-09T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-04-09T17:31:19.482Z",
        "updatedAt": "2024-04-09T17:31:19.482Z",
        "__v": 0
    },
    {
        "_id": "66159270b68fb74224324472",
        "usuario": {
            "_id": "6615924ab68fb742243243c3",
            "name": "DENISE DAVALOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-09T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-04-09T19:09:36.217Z",
        "updatedAt": "2024-04-09T19:09:36.217Z",
        "__v": 0
    },
    {
        "_id": "66159f71b68fb74224324b3a",
        "usuario": {
            "_id": "66159f59b68fb74224324a91",
            "name": "CLAUDIA ANGELICA ZEPEDA AGUILAR"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-11T01:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-04-09T20:05:05.626Z",
        "updatedAt": "2024-04-11T00:41:48.993Z",
        "__v": 0
    },
    {
        "_id": "6615a79ab68fb74224324cbf",
        "usuario": {
            "_id": "66157b4ab68fb74224324250",
            "name": "FATIMA HERRERA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-11T21:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-04-09T20:39:54.172Z",
        "updatedAt": "2024-04-09T20:39:54.172Z",
        "__v": 0
    },
    {
        "_id": "6615cfedb68fb74224324f87",
        "usuario": {
            "_id": "6615cfb9b68fb74224324edb",
            "name": "ALONDRA SELENE FERNANDEZ MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-10T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-04-09T23:31:57.468Z",
        "updatedAt": "2024-04-09T23:31:57.468Z",
        "__v": 0
    },
    {
        "_id": "6616c528b0c5f426d2e3ae25",
        "usuario": {
            "_id": "646b8fc0b555e198f5a619d1",
            "name": "PAULINA MORALES AREVALO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-11T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-04-10T16:58:16.230Z",
        "updatedAt": "2024-04-10T16:58:16.230Z",
        "__v": 0
    },
    {
        "_id": "6616c554b0c5f426d2e3ae2d",
        "usuario": {
            "_id": "65f4632a4c1bbc6c28338073",
            "name": "CARLOS ALBERTO BRAVO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-11T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-04-10T16:59:00.619Z",
        "updatedAt": "2024-04-10T16:59:00.619Z",
        "__v": 0
    },
    {
        "_id": "6616d180b0c5f426d2e3ae98",
        "usuario": {
            "_id": "6615cfb9b68fb74224324edb",
            "name": "ALONDRA SELENE FERNANDEZ MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-13T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-04-10T17:50:56.903Z",
        "updatedAt": "2024-04-10T17:50:56.903Z",
        "__v": 0
    },
    {
        "_id": "6616da86b0c5f426d2e3aec9",
        "usuario": {
            "_id": "65316db183776ca8ad729435",
            "name": "ALAN JASSIEL RODRIGUEZ LUNA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-10T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-04-10T18:29:26.195Z",
        "updatedAt": "2024-04-10T18:29:26.195Z",
        "__v": 0
    },
    {
        "_id": "6616e03fb0c5f426d2e3afd9",
        "usuario": {
            "_id": "6614106bbd10d66b818c429b",
            "name": "MARTHA MARTINEZ CASTAÑEDA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-15T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-04-10T18:53:51.979Z",
        "updatedAt": "2024-04-10T18:53:51.979Z",
        "__v": 0
    },
    {
        "_id": "6616e04eb0c5f426d2e3afe1",
        "usuario": {
            "_id": "6614106bbd10d66b818c429b",
            "name": "MARTHA MARTINEZ CASTAÑEDA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-20T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 3",
        "createdAt": "2024-04-10T18:54:06.356Z",
        "updatedAt": "2024-04-15T16:56:29.640Z",
        "__v": 0
    },
    {
        "_id": "66171546b0c5f426d2e3b97a",
        "usuario": {
            "_id": "661714cab0c5f426d2e3b7b5",
            "name": "BLOQUEO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311bdb9811c8b706435c2c",
            "name": "Tzihueriti Castillo"
        },
        "fecha_hora": "2024-04-08T17:00:00.000Z",
        "duracion": 300,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Bloqueo - $0 - Bloqueo de citas",
        "id_servicio": "661711e8b0c5f426d2e3b5b4",
        "comentarios": "TERAPIA DR TZIHUE",
        "createdAt": "2024-04-10T22:40:06.894Z",
        "updatedAt": "2024-04-10T22:40:06.894Z",
        "__v": 0
    },
    {
        "_id": "661717a4b0c5f426d2e3bbfd",
        "usuario": {
            "_id": "6617175ab0c5f426d2e3bb7c",
            "name": "XAVIER CALDERON HERNANDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-10T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-04-10T22:50:12.700Z",
        "updatedAt": "2024-04-10T22:50:12.700Z",
        "__v": 0
    },
    {
        "_id": "66172ab0b0c5f426d2e3be83",
        "usuario": {
            "_id": "65feea60d6deffd831da0890",
            "name": "ALVARO MEDINA CHAVEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-15T18:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 7",
        "createdAt": "2024-04-11T00:11:28.654Z",
        "updatedAt": "2024-04-11T00:11:28.654Z",
        "__v": 0
    },
    {
        "_id": "66172c00b0c5f426d2e3be92",
        "usuario": {
            "_id": "6617175ab0c5f426d2e3bb7c",
            "name": "XAVIER CALDERON HERNANDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-13T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-04-11T00:17:04.740Z",
        "updatedAt": "2024-04-11T00:17:04.740Z",
        "__v": 0
    },
    {
        "_id": "6618279fe40d101b709efa13",
        "usuario": {
            "_id": "661714cab0c5f426d2e3b7b5",
            "name": "BLOQUEO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311bdb9811c8b706435c2c",
            "name": "Tzihueriti Castillo"
        },
        "fecha_hora": "2024-04-11T18:00:00.000Z",
        "duracion": 150,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Bloqueo - $0 - Bloqueo de citas",
        "id_servicio": "661711e8b0c5f426d2e3b5b4",
        "comentarios": "SALA 2 ",
        "createdAt": "2024-04-11T18:10:39.955Z",
        "updatedAt": "2024-04-11T18:11:00.207Z",
        "__v": 0
    },
    {
        "_id": "66186053e40d101b709efbd2",
        "usuario": {
            "_id": "66157b4ab68fb74224324250",
            "name": "FATIMA HERRERA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-17T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 3",
        "createdAt": "2024-04-11T22:12:35.590Z",
        "updatedAt": "2024-04-11T22:12:35.590Z",
        "__v": 0
    },
    {
        "_id": "661873c0e40d101b709efc5b",
        "usuario": {
            "_id": "65f4632a4c1bbc6c28338073",
            "name": "CARLOS ALBERTO BRAVO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-12T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-11T23:35:28.556Z",
        "updatedAt": "2024-04-11T23:35:28.556Z",
        "__v": 0
    },
    {
        "_id": "661876b4e40d101b709efd43",
        "usuario": {
            "_id": "661714cab0c5f426d2e3b7b5",
            "name": "BLOQUEO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311bdb9811c8b706435c2c",
            "name": "Tzihueriti Castillo"
        },
        "fecha_hora": "2024-04-12T18:00:00.000Z",
        "duracion": 180,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Bloqueo - $0 - Bloqueo de citas",
        "id_servicio": "661711e8b0c5f426d2e3b5b4",
        "comentarios": "NO CITAR REPARACIONES",
        "createdAt": "2024-04-11T23:48:04.104Z",
        "updatedAt": "2024-04-11T23:48:04.104Z",
        "__v": 0
    },
    {
        "_id": "661880bee40d101b709efea8",
        "usuario": {
            "_id": "6603047eebe92a3cf4b13ba0",
            "name": "OSIEL ZAVALA VARGAS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-13T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-12T00:30:54.384Z",
        "updatedAt": "2024-04-12T00:30:54.384Z",
        "__v": 0
    },
    {
        "_id": "66195553576dae451196060f",
        "usuario": {
            "_id": "65f4632a4c1bbc6c28338073",
            "name": "CARLOS ALBERTO BRAVO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-15T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-12T15:37:55.751Z",
        "updatedAt": "2024-04-12T15:37:55.751Z",
        "__v": 0
    },
    {
        "_id": "66195ff5576dae4511960638",
        "usuario": {
            "_id": "6603257bebe92a3cf4b14b55",
            "name": "LOURDES GUADALUPE FIERROS ALBOR"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-12T16:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 6",
        "createdAt": "2024-04-12T16:23:17.323Z",
        "updatedAt": "2024-04-12T16:23:17.323Z",
        "__v": 0
    },
    {
        "_id": "661963fc576dae4511960640",
        "usuario": {
            "_id": "660f21b1f00926a772b997d6",
            "name": "EMMANUEL TREVIÑO MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-13T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-12T16:40:28.960Z",
        "updatedAt": "2024-04-12T16:40:28.960Z",
        "__v": 0
    },
    {
        "_id": "66196eb2576dae4511960648",
        "usuario": {
            "_id": "65fb5e113ce837e978e1489a",
            "name": "PERLA IVETT ARIZMENDI HERNÁNDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-13T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 2 + TERAPIA",
        "createdAt": "2024-04-12T17:26:10.554Z",
        "updatedAt": "2024-04-12T17:26:53.121Z",
        "__v": 0
    },
    {
        "_id": "661ab038382f60de9c86a7f8",
        "usuario": {
            "_id": "652595df4725902e21f12a1d",
            "name": "ANGEL CAHUE DIAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-19T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "No agendar",
        "createdAt": "2024-04-13T16:18:00.438Z",
        "updatedAt": "2024-04-13T16:18:00.438Z",
        "__v": 0
    },
    {
        "_id": "661ac1b1382f60de9c86a863",
        "usuario": {
            "_id": "660f21b1f00926a772b997d6",
            "name": "EMMANUEL TREVIÑO MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-15T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-13T17:32:33.298Z",
        "updatedAt": "2024-04-13T17:32:33.298Z",
        "__v": 0
    },
    {
        "_id": "661ac1f0382f60de9c86a86b",
        "usuario": {
            "_id": "660f21b1f00926a772b997d6",
            "name": "EMMANUEL TREVIÑO MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-16T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-13T17:33:36.530Z",
        "updatedAt": "2024-04-13T17:33:36.530Z",
        "__v": 0
    },
    {
        "_id": "661ac295382f60de9c86a873",
        "usuario": {
            "_id": "660f21b1f00926a772b997d6",
            "name": "EMMANUEL TREVIÑO MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-17T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-13T17:36:21.429Z",
        "updatedAt": "2024-04-13T17:36:21.429Z",
        "__v": 0
    },
    {
        "_id": "661ac2b7382f60de9c86a87b",
        "usuario": {
            "_id": "660f21b1f00926a772b997d6",
            "name": "EMMANUEL TREVIÑO MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-18T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-13T17:36:55.792Z",
        "updatedAt": "2024-04-18T18:57:36.991Z",
        "__v": 0
    },
    {
        "_id": "661ac2de382f60de9c86a883",
        "usuario": {
            "_id": "660f21b1f00926a772b997d6",
            "name": "EMMANUEL TREVIÑO MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-19T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-13T17:37:34.226Z",
        "updatedAt": "2024-04-13T17:37:34.226Z",
        "__v": 0
    },
    {
        "_id": "661adc48382f60de9c86a9ea",
        "usuario": {
            "_id": "6617175ab0c5f426d2e3bb7c",
            "name": "XAVIER CALDERON HERNANDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-15T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2",
        "createdAt": "2024-04-13T19:26:00.244Z",
        "updatedAt": "2024-04-13T19:26:00.244Z",
        "__v": 0
    },
    {
        "_id": "661d4386a57c3376307476d0",
        "usuario": {
            "_id": "6615cfb9b68fb74224324edb",
            "name": "ALONDRA SELENE FERNANDEZ MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-16T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 3",
        "createdAt": "2024-04-15T15:11:02.819Z",
        "updatedAt": "2024-04-15T15:11:02.819Z",
        "__v": 0
    },
    {
        "_id": "661d4a8aa57c337630747817",
        "usuario": {
            "_id": "661d4a65a57c337630747794",
            "name": "LUIS RAUL CENICEROS RIOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-15T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "SALA 1 EMT PRIMERA VEZ",
        "createdAt": "2024-04-15T15:40:58.997Z",
        "updatedAt": "2024-04-15T15:40:58.997Z",
        "__v": 0
    },
    {
        "_id": "661d679ba57c337630747c38",
        "usuario": {
            "_id": "661d6780a57c337630747bb5",
            "name": "CITLALI ANAHI RAMIREZ SALMERON"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-20T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-04-15T17:44:59.757Z",
        "updatedAt": "2024-04-15T17:44:59.757Z",
        "__v": 0
    },
    {
        "_id": "661d67b1a57c337630747c40",
        "usuario": {
            "_id": "661d6780a57c337630747bb5",
            "name": "CITLALI ANAHI RAMIREZ SALMERON"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-22T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-04-15T17:45:21.616Z",
        "updatedAt": "2024-04-15T17:45:21.616Z",
        "__v": 0
    },
    {
        "_id": "661d74f0a57c337630747ebc",
        "usuario": {
            "_id": "65fb5e113ce837e978e1489a",
            "name": "PERLA IVETT ARIZMENDI HERNÁNDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-17T23:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 3",
        "createdAt": "2024-04-15T18:41:52.508Z",
        "updatedAt": "2024-04-16T18:37:08.040Z",
        "__v": 0
    },
    {
        "_id": "661d7a36a57c337630747ec4",
        "usuario": {
            "_id": "65feea60d6deffd831da0890",
            "name": "ALVARO MEDINA CHAVEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-19T18:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 8 ",
        "createdAt": "2024-04-15T19:04:22.288Z",
        "updatedAt": "2024-04-15T19:04:35.560Z",
        "__v": 0
    },
    {
        "_id": "661db799a57c337630748100",
        "usuario": {
            "_id": "661d4a65a57c337630747794",
            "name": "LUIS RAUL CENICEROS RIOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-16T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-15T23:26:17.456Z",
        "updatedAt": "2024-04-15T23:27:17.880Z",
        "__v": 0
    },
    {
        "_id": "661e94cfb72fd5f28deff2f8",
        "usuario": {
            "_id": "65f4632a4c1bbc6c28338073",
            "name": "CARLOS ALBERTO BRAVO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-17T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-16T15:10:07.541Z",
        "updatedAt": "2024-04-16T15:10:07.541Z",
        "__v": 0
    },
    {
        "_id": "661ea6e8b72fd5f28deff3df",
        "usuario": {
            "_id": "6603257bebe92a3cf4b14b55",
            "name": "LOURDES GUADALUPE FIERROS ALBOR"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-16T18:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 7",
        "createdAt": "2024-04-16T16:27:20.912Z",
        "updatedAt": "2024-04-16T16:27:32.116Z",
        "__v": 0
    },
    {
        "_id": "661eab30b72fd5f28deff4e9",
        "usuario": {
            "_id": "661eab11b72fd5f28deff466",
            "name": "JORGE ALBERTO MONTES DEL VALLE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-16T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-04-16T16:45:36.064Z",
        "updatedAt": "2024-04-16T18:15:17.471Z",
        "__v": 0
    },
    {
        "_id": "661eb1dd9216c3d2b86900c5",
        "usuario": {
            "_id": "6615cfb9b68fb74224324edb",
            "name": "ALONDRA SELENE FERNANDEZ MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-19T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 4 ",
        "createdAt": "2024-04-16T17:14:05.952Z",
        "updatedAt": "2024-04-16T17:15:25.139Z",
        "__v": 0
    },
    {
        "_id": "661ed0729216c3d2b8690576",
        "usuario": {
            "_id": "661ecfa49216c3d2b86904f1",
            "name": "PABLO GIBRAN JUAREZ PEREZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-16T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-04-16T19:24:34.093Z",
        "updatedAt": "2024-04-16T19:24:34.093Z",
        "__v": 0
    },
    {
        "_id": "661f07be9216c3d2b86906ec",
        "usuario": {
            "_id": "661eab11b72fd5f28deff466",
            "name": "JORGE ALBERTO MONTES DEL VALLE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-18T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-04-16T23:20:30.419Z",
        "updatedAt": "2024-04-16T23:20:30.419Z",
        "__v": 0
    },
    {
        "_id": "661f083a9216c3d2b86906f4",
        "usuario": {
            "_id": "661ecfa49216c3d2b86904f1",
            "name": "PABLO GIBRAN JUAREZ PEREZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-20T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-04-16T23:22:34.981Z",
        "updatedAt": "2024-04-16T23:22:41.397Z",
        "__v": 0
    },
    {
        "_id": "661fecc81fbe5a5b03524a8d",
        "usuario": {
            "_id": "65f4632a4c1bbc6c28338073",
            "name": "CARLOS ALBERTO BRAVO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-18T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-17T15:37:44.216Z",
        "updatedAt": "2024-04-17T15:37:44.216Z",
        "__v": 0
    },
    {
        "_id": "661fed111fbe5a5b03524a95",
        "usuario": {
            "_id": "65f4632a4c1bbc6c28338073",
            "name": "CARLOS ALBERTO BRAVO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-19T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-17T15:38:57.152Z",
        "updatedAt": "2024-04-17T15:38:57.152Z",
        "__v": 0
    },
    {
        "_id": "661ff76e1fbe5a5b03524cca",
        "usuario": {
            "_id": "661d4a65a57c337630747794",
            "name": "LUIS RAUL CENICEROS RIOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-17T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-04-17T16:23:10.983Z",
        "updatedAt": "2024-04-17T23:53:30.089Z",
        "__v": 0
    },
    {
        "_id": "662024d01fbe5a5b03525136",
        "usuario": {
            "_id": "661714cab0c5f426d2e3b7b5",
            "name": "BLOQUEO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311bdb9811c8b706435c2c",
            "name": "Tzihueriti Castillo"
        },
        "fecha_hora": "2024-04-20T15:00:00.000Z",
        "duracion": 180,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Bloqueo - $0 - Bloqueo de citas",
        "id_servicio": "661711e8b0c5f426d2e3b5b4",
        "comentarios": "SALA AUDIVISUAL WILLIAM HITT ",
        "createdAt": "2024-04-17T19:36:48.560Z",
        "updatedAt": "2024-04-17T19:36:48.560Z",
        "__v": 0
    },
    {
        "_id": "662060bf1fbe5a5b0352533f",
        "usuario": {
            "_id": "66157b4ab68fb74224324250",
            "name": "FATIMA HERRERA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-19T20:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 4",
        "createdAt": "2024-04-17T23:52:31.172Z",
        "updatedAt": "2024-04-17T23:52:31.172Z",
        "__v": 0
    },
    {
        "_id": "662060ca1fbe5a5b03525347",
        "usuario": {
            "_id": "660f21b1f00926a772b997d6",
            "name": "EMMANUEL TREVIÑO MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-18T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-17T23:52:42.519Z",
        "updatedAt": "2024-04-17T23:52:42.519Z",
        "__v": 0
    },
    {
        "_id": "662060ea1fbe5a5b035253d3",
        "usuario": {
            "_id": "6620607a1fbe5a5b03525242",
            "name": "ANAYATZIN TREVIÑO MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-18T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-04-17T23:53:14.784Z",
        "updatedAt": "2024-04-17T23:53:14.784Z",
        "__v": 0
    },
    {
        "_id": "6620616d1fbe5a5b035254db",
        "usuario": {
            "_id": "662061571fbe5a5b0352545a",
            "name": "AHMED OSZU MEDINA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-18T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-04-17T23:55:25.619Z",
        "updatedAt": "2024-04-17T23:55:25.619Z",
        "__v": 0
    },
    {
        "_id": "662150a54129d21bd84be209",
        "usuario": {
            "_id": "6620607a1fbe5a5b03525242",
            "name": "ANAYATZIN TREVIÑO MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-19T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-04-18T16:56:05.395Z",
        "updatedAt": "2024-04-19T17:24:02.045Z",
        "__v": 0
    },
    {
        "_id": "662160e64129d21bd84be219",
        "usuario": {
            "_id": "662061571fbe5a5b0352545a",
            "name": "AHMED OSZU MEDINA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-19T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-18T18:05:26.828Z",
        "updatedAt": "2024-04-18T18:05:26.828Z",
        "__v": 0
    },
    {
        "_id": "662165464129d21bd84be221",
        "usuario": {
            "_id": "652595df4725902e21f12a1d",
            "name": "ANGEL CAHUE DIAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-22T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "Reunión virtual",
        "createdAt": "2024-04-18T18:24:06.416Z",
        "updatedAt": "2024-04-18T18:24:06.416Z",
        "__v": 0
    },
    {
        "_id": "662194ff4129d21bd84be486",
        "usuario": {
            "_id": "6617175ab0c5f426d2e3bb7c",
            "name": "XAVIER CALDERON HERNANDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-20T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 4",
        "createdAt": "2024-04-18T21:47:43.093Z",
        "updatedAt": "2024-04-18T21:47:43.093Z",
        "__v": 0
    },
    {
        "_id": "6621a51f4129d21bd84be4d6",
        "usuario": {
            "_id": "65fb5e113ce837e978e1489a",
            "name": "PERLA IVETT ARIZMENDI HERNÁNDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-20T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 4",
        "createdAt": "2024-04-18T22:56:31.543Z",
        "updatedAt": "2024-04-18T22:56:31.543Z",
        "__v": 0
    },
    {
        "_id": "66228fc43aaf8781d417cc7c",
        "usuario": {
            "_id": "66031688ebe92a3cf4b13db8",
            "name": "LOURDES GUADALUPE FIERROS ALBOR"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-19T18:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 8",
        "createdAt": "2024-04-19T15:37:40.172Z",
        "updatedAt": "2024-04-19T15:37:49.756Z",
        "__v": 0
    },
    {
        "_id": "662293983aaf8781d417cda8",
        "usuario": {
            "_id": "662293513aaf8781d417cd27",
            "name": "VICTOR ALFREDO HERNANDEZ CUEVAS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-19T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-04-19T15:54:00.613Z",
        "updatedAt": "2024-04-19T15:54:00.613Z",
        "__v": 0
    },
    {
        "_id": "6622a2263aaf8781d417ce2d",
        "usuario": {
            "_id": "660f21b1f00926a772b997d6",
            "name": "EMMANUEL TREVIÑO MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-20T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-19T16:56:06.713Z",
        "updatedAt": "2024-04-19T16:56:06.713Z",
        "__v": 0
    },
    {
        "_id": "6622aa703aaf8781d417ce3a",
        "usuario": {
            "_id": "65f4632a4c1bbc6c28338073",
            "name": "CARLOS ALBERTO BRAVO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-20T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-19T17:31:28.394Z",
        "updatedAt": "2024-04-19T17:31:28.394Z",
        "__v": 0
    },
    {
        "_id": "6622cb78925310098c0ff6f5",
        "usuario": {
            "_id": "6622cb58925310098c0ff672",
            "name": "ALMA ROSA DODOLI DIANA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-22T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-04-19T19:52:24.589Z",
        "updatedAt": "2024-04-19T19:52:24.589Z",
        "__v": 0
    },
    {
        "_id": "6622db22925310098c0ff6fd",
        "usuario": {
            "_id": "66157b4ab68fb74224324250",
            "name": "FATIMA HERRERA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-23T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 5",
        "createdAt": "2024-04-19T20:59:14.579Z",
        "updatedAt": "2024-04-19T20:59:14.579Z",
        "__v": 0
    },
    {
        "_id": "662306b9925310098c0ff705",
        "usuario": {
            "_id": "662061571fbe5a5b0352545a",
            "name": "AHMED OSZU MEDINA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-20T16:00:00.000Z",
        "duracion": 120,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-20T00:05:13.666Z",
        "updatedAt": "2024-04-20T00:06:14.818Z",
        "__v": 0
    },
    {
        "_id": "6623feb04d5ae66039685621",
        "usuario": {
            "_id": "662061571fbe5a5b0352545a",
            "name": "AHMED OSZU MEDINA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-22T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-20T17:43:12.337Z",
        "updatedAt": "2024-04-20T17:43:12.337Z",
        "__v": 0
    },
    {
        "_id": "6623fecd4d5ae66039685629",
        "usuario": {
            "_id": "6620607a1fbe5a5b03525242",
            "name": "ANAYATZIN TREVIÑO MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-23T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-20T17:43:41.063Z",
        "updatedAt": "2024-04-20T17:43:41.063Z",
        "__v": 0
    },
    {
        "_id": "662687fe2fd03e24d5af8b55",
        "usuario": {
            "_id": "6614106bbd10d66b818c429b",
            "name": "MARTHA MARTINEZ CASTAÑEDA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-22T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 4",
        "createdAt": "2024-04-22T15:53:34.939Z",
        "updatedAt": "2024-04-22T15:53:34.939Z",
        "__v": 0
    },
    {
        "_id": "662699062fd03e24d5af8bdf",
        "usuario": {
            "_id": "661d6780a57c337630747bb5",
            "name": "CITLALI ANAHI RAMIREZ SALMERON"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-27T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 3",
        "createdAt": "2024-04-22T17:06:14.212Z",
        "updatedAt": "2024-04-22T17:06:14.212Z",
        "__v": 0
    },
    {
        "_id": "662699262fd03e24d5af8bef",
        "usuario": {
            "_id": "661d6780a57c337630747bb5",
            "name": "CITLALI ANAHI RAMIREZ SALMERON"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-29T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 4",
        "createdAt": "2024-04-22T17:06:46.151Z",
        "updatedAt": "2024-04-29T15:52:40.250Z",
        "__v": 0
    },
    {
        "_id": "662699da2fd03e24d5af8bf7",
        "usuario": {
            "_id": "6614106bbd10d66b818c429b",
            "name": "MARTHA MARTINEZ CASTAÑEDA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-27T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 5",
        "createdAt": "2024-04-22T17:09:46.729Z",
        "updatedAt": "2024-04-23T19:35:56.547Z",
        "__v": 0
    },
    {
        "_id": "66269cc42fd03e24d5af8bff",
        "usuario": {
            "_id": "65fb5e113ce837e978e1489a",
            "name": "PERLA IVETT ARIZMENDI HERNÁNDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-26T22:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 5",
        "createdAt": "2024-04-22T17:22:12.208Z",
        "updatedAt": "2024-04-22T17:22:12.208Z",
        "__v": 0
    },
    {
        "_id": "6626b7f12fd03e24d5af8dd2",
        "usuario": {
            "_id": "6622cb58925310098c0ff672",
            "name": "ALMA ROSA DODOLI DIANA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-23T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-22T19:18:09.140Z",
        "updatedAt": "2024-04-22T19:22:45.487Z",
        "__v": 0
    },
    {
        "_id": "6626bc752fd03e24d5af8e21",
        "usuario": {
            "_id": "65fb5e113ce837e978e1489a",
            "name": "PERLA IVETT ARIZMENDI HERNÁNDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-24T22:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 5",
        "createdAt": "2024-04-22T19:37:25.490Z",
        "updatedAt": "2024-04-22T19:37:25.490Z",
        "__v": 0
    },
    {
        "_id": "6626dda52fd03e24d5af9164",
        "usuario": {
            "_id": "6617175ab0c5f426d2e3bb7c",
            "name": "XAVIER CALDERON HERNANDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-23T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 5",
        "createdAt": "2024-04-22T21:59:01.258Z",
        "updatedAt": "2024-04-22T21:59:01.258Z",
        "__v": 0
    },
    {
        "_id": "6626f0c52fd03e24d5af91fa",
        "usuario": {
            "_id": "64272993fd79d28f49d63675",
            "name": "VANESSA IVONNE RODRIGUEZ ROSAS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-23T01:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 REFUERZO",
        "createdAt": "2024-04-22T23:20:37.240Z",
        "updatedAt": "2024-04-22T23:20:47.893Z",
        "__v": 0
    },
    {
        "_id": "6626f7762fd03e24d5af9321",
        "usuario": {
            "_id": "6620607a1fbe5a5b03525242",
            "name": "ANAYATZIN TREVIÑO MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-23T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-22T23:49:10.902Z",
        "updatedAt": "2024-04-22T23:49:10.902Z",
        "__v": 0
    },
    {
        "_id": "6627db3bed243c6b91ac791a",
        "usuario": {
            "_id": "6620607a1fbe5a5b03525242",
            "name": "ANAYATZIN TREVIÑO MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-24T22:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-23T16:00:59.096Z",
        "updatedAt": "2024-04-24T21:50:10.549Z",
        "__v": 0
    },
    {
        "_id": "6627dcfced243c6b91ac7922",
        "usuario": {
            "_id": "662061571fbe5a5b0352545a",
            "name": "AHMED OSZU MEDINA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-23T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-04-23T16:08:28.283Z",
        "updatedAt": "2024-04-23T16:08:28.283Z",
        "__v": 0
    },
    {
        "_id": "6627e868ed243c6b91ac7972",
        "usuario": {
            "_id": "662061571fbe5a5b0352545a",
            "name": "AHMED OSZU MEDINA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-24T23:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-23T16:57:12.661Z",
        "updatedAt": "2024-04-24T21:50:23.434Z",
        "__v": 0
    },
    {
        "_id": "66284801ed243c6b91ac7daf",
        "usuario": {
            "_id": "6622cb58925310098c0ff672",
            "name": "ALMA ROSA DODOLI DIANA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-24T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-04-23T23:45:05.169Z",
        "updatedAt": "2024-04-23T23:45:05.169Z",
        "__v": 0
    },
    {
        "_id": "662848d0ed243c6b91ac7e3a",
        "usuario": {
            "_id": "660eec28f00926a772b98ca1",
            "name": "DANIELA RAMIREZ GUTIERREZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-23T01:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-04-23T23:48:32.191Z",
        "updatedAt": "2024-04-23T23:48:32.191Z",
        "__v": 0
    },
    {
        "_id": "66284b2fed243c6b91ac7ebe",
        "usuario": {
            "_id": "66157b4ab68fb74224324250",
            "name": "FATIMA HERRERA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-25T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 6",
        "createdAt": "2024-04-23T23:58:39.945Z",
        "updatedAt": "2024-04-23T23:58:39.945Z",
        "__v": 0
    },
    {
        "_id": "66294b1c9ce7404d2e0cbb38",
        "usuario": {
            "_id": "66294aff9ce7404d2e0cbab5",
            "name": "SELENE ESPINAL CORONEL"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-25T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-04-24T18:10:37.004Z",
        "updatedAt": "2024-04-24T18:10:37.004Z",
        "__v": 0
    },
    {
        "_id": "662950409ce7404d2e0cbbbc",
        "usuario": {
            "_id": "6622cb58925310098c0ff672",
            "name": "ALMA ROSA DODOLI DIANA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-25T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-24T18:32:32.244Z",
        "updatedAt": "2024-04-24T20:28:48.265Z",
        "__v": 0
    },
    {
        "_id": "662954bb9ce7404d2e0cbc4a",
        "usuario": {
            "_id": "660eec28f00926a772b98ca1",
            "name": "DANIELA RAMIREZ GUTIERREZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-26T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-04-24T18:51:39.744Z",
        "updatedAt": "2024-04-24T18:51:39.744Z",
        "__v": 0
    },
    {
        "_id": "6629676e9ce7404d2e0cbd7d",
        "usuario": {
            "_id": "64ad79e5b1357ba6e251c2cc",
            "name": "JOSE DE JESUS DORANTES ORTEGA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-24T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-04-24T20:11:26.727Z",
        "updatedAt": "2024-04-24T20:11:26.727Z",
        "__v": 0
    },
    {
        "_id": "662967c79ce7404d2e0cbd85",
        "usuario": {
            "_id": "64ad79e5b1357ba6e251c2cc",
            "name": "JOSE DE JESUS DORANTES ORTEGA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-26T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-04-24T20:12:55.468Z",
        "updatedAt": "2024-04-24T20:12:55.468Z",
        "__v": 0
    },
    {
        "_id": "66296cea9ce7404d2e0cbeae",
        "usuario": {
            "_id": "66296cc29ce7404d2e0cbe2d",
            "name": "GABRIELA PEDRAZA PONCE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-29T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-04-24T20:34:50.434Z",
        "updatedAt": "2024-04-24T20:34:50.434Z",
        "__v": 0
    },
    {
        "_id": "6629919c9ce7404d2e0cc0d3",
        "usuario": {
            "_id": "661ecfa49216c3d2b86904f1",
            "name": "PABLO GIBRAN JUAREZ PEREZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-25T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 3",
        "createdAt": "2024-04-24T23:11:24.685Z",
        "updatedAt": "2024-04-24T23:11:46.872Z",
        "__v": 0
    },
    {
        "_id": "6629923d9ce7404d2e0cc19a",
        "usuario": {
            "_id": "6620607a1fbe5a5b03525242",
            "name": "ANAYATZIN TREVIÑO MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-25T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-24T23:14:05.523Z",
        "updatedAt": "2024-04-24T23:14:05.523Z",
        "__v": 0
    },
    {
        "_id": "6629a2be9ce7404d2e0cc248",
        "usuario": {
            "_id": "662061571fbe5a5b0352545a",
            "name": "AHMED OSZU MEDINA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-25T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-25T00:24:30.500Z",
        "updatedAt": "2024-04-25T00:24:30.500Z",
        "__v": 0
    },
    {
        "_id": "662a976b8a0c76cd2dc2aa60",
        "usuario": {
            "_id": "6622cb58925310098c0ff672",
            "name": "ALMA ROSA DODOLI DIANA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-26T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT ",
        "createdAt": "2024-04-25T17:48:27.303Z",
        "updatedAt": "2024-04-25T17:48:27.303Z",
        "__v": 0
    },
    {
        "_id": "662aa1718a0c76cd2dc2aa92",
        "usuario": {
            "_id": "65662866a3808cd753824c08",
            "name": "MARIA JOSE SALDAÑA GIL"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-27T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-04-25T18:31:13.713Z",
        "updatedAt": "2024-04-25T18:31:13.713Z",
        "__v": 0
    },
    {
        "_id": "662aa9f18a0c76cd2dc2ac8a",
        "usuario": {
            "_id": "662061571fbe5a5b0352545a",
            "name": "AHMED OSZU MEDINA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-26T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-04-25T19:07:29.726Z",
        "updatedAt": "2024-04-25T19:07:29.726Z",
        "__v": 0
    },
    {
        "_id": "662ab5318a0c76cd2dc2ad36",
        "usuario": {
            "_id": "6620607a1fbe5a5b03525242",
            "name": "ANAYATZIN TREVIÑO MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-26T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-04-25T19:55:29.960Z",
        "updatedAt": "2024-04-25T19:55:29.960Z",
        "__v": 0
    },
    {
        "_id": "662ab98d8a0c76cd2dc2ad41",
        "usuario": {
            "_id": "661714cab0c5f426d2e3b7b5",
            "name": "BLOQUEO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311bdb9811c8b706435c2c",
            "name": "Tzihueriti Castillo"
        },
        "fecha_hora": "2024-04-27T16:00:00.000Z",
        "duracion": 180,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Bloqueo - $0 - Bloqueo de citas",
        "id_servicio": "661711e8b0c5f426d2e3b5b4",
        "comentarios": "wiliam hitt sala audivisual",
        "createdAt": "2024-04-25T20:14:05.421Z",
        "updatedAt": "2024-04-25T20:14:13.558Z",
        "__v": 0
    },
    {
        "_id": "662ad9c58a0c76cd2dc2b002",
        "usuario": {
            "_id": "6424e95f96ee3c69af13facd",
            "name": "ORLANDO HERNANDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-29T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-04-25T22:31:33.579Z",
        "updatedAt": "2024-04-25T22:31:33.579Z",
        "__v": 0
    },
    {
        "_id": "662ad9f08a0c76cd2dc2b00a",
        "usuario": {
            "_id": "65fb5e113ce837e978e1489a",
            "name": "PERLA IVETT ARIZMENDI HERNÁNDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-29T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 6",
        "createdAt": "2024-04-25T22:32:16.618Z",
        "updatedAt": "2024-04-25T22:32:16.618Z",
        "__v": 0
    },
    {
        "_id": "662aeb6f8a0c76cd2dc2b012",
        "usuario": {
            "_id": "66157b4ab68fb74224324250",
            "name": "FATIMA HERRERA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-30T23:00:00.000Z",
        "duracion": 90,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SLA 2 DOSIS 7",
        "createdAt": "2024-04-25T23:46:55.080Z",
        "updatedAt": "2024-04-25T23:46:55.080Z",
        "__v": 0
    },
    {
        "_id": "662beb8cdff16044994b6f66",
        "usuario": {
            "_id": "662061571fbe5a5b0352545a",
            "name": "AHMED OSZU MEDINA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-27T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-26T17:59:40.066Z",
        "updatedAt": "2024-04-26T17:59:40.066Z",
        "__v": 0
    },
    {
        "_id": "662bfbe9dff16044994b7194",
        "usuario": {
            "_id": "6622cb58925310098c0ff672",
            "name": "ALMA ROSA DODOLI DIANA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-27T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-26T19:09:29.907Z",
        "updatedAt": "2024-04-26T19:09:29.907Z",
        "__v": 0
    },
    {
        "_id": "662d41a2defe93ff0f0632f7",
        "usuario": {
            "_id": "6614106bbd10d66b818c429b",
            "name": "MARTHA MARTINEZ CASTAÑEDA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-29T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 6",
        "createdAt": "2024-04-27T18:19:14.917Z",
        "updatedAt": "2024-04-27T18:19:14.917Z",
        "__v": 0
    },
    {
        "_id": "662d48d4defe93ff0f0634a5",
        "usuario": {
            "_id": "6622cb58925310098c0ff672",
            "name": "ALMA ROSA DODOLI DIANA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-29T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-04-27T18:49:56.437Z",
        "updatedAt": "2024-04-27T18:49:56.437Z",
        "__v": 0
    },
    {
        "_id": "662d490bdefe93ff0f0634ad",
        "usuario": {
            "_id": "6622cb58925310098c0ff672",
            "name": "ALMA ROSA DODOLI DIANA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-30T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-04-27T18:50:51.494Z",
        "updatedAt": "2024-04-27T18:50:51.494Z",
        "__v": 0
    },
    {
        "_id": "662fb9e2bc1d26b20d32a2b9",
        "usuario": {
            "_id": "66294aff9ce7404d2e0cbab5",
            "name": "SELENE ESPINAL CORONEL"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-29T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-04-29T15:16:50.885Z",
        "updatedAt": "2024-04-29T15:16:50.885Z",
        "__v": 0
    },
    {
        "_id": "662fbb78bc1d26b20d32a37f",
        "usuario": {
            "_id": "662061571fbe5a5b0352545a",
            "name": "AHMED OSZU MEDINA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-29T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-29T15:23:36.126Z",
        "updatedAt": "2024-04-29T15:23:36.126Z",
        "__v": 0
    },
    {
        "_id": "662fd68bbc1d26b20d32a3da",
        "usuario": {
            "_id": "65f9ed2f72f754a529ec0a35",
            "name": "CITLALI ANAHI RAMIREZ SALMERON "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-04T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 5",
        "createdAt": "2024-04-29T17:19:07.248Z",
        "updatedAt": "2024-04-29T17:19:07.248Z",
        "__v": 0
    },
    {
        "_id": "662fd6cdbc1d26b20d32a3e2",
        "usuario": {
            "_id": "65f9ed2f72f754a529ec0a35",
            "name": "CITLALI ANAHI RAMIREZ SALMERON "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-06T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3600 - Ketamina con Terapia",
        "id_servicio": "6554e6d1d0c21c88d7160a60",
        "comentarios": "SALA 2 DOSIS 6",
        "createdAt": "2024-04-29T17:20:13.729Z",
        "updatedAt": "2024-04-29T17:20:13.729Z",
        "__v": 0
    },
    {
        "_id": "662fe182bc1d26b20d32a3ea",
        "usuario": {
            "_id": "6614106bbd10d66b818c429b",
            "name": "MARTHA MARTINEZ CASTAÑEDA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-04T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "sala 2 dosis 5",
        "createdAt": "2024-04-29T18:05:54.823Z",
        "updatedAt": "2024-04-29T18:05:54.823Z",
        "__v": 0
    },
    {
        "_id": "662fef8ebc1d26b20d32a3f8",
        "usuario": {
            "_id": "66294aff9ce7404d2e0cbab5",
            "name": "SELENE ESPINAL CORONEL"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-02T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 3",
        "createdAt": "2024-04-29T19:05:50.130Z",
        "updatedAt": "2024-04-29T19:07:07.176Z",
        "__v": 0
    },
    {
        "_id": "662ff1a6bc1d26b20d32a4c5",
        "usuario": {
            "_id": "64110302799c5d19e048a58c",
            "name": "JAIME GARCIA LOBATO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-30T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-04-29T19:14:46.703Z",
        "updatedAt": "2024-04-29T19:14:46.703Z",
        "__v": 0
    },
    {
        "_id": "662ff36cbc1d26b20d32a4cd",
        "usuario": {
            "_id": "66296cc29ce7404d2e0cbe2d",
            "name": "GABRIELA PEDRAZA PONCE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-04-30T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-29T19:22:20.426Z",
        "updatedAt": "2024-04-29T19:22:20.426Z",
        "__v": 0
    },
    {
        "_id": "663009a7bc1d26b20d32a742",
        "usuario": {
            "_id": "64ad79e5b1357ba6e251c2cc",
            "name": "JOSE DE JESUS DORANTES ORTEGA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-04-30T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-04-29T20:57:11.869Z",
        "updatedAt": "2024-04-29T20:57:11.869Z",
        "__v": 0
    },
    {
        "_id": "66302beabc1d26b20d32a86a",
        "usuario": {
            "_id": "662061571fbe5a5b0352545a",
            "name": "AHMED OSZU MEDINA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-01T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-29T23:23:22.572Z",
        "updatedAt": "2024-04-29T23:23:22.572Z",
        "__v": 0
    },
    {
        "_id": "66313003073cb4e779a7b1a6",
        "usuario": {
            "_id": "66312fe3073cb4e779a7b123",
            "name": "MINERVA SANCHEZ PEÑALOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-02T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-04-30T17:53:07.643Z",
        "updatedAt": "2024-04-30T17:53:07.643Z",
        "__v": 0
    },
    {
        "_id": "663132f9073cb4e779a7b1ae",
        "usuario": {
            "_id": "660eec28f00926a772b98ca1",
            "name": "DANIELA RAMIREZ GUTIERREZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-01T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 3",
        "createdAt": "2024-04-30T18:05:45.200Z",
        "updatedAt": "2024-04-30T22:06:19.831Z",
        "__v": 0
    },
    {
        "_id": "66314791073cb4e779a7b54d",
        "usuario": {
            "_id": "66296cc29ce7404d2e0cbe2d",
            "name": "GABRIELA PEDRAZA PONCE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-02T19:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-04-30T19:33:37.101Z",
        "updatedAt": "2024-04-30T19:33:37.101Z",
        "__v": 0
    },
    {
        "_id": "6631600b073cb4e779a7b73a",
        "usuario": {
            "_id": "65b7f59565958be2a4818db6",
            "name": "CLAUDIA MALDONADO ELIZALDE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-01T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-04-30T21:18:03.997Z",
        "updatedAt": "2024-04-30T21:18:03.997Z",
        "__v": 0
    },
    {
        "_id": "66316b35073cb4e779a7b794",
        "usuario": {
            "_id": "661ecfa49216c3d2b86904f1",
            "name": "PABLO GIBRAN JUAREZ PEREZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-02T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 4",
        "createdAt": "2024-04-30T22:05:41.841Z",
        "updatedAt": "2024-04-30T22:06:00.899Z",
        "__v": 0
    },
    {
        "_id": "6631925d073cb4e779a7b988",
        "usuario": {
            "_id": "6620607a1fbe5a5b03525242",
            "name": "ANAYATZIN TREVIÑO MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-03T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-01T00:52:45.605Z",
        "updatedAt": "2024-05-02T19:15:33.824Z",
        "__v": 0
    },
    {
        "_id": "6633ac49fdcec8966ac5e210",
        "usuario": {
            "_id": "660eec28f00926a772b98ca1",
            "name": "DANIELA RAMIREZ GUTIERREZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-02T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 4",
        "createdAt": "2024-05-02T15:07:53.132Z",
        "updatedAt": "2024-05-02T16:28:53.891Z",
        "__v": 0
    },
    {
        "_id": "6633aca4fdcec8966ac5e21d",
        "usuario": {
            "_id": "65fb5e113ce837e978e1489a",
            "name": "PERLA IVETT ARIZMENDI HERNÁNDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-03T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 8",
        "createdAt": "2024-05-02T15:09:24.301Z",
        "updatedAt": "2024-05-02T15:09:24.301Z",
        "__v": 0
    },
    {
        "_id": "6633d11afdcec8966ac5e4b6",
        "usuario": {
            "_id": "65690b538c7e002f5fd6b56b",
            "name": "ASHANTIE AYALA AYALA "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-02T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-05-02T17:44:58.097Z",
        "updatedAt": "2024-05-02T18:50:26.801Z",
        "__v": 0
    },
    {
        "_id": "6633d697fdcec8966ac5e570",
        "usuario": {
            "_id": "662061571fbe5a5b0352545a",
            "name": "AHMED OSZU MEDINA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-02T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-02T18:08:23.722Z",
        "updatedAt": "2024-05-02T18:08:23.722Z",
        "__v": 0
    },
    {
        "_id": "6633ed00fdcec8966ac5e62d",
        "usuario": {
            "_id": "66296cc29ce7404d2e0cbe2d",
            "name": "GABRIELA PEDRAZA PONCE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-03T19:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-02T19:44:00.115Z",
        "updatedAt": "2024-05-02T19:44:00.115Z",
        "__v": 0
    },
    {
        "_id": "6633fb6bfdcec8966ac5e6e1",
        "usuario": {
            "_id": "65dd222aaa4aa5f9e9f4a543",
            "name": "MARISELA BANDA SANCHEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-03T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-05-02T20:45:31.445Z",
        "updatedAt": "2024-05-02T20:45:31.445Z",
        "__v": 0
    },
    {
        "_id": "663406cbfdcec8966ac5e8df",
        "usuario": {
            "_id": "6622cb58925310098c0ff672",
            "name": "ALMA ROSA DODOLI DIANA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-03T17:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-05-02T21:34:03.203Z",
        "updatedAt": "2024-05-02T21:34:03.203Z",
        "__v": 0
    },
    {
        "_id": "66342ae5fdcec8966ac5e952",
        "usuario": {
            "_id": "6620607a1fbe5a5b03525242",
            "name": "ANAYATZIN TREVIÑO MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-03T16:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-03T00:08:05.658Z",
        "updatedAt": "2024-05-03T16:52:10.851Z",
        "__v": 0
    },
    {
        "_id": "66350ce192b4666519ce6bb8",
        "usuario": {
            "_id": "64ad79e5b1357ba6e251c2cc",
            "name": "JOSE DE JESUS DORANTES ORTEGA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-03T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 4",
        "createdAt": "2024-05-03T16:12:17.086Z",
        "updatedAt": "2024-05-03T16:12:17.086Z",
        "__v": 0
    },
    {
        "_id": "663512ec92b4666519ce6bc0",
        "usuario": {
            "_id": "65690b538c7e002f5fd6b56b",
            "name": "ASHANTIE AYALA AYALA "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-07T01:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-05-03T16:38:04.878Z",
        "updatedAt": "2024-05-04T17:08:23.157Z",
        "__v": 0
    },
    {
        "_id": "66351dc292b4666519ce6c49",
        "usuario": {
            "_id": "66294aff9ce7404d2e0cbab5",
            "name": "SELENE ESPINAL CORONEL"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-08T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 4 TERAPIA DR TZIHUE",
        "createdAt": "2024-05-03T17:24:18.758Z",
        "updatedAt": "2024-05-03T17:24:18.758Z",
        "__v": 0
    },
    {
        "_id": "66352b3992b4666519ce6d65",
        "usuario": {
            "_id": "6622cb58925310098c0ff672",
            "name": "ALMA ROSA DODOLI DIANA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-04T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-03T18:21:45.048Z",
        "updatedAt": "2024-05-03T18:21:45.048Z",
        "__v": 0
    },
    {
        "_id": "66353cb192b4666519ce6e07",
        "usuario": {
            "_id": "66296cc29ce7404d2e0cbe2d",
            "name": "GABRIELA PEDRAZA PONCE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-06T19:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-03T19:36:17.230Z",
        "updatedAt": "2024-05-03T19:36:17.230Z",
        "__v": 0
    },
    {
        "_id": "6635473a92b4666519ce70e5",
        "usuario": {
            "_id": "66353de092b4666519ce6e89",
            "name": "JUAN MANUEL MENDOZA DÍAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-03T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-05-03T20:21:14.281Z",
        "updatedAt": "2024-05-03T20:21:20.990Z",
        "__v": 0
    },
    {
        "_id": "6635777392b4666519ce724a",
        "usuario": {
            "_id": "66353de092b4666519ce6e89",
            "name": "JUAN MANUEL MENDOZA DÍAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-06T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala (Anticipo $5,000)",
        "createdAt": "2024-05-03T23:46:59.765Z",
        "updatedAt": "2024-05-03T23:48:09.020Z",
        "__v": 0
    },
    {
        "_id": "663681ae3b9f9468b8794e17",
        "usuario": {
            "_id": "6622cb58925310098c0ff672",
            "name": "ALMA ROSA DODOLI DIANA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-06T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-05-04T18:42:54.978Z",
        "updatedAt": "2024-05-04T18:42:54.978Z",
        "__v": 0
    },
    {
        "_id": "663904ce677bfcff4f564e3c",
        "usuario": {
            "_id": "66353de092b4666519ce6e89",
            "name": "JUAN MANUEL MENDOZA DÍAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-13T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-06T16:26:54.665Z",
        "updatedAt": "2024-05-09T00:12:42.288Z",
        "__v": 0
    },
    {
        "_id": "6639059e677bfcff4f564e49",
        "usuario": {
            "_id": "66365d473b9f9468b87948e7",
            "name": "BRENDA HERNANDEZ REYES"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-08T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-05-06T16:30:22.313Z",
        "updatedAt": "2024-05-07T15:42:57.203Z",
        "__v": 0
    },
    {
        "_id": "66390ffa677bfcff4f564e53",
        "usuario": {
            "_id": "661d6780a57c337630747bb5",
            "name": "CITLALI ANAHI RAMIREZ SALMERON"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-13T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 8",
        "createdAt": "2024-05-06T17:14:34.444Z",
        "updatedAt": "2024-05-06T17:14:34.444Z",
        "__v": 0
    },
    {
        "_id": "663910b4677bfcff4f564e5b",
        "usuario": {
            "_id": "661d6780a57c337630747bb5",
            "name": "CITLALI ANAHI RAMIREZ SALMERON"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-11T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 7",
        "createdAt": "2024-05-06T17:17:40.212Z",
        "updatedAt": "2024-05-06T17:17:40.212Z",
        "__v": 0
    },
    {
        "_id": "663914b8677bfcff4f564e63",
        "usuario": {
            "_id": "65316db183776ca8ad729435",
            "name": "ALAN JASSIEL RODRIGUEZ LUNA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-06T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-05-06T17:34:48.668Z",
        "updatedAt": "2024-05-06T17:34:48.668Z",
        "__v": 0
    },
    {
        "_id": "66391e2d677bfcff4f564f68",
        "usuario": {
            "_id": "66391e02677bfcff4f564ee5",
            "name": "JUAN LUIS LOPEZ DAVALOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-06T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-05-06T18:15:09.813Z",
        "updatedAt": "2024-05-06T18:15:09.813Z",
        "__v": 0
    },
    {
        "_id": "66392282677bfcff4f564f91",
        "usuario": {
            "_id": "660eec28f00926a772b98ca1",
            "name": "DANIELA RAMIREZ GUTIERREZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-07T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 5",
        "createdAt": "2024-05-06T18:33:38.293Z",
        "updatedAt": "2024-05-09T23:08:11.248Z",
        "__v": 0
    },
    {
        "_id": "663924ce677bfcff4f564f99",
        "usuario": {
            "_id": "6622cb58925310098c0ff672",
            "name": "ALMA ROSA DODOLI DIANA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-07T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-06T18:43:26.962Z",
        "updatedAt": "2024-05-06T18:43:26.962Z",
        "__v": 0
    },
    {
        "_id": "6639299c677bfcff4f564fe3",
        "usuario": {
            "_id": "65c52904c2b2ecc82bd20d3c",
            "name": "JAVIER SANCHEZ SALINAS "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-09T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-05-06T19:03:56.869Z",
        "updatedAt": "2024-05-06T19:03:56.869Z",
        "__v": 0
    },
    {
        "_id": "663939db677bfcff4f56502d",
        "usuario": {
            "_id": "66296cc29ce7404d2e0cbe2d",
            "name": "GABRIELA PEDRAZA PONCE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-08T19:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-06T20:13:15.730Z",
        "updatedAt": "2024-05-06T20:13:15.730Z",
        "__v": 0
    },
    {
        "_id": "663962ca677bfcff4f5651a1",
        "usuario": {
            "_id": "66391e02677bfcff4f564ee5",
            "name": "JUAN LUIS LOPEZ DAVALOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-08T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-05-06T23:07:54.192Z",
        "updatedAt": "2024-05-07T15:52:13.536Z",
        "__v": 0
    },
    {
        "_id": "663a7667517921a8a269e010",
        "usuario": {
            "_id": "663402dffdcec8966ac5e7ed",
            "name": "VICTOR HUGO LEÓN VARGAS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-07T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-05-07T18:43:51.645Z",
        "updatedAt": "2024-05-07T18:43:51.645Z",
        "__v": 0
    },
    {
        "_id": "663a7ed9517921a8a269e331",
        "usuario": {
            "_id": "663a7cab517921a8a269e1b9",
            "name": "ASHLEY HUERTA MARTINEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-07T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-05-07T19:19:53.861Z",
        "updatedAt": "2024-05-07T19:19:53.861Z",
        "__v": 0
    },
    {
        "_id": "663ab6db517921a8a269e421",
        "usuario": {
            "_id": "660eec28f00926a772b98ca1",
            "name": "DANIELA RAMIREZ GUTIERREZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-09T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 6",
        "createdAt": "2024-05-07T23:18:51.891Z",
        "updatedAt": "2024-05-09T23:08:22.074Z",
        "__v": 0
    },
    {
        "_id": "663b95d566b40bf90114800f",
        "usuario": {
            "_id": "652595df4725902e21f12a1d",
            "name": "ANGEL CAHUE DIAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-10T18:00:00.000Z",
        "duracion": 120,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Hospital Psiquiatrico",
        "createdAt": "2024-05-08T15:10:13.064Z",
        "updatedAt": "2024-05-08T15:10:13.064Z",
        "__v": 0
    },
    {
        "_id": "663bb40066b40bf901148075",
        "usuario": {
            "_id": "66294aff9ce7404d2e0cbab5",
            "name": "SELENE ESPINAL CORONEL"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-13T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA DOSIS 5",
        "createdAt": "2024-05-08T17:18:56.716Z",
        "updatedAt": "2024-05-08T17:18:56.716Z",
        "__v": 0
    },
    {
        "_id": "663bc9e366b40bf9011481d6",
        "usuario": {
            "_id": "6615eecab68fb74224325161",
            "name": "BRENDA HERNANDEZ REYES "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-10T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-05-08T18:52:19.307Z",
        "updatedAt": "2024-05-08T18:52:19.307Z",
        "__v": 0
    },
    {
        "_id": "663bd70a66b40bf9011482e8",
        "usuario": {
            "_id": "66296cc29ce7404d2e0cbe2d",
            "name": "GABRIELA PEDRAZA PONCE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-09T19:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-08T19:48:26.862Z",
        "updatedAt": "2024-05-08T19:48:26.862Z",
        "__v": 0
    },
    {
        "_id": "663bfc1066b40bf90114846f",
        "usuario": {
            "_id": "65690b538c7e002f5fd6b56b",
            "name": "ASHANTIE AYALA AYALA "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-10T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-05-08T22:26:24.084Z",
        "updatedAt": "2024-05-08T22:26:24.084Z",
        "__v": 0
    },
    {
        "_id": "663c002b66b40bf901148655",
        "usuario": {
            "_id": "663bffac66b40bf90114851c",
            "name": "DRAKO AGUILAR GONZÁLEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-08T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-05-08T22:43:55.932Z",
        "updatedAt": "2024-05-08T22:43:55.932Z",
        "__v": 0
    },
    {
        "_id": "663c0bae66b40bf9011486e1",
        "usuario": {
            "_id": "663c000c66b40bf9011485d0",
            "name": "MARIA DE LOS ANGELES SOLORIO HERNANDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-09T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-05-08T23:33:02.936Z",
        "updatedAt": "2024-05-08T23:33:02.936Z",
        "__v": 0
    },
    {
        "_id": "663c159966b40bf90114873f",
        "usuario": {
            "_id": "663bffac66b40bf90114851c",
            "name": "DRAKO AGUILAR GONZÁLEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-11T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-09T00:15:21.406Z",
        "updatedAt": "2024-05-09T00:15:21.406Z",
        "__v": 0
    },
    {
        "_id": "663cf1d81e34cb29f8d5851a",
        "usuario": {
            "_id": "663a7cab517921a8a269e1b9",
            "name": "ASHLEY HUERTA MARTINEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-09T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-05-09T15:55:04.201Z",
        "updatedAt": "2024-05-09T15:55:04.201Z",
        "__v": 0
    },
    {
        "_id": "663d01061e34cb29f8d58543",
        "usuario": {
            "_id": "663a7cab517921a8a269e1b9",
            "name": "ASHLEY HUERTA MARTINEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-13T21:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 3 ",
        "createdAt": "2024-05-09T16:59:50.371Z",
        "updatedAt": "2024-05-09T16:59:50.371Z",
        "__v": 0
    },
    {
        "_id": "663d046e1e34cb29f8d5858d",
        "usuario": {
            "_id": "663c000c66b40bf9011485d0",
            "name": "MARIA DE LOS ANGELES SOLORIO HERNANDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-13T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-05-09T17:14:22.222Z",
        "updatedAt": "2024-05-09T17:14:22.222Z",
        "__v": 0
    },
    {
        "_id": "663d2dec1e34cb29f8d58759",
        "usuario": {
            "_id": "66296cc29ce7404d2e0cbe2d",
            "name": "GABRIELA PEDRAZA PONCE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-10T20:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-09T20:11:24.817Z",
        "updatedAt": "2024-05-09T20:11:24.817Z",
        "__v": 0
    },
    {
        "_id": "663e3e25de09750692710d3f",
        "usuario": {
            "_id": "6615924ab68fb742243243c3",
            "name": "DENISE DAVALOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-11T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-10T15:32:53.618Z",
        "updatedAt": "2024-05-10T15:32:53.618Z",
        "__v": 0
    },
    {
        "_id": "663e5587295dc5cb4d11023b",
        "usuario": {
            "_id": "66365d473b9f9468b87948e7",
            "name": "BRENDA HERNANDEZ REYES"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-13T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 3",
        "createdAt": "2024-05-10T17:12:39.158Z",
        "updatedAt": "2024-05-10T18:13:27.887Z",
        "__v": 0
    },
    {
        "_id": "663e7e29295dc5cb4d1107c2",
        "usuario": {
            "_id": "66296cc29ce7404d2e0cbe2d",
            "name": "GABRIELA PEDRAZA PONCE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-13T19:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-10T20:06:02.003Z",
        "updatedAt": "2024-05-10T20:06:02.003Z",
        "__v": 0
    },
    {
        "_id": "663e8477295dc5cb4d1107ca",
        "usuario": {
            "_id": "652595df4725902e21f12a1d",
            "name": "ANGEL CAHUE DIAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-10T21:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1 Melissa Anton",
        "createdAt": "2024-05-10T20:32:55.225Z",
        "updatedAt": "2024-05-10T20:32:55.225Z",
        "__v": 0
    },
    {
        "_id": "663eb2b5295dc5cb4d11084e",
        "usuario": {
            "_id": "6615924ab68fb742243243c3",
            "name": "DENISE DAVALOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-11T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-10T23:50:13.901Z",
        "updatedAt": "2024-05-10T23:50:13.901Z",
        "__v": 0
    },
    {
        "_id": "663ec66d295dc5cb4d110856",
        "usuario": {
            "_id": "6615924ab68fb742243243c3",
            "name": "DENISE DAVALOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-13T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-11T01:14:21.425Z",
        "updatedAt": "2024-05-11T01:14:21.425Z",
        "__v": 0
    },
    {
        "_id": "663f8db16642bb49b17b6429",
        "usuario": {
            "_id": "663bffac66b40bf90114851c",
            "name": "DRAKO AGUILAR GONZÁLEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-13T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-11T15:24:33.331Z",
        "updatedAt": "2024-05-11T15:24:33.331Z",
        "__v": 0
    },
    {
        "_id": "663f8ef66642bb49b17b64f4",
        "usuario": {
            "_id": "663f8ed26642bb49b17b6471",
            "name": "RICARDO ZISNIEGA ARREOLA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-11T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-05-11T15:29:58.288Z",
        "updatedAt": "2024-05-11T15:29:58.288Z",
        "__v": 0
    },
    {
        "_id": "66422ed02a97b42a3b4be18e",
        "usuario": {
            "_id": "65bbf9bff104743ebf0d14c9",
            "name": "PAULINA GARCIA SANDOVAL"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-13T21:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-05-13T15:16:32.117Z",
        "updatedAt": "2024-05-13T15:16:32.117Z",
        "__v": 0
    },
    {
        "_id": "66423c4a2a97b42a3b4be1a2",
        "usuario": {
            "_id": "65bbf9bff104743ebf0d14c9",
            "name": "PAULINA GARCIA SANDOVAL"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-17T21:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-05-13T16:14:02.492Z",
        "updatedAt": "2024-05-13T16:14:02.492Z",
        "__v": 0
    },
    {
        "_id": "66423c792a97b42a3b4be1aa",
        "usuario": {
            "_id": "663f8ed26642bb49b17b6471",
            "name": "RICARDO ZISNIEGA ARREOLA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-15T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 2 ",
        "createdAt": "2024-05-13T16:14:49.543Z",
        "updatedAt": "2024-05-13T16:14:49.543Z",
        "__v": 0
    },
    {
        "_id": "66423cb22a97b42a3b4be1b2",
        "usuario": {
            "_id": "6615924ab68fb742243243c3",
            "name": "DENISE DAVALOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-13T20:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-13T16:15:46.642Z",
        "updatedAt": "2024-05-13T16:15:46.642Z",
        "__v": 0
    },
    {
        "_id": "664243fb2a97b42a3b4be1ba",
        "usuario": {
            "_id": "66353de092b4666519ce6e89",
            "name": "JUAN MANUEL MENDOZA DÍAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-16T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-13T16:46:51.927Z",
        "updatedAt": "2024-05-14T19:41:25.765Z",
        "__v": 0
    },
    {
        "_id": "66424afb2a97b42a3b4be1c2",
        "usuario": {
            "_id": "660eec28f00926a772b98ca1",
            "name": "DANIELA RAMIREZ GUTIERREZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-14T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 7",
        "createdAt": "2024-05-13T17:16:43.874Z",
        "updatedAt": "2024-05-13T17:17:02.836Z",
        "__v": 0
    },
    {
        "_id": "66426fc72a97b42a3b4be24f",
        "usuario": {
            "_id": "66296cc29ce7404d2e0cbe2d",
            "name": "GABRIELA PEDRAZA PONCE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-14T19:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-13T19:53:43.136Z",
        "updatedAt": "2024-05-13T19:53:43.136Z",
        "__v": 0
    },
    {
        "_id": "664289e02a97b42a3b4be367",
        "usuario": {
            "_id": "66365d473b9f9468b87948e7",
            "name": "BRENDA HERNANDEZ REYES"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-17T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 4",
        "createdAt": "2024-05-13T21:45:04.413Z",
        "updatedAt": "2024-05-13T21:45:04.413Z",
        "__v": 0
    },
    {
        "_id": "6642968a2a97b42a3b4be3b9",
        "usuario": {
            "_id": "663a7cab517921a8a269e1b9",
            "name": "ASHLEY HUERTA MARTINEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-18T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 4",
        "createdAt": "2024-05-13T22:39:06.719Z",
        "updatedAt": "2024-05-13T22:39:06.719Z",
        "__v": 0
    },
    {
        "_id": "66429c5f2a97b42a3b4be3da",
        "usuario": {
            "_id": "64110302799c5d19e048a58c",
            "name": "JAIME GARCIA LOBATO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-16T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-05-13T23:03:59.522Z",
        "updatedAt": "2024-05-15T23:42:16.516Z",
        "__v": 0
    },
    {
        "_id": "66429fb82a97b42a3b4be3e2",
        "usuario": {
            "_id": "663bffac66b40bf90114851c",
            "name": "DRAKO AGUILAR GONZÁLEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-15T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-13T23:18:16.836Z",
        "updatedAt": "2024-05-13T23:18:16.836Z",
        "__v": 0
    },
    {
        "_id": "6642a2c62a97b42a3b4be3ea",
        "usuario": {
            "_id": "663c000c66b40bf9011485d0",
            "name": "MARIA DE LOS ANGELES SOLORIO HERNANDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-16T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 3",
        "createdAt": "2024-05-13T23:31:18.244Z",
        "updatedAt": "2024-05-15T18:09:42.480Z",
        "__v": 0
    },
    {
        "_id": "6642a3262a97b42a3b4be3f7",
        "usuario": {
            "_id": "660f21b1f00926a772b997d6",
            "name": "EMMANUEL TREVIÑO MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-15T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-05-13T23:32:54.155Z",
        "updatedAt": "2024-05-15T16:25:55.088Z",
        "__v": 0
    },
    {
        "_id": "664399484f6d6b45e7d5ad6f",
        "usuario": {
            "_id": "663402dffdcec8966ac5e7ed",
            "name": "VICTOR HUGO LEÓN VARGAS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-14T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-05-14T17:03:04.071Z",
        "updatedAt": "2024-05-14T17:03:04.071Z",
        "__v": 0
    },
    {
        "_id": "6643b10f4f6d6b45e7d5ad77",
        "usuario": {
            "_id": "66294aff9ce7404d2e0cbab5",
            "name": "SELENE ESPINAL CORONEL"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-18T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 6",
        "createdAt": "2024-05-14T18:44:31.228Z",
        "updatedAt": "2024-05-14T18:44:31.228Z",
        "__v": 0
    },
    {
        "_id": "6643e9054f6d6b45e7d5aefc",
        "usuario": {
            "_id": "66296cc29ce7404d2e0cbe2d",
            "name": "GABRIELA PEDRAZA PONCE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-16T19:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-14T22:43:17.526Z",
        "updatedAt": "2024-05-14T22:43:17.526Z",
        "__v": 0
    },
    {
        "_id": "6643ec5d4f6d6b45e7d5af4e",
        "usuario": {
            "_id": "663402dffdcec8966ac5e7ed",
            "name": "VICTOR HUGO LEÓN VARGAS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-16T23:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 3",
        "createdAt": "2024-05-14T22:57:33.128Z",
        "updatedAt": "2024-05-14T22:57:33.128Z",
        "__v": 0
    },
    {
        "_id": "6643f9194f6d6b45e7d5b10b",
        "usuario": {
            "_id": "653c690be1317a0ded794e48",
            "name": "ASHANTI AYALA AYALA "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-28T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 + TERAPIA REF",
        "createdAt": "2024-05-14T23:51:53.922Z",
        "updatedAt": "2024-05-14T23:51:53.922Z",
        "__v": 0
    },
    {
        "_id": "6644e16fb81adb67fb474a28",
        "usuario": {
            "_id": "65677f6769730be2742b1623",
            "name": "JULIO ONOFRE QUIÑONES CAMPOS "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-15T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-05-15T16:23:11.621Z",
        "updatedAt": "2024-05-15T16:23:11.621Z",
        "__v": 0
    },
    {
        "_id": "6644eea1b81adb67fb474aeb",
        "usuario": {
            "_id": "663bffac66b40bf90114851c",
            "name": "DRAKO AGUILAR GONZÁLEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-17T23:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-15T17:19:29.402Z",
        "updatedAt": "2024-05-15T17:19:29.402Z",
        "__v": 0
    },
    {
        "_id": "6645402db81adb67fb474d58",
        "usuario": {
            "_id": "663f8ed26642bb49b17b6471",
            "name": "RICARDO ZISNIEGA ARREOLA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-18T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 3",
        "createdAt": "2024-05-15T23:07:25.114Z",
        "updatedAt": "2024-05-15T23:07:25.114Z",
        "__v": 0
    },
    {
        "_id": "66454aa7b81adb67fb474dbf",
        "usuario": {
            "_id": "660f21b1f00926a772b997d6",
            "name": "EMMANUEL TREVIÑO MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-21T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-15T23:52:07.829Z",
        "updatedAt": "2024-05-20T13:43:10.227Z",
        "__v": 0
    },
    {
        "_id": "664621eaa50532daeec473a3",
        "usuario": {
            "_id": "6615cfb9b68fb74224324edb",
            "name": "ALONDRA SELENE FERNANDEZ MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-16T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 5",
        "createdAt": "2024-05-16T15:10:34.959Z",
        "updatedAt": "2024-05-16T15:10:34.959Z",
        "__v": 0
    },
    {
        "_id": "66463175a50532daeec47427",
        "usuario": {
            "_id": "660eec28f00926a772b98ca1",
            "name": "DANIELA RAMIREZ GUTIERREZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-16T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 8",
        "createdAt": "2024-05-16T16:16:53.396Z",
        "updatedAt": "2024-05-16T16:16:53.396Z",
        "__v": 0
    },
    {
        "_id": "66463695a50532daeec4742f",
        "usuario": {
            "_id": "66353de092b4666519ce6e89",
            "name": "JUAN MANUEL MENDOZA DÍAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-20T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-16T16:38:45.878Z",
        "updatedAt": "2024-05-16T16:38:45.878Z",
        "__v": 0
    },
    {
        "_id": "66464269a50532daeec47437",
        "usuario": {
            "_id": "663c000c66b40bf9011485d0",
            "name": "MARIA DE LOS ANGELES SOLORIO HERNANDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-20T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 4 ATIENDE MARIANA",
        "createdAt": "2024-05-16T17:29:13.676Z",
        "updatedAt": "2024-05-16T17:29:13.676Z",
        "__v": 0
    },
    {
        "_id": "6646427ca50532daeec4743f",
        "usuario": {
            "_id": "663c000c66b40bf9011485d0",
            "name": "MARIA DE LOS ANGELES SOLORIO HERNANDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-23T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 5 ATIENDE MARIANA",
        "createdAt": "2024-05-16T17:29:32.910Z",
        "updatedAt": "2024-05-16T17:29:32.910Z",
        "__v": 0
    },
    {
        "_id": "66465389a50532daeec4767c",
        "usuario": {
            "_id": "657c7f39318087dbb5a67fbe",
            "name": "ARTURO CAMPOS DIAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-05T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT MANTENIMIENTO ",
        "createdAt": "2024-05-16T18:42:17.051Z",
        "updatedAt": "2024-06-05T20:04:20.774Z",
        "__v": 0
    },
    {
        "_id": "66465a6fa50532daeec47695",
        "usuario": {
            "_id": "652595df4725902e21f12a1d",
            "name": "ANGEL CAHUE DIAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-22T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Bloqueo - $0 - Bloqueo de citas",
        "id_servicio": "661711bbb0c5f426d2e3b510",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-16T19:11:43.925Z",
        "updatedAt": "2024-05-22T16:32:04.899Z",
        "__v": 0
    },
    {
        "_id": "66466031a50532daeec477a0",
        "usuario": {
            "_id": "66465ffda50532daeec4771d",
            "name": "NOE MATURINO PEÑA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-17T20:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-05-16T19:36:17.873Z",
        "updatedAt": "2024-05-16T19:36:17.873Z",
        "__v": 0
    },
    {
        "_id": "66467dd9a50532daeec47b25",
        "usuario": {
            "_id": "66467d96a50532daeec47aa2",
            "name": "IRMA ESTEFANIA RODRIGUEZ ZAMORA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-17T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 1 ATIENDE MARIANA",
        "createdAt": "2024-05-16T21:42:49.115Z",
        "updatedAt": "2024-05-16T21:42:49.115Z",
        "__v": 0
    },
    {
        "_id": "66478b37878543e51e1b515b",
        "usuario": {
            "_id": "66365d473b9f9468b87948e7",
            "name": "BRENDA HERNANDEZ REYES"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-21T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 5 ATIENDE MARIANA (ULTIMA DOSIS)",
        "createdAt": "2024-05-17T16:52:07.413Z",
        "updatedAt": "2024-05-17T16:52:07.413Z",
        "__v": 0
    },
    {
        "_id": "6647b672878543e51e1b534d",
        "usuario": {
            "_id": "66479c9e878543e51e1b5204",
            "name": "ROBERTO CARDENAS GARCIA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-21T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA DOSIS 1 ATIENDE MARIANA",
        "createdAt": "2024-05-17T19:56:34.061Z",
        "updatedAt": "2024-05-17T19:56:34.061Z",
        "__v": 0
    },
    {
        "_id": "6647b685878543e51e1b5355",
        "usuario": {
            "_id": "66479c9e878543e51e1b5204",
            "name": "ROBERTO CARDENAS GARCIA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-23T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 2 ATIENDE MARIANA",
        "createdAt": "2024-05-17T19:56:53.980Z",
        "updatedAt": "2024-05-17T19:56:53.980Z",
        "__v": 0
    },
    {
        "_id": "6647bf56878543e51e1b5460",
        "usuario": {
            "_id": "66467d96a50532daeec47aa2",
            "name": "IRMA ESTEFANIA RODRIGUEZ ZAMORA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-20T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-05-17T20:34:30.692Z",
        "updatedAt": "2024-05-18T16:48:20.530Z",
        "__v": 0
    },
    {
        "_id": "6647d2a2878543e51e1b56da",
        "usuario": {
            "_id": "6647d259878543e51e1b55dd",
            "name": "RODRIGO LOPEZ GARCINI"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-20T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "SALA 1 EMT PRIMERA VEZ",
        "createdAt": "2024-05-17T21:56:50.281Z",
        "updatedAt": "2024-05-20T17:40:35.280Z",
        "__v": 0
    },
    {
        "_id": "6647ebd8878543e51e1b5803",
        "usuario": {
            "_id": "663bffac66b40bf90114851c",
            "name": "DRAKO AGUILAR GONZÁLEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-18T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-17T23:44:24.486Z",
        "updatedAt": "2024-05-17T23:44:24.486Z",
        "__v": 0
    },
    {
        "_id": "6648c787fe3731bd81ea4908",
        "usuario": {
            "_id": "663bffac66b40bf90114851c",
            "name": "DRAKO AGUILAR GONZÁLEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-21T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-18T15:21:43.205Z",
        "updatedAt": "2024-05-20T13:42:43.474Z",
        "__v": 0
    },
    {
        "_id": "6648d86afe3731bd81ea4931",
        "usuario": {
            "_id": "663f8ed26642bb49b17b6471",
            "name": "RICARDO ZISNIEGA ARREOLA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-22T21:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 4",
        "createdAt": "2024-05-18T16:33:46.437Z",
        "updatedAt": "2024-05-18T16:33:46.437Z",
        "__v": 0
    },
    {
        "_id": "664b5391deb3937005022dcd",
        "usuario": {
            "_id": "652595df4725902e21f12a1d",
            "name": "ANGEL CAHUE DIAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-21T15:00:00.000Z",
        "duracion": 150,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Bloqueo - $0 - Bloqueo de citas",
        "id_servicio": "661711bbb0c5f426d2e3b510",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-20T13:43:45.538Z",
        "updatedAt": "2024-05-22T18:44:05.238Z",
        "__v": 0
    },
    {
        "_id": "664b695adeb3937005022eb4",
        "usuario": {
            "_id": "663402dffdcec8966ac5e7ed",
            "name": "VICTOR HUGO LEÓN VARGAS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-20T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2, DOSIS 4 KETA",
        "createdAt": "2024-05-20T15:16:42.760Z",
        "updatedAt": "2024-05-20T15:18:51.922Z",
        "__v": 0
    },
    {
        "_id": "664b7c7edeb393700502333a",
        "usuario": {
            "_id": "66353de092b4666519ce6e89",
            "name": "JUAN MANUEL MENDOZA DÍAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-22T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-20T16:38:22.303Z",
        "updatedAt": "2024-05-20T16:38:22.303Z",
        "__v": 0
    },
    {
        "_id": "664b8016deb39370050235a1",
        "usuario": {
            "_id": "66465ffda50532daeec4771d",
            "name": "NOE MATURINO PEÑA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-21T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 2 *SE COBRA SOLO EL 50%*",
        "createdAt": "2024-05-20T16:53:42.660Z",
        "updatedAt": "2024-05-20T16:53:42.660Z",
        "__v": 0
    },
    {
        "_id": "664bcd8adeb393700502436c",
        "usuario": {
            "_id": "65bacef159368c1600970283",
            "name": "PATRICIA ALEJANDRA CRUZ PAREDES"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-21T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "createdAt": "2024-05-20T22:24:10.802Z",
        "updatedAt": "2024-05-21T00:30:51.040Z",
        "__v": 0,
        "comentarios": "SALA 2 - Chava"
    },
    {
        "_id": "664bd822deb39370050246b9",
        "usuario": {
            "_id": "6647d259878543e51e1b55dd",
            "name": "RODRIGO LOPEZ GARCINI"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-21T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1 (CONFIRMAR)",
        "createdAt": "2024-05-20T23:09:22.996Z",
        "updatedAt": "2024-05-20T23:44:57.337Z",
        "__v": 0
    },
    {
        "_id": "664bd8b0deb3937005024744",
        "usuario": {
            "_id": "664bd10ddeb39370050243ee",
            "name": "ESPERANZA FARIAS MORAN"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-20T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Primera vez",
        "createdAt": "2024-05-20T23:11:44.924Z",
        "updatedAt": "2024-05-20T23:11:57.500Z",
        "__v": 0
    },
    {
        "_id": "664be513deb39370050247ec",
        "usuario": {
            "_id": "664bd10ddeb39370050243ee",
            "name": "ESPERANZA FARIAS MORAN"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-22T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-21T00:04:35.877Z",
        "updatedAt": "2024-05-21T00:04:35.877Z",
        "__v": 0
    },
    {
        "_id": "664be784deb3937005024ac5",
        "usuario": {
            "_id": "663bffac66b40bf90114851c",
            "name": "DRAKO AGUILAR GONZÁLEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-23T23:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-21T00:15:00.883Z",
        "updatedAt": "2024-05-22T21:03:59.423Z",
        "__v": 0
    },
    {
        "_id": "664be7f5deb3937005024b0f",
        "usuario": {
            "_id": "664be6fcdeb39370050249ca",
            "name": "MARTHA IMELDA PIMENTEL OCHOA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-21T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "PACIENTE NUEVO EMT",
        "createdAt": "2024-05-21T00:16:53.518Z",
        "updatedAt": "2024-05-21T00:16:53.518Z",
        "__v": 0
    },
    {
        "_id": "664cbad321894f6e9cc6d11b",
        "usuario": {
            "_id": "64110302799c5d19e048a58c",
            "name": "JAIME GARCIA LOBATO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-21T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2, DOSIS -, CHAVA",
        "createdAt": "2024-05-21T15:16:35.120Z",
        "updatedAt": "2024-05-21T15:16:57.672Z",
        "__v": 0
    },
    {
        "_id": "664cd4b521894f6e9cc6d489",
        "usuario": {
            "_id": "664cd46c21894f6e9cc6d3c8",
            "name": "JUAN GABRIEL VELAZQUEZ GARCIA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-22T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2, DOSIS 1, CHAVA",
        "createdAt": "2024-05-21T17:07:01.166Z",
        "updatedAt": "2024-05-21T17:07:13.199Z",
        "__v": 0
    },
    {
        "_id": "664cdb2a21894f6e9cc6d687",
        "usuario": {
            "_id": "664cdb0521894f6e9cc6d604",
            "name": "MICHELLE GARIBAY"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-21T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "DOSIS UNICA, SALA 2, MARIANA",
        "createdAt": "2024-05-21T17:34:34.633Z",
        "updatedAt": "2024-05-21T17:34:34.633Z",
        "__v": 0
    },
    {
        "_id": "664cf12621894f6e9cc6dba2",
        "usuario": {
            "_id": "6647d259878543e51e1b55dd",
            "name": "RODRIGO LOPEZ GARCINI"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-22T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT",
        "createdAt": "2024-05-21T19:08:22.559Z",
        "updatedAt": "2024-05-21T19:08:22.559Z",
        "__v": 0
    },
    {
        "_id": "664d372121894f6e9cc6deb6",
        "usuario": {
            "_id": "664bd10ddeb39370050243ee",
            "name": "ESPERANZA FARIAS MORAN"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-23T00:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-22T00:06:57.661Z",
        "updatedAt": "2024-05-22T00:06:57.661Z",
        "__v": 0
    },
    {
        "_id": "664e1e3307aad8e24e84a199",
        "usuario": {
            "_id": "64272993fd79d28f49d63675",
            "name": "VANESSA IVONNE RODRIGUEZ ROSAS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-23T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2, DOSIS -, LORE",
        "createdAt": "2024-05-22T16:32:51.888Z",
        "updatedAt": "2024-05-22T23:50:22.934Z",
        "__v": 0
    },
    {
        "_id": "664e3d3207aad8e24e84a46e",
        "usuario": {
            "_id": "645bd353b555e198f5a597d9",
            "name": "MARIANA VARGAS GUTIERREZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-24T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Bloqueo - $0 - Bloqueo de citas",
        "id_servicio": "66171186b0c5f426d2e3b483",
        "createdAt": "2024-05-22T18:45:06.961Z",
        "updatedAt": "2024-05-22T18:45:06.961Z",
        "__v": 0
    },
    {
        "_id": "664e585a07aad8e24e84a6ed",
        "usuario": {
            "_id": "664bcc9bdeb39370050242c2",
            "name": "VANYA GIL SALDAÑA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-23T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 1 *LORE*",
        "createdAt": "2024-05-22T20:40:58.355Z",
        "updatedAt": "2024-05-22T20:40:58.355Z",
        "__v": 0
    },
    {
        "_id": "664e6ca207aad8e24e84a969",
        "usuario": {
            "_id": "663f8ed26642bb49b17b6471",
            "name": "RICARDO ZISNIEGA ARREOLA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-25T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 5",
        "createdAt": "2024-05-22T22:07:30.145Z",
        "updatedAt": "2024-05-22T22:07:30.145Z",
        "__v": 0
    },
    {
        "_id": "664e8f3b07aad8e24e84b125",
        "usuario": {
            "_id": "664bd10ddeb39370050243ee",
            "name": "ESPERANZA FARIAS MORAN"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-24T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-23T00:35:07.992Z",
        "updatedAt": "2024-05-23T00:35:07.992Z",
        "__v": 0
    },
    {
        "_id": "664f68bbdb4e664a8c5f8ed0",
        "usuario": {
            "_id": "652595df4725902e21f12a1d",
            "name": "ANGEL CAHUE DIAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-30T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Bloqueo - $0 - Bloqueo de citas",
        "id_servicio": "661711bbb0c5f426d2e3b510",
        "comentarios": "Bloqueo",
        "createdAt": "2024-05-23T16:03:07.651Z",
        "updatedAt": "2024-05-23T16:03:07.651Z",
        "__v": 0
    },
    {
        "_id": "664f7798db4e664a8c5f9698",
        "usuario": {
            "_id": "66479c9e878543e51e1b5204",
            "name": "ROBERTO CARDENAS GARCIA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-28T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 3 ATIENDE MARIANA ",
        "createdAt": "2024-05-23T17:06:32.443Z",
        "updatedAt": "2024-05-23T17:06:32.443Z",
        "__v": 0
    },
    {
        "_id": "664f792edb4e664a8c5f98b1",
        "usuario": {
            "_id": "663c000c66b40bf9011485d0",
            "name": "MARIA DE LOS ANGELES SOLORIO HERNANDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-27T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 6 *MARIANA*",
        "createdAt": "2024-05-23T17:13:18.581Z",
        "updatedAt": "2024-05-23T17:13:18.581Z",
        "__v": 0
    },
    {
        "_id": "664f7d1adb4e664a8c5f9918",
        "usuario": {
            "_id": "6615cfb9b68fb74224324edb",
            "name": "ALONDRA SELENE FERNANDEZ MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-25T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 6 *MARIANA*",
        "createdAt": "2024-05-23T17:30:02.308Z",
        "updatedAt": "2024-05-23T17:30:23.446Z",
        "__v": 0
    },
    {
        "_id": "664f8064db4e664a8c5f9d45",
        "usuario": {
            "_id": "664f8041db4e664a8c5f9cc4",
            "name": "LUZ GLORIA BORREGO CARDOZO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-28T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 1 *MARIANA*",
        "createdAt": "2024-05-23T17:44:04.933Z",
        "updatedAt": "2024-05-23T17:44:04.933Z",
        "__v": 0
    },
    {
        "_id": "664f8f5adb4e664a8c5fa885",
        "usuario": {
            "_id": "66465ffda50532daeec4771d",
            "name": "NOE MATURINO PEÑA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-24T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 3 *LORE*",
        "createdAt": "2024-05-23T18:47:54.246Z",
        "updatedAt": "2024-05-24T18:16:17.153Z",
        "__v": 0
    },
    {
        "_id": "664fd94cdb4e664a8c5fb0d8",
        "usuario": {
            "_id": "664fd837db4e664a8c5fb057",
            "name": "GONZALO DÍAZ BARRIGA BORREGO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-28T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 1 *MARIANA*",
        "createdAt": "2024-05-24T00:03:24.100Z",
        "updatedAt": "2024-05-24T00:03:24.100Z",
        "__v": 0
    },
    {
        "_id": "664fd9e2db4e664a8c5fb0e8",
        "usuario": {
            "_id": "664bd10ddeb39370050243ee",
            "name": "ESPERANZA FARIAS MORAN"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-24T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-24T00:05:54.544Z",
        "updatedAt": "2024-05-24T00:05:54.544Z",
        "__v": 0
    },
    {
        "_id": "6650abeefb8cc5856175762f",
        "usuario": {
            "_id": "664bcc9bdeb39370050242c2",
            "name": "VANYA GIL SALDAÑA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-24T20:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 2 *MARIANA*",
        "createdAt": "2024-05-24T15:02:06.585Z",
        "updatedAt": "2024-05-24T15:02:06.585Z",
        "__v": 0
    },
    {
        "_id": "6650d988fb8cc58561757f4d",
        "usuario": {
            "_id": "6617175ab0c5f426d2e3bb7c",
            "name": "XAVIER CALDERON HERNANDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-24T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 6 *LORE*",
        "createdAt": "2024-05-24T18:16:40.665Z",
        "updatedAt": "2024-05-24T18:16:40.665Z",
        "__v": 0
    },
    {
        "_id": "6650fd6efb8cc58561758195",
        "usuario": {
            "_id": "663bffac66b40bf90114851c",
            "name": "DRAKO AGUILAR GONZÁLEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-25T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-05-24T20:49:50.183Z",
        "updatedAt": "2024-05-24T20:49:56.689Z",
        "__v": 0
    },
    {
        "_id": "66520e8f0b60db721d19d8b6",
        "usuario": {
            "_id": "663f8ed26642bb49b17b6471",
            "name": "RICARDO ZISNIEGA ARREOLA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-29T21:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 6",
        "createdAt": "2024-05-25T16:15:11.221Z",
        "updatedAt": "2024-05-25T16:15:11.221Z",
        "__v": 0
    },
    {
        "_id": "6653dda79d2b69fb5327863b",
        "usuario": {
            "_id": "664bd10ddeb39370050243ee",
            "name": "ESPERANZA FARIAS MORAN"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-28T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-27T01:11:03.482Z",
        "updatedAt": "2024-05-27T01:11:03.482Z",
        "__v": 0
    },
    {
        "_id": "6654b2d2aebd91d65cd75ee2",
        "usuario": {
            "_id": "66353de092b4666519ce6e89",
            "name": "JUAN MANUEL MENDOZA DÍAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-27T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT *Angel*",
        "createdAt": "2024-05-27T16:20:34.267Z",
        "updatedAt": "2024-05-27T16:20:34.267Z",
        "__v": 0
    },
    {
        "_id": "6654c833aebd91d65cd761a0",
        "usuario": {
            "_id": "6619b926576dae45119608b4",
            "name": "MORELIA JAZMIN LAZARO BUSTOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-30T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "SALA 1 EMT *1 VEZ",
        "createdAt": "2024-05-27T17:51:47.576Z",
        "updatedAt": "2024-05-27T17:51:47.576Z",
        "__v": 0
    },
    {
        "_id": "6654c8a2aebd91d65cd761a6",
        "usuario": {
            "_id": "664bcc9bdeb39370050242c2",
            "name": "VANYA GIL SALDAÑA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-29T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 3",
        "createdAt": "2024-05-27T17:53:38.303Z",
        "updatedAt": "2024-05-27T17:53:38.303Z",
        "__v": 0
    },
    {
        "_id": "6654dfe9aebd91d65cd7692d",
        "usuario": {
            "_id": "663bffac66b40bf90114851c",
            "name": "DRAKO AGUILAR GONZÁLEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-27T23:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-05-27T19:32:57.676Z",
        "updatedAt": "2024-05-27T19:32:57.676Z",
        "__v": 0
    },
    {
        "_id": "6654f7ddaebd91d65cd76a72",
        "usuario": {
            "_id": "6654f78aaebd91d65cd769ef",
            "name": "Yolanda Campos Martinez"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-28T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-05-27T21:15:09.144Z",
        "updatedAt": "2024-05-27T21:15:09.144Z",
        "__v": 0
    },
    {
        "_id": "66551289aebd91d65cd76b04",
        "usuario": {
            "_id": "66294aff9ce7404d2e0cbab5",
            "name": "SELENE ESPINAL CORONEL"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-28T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 7",
        "createdAt": "2024-05-27T23:08:57.169Z",
        "updatedAt": "2024-05-27T23:08:57.169Z",
        "__v": 0
    },
    {
        "_id": "66552264aebd91d65cd76bfb",
        "usuario": {
            "_id": "664bd10ddeb39370050243ee",
            "name": "ESPERANZA FARIAS MORAN"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-29T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-28T00:16:36.285Z",
        "updatedAt": "2024-05-28T00:16:36.285Z",
        "__v": 0
    },
    {
        "_id": "66552599aebd91d65cd76ce2",
        "usuario": {
            "_id": "660f21b1f00926a772b997d6",
            "name": "EMMANUEL TREVIÑO MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-28T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-28T00:30:17.738Z",
        "updatedAt": "2024-05-28T00:30:17.738Z",
        "__v": 0
    },
    {
        "_id": "66561459eb7fd16ae9a3e5c9",
        "usuario": {
            "_id": "66479c9e878543e51e1b5204",
            "name": "ROBERTO CARDENAS GARCIA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-30T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 4",
        "createdAt": "2024-05-28T17:28:57.740Z",
        "updatedAt": "2024-05-28T17:28:57.740Z",
        "__v": 0
    },
    {
        "_id": "66561a22eb7fd16ae9a3e5d1",
        "usuario": {
            "_id": "664be6fcdeb39370050249ca",
            "name": "MARTHA IMELDA PIMENTEL OCHOA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-28T21:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT *ANGEL*",
        "createdAt": "2024-05-28T17:53:38.979Z",
        "updatedAt": "2024-05-28T17:53:38.979Z",
        "__v": 0
    },
    {
        "_id": "66561e6feb7fd16ae9a3e5d9",
        "usuario": {
            "_id": "646d1a694c0254e92dd23900",
            "name": "ANGELITA GUZMÀN BARAJAS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-29T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-05-28T18:11:59.257Z",
        "updatedAt": "2024-05-28T18:11:59.257Z",
        "__v": 0
    },
    {
        "_id": "6656568aeb7fd16ae9a3e7b5",
        "usuario": {
            "_id": "664be6fcdeb39370050249ca",
            "name": "MARTHA IMELDA PIMENTEL OCHOA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-29T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-28T22:11:22.667Z",
        "updatedAt": "2024-05-28T22:11:22.667Z",
        "__v": 0
    },
    {
        "_id": "6656619deb7fd16ae9a3e90c",
        "usuario": {
            "_id": "6654f78aaebd91d65cd769ef",
            "name": "Yolanda Campos Martinez"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-04T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 2 ",
        "createdAt": "2024-05-28T22:58:37.966Z",
        "updatedAt": "2024-05-28T22:58:37.966Z",
        "__v": 0
    },
    {
        "_id": "6656776deb7fd16ae9a3e9fc",
        "usuario": {
            "_id": "664bd10ddeb39370050243ee",
            "name": "ESPERANZA FARIAS MORAN"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-30T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-29T00:31:41.783Z",
        "updatedAt": "2024-05-29T00:31:41.783Z",
        "__v": 0
    },
    {
        "_id": "66574e90f1505b08661fce70",
        "usuario": {
            "_id": "663bffac66b40bf90114851c",
            "name": "DRAKO AGUILAR GONZÁLEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-29T23:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT ",
        "createdAt": "2024-05-29T15:49:36.810Z",
        "updatedAt": "2024-05-29T15:49:36.810Z",
        "__v": 0
    },
    {
        "_id": "66576a94f1505b08661fcf9a",
        "usuario": {
            "_id": "65fb5e113ce837e978e1489a",
            "name": "PERLA IVETT ARIZMENDI HERNÁNDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-04T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-05-29T17:49:08.177Z",
        "updatedAt": "2024-06-04T15:52:29.732Z",
        "__v": 0
    },
    {
        "_id": "66576f5bf1505b08661fd1da",
        "usuario": {
            "_id": "66576f33f1505b08661fd159",
            "name": "LILIANA HERNANDEZ CRISTOBAL"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-03T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-05-29T18:09:31.913Z",
        "updatedAt": "2024-05-29T18:09:31.913Z",
        "__v": 0
    },
    {
        "_id": "66576f71f1505b08661fd1e0",
        "usuario": {
            "_id": "66576f33f1505b08661fd159",
            "name": "LILIANA HERNANDEZ CRISTOBAL"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-05T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-05-29T18:09:53.600Z",
        "updatedAt": "2024-05-29T18:09:53.600Z",
        "__v": 0
    },
    {
        "_id": "66577dc7f1505b08661fd854",
        "usuario": {
            "_id": "664be6fcdeb39370050249ca",
            "name": "MARTHA IMELDA PIMENTEL OCHOA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-30T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-05-29T19:11:03.168Z",
        "updatedAt": "2024-05-30T00:01:11.691Z",
        "__v": 0
    },
    {
        "_id": "6658a469aee9140b0973c665",
        "usuario": {
            "_id": "664bd10ddeb39370050243ee",
            "name": "ESPERANZA FARIAS MORAN"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-31T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-30T16:08:09.877Z",
        "updatedAt": "2024-05-30T16:08:09.877Z",
        "__v": 0
    },
    {
        "_id": "6658c03daee9140b0973c77c",
        "usuario": {
            "_id": "6619b926576dae45119608b4",
            "name": "MORELIA JAZMIN LAZARO BUSTOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-31T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-05-30T18:06:53.529Z",
        "updatedAt": "2024-05-30T18:06:53.529Z",
        "__v": 0
    },
    {
        "_id": "6658cbb3aee9140b0973c7dc",
        "usuario": {
            "_id": "664be6fcdeb39370050249ca",
            "name": "MARTHA IMELDA PIMENTEL OCHOA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-31T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-05-30T18:55:47.864Z",
        "updatedAt": "2024-05-30T18:55:47.864Z",
        "__v": 0
    },
    {
        "_id": "6658ddb4aee9140b0973c923",
        "usuario": {
            "_id": "66465ffda50532daeec4771d",
            "name": "NOE MATURINO PEÑA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-31T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 4 *MARIANA*",
        "createdAt": "2024-05-30T20:12:36.592Z",
        "updatedAt": "2024-05-30T20:12:36.592Z",
        "__v": 0
    },
    {
        "_id": "6658ddebaee9140b0973c92b",
        "usuario": {
            "_id": "664bcc9bdeb39370050242c2",
            "name": "VANYA GIL SALDAÑA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-30T23:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 5 *CHAVA*",
        "createdAt": "2024-05-30T20:13:31.162Z",
        "updatedAt": "2024-05-30T20:13:31.162Z",
        "__v": 0
    },
    {
        "_id": "6658f3a5aee9140b0973ca3d",
        "usuario": {
            "_id": "6658f34faee9140b0973c9bc",
            "name": "ERICK PASCUAL BARRERA TENA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-05-30T21:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 1 *ATIENDE MARIANA*",
        "createdAt": "2024-05-30T21:46:13.312Z",
        "updatedAt": "2024-05-30T21:46:13.312Z",
        "__v": 0
    },
    {
        "_id": "6658f3bbaee9140b0973ca45",
        "usuario": {
            "_id": "6658f34faee9140b0973c9bc",
            "name": "ERICK PASCUAL BARRERA TENA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-01T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 2 *MARIANA*",
        "createdAt": "2024-05-30T21:46:35.449Z",
        "updatedAt": "2024-05-30T21:46:35.449Z",
        "__v": 0
    },
    {
        "_id": "665902a9aee9140b0973ca7d",
        "usuario": {
            "_id": "663c000c66b40bf9011485d0",
            "name": "MARIA DE LOS ANGELES SOLORIO HERNANDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-03T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 7 *MARIANA*",
        "createdAt": "2024-05-30T22:50:17.455Z",
        "updatedAt": "2024-05-30T22:50:36.925Z",
        "__v": 0
    },
    {
        "_id": "66591378aee9140b0973cde0",
        "usuario": {
            "_id": "6659135baee9140b0973cd5f",
            "name": "BYRON BAUTISTA MALDONADO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-06T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 1 ",
        "createdAt": "2024-05-31T00:02:00.111Z",
        "updatedAt": "2024-06-03T18:03:41.590Z",
        "__v": 0
    },
    {
        "_id": "66591685aee9140b0973ce64",
        "usuario": {
            "_id": "664bd10ddeb39370050243ee",
            "name": "ESPERANZA FARIAS MORAN"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-01T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-05-31T00:15:01.825Z",
        "updatedAt": "2024-05-31T00:15:01.825Z",
        "__v": 0
    },
    {
        "_id": "6659ebb0f4fff23e1006e5d1",
        "usuario": {
            "_id": "6619b926576dae45119608b4",
            "name": "MORELIA JAZMIN LAZARO BUSTOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-03T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT ",
        "createdAt": "2024-05-31T15:24:32.936Z",
        "updatedAt": "2024-05-31T15:24:32.936Z",
        "__v": 0
    },
    {
        "_id": "6659ebcaf4fff23e1006e5d7",
        "usuario": {
            "_id": "6619b926576dae45119608b4",
            "name": "MORELIA JAZMIN LAZARO BUSTOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-05T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT ",
        "createdAt": "2024-05-31T15:24:58.408Z",
        "updatedAt": "2024-05-31T15:24:58.408Z",
        "__v": 0
    },
    {
        "_id": "6659ebd7f4fff23e1006e5dd",
        "usuario": {
            "_id": "6619b926576dae45119608b4",
            "name": "MORELIA JAZMIN LAZARO BUSTOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-06T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-05-31T15:25:11.803Z",
        "updatedAt": "2024-05-31T15:25:11.803Z",
        "__v": 0
    },
    {
        "_id": "665a13cff4fff23e1006e79a",
        "usuario": {
            "_id": "664be6fcdeb39370050249ca",
            "name": "MARTHA IMELDA PIMENTEL OCHOA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-01T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-05-31T18:15:43.719Z",
        "updatedAt": "2024-05-31T18:15:43.719Z",
        "__v": 0
    },
    {
        "_id": "665a13e4f4fff23e1006e7a0",
        "usuario": {
            "_id": "664be6fcdeb39370050249ca",
            "name": "MARTHA IMELDA PIMENTEL OCHOA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-03T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-05-31T18:16:04.358Z",
        "updatedAt": "2024-05-31T18:16:04.358Z",
        "__v": 0
    },
    {
        "_id": "665a69e2f4fff23e1006ebdd",
        "usuario": {
            "_id": "664bd10ddeb39370050243ee",
            "name": "ESPERANZA FARIAS MORAN"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-04T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-06-01T00:22:58.735Z",
        "updatedAt": "2024-06-01T00:22:58.735Z",
        "__v": 0
    },
    {
        "_id": "665a69fcf4fff23e1006ebe3",
        "usuario": {
            "_id": "664bd10ddeb39370050243ee",
            "name": "ESPERANZA FARIAS MORAN"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-05T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-06-01T00:23:24.701Z",
        "updatedAt": "2024-06-01T00:23:24.701Z",
        "__v": 0
    },
    {
        "_id": "665a6a32f4fff23e1006ebe9",
        "usuario": {
            "_id": "664bd10ddeb39370050243ee",
            "name": "ESPERANZA FARIAS MORAN"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-06T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-06-01T00:24:18.704Z",
        "updatedAt": "2024-06-01T00:24:18.704Z",
        "__v": 0
    },
    {
        "_id": "665b48c7273879af11e8e3ad",
        "usuario": {
            "_id": "6658c791aee9140b0973c7ae",
            "name": "ERICK PASCUAL BARRERA TENA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-03T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 3",
        "createdAt": "2024-06-01T16:13:59.921Z",
        "updatedAt": "2024-06-01T16:13:59.921Z",
        "__v": 0
    },
    {
        "_id": "665b48d5273879af11e8e3b3",
        "usuario": {
            "_id": "6658c791aee9140b0973c7ae",
            "name": "ERICK PASCUAL BARRERA TENA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-05T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 4",
        "createdAt": "2024-06-01T16:14:13.576Z",
        "updatedAt": "2024-06-01T16:14:13.576Z",
        "__v": 0
    },
    {
        "_id": "665b61ac273879af11e8e996",
        "usuario": {
            "_id": "663bffac66b40bf90114851c",
            "name": "DRAKO AGUILAR GONZÁLEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-01T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-01T18:00:12.051Z",
        "updatedAt": "2024-06-01T18:00:12.051Z",
        "__v": 0
    },
    {
        "_id": "665b6873273879af11e8eefb",
        "usuario": {
            "_id": "663bffac66b40bf90114851c",
            "name": "DRAKO AGUILAR GONZÁLEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-03T23:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "SLA 1 EMT",
        "createdAt": "2024-06-01T18:29:07.585Z",
        "updatedAt": "2024-06-01T18:29:07.585Z",
        "__v": 0
    },
    {
        "_id": "665de0c7de4c0117f8558ef5",
        "usuario": {
            "_id": "6619b926576dae45119608b4",
            "name": "MORELIA JAZMIN LAZARO BUSTOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-04T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-06-03T15:27:03.332Z",
        "updatedAt": "2024-06-03T15:27:03.332Z",
        "__v": 0
    },
    {
        "_id": "665de62ade4c0117f8558fc0",
        "usuario": {
            "_id": "665de613de4c0117f8558f3b",
            "name": "ROSA MARIA LIEVANOS HUAPE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-14T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-03T15:50:02.760Z",
        "updatedAt": "2024-06-03T15:50:02.760Z",
        "__v": 0
    },
    {
        "_id": "665de63dde4c0117f8558fc6",
        "usuario": {
            "_id": "665de613de4c0117f8558f3b",
            "name": "ROSA MARIA LIEVANOS HUAPE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-15T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-03T15:50:21.044Z",
        "updatedAt": "2024-06-13T18:33:28.995Z",
        "__v": 0
    },
    {
        "_id": "665df9adde4c0117f855914b",
        "usuario": {
            "_id": "663c000c66b40bf9011485d0",
            "name": "MARIA DE LOS ANGELES SOLORIO HERNANDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-06T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 8",
        "createdAt": "2024-06-03T17:13:17.561Z",
        "updatedAt": "2024-06-03T17:13:17.561Z",
        "__v": 0
    },
    {
        "_id": "665e0196de4c0117f8559271",
        "usuario": {
            "_id": "665e016ade4c0117f855920d",
            "name": "MARIA FERNANDA DE MONSERRAT FRAGA  CANO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-04T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 1 DOSIS 2",
        "createdAt": "2024-06-03T17:47:02.725Z",
        "updatedAt": "2024-06-03T17:47:02.725Z",
        "__v": 0
    },
    {
        "_id": "665e11f6de4c0117f8559347",
        "usuario": {
            "_id": "652595df4725902e21f12a1d",
            "name": "ANGEL CAHUE DIAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-10T20:30:00.000Z",
        "duracion": 150,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Bloqueo - $0 - Bloqueo de citas",
        "id_servicio": "661711bbb0c5f426d2e3b510",
        "comentarios": "BLOQUEO",
        "createdAt": "2024-06-03T18:56:54.194Z",
        "updatedAt": "2024-06-03T18:57:06.111Z",
        "__v": 0
    },
    {
        "_id": "665e1d55de4c0117f8559426",
        "usuario": {
            "_id": "6647d259878543e51e1b55dd",
            "name": "RODRIGO LOPEZ GARCINI"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-04T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-03T19:45:25.596Z",
        "updatedAt": "2024-06-03T21:16:55.145Z",
        "__v": 0
    },
    {
        "_id": "665e34a7de4c0117f855955b",
        "usuario": {
            "_id": "665a162ff4fff23e1006e8e4",
            "name": "ANA LAURA JUAREZ GONZALEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-03T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-03T21:24:55.891Z",
        "updatedAt": "2024-06-03T21:24:55.891Z",
        "__v": 0
    },
    {
        "_id": "665e3590de4c0117f8559565",
        "usuario": {
            "_id": "66576f33f1505b08661fd159",
            "name": "LILIANA HERNANDEZ CRISTOBAL"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-05-31T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-06-03T21:28:48.152Z",
        "updatedAt": "2024-06-03T21:28:48.152Z",
        "__v": 0
    },
    {
        "_id": "665e4735de4c0117f85595f2",
        "usuario": {
            "_id": "664be6fcdeb39370050249ca",
            "name": "MARTHA IMELDA PIMENTEL OCHOA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-04T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-03T22:44:05.803Z",
        "updatedAt": "2024-06-03T22:44:05.803Z",
        "__v": 0
    },
    {
        "_id": "665e474fde4c0117f85595f8",
        "usuario": {
            "_id": "664be6fcdeb39370050249ca",
            "name": "MARTHA IMELDA PIMENTEL OCHOA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-05T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-03T22:44:31.898Z",
        "updatedAt": "2024-06-03T22:44:31.898Z",
        "__v": 0
    },
    {
        "_id": "665e4772de4c0117f85595fe",
        "usuario": {
            "_id": "664be6fcdeb39370050249ca",
            "name": "MARTHA IMELDA PIMENTEL OCHOA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-06T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-03T22:45:06.683Z",
        "updatedAt": "2024-06-03T22:45:06.683Z",
        "__v": 0
    },
    {
        "_id": "665e4782de4c0117f8559604",
        "usuario": {
            "_id": "664be6fcdeb39370050249ca",
            "name": "MARTHA IMELDA PIMENTEL OCHOA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-07T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-03T22:45:22.364Z",
        "updatedAt": "2024-06-06T18:25:07.743Z",
        "__v": 0
    },
    {
        "_id": "665e5971de4c0117f8559722",
        "usuario": {
            "_id": "65bbf9bff104743ebf0d14c9",
            "name": "PAULINA GARCIA SANDOVAL"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-04T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 1 DOSIS REF",
        "createdAt": "2024-06-04T00:01:53.379Z",
        "updatedAt": "2024-06-04T00:01:53.379Z",
        "__v": 0
    },
    {
        "_id": "665f3639df3ed1529e9bdc2b",
        "usuario": {
            "_id": "6619b926576dae45119608b4",
            "name": "MORELIA JAZMIN LAZARO BUSTOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-07T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-06-04T15:43:53.657Z",
        "updatedAt": "2024-06-04T15:43:53.657Z",
        "__v": 0
    },
    {
        "_id": "665f3ae1df3ed1529e9bdc37",
        "usuario": {
            "_id": "665a162ff4fff23e1006e8e4",
            "name": "ANA LAURA JUAREZ GONZALEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-05T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-04T16:03:45.591Z",
        "updatedAt": "2024-06-04T16:03:45.591Z",
        "__v": 0
    },
    {
        "_id": "665f4b6adf3ed1529e9bdc43",
        "usuario": {
            "_id": "64d40047d5a2cd26acd74af9",
            "name": "DAVID ZEPEDA FIGUEROA "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-08T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS REF TX 2000 *MARIANA*",
        "createdAt": "2024-06-04T17:14:18.857Z",
        "updatedAt": "2024-06-04T17:14:18.857Z",
        "__v": 0
    },
    {
        "_id": "665f4babdf3ed1529e9bdc49",
        "usuario": {
            "_id": "664bcc9bdeb39370050242c2",
            "name": "VANYA GIL SALDAÑA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-05T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 4",
        "createdAt": "2024-06-04T17:15:23.145Z",
        "updatedAt": "2024-06-04T17:15:41.417Z",
        "__v": 0
    },
    {
        "_id": "665f5ee1df3ed1529e9bdcf5",
        "usuario": {
            "_id": "665e016ade4c0117f855920d",
            "name": "MARIA FERNANDA DE MONSERRAT FRAGA  CANO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-07T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 3 *ATIENDE MARIANA*",
        "createdAt": "2024-06-04T18:37:21.693Z",
        "updatedAt": "2024-06-04T18:37:21.693Z",
        "__v": 0
    },
    {
        "_id": "665f8d21df3ed1529e9bde97",
        "usuario": {
            "_id": "66465ffda50532daeec4771d",
            "name": "NOE MATURINO PEÑA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-05T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 5",
        "createdAt": "2024-06-04T21:54:41.857Z",
        "updatedAt": "2024-06-04T21:54:41.857Z",
        "__v": 0
    },
    {
        "_id": "665f8fc2df3ed1529e9bdea3",
        "usuario": {
            "_id": "66294aff9ce7404d2e0cbab5",
            "name": "SELENE ESPINAL CORONEL"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-05T19:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 8",
        "createdAt": "2024-06-04T22:05:54.922Z",
        "updatedAt": "2024-06-04T22:05:54.922Z",
        "__v": 0
    },
    {
        "_id": "6660a06a6e812f0f7e20aef7",
        "usuario": {
            "_id": "665a162ff4fff23e1006e8e4",
            "name": "ANA LAURA JUAREZ GONZALEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-06T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-05T17:29:14.128Z",
        "updatedAt": "2024-06-05T17:29:14.128Z",
        "__v": 0
    },
    {
        "_id": "6660a0816e812f0f7e20aeff",
        "usuario": {
            "_id": "665a162ff4fff23e1006e8e4",
            "name": "ANA LAURA JUAREZ GONZALEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-07T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-05T17:29:37.532Z",
        "updatedAt": "2024-06-05T17:29:37.532Z",
        "__v": 0
    },
    {
        "_id": "6660a0aa6e812f0f7e20af22",
        "usuario": {
            "_id": "665a162ff4fff23e1006e8e4",
            "name": "ANA LAURA JUAREZ GONZALEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-08T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-05T17:30:18.054Z",
        "updatedAt": "2024-06-05T17:30:18.054Z",
        "__v": 0
    },
    {
        "_id": "6660a0d56e812f0f7e20af65",
        "usuario": {
            "_id": "665a162ff4fff23e1006e8e4",
            "name": "ANA LAURA JUAREZ GONZALEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-12T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-05T17:31:01.112Z",
        "updatedAt": "2024-06-10T21:36:25.798Z",
        "__v": 0
    },
    {
        "_id": "6660a0e76e812f0f7e20af89",
        "usuario": {
            "_id": "665a162ff4fff23e1006e8e4",
            "name": "ANA LAURA JUAREZ GONZALEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-13T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-05T17:31:19.025Z",
        "updatedAt": "2024-06-10T23:22:04.025Z",
        "__v": 0
    },
    {
        "_id": "6660a0f36e812f0f7e20af8f",
        "usuario": {
            "_id": "665a162ff4fff23e1006e8e4",
            "name": "ANA LAURA JUAREZ GONZALEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-14T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-05T17:31:31.874Z",
        "updatedAt": "2024-06-10T23:22:12.224Z",
        "__v": 0
    },
    {
        "_id": "6660d9556e812f0f7e20b820",
        "usuario": {
            "_id": "6660d8ff6e812f0f7e20b75d",
            "name": "LETICIA SOLIS HERNANDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-05T19:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-06-05T21:32:05.108Z",
        "updatedAt": "2024-06-05T21:32:05.108Z",
        "__v": 0
    },
    {
        "_id": "6660eed56e812f0f7e20b9cf",
        "usuario": {
            "_id": "6660ee3a6e812f0f7e20b93e",
            "name": "EDGAR CALDERON RODRIGUEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-08T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 1 ",
        "createdAt": "2024-06-05T23:03:49.145Z",
        "updatedAt": "2024-06-05T23:03:49.145Z",
        "__v": 0
    },
    {
        "_id": "6661e8890fe04de71a7f69aa",
        "usuario": {
            "_id": "663bffac66b40bf90114851c",
            "name": "DRAKO AGUILAR GONZÁLEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-06T23:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-06T16:49:13.410Z",
        "updatedAt": "2024-06-06T16:49:13.410Z",
        "__v": 0
    },
    {
        "_id": "666206160fe04de71a7f7343",
        "usuario": {
            "_id": "65bbf9bff104743ebf0d14c9",
            "name": "PAULINA GARCIA SANDOVAL"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-07T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 4 *LORE*",
        "createdAt": "2024-06-06T18:55:18.735Z",
        "updatedAt": "2024-06-06T18:55:38.573Z",
        "__v": 0
    },
    {
        "_id": "666230353a9c57ed437a564b",
        "usuario": {
            "_id": "666230183a9c57ed437a5588",
            "name": "JUAN JOSUÉ HERNANDEZ TAPIA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-07T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-06-06T21:55:01.990Z",
        "updatedAt": "2024-06-06T21:55:01.990Z",
        "__v": 0
    },
    {
        "_id": "6662395f3a9c57ed437a5651",
        "usuario": {
            "_id": "65690b538c7e002f5fd6b56b",
            "name": "ASHANTIE AYALA AYALA "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-11T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-06-06T22:34:07.574Z",
        "updatedAt": "2024-06-10T21:43:25.861Z",
        "__v": 0
    },
    {
        "_id": "666243833a9c57ed437a5657",
        "usuario": {
            "_id": "6659135baee9140b0973cd5f",
            "name": "BYRON BAUTISTA MALDONADO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-08T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-06-06T23:17:23.145Z",
        "updatedAt": "2024-06-06T23:17:23.145Z",
        "__v": 0
    },
    {
        "_id": "666243c73a9c57ed437a565d",
        "usuario": {
            "_id": "6659135baee9140b0973cd5f",
            "name": "BYRON BAUTISTA MALDONADO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-13T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 3",
        "createdAt": "2024-06-06T23:18:31.956Z",
        "updatedAt": "2024-06-06T23:18:31.956Z",
        "__v": 0
    },
    {
        "_id": "666244393a9c57ed437a5663",
        "usuario": {
            "_id": "6659135baee9140b0973cd5f",
            "name": "BYRON BAUTISTA MALDONADO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-15T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 4",
        "createdAt": "2024-06-06T23:20:25.333Z",
        "updatedAt": "2024-06-06T23:20:25.333Z",
        "__v": 0
    },
    {
        "_id": "666244bc3a9c57ed437a5669",
        "usuario": {
            "_id": "6659135baee9140b0973cd5f",
            "name": "BYRON BAUTISTA MALDONADO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-20T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 5 CON TERAPIA",
        "createdAt": "2024-06-06T23:22:36.085Z",
        "updatedAt": "2024-06-06T23:22:36.085Z",
        "__v": 0
    },
    {
        "_id": "666244d53a9c57ed437a566f",
        "usuario": {
            "_id": "6659135baee9140b0973cd5f",
            "name": "BYRON BAUTISTA MALDONADO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-22T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 6",
        "createdAt": "2024-06-06T23:23:01.976Z",
        "updatedAt": "2024-06-20T22:08:11.099Z",
        "__v": 0
    },
    {
        "_id": "66624d423a9c57ed437a5771",
        "usuario": {
            "_id": "663bffac66b40bf90114851c",
            "name": "DRAKO AGUILAR GONZÁLEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-08T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-06-06T23:58:58.763Z",
        "updatedAt": "2024-06-06T23:58:58.763Z",
        "__v": 0
    },
    {
        "_id": "66624d5e3a9c57ed437a5777",
        "usuario": {
            "_id": "663bffac66b40bf90114851c",
            "name": "DRAKO AGUILAR GONZÁLEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-10T23:30:00.000Z",
        "duracion": 30,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-06-06T23:59:26.761Z",
        "updatedAt": "2024-06-10T16:31:36.875Z",
        "__v": 0
    },
    {
        "_id": "666326a96f5eb41b2709c18e",
        "usuario": {
            "_id": "6619b926576dae45119608b4",
            "name": "MORELIA JAZMIN LAZARO BUSTOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-10T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT ",
        "createdAt": "2024-06-07T15:26:33.660Z",
        "updatedAt": "2024-06-07T15:26:33.660Z",
        "__v": 0
    },
    {
        "_id": "666326ba6f5eb41b2709c194",
        "usuario": {
            "_id": "6619b926576dae45119608b4",
            "name": "MORELIA JAZMIN LAZARO BUSTOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-11T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-07T15:26:50.397Z",
        "updatedAt": "2024-06-07T15:26:50.397Z",
        "__v": 0
    },
    {
        "_id": "666326ca6f5eb41b2709c19a",
        "usuario": {
            "_id": "6619b926576dae45119608b4",
            "name": "MORELIA JAZMIN LAZARO BUSTOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-12T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-07T15:27:06.518Z",
        "updatedAt": "2024-06-07T15:27:06.518Z",
        "__v": 0
    },
    {
        "_id": "666333336f5eb41b2709c1a1",
        "usuario": {
            "_id": "664be6fcdeb39370050249ca",
            "name": "MARTHA IMELDA PIMENTEL OCHOA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-10T23:00:00.000Z",
        "duracion": 30,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-07T16:20:03.209Z",
        "updatedAt": "2024-06-10T16:31:29.081Z",
        "__v": 0
    },
    {
        "_id": "666333936f5eb41b2709c1a7",
        "usuario": {
            "_id": "664be6fcdeb39370050249ca",
            "name": "MARTHA IMELDA PIMENTEL OCHOA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-11T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-07T16:21:39.941Z",
        "updatedAt": "2024-06-10T23:03:39.383Z",
        "__v": 0
    },
    {
        "_id": "666333a86f5eb41b2709c1ad",
        "usuario": {
            "_id": "664be6fcdeb39370050249ca",
            "name": "MARTHA IMELDA PIMENTEL OCHOA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-12T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-07T16:22:00.414Z",
        "updatedAt": "2024-06-11T18:22:28.030Z",
        "__v": 0
    },
    {
        "_id": "666333b96f5eb41b2709c1b3",
        "usuario": {
            "_id": "664be6fcdeb39370050249ca",
            "name": "MARTHA IMELDA PIMENTEL OCHOA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-13T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-07T16:22:17.476Z",
        "updatedAt": "2024-06-10T23:22:50.391Z",
        "__v": 0
    },
    {
        "_id": "666345f36f5eb41b2709c284",
        "usuario": {
            "_id": "666345cf6f5eb41b2709c1ff",
            "name": "JORDAN SAUCEDO AVILA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-07T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 1 *Lore*",
        "createdAt": "2024-06-07T17:40:03.626Z",
        "updatedAt": "2024-06-07T17:40:03.626Z",
        "__v": 0
    },
    {
        "_id": "666348076f5eb41b2709c2ad",
        "usuario": {
            "_id": "666230183a9c57ed437a5588",
            "name": "JUAN JOSUÉ HERNANDEZ TAPIA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-03T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-06-07T17:48:55.997Z",
        "updatedAt": "2024-06-07T17:48:55.997Z",
        "__v": 0
    },
    {
        "_id": "66634e7e6f5eb41b2709c349",
        "usuario": {
            "_id": "66465ffda50532daeec4771d",
            "name": "NOE MATURINO PEÑA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-08T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 6 *MARIANA*",
        "createdAt": "2024-06-07T18:16:30.040Z",
        "updatedAt": "2024-06-07T18:16:39.379Z",
        "__v": 0
    },
    {
        "_id": "66634f666f5eb41b2709c357",
        "usuario": {
            "_id": "665e016ade4c0117f855920d",
            "name": "MARIA FERNANDA DE MONSERRAT FRAGA  CANO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-11T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 4",
        "createdAt": "2024-06-07T18:20:22.598Z",
        "updatedAt": "2024-06-10T22:55:24.236Z",
        "__v": 0
    },
    {
        "_id": "6663548d6f5eb41b2709c3a5",
        "usuario": {
            "_id": "6658f34faee9140b0973c9bc",
            "name": "ERICK PASCUAL BARRERA TENA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-10T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 5",
        "createdAt": "2024-06-07T18:42:21.604Z",
        "updatedAt": "2024-06-10T18:59:14.846Z",
        "__v": 0
    },
    {
        "_id": "6664851bd9629846a256d9fb",
        "usuario": {
            "_id": "660f21b1f00926a772b997d6",
            "name": "EMMANUEL TREVIÑO MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-08T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-06-08T16:21:47.205Z",
        "updatedAt": "2024-06-08T16:21:47.205Z",
        "__v": 0
    },
    {
        "_id": "6664ab0fd9629846a256db31",
        "usuario": {
            "_id": "65316db183776ca8ad729435",
            "name": "ALAN JASSIEL RODRIGUEZ LUNA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-11T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-06-08T19:03:43.539Z",
        "updatedAt": "2024-06-08T19:03:43.539Z",
        "__v": 0
    },
    {
        "_id": "66671d06a07017e7c9e30554",
        "usuario": {
            "_id": "657c7f39318087dbb5a67fbe",
            "name": "ARTURO CAMPOS DIAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-10T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT REF",
        "createdAt": "2024-06-10T15:34:30.358Z",
        "updatedAt": "2024-06-10T15:34:30.358Z",
        "__v": 0
    },
    {
        "_id": "66672584a07017e7c9e305a6",
        "usuario": {
            "_id": "666345cf6f5eb41b2709c1ff",
            "name": "JORDAN SAUCEDO AVILA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-13T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-06-10T16:10:44.946Z",
        "updatedAt": "2024-06-10T17:16:22.413Z",
        "__v": 0
    },
    {
        "_id": "666728c5a07017e7c9e30648",
        "usuario": {
            "_id": "636c3fe69a3c0025d9f5c7d9",
            "name": "TZIHUERITI CASTILLO CORREA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-10T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-06-10T16:24:37.640Z",
        "updatedAt": "2024-06-10T16:24:37.640Z",
        "__v": 0
    },
    {
        "_id": "66673af5a07017e7c9e308f6",
        "usuario": {
            "_id": "66467d96a50532daeec47aa2",
            "name": "IRMA ESTEFANIA RODRIGUEZ ZAMORA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-10T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 3",
        "createdAt": "2024-06-10T17:42:13.839Z",
        "updatedAt": "2024-06-10T17:42:13.839Z",
        "__v": 0
    },
    {
        "_id": "66673b12a07017e7c9e308fd",
        "usuario": {
            "_id": "666230183a9c57ed437a5588",
            "name": "JUAN JOSUÉ HERNANDEZ TAPIA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-10T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-06-10T17:42:42.601Z",
        "updatedAt": "2024-06-10T17:42:42.601Z",
        "__v": 0
    },
    {
        "_id": "66674017a07017e7c9e3090a",
        "usuario": {
            "_id": "657c7f39318087dbb5a67fbe",
            "name": "ARTURO CAMPOS DIAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-14T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-10T18:04:07.403Z",
        "updatedAt": "2024-06-10T18:04:07.403Z",
        "__v": 0
    },
    {
        "_id": "66674d27a07017e7c9e30982",
        "usuario": {
            "_id": "6658f34faee9140b0973c9bc",
            "name": "ERICK PASCUAL BARRERA TENA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-13T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 4",
        "createdAt": "2024-06-10T18:59:51.807Z",
        "updatedAt": "2024-06-10T18:59:51.807Z",
        "__v": 0
    },
    {
        "_id": "666867399e75250adec44e4c",
        "usuario": {
            "_id": "652595df4725902e21f12a1d",
            "name": "ANGEL CAHUE DIAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-24T18:30:00.000Z",
        "duracion": 150,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Bloqueo - $0 - Bloqueo de citas",
        "id_servicio": "661711bbb0c5f426d2e3b510",
        "comentarios": "BLOQUEO",
        "createdAt": "2024-06-11T15:03:21.487Z",
        "updatedAt": "2024-06-11T15:03:21.487Z",
        "__v": 0
    },
    {
        "_id": "666891ed9e75250adec45b49",
        "usuario": {
            "_id": "66465ffda50532daeec4771d",
            "name": "NOE MATURINO PEÑA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-12T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 6",
        "createdAt": "2024-06-11T18:05:33.585Z",
        "updatedAt": "2024-06-11T18:05:33.585Z",
        "__v": 0
    },
    {
        "_id": "666892219e75250adec45b51",
        "usuario": {
            "_id": "666230183a9c57ed437a5588",
            "name": "JUAN JOSUÉ HERNANDEZ TAPIA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-12T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 3",
        "createdAt": "2024-06-11T18:06:25.366Z",
        "updatedAt": "2024-06-11T18:06:25.366Z",
        "__v": 0
    },
    {
        "_id": "66689c209e75250adec45f2f",
        "usuario": {
            "_id": "661714cab0c5f426d2e3b7b5",
            "name": "BLOQUEO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311bdb9811c8b706435c2c",
            "name": "Tzihueriti Castillo"
        },
        "fecha_hora": "2024-06-18T17:30:00.000Z",
        "duracion": 120,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Bloqueo - $0 - Bloqueo de citas",
        "id_servicio": "661711e8b0c5f426d2e3b5b4",
        "createdAt": "2024-06-11T18:49:04.403Z",
        "updatedAt": "2024-06-11T18:49:26.497Z",
        "__v": 0,
        "comentarios": "CITA IMSS ENF MARIANA"
    },
    {
        "_id": "66689d089e75250adec45f5c",
        "usuario": {
            "_id": "661714cab0c5f426d2e3b7b5",
            "name": "BLOQUEO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-25T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Bloqueo - $0 - Bloqueo de citas",
        "id_servicio": "66171186b0c5f426d2e3b483",
        "comentarios": "CITA MEDICA MARIANA",
        "createdAt": "2024-06-11T18:52:56.733Z",
        "updatedAt": "2024-06-11T18:52:56.733Z",
        "__v": 0
    },
    {
        "_id": "6668c2b19e75250adec45fc8",
        "usuario": {
            "_id": "6647d259878543e51e1b55dd",
            "name": "RODRIGO LOPEZ GARCINI"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-12T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-11T21:33:37.058Z",
        "updatedAt": "2024-06-11T21:33:37.058Z",
        "__v": 0
    },
    {
        "_id": "6668c6839e75250adec46017",
        "usuario": {
            "_id": "6615924ab68fb742243243c3",
            "name": "DENISE DAVALOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-15T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT sala 1",
        "createdAt": "2024-06-11T21:49:55.773Z",
        "updatedAt": "2024-06-11T21:49:55.773Z",
        "__v": 0
    },
    {
        "_id": "6668cd989e75250adec4608e",
        "usuario": {
            "_id": "6424e95f96ee3c69af13facd",
            "name": "ORLANDO HERNANDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-11T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-06-11T22:20:08.793Z",
        "updatedAt": "2024-06-11T22:20:08.793Z",
        "__v": 0
    },
    {
        "_id": "6669bb967d0b46bc1e1188b4",
        "usuario": {
            "_id": "6619b926576dae45119608b4",
            "name": "MORELIA JAZMIN LAZARO BUSTOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-13T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-06-12T15:15:34.860Z",
        "updatedAt": "2024-06-12T15:15:34.860Z",
        "__v": 0
    },
    {
        "_id": "6669eeb67d0b46bc1e119910",
        "usuario": {
            "_id": "6647d259878543e51e1b55dd",
            "name": "RODRIGO LOPEZ GARCINI"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-13T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-12T18:53:42.088Z",
        "updatedAt": "2024-06-12T18:53:42.088Z",
        "__v": 0
    },
    {
        "_id": "666a314e7d0b46bc1e119b8d",
        "usuario": {
            "_id": "666a31307d0b46bc1e119b08",
            "name": "MARÍA ESENIA HUERTA MONDRAGON"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-13T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-06-12T23:37:50.583Z",
        "updatedAt": "2024-06-12T23:37:50.583Z",
        "__v": 0
    },
    {
        "_id": "666b1db8a897405182571f26",
        "usuario": {
            "_id": "6615cfb9b68fb74224324edb",
            "name": "ALONDRA SELENE FERNANDEZ MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-14T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 7",
        "createdAt": "2024-06-13T16:26:32.283Z",
        "updatedAt": "2024-06-14T00:01:14.719Z",
        "__v": 0
    },
    {
        "_id": "666b237ca897405182571f7a",
        "usuario": {
            "_id": "665de613de4c0117f8558f3b",
            "name": "ROSA MARIA LIEVANOS HUAPE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-13T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-13T16:51:08.614Z",
        "updatedAt": "2024-06-13T16:51:08.614Z",
        "__v": 0
    },
    {
        "_id": "666b30fea897405182571fce",
        "usuario": {
            "_id": "6647d259878543e51e1b55dd",
            "name": "RODRIGO LOPEZ GARCINI"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-14T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-06-13T17:48:46.185Z",
        "updatedAt": "2024-06-13T17:48:46.185Z",
        "__v": 0
    },
    {
        "_id": "666b4157a897405182571ff9",
        "usuario": {
            "_id": "6658f34faee9140b0973c9bc",
            "name": "ERICK PASCUAL BARRERA TENA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-18T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 5",
        "createdAt": "2024-06-13T18:58:31.642Z",
        "updatedAt": "2024-06-17T15:49:45.671Z",
        "__v": 0
    },
    {
        "_id": "666b41d3a897405182572002",
        "usuario": {
            "_id": "664be6fcdeb39370050249ca",
            "name": "MARTHA IMELDA PIMENTEL OCHOA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-27T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT REF",
        "createdAt": "2024-06-13T19:00:35.439Z",
        "updatedAt": "2024-06-13T19:00:35.439Z",
        "__v": 0
    },
    {
        "_id": "666b790aa897405182572252",
        "usuario": {
            "_id": "64272993fd79d28f49d63675",
            "name": "VANESSA IVONNE RODRIGUEZ ROSAS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-17T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-06-13T22:56:10.609Z",
        "updatedAt": "2024-06-13T22:56:10.609Z",
        "__v": 0
    },
    {
        "_id": "666b7947a897405182572258",
        "usuario": {
            "_id": "65690b538c7e002f5fd6b56b",
            "name": "ASHANTIE AYALA AYALA "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-11T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-06-13T22:57:11.297Z",
        "updatedAt": "2024-06-13T22:57:11.297Z",
        "__v": 0
    },
    {
        "_id": "666b79bba89740518257225e",
        "usuario": {
            "_id": "65bacef159368c1600970283",
            "name": "PATRICIA ALEJANDRA CRUZ PAREDES"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-18T22:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-06-13T22:59:07.402Z",
        "updatedAt": "2024-06-13T22:59:07.402Z",
        "__v": 0
    },
    {
        "_id": "666b8bdea8974051825722af",
        "usuario": {
            "_id": "666900d49e75250adec461eb",
            "name": "MARIA ESENIA HUERTA MONDRAGON"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-15T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-06-14T00:16:30.747Z",
        "updatedAt": "2024-06-14T00:16:30.747Z",
        "__v": 0
    },
    {
        "_id": "666c97e654ffa6e636fcdd77",
        "usuario": {
            "_id": "665a162ff4fff23e1006e8e4",
            "name": "ANA LAURA JUAREZ GONZALEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-15T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-06-14T19:20:07.022Z",
        "updatedAt": "2024-06-14T19:20:07.022Z",
        "__v": 0
    },
    {
        "_id": "666dced14403665871e92741",
        "usuario": {
            "_id": "652595df4725902e21f12a1d",
            "name": "ANGEL CAHUE DIAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-17T17:00:00.000Z",
        "duracion": 120,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Bloqueo - $0 - Bloqueo de citas",
        "id_servicio": "661711bbb0c5f426d2e3b510",
        "comentarios": "BLOQUEO PRESENTACIÓN TESIS ANGEL CAHUE",
        "createdAt": "2024-06-15T17:26:41.926Z",
        "updatedAt": "2024-06-15T17:26:41.926Z",
        "__v": 0
    },
    {
        "_id": "666dd1c44403665871e92747",
        "usuario": {
            "_id": "665de613de4c0117f8558f3b",
            "name": "ROSA MARIA LIEVANOS HUAPE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-17T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "SALA 1 EMT *Atiende Melissa*",
        "createdAt": "2024-06-15T17:39:16.486Z",
        "updatedAt": "2024-06-17T18:58:12.874Z",
        "__v": 0
    },
    {
        "_id": "666dd1d44403665871e9274d",
        "usuario": {
            "_id": "665de613de4c0117f8558f3b",
            "name": "ROSA MARIA LIEVANOS HUAPE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-18T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "SALA 1 EMT *Atiene melissa*",
        "createdAt": "2024-06-15T17:39:32.667Z",
        "updatedAt": "2024-06-24T16:59:58.810Z",
        "__v": 0
    },
    {
        "_id": "666dd1ee4403665871e92759",
        "usuario": {
            "_id": "665de613de4c0117f8558f3b",
            "name": "ROSA MARIA LIEVANOS HUAPE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-20T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "SALA 1 EMT *Atiene melissa*",
        "createdAt": "2024-06-15T17:39:58.684Z",
        "updatedAt": "2024-06-24T17:00:55.603Z",
        "__v": 0
    },
    {
        "_id": "66708109fe53c2350d0d0120",
        "usuario": {
            "_id": "6670807dfe53c2350d0d009b",
            "name": "FRANCISCO MURILLO DIAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-24T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "SALA 1 EMT *DEPRESION, ANSIEDAD, TABAQUISMO* SE AUTORIZO DESC. QUEDA EN $10000.00",
        "createdAt": "2024-06-17T18:31:37.951Z",
        "updatedAt": "2024-06-20T22:18:11.350Z",
        "__v": 0
    },
    {
        "_id": "66708718fe53c2350d0d06a4",
        "usuario": {
            "_id": "665a162ff4fff23e1006e8e4",
            "name": "ANA LAURA JUAREZ GONZALEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-17T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT *Atiende Melissa*",
        "createdAt": "2024-06-17T18:57:28.067Z",
        "updatedAt": "2024-06-17T18:58:30.324Z",
        "__v": 0
    },
    {
        "_id": "6670bb21fe53c2350d0d082c",
        "usuario": {
            "_id": "665a162ff4fff23e1006e8e4",
            "name": "ANA LAURA JUAREZ GONZALEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-21T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT *Atiene melissa*",
        "createdAt": "2024-06-17T22:39:29.872Z",
        "updatedAt": "2024-06-24T17:01:09.344Z",
        "__v": 0
    },
    {
        "_id": "6671ab85dbfa5c244280a7cb",
        "usuario": {
            "_id": "6658c791aee9140b0973c7ae",
            "name": "ERICK PASCUAL BARRERA TENA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-20T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 8",
        "createdAt": "2024-06-18T15:45:09.833Z",
        "updatedAt": "2024-06-18T15:45:09.833Z",
        "__v": 0
    },
    {
        "_id": "6671d1a7dbfa5c244280a8d1",
        "usuario": {
            "_id": "66465ffda50532daeec4771d",
            "name": "NOE MATURINO PEÑA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-19T20:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 8",
        "createdAt": "2024-06-18T18:27:51.906Z",
        "updatedAt": "2024-06-18T18:27:51.906Z",
        "__v": 0
    },
    {
        "_id": "66721a41dbfa5c244280aadf",
        "usuario": {
            "_id": "65bacef159368c1600970283",
            "name": "PATRICIA ALEJANDRA CRUZ PAREDES"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-07-22T22:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-06-18T23:37:37.148Z",
        "updatedAt": "2024-06-18T23:38:51.768Z",
        "__v": 0
    },
    {
        "_id": "66730b497bc6a9da6d2eee45",
        "usuario": {
            "_id": "666230183a9c57ed437a5588",
            "name": "JUAN JOSUÉ HERNANDEZ TAPIA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-20T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 5",
        "createdAt": "2024-06-19T16:46:01.855Z",
        "updatedAt": "2024-06-19T16:46:01.855Z",
        "__v": 0
    },
    {
        "_id": "667492b1e6788b1092a7b5d5",
        "usuario": {
            "_id": "6619b926576dae45119608b4",
            "name": "MORELIA JAZMIN LAZARO BUSTOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-27T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-20T20:36:01.565Z",
        "updatedAt": "2024-06-20T20:36:01.565Z",
        "__v": 0
    },
    {
        "_id": "6674aa40e6788b1092a7b5e6",
        "usuario": {
            "_id": "66552675aebd91d65cd76ce9",
            "name": "MANUEL IGNACIO MIER AGUIRRE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-24T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT *NUEVO*",
        "createdAt": "2024-06-20T22:16:32.913Z",
        "updatedAt": "2024-06-20T22:16:32.913Z",
        "__v": 0
    },
    {
        "_id": "6674ab86e6788b1092a7b68c",
        "usuario": {
            "_id": "665de613de4c0117f8558f3b",
            "name": "ROSA MARIA LIEVANOS HUAPE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-21T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT *Atiene melissa*",
        "createdAt": "2024-06-20T22:21:58.387Z",
        "updatedAt": "2024-06-24T17:01:02.489Z",
        "__v": 0
    },
    {
        "_id": "6674ab95e6788b1092a7b692",
        "usuario": {
            "_id": "665de613de4c0117f8558f3b",
            "name": "ROSA MARIA LIEVANOS HUAPE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-22T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-20T22:22:13.162Z",
        "updatedAt": "2024-06-20T22:22:13.162Z",
        "__v": 0
    },
    {
        "_id": "6674bafee6788b1092a7b78f",
        "usuario": {
            "_id": "65677f6769730be2742b1623",
            "name": "JULIO ONOFRE QUIÑONES CAMPOS "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-21T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-06-20T23:27:58.974Z",
        "updatedAt": "2024-06-20T23:27:58.974Z",
        "__v": 0
    },
    {
        "_id": "6675d97b645cccc54ed76e82",
        "usuario": {
            "_id": "665a162ff4fff23e1006e8e4",
            "name": "ANA LAURA JUAREZ GONZALEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-24T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-21T19:50:19.936Z",
        "updatedAt": "2024-06-21T19:50:19.936Z",
        "__v": 0
    },
    {
        "_id": "6676e39946a3a452bf11f74b",
        "usuario": {
            "_id": "666900d49e75250adec461eb",
            "name": "MARIA ESENIA HUERTA MONDRAGON"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-24T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 3",
        "createdAt": "2024-06-22T14:45:45.167Z",
        "updatedAt": "2024-06-22T14:45:45.167Z",
        "__v": 0
    },
    {
        "_id": "6676e3ab46a3a452bf11f751",
        "usuario": {
            "_id": "666900d49e75250adec461eb",
            "name": "MARIA ESENIA HUERTA MONDRAGON"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-26T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 4",
        "createdAt": "2024-06-22T14:46:03.256Z",
        "updatedAt": "2024-06-22T14:46:03.256Z",
        "__v": 0
    },
    {
        "_id": "6677026246a3a452bf11f7bb",
        "usuario": {
            "_id": "66296cc29ce7404d2e0cbe2d",
            "name": "GABRIELA PEDRAZA PONCE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-25T19:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "653171cd83776ca8ad72954b",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-22T16:57:06.014Z",
        "updatedAt": "2024-06-22T16:57:06.014Z",
        "__v": 0
    },
    {
        "_id": "6679ac7c007d815c307aa523",
        "usuario": {
            "_id": "6670807dfe53c2350d0d009b",
            "name": "FRANCISCO MURILLO DIAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-25T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-24T17:27:24.981Z",
        "updatedAt": "2024-06-24T17:27:24.981Z",
        "__v": 0
    },
    {
        "_id": "6679b92f007d815c307aa64c",
        "usuario": {
            "_id": "66552675aebd91d65cd76ce9",
            "name": "MANUEL IGNACIO MIER AGUIRRE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-25T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-24T18:21:35.055Z",
        "updatedAt": "2024-06-24T18:21:35.055Z",
        "__v": 0
    },
    {
        "_id": "6679c30b007d815c307aa652",
        "usuario": {
            "_id": "666230183a9c57ed437a5588",
            "name": "JUAN JOSUÉ HERNANDEZ TAPIA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-06-24T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 5",
        "createdAt": "2024-06-24T19:03:39.437Z",
        "updatedAt": "2024-06-24T19:03:39.437Z",
        "__v": 0
    },
    {
        "_id": "6679ca08007d815c307aa6f2",
        "usuario": {
            "_id": "645bd353b555e198f5a597d9",
            "name": "MARIANA VARGAS GUTIERREZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-07-01T15:30:00.000Z",
        "duracion": 150,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Bloqueo - $0 - Bloqueo de citas",
        "id_servicio": "66171186b0c5f426d2e3b483",
        "createdAt": "2024-06-24T19:33:28.823Z",
        "updatedAt": "2024-06-24T19:33:28.823Z",
        "__v": 0
    },
    {
        "_id": "6679ca37007d815c307aa703",
        "usuario": {
            "_id": "645bd353b555e198f5a597d9",
            "name": "MARIANA VARGAS GUTIERREZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-07-05T15:00:00.000Z",
        "duracion": 180,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Bloqueo - $0 - Bloqueo de citas",
        "id_servicio": "66171186b0c5f426d2e3b483",
        "comentarios": "CITA LABORATORIO",
        "createdAt": "2024-06-24T19:34:15.267Z",
        "updatedAt": "2024-06-24T19:34:15.267Z",
        "__v": 0
    },
    {
        "_id": "6679caff007d815c307aa856",
        "usuario": {
            "_id": "6679cae1007d815c307aa7d1",
            "name": "OSWALDO EMMANUEL BRISEÑO GONZÁLEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-25T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-24T19:37:35.820Z",
        "updatedAt": "2024-06-24T19:37:35.820Z",
        "__v": 0
    },
    {
        "_id": "667af2ae176636b58300f9f0",
        "usuario": {
            "_id": "6679cae1007d815c307aa7d1",
            "name": "OSWALDO EMMANUEL BRISEÑO GONZÁLEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-26T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-25T16:39:10.291Z",
        "updatedAt": "2024-06-25T16:39:10.291Z",
        "__v": 0
    },
    {
        "_id": "667b08a3176636b58301011d",
        "usuario": {
            "_id": "66552675aebd91d65cd76ce9",
            "name": "MANUEL IGNACIO MIER AGUIRRE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-26T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-25T18:12:51.755Z",
        "updatedAt": "2024-06-25T18:12:51.755Z",
        "__v": 0
    },
    {
        "_id": "667b08c0176636b583010123",
        "usuario": {
            "_id": "66552675aebd91d65cd76ce9",
            "name": "MANUEL IGNACIO MIER AGUIRRE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-27T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-25T18:13:20.253Z",
        "updatedAt": "2024-06-25T18:13:20.253Z",
        "__v": 0
    },
    {
        "_id": "667b08dd176636b583010129",
        "usuario": {
            "_id": "66552675aebd91d65cd76ce9",
            "name": "MANUEL IGNACIO MIER AGUIRRE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-28T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT ",
        "createdAt": "2024-06-25T18:13:49.739Z",
        "updatedAt": "2024-06-25T18:13:49.739Z",
        "__v": 0
    },
    {
        "_id": "667b0900176636b58301012f",
        "usuario": {
            "_id": "66552675aebd91d65cd76ce9",
            "name": "MANUEL IGNACIO MIER AGUIRRE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-29T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-25T18:14:24.138Z",
        "updatedAt": "2024-06-25T18:14:47.287Z",
        "__v": 0
    },
    {
        "_id": "667b28ab176636b5830102e2",
        "usuario": {
            "_id": "66296cc29ce7404d2e0cbe2d",
            "name": "GABRIELA PEDRAZA PONCE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-07-02T19:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "EMT SALA 1",
        "createdAt": "2024-06-25T20:29:31.981Z",
        "updatedAt": "2024-06-25T20:30:00.147Z",
        "__v": 0
    },
    {
        "_id": "667b4c5a176636b583010424",
        "usuario": {
            "_id": "6670807dfe53c2350d0d009b",
            "name": "FRANCISCO MURILLO DIAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-26T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-25T23:01:46.346Z",
        "updatedAt": "2024-06-25T23:01:46.346Z",
        "__v": 0
    },
    {
        "_id": "667c381c302dd7b859f57b51",
        "usuario": {
            "_id": "6679cae1007d815c307aa7d1",
            "name": "OSWALDO EMMANUEL BRISEÑO GONZÁLEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-28T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-26T15:47:40.321Z",
        "updatedAt": "2024-06-26T15:47:40.321Z",
        "__v": 0
    },
    {
        "_id": "667c511f302dd7b859f57b99",
        "usuario": {
            "_id": "652595df4725902e21f12a1d",
            "name": "ANGEL CAHUE DIAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-28T15:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Bloqueo - $0 - Bloqueo de citas",
        "id_servicio": "661711bbb0c5f426d2e3b510",
        "comentarios": "BLOQUEO REUNION JUAN",
        "createdAt": "2024-06-26T17:34:23.907Z",
        "updatedAt": "2024-06-26T17:34:23.907Z",
        "__v": 0
    },
    {
        "_id": "667c7182302dd7b859f57d8c",
        "usuario": {
            "_id": "667c716a302dd7b859f57cea",
            "name": "MIRIAM REYNOSO ROSAS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-07-03T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 1 ",
        "createdAt": "2024-06-26T19:52:34.055Z",
        "updatedAt": "2024-06-26T19:52:34.055Z",
        "__v": 0
    },
    {
        "_id": "667ca432c462ae7dcdb3f980",
        "usuario": {
            "_id": "6670807dfe53c2350d0d009b",
            "name": "FRANCISCO MURILLO DIAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-27T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-26T23:28:50.874Z",
        "updatedAt": "2024-06-26T23:28:50.874Z",
        "__v": 0
    },
    {
        "_id": "667d894cf6ca2daf0272820c",
        "usuario": {
            "_id": "6619b926576dae45119608b4",
            "name": "MORELIA JAZMIN LAZARO BUSTOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-04T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-27T15:46:20.552Z",
        "updatedAt": "2024-06-27T15:46:20.552Z",
        "__v": 0
    },
    {
        "_id": "667d968af6ca2daf02728ee6",
        "usuario": {
            "_id": "667d9668f6ca2daf02728e61",
            "name": "VICTORIA OCHOA ARIZMENDI"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-27T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-27T16:42:50.802Z",
        "updatedAt": "2024-06-27T16:42:50.802Z",
        "__v": 0
    },
    {
        "_id": "667dec1af6ca2daf02729cee",
        "usuario": {
            "_id": "6670807dfe53c2350d0d009b",
            "name": "FRANCISCO MURILLO DIAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-28T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-27T22:47:54.174Z",
        "updatedAt": "2024-06-27T22:47:54.174Z",
        "__v": 0
    },
    {
        "_id": "667e0001f6ca2daf02729d37",
        "usuario": {
            "_id": "667d9668f6ca2daf02728e61",
            "name": "VICTORIA OCHOA ARIZMENDI"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-28T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-06-28T00:12:49.254Z",
        "updatedAt": "2024-06-28T00:12:49.254Z",
        "__v": 0
    },
    {
        "_id": "667eecfe922d3aa9ba62edf7",
        "usuario": {
            "_id": "652595df4725902e21f12a1d",
            "name": "ANGEL CAHUE DIAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-02T15:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Bloqueo - $0 - Bloqueo de citas",
        "id_servicio": "661711bbb0c5f426d2e3b510",
        "comentarios": "Reunión Juan",
        "createdAt": "2024-06-28T17:03:58.284Z",
        "updatedAt": "2024-06-28T17:03:58.284Z",
        "__v": 0
    },
    {
        "_id": "667ef9bb922d3aa9ba62ee7d",
        "usuario": {
            "_id": "6679cae1007d815c307aa7d1",
            "name": "OSWALDO EMMANUEL BRISEÑO GONZÁLEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-28T21:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-28T17:58:19.431Z",
        "updatedAt": "2024-06-28T17:58:19.431Z",
        "__v": 0
    },
    {
        "_id": "667f06d5922d3aa9ba62efcd",
        "usuario": {
            "_id": "667f06b8922d3aa9ba62ef0a",
            "name": "CINTHIA XARENI FARFAN CEBALLOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-07-01T23:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-06-28T18:54:13.806Z",
        "updatedAt": "2024-06-28T18:54:13.806Z",
        "__v": 0
    },
    {
        "_id": "667f06ea922d3aa9ba62efd3",
        "usuario": {
            "_id": "667f06b8922d3aa9ba62ef0a",
            "name": "CINTHIA XARENI FARFAN CEBALLOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-07-04T23:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-06-28T18:54:34.252Z",
        "updatedAt": "2024-06-28T18:54:34.252Z",
        "__v": 0
    },
    {
        "_id": "667f2dfa922d3aa9ba62f1cf",
        "usuario": {
            "_id": "6679cae1007d815c307aa7d1",
            "name": "OSWALDO EMMANUEL BRISEÑO GONZÁLEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-01T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-06-28T21:41:14.381Z",
        "updatedAt": "2024-06-29T15:35:28.635Z",
        "__v": 0
    },
    {
        "_id": "667f3ee4922d3aa9ba62f295",
        "usuario": {
            "_id": "6670807dfe53c2350d0d009b",
            "name": "FRANCISCO MURILLO DIAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-29T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-06-28T22:53:24.446Z",
        "updatedAt": "2024-06-28T22:53:24.446Z",
        "__v": 0
    },
    {
        "_id": "667f4d4d922d3aa9ba62f2f7",
        "usuario": {
            "_id": "667d9668f6ca2daf02728e61",
            "name": "VICTORIA OCHOA ARIZMENDI"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-29T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-06-28T23:54:53.446Z",
        "updatedAt": "2024-06-28T23:54:53.446Z",
        "__v": 0
    },
    {
        "_id": "66802e214a0282fd7d997a21",
        "usuario": {
            "_id": "6670807dfe53c2350d0d009b",
            "name": "FRANCISCO MURILLO DIAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-01T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-29T15:54:09.184Z",
        "updatedAt": "2024-06-29T15:54:09.184Z",
        "__v": 0
    },
    {
        "_id": "6680445d4a0282fd7d997b15",
        "usuario": {
            "_id": "66552675aebd91d65cd76ce9",
            "name": "MANUEL IGNACIO MIER AGUIRRE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-01T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-29T17:29:01.423Z",
        "updatedAt": "2024-06-29T17:29:01.423Z",
        "__v": 0
    },
    {
        "_id": "668044954a0282fd7d997b1b",
        "usuario": {
            "_id": "66552675aebd91d65cd76ce9",
            "name": "MANUEL IGNACIO MIER AGUIRRE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-06-29T17:00:44.598Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-29T17:29:57.810Z",
        "updatedAt": "2024-06-29T17:29:57.810Z",
        "__v": 0
    },
    {
        "_id": "668044b84a0282fd7d997b21",
        "usuario": {
            "_id": "66552675aebd91d65cd76ce9",
            "name": "MANUEL IGNACIO MIER AGUIRRE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-02T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-29T17:30:32.319Z",
        "updatedAt": "2024-06-29T17:30:32.319Z",
        "__v": 0
    },
    {
        "_id": "668044cc4a0282fd7d997b27",
        "usuario": {
            "_id": "66552675aebd91d65cd76ce9",
            "name": "MANUEL IGNACIO MIER AGUIRRE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-03T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-29T17:30:52.865Z",
        "updatedAt": "2024-06-29T17:30:52.865Z",
        "__v": 0
    },
    {
        "_id": "668044e34a0282fd7d997b2d",
        "usuario": {
            "_id": "66552675aebd91d65cd76ce9",
            "name": "MANUEL IGNACIO MIER AGUIRRE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-04T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-29T17:31:15.943Z",
        "updatedAt": "2024-06-29T17:31:15.943Z",
        "__v": 0
    },
    {
        "_id": "668045044a0282fd7d997b34",
        "usuario": {
            "_id": "66552675aebd91d65cd76ce9",
            "name": "MANUEL IGNACIO MIER AGUIRRE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-05T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-29T17:31:48.571Z",
        "updatedAt": "2024-06-29T17:31:48.571Z",
        "__v": 0
    },
    {
        "_id": "668055fd4a0282fd7d997bc2",
        "usuario": {
            "_id": "667d9668f6ca2daf02728e61",
            "name": "VICTORIA OCHOA ARIZMENDI"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-01T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-29T18:44:13.268Z",
        "updatedAt": "2024-06-29T18:44:13.268Z",
        "__v": 0
    },
    {
        "_id": "668056124a0282fd7d997bc8",
        "usuario": {
            "_id": "667d9668f6ca2daf02728e61",
            "name": "VICTORIA OCHOA ARIZMENDI"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-02T22:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-29T18:44:34.453Z",
        "updatedAt": "2024-07-01T22:36:51.391Z",
        "__v": 0
    },
    {
        "_id": "668056254a0282fd7d997bce",
        "usuario": {
            "_id": "667d9668f6ca2daf02728e61",
            "name": "VICTORIA OCHOA ARIZMENDI"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-03T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-29T18:44:53.208Z",
        "updatedAt": "2024-06-29T18:44:53.208Z",
        "__v": 0
    },
    {
        "_id": "668056324a0282fd7d997bd4",
        "usuario": {
            "_id": "667d9668f6ca2daf02728e61",
            "name": "VICTORIA OCHOA ARIZMENDI"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-04T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-29T18:45:06.893Z",
        "updatedAt": "2024-06-29T18:45:06.893Z",
        "__v": 0
    },
    {
        "_id": "668056404a0282fd7d997bda",
        "usuario": {
            "_id": "667d9668f6ca2daf02728e61",
            "name": "VICTORIA OCHOA ARIZMENDI"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-05T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-06-29T18:45:20.392Z",
        "updatedAt": "2024-06-29T18:45:20.392Z",
        "__v": 0
    },
    {
        "_id": "6682ceec6ac0a47afb2ded6e",
        "usuario": {
            "_id": "666230183a9c57ed437a5588",
            "name": "JUAN JOSUÉ HERNANDEZ TAPIA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-07-01T19:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 6",
        "createdAt": "2024-07-01T15:44:44.134Z",
        "updatedAt": "2024-07-01T15:44:44.134Z",
        "__v": 0
    },
    {
        "_id": "6682d1876ac0a47afb2ded75",
        "usuario": {
            "_id": "6679cae1007d815c307aa7d1",
            "name": "OSWALDO EMMANUEL BRISEÑO GONZÁLEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-02T23:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-07-01T15:55:51.220Z",
        "updatedAt": "2024-07-02T23:19:34.523Z",
        "__v": 0
    },
    {
        "_id": "6682d9ee6ac0a47afb2dedbf",
        "usuario": {
            "_id": "6659135baee9140b0973cd5f",
            "name": "BYRON BAUTISTA MALDONADO"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-09T20:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS REF",
        "createdAt": "2024-07-01T16:31:42.282Z",
        "updatedAt": "2024-07-01T16:31:42.282Z",
        "__v": 0
    },
    {
        "_id": "6682e7756ac0a47afb2df268",
        "usuario": {
            "_id": "652595df4725902e21f12a1d",
            "name": "ANGEL CAHUE DIAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-05T18:30:00.000Z",
        "duracion": 150,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Bloqueo - $0 - Bloqueo de citas",
        "id_servicio": "661711bbb0c5f426d2e3b510",
        "comentarios": "Bloqueo",
        "createdAt": "2024-07-01T17:29:25.642Z",
        "updatedAt": "2024-07-04T17:16:47.523Z",
        "__v": 0
    },
    {
        "_id": "66830f996ac0a47afb2df540",
        "usuario": {
            "_id": "6424e95f96ee3c69af13facd",
            "name": "ORLANDO HERNANDEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-07-02T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 REF",
        "createdAt": "2024-07-01T20:20:41.177Z",
        "updatedAt": "2024-07-01T20:20:41.177Z",
        "__v": 0
    },
    {
        "_id": "66833c4a6ac0a47afb2df94f",
        "usuario": {
            "_id": "6670807dfe53c2350d0d009b",
            "name": "FRANCISCO MURILLO DIAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-02T19:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-07-01T23:31:22.977Z",
        "updatedAt": "2024-07-01T23:31:32.274Z",
        "__v": 0
    },
    {
        "_id": "66835efd6ac0a47afb2dfae1",
        "usuario": {
            "_id": "652595df4725902e21f12a1d",
            "name": "ANGEL CAHUE DIAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-03T20:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Bloqueo - $0 - Bloqueo de citas",
        "id_servicio": "661711bbb0c5f426d2e3b510",
        "comentarios": "BLOQUEO ",
        "createdAt": "2024-07-02T01:59:25.784Z",
        "updatedAt": "2024-07-03T17:41:51.660Z",
        "__v": 0
    },
    {
        "_id": "668447b1296d719f8f5b4a07",
        "usuario": {
            "_id": "667c716a302dd7b859f57cea",
            "name": "MIRIAM REYNOSO ROSAS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-07-05T21:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-07-02T18:32:17.172Z",
        "updatedAt": "2024-07-05T23:21:01.059Z",
        "__v": 0
    },
    {
        "_id": "668447c4296d719f8f5b4a0d",
        "usuario": {
            "_id": "667c716a302dd7b859f57cea",
            "name": "MIRIAM REYNOSO ROSAS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-07-08T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "SALA 2 DOSIS 3",
        "createdAt": "2024-07-02T18:32:36.750Z",
        "updatedAt": "2024-07-02T18:32:36.750Z",
        "__v": 0
    },
    {
        "_id": "668459a9296d719f8f5b4ba3",
        "usuario": {
            "_id": "66296cc29ce7404d2e0cbe2d",
            "name": "GABRIELA PEDRAZA PONCE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-07-09T19:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "653171d483776ca8ad729565",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-07-02T19:48:57.332Z",
        "updatedAt": "2024-07-02T19:48:57.332Z",
        "__v": 0
    },
    {
        "_id": "6684626c296d719f8f5b4c1f",
        "usuario": {
            "_id": "6670807dfe53c2350d0d009b",
            "name": "FRANCISCO MURILLO DIAZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-03T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-07-02T20:26:20.605Z",
        "updatedAt": "2024-07-02T20:26:20.605Z",
        "__v": 0
    },
    {
        "_id": "66849b25296d719f8f5b5176",
        "usuario": {
            "_id": "6679cae1007d815c307aa7d1",
            "name": "OSWALDO EMMANUEL BRISEÑO GONZÁLEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-03T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-07-03T00:28:21.352Z",
        "updatedAt": "2024-07-03T00:28:21.352Z",
        "__v": 0
    },
    {
        "_id": "6684bc1e296d719f8f5b5294",
        "usuario": {
            "_id": "660f21b1f00926a772b997d6",
            "name": "EMMANUEL TREVIÑO MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-06T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-07-03T02:49:02.028Z",
        "updatedAt": "2024-07-03T02:49:02.028Z",
        "__v": 0
    },
    {
        "_id": "66857371cdc78b3335d55856",
        "usuario": {
            "_id": "6679cae1007d815c307aa7d1",
            "name": "OSWALDO EMMANUEL BRISEÑO GONZÁLEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-05T00:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-07-03T15:51:13.398Z",
        "updatedAt": "2024-07-03T15:51:13.398Z",
        "__v": 0
    },
    {
        "_id": "668574dccdc78b3335d55ad9",
        "usuario": {
            "_id": "668574afcdc78b3335d55a08",
            "name": "ELIZABETH PRISCILA PIMENTEL LEÓN"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-03T21:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 1",
        "createdAt": "2024-07-03T15:57:16.931Z",
        "updatedAt": "2024-07-03T15:57:16.931Z",
        "__v": 0
    },
    {
        "_id": "66857f59cdc78b3335d55f9d",
        "usuario": {
            "_id": "66847429296d719f8f5b4f61",
            "name": "FRANCISCO MURILLO DIAZ "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-05T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-07-03T16:42:01.047Z",
        "updatedAt": "2024-07-03T16:42:01.047Z",
        "__v": 0
    },
    {
        "_id": "6686c9d8f24209f9d9c4e959",
        "usuario": {
            "_id": "6619b926576dae45119608b4",
            "name": "MORELIA JAZMIN LAZARO BUSTOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-11T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-07-04T16:12:08.892Z",
        "updatedAt": "2024-07-04T16:12:08.892Z",
        "__v": 0
    },
    {
        "_id": "6686dacbf24209f9d9c4f14e",
        "usuario": {
            "_id": "64ee9fee34b0c38a18023bda",
            "name": "PEDRO GALVAN"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-04T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-07-04T17:24:27.297Z",
        "updatedAt": "2024-07-04T17:24:27.297Z",
        "__v": 0
    },
    {
        "_id": "66874363f24209f9d9c4ff13",
        "usuario": {
            "_id": "6679cae1007d815c307aa7d1",
            "name": "OSWALDO EMMANUEL BRISEÑO GONZÁLEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-05T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1",
        "createdAt": "2024-07-05T00:50:43.685Z",
        "updatedAt": "2024-07-05T00:50:43.685Z",
        "__v": 0
    },
    {
        "_id": "6688195d8ac52ac0dacdfb46",
        "usuario": {
            "_id": "6679cae1007d815c307aa7d1",
            "name": "OSWALDO EMMANUEL BRISEÑO GONZÁLEZ"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-06T15:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SESION 10 EMT",
        "createdAt": "2024-07-05T16:03:41.774Z",
        "updatedAt": "2024-07-05T16:03:41.774Z",
        "__v": 0
    },
    {
        "_id": "6688212a8ac52ac0dacdfb8e",
        "usuario": {
            "_id": "64ee9fee34b0c38a18023bda",
            "name": "PEDRO GALVAN"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-05T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1 sesión 1",
        "createdAt": "2024-07-05T16:36:58.732Z",
        "updatedAt": "2024-07-05T16:36:58.732Z",
        "__v": 0
    },
    {
        "_id": "6688220c8ac52ac0dacdfb94",
        "usuario": {
            "_id": "66847429296d719f8f5b4f61",
            "name": "FRANCISCO MURILLO DIAZ "
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-08T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "SESION 10 EMT, ULTIMA",
        "createdAt": "2024-07-05T16:40:44.769Z",
        "updatedAt": "2024-07-05T16:40:44.769Z",
        "__v": 0
    },
    {
        "_id": "668830ec8ac52ac0dacdfc20",
        "usuario": {
            "_id": "66552675aebd91d65cd76ce9",
            "name": "MANUEL IGNACIO MIER AGUIRRE"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-08-02T17:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "REFUERZO EMT",
        "createdAt": "2024-07-05T17:44:12.322Z",
        "updatedAt": "2024-07-05T17:44:12.322Z",
        "__v": 0
    },
    {
        "_id": "668846298ac52ac0dace0088",
        "usuario": {
            "_id": "664bcc9bdeb39370050242c2",
            "name": "VANYA GIL SALDAÑA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-05T22:00:02.973Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2, DOSIS     - LORE",
        "createdAt": "2024-07-05T19:14:49.958Z",
        "updatedAt": "2024-07-05T19:36:53.878Z",
        "__v": 0
    },
    {
        "_id": "668871ba8ac52ac0dace0174",
        "usuario": {
            "_id": "667d9668f6ca2daf02728e61",
            "name": "VICTORIA OCHOA ARIZMENDI"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-06T18:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1 sesión 8",
        "createdAt": "2024-07-05T22:20:42.652Z",
        "updatedAt": "2024-07-05T22:20:42.652Z",
        "__v": 0
    },
    {
        "_id": "66887d8c8ac52ac0dace0196",
        "usuario": {
            "_id": "667c716a302dd7b859f57cea",
            "name": "MIRIAM REYNOSO ROSAS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-07-12T21:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "sala 2 dosis 4",
        "createdAt": "2024-07-05T23:11:08.121Z",
        "updatedAt": "2024-07-06T00:42:37.776Z",
        "__v": 0
    },
    {
        "_id": "668883c98ac52ac0dace01bd",
        "usuario": {
            "_id": "64ee9fee34b0c38a18023bda",
            "name": "PEDRO GALVAN"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-08T23:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1 Sesión 1",
        "createdAt": "2024-07-05T23:37:45.254Z",
        "updatedAt": "2024-07-05T23:37:45.254Z",
        "__v": 0
    },
    {
        "_id": "668893698ac52ac0dace0204",
        "usuario": {
            "_id": "667f06b8922d3aa9ba62ef0a",
            "name": "CINTHIA XARENI FARFAN CEBALLOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-07-08T23:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "sala 2 dosis 3",
        "createdAt": "2024-07-06T00:44:25.887Z",
        "updatedAt": "2024-07-06T00:44:25.887Z",
        "__v": 0
    },
    {
        "_id": "6688938f8ac52ac0dace020a",
        "usuario": {
            "_id": "667f06b8922d3aa9ba62ef0a",
            "name": "CINTHIA XARENI FARFAN CEBALLOS"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "63311b999811c8b706435c24",
            "name": "David Israel Farias Anda"
        },
        "fecha_hora": "2024-07-11T23:30:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6fed0c21c88d7160af9",
        "comentarios": "sala 2 dosis 4",
        "createdAt": "2024-07-06T00:45:03.028Z",
        "updatedAt": "2024-07-06T00:45:03.028Z",
        "__v": 0
    },
    {
        "_id": "66896a8c081555c2b0fffa91",
        "usuario": {
            "_id": "668357136ac0a47afb2dfaab",
            "name": "ELIZABETH PRISCILA PIMENTEL LEON"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-06T16:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - Ketamina",
        "id_servicio": "6554e6cbd0c21c88d7160a46",
        "comentarios": "SALA 2 DOSIS 2",
        "createdAt": "2024-07-06T16:02:20.025Z",
        "updatedAt": "2024-07-06T16:02:20.025Z",
        "__v": 0
    },
    {
        "_id": "66897983081555c2b0ffff90",
        "usuario": {
            "_id": "660f21b1f00926a772b997d6",
            "name": "EMMANUEL TREVIÑO MENDOZA"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-09T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $3000 - EMT 30min",
        "id_servicio": "6531722a83776ca8ad72968a",
        "comentarios": "EMT Sala 1 Mantenimiento",
        "createdAt": "2024-07-06T17:06:11.042Z",
        "updatedAt": "2024-07-06T17:06:11.042Z",
        "__v": 0
    },
    {
        "_id": "6689936c081555c2b0000d36",
        "usuario": {
            "_id": "667d9668f6ca2daf02728e61",
            "name": "VICTORIA OCHOA ARIZMENDI"
        },
        "sucursal": {
            "_id": "62e9357f14629809cdfc2c72",
            "nombre": "CIDERALT"
        },
        "medico": {
            "_id": "62fd911f578d2b4669e0e056",
            "name": "Misael Tapia Orozco"
        },
        "fecha_hora": "2024-07-08T22:00:00.000Z",
        "duracion": 60,
        "id_reunion": "",
        "password_reunion": "",
        "servicio": "Servicio Médico - $1500 - EMT 15min",
        "id_servicio": "6531722683776ca8ad72966a",
        "comentarios": "SALA 1 EMT",
        "createdAt": "2024-07-06T18:56:44.929Z",
        "updatedAt": "2024-07-06T18:56:44.929Z",
        "__v": 0
    }
];

function generateCSV(data) {
    // List of allowed id_servicio
    const allowedIds = [
        "6531722683776ca8ad72966a",
        "6531722a83776ca8ad72968a",
        "653171cd83776ca8ad72954b",
        "653171d483776ca8ad729565",
        "6531727583776ca8ad729758",
        "6531727983776ca8ad729772"
    ];


    // Filter the objects
    const filteredData = data.filter(item => allowedIds.includes(item.id_servicio));

    // Map the filtered data to extract the required fields
    const csvData = filteredData.map(item => ({
        usuario: item.usuario.name,
        sucursal: item.sucursal.nombre,
        medico: item.medico.name,
        fecha_hora: item.fecha_hora,
        duracion: item.duracion,
        servicio: item.servicio,
        comentarios: item.comentarios
    }));

    // Convert JSON to CSV
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(csvData);

    // Write the CSV file
    fs.writeFileSync('data.csv', csv);
}

// Call the function with the array of objects
generateCSV(objects);
