---
_schema: default
title: Support
description: Reach out to the CloudCannon support team and we'll get back to you as soon as we can.
keywords: []
pageSections:
  - _component: page-sections/heroes/page-header
    content:
      sectionLabel: ''
      heading:
        eyebrow: ''
        heading: Real humans on support, always
        headingLevel: h1
        headingSize: xl
      subtext:
        subtext: Reach out to us with your question and we'll get back to you as soon as we can.
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
      sectionLabel: Support form
      heading:
        heading: ''
      subtext: ''
      steps: []
      formAction: /support/
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
        - _component: building-blocks/forms/input
          label: Company website
          name: website
          type: url
          required: true
          autocomplete: url
        - _component: building-blocks/forms/choice-group
          title: Choose the issue type best related to your problem
          name: issue-type
          required: true
          multiple: false
          options:
            - label: General
              value: general
            - label: Config/Setup issue
              value: config
            - label: Build issue
              value: build
            - label: Editing issue
              value: editing
            - label: Syncing issue
              value: syncing
            - label: Hosting issue
              value: hosting
            - label: Feature request
              value: feature-request
            - label: Billing
              value: billing
        - _component: building-blocks/forms/input
          label: What's the problem you're encountering? Summarize in one sentence.
          name: summary
          type: text
          required: true
        - _component: building-blocks/forms/textarea
          label: Describe the details of your problem with as much relevant detail as possible.
          name: details
          required: true
          rows: 5
        - _component: building-blocks/forms/input
          label: Add the preview URL your query relates to
          name: preview-url
          type: url
          required: false
        - _component: building-blocks/forms/file-upload
          label: 'Optional: Attach examples of code, images, docs, etc. related to your query'
          name: attachments
          multiple: true
          required: false
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
            iconName: circle-help
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
              heading: Changelog
              headingSize: sm
            subtext:
              subtext: ''
            iconName: list-checks
            linkText: Review the latest updates
            link: https://cloudcannon.com/changelog/
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
      fade: none
      maxContentWidth: xl
      paddingHorizontal: gutter
      paddingVertical: 4xl
      paddingVerticalStart: 5xl
      paddingVerticalEnd: 6xl
      colorScheme: dark
      lockColorScheme: true
      haze: false
---
