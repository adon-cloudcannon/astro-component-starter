---
_schema: default
title: Book a demo
description: Book in a time for a 30 minute personalized demo of CloudCannon.
keywords: []
pageSections:
  - _component: page-sections/heroes/page-header
    content:
      sectionLabel: ''
      heading:
        eyebrow: ''
        heading: Book a demo
        headingLevel: h1
        headingSize: xl
      subtext:
        subtext: Book in a time for a 30 minute personalized demo of CloudCannon.
        subtextSize: lg
        subtextWidth: 740
      showBreadcrumbs: false
      alignmentHorizontal: center
    style:
      backgroundColor: light-sand
      pattern: grid
      fade: bottom
      maxContentWidth: xl
      paddingHorizontal: gutter
      paddingVertical: 4xl
      paddingVerticalEnd: 2xl
      haze: false
  - _component: page-sections/builders/custom-section
    content:
      sectionLabel: Book a time
      contentSections:
        - _component: building-blocks/core-elements/embed
          class: book-demo-scheduler
          aspectRatio: widescreen
          html: >-
            <iframe
            src="https://meetings.hubspot.com/christopher-wingate?embed=true"
            title="Book a demo with CloudCannon" loading="lazy"></iframe>
    style:
      backgroundColor: light-sand
      pattern: none
      fade: none
      maxContentWidth: xl
      paddingHorizontal: gutter
      paddingVertical: 4xl
      paddingVerticalStart: none
      haze: false
  - _component: page-sections/builders/custom-section
    content:
      sectionLabel: Demo
      contentSections:
        - _component: building-blocks/core-elements/heading
          eyebrow: Demo
          text: See CloudCannon in action
          level: h2
          size: lg
          alignmentHorizontal: center
        - _component: building-blocks/core-elements/video
          type: vimeo
          videoId: "836411139"
          title: A five minute tour of CloudCannon
    style:
      backgroundColor: dark
      pattern: pegboard
      fade: none
      maxContentWidth: xl
      paddingHorizontal: gutter
      paddingVertical: 4xl
      colorScheme: dark
      lockColorScheme: true
      haze: false
  - _component: page-sections/conversion/cta-banner
    content:
      scratch: pacific
      heading:
        heading: Schedule a meeting with one of our experts
        headingSize: lg
      linkText: Book a personalized demo
      link: '#book'
      imageSource: /src/assets/images/marketing/ferns-rocks-2-3806-72621-mirrored.png
      imageAlt: ''
  - _component: page-sections/proof/testimonial-quote
    content:
      quotes:
        - text: I almost forgot that website maintenance was a thing.
          logoSource: https://cc-dam.imgix.net/absoluttweb-logo-color.svg
          logoAlt: Absoluttweb
          authorName: Sindre Gusdal
          authorDescription: General Manager ·
          company: Absoluttweb
          accentColor: pacific
    style:
      backgroundColor: light-sand
      pattern: pegboard
      variant: carousel
      quoteSize: lg
      tone: light
      maxContentWidth: xl
      paddingHorizontal: gutter
      paddingVertical: 4xl
---
