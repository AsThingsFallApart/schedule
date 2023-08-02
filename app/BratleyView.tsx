import styles from "./BratleyView.module.css";
import { WheelEvent, useState } from "react";
import BratleyGraph from "./BratleyGraph";

interface BratleyTask {
  name: string;
  computationTime: number;
  deadline: number;
  arrival: number;
  predecessorNames: Array<number>;
  predecessorWorstCaseCompTimes: Array<number>;
  worstCaseCompTime: number;
  feasible: boolean;
}

export default function BratleyView({
  bratleyBreadths,
  viewHeight,
}: {
  bratleyBreadths: Array<Array<BratleyTask>>;
  viewHeight: number;
}) {
  const dummySet = [1];
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [scaleFactor, setScaleFactor] = useState(1);

  const deltaYDampener = 0.0001;
  function handleWheel(e: WheelEvent) {
    setScaleFactor((scaleFactor) => (scaleFactor += e.deltaY * deltaYDampener));
  }

  const movementXDampener = 1;
  const movementYDampener = 1;
  function translateView(e: MouseEvent) {
    setOffsetX((offsetX) => (offsetX += e.movementX * movementXDampener));
    setOffsetY((offsetY) => (offsetY += e.movementY * movementYDampener));

    e.preventDefault();

    console.log("moving BratleyView...");
    console.log(`\te.movementX\t${e.movementX}`);
    console.log(`\te.movementY\t${e.movementY}`);
  }

  function handleMouseDown(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    console.log("Click on BratleyView registered.");

    document.addEventListener("mousemove", translateView, false);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", translateView, false);
    });
  }

  const bratleyViewStyle = {
    // height: `${viewHeight}vh`,
  };

  return (
    <div
      className={styles.bratleyView}
      style={bratleyViewStyle}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
    >
      <BratleyGraph
        bratleyBreadths={bratleyBreadths}
        offsetX={offsetX}
        offsetY={offsetY}
        scaleFactor={scaleFactor}
      />
    </div>
  );
}
