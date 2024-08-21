import React from 'react'

export default function Services({ medicosData }) {


    return <div>
        <div className='desc' style={{marginTop: 12, marginBottom: 0}}>Servicios y colores</div>
        
        <div style={{ display: 'flex', flexDirection: 'row', gap: 15 }}>

            {
                medicosData && medicosData.map(med => (
                    <div style={{ backgroundColor: '#f5f5f5', width: 200, borderRadius: 12, marginTop: 12, padding: 16 }}>
                        <div style={{ color: '#515a6e', fontSize: 16 }}>{med.name}</div>

                        {
                            med.configuracion && med.configuracion.tratamientos_ofrecidos && med.configuracion.tratamientos_ofrecidos.map(trat => (
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}><div style={{ width: 12, height: 8, borderRadius: 2, backgroundColor: trat.color, marginRight: 6 }}></div><span className='subdesc'>  {trat.observaciones} </span> </div>

                                </div>
                            ))
                        }

                    </div>
                ))
            }

            
        </div>
    </div>

}