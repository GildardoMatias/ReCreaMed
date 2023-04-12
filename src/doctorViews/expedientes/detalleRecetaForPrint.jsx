import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import Logo from '../../assets/Logo.png'
import { usuario, IMAGE_API } from '../../resources';

export default function RecetaDocument(props) {
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
            flexDirection: 'row'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        },
        image: {
            // marginVertical: 15,
            // marginHorizontal: 10,
            width: 82
        },
        footText: {
            fontSize: 14
        }
    });
    // Create Document Component
    function Receta() {
        return <Document>
            <Page size="A5" orientation="landscape" style={styles.page}>

                <View style={styles.block}>
                    <View style={styles.section}>
                        <Image style={styles.image} src={IMAGE_API + props.logoHospital} />
                    </View>
                    <View style={[styles.section, { alignItems: 'center' }]}>
                        <Text style={styles.footText}>{usuario.name}</Text>
                        <Text style={styles.footText}>Cédula Profesional: {usuario.cedula}</Text>
                        <Text style={styles.footText}>Certificación: {usuario.certificacion}</Text>
                        <Text style={styles.footText}>{usuario.universidad}</Text>
                    </View>
                </View>

                <View style={{ margin: 35, flexGrow: 1 }}>
                    <View style={styles.section}>
                        <Text style={{ lineHeight: 2 }}>{props.receta.prescripcion}</Text>
                        {/* <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic veniam totam praesentium sapiente, provident, quidem deleniti magni ea fuga laborum dignissimos saepe sed voluptatibus voluptates? Iste consequuntur qui ab facere.</Text> */}
                    </View>
                </View>

                <View style={{ color: 'black', width: '90%', backgroundColor: 'black', borderBottomColor: '#9bb4df', borderBottomWidth: 1, marginHorizontal: 20 }}></View>
                <View style={styles.block}>
                    <View style={styles.section}>
                        {/* <Text style={styles.footText}>José Rubén Romero #103, Bosque Camelinas</Text>
                        <Text style={styles.footText}>Morelia, Mich. CP 58290</Text>
                        <Text style={styles.footText}>Tel. (443) 3235088, Cel (443) 356 7822</Text> */}
                        <Text style={styles.footText}>Pagina de la clinica, Correo@clinica.com</Text>
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
        <PDFViewer height={500} width={550}>
            <Receta />
        </PDFViewer>
    </div>

}