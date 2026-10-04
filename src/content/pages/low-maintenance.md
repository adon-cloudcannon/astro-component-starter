---
# Generated from the Figma mapping. 7 of 10 blocks are
# confirmed decisions; the rest are proposals to review on the page.
_schema: default
title: Low Maintenance
description: No database. No 2 a.m. panic.
pageSections:
  - _component: page-sections/heroes/hero-split
    backgroundColor: sand
    heading: No database. No 2 a.m. panic.
    subtext: >-
      Skip the forced updates, security patches, and midnight outages. Your site keeps running while
      your team spends time building what's next.
    subtextSize: xl
    imageSource: /src/assets/images/marketing/hero-lowmaintenance-01-1.png
    imageAlt: ''
    headingSize: xl
    imageOverflow: 107
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
    pattern: pegboard
    haze: true
  - _component: page-sections/proof/logo-cloud
    backgroundColor: sand
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
    backgroundColor: light-sand
    subtextWidth: 816
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
    backgroundColor: light-sand
  - _component: page-sections/explainers/feature-split
    subtextWidth: 342
    shapes:
      - text: Uptime monitoring and security scanning
        tone: golden
        x: 351
        'y': 0
        width: 224
        height: 171
        rotation: 0
      - text: Database backups
        tone: coral
        x: 55
        'y': 70
        width: 224
        height: 116
        rotation: -14.8
      - text: '!'
        tone: rust
        round: true
        lightText: true
        fontSize: 64
        strong: true
        x: 274
        'y': 53
        width: 78
        height: 78
        rotation: -14.8
      - text: PHP and runtime version bumps
        shadowX: 87
        shadowY: 1
        shadowWidth: 135
        shadowHeight: 36
        shadowFrom: 2
        tone: golden
        x: 0
        'y': 208
        width: 221
        height: 132
        rotation: 0
      - text: Plugin updates, and the conflicts that follow them
        shadowX: 147
        shadowY: 1
        shadowWidth: 297
        shadowHeight: 38
        shadowFrom: 1
        tone: rust
        lightText: true
        x: 220
        'y': 169
        width: 221
        height: 171
        rotation: 0
      - text: Emergency fixes at hours you’d rather be asleep
        shadowX: -72
        shadowY: 1
        shadowWidth: 297
        shadowHeight: 38
        shadowFrom: 1
        tone: coral
        x: 440
        'y': 169
        width: 224
        height: 171
        rotation: 0
    heading: We don’t think a website should need this much looking after
    subtext: 'With a static site and Git you won’t need to worry about:'
    subtextSize: xl
    backgroundColor: light-sand
    headingSize: lg
    background:
      type: pattern
      pattern: grid
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
    backgroundColor: dark
    subtextSize: lg
    subtextWidth: 580
    headingSize: lg
    background:
      type: pattern
      pattern: grid
      mask: fade
  - _component: page-sections/explainers/pinned-steps
    heading: ''
    subtext: ''
    eyebrow: ''
    reverse: false
    mediaWidth: wide
    progressColor: pacific-300
    progressTrackColor: midnight
    backgroundColor: dark
    steps:
      - contentSections:
          - _component: building-blocks/core-elements/heading
            text: A much smaller target
            level: h2
            size: sm
          - _component: building-blocks/core-elements/text
            text: >-
              Most CMS vulnerabilities live in databases, plugins and server-side code. A static
              site puts none of those in front of visitors, so there’s very little left to attack.
              Your content sits in your own repo, and the platform itself is SOC 2 Type 2 compliant.
            size: lg
        mediaSections: []
      - contentSections:
          - _component: building-blocks/core-elements/heading
            text: Upgrade only when it suits you
            level: h2
            size: sm
          - _component: building-blocks/core-elements/text
            text: >-
              With CloudCannon you’ll have no forced version upgrades, no plugin conflicts to
              untangle, no unplanned migrations. Things change when you decide they should.
            size: lg
        mediaSections: []
      - contentSections:
          - _component: building-blocks/core-elements/heading
            text: Launch a new site this afternoon
            level: h2
            size: sm
          - _component: building-blocks/core-elements/text
            text: Reusable components and templates mean you're not starting from scratch every time.
            size: lg
        mediaSections: []
  - _component: page-sections/proof/testimonial-section
    company: Absoluttweb
    text: Absoluttweb went from days per new client site to around an hour.
    layout: split
    markPosition: end
    markStyle: card
    quoted: false
    quoteSize: md
    linkText: Read case study
    background:
      type: pattern
      pattern: pegboard
      mask: none
    backgroundColor: dark
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
      propSource: /src/assets/images/embellishments/cocktail.png
      propWidth: 31
      propAlt: ''
    heading: A CMS to build, not babysit
    subtext: >-
      Git underneath, a visual editor on top, with code and content running on one engine. Start
      free in minutes, or book a demo and we’ll walk you through the real thing.
    subtextSize: lg
    backgroundColor: light-sand
    subtextWidth: 489
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
    scratch: pacific
    heading: Wanna learn more about our product?
    linkText: Explore visual editing
    imageSource: /src/assets/images/marketing/rocks-corner-3806-70523.png
    imageAlt: ''
    headingSize: lg
---
