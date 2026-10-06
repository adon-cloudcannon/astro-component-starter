---
# Generated from the Figma mapping. 3 of 8 blocks are
# confirmed decisions; the rest are proposals to review on the page.
_schema: default
title: Content Editors
description: Draft. Edit. Publish. No problem.
pageSections:
  - _component: page-sections/heroes/hero-split
    content:
      heading:
        heading: Draft. Edit. Publish. No problem.
        headingSize: xl
      subtext: >-
        Publish your best content with visual editing, custom components, and a flexible review
        process for your whole team.
      image:
        imageSource: /src/assets/images/marketing/hero-content-editors.png
        imageAlt: ''
        imageOverflow: 83
      buttonSections:
        - _component: building-blocks/core-elements/button
          text: Start your free trial
          variant: primary
        - _component: building-blocks/core-elements/button
          text: Book a demo
          iconName: move-right
          iconPosition: after
          variant: text
      note:
        - text: No credit card · 14-day free trial · No lock-in
          iconName: check
          iconColor: default
      subtextSize: xl
    style:
      pattern: pegboard
      haze: true
      backgroundColor: light-sand
  - _component: page-sections/explainers/editor-demo
    content:
      eyebrow: INTERACTIVE DEMO
      heading: Here’s what you’re working with
      subtext: Click a heading and change it. See what’s possible with the Visual Editor.
      subtextSize: lg
      subtextWidth: md
      alignmentHorizontal: center
      headingSize: lg
    style:
      backgroundColor: light-sand
  - _component: page-sections/proof/testimonial-quote
    content:
      variant: static
      quoteSize: lg
      tone: light
      quotes:
        - text: When we show clients the Visual Editor during our meetings, **their eyes light up.**
          logoSource: /src/assets/images/marketing/logos/firebrand.svg
          logoAlt: Firebrand
          logoAspect: 239 / 50
          authorName: Alex Murray
          authorDescription: Digital Design Director ·
          company: Firebrand
          authorImage: /src/assets/images/marketing/ellipse-287-2.png
          authorImageAlt: Alex Murray
          linkText: Read case study
          accentColor: pacific
      paddingVerticalStart: lg
    style:
      backgroundColor: light-sand
  - _component: page-sections/explainers/pinned-steps
    content:
      eyebrow: ''
      heading: No more waiting on tickets
      headingSize: lg
      subtext: ''
      alignmentHorizontal: start
      steps:
        - contentSections:
            - _component: building-blocks/core-elements/heading
              text: Update the website right away
              level: h3
              size: sm
            - _component: building-blocks/core-elements/text
              text: >-
                Change a headline, swap an image, or build a whole new page from components your
                developers already built.
              size: lg
          mediaSections: []
        - contentSections:
            - _component: building-blocks/core-elements/heading
              text: Preview before anyone else sees it
              level: h3
              size: sm
            - _component: building-blocks/core-elements/text
              text: >-
                Every change gets a live preview. Share it, gather feedback, and sort things out while
                the page is still private.
              size: lg
          mediaSections: []
        - contentSections:
            - _component: building-blocks/core-elements/heading
              text: Publish when you’re ready
              level: h3
              size: sm
            - _component: building-blocks/core-elements/text
              text: Publish now or schedule it for later. Nothing goes live by accident.
              size: lg
          mediaSections: []
      reverse: true
      mediaWidth: wide
      progressColor: golden
      progressTrackColor: midnight
      numbered: true
    style:
      backgroundColor: dark
      background:
        type: pattern
        pattern: grid
        mask: fade
      haze:
        - x: -0.4009
          rx: 186px
          'y': 165.5%
          ry: 19.5%
        - x: -0.3997
          rx: 186px
          'y': 165.6%
          ry: 19.5%
  - _component: page-sections/proof/testimonial-quote
    content:
      variant: static
      quoteSize: sm
      tone: base
      cardWidth: medium
      bordered: true
      quotes:
        - text: >-
            You can have lots of **concurrent pieces of work**: a solutions page, a new case study
            layout, new terms and conditions, a legal section, all on different branches with
            different agents working on them in isolation, without corrupting your main site.
          logoSource: /src/assets/images/marketing/logos/nomio.svg
          logoAlt: Nomio
          logoAspect: 275 / 63
          authorName: Ed Stennett
          authorDescription: Head of Growth ·
          company: Nomio
          authorImage: /src/assets/images/marketing/ellipse-287.jpg
          authorImageAlt: Ed Stennett
          linkText: Read case study
          accentColor: sunset
    style:
      backgroundColor: dark
      background:
        type: pattern
        pattern: pegboard
        mask: none
      haze:
        - x: 0.4938
          rx: 933px
          'y': 49.8%
          ry: 74.8%
  - _component: page-sections/conversion/cta-center
    content:
      heading: Room for everyone to work at once
      headingSize: lg
      subtext: >-
        Every piece of work happens on its own branched site, so a new blog post, a landing page
        redesign, and a navigation update can all run at once without anyone treading on toes.
      subtextSize: lg
      subtextWidth: md
    style:
      backgroundColor: light-sand
      background: ''
  - _component: page-sections/explainers/feature-grid
    content:
      heading: Built for the work
      headingSize: lg
      alignmentHorizontal: center
      columns: 3
      cardHeight: 334
      features:
        - title: Custom permissions
          description: Define roles and groups to match your organization structure.
          imageSource: /src/assets/images/marketing/layer-28-1-3806-71328.png
          imageHeight: 180
          imageAlt: ''
        - title: Asset management
          description: Centralize, control and access approved and optimized assets.
          imageSource: /src/assets/images/marketing/layer-25-1-3806-71332.png
          imageHeight: 151
          imageAlt: ''
        - title: Multilingual
          description: Localization and i18n support for worldwide content.
          imageSource: /src/assets/images/marketing/layer-26-1-3806-71336.png
          imageHeight: 162
          imageAlt: ''
    style:
      backgroundColor: light-sand
  - _component: page-sections/conversion/cta-split
    content:
      heading: Take a peek under the hood
      headingSize: lg
      subtext: >-
        Git underneath, a visual editor on top, with code and content running on one engine. Start
        free in minutes, or book a demo and we’ll walk you through the real thing.
      subtextSize: lg
      imageRevealLabel: Open and close the truck's hood
      imageReveal: /src/assets/images/marketing/cloudcannon-truck-open-1.png
      imageSource: /src/assets/images/marketing/cloudcannon-truck-closed-1.png
      imageOverflow: 336
      imageAlt: ''
      buttonSections:
        - _component: building-blocks/core-elements/button
          text: Start your free trial
          variant: primary
        - _component: building-blocks/core-elements/button
          text: Book a demo
          iconName: move-right
          iconPosition: after
          variant: text
    style:
      backgroundColor: pacific
---
