---
# Generated from the Figma mapping. 1 of 9 blocks are
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
    subtextSize: xl
    imageSource: /src/assets/images/marketing/image-3806-69902.png
    imageAlt: A person reaching up to edit content blocks, with their dog
    headingSize: 2xl
    imageOverflow: 29
    background:
      type: pattern
      pattern: grid
      mask: none
    haze:
      - x: 0.1492
        rx: 682px
        'y': 45.6%
        ry: 63.4%
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
    heading: Your content team edits. You stop getting pinged.
    subtext: >-
      CloudCannon keeps your website’s code, content and config in Git and gives content teams a
      visual interface to edit it.
    subtextSize: lg
    imageSource: /src/assets/images/marketing/food-bank-volunteers-produce-1-3806-69798.png
    backgroundColor: base
    subtextWidth: 580
    headingSize: lg
    buttonSections:
      - _component: building-blocks/core-elements/button
        variant: primary
        text: Learn about our visual editor
  - _component: page-sections/explainers/workflow-split
    centreColor: '#26262F'
    centreMinHeight: 366
    centreIconName: git-branch
    centreTitle: Your Git repo
    centreBranch: main
    centreRows:
      - kind: editor
        author: editor
        message: 'content: hero copy'
        hash: a3f9c2
      - kind: dev
        author: dev
        message: 'feat: pricing component'
        hash: 7b1e44
      - kind: editor
        author: editor
        message: 'content: new blog post'
        hash: c0d8f1
      - kind: dev
        author: dev
        message: 'refactor: nav links'
        hash: 2f90ab
      - kind: editor
        author: editor
        message: 'content: new team member'
        hash: c0d8f1
      - kind: dev
        author: dev
        message: 'feat: new page'
        hash: 7b1e44
      - kind: editor
        author: editor
        message: 'content: new blog post'
        hash: c0d8f1
      - kind: dev
        author: dev
        message: 'feat: chatbot install'
        hash: 7b1e44
    heading: Two workflows. One source of truth.
    subtext: >-
      Editors edit visually, developers stay in code — and every change lands in the same Git
      repository.
    subtextSize: lg
    subtextWidth: 580
    headingSize: lg
    panels:
      - accentColor: pacific
        imageSource: /src/assets/images/marketing/kiwi-1.png
        imageAlt: ''
        imageOverlap: 23
        eyebrow: EDITORS
        heading: Work visually
        items:
          - text: Make changes visually on the page
            iconName: check
            iconColor: default
          - text: Build new pages from existing components
            iconName: check
            iconColor: default
          - text: Draft, review and share for approval before publishing
            iconName: check
            iconColor: default
        linkText: Learn more
      - accentColor: sunset
        imageSource: /src/assets/images/marketing/kiwi-2.png
        imageAlt: ''
        imageOverlap: 10
        eyebrow: DEVELOPERS
        heading: Stay in code
        items:
          - text: Build with any static site generator
            iconName: check
            iconColor: default
          - text: Build components and easily set what’s editable
            iconName: check
            iconColor: default
          - text: Commit and deploy straight from Git
            iconName: check
            iconColor: default
        linkText: Learn more
    background:
      type: pattern
      pattern: dots
      mask: fade
    haze:
      - x: 0.5086
        rx: 844px
        'y': 19%
        ry: 31.5%
    buttonSections:
      - _component: building-blocks/core-elements/button
        variant: text
        iconName: arrow-right
        iconPosition: after
        text: Learn about Git-based CMS
  - _component: page-sections/explainers/feature-deck
    background:
      type: pattern
      pattern: grid
      mask: fade
      fixed: true
    subtextSize: lg
    backgroundColor: base
    subtextWidth: 480
    headingSize: lg
    cards:
      - _component: building-blocks/wrappers/scroll-deck/scroll-deck-card
        label: The stack AI already knows
        contentSections:
          - _component: building-blocks/core-elements/simple-text
            class: eyebrow
            text: AI-READY
            alignmentHorizontal: center
          - _component: building-blocks/core-elements/heading
            text: The stack AI already knows
            level: h3
            size: lg
            alignmentHorizontal: center
          - _component: building-blocks/core-elements/text
            text: Code, content, and config live together in Git. The whole project, in plain files.
            alignmentHorizontal: center
          - _component: building-blocks/wrappers/grid
            columns: '3'
            gap: lg
            items:
              - contentSections:
                  - _component: building-blocks/core-elements/image
                    source: /src/assets/images/marketing/context-1.png
                    width: 175
                    height: 145
                    alt: ''
                  - _component: building-blocks/core-elements/heading
                    text: Complete context
                    level: h4
                    size: xs
                    alignmentHorizontal: center
                  - _component: building-blocks/core-elements/text
                    text: Agents see your content, not just your code
                    size: sm
                    alignmentHorizontal: center
              - contentSections:
                  - _component: building-blocks/core-elements/image
                    source: /src/assets/images/marketing/ai-2-1.png
                    width: 213
                    height: 141
                    alt: ''
                  - _component: building-blocks/core-elements/heading
                    text: Familiar workflow
                    level: h4
                    size: xs
                    alignmentHorizontal: center
                  - _component: building-blocks/core-elements/text
                    text: Agents work on the repo like any other contributor
                    size: sm
                    alignmentHorizontal: center
              - contentSections:
                  - _component: building-blocks/core-elements/image
                    source: /src/assets/images/marketing/api-1.png
                    width: 177
                    height: 160
                    alt: ''
                  - _component: building-blocks/core-elements/heading
                    text: No learning curve
                    level: h4
                    size: xs
                    alignmentHorizontal: center
                  - _component: building-blocks/core-elements/text
                    text: No proprietary API for an agent to learn first
                    size: sm
                    alignmentHorizontal: center
          - _component: building-blocks/wrappers/button-group
            alignmentHorizontal: center
            buttonSections:
              - _component: building-blocks/core-elements/button
                variant: primary
                text: Why Git makes AI better
      - _component: building-blocks/wrappers/scroll-deck/scroll-deck-card
        label: No forced upgrades or surprise migrations
        contentSections:
          - _component: building-blocks/core-elements/simple-text
            class: eyebrow
            text: LOW MAINTENANCE
            alignmentHorizontal: center
          - _component: building-blocks/core-elements/heading
            text: Your sites just run
            level: h3
            size: lg
            alignmentHorizontal: center
          - _component: building-blocks/core-elements/text
            text: Forget update queues, plugin conflicts, and things breaking while you sleep.
            alignmentHorizontal: center
          - _component: building-blocks/wrappers/grid
            columns: '3'
            gap: lg
            items:
              - contentSections:
                  - _component: building-blocks/core-elements/image
                    source: /src/assets/images/marketing/low-maintenence-I3806-70250-3743-54479.png
                    width: 121
                    height: 128
                    alt: ''
                  - _component: building-blocks/core-elements/heading
                    text: Upgrade when ready
                    level: h4
                    size: xs
                    alignmentHorizontal: center
                  - _component: building-blocks/core-elements/text
                    text: No forced upgrades or surprise migrations
                    size: sm
                    alignmentHorizontal: center
              - contentSections:
                  - _component: building-blocks/core-elements/image
                    source: /src/assets/images/marketing/smaller-surface-1.png
                    width: 157
                    height: 144
                    alt: ''
                  - _component: building-blocks/core-elements/heading
                    text: Smaller surface
                    level: h4
                    size: xs
                    alignmentHorizontal: center
                  - _component: building-blocks/core-elements/text
                    text: No admin panel sitting on your live site
                    size: sm
                    alignmentHorizontal: center
              - contentSections:
                  - _component: building-blocks/core-elements/image
                    source: /src/assets/images/marketing/hosting.png
                    width: 148
                    height: 116
                    alt: ''
                  - _component: building-blocks/core-elements/heading
                    text: Off your plate
                    level: h4
                    size: xs
                    alignmentHorizontal: center
                  - _component: building-blocks/core-elements/text
                    text: No server or database to look after
                    size: sm
                    alignmentHorizontal: center
          - _component: building-blocks/wrappers/button-group
            alignmentHorizontal: center
            buttonSections:
              - _component: building-blocks/core-elements/button
                variant: primary
                text: Why 3am stays quiet
      - _component: building-blocks/wrappers/scroll-deck/scroll-deck-card
        label: Scale changes nothing
        contentSections:
          - _component: building-blocks/core-elements/simple-text
            class: eyebrow
            text: HIGH PERFORMANCE
            alignmentHorizontal: center
          - _component: building-blocks/core-elements/heading
            text: Fast everywhere
            level: h3
            size: lg
            alignmentHorizontal: center
          - _component: building-blocks/core-elements/text
            text: Pages are pre-built and served from a CDN, so sites load fast anywhere in the world.
            alignmentHorizontal: center
          - _component: building-blocks/wrappers/grid
            columns: '3'
            gap: lg
            items:
              - contentSections:
                  - _component: building-blocks/core-elements/image
                    source: /src/assets/images/marketing/speedometer-1.png
                    width: 164
                    height: 117
                    alt: ''
                  - _component: building-blocks/core-elements/heading
                    text: Scale changes nothing
                    level: h4
                    size: xs
                    alignmentHorizontal: center
                  - _component: building-blocks/core-elements/text
                    text: Same speed at ten visitors or ten million
                    size: sm
                    alignmentHorizontal: center
              - contentSections:
                  - _component: building-blocks/core-elements/image
                    source: /src/assets/images/marketing/globe-1-I3806-70251-3743-54504.png
                    width: 131
                    height: 109
                    alt: ''
                  - _component: building-blocks/core-elements/heading
                    text: Any distance
                    level: h4
                    size: xs
                    alignmentHorizontal: center
                  - _component: building-blocks/core-elements/text
                    text: Just as fast on the other side of the world
                    size: sm
                    alignmentHorizontal: center
              - contentSections:
                  - _component: building-blocks/core-elements/image
                    source: /src/assets/images/marketing/ranking-1.png
                    width: 150
                    height: 151
                    alt: ''
                  - _component: building-blocks/core-elements/heading
                    text: Ranks higher
                    level: h4
                    size: xs
                    alignmentHorizontal: center
                  - _component: building-blocks/core-elements/text
                    text: Fast pages rank better, so you start ahead
                    size: sm
                    alignmentHorizontal: center
          - _component: building-blocks/wrappers/button-group
            alignmentHorizontal: center
            buttonSections:
              - _component: building-blocks/core-elements/button
                variant: primary
                text: How sites stay fast
    colorScheme: dark
    lockColorScheme: true
    cardColorScheme: light
  - _component: page-sections/proof/testimonial-section
    text: I almost forgot that website maintenance was a thing.
    authorName: Sindre Gusdal
    authorDescription: General Manager · Absoluttweb
    layout: split
    markPosition: start
    markStyle: plain
    company: Absoluttweb
    authorImage: /src/assets/images/marketing/ellipse-287.jpg
    backgroundColor: base
    colorScheme: dark
    lockColorScheme: true
  - _component: page-sections/proof/story-carousel
    heading: Grow your sites, not your headcount.
    subtext: From fast-moving startups to multi-site agencies, teams ship more with CloudCannon.
    subtextSize: lg
    backgroundColor: base
    colorScheme: dark
    lockColorScheme: true
    subtextWidth: 560
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
    background:
      type: pattern
      pattern: grid
      mask: top
    buttonSections:
      - _component: building-blocks/core-elements/button
        variant: primary
        text: See how others did it
  - _component: page-sections/proof/team-grid
    paddingVertical: none
    members:
      - _component: building-blocks/wrappers/team-member
        name: George Phillips
        role: Co-founder & CTO
        imageSource: /src/assets/images/marketing/george-profile-1.png
        imageAlt: George Phillips, Co-founder & CTO at CloudCannon
        backgroundColor: '#748831'
      - _component: building-blocks/wrappers/team-member
        name: Mike Neumegen
        role: Co-founder & CEO
        imageSource: >-
          /src/assets/images/marketing/screenshot-2026-06-09-at-7-38-38-pm-background-r-3806-69478.png
        imageAlt: Mike Neumegen, Co-founder & CEO at CloudCannon
        backgroundColor: '#FF8853'
      - _component: building-blocks/wrappers/team-member
        name: Olivia Nicholson
        role: Head of Content
        imageSource: /src/assets/images/marketing/container-5-3806-69485-2.png
        imageAlt: Olivia Nicholson, Head of Content at CloudCannon
        backgroundColor: pacific
      - _component: building-blocks/wrappers/team-member
        name: Sam Whitfield
        role: Product Design
        imageSource: /src/assets/images/marketing/container-7-3806-69515-2.png
        imageAlt: Sam Whitfield, Product Design at CloudCannon
        backgroundColor: '#D06524'
      - _component: building-blocks/wrappers/team-member
        name: Tom Richardson
        role: Solutions Architect
        imageSource: /src/assets/images/marketing/container-9-3806-69524-1.png
        imageAlt: Tom Richardson, Solutions Architect at CloudCannon
        backgroundColor: '#FABD3D'
      - _component: building-blocks/wrappers/team-member
        name: Chris Wingate
        role: CRO
        imageSource: /src/assets/images/marketing/chris-profile-1.png
        imageAlt: Chris Wingate, CRO at CloudCannon
        backgroundColor: '#748831'
    eyebrow: Who we are
    heading: Made for the work, not for the upsell
    linkText: Meet the team
    subtext: >-
      We’re a tight-knit team based in Dunedin, New Zealand, working with web teams all over the
      world. We started CloudCannon because every CMS we tried gave editors a better experience by
      giving developers a worse one. So we built a CMS that works for both.
    subtextSize: lg
    backgroundColor: surface
    subtextWidth: 460
    headingSize: lg
  - _component: page-sections/conversion/cta-split
    imageReveal: /src/assets/images/marketing/cloudcannon-truck-open-1.png
    imageRevealLabel: Open and close the truck's hood
    heading: Take a peek under the hood
    subtext: >-
      Git underneath, a visual editor on top, with code and content running on one engine. Start
      free in minutes, or book a demo and we’ll walk you through the real thing.
    subtextSize: lg
    imageSource: /src/assets/images/marketing/cloudcannon-truck-closed-1.png
    backgroundColor: brand
    headingSize: lg
    imageOverflow: 333
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
