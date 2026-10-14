---
_schema: default
title: Contact
description: Get in touch with the CloudCannon team and we'll get right back to you.
keywords: []
pageSections:
  - _component: page-sections/heroes/page-header
    content:
      sectionLabel: ''
      heading:
        eyebrow: ''
        heading: Get in touch
        headingLevel: h1
        headingSize: xl
      subtext:
        subtext: We're here to help! Reach out to us with your question, and we'll get right
          back to you.
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
  - _component: page-sections/conversion/cta-form
    content:
      sectionLabel: Contact form
      heading:
        heading: ''
      subtext: ''
      steps: []
      formAction: /contact/
      formBlocks:
        - _component: building-blocks/forms/input
          label: First name
          name: first-name
          type: text
          required: true
          autocomplete: given-name
          class: cta-form-half
        - _component: building-blocks/forms/input
          label: Last name
          name: last-name
          type: text
          required: true
          autocomplete: family-name
          class: cta-form-half
        - _component: building-blocks/forms/input
          label: Email
          name: email
          type: email
          required: true
          autocomplete: email
        - _component: building-blocks/forms/select
          label: How can we help?
          name: enquiry
          required: true
          options:
            - value: developer-support
              label: Developer support
            - value: sales
              label: Talk to sales
            - value: billing
              label: Billing
            - value: partnerships
              label: Partnerships
            - value: something-else
              label: Something else
        - _component: building-blocks/forms/textarea
          label: Message
          name: message
          required: true
          rows: 5
        - _component: building-blocks/forms/submit
          text: Submit
    style:
      backgroundColor: light-sand
      pattern: none
      fade: none
      maxContentWidth: xl
      paddingHorizontal: gutter
      paddingVertical: 4xl
      paddingVerticalStart: none
      haze: false
  - _component: page-sections/explainers/card-grid-section
    content:
      sectionLabel: Other resources
      heading:
        eyebrow: ''
        heading: Other resources
        headingLevel: h2
        headingSize: lg
      subtext:
        subtext: In case you want to browse while you're waiting.
        subtextSize: lg
        subtextWidth: 580
      alignmentHorizontal: center
      columns: 3
      cards:
        - content:
            heading:
              heading: Documentation
              headingSize: sm
            subtext:
              subtext: ''
            iconName: file-text
            linkText: Explore guides and resources
            link: https://cloudcannon.com/documentation/
          style:
            accentColor: none
            iconColor: harbour
            iconSolid: false
            divider: false
            alignmentHorizontal: center
            iconBackground: true
        - content:
            heading:
              heading: Blog
              headingSize: sm
            subtext:
              subtext: ''
            iconName: message-square
            linkText: Read the latest news
            link: /blog/
          style:
            accentColor: none
            iconColor: sunset
            iconSolid: false
            divider: false
            alignmentHorizontal: center
            iconBackground: true
        - content:
            heading:
              heading: FAQ
              headingSize: sm
            subtext:
              subtext: ''
            iconName: circle-help
            linkText: Get some answers
            link: /faq/
          style:
            accentColor: none
            iconColor: golden
            iconSolid: false
            divider: false
            alignmentHorizontal: center
            iconBackground: true
    style:
      backgroundColor: dark
      pattern: pegboard
      fade: bottom
      maxContentWidth: xl
      paddingHorizontal: gutter
      paddingVertical: 4xl
      paddingVerticalStart: 5xl
      paddingVerticalEnd: 6xl
      colorScheme: dark
      lockColorScheme: true
      haze: false
---
