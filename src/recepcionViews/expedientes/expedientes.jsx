import React, { useState, useEffect } from 'react';
import { Button, Select, Space } from 'antd';
import { API } from '../../resources';
import CreateExpedient from './createExpedient';
import DetalleNota from './detalleNota'
import DetalleHistoria from './detalleHistoria';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";


export default function Expedientes(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [expedientesData, setExpedientesData] = useState([]);
    const [expedientesLoading, setExpedientesLoading] = useState(true);
    const [historia, setHistoria] = useState("");
    const [notas, setNotas] = useState("");


    useEffect(() => {
        getExpedientesData(props.paciente)
    }, [props.paciente])


    const getExpedientesData = (id_paciente) => {
        fetch(API + `expedientes/${id_paciente}`)
            .then(response => response.json())
            .then(data => {
                // console.log("GetExpData: ", data);
                setExpedientesData(data);
                if (typeof data != "undefined") {
                    setNotas(data.notas); setHistoria(data.historia);
                } else { setNotas(null); setHistoria(null) }
            })
            .finally(() => setExpedientesLoading(false))
    }

    const printDocument = () => {
        const input = document.getElementById('expedient-export');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                // pdf.output('dataurlnewwindow');
                pdf.save("expediente.pdf");
            })
            ;
    }


    return <div id='expedient-export' >

        <Space size='middle'><h4>Expediente </h4><h3> </h3></Space>

        <DetalleHistoria historia={historia} />

        <DetalleNota notas={notas} id_expediente={expedientesData._id} prevExpNotas={expedientesData.notas} paciente={props.paciente} />

        <CreateExpedient isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} pacientesData={[]} />

        <Button onClick={printDocument}>Exportar a pdf</Button>

    </div>;
}
