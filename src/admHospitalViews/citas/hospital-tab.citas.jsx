import React, { useState, useEffect } from 'react'
import { getData } from '../../resources'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
require('moment/locale/es.js');

const localizer = momentLocalizer(moment)

export default function HospitalTab(props) {
    const [citasData, setCitasData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => { getCitasData() }, [])

    const getCitasData = () => {
        getData(`citas/sucursal/${props.id_hospital}`).then((rs) => {
            rs.forEach(cita => {
                cita.start = new Date(Date.parse(cita.createdAt));
                const endDate = new Date(cita.createdAt);
                endDate.setTime(endDate.getTime() + 1 * 60 * 60 * 1000)
                cita.end = new Date(Date.parse(endDate));
                cita.title = cita.comentarios;
                cita.id = cita._id;
            });
            setCitasData(rs)
        }
        ).finally(() => setLoading(false))
    }

    const events = [
        {
            id: 1,
            title: "Event 1",
            start: new Date(Date.parse("2023-02-07T10:30:00")),
            end: new Date(Date.parse("2023-02-07T10:30:00")),
            // end: new Date(Date.parse("2023-02-07T13:00:00")),
        },
        {
            id: 2,
            title: "Event 2",
            start: new Date(Date.parse("2023-02-02T09:30:00")),
            end: new Date(Date.parse("2023-02-02T09:30:00")),
            //año / mes/ dia
            // end: new Date(Date.parse("2023-02-02T11:30:00")),
            backColor: "#6aa84f"
        },
        {
            id: 3,
            title: "Event 3",
            start: new Date(Date.parse("2023-02-04T12:00:00")),
            end: new Date(Date.parse("2023-02-04T12:00:00")),
            // end: new Date(Date.parse("2023-02-04T15:00:00")),
            backColor: "#f1c232"
        }]

    return loading ? <p>Cargando...</p> : <div>
        <h6>Citas del hospital {props.hospital}</h6>
        {/* {citasData.map((c) => <p key={c._id}>{c.comentarios} {c.sucursal.nombre} -</p>)} */}
        <Calendar
            localizer={localizer}
            events={citasData}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            messages={{
                next: "sig",
                previous: "ant",
                today: "Hoy",
                month: "Mes",
                week: "Semana",
                day: "Día"
            }}
            defaultView="week"
            onDoubleClickEvent={(e) => console.log(e)}
            onSelectEvent={(e) => { console.log('Selected', e) }}
        />
    </div>
}