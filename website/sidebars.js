const sidebars = {
  tutorialSidebar: [
    "intro",
    "tutorial",
    {
      type: "category",
      label: "Key Concepts",
      items: [
        "key-concepts/serverless",
        "key-concepts/tensors",
        "key-concepts/embeddings",
      ],
    },
    {
      type: "category",
      label: "Guides",
      items: ["guides/embeddings", "guides/classifiers"],
    },
  ],
  apiSidebar: [
    {
      type: "category",
      label: "Packages",
      items: [
        "api/core",
        "api/classifiers",
        "api/embeddings",
        "api/model-embeddings-en",
      ],
    },
  ],
};

module.exports = sidebars;
