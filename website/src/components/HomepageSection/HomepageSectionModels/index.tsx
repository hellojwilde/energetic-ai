import React from "react";
import styles from "./styles.module.css";
import {
  GlobeAltIcon,
  MagnifyingGlassIcon,
  ServerStackIcon,
} from "@heroicons/react/24/outline";
import HomepageSection from "..";

function Model({ title, children, icon, href = null, isPlanned = false }) {
  const IconComponent = icon;
  return (
    <div className="col col--4">
      <div className={styles.model}>
        <IconComponent className={styles.modelIcon} />
        <h3>
          {title}
          <span className={styles.modelBadges}>
            <span className="badge badge--secondary">English</span>
            {isPlanned ? (
              <span className="margin-left--sm badge badge--primary">
                Planned
              </span>
            ) : null}
          </span>
        </h3>

        <p>{children}</p>

        <div className={styles.modelButtons}>
          {isPlanned ? (
            <a className="button button--secondary disabled">Planned</a>
          ) : (
            <a
              className="button button--secondary"
              href={href || "/docs/intro"}
            >
              Documentation
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HomepageSectionModels(): JSX.Element {
  return (
    <HomepageSection
      title="Models"
      subtitle="Hit the ground running with pre-trained models."
    >
      <div className={styles.models}>
        <div className="row">
          <Model
            title="Embeddings"
            icon={GlobeAltIcon}
            href="/docs/guides/embeddings"
          >
            Build recommendations and more with sentence embeddings.
          </Model>
          <Model
            title="Semantic Search"
            isPlanned={true}
            icon={MagnifyingGlassIcon}
          >
            Provide answers based on meaning with question-answering models.
          </Model>
          <Model title="Classification" isPlanned={true} icon={ServerStackIcon}>
            Classify text into categories with just a few training examples.
          </Model>
        </div>
      </div>
    </HomepageSection>
  );
}
