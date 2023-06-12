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
            <div className={styles.buttonWrapper}>
              <Link
                className="button button--primary button--lg"
                to="/docs/intro"
              >
                Get Started →
              </Link>
              <a
                href="https://www.producthunt.com/posts/energeticai?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-energeticai"
                target="_blank"
                className={styles.productHunt}
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=399058&theme=light"
                  alt="EnergeticAI - Use&#0032;open&#0045;source&#0032;AI&#0032;in&#0032;your&#0032;Node&#0046;js&#0032;apps&#0044;&#0032;up&#0032;to&#0032;67x&#0032;faster | Product Hunt"
                  style={{ width: "209px", height: "46px" }}
                  width="208"
                  height="45"
                />
              </a>
            </div>
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
