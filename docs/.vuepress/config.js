module.exports = {
  plugins: [require("./plugin.js")],
  locales: {
    "/": {
      lang: "en-US",
      title: "Vuejs Toast",
      description: "Vuejs Toast"
    }
  },
  themeConfig: {
    repo: "/s4l1h/vue-toastr",
    docsDir: "docs",
    locales: {
      "/": {
        label: "English",
        selectText: "Languages",
        editLinkText: "Edit this page on GitHub",
        nav: [
          {
            text: "Release Notes",
            link: "https://github.com/s4l1h/vue-toastr/releases"
          }
        ],
        sidebar: [
          "/installation.md",
          "/started.md",
          "/usage_browser.md",
          "/usage_module.md",
          "/global_options.md",
          "/toast_options.md"
        ]
      }
    }
  }
};
