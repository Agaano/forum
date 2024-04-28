import { useEffect, useRef } from 'react';

const CatDrawing = () => {
const canvasRef = useRef(null);

useEffect(() => {
const canvas = canvasRef.current;
const context = canvas.getContext('2d');

// Тело котика
context.beginPath();
context.arc(150, 150, 100, 0, 2 * Math.PI);
context.fillStyle = '#fcd5c9';
context.fill();
context.lineWidth = 2;
context.strokeStyle = '#e0a39e';
context.stroke();

// Голова
context.beginPath();
context.arc(150, 125, 75, 0, 2 * Math.PI);
context.fillStyle = '#fcd5c9';
context.fill();
context.stroke();

// Уши
context.beginPath();
context.moveTo(105, 75);
context.lineTo(140, 70);
context.lineTo(150, 30);
context.lineTo(160, 70);
context.lineTo(195, 75);
context.fillStyle = '#fcd5c9';
context.fill();
context.stroke();

// Глаза
context.beginPath();
context.arc(125, 110, 15, 0, 2 * Math.PI);
context.fillStyle = '#5a493f';
context.fill();

context.beginPath();
context.arc(175, 110, 15, 0, 2 * Math.PI);
context.fillStyle = '#5a493f';
context.fill();

// Нос
context.beginPath();
context.moveTo(150, 120);
context.lineTo(145, 140);
context.lineTo(155, 140);
context.fillStyle = '#e0a39e';
context.fill();
context.stroke();

// Рот
context.beginPath();
context.arc(150, 160, 30, 0.2 * Math.PI, 0.8 * Math.PI);
context.fillStyle = '#fcd5c9';
context.fill();
context.stroke();

// Усы
context.beginPath();
context.moveTo(130, 150);
context.lineTo(110, 160);

context.moveTo(170, 150);
context.lineTo(190, 160);

context.strokeStyle = '#5a493f';
context.lineWidth = 2;
context.stroke();

// Лапки
context.beginPath();
context.arc(110, 220, 20, 0, 2 * Math.PI);
context.fillStyle = '#fcd5c9';
context.fill();
context.stroke();

context.beginPath();
context.arc(190, 220, 20, 0, 2 * Math.PI);
context.fillStyle = '#fcd5c9';
context.fill();
context.stroke();

// Хвост
context.beginPath();
context.moveTo(220, 200);
context.lineTo(280, 150);
context.lineTo(310, 180);
context.lineWidth = 10;
context.strokeStyle = '#e0a39e';
context.stroke();
}, []);

return (
<canvas ref={canvasRef} width={400} height={300} />
);
};

export default CatDrawing;