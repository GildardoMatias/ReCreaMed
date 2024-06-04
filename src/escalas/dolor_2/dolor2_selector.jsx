import React, { useRef, useState, useEffect } from "react";
import "./PainZoneSelector.css";
import logo from '../../assets/Logo.jpeg'

const PainZoneSelector = () => {
    const canvasRef = useRef(null);
    const [point, setPoint] = useState(null);
    const [arrow, setArrow] = useState(null);
    const [drawingArrow, setDrawingArrow] = useState(false);
    const [startPoint, setStartPoint] = useState(null);

    const restartCanva = () => {
        setPoint(null)
        setArrow(null)
        setStartPoint(null)
    }

    const handleClick = (event) => {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (!point) {
            setPoint({ x, y });
        } else if (!arrow && !drawingArrow) {
            setStartPoint({ x, y });
            setDrawingArrow(true);
        } else if (drawingArrow) {
            setArrow({ start: startPoint, end: { x, y } });
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

    return (
        <div className="pain-zone-selector">
            <h3>Seleccione su zona de dolor y la dirección en que irradia el dolor</h3>
            <div className="canvas-container">
                <img
                    src={logo}
                    alt="Cuerpo humano"
                    className="background-image"
                    onLoad={() => {
                        const canvas = canvasRef.current;
                        const context = canvas.getContext("2d");
                        draw(context);
                    }}
                />
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    onClick={handleClick}
                />
            </div>
            <button onClick={restartCanva}>Reintentar</button>
            <button onClick={handleSave}>Guardar</button>
        </div>
    );
};

export default PainZoneSelector;
