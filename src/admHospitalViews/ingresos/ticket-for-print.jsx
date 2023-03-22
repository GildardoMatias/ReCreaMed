import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';


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
        marginBottom: 10,
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
        borderBottom: '1pt solid #000',
        paddingBottom: 10,
        marginBottom: 10,
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    title: {
        fontSize: 20,
        marginLeft: 10,
    },
    company: {
        fontSize: 14,
        marginTop: 5,
    },
});
// Componente del ticket
export default function Ticket({ data, logo, company, seller, buyer }) {
    return <PDFViewer height={500} width={550}>
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <View style={styles.header}>
                        <Image style={styles.logo} src={logo} />
                        <View>
                            <Text style={styles.title}>Nota de Venta</Text>
                            <Text style={styles.company}>Mi Empresa S.A.</Text>
                        </View>
                    </View>
                    <View style={styles.sellerBuyerInfo}>
                        <View>
                            <Text style={styles.infoTitle}>Vendedor:</Text>
                            <Text style={styles.infoText}>{seller}</Text>
                        </View>
                        <View>
                            <Text style={styles.infoTitle}>Comprador
                                :</Text>
                            <Text style={styles.infoText}>{buyer}</Text>
                        </View>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableColHeader}>Producto</Text>
                            <Text style={styles.tableColHeader}>Cantidad</Text>
                            <Text style={styles.tableColHeader}>Precio Unitario</Text>
                            <Text style={styles.tableColHeader}>Subtotal</Text>
                        </View>
                        {data.map((item) => (
                            <View style={styles.tableRow} key={item.id}>
                                <Text style={styles.tableCol}>{item.product}</Text>
                                <Text style={styles.tableCol}>{item.quantity}</Text>
                                <Text style={styles.tableCol}>${item.price.toFixed(2)}</Text>
                                <Text style={styles.tableCol}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </Text>
                            </View>
                        ))}
                    </View>
                    <Text style={styles.total}>
                        Total: ${data.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                    </Text>
                </View>
            </Page>
        </Document>

    </PDFViewer>
}