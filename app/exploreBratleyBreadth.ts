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

export function exploreBratleyBreadth(
  originalTaskSet: Array<BratleyTask>,
  currentTaskSet: Array<BratleyTask>
): Array<BratleyTask> {
  let nextTaskSet: Array<BratleyTask> = [];

  const numOriginalTasks = originalTaskSet.length;
  const numCurrentTasks = currentTaskSet.length;

  // console.log("originalTaskSet:");
  // console.dir(originalTaskSet);
  // console.log("currenTaskSet:");
  // console.dir(currentTaskSet);

  // explore all possible paths:
  //  calculate theicurrentTaskSetr worstCaseCompTime:
  //    worstCaseCompTime = predecessorAccrual + compTime;
  //  check if path is feasible:
  //    (worstCaseCompTime > deadline)
  //      ? bratleyTask.feasible = false
  //      : bratleyTask.feasbiel = true;
  for (let i = 0; i < numCurrentTasks; i++) {
    // calculate worstCaseCompTime and feasibility for all tasks
    // that are not predeccesors or current task
    // console.log(`i:\t${i}`);

    for (let j = 0; j < numOriginalTasks; j++) {
      const currentTaskName = parseInt(
        currentTaskSet[i].name.substring(1).trim(),
        10
      );

      const nextSpawnedTaskName = j + 1;

      if (
        !currentTaskSet[i].predecessorNames.includes(nextSpawnedTaskName) &&
        nextSpawnedTaskName !== currentTaskName
      ) {
        // console.log(`j:\t${j}`);
        let nextWorstCaseCompTime = 0;

        for (
          let k = 0;
          k < currentTaskSet[i].predecessorWorstCaseCompTimes.length;
          k++
        ) {
          // console.log("in calc pathRuntime loop");
          nextWorstCaseCompTime +=
            currentTaskSet[i].predecessorWorstCaseCompTimes[k];
        }

        if (nextWorstCaseCompTime === 0) {
          nextWorstCaseCompTime =
            originalTaskSet[j].arrival + originalTaskSet[j].computationTime;
        } else {
          nextWorstCaseCompTime =
            currentTaskSet[i].worstCaseCompTime +
            originalTaskSet[j].computationTime;
        }

        let nextFeasible = true;
        if (nextWorstCaseCompTime > originalTaskSet[j].deadline) {
          nextFeasible = false;
        }

        const nextTask: BratleyTask = {
          name: `J${j + 1}`,
          computationTime: originalTaskSet[j].computationTime,
          deadline: originalTaskSet[j].deadline,
          arrival: originalTaskSet[j].arrival,
          predecessorNames: [
            ...currentTaskSet[i].predecessorNames,
            parseInt(currentTaskSet[i].name.substring(1), 10),
          ],
          predecessorWorstCaseCompTimes: [
            ...currentTaskSet[i].predecessorWorstCaseCompTimes,
            nextWorstCaseCompTime,
          ],
          worstCaseCompTime: nextWorstCaseCompTime,
          feasible: nextFeasible,
        };

        nextTaskSet.push(nextTask);
      }
    }
  }

  return nextTaskSet;
}
