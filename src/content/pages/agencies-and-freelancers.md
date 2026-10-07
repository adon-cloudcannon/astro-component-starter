---
_schema: default
title: Agencies & Freelancers
description: Faster launches. Happier clients. Less support.
pageSections:
  - _component: page-sections/heroes/hero-split
    content:
      heading:
        heading: Faster launches. Happier clients. Less support.
        headingSize: xl
      subtext: >-
        Here, agencies spend less time on maintenance and more time on billable work, with websites
        your clients love to edit.
      image:
        imageSource: /src/assets/images/marketing/hero-agencies-and-freelancers.png
        imageAlt: ''
        imageOverflow: 63
      buttonSections:
        - _component: building-blocks/core-elements/button
          text: Start your free trial
          variant: primary
        - _component: building-blocks/core-elements/button
          text: Book a demo
          iconName: move-right
          iconPosition: after
          variant: text
      subtextSize: xl
    style:
      pattern: grid
      haze: true
      backgroundColor: light-sand
  - _component: page-sections/proof/logo-cloud
    content:
      heading: PARTNERS TO BE PROUD OF
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
    style:
      backgroundColor: sand
      headingPlacement: inline
  - _component: page-sections/proof/testimonial-wall
    content:
      heading:
        eyebrow: SUCCESS STORIES
        heading: Here to help you succeed
        headingSize: lg
      subtext: >-
        Grow your portfolio, not your overhead. Ship faster, hand over confidently, and get on with
        what’s next.
      subtextSize: xl
      subtextWidth: md
      layout: row
      testimonials:
        - text: Absoluttweb can deploy a client website in just 1 hour
          quoted: false
          quoteSize: 27
          authorName: Sindre Gusdal
          authorDescription: General Manager, Absoluttweb
          authorImage: /src/assets/images/marketing/ellipse-287.jpg
        - text: >-
            I was looking for a company that understood that or got that and were willing to work on
            top of what we had — and around what we had.
          quoted: false
          quoteSize: 19
          authorName: Grayson Campbell
          authorDescription: Digital Lead, PaperCut
          authorImage: /src/assets/images/marketing/ellipse-287-3.jpg
        - text: Our clients can build entirely new landing pages in just minutes
          quoted: true
          quoteSize: 27
          authorName: Person McPerson
          authorDescription: Digital Design Director, Croissant & Baguette
    style:
      backgroundColor: light-sand
      pattern: pegboard
      fade: bottom
      haze: true
  - _component: page-sections/builders/custom-section
    content:
      contentSections:
        - _component: building-blocks/core-elements/heading
          text: Happy clients
          level: h2
          size: lg
          alignmentHorizontal: center
        - _component: building-blocks/core-elements/heading
          text: Hand over a site that clients can update themselves
          level: h3
          size: sm
          alignmentHorizontal: center
        - _component: building-blocks/core-elements/text
          text: >-
            Build with the static site generator you already use. Define components once and reuse
            them across every client site.
          alignmentHorizontal: center
          size: lg
          style: 'max-inline-size: 527px; margin-inline: auto'
        - _component: building-blocks/wrappers/button-group
          buttonSections:
            - _component: building-blocks/core-elements/button
              text: Learn more
              iconName: move-right
              textColor: sunset
              iconPosition: after
              variant: text
          alignmentHorizontal: center
    style:
      backgroundColor: light-sand
  - _component: page-sections/builders/custom-section
    content:
      contentSections: []
    style:
      backgroundColor: light-sand
  - _component: page-sections/explainers/feature-split
    content:
      heading:
        heading: A platform that wins pitches
        headingSize: sm
      subtext: >-
        Clients own their content outright. It lives in their repo as files, not locked in a
        database. They’re never tied to a platform, and neither are you.
      subtextSize: lg
      buttonSections:
        - _component: building-blocks/core-elements/button
          text: Learn more
          iconName: move-right
          textColor: sunset
          iconPosition: after
          variant: text
      imageSource: ''
    style:
      backgroundColor: light-sand
      pattern: grid
      haze: true
  - _component: page-sections/explainers/pinned-steps
    content:
      heading:
        eyebrow: ''
        heading: Happy developers
        headingSize: lg
      subtext: ''
      alignmentHorizontal: center
      steps:
        - contentSections:
            - _component: building-blocks/core-elements/heading
              text: Craft the ideal editing interface
              level: h3
              size: sm
            - _component: building-blocks/core-elements/text
              text: >-
                Build with the static site generator you already use. Define components once and
                reuse them across every client site.
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
              text: Efficiency and speed that delivers results
              level: h3
              size: sm
            - _component: building-blocks/core-elements/text
              text: >-
                Ship custom sites that are fast, secure, and built to rank. Then, because they're
                static, there's nothing to maintain.
              size: lg
            - _component: building-blocks/core-elements/button
              text: Learn more
              iconName: move-right
              textColor: sunset
              iconPosition: after
              variant: text
          mediaSections:
            - _component: building-blocks/wrappers/stat-overlay
              panelColor: '#FFFFFF'
              imageSource: /src/assets/images/marketing/partner-dashboard-1.png
              imageAlt: ''
              imagePlacement: center
              imageWidth: 86
              statsPosition: end
              statsAlign: start
              stats:
                - number: 10
                  suffix: x
                  label: overall site speed
                  iconName: gauge
                  iconColor: sunset
      reverse: true
      mediaWidth: wide
      progressTrackColor: '#674A3F'
    style:
      backgroundColor: dark
      pattern: grid
      fade: top
  - _component: page-sections/conversion/cta-center
    content:
      heading:
        heading: Join a Partner Program that rewards good work
        headingSize: lg
      subtext: As you bring in new clients, you’ll gain points and more benefits.
      subtextSize: lg
      buttonSections:
        - _component: building-blocks/core-elements/button
          text: Learn more about the Partner Program
          variant: primary
      alignmentHorizontal: center
    style:
      backgroundColor: light-sand
---
