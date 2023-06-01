const sidebars = {
  tutorialSidebar: [
    "intro",
    "tutorial",
    {
      type: "category",
      label: "Key Concepts",
      items: ["key-concepts/serverless", "key-concepts/embeddings"],
    },
    {
      type: "category",
      label: "Guides",
      items: ["guides/embeddings"],
    },
  ],
  apiSidebar: [
    {
      type: "category",
      label: "Packages",
      items: ["api/core", "api/embeddings", "api/model-embeddings-en"],
    },
  ],
};

module.exports = sidebars;
