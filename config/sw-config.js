module.exports = {
  cache: {
    cacheId: "Assignment",
    runtimeCaching: [{
      handler: "fastest",
      urlPattern: "\/$"
    }],
    staticFileGlobs: ["dist/**/*"]
  },
  manifest: {
    background: "#FFFFFF",
    title: "Assignment",
    short_name: "PWA",
    theme_color: "#FFFFFF"
  }
};
