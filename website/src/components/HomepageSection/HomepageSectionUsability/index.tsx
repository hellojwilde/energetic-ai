import React from "react";
import HomepageSection from "..";
import styles from "./styles.module.css";
import CodeBlock from "@docusaurus/theme-classic/lib/theme/CodeBlock";
import Link from "@docusaurus/Link";

export default function HomepageSectionUsability() {
  return (
    <HomepageSection
      title="Usability"
      subtitle="Install in seconds, and scale with business-friendly licensing."
      contentClassName={styles.usability}
    >
      <p>
        <strong>Download EnergeticAI from NPM (for Node.js 18+):</strong>
      </p>
      <CodeBlock language="bash" className={styles.usabilityCode}>
        {`npm install @energetic-ai/core @energetic-ai/embeddings @energetic-ai/model-embeddings-en`}
      </CodeBlock>
      <p>
        EnergeticAI libraries and pre-trained models are Apache 2.0 licensed.
        Dependencies may differ.
      </p>
      <Link href="/docs/intro" className="button button--primary button--lg">
        Get Started →
      </Link>
    </HomepageSection>
  );
}
