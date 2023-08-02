import styles from "./BratleyTask.module.css";
import InfoPopover from "./InfoPopover";
import BratleyTaskText from "./BratleyTaskText";
import { MouseEvent, useState, useRef } from "react";
import { createPortal } from "react-dom";

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

export default function BratleyTask({
  task,
  taskIdentifier,
  taskHeight,
  isFeasible,
}: {
  task: BratleyTask;
  taskIdentifier: string;
  taskHeight: number;
  isFeasible: boolean;
}) {
  const textColor = isFeasible ? "black" : "red";
  const [isInfoPopoverVisible, setIsInfoPopoverVisible] = useState(false);
  const [clientX, setClientX] = useState(0);
  const [clientY, setClientY] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("lavender");

  function handleMouseDown(e: MouseEvent) {
    e.stopPropagation();

    console.log(`task:`);
    console.dir(task);

    setBackgroundColor((backgroundColor) =>
      backgroundColor === "violet"
        ? (backgroundColor = "lavender")
        : (backgroundColor = "violet")
    );
  }

  function handleMouseEnter(e: MouseEvent) {
    e.stopPropagation();

    setIsInfoPopoverVisible((visibilityStatus) => (visibilityStatus = true));

    // console.dir(e);
  }

  function handleMouseMove(e: MouseEvent) {
    e.stopPropagation();

    const eventTarget = e.target as HTMLDivElement;
    setClientX((clientX) => (clientX = e.clientX));
    setClientY((clientY) => (clientY = e.clientY));
  }

  function handleMouseLeave(e: MouseEvent) {
    e.stopPropagation();

    setIsInfoPopoverVisible((visibilityStatus) => (visibilityStatus = false));

    // popoverRef.current.remove();
  }

  const bratleyTaskStyle = {
    height: `${taskHeight}vh`,
    width: `${taskHeight}vh`,
    backgroundColor: `${backgroundColor}`,
  };

  return (
    <div
      className={styles.bratleyTask}
      style={bratleyTaskStyle as React.CSSProperties}
      onClick={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <BratleyTaskText textContent={taskIdentifier} color={textColor} />
      {isInfoPopoverVisible && (
        <InfoPopover task={task} top={clientY} left={clientX} />
      )}
    </div>
  );
}
