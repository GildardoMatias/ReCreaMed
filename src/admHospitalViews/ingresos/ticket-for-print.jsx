import React, { useEffect, useState } from 'react';
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
        textTransform: 'capitalize'
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
        flex: 1
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottom: '1pt solid #000',
        paddingBottom: 10,
        marginBottom: 10,
    },
    logo: {
        width: 80,
        height: 'auto',
        marginRight: 10,
    },
    image: {
        width: 80,
        paddingLeft: 16
    },
    title: {
        fontSize: 20,
        marginLeft: 10,
    },
    company: {
        fontSize: 14,
        marginTop: 5,
        marginLeft: 10,
    }

});

// Componente del ticket
export default function Ticket({ ingresos, logo, hospital, idHospital, seller, buyer }) {

    const [hospitalData, setHospitalData] = useState(null)
    console.log('Received for print ', ingresos)

    const { usuario: { name: userName } = {} } = ingresos[0]
    const { cita: { usuario: { name: citaName } = {} } = {} } = ingresos[0]

    useEffect(() => {
        const getHospitalData = () => {
            getData(`sucursales/${idHospital}`).then((rs) => {
                setHospitalData(rs[0])
            })
        }
        getHospitalData()

    }, [])


    return <PDFViewer height={500} width={550}>
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <View style={styles.header}>
                        <Image style={styles.logo} src={logo} />
                        <View>
                            <Text style={styles.title}>Nota de Venta</Text>
                            <Text style={styles.company}>{hospital} </Text>
                            <Text style={styles.company}>{new Date(ingresos[0].fecha_hora).toLocaleString()} </Text>
                        </View>
                    </View>
                    <View style={styles.sellerBuyerInfo}>
                        <View>
                            <Text style={styles.infoTitle}>Medico:</Text>
                            <Text style={styles.infoText}>{ingresos[0].doctor.name}</Text>
                        </View>
                        <View>
                            <Text style={styles.infoTitle}>Paciente:</Text>
                            {userName && <Text style={styles.infoText}>{userName}</Text>}
                            {citaName && <Text style={styles.infoText}>{citaName}</Text>}
                        </View>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableColHeader}>Concepto</Text>
                            <Text style={styles.tableColHeader}>Estado</Text>
                            <Text style={styles.tableColHeader}>Forma de pago</Text>
                            <Text style={styles.tableColHeader}>Precio Unitario</Text>
                        </View>
                        {ingresos.map((item) => (
                            <View style={styles.tableRow} key={item.id}>
                                {/* <Text style={styles.tableCol}>{item.concepto}</Text> */}
                                <Text style={styles.tableCol}>{item.concepto.split(["-"])[0]}</Text>
                                <Text style={styles.tableCol}>{item.estado}</Text>
                                <Text style={styles.tableCol}>{item.forma_de_pago}</Text>
                                <Text style={styles.tableCol}>
                                    {/* ${(item.monto * item.quantity).toFixed(2)} */}
                                    ${item.monto.toFixed(2)}
                                </Text>
                            </View>
                        ))}
                    </View>
                    <Text style={styles.total}>
                        Total: ${ingresos.reduce((acc, item) => acc + item.monto * 1, 0).toFixed(2)}
                    </Text>

                </View>
                <View style={{ flex: 1 }}></View>

                <View style={{ borderTop: '1pt solid #000', paddingTop: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
                    {
                        hospitalData && <View>
                            <Text>{hospitalData.nombre} </Text>
                            <Text>{hospitalData.calle} N.{hospitalData.num_exterior}</Text>
                            <Text>Colonia {hospitalData.colonia}, {hospitalData.ciudad_municipio}, {hospitalData.estado}</Text>
                            <Text>Telefono: {hospitalData.telefono}, Correo: {hospitalData.email}</Text>
                            <Text>{hospitalData.sitio_web}</Text>
                        </View>

                    }

                    <View style={{ textAlign: 'center' }}>
                        <Image style={styles.image} src={Logo} />
                        <Text style={{ fontSize: 10, }}>www.recreamed.com</Text>
                    </View>
                </View>
            </Page>
        </Document>

    </PDFViewer>
}