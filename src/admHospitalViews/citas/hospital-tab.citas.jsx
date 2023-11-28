import React, { useState, useEffect } from 'react';
import { API, sendDataBody } from '../../resources';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';

import Loading from '../../loading';

const localizer = dayjsLocalizer(dayjs)


const HospitalTab = ({ id_hospital }) => {
    const [serviceList, setServiceList] = useState(null);
    const [pacientesData, setPacientesData] = useState(null);

    const [citasData, setCitasData] = useState(null)

    const [loadedSuccessfully, setLoadedSuccessfully] = useState(false);


    useEffect(() => {
        fetch(API + `users/hospital/${id_hospital}`)
            .then(response => response.json())
            .then(medicosResponse => {
                console.log('medicos response: ', medicosResponse)
                let allServices = [];
                const idmeds = medicosResponse.map(doc => {
                    allServices = allServices.concat(doc.configuracion.tratamientos_ofrecidos) // Extract tratamientos ofrecdos to create an unique list
                    return doc._id
                })
                console.log('Services: ', allServices)
                setServiceList(allServices)

                // Llamada al segundo API
                return fetch(API + 'pacientes/medicos', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ medicos: idmeds })
                });
            })
            .then(response => response.json())
            .then(pacientesResponse => {
                console.log('Pacientes response: ', pacientesResponse)
                pacientesResponse.forEach(paciente => {
                    paciente.label = paciente.name; paciente.value = paciente._id;
                })
                setPacientesData(pacientesResponse);
            })
            .catch(error => {
                // Manejar errores
                console.error('Error:', error);
            });
    }, []);

    // Función para formatear el array de respuesta del primer API
    const formatoArray = (data) => {
        // Tu lógica de formateo aquí
        return data;
    };



    useEffect(() => {
        // Verificar si ambos sets de datos están disponibles y tienen contenido
        if (serviceList !== null && serviceList.length > 0 && pacientesData !== null) {

            const fechaActual = new Date();

            // Calcular la fecha de hace una semana
            const fechaHaceUnaSemana = new Date();
            fechaHaceUnaSemana.setDate(fechaActual.getDate() - 7);

            // Calcular la fecha dentro de una semana
            const fechaDentroDeUnaSemana = new Date();
            fechaDentroDeUnaSemana.setDate(fechaActual.getDate() + 7);
            getCitasData(fechaHaceUnaSemana, fechaDentroDeUnaSemana)
            // setLoadedSuccessfully(true);
        }
    }, [serviceList, pacientesData]);

    const getCitasData = async (_start_date, _end_date) => {
        const body = { start_date: _start_date, end_date: _end_date }

        await sendDataBody(`citas/sucursal/${id_hospital}`, body).then((rs) => {
            // console.log('resp ', rs)
            rs.forEach((cita) => {
                const servicio = cita.id_servicio; // Colorze cita
                const servicioInfo = serviceList.find(servicioItem => servicioItem._id === servicio);
                if (servicioInfo) {
                    cita.color = servicioInfo.color;
                }

                cita.start = new Date(Date.parse(cita.fecha_hora));
                const endDate = new Date(Date.parse(cita.fecha_hora));
                endDate.setTime(endDate.getTime() + 1 * (cita.duracion ?? 60) * 60 * 1000)
                cita.end = new Date(Date.parse(endDate));
                cita.title = cita.usuario?.name;
                cita.key = cita._id;
            });
            setCitasData(rs)
            console.log('Citas data at end ', citasData)
            setLoadedSuccessfully(true);

            // setLoading(false)
        })
    }

    // Select cita to show details and show confirm button
    const selectEvent = (e) => {
        console.log('For eedit', e)
        if (!e.doctor) e.doctor = e.medico; // For details
        if (!e.paciente) e.paciente = e.usuario; // For details
        if (e.medico && e.medico._id) e.medico = e.medico._id;  // For edit
        if (e.usuario && e.usuario._id) e.usuario = e.usuario._id;  // For edit
        // e.fecha_hora = dayjs(e.fecha_hora) //For edit www
        // setCitaForEdit(e) www
        // if (citaForEdit) showModal() www
    }


    const handleSlotSelection = ({ start, end, action }) => {
        // setFecha_hora(dayjs(start)) www
        // setIsCreateModalOpen(true) www
        return { style: { backgroundColor: 'red' } };
    };

    const eventStyleGetter = (event, start, end, isSelected) => {

        var style = {
            backgroundColor: event.color,
            borderRadius: '4px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        };
    }

    if (serviceList === null || pacientesData === null) {
        // Muestra un mensaje de carga mientras se obtienen los datos
        return <Loading />
    }

    if (loadedSuccessfully) {
        // Mostrar el alert solo si los datos cargaron correctamente
        return (
            <div>

                <Calendar
                    scrollToTime={new Date(Date.now())}
                    selectable='true'
                    localizer={localizer}
                    events={citasData}
                    eventPropGetter={eventStyleGetter}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    messages={{
                        next: "Sig",
                        previous: "Ant",
                        today: "Hoy",
                        month: "Mes",
                        week: "Semana",
                        day: "Día"
                    }}
                    defaultView="week"
                    onDoubleClickEvent={(e) => console.log(e)}
                    onSelectEvent={selectEvent}
                    onSelecting={(e) => console.log(e)}
                    // onSelectSlot={handleSlotSelection}
                    onSelectSlot={handleSlotSelection}
                    onRangeChange={(range) => {

                        console.log('Start ', range)
                        console.log('End ', range.end)

                    }}
                />

            </div>
        );
    }

    // Si los datos no cargaron correctamente, muestra un mensaje de error
    return <p>Citas no cargadas correctamente</p>;
};

export default HospitalTab;