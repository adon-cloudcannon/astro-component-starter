---
_schema: default
title: Enterprise
description: Stop juggling websites. Start managing them.
pageSections:
  - _component: page-sections/heroes/hero-split
    content:
      heading:
        heading: Stop juggling websites. Start managing them.
        headingSize: xl
      subtext: >-
        CloudCannon lets you have a high-impact web presence without the maintenance burden. Static
        architecture keeps things fast, secure, and quiet.
      image:
        imageSource: /src/assets/images/marketing/hero-enterprise.png
        imageAlt: ''
        imageOverflow: 151
      buttonSections:
        - _component: building-blocks/core-elements/button
          text: Start your free trial
          variant: primary
        - _component: building-blocks/core-elements/button
          text: Book a demo
          iconName: move-right
          iconPosition: after
          variant: text
      subtextSize: xl
    style:
      pattern: grid
      haze: true
      backgroundColor: light-sand
  - _component: page-sections/proof/logo-cloud
    content:
      heading: SERVING CLIENTS LIKE
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
    style:
      backgroundColor: sand
      headingPlacement: inline
  - _component: page-sections/proof/stat-panel
    content:
      eyebrow: SUCCESS STORY
      heading: Publishing took up to five weeks. Now it takes minutes.
      headingSize: lg
      subtext: >-
        PaperCut moved 4,000 pages and 110 editors onto CloudCannon, and lifted their performance
        score from 14 to 90+.
      subtextSize: lg
      subtextWidth: md
      buttonSections:
        - _component: building-blocks/core-elements/button
          text: View case study
          variant: primary
      imageSource: /src/assets/images/marketing/image-48.png
      imageAlt: The PaperCut Grows site, built on CloudCannon
      panelScratch: moss
      statsPosition: end
      statsAlign: start
      stats:
        - number: 100
          suffix: x
          label: publishing velocity
          iconName: gauge
          iconColor: moss
        - number: 90
          suffix: +
          label: core web vitals score
          iconName: shield-check
          iconColor: moss
        - number: 98
          suffix: '%'
          label: web pages migrated
          iconName: app-window
          iconColor: moss
    style:
      panelImage: ''
  - _component: page-sections/explainers/feature-grid
    content:
      heading: Built for how large teams actually work
      headingSize: lg
      subtext: Benefit from more uptime, faster sites, better SEO, enterprise- grade security, and more.
      subtextSize: lg
      subtextWidth: md
      alignmentHorizontal: center
      cardHeight: 334
      features:
        - title: Site security
          description: SOC2 Type 2 certified for enterprise-grade security
          imageSource: /src/assets/images/marketing/cloudcannon-testing-security-1.png
          imageHeight: 159
          imageAlt: ''
        - title: Asset management
          description: Centralize, control and access approved and optimized assets.
          imageSource: /src/assets/images/marketing/layer-25-1-3806-73633.png
          imageHeight: 151
          imageAlt: ''
        - title: Flexible hosting options
          description: Load instantly and perform consistently under any load.
          imageSource: /src/assets/images/marketing/hosting.png
          imageHeight: 148
          imageAlt: ''
        - title: Translation support
          description: Serve and edit multilingual content across multiple sites.
          imageSource: /src/assets/images/marketing/layer-26-1-3806-73642.png
          imageHeight: 162
          imageAlt: ''
        - title: Custom permissions
          description: Define roles and groups to match your organization structure.
          imageSource: /src/assets/images/marketing/layer-28-1-3806-73647.png
          imageHeight: 180
          imageAlt: ''
        - title: Custom workflows
          description: Customize a fine-grained review process for approvals and publishing.
          imageSource: /src/assets/images/marketing/layer-29-1-3806-73651.png
          imageHeight: 195
          imageAlt: ''
    style:
      backgroundColor: light-sand
  - _component: page-sections/proof/story-carousel
    content:
      heading: Grow your sites, not your headcount.
      headingSize: lg
      subtext: From fast-moving startups to multi-site agencies, teams ship more with CloudCannon.
      subtextSize: lg
      subtextWidth: md
      stories:
        - accentColor: golden
          logoSource: /src/assets/images/marketing/logos/hnry.svg
          logoAlt: Hnry
          logoMonochrome: true
          logoAspect: 78 / 28
          figure: 8x
          label: faster content builds
          linkText: Read story
        - accentColor: harbour
          logoSource: /src/assets/images/marketing/logos/twitch.svg
          logoAlt: Twitch
          logoMonochrome: true
          logoAspect: 126 / 28
          figure: 15+
          label: marketing sites on CloudCannon
          linkText: Read story
        - accentColor: peachy
          logoSource: /src/assets/images/marketing/logos/DX.svg
          logoAlt: DX Developer Experience Insights Platform
          logoMonochrome: true
          logoAspect: 49 / 28
          figure: 400%
          label: increase in leads generated
          linkText: Read story
        - accentColor: moss-350
          logoSource: /src/assets/images/marketing/logos/Papercut.svg
          logoAlt: PaperCut
          logoMonochrome: true
          logoAspect: 90 / 28
          figure: 100x
          label: publishing velocity
          linkText: Read story
        - accentColor: golden
          figure: '90'
          label: average Lighthouse score
          linkText: Read story
      buttonSections:
        - _component: building-blocks/core-elements/button
          text: See how others did it
          variant: primary
    style:
      backgroundColor: dark
      pattern: grid
      fade: top
  - _component: page-sections/explainers/feature-grid
    content:
      heading: Custom plans for enterprise needs
      headingSize: lg
      subtext: >-
        To support the large scale and speed your enterprise needs, we'll tailor your plan to your
        exact specifications so you can enjoy the features that are right for you.
      subtextSize: lg
      subtextWidth: lg
      alignmentHorizontal: center
      columns: 3
      cardHeight: 247
      features:
        - title: Onboarding services
          description: >-
            We’ll guide you through onboarding, with migration help, training, and best-practice
            advice from our engineers.
          accentColor: golden
          imageAlt: ''
        - title: Uptime SLA
          description: We'll keep you online and operational for when it matters most.
          accentColor: peachy
          imageAlt: ''
        - title: Priority support
          description: >-
            Your questions go to the top of the queue, with our support team and engineers in a
            dedicated Slack channel.
          accentColor: sunset
          imageAlt: ''
        - title: Custom permissions
          description: Fine-grained control over user groups and permissions.
          accentColor: harbour
          imageAlt: ''
        - title: Custom edge logic
          description: Dynamic functionality, from geotargeting to A/B testing, with custom edge rules.
          accentColor: pacific
          imageAlt: ''
        - title: Professional services
          description: Get access to the CloudCannon Enterprise Success Team
          accentColor: moss
          imageAlt: ''
    style:
      pattern: grid
      fade: bottom
      haze: true
  - _component: page-sections/conversion/cta-team-member
    content:
      heading: Real humans on support, always
      headingSize: lg
      subtext: >-
        Git underneath, a visual editor on top, with code and content running on one engine. Start
        free in minutes, or book a demo and we’ll walk you through the real thing.
      subtextSize: lg
      member:
        _component: building-blocks/wrappers/team-member
        name: Olivia Nicholson
        role: Head of Content
        imageSource: /src/assets/images/marketing/container-5-3806-73607-2.png
        imageAlt: Olivia Nicholson, Head of Content at CloudCannon
        backgroundColor: pacific
        propSource: /src/assets/images/embellishments/telephone.png
        propWidth: 47
        propAlt: ''
      buttonSections:
        - _component: building-blocks/core-elements/button
          text: Start your free trial
          variant: primary
        - _component: building-blocks/core-elements/button
          text: Talk with us
          iconName: move-right
          iconPosition: after
          variant: text
    style:
      backgroundColor: light-sand
---
