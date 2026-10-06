---
# Generated from the Figma mapping. 3 of 10 blocks are
# confirmed decisions; the rest are proposals to review on the page.
_schema: default
title: Developers Page
description: A CMS that uses Git, just like you do
pageSections:
  - _component: page-sections/heroes/hero-split
    heading: A CMS that uses Git, just like you do
    headingSize: xl
    subtext: >-
      Connect CloudCannon to your repo and keep working locally. Editors manage content visually,
      and everyone's changes sync automatically.
    subtextSize: xl
    imageSource: /src/assets/images/marketing/hero-developers-page.png
    imageAlt: ''
    imageOverflow: 217
    buttonSections:
      - _component: building-blocks/core-elements/button
        text: Start your free trial
        variant: primary
      - _component: building-blocks/core-elements/button
        text: Book a demo
        iconName: move-right
        iconPosition: after
        variant: text
    pattern: grid
    haze: false
    backgroundColor: dark
  - _component: page-sections/proof/logo-cloud
    heading: STATIC SITE GENERATORS
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
    backgroundColor: sand
  - _component: page-sections/conversion/cta-center
    eyebrow: INTERACTIVE DEMO
    heading: Here’s how to set up visual editing in minutes
    headingSize: lg
    subtext: >-
      This demo walks you through the process of adding Editable Regions to your code, so your
      editors can visually change text, structured data, and images. Save your changes to proceed
      through the demo.
    subtextSize: lg
    subtextWidth: md
    backgroundColor: light-sand
    imageSource: /src/assets/images/marketing/screenshot-2026-08-11-at-17-25-56-1.png
    imageAlt: ''
  - _component: page-sections/explainers/pinned-steps
    eyebrow: ''
    heading: Your stack, plus an editing layer
    headingSize: lg
    subtext: ''
    alignmentHorizontal: start
    steps:
      - contentSections:
          - _component: building-blocks/core-elements/heading
            text: Build with your favorite tools
            level: h3
            size: sm
          - _component: building-blocks/core-elements/text
            text: >-
              Choose from the most popular static site generators: Astro, Hugo, Eleventy, Next.js,
              Jekyll, SvelteKit, and more.
            size: lg
        mediaSections: []
      - number: '2'
        contentSections:
          - _component: building-blocks/core-elements/heading
            text: Set up the editing environment
            level: h3
            size: sm
          - _component: building-blocks/core-elements/text
            text: >-
              Configure exactly what editors can touch, from a single line of text to whole sections
              of custom built blocks.
            size: lg
        mediaSections: []
      - number: '3'
        contentSections:
          - _component: building-blocks/core-elements/heading
            text: Stay in sync
            level: h3
            size: sm
          - _component: building-blocks/core-elements/text
            text: >-
              Everything developers push is pulled in by CloudCannon and built automatically.
              Everything editors change is committed back to the repo. They can branch and merge in
              the CMS, no command line needed.
            size: lg
        mediaSections: []
    reverse: true
    mediaWidth: wide
    backgroundColor: dark
    progressColor: sunset
    progressTrackColor: midnight
    numbered: true
  - _component: page-sections/proof/testimonial-bento
    eyebrow: SUCCESS STORIES
    heading: What clients are saying
    headingSize: md
    testimonials:
      - text: |-
          Within the first few weeks after CloudCannon migrated the
          site, we’d already **moved from the 4th page of Google to
          the first page.** And we hadn’t even added fresh content to
          it yet.
        authorName: Roy Gabriel
        authorDescription: Vice President Operations,
        company: Gabriel Maggio Construction
        linkText: Read case study
        accentColor: sunset
        size: wide
      - logo: /src/assets/images/marketing/logos/twitch.svg
        logoMonochrome: true
        logoAlt: Twitch
        text: >-
          CloudCannon is the ideal CMS for us — editors can update their content easily, and it’s
          saved back to our Git repo, so we never feel locked in.
        authorName: Cayvon Morady
        authorDescription: Senior Technical Program Manager,
        company: Twitch
        linkText: Read case study
        size: standard
      - company: Firebrand
        text: When we show the Visual Editor during our meetings, their eyes light up.
        authorName: Alex Murray
        authorDescription: Digital Design Director,
        linkText: Read case study
        size: standard
      - logo: /src/assets/images/marketing/logos/DX.svg
        logoMonochrome: true
        logoAlt: ''
        text: |-
          **400% increase in leads. $150,000 saved.** That is the
          equivalent of a full-time developer’s salary.
        authorName: Abi Noda
        authorDescription: CEO,
        company: DX
        linkText: Read case study
        accentColor: golden
        size: wide
    columns: 2
    stagger: true
    backgroundColor: dark
    background:
      type: pattern
      pattern: grid
      mask: fade
  - _component: page-sections/conversion/cta-center
    heading: The tool you’ve been looking for
    headingSize: lg
    alignmentHorizontal: start
    backgroundColor: light-sand
  - _component: page-sections/explainers/pinned-steps
    eyebrow: ''
    heading: ''
    subtext: ''
    copyColor: light-sand
    steps:
      - contentSections:
          - _component: building-blocks/core-elements/heading
            text: Bring your own AI tooling
            level: h2
            size: sm
          - _component: building-blocks/core-elements/text
            text: >-
              Projects are local-first and Git-based, so the tools already in use just work. Open
              the repo in any IDE and the agent has full project context: code, content, config, the
              lot.
            size: lg
          - _component: building-blocks/core-elements/button
            text: Learn more
            iconName: move-right
            textColor: sunset
            iconPosition: after
            variant: text
        mediaSections: []
      - contentSections:
          - _component: building-blocks/core-elements/heading
            text: No more quick copy requests
            level: h2
            size: sm
          - _component: building-blocks/core-elements/text
            text: >-
              Editors shouldn’t need a developer to update a headline or swap an image. They manage
              content themselves using the components already built, so there are no urgent requests
              from marketing and no developer hours lost to copy tweaks.
            size: lg
          - _component: building-blocks/core-elements/button
            text: Learn more
            iconName: move-right
            textColor: sunset
            iconPosition: after
            variant: text
        mediaSections: []
      - contentSections:
          - _component: building-blocks/core-elements/heading
            text: Craft the ideal editing interface
            level: h2
            size: sm
          - _component: building-blocks/core-elements/text
            text: >-
              Complete control over how the team manages content. Customize inputs with a full range
              of field types, and fine-tune roles and permissions for a secure, autonomous editing
              experience.
            size: lg
          - _component: building-blocks/core-elements/button
            text: Learn more
            iconName: move-right
            textColor: sunset
            iconPosition: after
            variant: text
        mediaSections: []
    reverse: true
    mediaWidth: wide
    progressColor: pacific
    progressTrackColor: pacific-100
    background:
      type: pattern
      pattern: grid
      mask: none
  - _component: page-sections/conversion/cta-center
    heading: Own your content, always
    headingSize: lg
    subtext: >-
      Content lives in the repository along with the complete history of every change. If you ever
      leave CloudCannon, you leave with everything: your content, your code, your commits.
    subtextSize: lg
    subtextWidth: xl
    buttonSections:
      - _component: building-blocks/core-elements/button
        text: Get skills repo
        variant: primary
    backgroundColor: light-sand
    imageWidth: full
    imageScratch: kiwi
    imageSource: /src/assets/images/marketing/own-content-combined.png
    imageAlt: A commit history beside a card listing content, code and commits
  - _component: page-sections/explainers/feature-split
    heading: Open-source ecosystem
    headingSize: lg
    subtext: >-
      We won’t upsell tools that don’t need to exist, and we’ll often point to open source instead.
      These are ours, and they work on any static site.
    subtextSize: xl
    buttonSections:
      - _component: building-blocks/core-elements/button
        text: Explore open-source tools
        variant: primary
    backgroundColor: sand
    background:
      type: pattern
      pattern: grid
      mask: none
    haze:
      - x: 0.1923
        rx: 399px
        'y': 49.4%
        ry: 49.9%
  - _component: page-sections/conversion/cta-team-member
    heading: We’re here to help
    headingSize: lg
    subtext: >-
      We're a small team with a lot of knowledge, so you'll talk to someone who knows what they're
      talking about and can give you hands-on help whatever the problem.
    subtextSize: lg
    member:
      _component: building-blocks/wrappers/team-member
      name: Olivia Nicholson
      role: Head of Content
      imageSource: /src/assets/images/marketing/container-5-3806-72981-2.png
      imageAlt: Olivia Nicholson, Head of Content at CloudCannon
      backgroundColor: pacific
      propSource: /src/assets/images/embellishments/telephone.png
      propWidth: 47
      propAlt: ''
    buttonSections:
      - _component: building-blocks/core-elements/button
        text: Start your free trial
        variant: primary
      - _component: building-blocks/core-elements/button
        text: Book a demo
        iconName: move-right
        iconPosition: after
        variant: text
    backgroundColor: light-sand
---
