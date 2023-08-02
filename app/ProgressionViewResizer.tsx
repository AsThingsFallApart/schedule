import styles from "./ProgressionViewResizer.module.css";
import { MouseEventHandler } from "react";

export default function ProgressionViewResizer({
  isCollapsed,
  collapseProgressionView,
  expandProgressionView,
  isResizerFacingRight,
}: {
  isCollapsed: boolean;
  collapseProgressionView: MouseEventHandler<HTMLDivElement>;
  expandProgressionView: MouseEventHandler<HTMLDivElement>;
  isResizerFacingRight: boolean;
}) {
  const clickHandler = isCollapsed
    ? expandProgressionView
    : collapseProgressionView;

  const resizerRotateAni: string = isResizerFacingRight
    ? `500ms 1 forwards cubic-bezier(0.17,0.84,0.44,1) ${styles.faceRight}`
    : `500ms 1 forwards cubic-bezier(0.17,0.84,0.44,1) ${styles.faceLeft}`;

  const progressionViewResizerStyle = {
    animation: `${resizerRotateAni}`,
  };

  return (
    <div
      className={styles.progressionViewResizerContainer}
      style={progressionViewResizerStyle}
    >
      <div
        className={styles.progressionViewResizer}
        onClick={clickHandler}
      ></div>
    </div>
  );
}
