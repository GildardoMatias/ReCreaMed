import React, { useEffect } from 'react'
import { Button, Modal } from 'antd'
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';

import Arial from '../../assets/fonts/arial/arial.ttf'
import Calibri from '../../assets/fonts/calibri/calibri.ttf'

import Logo from '../../assets/Logo.png'
import { usuario, IMAGE_API } from '../../resources';

function ExoneracionDocument({  namePaciente, expedienteData, historia, notas, recetas }) {

    useEffect(() => {
        // console.log('receta props', props)
    }, [])

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
                    <Text style={{ fontSize: 28, fontFamily: 'Calibri' }}>CARTA DE EXONERACION</Text>
                </view>

                <View style={{ height: 18 }}></View>

                <View >

                    <Text style={styles.parrafo}>El que suscribe, en pleno uso de mis facultades mentales y con plena ausencia de vicios de la voluntad, ASUMO TODOS LOS RIESGOS DE PARTICIPAR EN CUALRQUIERA/TODAS LAS TERAPIAS Y TRATAMIENTOS llevadas a cabo por el cuerpo clínico de CDEFIS (Centro del Deporte Fisioterapia y Salud)  ubicado en Avenida Lázaro Cárdenas #2707 dos mil setecientos siete, colonia Chapultepec Norte, Morelia Michoacán comprendidas en: VENDAJE NEUROMUSCULAR, VENTOSAS TERAPEUTICAS, LIBREACION MIOFASCIAL, DESCARGA MUSCULAR, MASAJE DEPORTIVO, ELECTROTERAPIA, PUNCION SECA, FORTALECIMIENTO MUSCULAR; TRATAMIENTOS PARA HERNIA DISCAL, NERVIO CIATICO, ESCOLIOSIS; FISIOTERAPIA PRE Y POST OPERATORIA DE COLUMNA, HOMBRO, RODILLA, CADERA,ETC; READAPTACION DEPORTIVA, ECOGRAFIA DIAGNOSTICA, UTLRASONIDO TERAPEUTICO, TRABAJO ISOINERCIAL, TERAPIA MANUAL, TERAPUA MANUAL INSTRUMENTALIZADA; TRATAMIENTOS CON ALTA FRECUENCIA RADIOFRECUENCIA CAVITACION, DERMAPEN, HIFU, ELECTROLIPOSIS, SPA, GALVANICO FACIAL, CORPORAL. Incluyendo a modo de ejemplo y sin limitación cualquier riesgo que pueda surgir por negligencia o descuido por parte de las personas liberadas, por equipos o bienes peligrosos o defectuosos, que sean de su propiedad mantenidos o controlados por ellos o por su posible responsabilidad sin culpa
                    </Text>
                    <View style={{ height: 12 }}></View>

                    <Text style={styles.parrafo}>
                        CERTIFICO que conozco y asumo los riesgos y contradicciones médicas que los tratamientos antes mencionados acarrean, así como DECLARO no tener alergias a ninguno de los productos, tratamientos y métodos a los cuales me veré sometido; así como, autorizo que se me realicen los tratamientos antes mencionados
                    </Text>
                    <View style={{ height: 12 }}></View>

                    <Text style={styles.parrafo}>
                        EXONERO totalmente de responsabilidades a la Clínica CDEFIS, así como personal administrativo y clínico, de toda culpa, responsabilidad civil y social por cualquier riesgo que pueda surgir por negligencia o descuido por parte de las personas liberadas, por equipos o bienes peligrosos o defectuosos, que sean de su propiedad mantenidos o controlados por ellos o por su posible responsabilidad sin culpa. </Text>
                </View>

                <View style={{ flex: 1 }}></View>

                <View style={{ textAlign: 'center' }}>
                    <View style={{ height: 1, width: '60%', backgroundColor: 'black', marginBottom: 8, alignSelf: 'center' }}></View>
                    <Text style={{ fontSize: 14, fontFamily: 'Calibri' }}> {namePaciente} </Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Calibri' }}>{new Date().toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })} </Text>
                    {/* <Text style={{ fontSize: 14, fontFamily: 'Calibri' }}>Nombre, Fecha y firma del paciente</Text> */}
                </View>

                <View style={{ height: 12 }}></View>

            </Page>


        </Document>
    }

    return <PDFViewer height={600} width={820}>
        <CartaEx />
    </PDFViewer>

}



export default function Exoneracion({ isModalOpen, setIsModalOpen, namePaciente }) {


    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal title="Carta de exoneración" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={900}
        footer={[
            <Button type='primary' onClick={handleCancel}>Cerrar</Button>
        ]}>
            <ExoneracionDocument namePaciente={namePaciente}/>
        </Modal>
    )
}
