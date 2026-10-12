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
      cardColor: base
    style:
      backgroundColor: light-sand
      paddingVertical: 2xl

  - _component: page-sections/conversion/pricing-comparison
    content:
      sectionLabel: Feature comparison
      heading:
        heading: Features
        headingLevel: h2
        headingSize: lg
      subtext: ''
      plans:
        - name: Standard
          price: $49/mo
          highlight: true
          buttonText: Start 21-day trial
          buttonLink: /start/
        - name: Team
          price: $300/mo
          buttonText: Start 21-day trial
          buttonLink: /start/
        - name: Enterprise
          price: Custom
          buttonText: Book a call with us
          buttonLink: /contact/
      rows:
        - feature: Users
          values:
            - 3 Users
            - 15 Users
            - Custom user allowance
        - feature: Unlimited Sites
          values:
            - yes
            - yes
            - yes
        - feature: Custom Git syncing
          values:
            - no
            - no
            - yes
        - feature: Automatic site optimizations
          values:
            - yes
            - yes
            - yes
        - feature: Client Sharing
          values:
            - yes
            - yes
            - yes
        - feature: Custom permissions
          values:
            - no
            - 10 Custom groups
            - Unlimited custom groups
        - feature: Content scheduling
          values:
            - yes
            - Advanced content scheduling
            - Advanced content scheduling
        - feature: DAM
          values:
            - yes
            - yes
            - Custom DAM
        - feature: Git LFS
          values:
            - yes
            - yes
            - yes
        - feature: Build Deploys
          values:
            - yes
            - yes
            - yes
        - feature: Authentication
          values:
            - yes
            - yes
            - SSO/SAML authentication
        - feature: Advanced forms
          values:
            - no
            - yes
            - yes
        - feature: Custom forms
          values:
            - no
            - no
            - yes
        - feature: Advanced Site Mounting
          values:
            - no
            - yes
            - yes
        - feature: Custom Site Mounting
          values:
            - no
            - no
            - yes
        - feature: Globalization workflows
          values:
            - yes
            - yes
            - yes
        - feature: Custom branding
          values:
            - yes
            - yes
            - yes
        - feature: Testing domains
          values:
            - yes
            - Custom testing domains
            - Custom testing domains
        - feature: Advanced branching workflows
          values:
            - no
            - yes
            - yes
        - feature: Deploy Previews
          values:
            - no
            - yes
            - yes
        - feature: Single sign-on
          values:
            - no
            - no
            - yes
        - feature: Uptime SLA
          values:
            - no
            - no
            - yes
        - feature: Custom edge rules
          values:
            - no
            - no
            - yes
        - feature: Professional services
          values:
            - no
            - no
            - 3 hours / month
      striped: false
    style:
      backgroundColor: sand
      paddingVertical: 4xl

  - _component: page-sections/conversion/cta-split
    content:
      sectionLabel: Partner program
      heading:
        heading: Are you an agency or freelancer?
        headingLevel: h2
        headingSize: lg
      subtext:
        subtext: Join the CloudCannon Partner Program and get access to the Lite
          plan for your clients.
        subtextSize: lg
      buttonSections:
        - _component: building-blocks/core-elements/button
          text: Learn about our Partner Program
          link: /partner-program/
          variant: text
          iconName: arrow-right
          iconPosition: after
          size: md
      reverse: false
    style:
      backgroundColor: light-sand
      paddingVertical: 4xl

  - _component: page-sections/conversion/cta-center
    content:
      sectionLabel: Migration
      heading:
        heading: Migration support
        headingLevel: h2
        headingSize: lg
      subtext:
        subtext: Our migration team can get your site configured for your ideal
          editing experience, starting at $3,000 per project (USD).
        subtextSize: lg
      alignmentHorizontal: center
      buttonSections:
        - _component: building-blocks/core-elements/button
          text: Learn about our migration services
          link: /migration/
          variant: secondary
          size: md
    style:
      backgroundColor: brand
      paddingVertical: 4xl

  - _component: page-sections/conversion/pricing-tiers
    content:
      sectionLabel: Add-ons
      heading:
        eyebrow: ADD-ONS
        heading: Extend your plan
        headingLevel: h2
        headingSize: lg
      subtext:
        subtext: ''
      tiers:
        - name: Add user or site share
          badgeText: Users
          badgeColor: moss
          description: Add additional users on your Lite, Standard or Team plan,
            including client sharing.
          price: $10
          priceSuffix: /person (USD)
          pricePosition: bottom
        - name: Bandwidth
          badgeText: Hosting
          badgeColor: sunset
          description: >-
            Extend your bandwidth as needed with a 100GB bandwidth package.


            Lite includes 20GB

            Standard includes 110GB

            Team includes 700GB
          price: $15
          priceSuffix: /100 GB (USD)
          pricePosition: bottom
        - name: Custom domains
          badgeText: Hosting
          badgeColor: sunset
          description: >-
            Add an additional domain or subdomain to your plan.


            Lite includes 1 custom domain

            Standard includes 5 custom domains

            Team includes 10 custom domains
          price: $2
          priceSuffix: /month (USD)
          pricePosition: bottom
      cardColor: muted
      cardAlignment: center
    style:
      backgroundColor: dark
      pattern: pegboard
      colorScheme: dark
      lockColorScheme: true
      paddingVertical: 4xl

  - _component: page-sections/explainers/faq-section
    content:
      sectionLabel: FAQ
      heading:
        eyebrow: PRICING
        heading: Frequently asked questions
        headingLevel: h2
        headingSize: lg
      items:
        - title: What happens at the end of my trial?
          contentSections:
            - _component: building-blocks/core-elements/text
              text: Before the end of your trial, we'll send you an email asking
                you to enter your credit card to continue using CloudCannon. If
                no credit card is entered by the end of the trial, your account
                will be put on hold. If you need more time to figure out if
                CloudCannon is right for you, please contact our sales team and
                we will happily extend your trial period.
              size: md
        - title: What counts as a custom domain?
          contentSections:
            - _component: building-blocks/core-elements/text
              text: Any domain or subdomain you point at a CloudCannon site.
              size: md
        - title: How do I know how much bandwidth I'm using?
          contentSections:
            - _component: building-blocks/core-elements/text
              text: Your usage is shown in your account dashboard, broken down
                per site.
              size: md
        - title: When am I invoiced?
          contentSections:
            - _component: building-blocks/core-elements/text
              text: Monthly plans are invoiced each month from the day you
                started, and yearly plans once a year.
              size: md
        - title: Am I able to turn off overages?
          contentSections:
            - _component: building-blocks/core-elements/text
              text: Yes. Contact our support team and we can cap your account
                rather than billing for overages.
              size: md
    style:
      backgroundColor: light-sand
      paddingVertical: 4xl
---
