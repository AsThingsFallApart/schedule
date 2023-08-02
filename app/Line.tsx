import { useRef, useEffect } from "react";
import styles from "./Line.module.css";

export default function Line({
  startX,
  startY,
  endX,
  endY,
  canvasHeight,
  canvasWidth,
}: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  canvasHeight: number;
  canvasWidth: number;
}) {
  const canvas = useRef(null);

  useEffect(() => {
    /*@ts-ignore*/
    const context: CanvasRenderingContext2D = canvas.current?.getContext("2d");

    context?.beginPath();
    context?.moveTo(startX, startY);
    context?.lineTo(endX, endY);
    context?.stroke();
  }, []);

  return (
    <div className={styles.line}>
      <canvas ref={canvas} height={canvasHeight} width={canvasWidth} />
    </div>
  );
}
