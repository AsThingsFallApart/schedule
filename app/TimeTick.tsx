import styles from "./TimeTick.module.css";

export default function TimeTick({ tickNumber }: { tickNumber: number }) {
  const tickHeight = 2;
  const tickWidth = 6 / 20;

  function labelToTwoDigits(label: number): string {
    switch (label) {
      case 0:
        return "00";
      case 1:
        return "01";
      case 2:
        return "02";
      case 3:
        return "03";
      case 4:
        return "04";
      case 5:
        return "05";
      case 6:
        return "06";
      case 7:
        return "07";
      case 8:
        return "08";
      case 9:
        return "09";
      default:
        return label.toString(10);
    }
  }

  return (
    <div className={styles.timeTickContainer}>
      <div
        className={styles.timeTick}
        style={{ width: `${tickWidth}vw`, height: `${tickHeight}vh` }}
      ></div>
      <div className={styles.timeTickLabel}>{tickNumber}</div>
    </div>
  );
}
