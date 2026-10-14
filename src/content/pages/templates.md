---
_schema: default
title: Templates
description: Learn about static sites, Git workflows, and content management for
  your next project.
pageSections:
  - _component: page-sections/heroes/hero-center
    content:
      heading:
        eyebrow: TUTORIALS
        heading: Templates with static site generators
        headingLevel: h1
        headingSize: xl
      subtext:
        subtext: Learn about static sites, Git workflows, and content management for
          your next project.
        subtextSize: xl
        subtextWidth: md
    style:
      backgroundColor: light-sand
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
  - _component: page-sections/collections/template-grid
    content:
      sectionLabel: Templates
      eyebrow: EXPLORE BY COLLECTION
      subtext: Choose a template that's optimized for editing in CloudCannon, and get
        started with a single click.
      collection: templates
      linkText: Learn more
      pills:
        - id: featured
          name: Featured
          accent: pacific
        - id: starter
          name: Starter
          accent: golden
        - id: editor-friendly
          name: Editor-friendly
          accent: moss
        - id: partner
          name: Partner
          accent: sunset
    style:
      columns: 3
      backgroundColor: light-sand
      pattern: none
      fade: none
      maxContentWidth: xl
      paddingHorizontal: gutter
      paddingVertical: 4xl
      paddingVerticalStart: none
      haze: false
  - _component: page-sections/conversion/cta-banner
    content:
      heading:
        heading: Any questions about CloudCannon?
        headingSize: lg
      buttonSections:
        - _component: building-blocks/core-elements/button
          text: Check out our documentation or contact us with any questions you have
          link: /support/
          iconName: move-right
          iconColor: default
          textColor: default
          iconPosition: after
          hideText: false
          variant: text
          size: md
      imageRight:
        imageRightSource: /src/assets/images/marketing/rocks-corner-3806-70523.png
        imageRightAlt: ''
    style:
      scratched: true
---
