import React, { useRef, useState, useEffect } from "react";
import "./PainZoneSelector.css";
import body from '../../assets/body.jpg'
import { Button, Checkbox } from "antd";

const PainZoneSelector = ({ setDolorZone, setIrradiates }) => {
    const canvasRef = useRef(null);
    const [point, setPoint] = useState(null);
    const [arrow, setArrow] = useState(null);
    const [drawingArrow, setDrawingArrow] = useState(false);
    const [radiates, setRadiates] = useState(false);

    const fillColor = "rgba(255, 0, 0, 0.5)";
    const strokeColor = "rgba(255, 0, 0, 0.5)";

    const handleClick = (event) => {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (!point) {
            setPoint({ x, y });
            setDolorZone({x,y}) // 
            if (radiates) {
                setDrawingArrow(true);
            }
        } else if (drawingArrow) {
            setArrow({ start: point, end: { x, y } });
            setIrradiates({ start: point, end: { x, y } })
            setDrawingArrow(false);
        }
    };

    const draw = (context) => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        if (point) {
            context.beginPath();
            context.arc(point.x, point.y, 10, 0, 2 * Math.PI);
            context.fillStyle = "rgba(255, 0, 0, 0.5)";
            context.fill();
            context.strokeStyle = strokeColor;
            context.stroke();
        }

        if (arrow) {
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

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        draw(context);
    }, [point, arrow]);

    const handleSave = () => {
        // Guardar las coordenadas en la base de datos
        console.log("Selected Point:", point);
        console.log("Arrow:", arrow);
    };

    const handleReset = () => {
        setPoint(null);
        setArrow(null);
        setDrawingArrow(false);
        setRadiates(false);
    };

    const handleRadiatesChange = (event) => {
        setRadiates(event.target.checked);
        if (!event.target.checked) {
            setArrow(null);
            setDrawingArrow(false);
        } else if (point) {
            setDrawingArrow(true);
        }
    };

    return (
        <div className="pain-zone-selector">
            <h4>Seleccione su zona de dolor</h4>
            <div className="canvas-container">
                <img
                    src={body}
                    alt="Cuerpo humano"
                    className="background-image"
                    onLoad={() => {
                        const canvas = canvasRef.current;
                        const context = canvas.getContext("2d");
                        draw(context);
                    }}
                />
                <canvas
                style={{borderRadius: 8, borderColor:'#6b809c'}}
                    ref={canvasRef}
                    width={600}
                    height={625}
                    onClick={handleClick}
                />
            </div>
            <div>
                {/* <label>
                    <input
                        type="checkbox"
                        checked={radiates}
                        onChange={handleRadiatesChange}
                    />
                    El dolor se irradia
                </label> */}

                <Checkbox checked={radiates} onChange={handleRadiatesChange}><strong>El dolor se irradia</strong></Checkbox>
            </div>
            <div className="button-container">
                <Button onClick={handleReset}>Borrar y volver a seleccionar</Button>
                {/* <Button onClick={handleSave}>Guardar</Button> */}
            </div>
            <br />
        </div>
    );
};

export default PainZoneSelector;
