import React, { useState, useEffect, useRef } from 'react'
import { Form, Modal, Card } from 'antd';
import { d2_catalog_1, d2_catalog_2 } from './dolor2_catalog';
import "./PainZoneSelector.css";
import body from '../../assets/body.jpg'

export default function Dolor2Details({ isModalOpen, handleOk, handleCancel, escalaDetails }) {


    // IMAGE
    const draw = (context, point, arrow) => {
        // Ajusta el tamaño del canvas al tamaño del contenedor
        context.canvas.width = context.canvas.offsetWidth;
        context.canvas.height = context.canvas.offsetHeight;

        
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        
        if (point) {
            context.beginPath();
            context.arc(point.x, point.y, 10, 0, 2 * Math.PI);
            context.fillStyle = "rgba(255, 0, 0, 0.5)";
            context.fill();
            context.stroke();
            console.log('ANCHO ', context.canvas.width)
            console.log('onDrawPoint ', point)
        }

        if (arrow && arrow.start && arrow.end) {
            const { start, end } = arrow;
            context.beginPath();
            context.moveTo(start.x, start.y);
            context.lineTo(end.x, end.y);
            context.strokeStyle = "blue";
            context.lineWidth = 2;
            context.stroke();

            // Draw arrowhead
            const angle = Math.atan2(end.y - start.y, end.x - start.x);
            context.beginPath();
            context.moveTo(end.x, end.y);
            context.lineTo(end.x - 10 * Math.cos(angle - Math.PI / 6), end.y - 10 * Math.sin(angle - Math.PI / 6));
            context.lineTo(end.x - 10 * Math.cos(angle + Math.PI / 6), end.y - 10 * Math.sin(angle + Math.PI / 6));
            context.closePath();
            context.fillStyle = "blue";
            context.fill();
        }
    };

    const PainZoneResults = ({ point, arrow }) => {
        const canvasRef = useRef(null);

        useEffect(() => {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            const validArrow = arrow && arrow.start && arrow.end;
            draw(context, point, validArrow ? arrow : null);
            console.log('POINT ', point)
        }, [point, arrow]);

        return (
            <div className="pain-zone-results">
                <br />
                <span className='desc'>Zona de dolor/irradiacion</span>
                <div style={{ position: 'relative', textAlign: 'center', marginBottom: '20px' }}>
                    <img src={body} alt="Example" style={{ width: '100%' }} onLoad={() => {
                        const canvas = canvasRef.current;
                        const context = canvas.getContext("2d");
                        draw(context, point, arrow);
                    }} />
                    <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 ,borderRadius: 8, borderColor:'#6b809c'}} />
                </div>
                
                {/* <div className="canvas-container">
                    <img
                        src={body}
                        alt="Cuerpo humano"
                        className="background-image-modal"
                        onLoad={() => {
                            const canvas = canvasRef.current;
                            const context = canvas.getContext("2d");
                            draw(context, point, arrow);
                        }}
                    />
                    <canvas
                        ref={canvasRef}
                        width={800}
                        height={600}
                        className="drawing-canvas"
                    />
                </div> */}
            </div>
        );
    };
    // END OF IMAGE


    const RowCard = ({ labelKey, responseKey }) => {
        return <Card size='small'>
            <Card.Grid hoverable={false} style={{ width: '70%' }}>{d2_catalog_1[labelKey]}</Card.Grid>
            <Card.Grid hoverable={false} style={{ width: '30%' }}>{escalaDetails[responseKey]}</Card.Grid>
        </Card>
    }
    return (
        <Modal title="Respuestas escala de dolor" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={640} destroyOnClose>
            {/* <img
                src={body}
                alt="Cuerpo humano"
                className="background-image-modal"
                onLoad={() => {
                    // const canvas = canvasRef.current;
                    // const context = canvas.getContext("2d");
                    // draw(context, point, arrow);
                    // alert('Imagen cargada')
                }}
            /> */}
            <RowCard labelKey={0} responseKey='one' />
            <RowCard labelKey={1} responseKey='two' />
            <RowCard labelKey={2} responseKey='tree' />

            {/* {JSON.stringify(escalaDetails.zona)}
            {JSON.stringify(escalaDetails.irradia)} */}

            {
                escalaDetails.zona &&
                <PainZoneResults point={JSON.parse(escalaDetails.zona)} arrow={escalaDetails.irradia && JSON.parse(escalaDetails.irradia)} />
            }


            {
                d2_catalog_2.map((pr, i) => {
                    return <Card size='small'>
                        <Card.Grid hoverable={false} style={{ width: '70%' }}>{pr}</Card.Grid>
                        <Card.Grid hoverable={false} style={{ width: '30%' }}>{escalaDetails && escalaDetails['questions'][i]}</Card.Grid>
                    </Card>
                })
            }



        </Modal>
    )
}