import styles from "./ResizableIndicator.module.css";
import { Dispatch, SetStateAction } from "react";

export default function ResizableIndicator({
  setLowerHeight,
  setUpperHeight,
}: {
  setLowerHeight: Dispatch<SetStateAction<number>>;
  setUpperHeight: Dispatch<SetStateAction<number>>;
}) {
  const movementYDampener = 0.1;

  function resize(event: MouseEvent): void {
    setLowerHeight(
      (lowerGridViewportHeight) =>
        (lowerGridViewportHeight -= event.movementY * movementYDampener)
    );
  }

  function handleMouseDown(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    document.addEventListener("mousemove", resize, false);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", resize, false);
    });
  }

  return (
    <div className={styles.resizableIndicatorContainer}>
      <div
        className={styles.resizableIndicator}
        onMouseDown={(event) => handleMouseDown(event)}
      >
        {". . ."}
      </div>
    </div>
  );
}
