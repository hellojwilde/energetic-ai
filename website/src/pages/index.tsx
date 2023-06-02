import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import HomepagePerformance from "@site/src/components/HomepagePerformance";
import CodeBlock from "@docusaurus/theme-classic/lib/theme/CodeBlock";

import styles from "./index.module.css";
import HomepageModels from "../components/HomepageModels";

function HomepageHeader() {
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroContentLeft}>
            <h1 className={clsx("hero__title", styles.heroTitle)}>
              Run open-source AI in serverless functions,
              <br />
              <span className={styles.heroTitleHighlight}>
                up to 67x faster
              </span>
              .
            </h1>
            <p>
              EnergeticAI is a distribution of TensorFlow.js optimized for
              serverless functions, with small module size, fast cold-start, and
              incredible ease-of-use.
            </p>
            <p>
              <em>
                Enhance user privacy, simplify your code, and have one less
                bill.
              </em>
            </p>
            <Link
              className="button button--primary button--lg"
              to="/docs/intro"
            >
              Get Started →
            </Link>
          </div>
          <div className={styles.heroContentRight}>
            <CodeBlock language="js">
              {`import { initModel, distance } from "@energetic-ai/embeddings";\n\n` +
                `(async () => {\n` +
                `  const model = await initModel();\n` +
                `  const [hello, world] = await model.embed([\n` +
                `     "hello",\n` +
                `     "world"\n` +
                `  ]);\n` +
                `  console.log(distance(hello, world));\n` +
                `})();\n`}
            </CodeBlock>
            Pre-trained embeddings for recommendations and more.
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title={`Open-source AI, optimized for serverless`}
      description="EnergeticAI is a small, fast, easy-to-use distribution of TensorFlow.js — optimized for serverless functions, with pre-trained models for key tasks."
    >
      <HomepageHeader />
      <main>
        <HomepageModels />
        <HomepagePerformance />
      </main>
    </Layout>
  );
}
