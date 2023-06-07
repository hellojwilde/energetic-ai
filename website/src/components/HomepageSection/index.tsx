import React from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

type Props = {
  title: string;
  subtitle: string;
  className?: string;
  contentClassName?: string;
  children?: React.ReactNode;
};

export default function HomepageSection(props: Props) {
  const {
    children,
    title,
    subtitle,
    className,
    contentClassName,
    ...otherProps
  } = props;
  return (
    <section className={clsx(styles.section, className)} {...otherProps}>
      <div className="container">
        <h2 className={styles.sectionTitle}>{title}</h2>
        <p className={styles.sectionSubtitle}>{subtitle}</p>
        <div className={contentClassName}>{children}</div>
      </div>
    </section>
  );
}
