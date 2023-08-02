import styles from "./BratleyRoot.module.css";
import BratleyTaskText from "./BratleyTaskText";

export default function BratleyRoot({ height }: { height: number }) {
  const bratleyRootStyle = { height: `${height}vh`, width: `${height}vh` };

  return (
    <div className={styles.bratleyRoot} style={bratleyRootStyle}>
      <BratleyTaskText textContent={""} />
    </div>
  );
}
