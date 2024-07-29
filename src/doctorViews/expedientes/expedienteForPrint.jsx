import React, { useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import Logo from '../../assets/Logo.png'
import { usuario } from '../../resources';

export default function ExpedienteDocument({ pacienteData, expedienteData, historia, notas, recetas, citas }) {


    const { historial = "" } = historia[0];
    const lines = historial.split('\n');

    useEffect(() => {
        // console.log('receta props', props)
    }, [])

    // Create styles
    // Styles for a4
    // const styles = StyleSheet.create({
    //     page: {
    //         flexDirection: 'column',
    //         backgroundColor: 'white'
    //     },
    //     block: {
    //         flexDirection: 'row'
    //     },
    //     section: {
    //         margin: 10,
    //         padding: 10,
    //         flexGrow: 1
    //     },
    //     image: {
    //         // marginVertical: 15,
    //         // marginHorizontal: 10,
    //         width: 132
    //     },
    //     footText: {
    //         fontSize: 14
    //     }
    // });
    // Styles for a5
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: 'white',
            margin: 15
        },
        block: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        sectionFull: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        },
        section: {
            margin: 10,
            padding: 10,
        },
        image: {
            width: 64
        },
        desc: {
            fontSize: 12
        },
        footText: {
            fontSize: 14
        },
        prescription: {
            fontSize: 16
        }
    });

    const Divider = () => {
        return <View style={{ color: 'black', width: '94%', backgroundColor: 'black', borderBottomColor: '#9bb4df', borderBottomWidth: 1, marginHorizontal: 10 }}></View>
    }

    // Create Document Component
    function Receta() {
        return <Document>
            <Page size="A4" orientation="vertical" style={styles.page}>

                <View style={styles.section}>
                    <Text>EXPEDIENTE</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.footText}>Paciente: {pacienteData.name}</Text>
                    {/* <Text style={styles.footText}>Fecha: {new Date().toLocaleString()}</Text> */}
                </View>


                <Divider />


                <View style={styles.sectionFull}>


                    <View style={styles.section}>
                        <Text style={styles.footText}>Historia clinica</Text>
                        {historial && lines.map((line, index) => (
                            <Text key={index} style={styles.desc}>
                                {line}
                            </Text>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.footText}>Citas</Text>
                        {
                            citas.length > 0 ? citas.map((cita) => {
                                return <View style={{marginBottom: 6}}>

                                    <Text style={styles.desc}>Fecha y hora: {cita.fecha_hora}</Text>
                                    <Text style={styles.desc}>Medico: {cita.medico.name}</Text>
                                    <Text style={styles.desc}>Paciente: {cita.medico.name}</Text>
                                    <Text style={styles.desc}>Servicio: {cita.servicio}</Text>
                                    <Text style={styles.desc}>Comentarios: {cita.comentarios}</Text>
                                </View>
                            }) : <Text style={styles.desc}>Sin citas registradas</Text>
                        }
                    </View>

                </View>


                <Divider />

                <View style={styles.block}>
                    <View style={styles.section}>
                        {/* <Text style={styles.footText}>José Rubén Romero #103, Bosque Camelinas</Text>
                        <Text style={styles.footText}>Morelia, Mich. CP 58290</Text>
                        <Text style={styles.footText}>Tel. (443) 3235088, Cel (443) 356 7822</Text> */}
                        <Text style={styles.footText}>{usuario.email}</Text>
                        <Text style={styles.footText}>{usuario.telefono}</Text>
                    </View>
                    <View style={styles.section}>
                        <Image style={styles.image} src={Logo} />
                        <Text style={{ fontSize: 10, }}>www.recreamed.com</Text>
                    </View>
                </View>
            </Page>


        </Document>
    }
    return <div>
        <PDFViewer height={600} width={820}>
            <Receta />
        </PDFViewer>
    </div>

}