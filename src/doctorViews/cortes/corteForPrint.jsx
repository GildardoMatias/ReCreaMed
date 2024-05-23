import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import { dateOptions } from '../../resources';


// Estilo para el ticket
const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    reportTitle: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Helvetica',
        marginBottom: 20,
    },
    text: {
        margin: 10,
        fontSize: 12,
        textAlign: 'justify',
        fontFamily: 'Helvetica',
    },
    sellerBuyerInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginBottom: 10,
    },
    infoTitle: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 12,
    },
    infoText: {
        fontFamily: 'Helvetica',
        fontSize: 12,
    },
    table: {
        display: 'table',
        width: 'auto',
        marginTop: 10,
        marginBottom: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
    },
    tableColHeader: {
        width: '25%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        fontFamily: 'Helvetica-Bold',
        fontSize: 12,
        paddingTop: 5,
        paddingBottom: 5,
    },
    tableCol: {
        width: '25%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        textAlign: 'center',
        fontFamily: 'Helvetica',
        fontSize: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    tableCellHeader: {
        margin: 'auto',
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
    },
    total: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 14,
        marginTop: 30,
        textAlign: 'right',
        paddingRight: 50,
    },

    page: {
        fontFamily: 'Helvetica',
        fontSize: 12,
        padding: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent: 'space-between', 
        borderBottom: '1pt solid #000',
        paddingBottom: 10,
        marginBottom: 10,
    },
    lineDivider: {
        borderBottom: '1pt solid #000',
        paddingBottom: 10,
        marginBottom: 10,
    },
    logo: {
        width: 60,
        height: 60,
        marginRight: 14,
    },
    title: {
        fontSize: 20,
        marginLeft: 10,
    },
    company: {
        fontSize: 14,
        marginTop: 5,
        marginLeft: 10,
    },
});

// Estilo para la tabla de totales
const tableStyles = StyleSheet.create({
    table: {
        display: 'table',
        width: 'auto',
        marginTop: 10,
        marginBottom: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
        // height: 14
    },
    tableCol: {
        width: '50%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        textAlign: 'center',
        fontFamily: 'Helvetica',
        fontSize: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    tableColLeft: {
        width: '50%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        textAlign: 'center',
        fontFamily: 'Helvetica-Bold',
        fontSize: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
})

// Componente del ticket
export default function CorteDocument({ corte, totales, logo, ingresos, hospital }) {
    console.log('Received for print ', totales)
    return <PDFViewer height={500} width={550}>
        <Document>
            <Page size="A4" style={styles.page}>
                <View>

                    <View style={styles.header}>
                        <Image style={styles.logo} src={logo} />
                        <View>
                            <Text style={styles.title}>Corte</Text>
                            <Text style={styles.company}>Del {new Date(corte.fecha_inicio).toLocaleString('es-MX', dateOptions)}</Text>
                            <Text style={styles.company}>al {new Date(corte.fecha_cierre).toLocaleString('es-MX', dateOptions)} </Text>
                            <Text style={styles.company}>{hospital}</Text>
                        </View>
                    </View>



                    <Text style={styles.infoTitle}>Lista de ingresos</Text>

                    <View style={styles.table}>
                        {/* TABLA ORIGINAL */}
                        <View style={styles.tableRow}>
                            <Text style={styles.tableColHeader}>FechaHora</Text>
                            <Text style={styles.tableColHeader}>Forma de pago</Text>
                            <Text style={styles.tableColHeader}>Monto</Text>
                            <Text style={styles.tableColHeader}>Estado</Text>
                        </View>
                        {ingresos.map((item) => (
                            <View style={styles.tableRow} key={item._id}>
                                <Text style={styles.tableCol}>{new Date(item.fecha_hora).toLocaleDateString('es-MX', dateOptions)}</Text>
                                <Text style={styles.tableCol}>{item.forma_de_pago}</Text>
                                <Text style={styles.tableCol}>${item.monto}</Text>
                                <Text style={styles.tableCol}>{item.estado}</Text>
                            </View>
                        ))}
                    </View>

                    <br />


                    <Text style={styles.infoTitle}>TOTALES</Text>

                    {/* TOTALES */}
                    <View style={tableStyles.table}>
                        <View style={tableStyles.tableRow}>
                            <Text style={tableStyles.tableCol}>Ingresos con tarjeta</Text>
                            <Text style={tableStyles.tableCol}>${totales.totalTarjeta}</Text>
                        </View>
                        <View style={tableStyles.tableRow}>
                            <Text style={tableStyles.tableCol}>Ingresos por transferencia</Text>
                            <Text style={tableStyles.tableCol}>${totales.totalTransferencia}</Text>
                        </View>
                        <View style={tableStyles.tableRow}>
                            <Text style={tableStyles.tableCol}>Ingresos efectivo</Text>
                            <Text style={tableStyles.tableCol}>${totales.totalEfectivo}</Text>
                        </View>
                        <View style={tableStyles.tableRow}>
                            <Text style={tableStyles.tableColLeft}>Ingresos totales</Text>
                            <Text style={tableStyles.tableColLeft}>${totales.ingresosTotales}</Text>
                        </View>
                    </View>




                    {/* <Text style={styles.total}>
                        Total:
                    </Text> */}
                </View>
            </Page>
        </Document>

    </PDFViewer>
}