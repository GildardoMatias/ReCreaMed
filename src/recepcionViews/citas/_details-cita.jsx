import React, { useEffect, useState } from 'react'
import { Button, Modal, Popconfirm, message, Popover } from 'antd'
import { deleteData, getData, sendDataBody } from '../../resources'
import { CreateCitaForm } from './create-cita-for-medic'

export default function DetailsCita({ citaForEdit, isModalOpen, setIsModalOpen, getCitasData, id_hospital, pacientesData }) {

    const { _id: id_cita, medico: id_medico, servicio } = citaForEdit;

    const [citaPaid, setCitaPaid] = useState(false)

    const [editingCita, setEditingCita] = useState(false)

    const handleOk = () => { setIsModalOpen(false); setEditingCita(false) }
    const handleCancel = () => { setIsModalOpen(false); setEditingCita(false) }

    //Check if paid before show confirm button
    useEffect(() => {
        checkPayment(citaForEdit._id)
    }, [citaForEdit])

    const checkPayment = (id_cita) => {
        getData(`balances/cita/${id_cita}`).then(rs => {
            if (rs.length > 0) {
                setCitaPaid(true)
            } else setCitaPaid(false)
        })
    }


    // Delete button
    const confirm = (e) => {
        deleteData(`citas/remove/${citaForEdit._id}`).then((rs) => { console.log(rs); getCitasData(); handleCancel() })
        deleteData(`balances/remove/cita/${citaForEdit._id}`)
    }
    const cancel = (e) => { console.log(e) }

    //Confirm payment
    const confirmPayment = (e) => {
        const balanceBody = {
            tipo: 'ingreso',
            medico: id_medico,
            cita: id_cita,
            monto: getAmmount(servicio),
            abono: getAmmount(servicio),
            forma_de_pago: 'Efectivo',
            fecha_hora: new Date(),
            estado: 'pendiente',
            concepto: servicio
        }
        console.log('Balance ready to send: ', balanceBody)
        sendDataBody('balances/add', balanceBody).then((rs) => { message.success(rs.message || rs.error); checkPayment(id_cita) })
    }



    const getAmmount = (str) => {
        const match = str.match(/\$\d+/);
        if (match) {
            // Eliminamos el signo de dólar para obtener solo el número
            const number = match[0].replace('$', '');
            return number;
        } else {
            return 0;
        }
    }

    const popoverContent = (
        <div>
            <p>Content</p>
            <p>Content</p>
        </div>
    );

    return <Modal title="Detalles Cita" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose width={900}
        footer={[
            <Popconfirm
                title="Eliminar Cita"
                description="Seguro que quiere eliminar la cita?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Si"
                cancelText="No"
            >
                <Button danger>Eliminar</Button>
            </Popconfirm>,

            // (!citaPaid && <Popconfirm
            //     title="Confirmar pago"
            //     description="Recibió el pago correspondiente?"
            //     onConfirm={confirmPayment}
            //     onCancel={cancel}
            //     okText="Si"
            //     cancelText="No"
            // >
            //     <Button >Confirmar pago</Button>
            // </Popconfirm>),
            <Popover content={popoverContent} title="Title" trigger="click">
                <Button>Click me</Button>
            </Popover>,

            <Button onClick={() => setEditingCita(!editingCita)}>{editingCita ? "Cancelar" : "Modificar"}</Button>,
            <Button onClick={handleCancel}>Cerrar</Button>
        ]
        }>


        {
            editingCita ?
                <CreateCitaForm cita={citaForEdit} setIsModalOpen={setIsModalOpen} getCitasData={getCitasData} setEditingCita={setEditingCita} hospital={id_hospital} pacientesData={pacientesData} />
                : <div>{citaForEdit && <div>
                    <p><strong>Medico </strong>{citaForEdit.doctor ? citaForEdit.doctor.name : 'Sin medico'}</p>
                    <p><strong>Paciente </strong>{citaForEdit.paciente ? citaForEdit.paciente.name : 'Sin paciente'}</p>
                    <p><strong>Fecha </strong>{new Date(citaForEdit.fecha_hora).toLocaleDateString()}</p>
                    <p><strong>Hora </strong>{new Date(citaForEdit.fecha_hora).toLocaleTimeString()}</p>
                    <p><strong>Servicio </strong>{citaForEdit.servicio}</p>
                    <p><strong>Comentarios </strong>{citaForEdit.comentarios}</p>
                    {/* <p><strong>Servicio ID </strong>{citaForEdit.id_servicio}</p> */}
                    <p><strong>Color </strong> <div style={{ width: 18, height: 8, backgroundColor: citaForEdit.color }}></div> </p>
                    {/* <Button type='primary' onClick={confirmService}>Confirmar Servicio</Button>, */}
                </div>
                }
                </div>
        }
    </Modal >
}