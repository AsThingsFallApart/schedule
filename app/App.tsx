"use client";

import ViewSplit from "./ViewSplit";
import { useEffect, useState, useMemo } from "react";
import { exploreBratleyBreadth } from "./exploreBratleyBreadth";

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

export default function App() {
  const [allUpdates, setAllUpdates] = useState(["Initializing..."]);
  let taskSet: Array<BratleyTask>;

  /* EDD test set */
  // taskSet = [
  //   { name: "J1", computationTime: 1, deadline: 3, arrival: 0 },
  //   { name: "J2", computationTime: 1, deadline: 2, arrival: 0 },
  //   { name: "J3", computationTime: 1, deadline: 6, arrival: 0 },
  //   { name: "J4", computationTime: 2, deadline: 9, arrival: 0 },
  //   { name: "J5", computationTime: 3, deadline: 9, arrival: 0 },
  //   { name: "J6", computationTime: 3, deadline: 10, arrival: 0 },
  // ];

  /* Bratley's Algorithm test set*/
  taskSet = [
    {
      name: "J1",
      computationTime: 2,
      predecessorNames: [0],
      predecessorWorstCaseCompTimes: [0],
      deadline: 7,
      arrival: 4,
      worstCaseCompTime: 0,
      feasible: true,
    },
    {
      name: "J2",
      computationTime: 1,
      predecessorNames: [0],
      predecessorWorstCaseCompTimes: [0],
      deadline: 5,
      arrival: 1,
      worstCaseCompTime: 0,
      feasible: true,
    },
    {
      name: "J3",
      computationTime: 2,
      predecessorNames: [0],
      predecessorWorstCaseCompTimes: [0],
      deadline: 6,
      arrival: 1,
      worstCaseCompTime: 0,
      feasible: true,
    },
    {
      name: "J4",
      computationTime: 2,
      predecessorNames: [0],
      predecessorWorstCaseCompTimes: [0],
      deadline: 4,
      arrival: 0,
      worstCaseCompTime: 0,
      feasible: true,
    },
  ];

  let rootBratleyTask: BratleyTask = {
    name: "J0",
    computationTime: 0,
    deadline: 0,
    arrival: 0,
    predecessorNames: [],
    predecessorWorstCaseCompTimes: [0],
    worstCaseCompTime: 0,
    feasible: true,
  };
  let initBratleyBreadth: Array<Array<BratleyTask>> = [[rootBratleyTask]];

  let taskSetCompTimeHovered = JSON.parse(JSON.stringify(taskSet));
  taskSetCompTimeHovered.fill(false, 0, taskSetCompTimeHovered.length);

  let taskSetCompTimeClicked = JSON.parse(JSON.stringify(taskSet));
  taskSetCompTimeClicked.fill(false, 0, taskSetCompTimeClicked.length);

  let taskSetDeadlineHovered = JSON.parse(JSON.stringify(taskSet));
  taskSetDeadlineHovered.fill(false, 0, taskSetDeadlineHovered.length);

  let taskSetDeadlineClicked = JSON.parse(JSON.stringify(taskSet));
  taskSetDeadlineClicked.fill(false, 0, taskSetDeadlineClicked.length);

  const [allTasks, setAllTasks] = useState(taskSet);
  const [realTimeEnvironment, setRealTimeEnvironment] = useState([
    "Ci",
    "di",
    "ai",
  ]);
  const [scheduleEndTick, setScheduleEndTick] = useState(0);
  const [sortedTaskSet, setSortedTaskSet] = useState(Array<BratleyTask>);
  const [algorithm, setAlgorithm] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isTaskCompTimeHovered, setIsTaskCompTimeHovered] = useState(
    taskSetCompTimeHovered
  );
  const [isTaskCompTimeClicked, setIsTaskCompTimeClicked] = useState(
    taskSetCompTimeClicked
  );
  const [isTaskDeadlineHovered, setIsTaskDeadlineHovered] = useState(
    taskSetDeadlineHovered
  );
  const [isTaskDeadlineClicked, setIsTaskDeadlineClicked] = useState(
    taskSetDeadlineClicked
  );
  const [sortedSequence, setSortedSequence] = useState(Array<number>);
  const [bratleyBreadths, setBratleyBreadths] = useState(initBratleyBreadth);

  useEffect(() => {
    if (realTimeEnvironment.length === 3) {
      setAlgorithm((algorithm) => (algorithm = "bratleys"));
    } else {
      setAlgorithm((algorithm) => (algorithm = "earliestDueDate"));
    }
  }, [algorithm, realTimeEnvironment, allTasks]);

  useEffect(() => {
    if (isButtonClicked) {
      if (realTimeEnvironment.length === 2) {
        setAlgorithm((algorithm) => (algorithm = "earliestDueDate"));
        setAllUpdates(
          (allUpdates) =>
            (allUpdates = [
              ...allUpdates,
              "Removal of 'Arrival Time' attribute detected. Transitioning to Earliest Due Date...",
            ])
        );
      } else if (realTimeEnvironment.length === 3) {
        setAlgorithm((algorithm) => (algorithm = "bratleys"));
        setAllUpdates(
          (allUpdates) =>
            (allUpdates = [
              ...allUpdates,
              "Addition of 'Arrival Time' attribute detected. Transitioning to Bratley's Algorithm...",
            ])
        );
      }

      setIsButtonClicked(
        (buttonClickedStatus) => (buttonClickedStatus = false)
      );
    }
  }, [isButtonClicked, realTimeEnvironment]);

  useEffect(() => {
    let taskSetCopy = JSON.parse(JSON.stringify([...allTasks]));
    let maxDeadline: number = 0;
    let sumOfComputationTimes: number = 0;
    let nextSortedTaskSet: Array<BratleyTask> = [];
    let nextSortedSequence: Array<number> = [];

    for (let i = 0; i < taskSetCopy.length; i++) {
      nextSortedSequence.push(0);
    }

    switch (algorithm) {
      case "earliestDueDate":
        // organize schedule by assigning tasks with the smallest deadline
        // to the processor first

        let smallestDeadlineIndex = 0;

        for (let i = 0; i < taskSetCopy.length; i++) {
          let smallestDeadline = Number.MAX_SAFE_INTEGER;

          for (let j = 0; j < taskSetCopy.length; j++) {
            if (taskSetCopy[j].deadline < smallestDeadline) {
              smallestDeadline = taskSetCopy[j].deadline;
              smallestDeadlineIndex = j;
            }
            if (
              taskSetCopy[j].deadline !== Number.MAX_SAFE_INTEGER &&
              taskSetCopy[j].deadline > maxDeadline
            ) {
              maxDeadline = taskSetCopy[j].deadline;
            }
          }

          const taskCopy: BratleyTask = {
            name: taskSetCopy[smallestDeadlineIndex].name,
            computationTime: taskSetCopy[smallestDeadlineIndex].computationTime,
            deadline: taskSetCopy[smallestDeadlineIndex].deadline,
            arrival: taskSetCopy[smallestDeadlineIndex].arrival,
            predecessorNames: [],
            predecessorWorstCaseCompTimes: [],
            worstCaseCompTime: 0,
            feasible: true,
          };
          nextSortedTaskSet.push(taskCopy);
          taskSetCopy[smallestDeadlineIndex].deadline = Number.MAX_SAFE_INTEGER;

          sumOfComputationTimes += taskSetCopy[i].computationTime;

          nextSortedSequence[
            parseInt(taskSetCopy[smallestDeadlineIndex].name.substring(1), 10) -
              1
          ] = i;

          // console.log(`i:\t${i}`);
        }

        setSortedTaskSet(
          (sortedTaskSet) => (sortedTaskSet = nextSortedTaskSet)
        );

        setSortedSequence(
          (sortedSequence) => (sortedSequence = nextSortedSequence)
        );

        setAllUpdates(
          (allUpdates) =>
            (allUpdates = [
              ...allUpdates,
              'Schedule generated according to "Earliest Due Date" (EDD) algorithm.',
            ])
        );

        let max: number = 0;
        sumOfComputationTimes > maxDeadline
          ? (max = sumOfComputationTimes)
          : (max = maxDeadline);

        setScheduleEndTick((scheduleEndTick) => (scheduleEndTick = max + 2));

        break;

      case "bratleys":
        let nextBratleyBreadths: Array<Array<BratleyTask>> = [];
        let rootBratleyTask: BratleyTask = {
          name: "J0",
          computationTime: 0,
          deadline: 0,
          arrival: 0,
          predecessorNames: [],
          predecessorWorstCaseCompTimes: [0],
          worstCaseCompTime: 0,
          feasible: true,
        };
        let lastLevel: Array<BratleyTask> = [rootBratleyTask];

        for (let i = 0; i < allTasks.length; i++) {
          nextBratleyBreadths.push(exploreBratleyBreadth(allTasks, lastLevel));

          lastLevel = nextBratleyBreadths[i];
        }

        console.log("nextBratleyBreadths:");
        console.dir(nextBratleyBreadths);

        setBratleyBreadths(
          (bratleyBreadths) => (bratleyBreadths = nextBratleyBreadths)
        );

        setAllUpdates(
          (allUpdates) =>
            (allUpdates = [
              ...allUpdates,
              "Schedule generated according to Bratley's Algorithm.",
            ])
        );

        break;
    }
  }, [allTasks, realTimeEnvironment, algorithm]);

  return (
    <>
      <ViewSplit
        sortedTaskSet={sortedTaskSet}
        algorithm={algorithm}
        scheduleEndTick={scheduleEndTick}
        allUpdates={allUpdates}
        setAllUpdates={setAllUpdates}
        allTasks={allTasks}
        setAllTasks={setAllTasks}
        realTimeEnvironment={realTimeEnvironment}
        setRealTimeEnvironment={setRealTimeEnvironment}
        setIsButtonClicked={setIsButtonClicked}
        isTaskCompTimeHovered={isTaskCompTimeHovered}
        setIsTaskCompTimeHovered={setIsTaskCompTimeHovered}
        isTaskCompTimeClicked={isTaskCompTimeClicked}
        setIsTaskCompTimeClicked={setIsTaskCompTimeClicked}
        isTaskDeadlineHovered={isTaskDeadlineHovered}
        setIsTaskDeadlineHovered={setIsTaskDeadlineHovered}
        isTaskDeadlineClicked={isTaskDeadlineClicked}
        setIsTaskDeadlineClicked={setIsTaskDeadlineClicked}
        sortedSequence={sortedSequence}
        bratleyBreadths={bratleyBreadths}
      />
    </>
  );
}
