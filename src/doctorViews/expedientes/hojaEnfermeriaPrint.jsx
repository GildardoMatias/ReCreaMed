import React, { useEffect } from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import Logo from '../../assets/Logo.png'
import { usuario, IMAGE_API } from '../../resources';

// export default function HojaDocument(receta, logoHospital, nombreHospital, datosPaciente) {
export default function HojaDocument({ nombreHospital, logoHospital, receta, datosPaciente }) {

    const { createdAt, peso, dosis, inicio, intermedio, termino, observaciones, aplicacion } = receta;

    const { name, medicos_asignados } = datosPaciente;

    useEffect(() => {
        // console.log('hoja enf props', props)
        console.log('hoja enf ', receta)
        // console.log('hoja enf logoHospital', logoHospital)
        // console.log('hoja enf nombreHospital', nombreHospital)
        console.log('hoja enf datosPaciente', datosPaciente)
    }, [])


    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#ffffff',
            padding: 30,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginBottom: 20,
        },
        title: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 30,
            fontSize: 18
        },
        subtitle: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 15,
            fontSize: 15
        },
        logo: {
            width: 100,
            // height: 100,
        },
        content: {
            flexDirection: 'row',
            rowGap: 12,
            justifyContent: 'space-between',
            marginBottom: 20,
        },
        text: {
            fontSize: 14,
        },
        table: {
            display: "table",
            width: "auto",
            borderStyle: "solid",
            borderWidth: 1,
            borderRightWidth: 0,
            borderBottomWidth: 0,
        },
        tableRow: {
            margin: "auto",
            flexDirection: "row",
        },
        tableCol: {
            width: "14.285%", // Cambiado para 7 columnas
            borderStyle: "solid",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderTopWidth: 0,
        },
        tableCell: {
            margin: "auto",
            marginTop: 5,
            fontSize: 10
        },
        tableContainer: {
            marginBottom: 20,
        },
        tableHeader: {
            backgroundColor: '#f0f0f0',
            borderBottomWidth: 1,
        },
        View: {
            margin: 5,
            padding: 5,
            borderWidth: 1,
            borderColor: 'black',
        },
        centeredText: {
            textAlign: 'center',
            marginBottom: 20,
        },
        textarea: {
            borderWidth: 1,
            borderColor: 'black',
            padding: 5,
            height: 140,
        },
    });

    // Create Document Component
    function Receta() {
        return <Document>
            <Page size="A4" style={styles.page}>

                <View style={styles.header}>
                    <Image style={styles.logo} src={IMAGE_API + logoHospital} />
                    {/* <Text>{logoHospital}</Text> */}
                </View>

                <View style={styles.title}>
                    <Text>HOJA DE ENFERMERÍA</Text>
                </View>

                <View style={[styles.content, { justifyContent: 'flex-end' }]}>
                    <Text style={styles.fecha}>Fecha: {new Date(createdAt).toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.text}>Nombre: {name}</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.text}>APLICACION: {aplicacion + 1}</Text>
                    <Text style={styles.text}>PESO: {peso}</Text>
                    <Text style={styles.text}>DOSIS: {dosis}</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.text}>MEDICO TRATANTE:</Text>
                    {
                        medicos_asignados.map((m) => {
                            return <Text style={styles.text}>{m.name}</Text>
                        })
                    }
                </View>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}></Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Hora</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Temperatura</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Frecuencia Respiratoria</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Frecuencia Cardiaca</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Presión Arterial</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Saturación de Oxigeno</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Inicio</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{new Date(inicio.hora).toLocaleTimeString()}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{inicio.temperatura}°</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{inicio.frecuencia_respiratoria}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{inicio.frecuencia_cardiaca}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{inicio.presion_arterial}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{inicio.saturacion_oxigeno}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Intermedio</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{new Date(intermedio.hora).toLocaleTimeString()}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{intermedio.temperatura}°</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{intermedio.frecuencia_respiratoria}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{intermedio.frecuencia_cardiaca}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{intermedio.presion_arterial}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{intermedio.saturacion_oxigeno}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Término</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{new Date(termino.hora).toLocaleTimeString()}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{termino.temperatura}°</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{termino.frecuencia_respiratoria}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{termino.frecuencia_cardiaca}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{termino.presion_arterial}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{termino.saturacion_oxigeno}</Text>
                        </View>
                    </View>

                </View>

                <View style={styles.subtitle}>
                    <Text>SIGNOS Y SÍNTOMAS (OBSERVACIONES DE ENFERMERÍA)</Text>
                </View>

                <View>
                    <View style={styles.textarea} >
                        <Text style={{ fontSize: 12 }}>{observaciones}</Text>
                    </View>
                </View>

                <View style={styles.subtitle}>
                    <Text>ENFERMERO RESPONSABLE</Text>
                </View>
                <View style={{ color: 'black', width: '94%', backgroundColor: 'black', borderBottomColor: 'black', borderBottomWidth: 2, marginHorizontal: 20, alignSelf: 'center' }}></View>
                <View style={styles.subtitle}>
                    <Text>NOMBRE Y FIRMA</Text>
                </View>

            </Page>


        </Document>

    }
    return <div>
        <PDFViewer height={700} width={550}>
            <Receta />
        </PDFViewer>
    </div>

}