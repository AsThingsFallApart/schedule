import BratleyTask from "./BratleyTask";
import BratleyTaskContainer from "./BratleyTaskContainer";
import styles from "./BratleyTaskRow.module.css";
import { useState, useEffect, SetStateAction, Dispatch } from "react";

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

export default function BratleyTaskRow({
  breadth,
  taskHeight,
  isLastRow,
  id,
  allBreadths,
  setConnections,
}: {
  breadth: Array<BratleyTask>;
  taskHeight: number;
  isLastRow: boolean;
  id: number;
  allBreadths: Array<Array<BratleyTask>>;
  setConnections: Dispatch<SetStateAction<Array<Array<ScreenCoord>>>>;
}) {
  useEffect(() => {
    let nextAllCoords: Array<Array<ScreenCoord>> = [];
    let nextRowCoords: Array<ScreenCoord> = [];

    for (let i = 0; i <= allBreadths.length; i++) {
      const breadth = document.getElementById(i.toString(10)) as HTMLDivElement;

      console.log(`breadth:`);
      console.dir(breadth);

      for (let j = 0; j < breadth.children.length; j++) {
        const taskNode = breadth.children[j] as HTMLDivElement;
        const nextTaskCoord: ScreenCoord = {
          screenX: taskNode.offsetLeft,
          screenY: taskNode.offsetTop,
        };

        nextRowCoords.push(nextTaskCoord);
      }

      nextAllCoords.push(nextRowCoords);
      nextRowCoords = [];
    }

    setConnections((connections) => (connections = nextAllCoords));
  }, []);

  return (
    <div className={styles.bratleyTaskRow} id={id.toString(10)}>
      {breadth.map((task, taskIndex) => (
        <BratleyTaskContainer
          key={taskIndex}
          task={task}
          height={taskHeight}
          isLastRow={isLastRow}
        />
      ))}
    </div>
  );
}
