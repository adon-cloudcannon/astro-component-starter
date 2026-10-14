---
_schema: default
title: FAQ
description: Answers to the questions we are asked most about CloudCannon.
keywords: []
pageSections:
  - _component: page-sections/heroes/page-header
    content:
      sectionLabel: ''
      heading:
        eyebrow: ''
        heading: Frequently asked questions
        headingLevel: h1
        headingSize: xl
      subtext:
        subtext: CloudCannon sites are static, which gives you the fastest foundation the web can offer.
        subtextSize: lg
        subtextWidth: 929
      showBreadcrumbs: false
    style:
      alignmentHorizontal: center
      backgroundColor: light-sand
      pattern: grid
      fade: bottom
      maxContentWidth: xl
      paddingHorizontal: gutter
      paddingVertical: 4xl
      paddingVerticalEnd: 3xl
      haze: false
  - _component: page-sections/explainers/faq-browser
    content:
      sectionLabel: Questions
      eyebrow: Explore by topic
      showSearch: true
      searchPlaceholder: Search...
      searchLabel: Search the questions
      emptyText: No questions match that search.
    style:
      accordionVariant: card
      backgroundColor: light-sand
      pattern: none
      fade: none
      maxContentWidth: xl
      paddingHorizontal: gutter
      paddingVertical: 4xl
      paddingVerticalStart: none
      haze: false
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
        # Standing in for `lizard-kiss2`, which is vector art and still to be
        # exported. This is the Low Maintenance hero: the same character on the
        # same deck chair, with a vending machine and a sun the design's does
        # not have.
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
