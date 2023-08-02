import styles from "./BratleyGraph.module.css";
import BratleyRoot from "./BratleyRoot";
import BratleyTaskRow from "./BratleyTaskRow";
import { useState } from "react";

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

export default function BratleyGraph({
  bratleyBreadths,
  offsetX,
  offsetY,
  scaleFactor,
}: {
  bratleyBreadths: Array<Array<BratleyTask>>;
  offsetX: number;
  offsetY: number;
  scaleFactor: number;
}) {
  const [taskHeights, setTaskHeights] = useState(8);

  const bratleyGraphStyle = {
    transform: `translateX(${offsetX}px) translateY(${offsetY}px) scale(${scaleFactor})`,
  };

  console.log("bratleyBreadths(in BratleyGraph):");
  console.dir(bratleyBreadths);

  return (
    <div className={styles.bratleyGraph} style={bratleyGraphStyle}>
      <BratleyRoot height={taskHeights - 2} />
      {bratleyBreadths.map((breadth, breadthIndex) => (
        <>
          {breadthIndex === bratleyBreadths.length - 1 ? (
            <BratleyTaskRow
              key={breadthIndex}
              breadth={breadth}
              taskHeight={taskHeights}
              isLastRow={true}
            />
          ) : (
            <BratleyTaskRow
              key={breadthIndex}
              breadth={breadth}
              taskHeight={taskHeights}
              isLastRow={false}
            />
          )}
        </>
      ))}
    </div>
  );
}
