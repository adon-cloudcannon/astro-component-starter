---
_schema: default
title: Homepage
description: Build freely. Edit easily.
keywords: []
pageSections:
  - _component: page-sections/heroes/hero-split
    content:
      sectionLabel: ''
      heading:
        heading: Build freely. Edit easily.
        headingLevel: h1
        headingSize: 2xl
      subtext: Welcome to the Git-based CMS that doesn't fight your workflow. Your
        site lives in Git, your team edits visually, and everything stays in
        sync.
      image:
        imageSource: /src/assets/images/marketing/hero-index.png
        imageAlt: A person reaching up to edit content blocks, with their dog
        imageAspectRatio: none
        imageOverflow: 29
        imageBleed: false
        imageRounded: true
      buttonSections:
        - _component: building-blocks/core-elements/button
          text: Start your free trial
          link: ''
          iconName: ''
          iconColor: default
          textColor: default
          iconPosition: before
          hideText: false
          variant: primary
          size: md
        - _component: building-blocks/core-elements/button
          text: Book a demo
          link: ''
          iconName: move-right
          iconColor: default
          textColor: default
          iconPosition: after
          hideText: false
          variant: text
          size: md
      note:
        - text: No credit card · 14-day free trial · No lock-in
          iconName: check
          iconColor: default
      subtextSize: xl
    style:
      pattern: grid
      haze: true
      backgroundColor: light-sand
      reverse: false
      maxContentWidth: xl
      paddingHorizontal: gutter
      paddingVertical: 4xl
  - _component: page-sections/proof/logo-cloud
    content:
      sectionLabel: ''
      heading: BUILT BY DEVS. RUN BY EDITORS.
      logos:
        - image: /src/assets/images/marketing/logos/twitch.svg
          alt: Twitch
          url: ''
          monochrome: true
          width: 75
          height: 17
        - image: /src/assets/images/marketing/logos/hnry.svg
          alt: Hnry
          url: ''
          monochrome: true
          width: 87
          height: 31
        - image: /src/assets/images/marketing/logos/Ocupop.png
          alt: Ocupop
          url: ''
          monochrome: true
          width: 137
          height: 37
        - image: /src/assets/images/marketing/logos/DX.svg
          alt: DX Developer Experience Insights Platform
          url: ''
          monochrome: true
          width: 52
          height: 30
        - image: /src/assets/images/marketing/logos/Papercut.svg
          alt: Papercut
          url: ''
          monochrome: true
          width: 100
          height: 31
    style:
      backgroundColor: sand
      headingPlacement: inline
      grayscale: true
      scrolling: false
      maxContentWidth: md
      paddingHorizontal: gutter
      paddingVertical: 2xl
  - _component: page-sections/conversion/cta-center
    content:
      sectionLabel: ''
      eyebrow: ''
      heading: Your content team edits. You stop getting pinged.
      headingLevel: h2
      subtext: CloudCannon keeps your website’s code, content and config in Git and
        gives content teams a visual interface to edit it.
      subtextSize: lg
      subtextWidth: md
      alignmentHorizontal: center
      buttonSections:
        - _component: building-blocks/core-elements/button
          text: Learn about our visual editor
          link: ''
          iconName: ''
          iconColor: default
          textColor: default
          iconPosition: before
          hideText: false
          variant: primary
          size: md
      imageSource: /src/assets/images/marketing/food-bank-volunteers-produce-1-3806-69798.png
      imageWidth: intrinsic
      imageScratch: ''
      imageAlt: ''
      headingSize: lg
    style:
      backgroundColor: light-sand
      background:
        type: image
        imageSource: ''
        imageAlt: ''
        positionVertical: top
        positionHorizontal: center
        fixed: false
        priority: false
        mask: none
        overlay: 0
      maxContentWidth: lg
      paddingHorizontal: gutter
      paddingVertical: 4xl
  - _component: page-sections/explainers/workflow-split
    content:
      sectionLabel: ''
      eyebrow: ''
      heading: Two workflows. One source of truth.
      headingLevel: h2
      headingSize: lg
      subtext: Editors edit visually, developers stay in code — and every change lands
        in the same Git repository.
      subtextSize: lg
      subtextWidth: md
      buttonSections:
        - _component: building-blocks/core-elements/button
          text: Learn about Git-based CMS
          link: ''
          iconName: move-right
          iconColor: default
          textColor: default
          iconPosition: after
          hideText: false
          variant: text
          size: md
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
      centreImageSource: ''
      centreImageAlt: ''
      centreColor: '#26262F'
      centreMinHeight: 366
      centreSections: []
      centreIconName: git-pull-request-arrow
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
    style:
      backgroundColor: light-sand
      background:
        type: pattern
        imageSource: ''
        pattern: pegboard
        mask: fade
      maxContentWidth: xl
      paddingHorizontal: gutter
      paddingVertical: 4xl
      haze:
        - x: 0.5086
          rx: 844px
          y: 19%
          ry: 31.5%
  - _component: page-sections/explainers/feature-deck
    content:
      sectionLabel: ''
      eyebrow: ''
      heading: ''
      headingLevel: h2
      headingSize: lg
      subtext: ''
      subtextSize: lg
      subtextWidth: sm
      cards:
        - _component: building-blocks/wrappers/scroll-deck/scroll-deck-card
          label: The stack AI already knows
          contentSections:
            - _component: building-blocks/core-elements/simple-text
              text: AI-READY
              alignmentHorizontal: center
              size: md
              class: eyebrow
            - _component: building-blocks/core-elements/heading
              text: The stack AI already knows
              level: h3
              size: lg
              alignmentHorizontal: center
              iconColor: default
              iconPosition: before
            - _component: building-blocks/core-elements/text
              text: Code, content, and config live together in Git. The whole project, in
                plain files.
              alignmentHorizontal: center
              size: lg
            - _component: building-blocks/wrappers/grid
              label: ''
              columns: '3'
              minItemWidth: 200
              items:
                - contentSections:
                    - _component: building-blocks/core-elements/image
                      source: /src/assets/images/marketing/context-1.png
                      alt: ''
                      decorative: false
                      rounded: false
                      aspectRatio: none
                      positionVertical: center
                      positionHorizontal: center
                      priority: false
                      width: 175
                      height: 145
                    - _component: building-blocks/core-elements/heading
                      text: Complete context
                      level: h4
                      size: xs
                      alignmentHorizontal: center
                      iconColor: default
                      iconPosition: before
                    - _component: building-blocks/core-elements/text
                      text: Agents see your content, not just your code
                      alignmentHorizontal: center
                      size: sm
                - contentSections:
                    - _component: building-blocks/core-elements/image
                      source: /src/assets/images/marketing/ai-2-1.png
                      alt: ''
                      decorative: false
                      rounded: false
                      aspectRatio: none
                      positionVertical: center
                      positionHorizontal: center
                      priority: false
                      width: 213
                      height: 141
                    - _component: building-blocks/core-elements/heading
                      text: Familiar workflow
                      level: h4
                      size: xs
                      alignmentHorizontal: center
                      iconColor: default
                      iconPosition: before
                    - _component: building-blocks/core-elements/text
                      text: Agents work on the repo like any other contributor
                      alignmentHorizontal: center
                      size: sm
                - contentSections:
                    - _component: building-blocks/core-elements/image
                      source: /src/assets/images/marketing/api-1.png
                      alt: ''
                      decorative: false
                      rounded: false
                      aspectRatio: none
                      positionVertical: center
                      positionHorizontal: center
                      priority: false
                      width: 177
                      height: 160
                    - _component: building-blocks/core-elements/heading
                      text: No learning curve
                      level: h4
                      size: xs
                      alignmentHorizontal: center
                      iconColor: default
                      iconPosition: before
                    - _component: building-blocks/core-elements/text
                      text: No proprietary API for an agent to learn first
                      alignmentHorizontal: center
                      size: sm
              gap: lg
            - _component: building-blocks/wrappers/button-group
              buttonSections:
                - _component: building-blocks/core-elements/button
                  text: Why Git makes AI better
                  link: ''
                  iconName: ''
                  iconColor: default
                  textColor: default
                  iconPosition: before
                  hideText: false
                  variant: primary
                  size: md
              direction: row
              alignmentHorizontal: center
        - _component: building-blocks/wrappers/scroll-deck/scroll-deck-card
          label: No forced upgrades or surprise migrations
          contentSections:
            - _component: building-blocks/core-elements/simple-text
              text: LOW MAINTENANCE
              alignmentHorizontal: center
              size: md
              class: eyebrow
            - _component: building-blocks/core-elements/heading
              text: Your sites just run
              level: h3
              size: lg
              alignmentHorizontal: center
              iconColor: default
              iconPosition: before
            - _component: building-blocks/core-elements/text
              text: Forget update queues, plugin conflicts, and things breaking while you
                sleep.
              alignmentHorizontal: center
              size: lg
            - _component: building-blocks/wrappers/grid
              label: ''
              columns: '3'
              minItemWidth: 200
              items:
                - contentSections:
                    - _component: building-blocks/core-elements/image
                      source: /src/assets/images/marketing/low-maintenence-I3806-70250-3743-54479.png
                      alt: ''
                      decorative: false
                      rounded: false
                      aspectRatio: none
                      positionVertical: center
                      positionHorizontal: center
                      priority: false
                      width: 121
                      height: 128
                    - _component: building-blocks/core-elements/heading
                      text: Upgrade when ready
                      level: h4
                      size: xs
                      alignmentHorizontal: center
                      iconColor: default
                      iconPosition: before
                    - _component: building-blocks/core-elements/text
                      text: No forced upgrades or surprise migrations
                      alignmentHorizontal: center
                      size: sm
                - contentSections:
                    - _component: building-blocks/core-elements/image
                      source: /src/assets/images/marketing/smaller-surface-1.png
                      alt: ''
                      decorative: false
                      rounded: false
                      aspectRatio: none
                      positionVertical: center
                      positionHorizontal: center
                      priority: false
                      width: 157
                      height: 144
                    - _component: building-blocks/core-elements/heading
                      text: Smaller surface
                      level: h4
                      size: xs
                      alignmentHorizontal: center
                      iconColor: default
                      iconPosition: before
                    - _component: building-blocks/core-elements/text
                      text: No admin panel sitting on your live site
                      alignmentHorizontal: center
                      size: sm
                - contentSections:
                    - _component: building-blocks/core-elements/image
                      source: /src/assets/images/marketing/hosting.png
                      alt: ''
                      decorative: false
                      rounded: false
                      aspectRatio: none
                      positionVertical: center
                      positionHorizontal: center
                      priority: false
                      width: 148
                      height: 116
                    - _component: building-blocks/core-elements/heading
                      text: Off your plate
                      level: h4
                      size: xs
                      alignmentHorizontal: center
                      iconColor: default
                      iconPosition: before
                    - _component: building-blocks/core-elements/text
                      text: No server or database to look after
                      alignmentHorizontal: center
                      size: sm
              gap: lg
            - _component: building-blocks/wrappers/button-group
              buttonSections:
                - _component: building-blocks/core-elements/button
                  text: Why 3am stays quiet
                  link: ''
                  iconName: ''
                  iconColor: default
                  textColor: default
                  iconPosition: before
                  hideText: false
                  variant: primary
                  size: md
              direction: row
              alignmentHorizontal: center
        - _component: building-blocks/wrappers/scroll-deck/scroll-deck-card
          label: Scale changes nothing
          contentSections:
            - _component: building-blocks/core-elements/simple-text
              text: HIGH PERFORMANCE
              alignmentHorizontal: center
              size: md
              class: eyebrow
            - _component: building-blocks/core-elements/heading
              text: Fast everywhere
              level: h3
              size: lg
              alignmentHorizontal: center
              iconColor: default
              iconPosition: before
            - _component: building-blocks/core-elements/text
              text: Pages are pre-built and served from a CDN, so sites load fast anywhere in
                the world.
              alignmentHorizontal: center
              size: lg
            - _component: building-blocks/wrappers/grid
              label: ''
              columns: '3'
              minItemWidth: 200
              items:
                - contentSections:
                    - _component: building-blocks/core-elements/image
                      source: /src/assets/images/marketing/speedometer-1.png
                      alt: ''
                      decorative: false
                      rounded: false
                      aspectRatio: none
                      positionVertical: center
                      positionHorizontal: center
                      priority: false
                      width: 164
                      height: 117
                    - _component: building-blocks/core-elements/heading
                      text: Scale changes nothing
                      level: h4
                      size: xs
                      alignmentHorizontal: center
                      iconColor: default
                      iconPosition: before
                    - _component: building-blocks/core-elements/text
                      text: Same speed at ten visitors or ten million
                      alignmentHorizontal: center
                      size: sm
                - contentSections:
                    - _component: building-blocks/core-elements/image
                      source: /src/assets/images/marketing/globe-1-I3806-70251-3743-54504.png
                      alt: ''
                      decorative: false
                      rounded: false
                      aspectRatio: none
                      positionVertical: center
                      positionHorizontal: center
                      priority: false
                      width: 131
                      height: 109
                    - _component: building-blocks/core-elements/heading
                      text: Any distance
                      level: h4
                      size: xs
                      alignmentHorizontal: center
                      iconColor: default
                      iconPosition: before
                    - _component: building-blocks/core-elements/text
                      text: Just as fast on the other side of the world
                      alignmentHorizontal: center
                      size: sm
                - contentSections:
                    - _component: building-blocks/core-elements/image
                      source: /src/assets/images/marketing/ranking-1.png
                      alt: ''
                      decorative: false
                      rounded: false
                      aspectRatio: none
                      positionVertical: center
                      positionHorizontal: center
                      priority: false
                      width: 150
                      height: 151
                    - _component: building-blocks/core-elements/heading
                      text: Ranks higher
                      level: h4
                      size: xs
                      alignmentHorizontal: center
                      iconColor: default
                      iconPosition: before
                    - _component: building-blocks/core-elements/text
                      text: Fast pages rank better, so you start ahead
                      alignmentHorizontal: center
                      size: sm
              gap: lg
            - _component: building-blocks/wrappers/button-group
              buttonSections:
                - _component: building-blocks/core-elements/button
                  text: How sites stay fast
                  link: ''
                  iconName: ''
                  iconColor: default
                  textColor: default
                  iconPosition: before
                  hideText: false
                  variant: primary
                  size: md
              direction: row
              alignmentHorizontal: center
      stickyOffset: md
      cardColorScheme: light
      showRail: true
    style:
      backgroundColor: dark
      background:
        type: pattern
        imageSource: ''
        pattern: grid
        mask: fade
        fixed: true
      maxContentWidth: xl
      paddingHorizontal: gutter
      paddingVertical: 4xl
  - _component: page-sections/proof/testimonial-quote
    content:
      sectionLabel: ''
      eyebrow: ''
      variant: static
      quoteSize: lg
      tone: base
      cardWidth: medium
      alignment: start
      bordered: false
      quotes:
        - text: I almost **forgot** that website maintenance was a thing.
          authorName: Sindre Gusdal
          authorDescription: General Manager,
          company: Absoluttweb
          authorImage: /src/assets/images/marketing/ellipse-287.jpg
          authorImageAlt: Sindre Gusdal
          logoSource: ''
          logoAlt: ''
          linkText: ''
          link: ''
          accentColor: harbour
          quoteMarks: true
    style:
      backgroundColor: dark
      background:
        type: image
        imageSource: ''
        imageAlt: ''
        positionVertical: top
        positionHorizontal: center
        fixed: false
        priority: false
        mask: none
        overlay: 0
      maxContentWidth: xl
      paddingHorizontal: gutter
      paddingVertical: 4xl
  - _component: page-sections/proof/story-carousel
    content:
      sectionLabel: ''
      eyebrow: ''
      heading: Grow your sites, not your headcount.
      headingLevel: h2
      headingSize: lg
      subtext: From fast-moving startups to multi-site agencies, teams ship more with
        CloudCannon.
      subtextSize: lg
      subtextWidth: md
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
          logoSource: ''
          logoAlt: ''
          figure: '90'
          label: average Lighthouse score
          linkText: Read story
          link: ''
      buttonSections:
        - _component: building-blocks/core-elements/button
          text: See how others did it
          link: ''
          iconName: ''
          iconColor: default
          textColor: default
          iconPosition: before
          hideText: false
          variant: primary
          size: md
    style:
      backgroundColor: dark
      background:
        type: pattern
        imageSource: ''
        pattern: grid
        mask: top
      maxContentWidth: xl
      paddingHorizontal: gutter
      paddingVertical: 4xl
  - _component: page-sections/proof/team-grid-section
    content:
      sectionLabel: ''
      eyebrow: Who we are
      heading: Made for the work, not for the upsell
      headingSize: lg
      headingLevel: h2
      subtext: We’re a tight-knit team based in Dunedin, New Zealand, working with web
        teams all over the world. We started CloudCannon because every CMS we
        tried gave editors a better experience by giving developers a worse one.
        So we built a CMS that works for both.
      subtextSize: lg
      subtextWidth: sm
      linkText: Meet the team
      link: ''
      members:
        - _component: building-blocks/wrappers/team-member
          name: George Phillips
          role: Co-founder & CTO
          bio: ''
          imageSource: /src/assets/images/marketing/george-profile-1.png
          imageAlt: George Phillips, Co-founder & CTO at CloudCannon
          backgroundColor: moss
          propSource: ''
          propWidth: 40
          propAlt: ''
        - _component: building-blocks/wrappers/team-member
          name: Mike Neumegen
          role: Co-founder & CEO
          bio: ''
          imageSource: /src/assets/images/marketing/screenshot-2026-06-09-at-7-38-38-pm-background-r-3806-69478.png
          imageAlt: Mike Neumegen, Co-founder & CEO at CloudCannon
          backgroundColor: peachy
          propSource: ''
          propWidth: 40
          propAlt: ''
        - _component: building-blocks/wrappers/team-member
          name: Olivia Nicholson
          role: Head of Content
          bio: ''
          imageSource: /src/assets/images/marketing/container-5-3806-69485-2.png
          imageAlt: Olivia Nicholson, Head of Content at CloudCannon
          backgroundColor: pacific
          propSource: ''
          propWidth: 40
          propAlt: ''
        - _component: building-blocks/wrappers/team-member
          name: Sam Whitfield
          role: Product Design
          bio: ''
          imageSource: /src/assets/images/marketing/container-7-3806-69515-2.png
          imageAlt: Sam Whitfield, Product Design at CloudCannon
          backgroundColor: sunset
          propSource: ''
          propWidth: 40
          propAlt: ''
        - _component: building-blocks/wrappers/team-member
          name: Tom Richardson
          role: Solutions Architect
          bio: ''
          imageSource: /src/assets/images/marketing/container-9-3806-69524-1.png
          imageAlt: Tom Richardson, Solutions Architect at CloudCannon
          backgroundColor: golden
          propSource: ''
          propWidth: 40
          propAlt: ''
        - _component: building-blocks/wrappers/team-member
          name: Chris Wingate
          role: CRO
          bio: ''
          imageSource: /src/assets/images/marketing/chris-profile-1.png
          imageAlt: Chris Wingate, CRO at CloudCannon
          backgroundColor: moss
          propSource: ''
          propWidth: 40
          propAlt: ''
      columns: 2
    style:
      backgroundColor: sand
      background:
        type: image
        imageSource: ''
        imageAlt: ''
        positionVertical: top
        positionHorizontal: center
        fixed: false
        priority: false
        mask: none
        overlay: 0
      maxContentWidth: xl
      paddingHorizontal: gutter
      paddingVertical: none
  - _component: page-sections/conversion/cta-split
    content:
      sectionLabel: ''
      heading: Take a peek under the hood
      headingLevel: h2
      subtext: Git underneath, a visual editor on top, with code and content running
        on one engine. Start free in minutes, or book a demo and we’ll walk you
        through the real thing.
      subtextSize: lg
      subtextWidth: ''
      imageSource: /src/assets/images/marketing/cloudcannon-truck-closed-1.png
      imageAlt: ''
      buttonSections:
        - _component: building-blocks/core-elements/button
          text: Start your free trial
          link: ''
          iconName: ''
          iconColor: default
          textColor: default
          iconPosition: before
          hideText: false
          variant: primary
          size: md
        - _component: building-blocks/core-elements/button
          text: Book a demo
          link: ''
          iconName: move-right
          iconColor: default
          textColor: default
          iconPosition: after
          hideText: false
          variant: text
          size: md
      reverse: false
      headingSize: lg
      imageRevealLabel: Open and close the truck's hood
      imageReveal: /src/assets/images/marketing/cloudcannon-truck-open-1.png
      imageOverflow: 333
    style:
      backgroundColor: pacific
      background:
        type: image
        imageSource: ''
        imageAlt: ''
        positionVertical: top
        positionHorizontal: center
        fixed: false
        priority: false
        mask: none
        overlay: 0
      maxContentWidth: xl
      paddingHorizontal: gutter
      paddingVertical: 4xl
---
