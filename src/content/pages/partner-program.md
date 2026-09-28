---
# Generated from the Figma mapping. 1 of 11 blocks are
# confirmed decisions; the rest are proposals to review on the page.
_schema: default
title: Partner Program
description: The more you launch, the more you unlock
pageSections:
  - _component: page-sections/heroes/hero-split
    heading: The more you launch, the more you unlock
    subtext: >-
      Welcome to a Partner Program that rewards good work. Get better margins and less overhead as
      you grow your portfolio.
    subtextSize: xl
    imageSource: /src/assets/images/marketing/screenshot-2026-08-17-at-12-00-53-1.png
    headingSize: xl
    imageOverflow: 59
    reverse: true
    background:
      type: pattern
      pattern: dots
      patternPitch: 40
      mask: none
    backgroundColor: surface
    haze:
      - x: 0.6662
        rx: 512px
        'y': 40.1%
        ry: 73.6%
    buttonSections:
      - _component: building-blocks/core-elements/button
        variant: primary
        text: Start your free trial
      - _component: building-blocks/core-elements/button
        variant: text
        iconName: arrow-right
        iconPosition: after
        text: Book a demo
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
    heading: 20,000+ sites shipped
  - _component: page-sections/explainers/feature-split
    eyebrow: THE PROGRAM
    heading: What is the Partner Program?
    subtext: >-
      We want to reward good work. Every new client you bring on earns points, and the more you
      have, the more benefits you unlock.
    subtextSize: lg
    headingSize: lg
    buttonSections:
      - _component: building-blocks/core-elements/button
        variant: primary
        text: Join the Partner Program
      - _component: building-blocks/core-elements/button
        variant: text
        iconName: arrow-right
        iconPosition: after
        text: Create organization
  - _component: page-sections/conversion/cta-split
    heading: New client sites shipped in 60 minutes instead of days.
    headingSize: md
    background:
      type: pattern
      pattern: dots
      patternPitch: 21
      mask: none
    backgroundColor: base
    colorScheme: dark
    lockColorScheme: true
    haze:
      - x: 0.4791
        rx: 933px
        'y': 49.8%
        ry: 74.8%
    buttonSections:
      - _component: building-blocks/core-elements/button
        variant: text
        iconName: arrow-right
        iconPosition: after
        text: Read case study
  - _component: page-sections/explainers/feature-grid
    features:
      - title: Partner dashboard
        description: Track site health, errors, usage and billing for every client from one place.
        imageSource: /src/assets/images/marketing/partner-dashboard-1.png
        imageHeight: 153
        imageAlt: ''
      - title: Extended trial periods
        description: Trial sites stay free until your client goes live.
        imageSource: /src/assets/images/marketing/extended-trial-1.png
        imageHeight: 171
        imageAlt: ''
      - title: Discounts
        description: Up to 20% off all plans as you climb the Partner tiers.
        imageSource: /src/assets/images/marketing/money-3806-72278.png
        imageHeight: 138
        imageAlt: ''
      - title: Dedicated support
        description: Silver partners can join a private Slack channel with our support and engineering team.
        imageSource: /src/assets/images/marketing/slack-1.png
        imageHeight: 175
        imageAlt: ''
      - title: Attract more clients
        description: Join the Experts directory and showcase your work to potential leads.
        imageSource: /src/assets/images/marketing/attract-1.png
        imageHeight: 139
        imageAlt: ''
      - title: Roadmap access
        description: Get early roadmap access and shape future features with direct input.
        imageSource: /src/assets/images/marketing/roadmap-1.png
        imageHeight: 173
        imageAlt: ''
    columns: 3
    alignmentHorizontal: center
    heading: What are the perks?
    backgroundColor: base
    colorScheme: dark
    lockColorScheme: true
    cardHeight: 334
    headingSize: lg
  - _component: page-sections/conversion/pricing-tiers
    tiers:
      - name: Bronze
        description: 0-19 points
        features:
          - text: Partner dashboard
            included: true
          - text: Partner users
            included: true
          - text: Extended trial periods
            included: true
          - text: Free onboarding and training
            included: true
        height: 274
      - name: Silver
        description: 20-99 points
        features:
          - text: Bronze benefits
            included: true
          - text: 10% off all plans
            included: true
          - text: Expert listing
            included: true
          - text: Roadmap visibility
            included: true
          - text: Priority support
            included: true
        height: 328
      - name: Gold
        description: 100-199 points
        features:
          - text: Bronze and Silver benefits
            included: true
          - text: 15% off all plans
            included: true
          - text: Referrals
            included: true
          - text: Marketing opportunities
            included: true
          - text: Beta testing
            included: true
        height: 399
      - name: Platinum
        description: 200+ points
        features:
          - text: Bronze, Silver, and Gold benefits
            included: true
          - text: 20% off all plans
            included: true
        height: 454
    eyebrow: PARTNER TIERS
    heading: Climb as your portfolio grows
    subtext: >-
      Bring on new clients, move up the tiers, and unlock bigger discounts, dedicated support, and
      more exposure to new leads.
    subtextSize: lg
    subtextWidth: 580
    alignmentHorizontal: start
    headingSize: lg
  - _component: page-sections/conversion/pricing-tiers
    tiers:
      - name: Lite
        description: A pay-as-you-go plan for smaller clients
        features:
          - text: Unlimited sites
            included: true
          - text: 1 user
            included: true
          - text: 20GB bandwidth
            included: true
          - text: 1 custom domain
            included: true
          - text: Default permissions
            included: true
        price: $10
        priceSuffix: /month (USD)
        pricePosition: bottom
        height: 454
      - name: Standard
        description: Core editing features for most clients
        features:
          - text: Unlimited sites
            included: true
          - text: 3 users
            included: true
          - text: 110GB bandwidth
            included: true
          - text: 5 custom domains
            included: true
          - text: Default permissions
            included: true
        price: $55
        priceSuffix: /month (USD)
        pricePosition: bottom
        badgeText: Recommended
        height: 454
      - name: Team
        description: For client teams with advanced workflows
        features:
          - text: Unlimited sites
            included: true
          - text: 15 users
            included: true
          - text: 700GB bandwidth
            included: true
          - text: 10 custom domains
            included: true
          - text: Custom permissions
            included: true
        price: $350
        priceSuffix: /month (USD)
        pricePosition: bottom
        height: 454
    heading: Pricing plans designed for your clients
    subtext: Handle billing yourself or pass it on to clients, whatever fits the workflow.
    subtextSize: lg
    backgroundColor: surface
    subtextWidth: 446
    alignmentHorizontal: center
    headingSize: lg
  - _component: page-sections/explainers/feature-split
    backgroundColor: surface
    heading: Enterprise
    subtext: We’ll work with you to craft a plan that fits your particular client’s needs.
    subtextSize: lg
    imageSource: /src/assets/images/marketing/keatuatara-03-1-3806-72612.png
    headingSize: md
    buttonSections:
      - _component: building-blocks/core-elements/button
        variant: primary
        text: Join the Partner Program
  - _component: page-sections/conversion/cta-center
    heading: Become a CloudCannon Partner
    headingSize: lg
    background:
      type: pattern
      pattern: grid
      patternPitch: 40
      mask: none
    haze:
      - x: 0.5
        rx: 640px
        'y': 55.9%
        ry: 55.9%
      - x: 0.5
        rx: 387px
        'y': 54.4%
        ry: 36%
  - _component: page-sections/conversion/cta-form
    formAction: /partner-program/
    imageSource: ''
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
        label: Business Email
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
        title: What static site generator(s) do you use?
        name: generators
        multiple: true
        required: true
        options:
          - label: Astro
            value: astro
          - label: Docusaurus
            value: docusaurus
          - label: Eleventy
            value: eleventy
          - label: Gatsby
            value: gatsby
          - label: Hugo
            value: hugo
          - label: Jekyll
            value: jekyll
          - label: Next.js
            value: nextjs
          - label: Nuxt.js
            value: nuxtjs
          - label: MkDocs
            value: mkdocs
          - label: SvelteKit
            value: sveltekit
          - label: Other
            value: other
      - _component: building-blocks/forms/textarea
        label: What goals would you like to achieve by using CloudCannon?
        name: goals
        required: true
        rows: 4
      - _component: building-blocks/forms/select
        label: How did you hear about CloudCannon?
        name: referral
        required: true
        placeholder: Please Select
      - _component: building-blocks/forms/submit
        text: Submit
    steps:
      - contentSections:
          - _component: building-blocks/core-elements/simple-text
            text: Complete the Partner Program application below
            size: lg
      - contentSections:
          - _component: building-blocks/core-elements/simple-text
            text: Sign up for CloudCannon and start your free trial
            size: lg
      - contentSections:
          - _component: building-blocks/core-elements/simple-text
            text: Wait to hear from us on your application
            size: lg
      - contentSections:
          - _component: building-blocks/core-elements/simple-text
            text: Once approved, access the Lite plan and Bronze benefits. Start launching!
            size: lg
  - _component: page-sections/conversion/cta-center
    heading: Keen to collaborate?
    backgroundColor: base
    colorScheme: dark
    lockColorScheme: true
    headingSize: lg
    buttonSections:
      - _component: building-blocks/core-elements/button
        variant: text
        iconName: arrow-right
        iconPosition: after
        text: Our values
      - _component: building-blocks/core-elements/button
        variant: primary
        text: Our team
---
