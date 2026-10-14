---
_schema: default
title: Migration
description: Our migration team moves your website to CloudCannon, whatever it is built on.
keywords: []
pageSections:
  - _component: page-sections/heroes/page-header
    content:
      sectionLabel: ''
      heading:
        eyebrow: ''
        heading: No time to migrate? We're here to help.
        headingLevel: h1
        headingSize: xl
      subtext:
        subtext: No matter what services you are using (or the current state of your
          website), we'll do the work while your team enjoys an optimized experience.
        subtextSize: xl
        subtextWidth: 740
      showBreadcrumbs: false
      buttonSections:
        - _component: building-blocks/core-elements/button
          text: Talk with us about migration
          link: /contact/
          variant: primary
          size: md
    style:
      alignmentHorizontal: center
      backgroundColor: light-sand
      pattern: grid
      fade: bottom
      maxContentWidth: xl
      paddingHorizontal: gutter
      paddingVertical: 4xl
      haze: false
  - _component: page-sections/explainers/card-grid-section
    content:
      sectionLabel: What we do
      heading:
        eyebrow: ''
        heading: Migrate your website with minimal disruption
        headingLevel: h2
        headingSize: lg
      subtext:
        subtext: Our migration team can help you migrate your website to CloudCannon,
          using any static site generator. We'll handle all the technical aspects, so
          you can focus on creating engaging content.
        subtextSize: lg
        subtextWidth: 580
      alignmentHorizontal: center
      columns: 3
      cards:
        - content:
            heading:
              heading: Technical expertise
              headingSize: xs
            subtext:
              subtext: Leverage our team's deep knowledge and expertise in CloudCannon's
                CMS, cutting-edge technologies and optimal website performance.
              subtextSize: sm
            iconName: badge-check
          style:
            accentColor: harbour
            iconSolid: true
            divider: true
            alignmentHorizontal: start
            iconBackground: true
        - content:
            heading:
              heading: Training and education
              headingSize: xs
            subtext:
              subtext: From component building to user-friendly editing, we'll educate you
                on your new tech stack, so you can get the most out of CloudCannon and
                your new content management workflow.
              subtextSize: sm
            iconName: book-open
          style:
            accentColor: golden
            iconSolid: true
            divider: true
            alignmentHorizontal: start
            iconBackground: true
        - content:
            heading:
              heading: A tailored solution
              headingSize: xs
            subtext:
              subtext: CloudCannon can be customized to your ideal editing experience. We
                understand that one size does not fit all, so we'll work closely with you
                so that you can get the most out of the platform.
              subtextSize: sm
            iconName: user-pen
          style:
            accentColor: sunset
            iconSolid: true
            divider: true
            alignmentHorizontal: start
            iconBackground: true
    style:
      backgroundColor: light-sand
      pattern: pegboard
      fade: bottom
      maxContentWidth: xl
      paddingHorizontal: gutter
      paddingVertical: 4xl
      haze: false
  - _component: page-sections/explainers/pinned-steps
    content:
      sectionLabel: Process
      heading:
        eyebrow: ''
        heading: Migrating your site
        headingLevel: h2
        headingSize: lg
      subtext:
        subtext: ''
      numbered: true
      progressColor: sunset
      progressTrackColor: muted
      copyColor: black
      mediaColor: black
      alignmentHorizontal: start
      reverse: true
      steps:
        - contentSections:
            - _component: building-blocks/core-elements/heading
              text: Choose a static site generator
              level: h3
              size: sm
            - _component: building-blocks/core-elements/text
              text: We're happy to advise if you haven't used an SSG before (if you already
                have a SSG website, great!)
              size: lg
          mediaSections: []
    style:
      backgroundColor: dark
      pattern: grid
      fade: none
      maxContentWidth: xl
      paddingHorizontal: gutter
      paddingVertical: 4xl
      colorScheme: dark
      lockColorScheme: true
      haze: false
  - _component: page-sections/conversion/cta-showcase
    content:
      sectionLabel: Pricing
      heading:
        heading: A new website is about more than just shuffling your content
        headingLevel: h2
        headingSize: lg
      subtext:
        subtext: We understand how important a high performing website is, both to user
          experience and your business growth. It's important to us that we get your
          website Lighthouse scores as high as possible as part of our migration process.
        subtextSize: lg
        subtextWidth: 462
      illustration:
        _component: building-blocks/wrappers/offer-card
        imageSource: /src/assets/images/marketing/thumbsup-kea-mirrored.png
        imageAlt: A kea in a cap giving a thumbs up
        badgeText: Pricing
        badgeColor: harbour
        cardColor: white
        contentSections:
          - _component: building-blocks/core-elements/heading
            text: Migrations starting at $3,000 USD/project
            level: h3
            size: sm
          # One markdown field, which is what the design draws: "Includes:"
          # and the three lines under it are a single 19px text node.
          - _component: building-blocks/core-elements/text
            text: |-
              **Includes:**

              - A tailored editing experience
              - Training and education
              - Lighthouse performance optimized
            size: lg
      reverse: false
    style:
      backgroundColor: light-sand
      pattern: none
      fade: none
      maxContentWidth: xl
      paddingHorizontal: gutter
      paddingVertical: 4xl
      haze: false
  - _component: page-sections/conversion/cta-banner
    content:
      sectionLabel: Contact
      heading:
        heading: Talk to us about a migration
        headingLevel: h2
        headingSize: lg
      subtext: ''
      subtextSize: lg
      alignmentHorizontal: start
      buttonSections:
        - _component: building-blocks/core-elements/button
          text: Contact us
          link: /contact/
          iconName: move-right
          iconColor: default
          textColor: default
          iconPosition: after
          hideText: false
          variant: text
          size: md
      images:
        left: ''
        right: /src/assets/images/marketing/ferns-rocks-2-3806-72621-mirrored.png
    style:
      scratched: true
      backgroundColor: pacific
      pattern: none
      fade: none
      maxContentWidth: xl
      paddingHorizontal: gutter
      haze: false
---
