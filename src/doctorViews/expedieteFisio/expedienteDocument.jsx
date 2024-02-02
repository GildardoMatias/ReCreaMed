import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';

import Arial from '../../assets/fonts/arial/arial.ttf'
import Calibri from '../../assets/fonts/calibri/calibri.ttf'

import Logo from '../../assets/Logo.png'
import { usuario, IMAGE_API, getData } from '../../resources';

function ExpedientePDF({ namePaciente, expedienteData, historia, notas, recetas }) {


    Font.register({ family: 'Arial', src: Arial });
    Font.register({ family: 'Calibri', src: Calibri });

    const styles = StyleSheet.create({
        page: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'white',
            padding: 50
        },
        parrafo: {
            fontSize: 12, fontFamily: 'Arial', textAlign: 'justify'
        }
    });

    // Create Document Component
    function CartaEx() {
        return <Document title={`${namePaciente}`}>
            <Page size="A4" orientation="vertical" style={styles.page}>

                <view style={{ textAlign: 'center' }}>
                    <Text style={{ fontSize: 28, fontFamily: 'Calibri' }}>EXPEDIENTE</Text>
                </view>

                <View style={{ height: 18 }}></View>

                <View >

                    <Text style={styles.parrafo}>Ey  </Text>
                    <View style={{ height: 12 }}></View>

                    <Text style={styles.parrafo}>
                        {JSON.stringify(expedienteData)}
                    </Text>
                    <View style={{ height: 12 }}></View>

                </View>

                <View style={{ flex: 1 }}></View>

                <View style={{ textAlign: 'center' }}>
                    <View style={{ height: 1, width: '60%', backgroundColor: 'black', marginBottom: 8, alignSelf: 'center' }}></View>
                    <Text style={{ fontSize: 14, fontFamily: 'Calibri' }}> {namePaciente} </Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Calibri' }}>{new Date().toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })} </Text>
                </View>

                <View style={{ height: 12 }}></View>

            </Page>


        </Document>
    }

    return <PDFViewer height={600} width={820}>
        <CartaEx />
    </PDFViewer>

}



export default function ExpedienteDocument({ isModalOpen, setIsModalOpen, namePaciente, id_paciente }) {

    const [expedienteData, setExpedienteData] = useState({})
    useEffect(() => {
        getExpedienteData()
    }, [id_paciente])


    const getExpedienteData = () => {
        getData(`fexpedientes/${id_paciente}`).then((rs) => {
            console.log('idExp ', id_paciente)
            console.log('ExpedienteData ', rs)
            setExpedienteData(rs)
        })
    }


    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal title="Expediente" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={900}
            footer={[
                <Button type='primary' onClick={handleCancel}>Cerrar</Button>
            ]}>
            <ExpedientePDF namePaciente={namePaciente} expedienteData={expedienteData} />
        </Modal>
    )
}
