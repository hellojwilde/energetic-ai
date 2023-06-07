// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "EnergeticAI",
  tagline: "Use open-source AI models for your app, up to 67x faster.",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://energeticai.org",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "realworldprivacy", // Usually your GitHub org/user name.
  projectName: "energetic-ai", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/realworldprivacy/energetic-ai/tree/main/website/",
        },
        blog: {
          showReadingTime: true,
          editUrl:
            "https://github.com/realworldprivacy/energetic-ai/tree/main/website/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  plugins: [
    [
      "posthog-docusaurus",
      {
        apiKey: "phc_cD1NFJpa3DkKFDEA2wkNFrmDjb2FvdSYxH0uoAPj5rk",
        appUrl: "https://energeticai.org/e",
        enableInDevelopment: false,
        persistence: "memory",
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/social-card.png",
      navbar: {
        title: "EnergeticAI",
        logo: {
          alt: "EnergeticAI Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Docs",
          },
          {
            type: "docSidebar",
            sidebarId: "apiSidebar",
            position: "left",
            label: "API",
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/realworldprivacy/energetic-ai",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        logo: {
          alt: "Real World Privacy Logo",
          src: "img/rwp-logo.png",
          href: "https://realworldprivacy.com",
          width: 50,
          height: 50,
        },
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Docs",
                to: "/docs/intro",
              },
              {
                label: "API",
                to: "/docs/api/core",
              },
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/realworldprivacy/energetic-ai",
              },
            ],
          },
          {
            title: "Legal",
            items: [
              {
                label: "Privacy",
                href: "https://realworldprivacy.com/page/privacy-policy/",
              },
              {
                label: "Terms",
                href: "https://realworldprivacy.com/page/terms-of-service/",
              },
              {
                label: "Disclaimer",
                href: "https://realworldprivacy.com/page/disclaimer/",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Real World Privacy LLC. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
