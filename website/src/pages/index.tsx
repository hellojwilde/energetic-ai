import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import HomepageSectionPerformance from "@site/src/components/HomepageSection/HomepageSectionPerformance";
import HomepageSectionModels from "../components/HomepageSection/HomepageSectionModels";
import CodeBlock from "@docusaurus/theme-classic/lib/theme/CodeBlock";
import styles from "./index.module.css";
import HomepageSectionUsability from "../components/HomepageSection/HomepageSectionUsability";

function HomepageHeader() {
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroContentLeft}>
            <iframe
              src="https://ghbtns.com/github-btn.html?user=realworldprivacy&repo=energetic-ai&type=star&count=true"
              width="150"
              height="20"
              title="GitHub"
            ></iframe>

            <h1 className={clsx("hero__title", styles.heroTitle)}>
              Use open-source AI in your Node.js apps,{" "}
              <span className={styles.heroTitleHighlight}>
                up to 67x faster
              </span>
              .
            </h1>
            <p>
              EnergeticAI is TensorFlow.js, optimized for serverless
              environments, with{" "}
              <strong>
                fast cold-start, small module size, and pre-trained models
              </strong>
              .
            </p>
            <p>
              Install in seconds, and scale with business-friendly licensing.
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
              {`import { initModel, distance } from "@energetic-ai/embeddings";\n` +
                `import { modelSource } from '@energetic-ai/model-embeddings-en';\n\n` +
                `(async () => {\n` +
                `  const model = await initModel(modelSource);\n` +
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
      title={`Use open-source AI in your Node.js apps`}
      description="EnergeticAI is TensorFlow.js optimized for serverless functions, with fast cold-start, small module size, and pre-trained models."
    >
      <HomepageHeader />
      <main>
        <HomepageSectionModels />
        <HomepageSectionPerformance />
        <HomepageSectionUsability />
      </main>
    </Layout>
  );
}
