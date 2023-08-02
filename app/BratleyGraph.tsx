import styles from "./BratleyGraph.module.css";
import BratleyRoot from "./BratleyRoot";
import BratleyTaskRow from "./BratleyTaskRow";
import { Fragment, useEffect, useState } from "react";
import Line from "./Line";

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

interface ScreenCoord {
  screenX: number;
  screenY: number;
}

interface LineSet {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
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
  const [connections, setConnections] = useState(Array<Array<ScreenCoord>>);
  const [graphHeight, setGraphHeight] = useState(0);
  const [graphWidth, setGraphWidth] = useState(0);
  const [organizedConnections, setOrganizedConnections] = useState(
    Array<Array<Array<LineSet>>>
  );

  useEffect(() => {
    const height: number = document.getElementById("-99")?.clientHeight ?? 0;
    const width: number = document.getElementById("-99")?.clientWidth ?? 0;

    setGraphHeight((graphHeight) => (graphHeight = height));
    setGraphWidth((graphWidth) => (graphWidth = width));
  }, []);

  const bratleyGraphStyle = {
    transform: `translateX(${offsetX}px) translateY(${offsetY}px) scale(${scaleFactor})`,
  };

  console.log("bratleyBreadths(in BratleyGraph):");
  console.dir(bratleyBreadths);

  console.log("connections:");
  console.dir(connections);

  function organizeConnections() {
    let nextLineSet: LineSet;

    for (let i = 1; i < connections.length; i++) {
      if (i > 1) {
        let numLineSets = connections[i].length / bratleyBreadths.length;
      }
    }
  }

  return (
    <div className={styles.bratleyGraph} style={bratleyGraphStyle} id={"-99"}>
      <BratleyRoot height={taskHeights - 2} />
      {bratleyBreadths.map((breadth, breadthIndex) => (
        <Fragment key={breadthIndex}>
          {breadthIndex === bratleyBreadths.length - 1 ? (
            <BratleyTaskRow
              key={breadthIndex * 10}
              breadth={breadth}
              taskHeight={taskHeights}
              isLastRow={true}
              id={breadthIndex + 1}
              allBreadths={bratleyBreadths}
              setConnections={setConnections}
            />
          ) : (
            <BratleyTaskRow
              key={breadthIndex * 10}
              breadth={breadth}
              taskHeight={taskHeights}
              isLastRow={false}
              id={breadthIndex + 1}
              allBreadths={bratleyBreadths}
              setConnections={setConnections}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}
