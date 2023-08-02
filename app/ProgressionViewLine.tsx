import styles from "./ProgressionViewLine.module.css";

export default function ProgressionViewLine({ update }: { update: string }) {
  return <div className={styles.line}>{update}</div>;
}
