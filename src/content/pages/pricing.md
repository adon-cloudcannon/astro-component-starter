---
_schema: default
title: Pricing
description: Plans and pricing for CloudCannon.
pageSections:
  - _component: page-sections/heroes/page-header
    content:
      heading:
        eyebrow: PRICING
        heading: Plans that scale with your website
        headingLevel: h1
        headingSize: xl
      subtext:
        subtext: Every plan includes unlimited sites and Git syncing, so teams of
          any size can start building straight away.
        subtextSize: lg
        subtextWidth: md
      showBreadcrumbs: false
      alignmentHorizontal: center
    style:
      backgroundColor: light-sand
      pattern: grid
      fade: none
      paddingVertical: 4xl

  - _component: page-sections/conversion/pricing-tiers
    content:
      sectionLabel: Plans
      heading:
        heading: ''
      subtext:
        subtext: ''
      showAnnualPricing: true
      monthlyLabel: Monthly
      annualLabel: Yearly
      defaultInterval: annual
      tiers:
        - name: Standard
          description: For small teams who want to use our core features.
          price: $49
          priceSuffix: /month
          annualPrice: $49
          annualPriceSuffix: /month
          badgeText: Recommended
          highlight: true
          buttonText: Start 21-day trial
          buttonLink: /start/
          pricePosition: top
          features:
            - text: Unlimited sites
              included: true
            - text: 3 users
              included: true
            - text: Git syncing
              included: true
            - text: Visual editing
              included: true
            - text: Standard support
              included: true
            - text: Default permissions
              included: true
        - name: Team
          description: For teams with more advanced editing workflows.
          price: $300
          priceSuffix: /month
          annualPrice: $300
          annualPriceSuffix: /month
          buttonText: Start 21-day trial
          buttonLink: /start/
          pricePosition: top
          features:
            - text: Unlimited sites
              included: true
            - text: 15 users
              included: true
            - text: Branching workflows
              included: true
            - text: Advanced content scheduling
              included: true
            - text: Priority support
              included: true
            - text: Custom permissions
              included: true
        - name: Enterprise
          description: For large organizations with advanced compliance and
            security requirements.
          buttonText: Book a call with us
          buttonLink: /contact/
          pricePosition: top
          features:
            - text: Unlimited sites
              included: true
            - text: Custom user allowance
              included: true
            - text: Onboarding services
              included: true
            - text: SSO/SAML authentication
              included: true
            - text: Dedicated support
              included: true
            - text: Custom permissions
              included: true
    style:
      cardColor: base
      backgroundColor: light-sand
      paddingVertical: 2xl
---
