import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import { getData } from '../../resources';
import Logo from '../../assets/Logo.png'

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
    image: {
        width: 80,
        paddingLeft: 16
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 10,
        overflow: 'hidden'
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

// Componente del ticket
export default function Ticket({ ingresos, logo, idHospital, buyer }) {

    const [hospitalData, setHospitalData] = useState(null)

    useEffect(() => {
        const getHospitalData = () => {

            getData(`sucursales/${idHospital}`).then((rs) => {
                console.log('HospitalData',hospitalData)
                setHospitalData(rs[0])
            })
        }
        getHospitalData()
        console.log('ingresos for print ', ingresos)
    }, [])


    console.log('Received for print ', ingresos)
    return <PDFViewer height={500} width={550}>
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <View style={styles.header}>

                        {
                            hospitalData && hospitalData.logo &&
                            <Image style={styles.logo} source={`https://api.recreamed.com/images/${hospitalData.logo}`} />
                        }

                        <View>
                            <Text style={styles.title}>Nota de Venta</Text>
                            <Text style={styles.company}>Hospital: {hospitalData.nombre}</Text>
                            <Text style={styles.company}>{new Date(ingresos[0].createdAt).toLocaleString()} </Text>
                        </View>
                    </View>
                    <View style={styles.sellerBuyerInfo}>
                        <View>
                            <Text style={styles.infoTitle}>Médico:</Text>
                            <Text style={styles.infoText}>{ingresos[0].medico.name}</Text>
                        </View>
                        <View>
                            <Text style={styles.infoTitle}>Paciente:</Text>
                            {/* <Text style={styles.infoText}>{ingresos[0].paciente ? ingresos[0].paciente.name : 'Sin paciente'}</Text> */}
                            <Text style={styles.infoText}>{ingresos[0].cita ? ingresos[0].cita.usuario.name : 'Sin paciente'}</Text>
                        </View>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableColHeader}>Concepto</Text>
                            <Text style={styles.tableColHeader}>Cantidad</Text>
                            <Text style={styles.tableColHeader}>Precio Unitario</Text>
                            <Text style={styles.tableColHeader}>Subtotal</Text>
                        </View>
                        {ingresos.map((item) => (
                            <View style={styles.tableRow} key={item.id}>

                                <Text style={styles.tableCol}>{item.concepto ? item.concepto.split(["-"])[0] : item.cita.servicio.split(["-"])[0]}</Text>
                                <Text style={styles.tableCol}>1</Text>
                                <Text style={styles.tableCol}>{item.monto ? `$${item.monto.toFixed(2)}` : item.cita.servicio.split("-")[1]}</Text>
                                <Text style={styles.tableCol}>
                                    {/* ${(item.monto * item.quantity).toFixed(2)} */}
                                    {item.monto ? `$${item.monto.toFixed(2)}` : item.cita.servicio.split("-")[1]}
                                </Text>
                            </View>
                        ))}
                    </View>
                    <Text style={styles.total}>
                        {/* Total: ${ingresos.reduce((acc, item) => acc + item.monto * 1, 0).toFixed(2)} */}
                        Total: {ingresos[0].monto ? `$${ingresos[0].monto.toFixed(2)}` : ingresos[0].cita.servicio.split("-")[1]}
                    </Text>
                </View>

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
                        <Text>www.recreamed.com</Text>
                    </View>
                </View>
            </Page>
        </Document>

    </PDFViewer>
}