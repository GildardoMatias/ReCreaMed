import React, { useState } from 'react';
import { Button, Modal, DatePicker, message } from 'antd';
import { ExportOutlined } from '@ant-design/icons'
import { API } from '../../resources';

export default function CsvEscalas() {

    const [start_date, setStart_date] = useState(null)
    const [end_date, setEnd_date] = useState(null)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setEnd_date(null)
        setStart_date(null)
        setIsModalOpen(false);
    };
    const onStartChange = (date, dateString) => {
        console.log(date, dateString);
        setStart_date(dateString)
    };
    const onEndChange = (date, dateString) => {
        console.log(date, dateString);
        setEnd_date(dateString)
    };
    const onFinish = async () => {
        console.log('Dates ', { startDate: start_date, endDate: end_date })

        try {
            const response = await fetch(API + 'encuestas/csv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ start_date, end_date })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'encuestas.csv';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            message.success('CSV descargado con éxito')
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }

    }

    return (
        <div>
            <Button icon={<ExportOutlined />} onClick={showModal}>
                Descargar resultados CSV
            </Button>
            <Modal title="Descargar resultados de escalas" open={isModalOpen} onOk={handleOk} onCancel={handleOk} destroyOnClose
                footer={[
                    <Button onClick={onFinish} disabled={(start_date && end_date) ? false : true} type='primary'>Descargar</Button>,
                    <Button onClick={handleOk}>Cerrar</Button>
                ]} >

                <span className='subdesc'>Seleccione rango de fechas para descargar resultados de escalas en CSV</span>
                <div className='fila'>
                    <div>
                        <p className='desc'>Fecha inicial</p>
                        <DatePicker onChange={onStartChange} />
                    </div>
                    <div>
                        <p className='desc'>Fecha final</p>
                        <DatePicker onChange={onEndChange} />
                    </div>
                </div>


            </Modal>
        </div>
    )
}
