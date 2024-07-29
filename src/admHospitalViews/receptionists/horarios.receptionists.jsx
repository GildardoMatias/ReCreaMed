import React, { useEffect, useState } from 'react'
import { Tabs, Select } from 'antd'
import { myHospitals } from '../../resources'
import { Table } from 'antd'
import { getData } from '../../resources'
import Loading from '../../loading'

export default function Horarios() {

    // Create items for TABS
    myHospitals.forEach(h => {
        h.label = h.nombre;
        h.key = h._id;
        h.children = <HospitalTab hospital={h.nombre} id_hospital={h._id} />
    });

    return (
        <div>
            <h4 className='spacedTitle'>Recepcionistas de los diferentes hospitales</h4>
            <Tabs defaultActiveKey="1" items={myHospitals} />
        </div>
    )
}





function HospitalTab(props) {
    const [receptorsrData, setReceptorsData] = useState([])
    const [loading, setLoading] = useState(false)

    // To show Schedules
    // const [receptionist, setReceptionist] = useState(null)
    const [shedule, setShedule] = useState([])

    const scheduleColumns = [
        // {
        //     title: 'Usuario',
        //     dataIndex: 'usuario',
        //     key: 'usuario',
        //     render: (_, { usuario }) => { return <div>{usuario.name}</div> }
        // },
        {
            title: 'Fecha',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (_, { createdAt }) => { return <div>{new Date(createdAt).toLocaleDateString()}</div> }
        },
        {
            title: 'Hora de Entrada',
            dataIndex: 'fecha_hora_entrada',
            key: 'fecha_hora_entrada',
            render: (_, { fecha_hora_entrada }) => { return <div>{new Date(fecha_hora_entrada).toLocaleTimeString()}</div> }
        },
        {
            title: 'Hora de Salida',
            dataIndex: 'fecha_hora_salida',
            key: 'fecha_hora_salida',
            render: (_, { fecha_hora_salida }) => { return <div>{new Date(fecha_hora_salida).toLocaleTimeString()}</div> }
        }
    ]

    // Before all, get DoctorsData
    useEffect(() => { getReceptorsData() }, [])
    const getReceptorsData = () => {
        getData('users_by_rol/Recepcion').then((rs) => { setReceptorsData(rs) }).finally(() => setLoading(false))
    }
    // const columns = [
    //     {
    //         title: 'Avatar',
    //         dataIndex: 'avatar',
    //         key: 'avatar',
    //         render: (_, { avatar }) => {
    //             return avatar.length > 9 ?
    //                 <img width={64} src={'https://api.recreamed.com/images/' + avatar} alt='ProfilePic' /> :
    //                 <Avatar size={64} icon={<UserOutlined />} className='btnIconCentered' />
    //         }
    //     },
    //     {
    //         title: 'Nombre',
    //         dataIndex: 'name',
    //         key: 'name',
    //     },
    //     {
    //         title: 'Correo',
    //         dataIndex: 'email',
    //         key: 'email',
    //     },
    //     {
    //         title: 'Telefono',
    //         dataIndex: 'telefono',
    //         key: 'telefono',
    //     },
    // ];
    const myReceptors = (id_hospital) => {
        let doctorsFound = [];
        receptorsrData.forEach(receptor => {
            receptor.horarios.forEach(horario => {
                if (!doctorsFound.includes(receptor) && horario.sucursal._id === id_hospital) {
                    receptor.label = receptor.name; receptor.value = receptor._id;
                    doctorsFound.push(receptor);
                }
            });
        });
        // console.log(`Founds for ${id_hospital}: `, doctorsFound)
        return doctorsFound;
    }
    const filteredReceptors = myReceptors(props.id_hospital); // Get medicos data before render TAble
    // Filter doctors of each hospital

    // For Select receptor
    const handleChange = async (value) => {
        console.log(`selected ${value}`);
        const horarios = await getData(`asistencias/${value}`)
        console.log(horarios)
        setShedule(horarios)
        // setReceptionist(value)
    };

   

    if (loading) return <Loading />

    return <div>
        <h6>Recepcionistas del hospital {props.hospital}</h6>
        {/* <Table dataSource={doctoresData} columns={columns} /> */}
        {/* {receptionist || "Not Selected"} */}
        <Select
            // defaultValue="lucy"
            style={{ width: 260 }}
            onChange={handleChange}
            options={filteredReceptors}
        />
        <Table columns={scheduleColumns} dataSource={shedule} />
    </div>
}