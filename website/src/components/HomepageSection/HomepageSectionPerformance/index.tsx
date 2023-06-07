import React from "react";
import styles from "./styles.module.css";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel } from "victory";
import clsx from "clsx";
import useThemeObserver from "../../useThemeObserver";
import HomepageSection from "..";
import Link from "@docusaurus/Link";

const chartFontFamily =
  "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";

const charts = [
  {
    title: "Cold-Start Speed",
    topline: "67x faster",
    description:
      "Inference speed in serverless functions is dominated by cold-start speed.",
    methodology:
      "This benchmark initializes the model and computes an embedding for a 5-sentence paragraph, on an M1 Max Macbook Pro.",
    data: [
      { x: "Tensorflow.js", y: 3711 },
      { x: "Tensorflow.js with Node.js Backend", y: 2239 },
      { x: "EnergeticAI", y: 2335 },
      { x: "EnergeticAI with Bundled Model", y: 55 },
    ],
    unit: "ms",
    benchmark:
      "https://github.com/realworldprivacy/energetic-ai/tree/main/examples/benchmarks",
  },
  {
    title: "Warm-Start Speed",
    topline: "80x faster",
    description:
      "Warm-start speed is matters when you're performing batch operations.",
    methodology:
      "This benchmark uses a pre-initialized model to compute an embedding for a 5-sentence paragraph, on an M1 Max Macbook Pro.",
    data: [
      { x: "Tensorflow.js", y: 1521 },
      { x: "Tensorflow.js with Node.js Backend", y: 18 },
      { x: "EnergeticAI", y: 52 },
      { x: "EnergeticAI with Bundled Model", y: 48 },
    ],
    unit: "ms",
    benchmark:
      "https://github.com/realworldprivacy/energetic-ai/tree/main/examples/benchmarks",
  },
  {
    title: "Module Size",
    topline: "48x smaller",
    description:
      "Module size makes or breaks serverless functions with size limits.",
    methodology:
      "This benchmark tracks uncompressed and compiled Node.js modules that would be included as zipped dependencies of a serverless function.",
    data: [
      { x: "Tensorflow.js", y: 146 },
      { x: "Tensorflow.js with Node.js Backend", y: 513 },
      { x: "EnergeticAI", y: 3 },
      { x: "EnergeticAI with Bundled Model", y: 32 },
    ],
    unit: "MB",
  },
];

export default function HomepageSectionPerformance(): JSX.Element {
  const [activeChart, setActiveChart] = React.useState(0);
  const theme = useThemeObserver();
  const activeChartData = charts[activeChart];

  return (
    <HomepageSection
      title="Performance"
      subtitle="EnergeticAI maximizes cold-start performance while minimizing module size."
      contentClassName={styles.perf}
    >
      <ul className="pills pills--block">
        {charts.map((d, i) => {
          return (
            <li
              key={i}
              className={`pills__item ${
                activeChart == i ? "pills__item--active" : ""
              }`}
              onClick={() => setActiveChart(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "Space") {
                  setActiveChart(i);
                }
              }}
              aria-label={d.title}
            >
              {d.title}
            </li>
          );
        })}
      </ul>
      <div className="row">
        <div className={clsx("col col--8", styles.perfChart)}>
          <VictoryChart
            height={150}
            padding={{ bottom: 20, top: 10, left: 0, right: 50 }}
          >
            <defs>
              <linearGradient
                id="energeticGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#ff8100" />
                <stop offset="100%" stopColor="#8500ff" />
              </linearGradient>
            </defs>
            <VictoryBar
              horizontal
              padding={0}
              barWidth={4}
              cornerRadius={{ top: 1, bottom: 1 }}
              labels={({ datum }) => `${datum.y} ${activeChartData.unit}`}
              style={{
                data: {
                  fill: ({ datum }) => {
                    if (datum.xName.includes("EnergeticAI")) {
                      return "url(#energeticGradient)";
                    }
                    return theme == "dark" ? "#aaa" : "#303846";
                  },
                },
                labels: {
                  padding: 4,
                  fontSize: 8,
                  fontWeight: "bold",
                  fill: theme == "dark" ? "#fff" : "#303846",
                  fontFamily: chartFontFamily,
                },
              }}
              data={activeChartData.data}
            />
            {[
              "EnergeticAI with Bundled Model",
              "EnergeticAI",
              "Tensorflow.js with Node.js Backend",
              "Tensorflow.js",
            ].map((d, i) => {
              return (
                <VictoryAxis
                  dependentAxis
                  key={i}
                  label={d}
                  padding={0}
                  axisLabelComponent={<VictoryLabel x={0} />}
                  style={{
                    tickLabels: { fill: "none" },
                    axis: { stroke: "none" },
                    axisLabel: {
                      fontSize: 8,
                      fill: theme == "dark" ? "#fff" : "#303846",
                      textAnchor: "start",
                      padding: 8,
                      fontFamily: chartFontFamily,
                    },
                  }}
                  axisValue={d}
                />
              );
            })}
          </VictoryChart>
        </div>
        <div className="col col--4">
          <p className={styles.perfUpTo}>Up to</p>
          <h3 className={styles.perfSummary}>{activeChartData.topline}</h3>
          <p className={styles.perfComparison}>Compared to Tensorflow.js</p>
          <p>
            <strong>{activeChartData.description}</strong>
          </p>
          <p>{activeChartData.methodology}</p>
          {activeChartData.benchmark && (
            <p>
              <Link href={activeChartData.benchmark}>View Benchmark</Link>
            </p>
          )}
        </div>
      </div>
    </HomepageSection>
  );
}
