---
_schema: default
title: Git
description: Everything lives in the repo, not a database.
pageSections:
  - _component: page-sections/heroes/hero-split
    content:
      heading:
        heading: Everything lives in the repo, not a database.
        headingSize: xl
      subtext: >-
        CloudCannon reads and writes directly to your Git repo, so every change is tracked, every
        version is recoverable, access it with any tool.
      image:
        imageSource: /src/assets/images/marketing/hero-git.png
        imageAlt: ''
        imageOverflow: 119
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
    style:
      backgroundColor: sand
      headingPlacement: inline
  - _component: page-sections/conversion/cta-center
    content:
      heading: What is a Git-based CMS?
      headingSize: lg
      subtext: >-
        A Git-based CMS stores your content as files in a Git repository instead of in a database.
        Your team edits through a visual interface, and every change is committed to the repo like
        any other work. The site builds from those files using whatever static site generator you
        already use.
      subtextSize: lg
      subtextWidth: xl
  - _component: page-sections/proof/testimonial-quote
    content:
      variant: static
      quoteSize: sm
      cardWidth: medium
      quotes:
        - text: >-
            Having that flexibility of having everything live in a Git repository is pretty amazing.
            **We don’t have to worry about a separate database**, or any other pieces in the mix,
            it’s dead simple.
          authorName: Justin Parsons
          authorDescription: Director of Front-End Development,
          company: Insight Creative, Inc
          logoSource: /src/assets/images/marketing/logos/insight-creative.svg
          logoAlt: Insight Creative
          logoAspect: 214 / 71
          linkText: Read case study
          accentColor: sunset
    style:
      backgroundColor: dark
      haze: true
  - _component: page-sections/conversion/cta-center
    content:
      eyebrow: HOW IT WORKS
      heading: Here’s the whole setup
      headingSize: lg
      subtext: >-
        Whether it's three client sites or three hundred, another site is another repo. The
        maintenance doesn't come with it.
      subtextSize: lg
      subtextWidth: md
    style:
      backgroundColor: dark
  - _component: page-sections/explainers/timeline-section
    content:
      layout: rail
      entries:
        - title: Connect your Git repo.
          body: Every push builds your site.
          accentColor: moss
          iconName: git-pull-request-arrow
        - title: Build your components
          body: Set what's editable, down to the field.
          accentColor: harbour
          iconName: component
        - title: Hand it over.
          body: Content teams edit on the page, with a live preview they can share.
          accentColor: sunset
          iconName: app-window-mac
        - title: Everything is a commit
          body: Branch it, review it, roll it back.
          accentColor: golden
          iconName: rotate-ccw-clock
    style:
      backgroundColor: dark
  - _component: page-sections/explainers/pinned-steps
    content:
      eyebrow: ''
      heading: ''
      subtext: ''
      steps:
        - contentSections:
            - _component: building-blocks/core-elements/simple-text
              text: GIT FOR DEVELOPERS
              size: sm
              class: eyebrow
            - _component: building-blocks/core-elements/heading
              text: You already trust Git with your code
              level: h2
              size: sm
            - _component: building-blocks/core-elements/text
              text: >-
                Your content gets the same treatment: branches, commits, reviews, and a history you
                can walk back through. You keep building locally, with the SSG and tooling you
                already use.
              size: lg
            - _component: building-blocks/core-elements/button
              text: Learn more
              iconName: move-right
              textColor: sunset
              iconPosition: after
              variant: text
          mediaSections: []
        - contentSections:
            - _component: building-blocks/core-elements/simple-text
              text: GIT FOR EDITORS
              size: sm
              class: eyebrow
            - _component: building-blocks/core-elements/heading
              text: They don’t want to learn Git. They don’t have to.
              level: h2
              size: sm
            - _component: building-blocks/core-elements/text
              text: >-
                Editors work on the page itself and see the change before it goes live. On the
                surface it’s just a page with editable parts. Underneath it’s all branches and
                commits, and every version sits in Git.
              size: lg
            - _component: building-blocks/core-elements/button
              text: Learn more
              iconName: move-right
              textColor: sunset
              iconPosition: after
              variant: text
          mediaSections: []
        - contentSections:
            - _component: building-blocks/core-elements/simple-text
              text: GIT FOR AI AGENTS
              size: sm
              class: eyebrow
            - _component: building-blocks/core-elements/heading
              text: Agents have full context
              level: h2
              size: sm
            - _component: building-blocks/core-elements/text
              text: >-
                Point your coding agent at the project and it sees everything: code, content and
                config as plain files in one repo. No API to learn first, no content stuck behind an
                endpoint.
              size: lg
            - _component: building-blocks/core-elements/button
              text: Learn more
              iconName: move-right
              textColor: sunset
              iconPosition: after
              variant: text
          mediaSections: []
      reverse: true
      mediaWidth: wide
      progressColor: moss
      progressTrackColor: gray-550
      numbered: true
    style:
      backgroundColor: dark
      pattern: grid
      fade: bottom
  - _component: page-sections/proof/testimonial-quote
    content:
      variant: static
      quoteSize: sm
      tone: light
      cardWidth: medium
      bordered: true
      quotes:
        - text: >-
            It’s important to me that CloudCannon is a Git-based CMS. I hate having a vendor lock
            with API-based CMSs — **how can I trust anyone else with our data?**
          authorName: Alexander Luttringer
          authorDescription: Technical Director,
          company: Croissant & Baguette
          authorImage: /src/assets/images/marketing/ellipse-288.jpg
          authorImageAlt: Alexander Luttringer
          accentColor: pacific
    style:
      backgroundColor: sand
      pattern: pegboard
      fade: bottom
  - _component: page-sections/conversion/cta-center
    content:
      heading: Your content is yours
      headingSize: lg
      subtext: >-
        Markdown, YAML and JSON, in a repo you already own. You stay because it works, not because
        you're stuck.
      subtextSize: lg
      subtextWidth: md
      buttonSections:
        - _component: building-blocks/core-elements/button
          text: Get skills repo
          variant: primary
      imageWidth: full
      imageScratch: kiwi
      imageSource: /src/assets/images/marketing/own-content-combined.png
      imageAlt: A commit history beside a card listing content, code and commits
    style:
      backgroundColor: light-sand
  - _component: page-sections/explainers/feature-grid
    content:
      heading: Fits the way you already build
      headingSize: lg
      subtext: Connect your repo, keep your tooling, and add a visual editor on top.
      subtextSize: lg
      subtextWidth: md
      alignmentHorizontal: center
      cardHeight: 334
      features:
        - title: Git providers
          description: Connect to GitHub, GitLab, or Bitbucket
          imageSource: /src/assets/images/marketing/git-plug-1.png
          imageHeight: 169
          imageAlt: ''
        - title: Framework support
          description: Keep the static site generator and tooling you already use
          imageSource: /src/assets/images/marketing/cloudcannon-testing-speed-1.png
          imageHeight: 160
          imageAlt: ''
        - title: Branch previews
          description: Share a hosted preview from any branch before publishing
          imageSource: /src/assets/images/marketing/api-1.png
          imageHeight: 176
          imageAlt: ''
        - title: Two workflows
          description: Run local development while everyone else edits visual
          imageSource: /src/assets/images/marketing/context-1.png
          imageHeight: 175
          imageAlt: ''
        - title: Portfolio scale
          description: Run one site or a whole enterprise portfolio
          imageSource: /src/assets/images/marketing/low-maintenence-3806-74347.png
          imageHeight: 160
          imageAlt: ''
        - title: Enterprise controls
          description: Meet requirements with the user permissions SAML and SOC2
          imageSource: /src/assets/images/marketing/layer-29-1-3806-74351.png
          imageHeight: 195
          imageAlt: ''
    style:
      backgroundColor: light-sand
  - _component: page-sections/conversion/cta-split
    content:
      heading: Take a peek under the hood
      headingSize: lg
      subtext: >-
        Git underneath, a visual editor on top, with code and content running on one engine. Start
        free in minutes, or book a demo and we’ll walk you through the real thing.
      subtextSize: lg
      imageRevealLabel: Open and close the truck's hood
      imageReveal: /src/assets/images/marketing/cloudcannon-truck-open-1.png
      imageSource: /src/assets/images/marketing/cloudcannon-truck-closed-1.png
      imageOverflow: 334
      imageAlt: ''
      buttonSections:
        - _component: building-blocks/core-elements/button
          text: Start your free trial
          variant: primary
        - _component: building-blocks/core-elements/button
          text: Book a demo
          iconName: move-right
          iconPosition: after
          variant: text
    style:
      backgroundColor: pacific
---
