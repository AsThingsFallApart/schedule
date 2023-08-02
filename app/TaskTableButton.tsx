import styles from "./TaskTableButton.module.css";
import Rod from "./Rod";
import {
  MouseEventHandler,
  MouseEvent,
  SetStateAction,
  Dispatch,
  useState,
} from "react";

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

export default function TaskTableButton({
  buttonType,
  containerTarget,
  allTasks,
  setAllTasks,
  setAllUpdates,
  realTimeEnvironment,
  setRealTimeEnvironment,
  setIsButtonClicked,
}: {
  buttonType: "plus" | "minus";
  containerTarget: "tasks" | "environment";
  allTasks: Array<BratleyTask>;
  setAllTasks: Dispatch<SetStateAction<Array<BratleyTask>>>;
  setAllUpdates: Dispatch<SetStateAction<Array<string>>>;
  realTimeEnvironment: Array<string>;
  setRealTimeEnvironment: Dispatch<SetStateAction<Array<string>>>;
  setIsButtonClicked: Dispatch<SetStateAction<boolean>>;
}) {
  const [isBeingHovered, setIsBeingHovered] = useState(false);

  function handleMouseEnter(e: MouseEvent) {
    setIsBeingHovered((hoverStatus) => (hoverStatus = true));
    console.log("hovering over button...");
  }

  function handleMouseLeave(e: MouseEvent) {
    setIsBeingHovered((hoverStatus) => (hoverStatus = false));
    console.log("exiting button space...");
  }

  function handleMouseClick(e: MouseEvent) {
    let nextAttribute: string = "";
    let nextAttributeDescriptor: string = "";

    switch (containerTarget) {
      case "tasks":
        switch (buttonType) {
          case "plus":
            const nextTask: BratleyTask = {
              name: `J${allTasks.length + 1}`,
              computationTime: 0,
              deadline: 0,
              arrival: 0,
              predecessorNames: [],
              predecessorWorstCaseCompTimes: [],
              worstCaseCompTime: 0,
              feasible: true,
            };

            setAllTasks((allTasks) => (allTasks = [...allTasks, nextTask]));

            setAllUpdates(
              (allUpdates) =>
                (allUpdates = [...allUpdates, "New task added..."])
            );
            break;

          case "minus":
            const nextAllTasks = JSON.parse(JSON.stringify(allTasks));
            nextAllTasks.pop();

            setAllTasks((allTasks) => (allTasks = nextAllTasks));

            setAllUpdates(
              (allUpdates) =>
                (allUpdates = [...allUpdates, "Last task removed..."])
            );
            break;
        }
        break;

      case "environment":
        switch (buttonType) {
          case "plus":
            if (realTimeEnvironment.length === 0) {
              nextAttribute = "Ci";
              nextAttributeDescriptor = "Computation Time";
            } else if (realTimeEnvironment.length === 1) {
              nextAttribute = "di";
              nextAttributeDescriptor = "Deadline";
            } else if (realTimeEnvironment.length === 2) {
              nextAttribute = "ai";
              nextAttributeDescriptor = "Arrival Time";
            } else if (realTimeEnvironment.length >= 3) {
              nextAttribute = "x";
              nextAttributeDescriptor = "N/A";
            }

            setRealTimeEnvironment(
              (realTimeEnvironment) =>
                (realTimeEnvironment = [...realTimeEnvironment, nextAttribute])
            );

            setAllUpdates(
              (allUpdates) =>
                (allUpdates = [
                  ...allUpdates,
                  `Adding '${nextAttributeDescriptor}' (${nextAttribute}) to real-time environment...`,
                ])
            );

            setIsButtonClicked(
              (buttonClickStatus) => (buttonClickStatus = true)
            );
            break;

          case "minus":
            if (realTimeEnvironment.length === 1) {
              nextAttribute = "Ci";
              nextAttributeDescriptor = "Computation Time";
            } else if (realTimeEnvironment.length === 2) {
              nextAttribute = "di";
              nextAttributeDescriptor = "Deadline";
            } else if (realTimeEnvironment.length === 3) {
              nextAttribute = "ai";
              nextAttributeDescriptor = "Arrival Time";
            } else if (realTimeEnvironment.length > 3) {
              nextAttribute = "x";
              nextAttributeDescriptor = "N/A";
            }

            const nextRealTimeEnvironment = JSON.parse(
              JSON.stringify(realTimeEnvironment)
            );
            nextRealTimeEnvironment.pop();

            setRealTimeEnvironment(
              (realTimeEnvironment) =>
                (realTimeEnvironment = nextRealTimeEnvironment)
            );

            setAllUpdates(
              (allUpdates) =>
                (allUpdates = [
                  ...allUpdates,
                  `Removing '${nextAttributeDescriptor}' (${nextAttribute}) from real-time environment...`,
                ])
            );

            setIsButtonClicked(
              (buttonClickStatus) => (buttonClickStatus = true)
            );

            break;
        }
        break;
    }
  }

  const hoverAni = isBeingHovered
    ? `100ms cubic-bezier(0.19,1,0.22,1) forwards ${styles.lightUp}`
    : `100ms linear forwards reverse ${styles.lightUp}`;

  const plusButtonStyle = { animation: `${hoverAni}` };

  return (
    <div
      className={styles.button}
      style={plusButtonStyle}
      onClick={handleMouseClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {buttonType === "plus" ? (
        <div className={styles.rodContainer}>
          <Rod positionX={50} positionY={0} rotationFromVert={0} zIndex={1} />
          <Rod positionX={50} positionY={0} rotationFromVert={90} zIndex={2} />
        </div>
      ) : (
        <div className={styles.rodContainer}>
          <Rod positionX={50} positionY={0} rotationFromVert={90} zIndex={2} />
        </div>
      )}
    </div>
  );
}
