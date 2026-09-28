---
# Generated from the Figma mapping. 6 of 11 blocks are
# confirmed decisions; the rest are proposals to review on the page.
_schema: default
title: Git
description: Everything lives in the repo, not a database.
pageSections:
  - _component: page-sections/heroes/hero-split
    heading: Everything lives in the repo, not a database.
    subtext: >-
      CloudCannon reads and writes directly to your Git repo, so every change is tracked, every
      version is recoverable, access it with any tool.
    subtextSize: xl
    imageSource: /src/assets/images/marketing/hero-gitbasedcms-01-1.png
    headingSize: xl
    imageOverflow: 119
    background:
      type: pattern
      imageSource: /src/assets/images/marketing/patterns/sand-grid.png
      patternSize: natural
      mask: none
    haze:
      - x: 0.2243
        rx: 735px
        'y': 50.9%
        ry: 65.1%
    buttonSections:
      - _component: building-blocks/core-elements/button
        variant: primary
        text: Start your free trial
      - _component: building-blocks/core-elements/button
        variant: text
        iconName: arrow-right
        iconPosition: after
        text: Book a demo
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
    heading: 20,000+ sites shipped
  - _component: page-sections/conversion/cta-center
    heading: What is a Git-based CMS?
    subtext: >-
      A Git-based CMS stores your content as files in a Git repository instead of in a database.
      Your team edits through a visual interface, and every change is committed to the repo like any
      other work. The site builds from those files using whatever static site generator you already
      use.
    subtextSize: lg
    subtextWidth: 808
    headingSize: lg
  - _component: page-sections/proof/testimonial-section
    text: >-
      Having that flexibility of having everything live in a Git repository is pretty amazing. **We
      don’t have to worry about a separate database**, or any other pieces in the mix, it’s dead
      simple.
    authorName: Justin Parsons
    authorDescription: Director of Front-End Development Insight Creative, Inc
    layout: split
    markPosition: start
    markStyle: plain
    linkText: Read case study
    accentColor: sunset
    backgroundColor: base
    colorScheme: dark
    lockColorScheme: true
    background:
      type: pattern
      imageSource: /src/assets/images/marketing/patterns/dark-grid.png
      patternSize: natural
      mask: fade
    haze:
      - x: 0.4975
        rx: 938px
        'y': 49.7%
        ry: 74.8%
  - _component: page-sections/conversion/cta-center
    heading: Here’s the whole setup
    eyebrow: HOW IT WORKS
    subtext: >-
      Whether it's three client sites or three hundred, another site is another repo. The
      maintenance doesn't come with it.
    backgroundColor: base
    colorScheme: dark
    lockColorScheme: true
    subtextSize: lg
    subtextWidth: 580
    headingSize: lg
  - _component: page-sections/explainers/timeline-section
    layout: rail
    entries:
      - title: Connect your Git repo.
        body: Every push builds your site.
        accentColor: moss
        iconName: code-bracket
      - title: Build your components
        body: Set what's editable, down to the field.
        accentColor: harbour
        iconName: folder
      - title: Hand it over.
        body: Content teams edit on the page, with a live preview they can share.
        accentColor: sunset
        iconName: view-columns
      - title: Everything is a commit
        body: Branch it, review it, roll it back.
        accentColor: golden
        iconName: arrow-path
    backgroundColor: base
    colorScheme: dark
    lockColorScheme: true
  - _component: page-sections/explainers/scroll-steps
    reverse: true
    mediaWidth: wide
    progressStyle: bar
    steps:
      - _component: building-blocks/wrappers/scroll-stepper/scroll-stepper-step
        contentSections:
          - _component: building-blocks/core-elements/simple-text
            text: GIT FOR DEVELOPERS
            size: sm
            class: eyebrow
          - _component: building-blocks/core-elements/heading
            text: You already trust Git with your code
            level: h2
            size: sm
          - _component: building-blocks/core-elements/text
            text: >-
              Your content gets the same treatment: branches, commits, reviews, and a history you
              can walk back through. You keep building locally, with the SSG and tooling you already
              use.
          - _component: building-blocks/core-elements/button
            variant: text
            iconName: arrow-right
            iconPosition: after
            text: Learn more
        mediaSections: []
    backgroundColor: base
    colorScheme: dark
    lockColorScheme: true
    background:
      type: pattern
      imageSource: /src/assets/images/marketing/patterns/dark-grid.png
      patternSize: natural
      mask: fade
  - _component: page-sections/proof/testimonial-section
    text: >-
      It’s important to me that CloudCannon is a Git-based CMS. I hate having a vendor lock with
      API-based CMSs — **how can I trust anyone else with our data?**
    authorName: Alexander Luttringer
    authorDescription: Technical Director · Croissant & Baguette
    layout: split
    markPosition: start
    markStyle: card
    company: Croissant & Baguette
    accentColor: pacific
    authorImage: /src/assets/images/marketing/ellipse-288.jpg
    backgroundColor: surface
    background:
      type: pattern
      imageSource: /src/assets/images/marketing/patterns/sand-dotted.png
      patternSize: natural
      mask: none
  - _component: page-sections/conversion/cta-center
    heading: Your content is yours
    subtext: >-
      Markdown, YAML and JSON, in a repo you already own. You stay because it works, not because
      you're stuck.
    subtextSize: lg
    imageSource: /src/assets/images/marketing/ribbon-01-1.png
    subtextWidth: 579
    headingSize: lg
    buttonSections:
      - _component: building-blocks/core-elements/button
        variant: primary
        text: Get skills repo
  - _component: page-sections/explainers/feature-grid
    alignmentHorizontal: center
    features:
      - title: Git providers
        description: Connect to GitHub, GitLab, or Bitbucket
        imageSource: /src/assets/images/marketing/git-plug-1.png
        imageHeight: 169
        imageAlt: ''
      - title: Framework support
        description: Keep the static site generator and tooling you already use
        imageSource: /src/assets/images/marketing/cloudcannon-testing-speed-1.png
        imageHeight: 160
        imageAlt: ''
      - title: Branch previews
        description: Share a hosted preview from any branch before publishing
        imageSource: /src/assets/images/marketing/api-1.png
        imageHeight: 176
        imageAlt: ''
      - title: Two workflows
        description: Run local development while everyone else edits visual
        imageSource: /src/assets/images/marketing/context-1.png
        imageHeight: 175
        imageAlt: ''
      - title: Portfolio scale
        description: Run one site or a whole enterprise portfolio
        imageSource: /src/assets/images/marketing/low-maintenence-3806-74347.png
        imageHeight: 160
        imageAlt: ''
      - title: Enterprise controls
        description: Meet requirements with the user permissions SAML and SOC2
        imageSource: /src/assets/images/marketing/layer-29-1-3806-74351.png
        imageHeight: 195
        imageAlt: ''
    heading: Fits the way you already build
    subtext: Connect your repo, keep your tooling, and add a visual editor on top.
    subtextSize: lg
    subtextWidth: 580
    headingSize: lg
  - _component: page-sections/conversion/cta-split
    heading: Take a peek under the hood
    subtext: >-
      Git underneath, a visual editor on top, with code and content running on one engine. Start
      free in minutes, or book a demo and we’ll walk you through the real thing.
    subtextSize: lg
    imageSource: /src/assets/images/marketing/cloudcannon-truck-closed-1.png
    backgroundColor: brand
    headingSize: lg
    imageOverflow: 334
    buttonSections:
      - _component: building-blocks/core-elements/button
        variant: primary
        text: Start your free trial
      - _component: building-blocks/core-elements/button
        variant: text
        iconName: arrow-right
        iconPosition: after
        text: Book a demo
---
