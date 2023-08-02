import styles from "./ButtonContainer.module.css";
import React, { SetStateAction, Dispatch } from "react";
import TaskTableButton from "./TaskTableButton";

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

export default function ButtonContainer({
  flexDirection,
  positionX,
  positionY,
  containerTarget,
  allTasks,
  setAllTasks,
  setAllUpdates,
  realTimeEnvironment,
  setRealTimeEnvironment,
  setIsButtonClicked,
}: {
  flexDirection: string;
  positionX: number;
  positionY: number;
  containerTarget: "tasks" | "environment";
  allTasks: Array<BratleyTask>;
  setAllTasks: Dispatch<SetStateAction<Array<BratleyTask>>>;
  setAllUpdates: Dispatch<SetStateAction<Array<string>>>;
  realTimeEnvironment: Array<string>;
  setRealTimeEnvironment: Dispatch<SetStateAction<Array<string>>>;
  setIsButtonClicked: Dispatch<SetStateAction<boolean>>;
}) {
  const buttonContainerStyle =
    flexDirection === "column"
      ? {
          flexDirection: `${flexDirection}`,
          right: `${positionX}px`,
          top: `${positionY}px`,
        }
      : {
          flexDirection: `${flexDirection}`,
          left: `${positionX}px`,
          bottom: `${positionY}px`,
        };

  return (
    <div
      className={styles.buttonContainer}
      style={buttonContainerStyle as React.CSSProperties}
    >
      <TaskTableButton
        buttonType={"plus"}
        containerTarget={containerTarget}
        allTasks={allTasks}
        setAllTasks={setAllTasks}
        setAllUpdates={setAllUpdates}
        realTimeEnvironment={realTimeEnvironment}
        setRealTimeEnvironment={setRealTimeEnvironment}
        setIsButtonClicked={setIsButtonClicked}
      />
      <TaskTableButton
        buttonType={"minus"}
        containerTarget={containerTarget}
        allTasks={allTasks}
        setAllTasks={setAllTasks}
        setAllUpdates={setAllUpdates}
        realTimeEnvironment={realTimeEnvironment}
        setRealTimeEnvironment={setRealTimeEnvironment}
        setIsButtonClicked={setIsButtonClicked}
      />
    </div>
  );
}
