import styles from "./TaskTableCorner.module.css";
import PlusButton from "./TaskTableButton";
import { SetStateAction, Dispatch } from "react";
import ButtonContainer from "./ButtonContainer";

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

export default function TaskTableCorner({
  textContent,
  allTasks,
  setAllTasks,
  realTimeEnvironment,
  setRealTimeEnvironment,
  setAllUpdates,
  setIsButtonClicked,
}: {
  textContent?: string;
  allTasks: Array<BratleyTask>;
  setAllTasks: Dispatch<SetStateAction<Array<BratleyTask>>>;
  realTimeEnvironment: Array<string>;
  setRealTimeEnvironment: Dispatch<SetStateAction<Array<string>>>;
  setAllUpdates: Dispatch<SetStateAction<Array<string>>>;
  setIsButtonClicked: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className={styles.taskTableCorner}>
      <ButtonContainer
        flexDirection={"column"}
        positionX={10}
        positionY={0}
        containerTarget={"tasks"}
        allTasks={allTasks}
        setAllTasks={setAllTasks}
        setAllUpdates={setAllUpdates}
        realTimeEnvironment={realTimeEnvironment}
        setRealTimeEnvironment={setRealTimeEnvironment}
        setIsButtonClicked={setIsButtonClicked}
      />
      <ButtonContainer
        flexDirection={"row"}
        positionX={0}
        positionY={10}
        containerTarget={"environment"}
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
