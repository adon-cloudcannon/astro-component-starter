---
_schema: default
title: Serving up fresh content
shortTitle: Blog
description: The latest news from CloudCannon and the static site community.
# The posts the listing leads with, in the order the carousel shows them.
featured:
  - cloudcannon-astro-performance-meets-powerful-content-management
  - deploy-previews-for-better-visibility-wherever-your-team-works
  - building-with-ai-git-based-vs-headless-vs-traditional-cms
  - introducing-the-astro-component-starter
pageSections:
  - _component: page-sections/heroes/hero-center
    content:
      sectionLabel: ''
      heading:
        eyebrow: Blog
        heading: Serving up fresh content
        headingLevel: h1
        headingSize: xl
        headingWidth: xl
      subtext:
        subtext: The latest news from CloudCannon and the static site community.
        subtextSize: lg
        subtextWidth: md
      buttonSections: []
      note: []
    style:
      backgroundColor: dark
      pattern: grid
      fade: none
      maxContentWidth: xl
      paddingHorizontal: gutter
      paddingVertical: 4xl
      haze: true
  - _component: page-sections/conversion/cta-split
    content:
      sectionLabel: Closing CTA
      heading:
        heading: Websites that are chef's kiss
        headingLevel: h2
        headingSize: lg
      subtext:
        subtext: Whether you manage one website or one thousand, CloudCannon scales with
          you without breaking a sweat.
        subtextSize: lg
        subtextWidth: ''
      buttonSections:
        - _component: building-blocks/core-elements/button
          text: Start your free trial
          link: /start/
          variant: primary
          size: md
        - _component: building-blocks/core-elements/button
          text: Book a demo
          link: /contact/
          iconName: arrow-right
          iconPosition: after
          variant: text
          size: md
      mediaSections:
        - _component: building-blocks/core-elements/image
          source: /src/assets/images/marketing/hero-low-maintenance.png
          alt: A tuatara reclining on a deck chair
          decorative: false
          rounded: false
          aspectRatio: none
          positionVertical: center
          positionHorizontal: center
          priority: false
      contentCard: true
      contentCardColor: white
      reverse: false
    style:
      backgroundColor: dark-sand
      pattern: grid
      fade: none
      maxContentWidth: xl
      paddingHorizontal: gutter
      paddingVertical: 4xl
      haze: false
---
