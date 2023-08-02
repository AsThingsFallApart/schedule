import styles from "./Rod.module.css";

export default function Rod({
  rotationFromVert,
  positionX,
  positionY,
  zIndex,
}: {
  rotationFromVert: number;
  positionX: number;
  positionY: number;
  zIndex: number;
}) {
  return (
    <div
      className={styles.rod}
      style={{
        top: `${positionY}%`,
        left: `calc(${positionX}% - 0.15vh)`,
        transform: `rotate(${rotationFromVert}deg)`,
        zIndex: `${zIndex}`,
      }}
    ></div>
  );
}
