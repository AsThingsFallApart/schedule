import styles from "./ProgressionView.module.css";
import { useState, useEffect, MouseEventHandler } from "react";
import ProgressionViewLine from "./ProgressionViewLine";
import ProgressionViewResizer from "./ProgressionViewResizer";

export default function ProgressionView({
  allUpdates,
  isCollapsed,
  collapseProgressionView,
  expandProgressionView,
  isResizerFacingRight,
}: {
  allUpdates: Array<string>;
  isCollapsed: boolean;
  collapseProgressionView: MouseEventHandler<HTMLDivElement>;
  expandProgressionView: MouseEventHandler<HTMLDivElement>;
  isResizerFacingRight: boolean;
}) {
  return (
    <div className={styles.progressionViewContainer}>
      <ProgressionViewResizer
        isCollapsed={isCollapsed}
        collapseProgressionView={collapseProgressionView}
        expandProgressionView={expandProgressionView}
        isResizerFacingRight={isResizerFacingRight}
      />
      <div className={styles.progressionViewBox}>
        <div className={styles.progressionView}>
          {allUpdates.map((line, lineIndex) => (
            <ProgressionViewLine key={lineIndex} update={line} />
          ))}
        </div>
      </div>
    </div>
  );
}
