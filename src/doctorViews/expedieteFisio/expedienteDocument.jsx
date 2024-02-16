import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';

import Arial from '../../assets/fonts/arial/arial.ttf'
import Calibri from '../../assets/fonts/calibri/calibri.ttf'

import Logo from '../../assets/Logo.png'
import { IMAGE_API, getData } from '../../resources';

const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };

function ExpedientePDF({ pacienteData, expedienteData, idHospital }) {

    Font.register({ family: 'Arial', src: Arial });
    Font.register({ family: 'Calibri', src: Calibri });

    const [hospitalData, setHospitalData] = useState(null)

    useEffect(() => {
        const getHospitalData = () => {
            getData(`sucursales/${idHospital}`).then((rs) => {
                console.log(hospitalData)
                setHospitalData(rs[0])
            })
        }
        getHospitalData()
    }, [])

    const styles = StyleSheet.create({
        page: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'white',
            padding: 40,
            fontSize: 12
        },
        subtitle: { fontSize: 22, fontFamily: 'Calibri' },
        title3: { fontSize: 18, fontFamily: 'Calibri' },
        parrafo: {
            fontSize: 12, fontFamily: 'Arial'
        },
        respuesta: {
            fontSize: 12, fontWeight: 'bold'
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
        },
        image: {
            width: 80,
            paddingLeft: 16
        },
        limage: {
            width: 80
        },
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

                        {/* <View style={styles.tableRow}>
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
                        </View> */}

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
                                        <Text style={styles.text}>{row.completa ? 'Si' : 'No'}</Text>
                                    </View>
                                    <View style={styles.tableCol7}>
                                        <Text style={styles.text}>{row.ayuda ? 'Si' : 'No'}</Text>
                                    </View>
                                    <View style={styles.tableCol7}>
                                        <Text style={styles.text}>{row.dolor ? 'Si' : 'No'}</Text>
                                    </View>
                                    <View style={styles.tableCol7}>
                                        <Text style={styles.text}>{row.grados}</Text>
                                    </View>
                                    <View style={styles.tableCol7}>
                                        <Text style={styles.text}>{new Date(row.createdAt).toLocaleDateString()}</Text>
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


                        {/* <View style={styles.tableRow}>
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
                        </View> */}

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
                                        <Text style={styles.text}>{row.dolor ? 'Si' : 'No'}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.text}>{row.dinamometro}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.text}>{new Date(row.createdAt).toLocaleDateString()}</Text>
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
                        {/* <View style={styles.tableRow}>
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
                        </View> */}

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
                                        <Text style={styles.text}>{new Date(row.createdAt).toLocaleDateString()}</Text>
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

        const Separator = () => (<View style={styles.separator}></View>)

        const Question = ({ label, resp, bkg }) => (
            <View style={{ flexDirection: 'row', backgroundColor: bkg ? '#ebeff0' : 'white' }}>
                <View style={{ width: '55%' }}><Text style={styles.parrafo}>{label}</Text></View>
                <View style={{ width: '45%' }}><Text style={styles.respuesta}>{resp}</Text></View>
            </View>
        )

        const BQuestion = ({ label, resp, bkg }) => (
            <View style={{ flexDirection: 'row', backgroundColor: bkg ? '#ebeff0' : 'white' }}>
                <View style={{ width: '60%' }}><Text style={styles.parrafo}>{label}</Text></View>
                <View style={{ width: '40%' }}><Text style={styles.respuesta}>{resp ? 'Si' : 'No'}</Text></View>
            </View>
        )


        return <Document title={`${pacienteData.name}`}>
            <Page size="A4" orientation="vertical" style={styles.page}>

                <View style={{ textAlign: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontSize: 28, fontFamily: 'Calibri' }}>EXPEDIENTE</Text>
                        <Text>{new Date().toLocaleDateString('es-MX', dateOptions)}</Text>
                    </View>
                    {
                        hospitalData && hospitalData.logo &&
                        <Image style={{ width: 100, height: 80, overflow: 'hidden' }} source={`https://api.recreamed.com/images/${hospitalData.logo}`} />
                    }
                </View>

                <View>
                    <Text style={styles.subtitle}>Datos del paciente</Text>
                    <Question label='Nombre y apellidos:' resp={pacienteData.name} bkg />
                    <Question label='Sexo' resp={pacienteData.sexo} />
                    <Question label='Edad' resp={pacienteData.edad} bkg />
                    <Question label='Número de celular' resp={pacienteData.telefono} />
                    <Question label='Estado civil' resp={pacienteData.estado_civil} bkg />
                    <Question label='Ocupacion' resp={pacienteData.ocupacion} />
                </View>

                <Separator />

                <View>
                    <Text style={styles.subtitle}>Historia clinica</Text>
                    <Question label='Fecha de registro' resp={new Date(pacienteData.createdAt).toLocaleDateString('es-MX', dateOptions)} bkg />
                    <Question label='Motivo por el cual nos visita/padecimiento actual' resp={pacienteData.fisio_data.motivo_visita} />
                    <Question label='Viene referido por algún médico o entrenador?' resp={pacienteData.fisio_data.referido_medico} bkg />
                    <Question label='Cómo se enteró de nosotros?' resp={pacienteData.fisio_data.enterado_mosotros} />
                </View>

                <Separator />

                <View>
                    <Text style={styles.subtitle}>Antecedentes personales</Text>
                    <BQuestion label='Padece usted alguna enfermedad?' resp={pacienteData.fisio_data.enfermedad} bkg />
                    <BQuestion label='Toma algún medcamento?' resp={pacienteData.fisio_data.medicamento} />
                    <BQuestion label='Ha sdo intervendo quirurgicamente?' resp={pacienteData.fisio_data.intervenido} bkg />
                    <BQuestion label='Tabaquismo' resp={pacienteData.fisio_data.tabaquismo} />
                    <BQuestion label='Drogas' resp={pacienteData.fisio_data.drogas} bkg />
                    <BQuestion label='Alcoholismo' resp={pacienteData.fisio_data.alcoholismo} />
                    <BQuestion label='Suplemento alimenticio' resp={pacienteData.fisio_data.suplemento} bkg />
                    <BQuestion label='Ha sufrido alguna fractura, esguince, luxación o desgarre?' resp={pacienteData.fisio_data.fractura} />
                </View>

                <Separator />

                <View>
                    <Text style={styles.subtitle}>Antecedentes heredofamiliares</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <BQuestion label='Cancer' resp={pacienteData.fisio_data.cancer} bkg />
                        <BQuestion label='Diabetes' resp={pacienteData.fisio_data.dabetes} bkg />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <BQuestion label='Hipertension' resp={pacienteData.fisio_data.hipertension} />
                        <BQuestion label='Enfermedad Mental' resp={pacienteData.fisio_data.enfermedad_mental} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <BQuestion label='Enfermedades neurologicas' resp={pacienteData.fisio_data.neurologicas} bkg />
                        <BQuestion label='Cardiopatias' resp={pacienteData.fisio_data.cardiopatias} bkg />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <BQuestion label='Enfermedades reumaticas' resp={pacienteData.fisio_data.reumaticas} />
                        <BQuestion label='Malformaciones congénitas' resp={pacienteData.fisio_data.malformaciones} />
                    </View>

                </View>

                <Separator />

                <View style={{ textAlign: 'left' }}>
                    <Text style={{ fontSize: 22, fontFamily: 'Calibri' }}>Notas</Text>
                </View>

                {
                    expedienteData.map((nota, index) => (
                        <View>
                            <View style={{ textAlign: 'left' }}>
                                <Text style={{ fontSize: 18, fontFamily: 'Calibri' }}>Nota {index+1}</Text>
                            </View>
                            <View style={{ height: 12 }}></View>
                            <View >
                                <View style={{ flexDirection: 'row', backgroundColor: '#ebeff0' }}>
                                    <View style={{ width: '55%' }}><Text style={styles.parrafo}>Fecha: </Text></View>
                                    <View style={{ width: '45%' }}><Text style={styles.respuesta}>{new Date(nota.createdAt).toLocaleDateString('es-MX', dateOptions)}</Text></View>
                                </View>
                                <Question label='Cuál es el motivo de su consulta/lesión/patología?:' resp={nota.motivo} />
                                <Question label='Cuanto tiempo lleva con el problema?:' resp={nota.tiempo} bkg />
                                <Question label='En qué momento le duele más?:' resp={nota.momento_dia} />
                                <Question label='Con qué movimientos aumenta el dolor?:' resp={nota.movimientos} bkg />
                                <Question label='Localizaión del dolor:' resp={nota.localizacion} />
                                <Question label='Especificar:' resp={nota.localizacion_es} bkg />
                                <Question label='Tipo de dolor:' resp={nota.tipo} />
                                <Question label='Especificar:' resp={nota.tipo_es} bkg />
                                <Question label='Escala numerica analogica:' resp={nota.ena} />
                            </View>

                            <View style={styles.separator}></View>

                            <Text style={{ fontSize: 14 }}>Rangos de movimiento/goniometria</Text>
                            <GonioTable goniometria={nota.goniometria} />

                            <View style={styles.separator}></View>
                            <Text style={{ fontSize: 14 }}>Examen manual muscular</Text>
                            <ExamenesTable examenes={nota.examenes} />

                            <View style={styles.separator}></View>
                            <Text style={{ fontSize: 14 }}>Bitacora</Text>
                            <BitacoraTable bitacoras={nota.bitacoras} />
                        </View>
                    ))
                }



                <View style={{ flex: 1 }}></View>

                <View style={{ borderTop: '1pt solid #000', paddingTop: 4, flexDirection: 'row', justifyContent: 'space-between', fontSize: 10 }}>
                    {
                        hospitalData && <View>
                            <Text>{hospitalData.nombre} </Text>
                            <Text>{hospitalData.calle} N.{hospitalData.num_exterior}</Text>
                            <Text>Colonia {hospitalData.colonia}, {hospitalData.ciudad_municipio}, {hospitalData.estado}</Text>
                            <Text>Telefono: {hospitalData.telefono}, Correo: {hospitalData.email}</Text>
                            {/* <Text>{hospitalData.sitio_web}</Text> */}
                        </View>
                    }

                    <View style={{ textAlign: 'center' }}>
                        <Image style={styles.image} src={Logo} />
                        <Text >www.recreamed.com</Text>
                    </View>
                </View>

            </Page>


        </Document>
    }

    return <PDFViewer height={600} width={820}>
        <CartaEx />
    </PDFViewer>

}



export default function ExpedienteDocument({ isModalOpen, setIsModalOpen, pacienteData, id_paciente, idHospital }) {

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
            <ExpedientePDF pacienteData={pacienteData} expedienteData={expedienteData} idHospital={idHospital} />
        </Modal>
    )
}
