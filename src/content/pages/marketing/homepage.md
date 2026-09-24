---
# Generated from the Figma mapping. 0 of 9 blocks are
# confirmed decisions; the rest are proposals to review on the page.
_schema: default
title: Homepage
description: Build freely. Edit easily.
pageSections:
  - _component: page-sections/heroes/hero-split
    heading: Build freely. Edit easily.
    subtext: >-
      Welcome to the Git-based CMS that doesn't fight your workflow. Your site lives in Git, your
      team edits visually, and everything stays in sync.
    imageSource: /src/assets/images/marketing/image.png
    imageAlt: A person reaching up to edit content blocks, with their dog
    headingSize: 2xl
    imageOverflow: 29
    background:
      type: pattern
      imageSource: /src/assets/images/marketing/patterns/sand-grid.png
      patternSize: natural
      mask: none
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
  - _component: building-blocks/wrappers/content-selector
    items:
      - text: >-
          CloudCannon keeps your website’s code, content and config in Git and gives content teams a
          visual interface to edit it.
        iconName: check
        iconColor: default
      - text: Learn more
        iconName: check
        iconColor: default
      - text: →
        iconName: check
        iconColor: default
      - text: B
        iconName: check
        iconColor: default
      - text: I
        iconName: check
        iconColor: default
      - text: U
        iconName: check
        iconColor: default
      - text: >-
          Update content in a clear focused editor. Format text, add links and images, then publish
          straight to Git
        iconName: check
        iconColor: default
      - text: 
        iconName: check
        iconColor: default
      - text: 
        iconName: check
        iconColor: default
      - text: 
        iconName: check
        iconColor: default
  - _component: page-sections/explainers/feature-split
    eyebrow: EDITORS
    heading: Two workflows. One source of truth.
    subtext: >-
      Editors edit visually, developers stay in code — and every change lands in the same Git
      repository.
    imageSource: /src/assets/images/marketing/kiwi-1.png
    headingSize: lg
    buttonSections:
      - _component: building-blocks/core-elements/button
        variant: text
        iconName: arrow-right
        iconPosition: after
        text: Learn more
      - _component: building-blocks/core-elements/button
        variant: text
        iconName: arrow-right
        iconPosition: after
  - _component: page-sections/explainers/feature-deck
    backgroundColor: surface
    headingSize: lg
    cards:
      - _component: building-blocks/wrappers/scroll-deck/scroll-deck-card
        label: The stack AI already knows
        contentSections:
          - _component: building-blocks/core-elements/simple-text
            text: AI-READY
          - _component: building-blocks/core-elements/heading
            text: The stack AI already knows
            level: h3
            size: lg
          - _component: building-blocks/core-elements/text
            text: Code, content, and config live together in Git. The whole project, in plain files.
          - _component: building-blocks/core-elements/heading
            text: Complete Context
            level: h4
            size: xs
          - _component: building-blocks/core-elements/text
            text: Agents see your content, not just your code
          - _component: building-blocks/core-elements/text
            text: Agents work on the repo like any other contributor
          - _component: building-blocks/core-elements/heading
            text: Familiar workflow
            level: h4
            size: xs
          - _component: building-blocks/core-elements/heading
            text: No learning curve
            level: h4
            size: xs
          - _component: building-blocks/core-elements/text
            text: No proprietary API for an agent to learn first
          - _component: building-blocks/wrappers/button-group
            buttonSections:
              - _component: building-blocks/core-elements/button
                variant: primary
                text: Why Git makes AI better
      - _component: building-blocks/wrappers/scroll-deck/scroll-deck-card
        label: No forced upgrades or surprise migrations
        contentSections:
          - _component: building-blocks/core-elements/simple-text
            text: LOW MAINTENANCE
          - _component: building-blocks/core-elements/heading
            text: Your sites just run
            level: h3
            size: lg
          - _component: building-blocks/core-elements/text
            text: Upgrade when ready
          - _component: building-blocks/core-elements/text
            text: Forget update queues, plugin conflicts, and things breaking while you sleep.
          - _component: building-blocks/core-elements/text
            text: No forced upgrades or surprise migrations
          - _component: building-blocks/core-elements/heading
            text: Smaller surface
            level: h4
            size: xs
          - _component: building-blocks/core-elements/text
            text: No admin panel sitting on your live site
          - _component: building-blocks/core-elements/heading
            text: Off your plate
            level: h4
            size: xs
          - _component: building-blocks/core-elements/text
            text: No server or database to look after
          - _component: building-blocks/wrappers/button-group
            buttonSections:
              - _component: building-blocks/core-elements/button
                variant: primary
                text: Why 3am stays quiet
      - _component: building-blocks/wrappers/scroll-deck/scroll-deck-card
        label: Scale changes nothing
        contentSections:
          - _component: building-blocks/core-elements/simple-text
            text: HIGH PERFORMANCE
          - _component: building-blocks/core-elements/heading
            text: Fast everywhere
            level: h3
            size: lg
          - _component: building-blocks/core-elements/text
            text: Pages are pre-built and served from a CDN, so sites load fast anywhere in the world.
          - _component: building-blocks/core-elements/heading
            text: Scale changes nothing
            level: h4
            size: xs
          - _component: building-blocks/core-elements/text
            text: Same speed at ten visitors or ten million
          - _component: building-blocks/core-elements/heading
            text: Any distance
            level: h4
            size: xs
          - _component: building-blocks/core-elements/text
            text: Just as fast on the other side of the world
          - _component: building-blocks/core-elements/heading
            text: Ranks higher
            level: h4
            size: xs
          - _component: building-blocks/core-elements/text
            text: Fast pages rank better, so you start ahead
          - _component: building-blocks/wrappers/button-group
            buttonSections:
              - _component: building-blocks/core-elements/button
                variant: primary
                text: How sites stay fast
  - _component: page-sections/proof/testimonial-section
    backgroundColor: base
    colorScheme: dark
    lockColorScheme: true
  - _component: page-sections/proof/story-carousel
    heading: Grow your sites, not your headcount.
    subtext: From fast-moving startups to multi-site agencies, teams ship more with CloudCannon.
    backgroundColor: base
    colorScheme: dark
    lockColorScheme: true
    headingSize: lg
    stories:
      - accentColor: golden
        logoSource: /src/assets/images/marketing/logos/hnry.svg
        logoAlt: Hnry
        logoMonochrome: true
        logoAspect: 78 / 28
        figure: 8x
        label: faster content builds
        linkText: Read story
      - accentColor: harbour
        logoSource: /src/assets/images/marketing/logos/twitch.svg
        logoAlt: Twitch
        logoMonochrome: true
        logoAspect: 126 / 28
        figure: 15+
        label: marketing sites on CloudCannon
        linkText: Read story
      - accentColor: peachy
        logoSource: /src/assets/images/marketing/logos/DX.svg
        logoAlt: DX Developer Experience Insights Platform
        logoMonochrome: true
        logoAspect: 49 / 28
        figure: 400%
        label: increase in leads generated
        linkText: Read story
      - accentColor: moss-350
        logoSource: /src/assets/images/marketing/logos/Papercut.svg
        logoAlt: PaperCut
        logoMonochrome: true
        logoAspect: 90 / 28
        figure: 100x
        label: publishing velocity
        linkText: Read story
      - accentColor: golden
        figure: '90'
        label: average Lighthouse score
        linkText: Read story
    buttonSections:
      - _component: building-blocks/core-elements/button
        variant: primary
        text: See how others did it
  - _component: page-sections/explainers/feature-split
    eyebrow: Who we are
    heading: Made for the work, not for the upsell
    subtext: >-
      We’re a tight-knit team based in Dunedin, New Zealand, working with web teams all over the
      world. We started CloudCannon because every CMS we tried gave editors a better experience by
      giving developers a worse one. So we built a CMS that works for both.
    imageSource: /src/assets/images/marketing/container.png
    backgroundColor: surface
    headingSize: lg
    buttonSections:
      - _component: building-blocks/core-elements/button
        variant: text
        iconName: arrow-right
        iconPosition: after
        text: Meet the team
  - _component: page-sections/conversion/cta-split
    heading: Take a peek under the hood
    subtext: >-
      Git underneath, a visual editor on top, with code and content running on one engine. Start
      free in minutes, or book a demo and we’ll walk you through the real thing.
    imageSource: /src/assets/images/marketing/cloudcannon-truck-closed-1.png
    backgroundColor: brand
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
---
