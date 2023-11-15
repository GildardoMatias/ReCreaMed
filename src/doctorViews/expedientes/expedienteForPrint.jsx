import React, { useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import Logo from '../../assets/Logo.png'
import { usuario, IMAGE_API } from '../../resources';

export default function ExpedienteDocument(props) {

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
            backgroundColor: 'white'
        },
        block: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        sectionFull: {
            marginHorizontal: 55,
            // padding: 10,
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
        },
    });
    // Create Document Component
    function Receta() {
        return <Document>
            <Page size="A4" orientation="vertical" style={styles.page}>

                <View style={styles.block}>
                    <View style={[styles.section, { alignItems: 'center' }]}>
                        <Text style={styles.footText}>Dr. {usuario.name}</Text>
                        <View style={{ color: 'black', width: '60%', backgroundColor: 'black', borderBottomColor: '#9bb4df', borderBottomWidth: 1 }}></View>
                        {usuario.especialidad && <Text style={styles.footText}>{usuario.especialidad}</Text>}
                    </View>
                    <View style={[styles.section, { alignItems: 'center' }]}>
                        {
                            usuario.universidades && usuario.universidades.map((u) => <View style={{ alignItems: 'center' }}>
                                <Text style={(usuario.universidades && usuario.universidades.length) > 1 ? styles.desc : styles.footText}>{u.carrera}</Text>
                                <Text style={(usuario.universidades && usuario.universidades.length) > 1 ? styles.desc : styles.footText}>{u.universidad.toUpperCase()}</Text>
                            </View>)
                        }
                        <Text style={(usuario.universidades && usuario.universidades.length) > 1 ? styles.desc : styles.footText}>Ced. Prof.: {usuario.cedula}</Text>
                    </View>
                </View>

                <View style={styles.sectionFull}>
                    <Text style={styles.footText}>Expediente del paciente: </Text>
                    {/* <Text style={styles.footText}>Fecha: {new Date().toLocaleString()}</Text> */}
                </View>

                <View style={styles.sectionFull}>
                    <Text style={[styles.prescription, { lineHeight: 2 }]}></Text>
                </View>

                <View style={{ color: 'black', width: '94%', backgroundColor: 'black', borderBottomColor: '#9bb4df', borderBottomWidth: 1, marginHorizontal: 20 }}></View>
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