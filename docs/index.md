---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Fury Engine Docs"
  # text: "Documentation for Fury Engine"
  tagline: Clean, simple, strong chess engine written in C++ <br/><br/>
  actions:
    - theme: brand
      text: Quick Start
      link: /quickstart/quickstart.md
    - theme: alt
      text: Dev Log
      link: /devlog/planning.md
    - theme: alt
      text: Documentation
      link: /docs/introduction.md
  image:
    src: https://raw.githubusercontent.com/atharva-malik/FuryEngine/f9fa2e73c32317cdf9cee7a397fd422d990525c3/docs/static/Logo.svg
    alt: VitePress


features:
  # - icon: 📝
  - icon: <img src="https://raw.githubusercontent.com/atharva-malik/FuryEngine/f9fa2e73c32317cdf9cee7a397fd422d990525c3/docs/static/CLI.svg" width="80%"/>
    title: UCI Compatible
    details: Compatible with the Universal Chess Interface, allowing seamless interaction & integration.
  - icon: 📝
    title: Clean Logging
    details: Built-in logging system with commands received and output given logged.
  - icon: <img src="https://raw.githubusercontent.com/atharva-malik/FuryEngine/f9fa2e73c32317cdf9cee7a397fd422d990525c3/docs/static/LICHESS.svg" width="80%"/>
    title: Lichess Support
    details: Hostable at Lichess. Rated around 2400.
  - icon: <img src="https://raw.githubusercontent.com/atharva-malik/FuryEngine/f9fa2e73c32317cdf9cee7a397fd422d990525c3/docs/static/TXT.svg" width="80%"/>
    title: Vast Opening Book
    details: A vast opening book with over 22,000 lines of the latest theory, with more to come.
---
