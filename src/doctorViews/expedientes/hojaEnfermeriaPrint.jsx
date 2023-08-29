import React, { useEffect } from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import Logo from '../../assets/Logo.png'
import { usuario, IMAGE_API } from '../../resources';

// export default function HojaDocument(receta, logoHospital, nombreHospital, datosPaciente) {
export default function HojaDocument({ nombreHospital, logoHospital, receta, datosPaciente }) {

    useEffect(() => {
        // console.log('hoja enf props', props)
        // console.log('hoja enf receta', receta)
        // console.log('hoja enf logoHospital', logoHospital)
        // console.log('hoja enf nombreHospital', nombreHospital)
        // console.log('hoja enf datosPaciente', datosPaciente)
    }, [])


    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: '#ffffff',
            padding: 20,
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
        },
        logo: {
            width: 100,
            // height: 100,
        },
        content: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginBottom: 20,
        },
        text: {
            fontSize: 12,
        },
        tableContainer: {
            marginBottom: 20,
        },
        table: {
            width: '100%',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: 'black',
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
            height: 100,
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

                <View style={styles.header}>
                    <Text>HOJA DE ENFERMERÍA</Text>
                </View>

                <View style={[styles.content, { justifyContent: 'flex-end' }]}>
                    <Text style={styles.text}>Fecha: 29 de agosto de 2023</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.text}>Nombre: John Doe</Text>
                    <Text style={styles.text}>Folio: 12345</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.text}>Aplicacion: John Doe</Text>
                    <Text style={styles.text}>Peso: 12345</Text>
                    <Text style={styles.text}>Dosis: 12345</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.text}>Medico: John Doe</Text>
                </View>

            </Page>


        </Document>

        // return <Document>
        //     <Page size="A4" style={styles.page}>
        //         <View style={styles.header}>
        //             <Image style={styles.logo} src={IMAGE_API + logoHospital} />
        //         </View>
        //         <View style={styles.content}>
        //             <Text style={styles.text}>Fecha: 29 de agosto de 2023</Text>
        //         </View>
        //         <View style={styles.content}>
        //             <Text style={styles.text}>Nombre: John Doe</Text>
        //             <Text style={styles.text}>Folio: 12345</Text>
        //         </View>
        //         <View style={styles.tableContainer}>
        //             <View style={styles.table}>
        //                 <View>
        //                     <View style={styles.View}>Título 1</View>
        //                     <View style={styles.View}>Título 2</View>
        //                     <View style={styles.View}>Título 3</View>
        //                     <View style={styles.View}>Título 4</View>
        //                     <View style={styles.View}>Título 5</View>
        //                 </View>

        //             </View>
        //         </View>
        //         <View style={styles.centeredText}>
        //             <Text>Este es un texto centrado.</Text>
        //         </View>
        //         <View>
        //             <Text>Recuadro para llenar texto:</Text>
        //             <View style={styles.textarea} />
        //         </View>
        //     </Page>
        // </Document>
    }
    return <div>
        <PDFViewer height={500} width={550}>
            <Receta />
        </PDFViewer>
    </div>

}