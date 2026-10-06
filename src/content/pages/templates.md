---
_schema: default
title: Templates
description: Learn about static sites, Git workflows, and content management for your next project.
pageSections:
  - _component: page-sections/heroes/hero-center
    content:
      eyebrow: TUTORIALS
      heading: Templates with static site generators
      headingLevel: h1
      headingSize: xl
      subtext: >-
        Learn about static sites, Git workflows, and content management for your next project.
      subtextSize: xl
      subtextWidth: md
    style:
      backgroundColor: light-sand
      background:
        type: pattern
        pattern: pegboard
      haze: true
  - _component: page-sections/collections/collection-toolbar
    content:
      collection: templates
      searchLabel: Search templates
      searchPlaceholder: Search...
      sortLabel: Sort
      filters:
        - label: Filter by category
          name: category
          options:
            - id: starter
              name: Starter
            - id: editor-friendly
              name: Editor-friendly
            - id: archived
              name: Archived
        - label: Filter by SSG
          name: ssg
          options:
            - id: astro
              name: Astro
            - id: hugo
              name: Hugo
            - id: eleventy
              name: Eleventy
    style:
      backgroundColor: light-sand
      paddingVerticalStart: none
      paddingVerticalEnd: 2xl
  - _component: page-sections/collections/card-collection
    content:
      collection: templates
      eyebrow: EXPLORE BY COLLECTION
      subtext: >-
        Choose a template that's optimized for editing in CloudCannon, and get a head start on your
        next project.
      columns: 3
      items:
        - image: /src/assets/images/marketing/template-jetstream.jpg
          imageAlt: The Jetstream template's home page
          link: /templates/jetstream/
          contentSections:
            - _component: building-blocks/core-elements/heading
              text: Jetstream
              level: h3
              size: xs
            - _component: building-blocks/core-elements/simple-text
              text: >-
                A flexible Astro template built with Astro 6 and Astro Component Starter components.
              size: sm
            - _component: building-blocks/core-elements/button
              text: Learn more
              variant: text
              iconName: move-right
              iconPosition: after
              size: sm
        - image: /src/assets/images/marketing/template-astro-component-starter.jpg
          imageAlt: The Astro Component Starter template's home page
          link: /templates/astro-component-starter/
          contentSections:
            - _component: building-blocks/core-elements/heading
              text: Astro Component Starter
              level: h3
              size: xs
            - _component: building-blocks/core-elements/simple-text
              text: >-
                The Astro Component Starter is easy to customize and simple to maintain.
              size: sm
            - _component: building-blocks/core-elements/button
              text: Learn more
              variant: text
              iconName: move-right
              iconPosition: after
              size: sm
        - image: /src/assets/images/marketing/template-astro-minimal.jpg
          imageAlt: The Astro Minimal Starter template's home page
          link: /templates/astro-minimal-starter/
          contentSections:
            - _component: building-blocks/core-elements/heading
              text: Astro Minimal Starter
              level: h3
              size: xs
            - _component: building-blocks/core-elements/simple-text
              text: >-
                The Astro Starter provides developers with everything they need to quickly get going.
              size: sm
            - _component: building-blocks/core-elements/button
              text: Learn more
              variant: text
              iconName: move-right
              iconPosition: after
              size: sm
        - image: /src/assets/images/marketing/template-sendit.jpg
          imageAlt: The Sendit template's home page
          link: /templates/sendit/
          contentSections:
            - _component: building-blocks/core-elements/heading
              text: Sendit
              level: h3
              size: xs
            - _component: building-blocks/core-elements/simple-text
              text: >-
                A starting point for developers looking to build a multilingual website.
              size: sm
            - _component: building-blocks/core-elements/button
              text: Learn more
              variant: text
              iconName: move-right
              iconPosition: after
              size: sm
        - image: /src/assets/images/marketing/template-venture.jpg
          imageAlt: The Venture template's home page
          link: /templates/venture/
          contentSections:
            - _component: building-blocks/core-elements/heading
              text: Venture
              level: h3
              size: xs
            - _component: building-blocks/core-elements/simple-text
              text: >-
                The Hugo Starter serves as an ideal template for developers who want to move fast.
              size: sm
            - _component: building-blocks/core-elements/button
              text: Learn more
              variant: text
              iconName: move-right
              iconPosition: after
              size: sm
        - image: /src/assets/images/marketing/template-essentia.jpg
          imageAlt: The Essentia template's home page
          link: /templates/essentia/
          contentSections:
            - _component: building-blocks/core-elements/heading
              text: Essentia
              level: h3
              size: xs
            - _component: building-blocks/core-elements/simple-text
              text: >-
                The Eleventy Starter provides developers with everything they need to get started.
              size: sm
            - _component: building-blocks/core-elements/button
              text: Learn more
              variant: text
              iconName: move-right
              iconPosition: after
              size: sm
    style:
      backgroundColor: light-sand
      background:
        type: pattern
        pattern: grid
        mask: fade
      paddingVertical: 4xl
  - _component: page-sections/conversion/cta-banner
    content:
      scratch: pacific
      heading: Any questions about CloudCannon?
      headingSize: lg
      linkText: Check out our documentation or contact us with any questions you have
      link: /support/
      imageSource: /src/assets/images/marketing/rocks-corner-3806-70523.png
      imageAlt: ""
---
