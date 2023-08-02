import Arrow from "./Arrow";
import TaskTableElement from "./TaskTableElement";

export default function Deadline({
  taskName,
  isTaskDeadlineHovered,
  isTaskDeadlineClicked,
}: {
  taskName: string;
  isTaskDeadlineHovered: boolean;
  isTaskDeadlineClicked: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
      }}
    >
      <TaskTableElement
        textContent={taskName.substring(0, 1)}
        textContentSub={taskName.substring(1)}
        isTaskDeadlineHovered={isTaskDeadlineHovered}
        isTaskDeadlineClicked={isTaskDeadlineClicked}
      />
      <Arrow />
    </div>
  );
}
