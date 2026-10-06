---
# Generated from the Figma mapping. 3 of 7 blocks are
# confirmed decisions; the rest are proposals to review on the page.
_schema: default
title: AI Ready
description: The CMS your AI tools can actually read
pageSections:
  - _component: page-sections/heroes/hero-split
    heading: The CMS your AI tools can actually read
    headingSize: xl
    subtext: Code, content, and config all sit in one repo as plain files, so agents get the full picture.
    subtextSize: xl
    imageSource: /src/assets/images/marketing/hero-ai-ready.png
    imageAlt: ''
    imageOverflow: 42
    buttonSections:
      - _component: building-blocks/core-elements/button
        text: Start your free trial
        variant: primary
      - _component: building-blocks/core-elements/button
        text: Book a demo
        iconName: arrow-right
        iconPosition: after
        variant: text
    note:
      - text: No credit card · 14-day free trial · No lock-in
        iconName: check
        iconColor: default
    pattern: grid
    haze: true
    backgroundColor: light-sand
  - _component: page-sections/proof/logo-cloud
    heading: WE WORK WITH ALL MODELS
    logos:
      - image: /src/assets/images/marketing/logos/anthropic.svg
        alt: Anthropic
        width: 178
        height: 20
        monochrome: true
      - image: /src/assets/images/marketing/logos/codex.svg
        alt: Codex
        width: 87
        height: 22
        monochrome: true
      - image: /src/assets/images/marketing/logos/gemini.svg
        alt: Gemini
        width: 110
        height: 41
        monochrome: true
      - image: /src/assets/images/marketing/logos/replit.svg
        alt: Replit
        width: 112
        height: 26
        monochrome: true
      - image: /src/assets/images/marketing/logos/openrouter.svg
        alt: OpenRouter
        width: 40
        height: 34
        monochrome: true
    headingPlacement: inline
    backgroundColor: sand
  - _component: page-sections/conversion/cta-center
    heading: Ready, set, code
    headingSize: lg
    subtext: AI agents working on the site have complete context
    subtextSize: lg
    subtextWidth: md
    backgroundColor: dark
    background:
      type: pattern
      pattern: grid
      mask: fade
  - _component: page-sections/explainers/pinned-steps
    eyebrow: ''
    heading: ''
    subtext: ''
    alignmentHorizontal: start
    steps:
      - number: ''
        contentSections:
          - _component: building-blocks/core-elements/heading
            text: One repo, the whole picture
            level: h3
            size: sm
          - _component: building-blocks/core-elements/text
            text: >-
              Point an agent at a CloudCannon project and it sees templates, content, configuration
              and styles sitting next to each other in Git. Markdown, frontmatter, YAML, folder
              structures, and diffs: models have seen it all before, and know how the pieces fit
              together.
            size: lg
        mediaSections:
          - _component: building-blocks/core-elements/image
            source: /src/assets/images/marketing/editor-code-view-1.png
            alt: ''
            decorative: true
      - number: ''
        contentSections:
          - _component: building-blocks/core-elements/heading
            text: The work an agent doesn't have to do first
            level: h3
            size: sm
          - _component: building-blocks/core-elements/text
            text: >-
              With an API-based CMS, reading your content library means authentication, pagination,
              and a separate call for every cross-reference. Relationships between content types
              have to be inferred from responses. That's tokens and time spent reconstructing a
              picture that, in a CloudCannon repo, is already sitting there.
            size: lg
        mediaSections:
          - _component: building-blocks/core-elements/image
            source: /src/assets/images/marketing/editor-code-view-2.png
            alt: ''
            decorative: true
    reverse: false
    mediaWidth: wide
    backgroundColor: dark
    progressColor: pacific
    progressTrackColor: midnight
  - _component: page-sections/proof/testimonial-quote
    variant: static
    quoteSize: sm
    tone: base
    cardWidth: medium
    quotes:
      - text: >-
          You can have lots of concurrent pieces of work: a solutions page, a new case study layout,
          new terms and conditions, a legal section, all on different branches with different agents
          working on them in isolation, **without corrupting your main site.**
        authorName: Ed Stennett
        authorDescription: Head of Growth,
        company: Nomio
        authorImage: /src/assets/images/marketing/ellipse-287.jpg
        authorImageAlt: Ed Stennett
        accentColor: harbour
    backgroundColor: dark
    background:
      type: pattern
      pattern: pegboard
      mask: none
    haze:
      - x: 0.4938
        rx: 933px
        'y': 49.8%
        ry: 74.8%
  - _component: page-sections/conversion/cta-split
    heading: We've already taught agents how to use CloudCannon
    headingSize: lg
    subtext: >-
      Our agent skills are open source. Point your agent at them and it can help to migrate an
      existing site onto CloudCannon, write the config, and set up visual editing, without you
      needing to explain how any of it works first.
    subtextSize: lg
    buttonSections:
      - _component: building-blocks/core-elements/button
        text: Get skills repo
        variant: primary
    backgroundColor: light-sand
    terminal:
      path: ~/marketing-site
      loop: true
      script:
        - run: npx skills add cloudcannon/agent-skills
          done:
            - migrate · configure · visual-editing
        - run: '"add visual editing to this site"'
          done:
            - cloudcannon.config.yaml
            - 12 components made editable
  - _component: page-sections/conversion/cta-split
    heading: Give AI the full picture
    headingSize: lg
    subtext: With CloudCannon the code and content stay in Git, and the repo stays yours.
    subtextSize: lg
    imageReveal: ''
    imageSource: /src/assets/images/marketing/camera-01-1.png
    contentCard: true
    imageAlt: ''
    buttonSections:
      - _component: building-blocks/core-elements/button
        text: Start your free trial
        variant: primary
      - _component: building-blocks/core-elements/button
        text: Book a demo
        iconName: arrow-right
        iconPosition: after
        variant: text
    paddingVertical: 5xl
    backgroundColor: dark-sand
    background:
      type: pattern
      pattern: grid
      mask: none
    camera:
      label: Take a picture
      shots:
        - source: /src/assets/images/marketing/hero-lowmaintenance-01-1.png
          alt: ''
          color: var(--dark-sand)
        - source: /src/assets/images/marketing/screenshot-2026-08-15-at-15-46-59-1-3806-68971.png
          alt: ''
          color: var(--dark-sand)
        - source: /src/assets/images/marketing/screenshot-2026-08-15-at-15-52-30-1-3806-70839.png
          alt: ''
          color: var(--dark-sand)
        - source: /src/assets/images/marketing/thumbsup-01-1.png
          alt: ''
          color: var(--dark-sand)
---
