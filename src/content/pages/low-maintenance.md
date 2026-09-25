---
# Generated from the Figma mapping. 7 of 10 blocks are
# confirmed decisions; the rest are proposals to review on the page.
_schema: default
title: Low Maintenance
description: No database. No 2 a.m. panic.
pageSections:
  - _component: page-sections/heroes/hero-split
    heading: No database. No 2 a.m. panic.
    subtext: >-
      Skip the forced updates, security patches, and midnight outages. Your site keeps running while
      your team spends time building what's next.
    subtextSize: xl
    imageSource: /src/assets/images/marketing/hero-lowmaintenance-01-1.png
    headingSize: xl
    imageOverflow: 107
    background:
      type: pattern
      imageSource: /src/assets/images/marketing/patterns/sand-dotted.png
      patternSize: natural
      mask: none
    haze:
      - x: 0.228
        rx: 366px
        'y': 50.9%
        ry: 52.3%
    buttonSections:
      - _component: building-blocks/core-elements/button
        variant: primary
        text: Start your free trial
      - _component: building-blocks/core-elements/button
        variant: text
        iconName: arrow-right
        iconPosition: after
        text: Book a demo
    note:
      - text: No credit card · 14-day free trial · No lock-in
        iconName: check
        iconColor: default
  - _component: page-sections/proof/logo-cloud
    backgroundColor: surface
    logos:
      - image: /src/assets/images/marketing/logos/twitch.svg
        alt: Twitch
        width: 75
        height: 17
        monochrome: true
        aspect: 126 / 28
      - image: /src/assets/images/marketing/logos/hnry.svg
        alt: Hnry
        width: 87
        height: 31
        monochrome: true
        aspect: 78 / 28
      - image: /src/assets/images/marketing/logos/Ocupop.png
        alt: Ocupop
        width: 137
        height: 37
      - image: /src/assets/images/marketing/logos/DX.svg
        alt: DX Developer Experience Insights Platform
        width: 52
        height: 30
        monochrome: true
        aspect: 49 / 28
      - image: /src/assets/images/marketing/logos/Papercut.svg
        alt: Papercut
        width: 100
        height: 31
        monochrome: true
        aspect: 90 / 28
    headingPlacement: inline
    heading: BUILT BY DEVS. RUN BY EDITORS.
  - _component: page-sections/conversion/cta-center
    heading: Give editors a CMS, keep a static site
    subtext: >-
      At CloudCannon the editing interface sits as a layer on top of your site. Your team gets
      somewhere to work, your site stays as a set of static files, and neither one needs looking
      after.
    subtextSize: lg
    headingSize: lg
    buttonSections:
      - _component: building-blocks/core-elements/button
        variant: primary
        text: Why should you cheese?
  - _component: page-sections/proof/testimonial-section
    text: >-
      I almost forgot that website maintenance was a thing. That’s something you just don’t need to
      do when you have this static tech stack.
    authorName: Sindre Gusdal
    authorDescription: General Manager · Absoluttweb
    layout: split
    markPosition: start
    markStyle: card
    company: Absoluttweb
    authorImage: /src/assets/images/marketing/ellipse-287.jpg
  - _component: page-sections/explainers/feature-split
    heading: We don’t think a website should need this much looking after
    subtext: 'With a static site and Git you won’t need to worry about:'
    subtextSize: xl
    headingSize: lg
    background:
      type: pattern
      imageSource: /src/assets/images/marketing/patterns/sand-grid.png
      patternSize: natural
      mask: none
    haze:
      - x: 0.2342
        rx: 453px
        'y': 45.2%
        ry: 45.6%
  - _component: page-sections/conversion/cta-center
    heading: Maintenance that doesn’t multiply
    subtext: >-
      Whether it's three client sites or three hundred, another site is another repo. The
      maintenance doesn't come with it.
    backgroundColor: base
    colorScheme: dark
    lockColorScheme: true
    subtextSize: lg
    headingSize: lg
    background:
      type: pattern
      imageSource: /src/assets/images/marketing/patterns/dark-grid.png
      patternSize: natural
      mask: fade
  - _component: page-sections/explainers/scroll-steps
    reverse: false
    mediaWidth: wide
    progressStyle: bar
    steps:
      - _component: building-blocks/wrappers/scroll-stepper/scroll-stepper-step
        contentSections:
          - _component: building-blocks/core-elements/heading
            text: A much smaller target
            level: h2
            size: sm
          - _component: building-blocks/core-elements/text
            text: >-
              Most CMS vulnerabilities live in databases, plugins and server-side code. A static
              site puts none of those in front of visitors, so there’s very little left to attack.
              Your content sits in your own repo, and the platform itself is SOC 2 Type 2 compliant.
        mediaSections: []
    subtext: 
    backgroundColor: base
    colorScheme: dark
    lockColorScheme: true
  - _component: page-sections/proof/testimonial-section
    company: Absoluttweb
    text: Absoluttweb went from days per new client site to around an hour.
    layout: split
    markPosition: end
    markStyle: card
    quoted: false
    quoteSize: md
    linkText: Read case study
    backgroundColor: base
    colorScheme: dark
    lockColorScheme: true
    background:
      type: pattern
      imageSource: /src/assets/images/marketing/patterns/dark-grid.png
      patternSize: natural
      mask: fade
    haze:
      - x: 0.4791
        rx: 933px
        'y': 54.5%
        ry: 74.4%
  - _component: page-sections/conversion/cta-team-member
    member:
      _component: building-blocks/wrappers/team-member
      name: Tom Richardson
      role: Solutions Architect
      imageSource: /src/assets/images/marketing/container-9-3806-70538.png
      imageAlt: Tom Richardson, Solutions Architect at CloudCannon
      backgroundColor: golden
      backgroundImage: >-
        /src/assets/images/marketing/screenshot-2026-06-09-at-7-38-38-pm-background-r-2-3806-70537.png
      propSource: /src/assets/images/marketing/hero-lowmaintenance-01-1-2-3806-70539.png
      propAlt: ''
    heading: A CMS to build, not babysit
    subtext: >-
      Git underneath, a visual editor on top, with code and content running on one engine. Start
      free in minutes, or book a demo and we’ll walk you through the real thing.
    subtextSize: lg
    headingSize: lg
    buttonSections:
      - _component: building-blocks/core-elements/button
        variant: primary
        text: Start your free trial
      - _component: building-blocks/core-elements/button
        variant: text
        iconName: arrow-right
        iconPosition: after
        text: Book a demo
  - _component: page-sections/conversion/cta-banner
    backgroundColor: brand
    colorScheme: dark
    lockColorScheme: true
    heading: Wanna learn more about our product?
    linkText: Explore visual editing
    imageSource: /src/assets/images/marketing/ferns-rocks-2-3806-70523.png
    headingSize: lg
---
