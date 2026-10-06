---
# Generated from the Figma mapping. 1 of 11 blocks are
# confirmed decisions; the rest are proposals to review on the page.
_schema: default
title: Partner Program
description: The more you launch, the more you unlock
pageSections:
  - _component: page-sections/heroes/hero-split
    content:
      heading: The more you launch, the more you unlock
      headingSize: xl
      subtext: >-
        Welcome to a Partner Program that rewards good work. Get better margins and less overhead as
        you grow your portfolio.
      subtextSize: xl
      imageSource: /src/assets/images/marketing/hero-partner-program.png
      imageAlt: ''
      imageOverflow: 59
      buttonSections:
        - _component: building-blocks/core-elements/button
          text: Start your free trial
          variant: primary
        - _component: building-blocks/core-elements/button
          text: Book a demo
          iconName: move-right
          iconPosition: after
          variant: text
      reverse: true
    style:
      pattern: pegboard
      haze: true
      backgroundColor: sand
  - _component: page-sections/proof/logo-cloud
    heading: 20,000+ sites shipped
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
    backgroundColor: sand
  - _component: page-sections/explainers/feature-split
    eyebrow: THE PROGRAM
    heading: What is the Partner Program?
    headingSize: lg
    subtext: >-
      We want to reward good work. Every new client you bring on earns points, and the more you
      have, the more benefits you unlock.
    subtextSize: lg
    buttonSections:
      - _component: building-blocks/core-elements/button
        text: Join the Partner Program
        variant: primary
    imageSource: /src/assets/images/marketing/partner-dashboard-panel.png
    imageAlt: The partner dashboard, with a Gold Partner badge on its corner and a card reading 101 points.
    imageAspectRatio: none
    imageRounded: false
    mediaWidth: 628
  - _component: page-sections/proof/testimonial-quote
    variant: static
    quoteSize: lg
    tone: base
    quotes:
      - text: New client sites shipped in **60 minutes** instead of days.
        logoSource: /src/assets/images/marketing/logos/DX.svg
        logoAlt: DX
        logoAspect: 49 / 28
        company: DX
        linkText: Read case study
        accentColor: sunset
        quoteMarks: false
    backgroundColor: dark
    background:
      type: pattern
      pattern: pegboard
      mask: none
    haze:
      - x: 0.4791
        rx: 933px
        'y': 49.8%
        ry: 74.8%
  - _component: page-sections/explainers/feature-grid
    heading: What are the perks?
    headingSize: lg
    alignmentHorizontal: center
    columns: 3
    cardHeight: 334
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
    backgroundColor: dark
  - _component: page-sections/conversion/pricing-tiers
    eyebrow: PARTNER TIERS
    heading: Climb as your portfolio grows
    headingSize: lg
    subtext: >-
      Bring on new clients, move up the tiers, and unlock bigger discounts, dedicated support, and
      more exposure to new leads.
    alignmentHorizontal: start
    subtextSize: lg
    subtextWidth: md
    garden: true
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
        accent: sunset
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
        accent: earth
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
        accent: golden
      - name: Platinum
        description: 200+ points
        features:
          - text: Bronze, Silver, and Gold benefits
            included: true
          - text: 20% off all plans
            included: true
        height: 454
        accent: harbour
    backgroundColor: light-sand
  - _component: page-sections/conversion/pricing-tiers
    cardColor: base
    heading: Pricing plans designed for your clients
    headingSize: lg
    subtext: Handle billing yourself or pass it on to clients, whatever fits the workflow.
    alignmentHorizontal: center
    subtextSize: lg
    subtextWidth: sm
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
    backgroundColor: sand
  - _component: page-sections/conversion/cta-split
    imageFlush: false
    contentCardColor: base
    heading: Enterprise
    headingSize: md
    subtext: We’ll work with you to craft a plan that fits your particular client’s needs.
    subtextSize: lg
    imageReveal: ''
    characters:
      scale: 116
      threadHeight: 34
      insetStart: 27
      insetEnd: 22
      castInsetStart: 14
      castInsetEnd: 8
      seed: 7
      conversationLabel: A client and a developer talking over a plan.
      characters:
        - source: /src/assets/images/marketing/kea.png
          alt: ''
          width: 29
          drop: 0
        - source: /src/assets/images/marketing/tuatara.png
          alt: ''
          width: 31
          drop: 0
      conversation:
        - side: start
          words: 5
        - side: end
          words: 3
        - side: start
          words: 6
        - side: end
          words: 4
    imageSource: ''
    contentCard: true
    buttonSections:
      - _component: building-blocks/core-elements/button
        text: Join the Partner Program
        variant: primary
    paddingVertical: 2xl
    backgroundColor: sand
  - _component: page-sections/conversion/cta-center
    paddingVerticalEnd: 3xl
    heading: Become a CloudCannon Partner
    headingSize: lg
    background:
      type: pattern
      pattern: grid
      mask: fade
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
    paddingVerticalStart: lg
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
    formAction: /partner-program/
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
        multiple: true
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
    imageSource: ''
    backgroundColor: light-sand
  - _component: page-sections/conversion/cta-center
    heading: Keen to collaborate?
    headingSize: lg
    buttonSections:
      - _component: building-blocks/core-elements/button
        text: Our team
        variant: primary
      - _component: building-blocks/core-elements/button
        text: Our values
        iconName: move-right
        iconPosition: after
        variant: text
    paddingVertical: 2xl
    backgroundColor: dark
    cornerStart:
      source: /src/assets/images/marketing/ferns-corner-3806-72622.png
      alt: ''
      width: 23.4
      drop: 4
    cornerEnd:
      source: /src/assets/images/marketing/rocks-corner-3806-72621.png
      alt: ''
      width: 18
      drop: 0.3
---
