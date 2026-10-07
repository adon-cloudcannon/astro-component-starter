---
_schema: default
title: Content Editors
description: Draft. Edit. Publish. No problem.
pageSections:
  - _component: page-sections/heroes/hero-split
    content:
      heading:
        heading: Draft. Edit. Publish. No problem.
        headingSize: xl
      subtext:
        subtext: Publish your best content with visual editing, custom components, and a
          flexible review process for your whole team.
        subtextSize: xl
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
    style:
      pattern: pegboard
      haze: true
      backgroundColor: light-sand
  - _component: page-sections/explainers/editor-demo
    content:
      heading:
        eyebrow: INTERACTIVE DEMO
        heading: Here’s what you’re working with
        headingSize: lg
      subtext:
        subtext: Click a heading and change it. See what’s possible with the Visual
          Editor.
        subtextSize: lg
        subtextWidth: md
      alignmentHorizontal: center
    style:
      backgroundColor: light-sand
  - _component: page-sections/proof/testimonial-quote
    content:
      quotes:
        - text: When we show clients the Visual Editor during our meetings, **their eyes
            light up.**
          logoSource: /src/assets/images/marketing/logos/firebrand.svg
          logoAlt: Firebrand
          authorName: Alex Murray
          authorDescription: Digital Design Director ·
          company: Firebrand
          authorImage: /src/assets/images/marketing/ellipse-287-2.png
          authorImageAlt: Alex Murray
          linkText: Read case study
          accentColor: pacific
    style:
      backgroundColor: light-sand
      paddingVerticalStart: lg
      variant: static
      quoteSize: lg
      tone: light
  - _component: page-sections/explainers/pinned-steps
    content:
      heading:
        eyebrow: ''
        heading: No more waiting on tickets
        headingSize: lg
      subtext:
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
                Change a headline, swap an image, or build a whole new page from
                components your developers already built.
              size: lg
          mediaSections: []
        - contentSections:
            - _component: building-blocks/core-elements/heading
              text: Preview before anyone else sees it
              level: h3
              size: sm
            - _component: building-blocks/core-elements/text
              text: >-
                Every change gets a live preview. Share it, gather feedback, and
                sort things out while the page is still private.
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
      pattern: grid
      fade: bottom
      haze: true
  - _component: page-sections/proof/testimonial-quote
    content:
      quotes:
        - text: >-
            You can have lots of **concurrent pieces of work**: a solutions
            page, a new case study layout, new terms and conditions, a legal
            section, all on different branches with different agents working on
            them in isolation, without corrupting your main site.
          logoSource: /src/assets/images/marketing/logos/nomio.svg
          logoAlt: Nomio
          authorName: Ed Stennett
          authorDescription: Head of Growth ·
          company: Nomio
          authorImage: /src/assets/images/marketing/ellipse-287.jpg
          authorImageAlt: Ed Stennett
          linkText: Read case study
          accentColor: sunset
    style:
      backgroundColor: dark
      pattern: pegboard
      variant: static
      quoteSize: sm
      tone: base
      cardWidth: medium
      bordered: true
  - _component: page-sections/conversion/cta-center
    content:
      heading:
        heading: Room for everyone to work at once
        headingSize: lg
      subtext:
        subtext: Every piece of work happens on its own branched site, so a new blog
          post, a landing page redesign, and a navigation update can all run at
          once without anyone treading on toes.
        subtextSize: lg
        subtextWidth: md
    style:
      backgroundColor: light-sand
  - _component: page-sections/explainers/feature-grid
    content:
      heading:
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
      heading:
        heading: Take a peek under the hood
        headingSize: lg
      subtext:
        subtext: Git underneath, a visual editor on top, with code and content running
          on one engine. Start free in minutes, or book a demo and we’ll walk
          you through the real thing.
        subtextSize: lg
      imageOverflow: 336
      buttonSections:
        - _component: building-blocks/core-elements/button
          text: Start your free trial
          variant: primary
        - _component: building-blocks/core-elements/button
          text: Book a demo
          iconName: move-right
          iconPosition: after
          variant: text
      mediaSections:
        - _component: building-blocks/wrappers/image-reveal
          source: /src/assets/images/marketing/cloudcannon-truck-closed-1.png
          alt: ''
          revealSource: /src/assets/images/marketing/cloudcannon-truck-open-1.png
          label: Open and close the truck's hood
          aspectRatio: none
          rounded: true
    style:
      backgroundColor: pacific
---
