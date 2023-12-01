import React, { useState, useEffect } from 'react';
import { Button, Modal, message } from 'antd';
import { API, sendDataBody } from '../../resources';
import DetalleNota from './detalleNota'
import DetalleHistoria from './detalleHistoria';
import DetallesPaciente from '../pacientes/detalles.paciente';
import { PrinterOutlined, CloudDownloadOutlined } from '@ant-design/icons'
import ExpedienteDocument from './expedienteForPrint';
// import html2canvas from 'html2canvas'; deprecated
// import { jsPDF } from "jspdf";


export default function Expedientes({ paciente, setIsEditModalOpen }) {
    const [expedientesData, setExpedientesData] = useState(null);
    const [expedientesLoading, setExpedientesLoading] = useState(true);
    const [historia, setHistoria] = useState("");
    const [notas, setNotas] = useState("");

    // Print modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // Print modal end

    const { _id: id_paciente } = paciente;

    useEffect(() => {
        getExpedientesData(id_paciente)
    }, [id_paciente])


    const getExpedientesData = (id_paciente) => {
        // console.log('Received patient exp doc ', id_paciente)
        fetch(API + `expedientes/${id_paciente}`)
            .then(response => response.json())
            .then(data => {
                // console.log("GetExpData: ", data);
                setExpedientesData(data);
                if (typeof data != "undefined" && data !== null) {
                    setNotas(data.notas); setHistoria(data.historia);
                } else { setNotas(null); setHistoria(null) }
            })
            .finally(() => setExpedientesLoading(false))
    }

    // const printDocument = () => {
    //     const input = document.getElementById('expedient-export');
    //     html2canvas(input)
    //         .then((canvas) => {
    //             const imgData = canvas.toDataURL('image/png');
    //             const pdf = new jsPDF();
    //             pdf.addImage(imgData, 'JPEG', 0, 0);
    //             pdf.output('dataurlnewwindow');//Name of file?
    //             pdf.save("expediente.pdf");
    //         })
    //         ;
    // }


    async function addHistoria() {
        return sendDataBody('historias/add', {
            historial: "Historia clinica al " + new Date()
        })
    }

    const createPAtientData = async (usr) => {
        const historia = await addHistoria();
        const postBody = {
            usuario: usr,
            historia: historia.id_historia,
            notas: [],
            recetas: []
        }
        // console.log('postBodyForExpedient: ', postBody);

        sendDataBody('expedientes/add', postBody).then(response => {
            // console.log('Success:', response);
            message.success(response.message || response.error);
            if (response.message && response.message === 'Expediente creado correctamente') {
                getExpedientesData(id_paciente)
            }
        })

    }

    function DownloadConscent() {
        // El archvo de conscentmiento se guardará en ./uploads y se llamara con /notas/estudos/download de momento porque no hay un endpoint para archivo de conscentimento para subrlo sera en /notas/estudus/upload
        return <Button icon={  <CloudDownloadOutlined className="teamSocialIcon" />} style={{marginLeft: 12}} href={`${API}notas/estudios/download/3d4c9465-889f-428c-9e15-13bea15162ef.doc`}>
            Avso de Conscentmiento
        </Button>

    }



    if (expedientesLoading) return <p>Cargando...</p>

    return <div id='expedient-export' >

        {/* <h4 className='spacedTitle'>Expediente </h4> */}

        <div style={{ display: 'flex', flexDirection: 'row', gap: 15 }}>
            <DetallesPaciente paciente={paciente} setIsEditModalOpen={setIsEditModalOpen} />

            <DetalleHistoria historia={historia} detalles_paciente={paciente} />
        </div>




        {
            expedientesData ?
                <DetalleNota id_expediente={expedientesData._id} prevExpNotas={expedientesData.notas} paciente={id_paciente} datosPaciente={paciente} />
                :
                <div style={{}}>
                    Sin expediente
                    <br />
                    <br />
                    <Button onClick={() => { createPAtientData(id_paciente) }}>Crear Expediente Ahora</Button>
                </div>
        }

        <Button onClick={showModal} style={{ marginTop: 6 }} icon={<PrinterOutlined />}>Imprimir expediente</Button>


        <Modal title="Imprimir Expediente" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={900}>
            <ExpedienteDocument />
        </Modal>

        <DownloadConscent />

    </div>;
}
