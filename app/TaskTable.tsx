import { Fragment, SetStateAction, Dispatch } from "react";
import styles from "./TaskTable.module.css";
import TaskTableCell from "./TaskTableCell";
import TaskTableColumnHeader from "./TaskTableColumnHeader";
import TaskTableCorner from "./TaskTableCorner";
import TaskTableRowHeader from "./TaskTableRowHeader";

interface Task {
  name: string;
  computationTime: number;
  deadline: number;
  arrival: number;
}

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

export default function TaskTable({
  allTasks,
  setAllTasks,
  realTimeEnvironment,
  setRealTimeEnvironment,
  setAllUpdates,
  setIsButtonClicked,
  isTaskCompTimeHovered,
  setIsTaskCompTimeHovered,
  isTaskCompTimeClicked,
  setIsTaskCompTimeClicked,
  isTaskDeadlineHovered,
  setIsTaskDeadlineHovered,
  isTaskDeadlineClicked,
  setIsTaskDeadlineClicked,
  sortedSequence,
}: {
  allTasks: Array<BratleyTask>;
  setAllTasks: Dispatch<SetStateAction<Array<BratleyTask>>>;
  realTimeEnvironment: string[];
  setRealTimeEnvironment: Dispatch<SetStateAction<Array<string>>>;
  setAllUpdates: Dispatch<SetStateAction<Array<string>>>;
  setIsButtonClicked: Dispatch<SetStateAction<boolean>>;
  isTaskCompTimeHovered: Array<boolean>;
  setIsTaskCompTimeHovered: Dispatch<SetStateAction<Array<boolean>>>;
  isTaskCompTimeClicked: Array<boolean>;
  setIsTaskCompTimeClicked: Dispatch<SetStateAction<Array<boolean>>>;
  isTaskDeadlineHovered: Array<boolean>;
  setIsTaskDeadlineHovered: Dispatch<SetStateAction<Array<boolean>>>;
  isTaskDeadlineClicked: Array<boolean>;
  setIsTaskDeadlineClicked: Dispatch<SetStateAction<Array<boolean>>>;
  sortedSequence: Array<number>;
}) {
  // console.log(`allTasks:`);
  // console.dir(allTasks);
  // console.dir(realTimeEnvironment);

  let populateGridWithPlaceholders: number[] = [];

  for (
    let i = 0;
    i < (allTasks.length + 1) * (realTimeEnvironment.length + 1);
    i++
  ) {
    populateGridWithPlaceholders.push(i);
  }

  let taskGrid: Array<Array<string>> = [];
  let taskGridRow: Array<string> = [];

  for (let i = -1; i < realTimeEnvironment.length; i++) {
    for (let j = -1; j < allTasks.length; j++) {
      // console.log(`i:\t${i}`);
      // console.log(`\tj:\t${j}`);
      // console.log(`\t\tallTasks[${j}].name:\t${allTasks[j].name}`);

      if (i === -1 && j === -1) {
        taskGridRow.push("corner");
      }

      if (i === -1 && j >= 0) {
        taskGridRow.push(allTasks[j].name);
      }

      if (i === 0 && j === -1) {
        taskGridRow.push(realTimeEnvironment[i]);
      }

      if (i === 0 && j >= 0) {
        taskGridRow.push(allTasks[j].computationTime.toString(10));
      }

      if (i === 1 && j === -1) {
        taskGridRow.push(realTimeEnvironment[i]);
      }

      if (i === 1 && j >= 0) {
        taskGridRow.push(allTasks[j].deadline.toString(10));
      }

      if (i === 2 && j === -1) {
        taskGridRow.push(realTimeEnvironment[i]);
      }

      if (i === 2 && j >= 0) {
        taskGridRow.push(allTasks[j].arrival.toString(10));
      }
    }

    taskGrid.push(taskGridRow);
    taskGridRow = [];
  }

  // console.dir(taskGrid);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            gridTemplateRows: `repeat(${
              realTimeEnvironment.length + 1
            }, calc(100% / ${realTimeEnvironment.length + 1}))`,
            gridTemplateColumns: `repeat(${allTasks.length + 1}, calc(100% / ${
              allTasks.length + 1
            }))`,
            height: "100%",
            width: "100%",
          }}
          className={styles.taskTable}
        >
          {taskGrid.map((taskGridRow, taskGridRowIndex) => (
            <Fragment key={taskGridRowIndex * 10}>
              {taskGridRow.map((taskGridElement, taskGridColumnIndex) => (
                <div
                  key={taskGridColumnIndex * 100}
                  style={{
                    gridRowStart: `${taskGridRowIndex + 1}`,
                    gridRowEnd: `${taskGridRowIndex + 2}`,
                    gridColumnStart: `${taskGridColumnIndex + 1}`,
                    gridColumnEnd: `${taskGridColumnIndex + 2}`,
                    display: "inline-grid",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  {taskGridRowIndex === 0 && taskGridColumnIndex === 0 ? (
                    // <TaskTableCorner
                    //   textContent={`(${taskGridRowIndex}, ${taskGridColumnIndex})`}
                    // />
                    <TaskTableCorner
                      textContent={""}
                      allTasks={allTasks}
                      setAllTasks={setAllTasks}
                      realTimeEnvironment={realTimeEnvironment}
                      setRealTimeEnvironment={setRealTimeEnvironment}
                      setAllUpdates={setAllUpdates}
                      setIsButtonClicked={setIsButtonClicked}
                    />
                  ) : (
                    <>
                      {taskGridRowIndex === 0 ? (
                        // <TaskTableColumnHeader
                        //   textContent={`(${taskGridRowIndex}, ${taskGridColumnIndex})`}
                        // />
                        <TaskTableColumnHeader
                          textContent={taskGridElement.substring(0, 1)}
                          textContentSub={taskGridElement.substring(1)}
                        />
                      ) : (
                        <>
                          {taskGridColumnIndex === 0 ? (
                            <TaskTableRowHeader
                              textContent={taskGridElement.substring(0, 1)}
                              textContentSub={taskGridElement.substring(1)}
                            />
                          ) : (
                            <TaskTableCell
                              textContent={taskGridElement}
                              textContentSub={""}
                              rowIndex={taskGridRowIndex}
                              columnIndex={taskGridColumnIndex}
                              allTasks={allTasks}
                              setAllTasks={setAllTasks}
                              setAllUpdates={setAllUpdates}
                              isTaskCompTimeHovered={isTaskCompTimeHovered}
                              setIsTaskCompTimeHovered={
                                setIsTaskCompTimeHovered
                              }
                              isTaskCompTimeClicked={isTaskCompTimeClicked}
                              setIsTaskCompTimeClicked={
                                setIsTaskCompTimeClicked
                              }
                              isTaskDeadlineHovered={isTaskDeadlineHovered}
                              setIsTaskDeadlineHovered={
                                setIsTaskDeadlineHovered
                              }
                              isTaskDeadlineClicked={isTaskDeadlineClicked}
                              setIsTaskDeadlineClicked={
                                setIsTaskDeadlineClicked
                              }
                              sortedSequence={sortedSequence}
                            />
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
