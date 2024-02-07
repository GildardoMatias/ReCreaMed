import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';

import Arial from '../../assets/fonts/arial/arial.ttf'
import Calibri from '../../assets/fonts/calibri/calibri.ttf'

import Logo from '../../assets/Logo.png'
import { usuario, IMAGE_API, getData } from '../../resources';

const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };

function ExpedientePDF({ namePaciente, expedienteData, historia, notas, recetas }) {

    Font.register({ family: 'Arial', src: Arial });
    Font.register({ family: 'Calibri', src: Calibri });

    const styles = StyleSheet.create({
        page: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'white',
            padding: 40
        },
        parrafo: {
            fontSize: 12, fontFamily: 'Arial', textAlign: 'justify'
        },
        subpage: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'
        },
        section: {
            // margin: 10,
            // padding: 10,
            flexGrow: 1
        },
        table: {
            display: 'table',
            width: 'auto',
            borderStyle: 'solid',
            borderWidth: 1,
            borderRightWidth: 0,
            borderBottomWidth: 0
        },
        tableRow: {
            margin: 'auto',
            flexDirection: 'row'
        },
        tableCol: {
            width: '20%',
            borderStyle: 'solid',
            borderWidth: 1,
            borderLeftWidth: 0,
            borderTopWidth: 0
        },
        tableCol7: {
            width: '14.28%',
            borderStyle: 'solid',
            borderWidth: 1,
            borderLeftWidth: 0,
            borderTopWidth: 0
        },
        text: {
            margin: 5,
            fontSize: 10
        },
        separator: {
            height: 14
        }
    });


    // Create Document Component
    function CartaEx() {

        const GonioTable = ({ goniometria }) => (
            <View style={styles.subpage}>
                <View style={styles.section}>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol7}>
                                <Text style={styles.text}>Articulacion</Text>
                            </View>
                            <View style={styles.tableCol7}>
                                <Text style={styles.text}>Movimiento</Text>
                            </View>
                            <View style={styles.tableCol7}>
                                <Text style={styles.text}>Completa</Text>
                            </View>
                            <View style={styles.tableCol7}>
                                <Text style={styles.text}>Ayuda</Text>
                            </View>
                            <View style={styles.tableCol7}>
                                <Text style={styles.text}>Dolor</Text>
                            </View>
                            <View style={styles.tableCol7}>
                                <Text style={styles.text}>Grados</Text>
                            </View>
                            <View style={styles.tableCol7}>
                                <Text style={styles.text}>Fecha</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol7}>
                                <Text style={styles.text}>Articulaxion 1</Text>
                            </View>
                            <View style={styles.tableCol7}>
                                <Text style={styles.text}>Mov 1</Text>
                            </View>
                            <View style={styles.tableCol7}>
                                <Text style={styles.text}>Si</Text>
                            </View>
                            <View style={styles.tableCol7}>
                                <Text style={styles.text}>Si</Text>
                            </View>
                            <View style={styles.tableCol7}>
                                <Text style={styles.text}>Si</Text>
                            </View>
                            <View style={styles.tableCol7}>
                                <Text style={styles.text}>90</Text>
                            </View>
                            <View style={styles.tableCol7}>
                                <Text style={styles.text}>2024-01-24-T15:42:01.373Z</Text>
                            </View>
                        </View>

                        {
                            goniometria.map((row) => (
                                <View style={styles.tableRow}>
                                    <View style={styles.tableCol7}>
                                        <Text style={styles.text}>{row.articulacion}</Text>
                                    </View>
                                    <View style={styles.tableCol7}>
                                        <Text style={styles.text}>{row.movimiento}</Text>
                                    </View>
                                    <View style={styles.tableCol7}>
                                        <Text style={styles.text}>{row.completa}</Text>
                                    </View>
                                    <View style={styles.tableCol7}>
                                        <Text style={styles.text}>{row.ayuda}</Text>
                                    </View>
                                    <View style={styles.tableCol7}>
                                        <Text style={styles.text}>{row.dolor}</Text>
                                    </View>
                                    <View style={styles.tableCol7}>
                                        <Text style={styles.text}>{row.grados}</Text>
                                    </View>
                                    <View style={styles.tableCol7}>
                                        <Text style={styles.text}>{row.createdAt}</Text>
                                    </View>
                                </View>
                            ))
                        }

                        <View style={styles.tableRow}>
                            {/* Contenido de la fila 3 */}
                        </View>
                    </View>
                </View>
            </View>
        );

        const ExamenesTable = ({ examenes }) => {
            return <View style={styles.subpage}>
                <View style={styles.section}>

                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.text}>Grupo</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.text}>Referenca</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.text}>Dolor</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.text}>Dinamometro</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.text}>Fecha</Text>
                            </View>
                        </View>


                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.text}>Grupo 1</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.text}>Referencia 1</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.text}>Si</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.text}>Dinamometro 1</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.text}>2024-01-24-T15:42:01.373Z</Text>
                            </View>
                        </View>

                        {
                            examenes.map((row) => (
                                <View style={styles.tableRow}>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.text}>{row.grupo}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.text}>{row.referencia}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.text}>{row.dolor}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.text}>{row.dinamometro}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.text}>{row.createdAt}</Text>
                                    </View>
                                </View>
                            ))
                        }
                    </View>
                </View>
            </View>

        }

        const BitacoraTable = ({ bitacoras }) => (
            <View style={styles.subpage}>
                <View style={styles.section}>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol7}>
                                <Text style={styles.text}>Aparatologa</Text>
                            </View>
                            <View style={styles.tableCol7}>
                                <Text style={styles.text}>Técncas manuales</Text>
                            </View>
                            <View style={styles.tableCol7}>
                                <Text style={styles.text}>Ejercicio</Text>
                            </View>
                            <View style={styles.tableCol7}>
                                <Text style={styles.text}>Otros</Text>
                            </View>
                            <View style={styles.tableCol7}>
                                <Text style={styles.text}>Estado en el que llega el paciente</Text>
                            </View>
                            <View style={styles.tableCol7}>
                                <Text style={styles.text}>Estado en el que se retira el paciente</Text>
                            </View>
                            <View style={styles.tableCol7}>
                                <Text style={styles.text}>Fisioterapeuta que atendió</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol7}>
                                <Text style={styles.text}>Articulaxion 1</Text>
                            </View>
                            <View style={styles.tableCol7}>
                                <Text style={styles.text}>Mov 1</Text>
                            </View>
                            <View style={styles.tableCol7}>
                                <Text style={styles.text}>Si</Text>
                            </View>
                            <View style={styles.tableCol7}>
                                <Text style={styles.text}>Si</Text>
                            </View>
                            <View style={styles.tableCol7}>
                                <Text style={styles.text}>Si</Text>
                            </View>
                            <View style={styles.tableCol7}>
                                <Text style={styles.text}>90</Text>
                            </View>
                            <View style={styles.tableCol7}>
                                <Text style={styles.text}>2024-01-24-T15:42:01.373Z</Text>
                            </View>
                        </View>

                        {
                            bitacoras.map((row) => (
                                <View style={styles.tableRow}>
                                    <View style={styles.tableCol7}>
                                        <Text style={styles.text}>{row.aparatologia}</Text>
                                    </View>
                                    <View style={styles.tableCol7}>
                                        <Text style={styles.text}>{row.tecnicas}</Text>
                                    </View>
                                    <View style={styles.tableCol7}>
                                        <Text style={styles.text}>{row.ejercicio}</Text>
                                    </View>
                                    <View style={styles.tableCol7}>
                                        <Text style={styles.text}>{row.otros}</Text>
                                    </View>
                                    <View style={styles.tableCol7}>
                                        <Text style={styles.text}>{row.estado_llegada}</Text>
                                    </View>
                                    <View style={styles.tableCol7}>
                                        <Text style={styles.text}>{row.estado_salida}</Text>
                                    </View>
                                    <View style={styles.tableCol7}>
                                        <Text style={styles.text}>{row.fisioterapeuta}</Text>
                                    </View>
                                </View>
                            ))
                        }

                        <View style={styles.tableRow}>
                            {/* Contenido de la fila 3 */}
                        </View>
                    </View>
                </View>
            </View>
        );


        return <Document title={`${namePaciente}`}>
            <Page size="A4" orientation="vertical" style={styles.page}>

                <View style={{ textAlign: 'center' }}>
                    <Text style={{ fontSize: 28, fontFamily: 'Calibri' }}>EXPEDIENTE</Text>
                </View>

                <View style={{ height: 18 }}></View>

                <View style={{ textAlign: 'left' }}>
                    <Text style={{ fontSize: 22, fontFamily: 'Calibri' }}>Notas</Text>
                </View>





                <View>
                    <View style={{ textAlign: 'left' }}>
                        <Text style={{ fontSize: 18, fontFamily: 'Calibri' }}>Nota 1</Text>
                    </View>
                    <View style={{ height: 12 }}></View>
                    <View >
                        <Text style={styles.parrafo}>Fecha: {new Date(expedienteData[0].createdAt).toLocaleDateString('es-MX', dateOptions)}</Text>
                        <Text style={styles.parrafo}>Cuál es el motivo de su consulta/lesión/patología?: {expedienteData[0].motivo}</Text>
                        <Text style={styles.parrafo}>Cuanto tiempo lleva con el problema?: {expedienteData[0].tiempo}</Text>
                        <Text style={styles.parrafo}>En qué momento le duele más?: {expedienteData[0].momento_dia}</Text>
                        <Text style={styles.parrafo}>Con qué movimientos aumenta el dolor?: {expedienteData[0].movimientos}</Text>
                        <Text style={styles.parrafo}>Localizaión del dolor: {expedienteData[0].localizacion}</Text>
                        <Text style={styles.parrafo}>Especificar: {expedienteData[0].localizacion_es}</Text>
                        <Text style={styles.parrafo}>Tipo de dolor: {expedienteData[0].tipo}</Text>
                        <Text style={styles.parrafo}>Especificar: {expedienteData[0].tipo_es}</Text>
                        <Text style={styles.parrafo}>Escala numerica analogica: {expedienteData[0].ena}</Text>
                    </View>

                    <View style={styles.separator}></View>

                    <Text style={{ fontSize: 14 }}>Rangos de movimiento/goniometria</Text>
                    <GonioTable goniometria={expedienteData[0].goniometria} />

                    <View style={styles.separator}></View>
                    <Text style={{ fontSize: 14 }}>Examen manual muscular</Text>
                    <ExamenesTable examenes={expedienteData[0].examenes} />

                    <View style={styles.separator}></View>
                    <Text style={{ fontSize: 14 }}>Bitacora</Text>
                    <BitacoraTable bitacoras={expedienteData[0].bitacoras} />
                </View>




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
