---
# Generated from the Figma mapping. 3 of 7 blocks are
# confirmed decisions; the rest are proposals to review on the page.
_schema: default
title: AI Ready
description: The CMS your AI tools can actually read
pageSections:
  - _component: page-sections/heroes/hero-split
    heading: The CMS your AI tools can actually read
    subtext: Code, content, and config all sit in one repo as plain files, so agents get the full picture.
    subtextSize: xl
    imageSource: /src/assets/images/marketing/screenshot-2026-08-15-at-15-46-59-1-3806-68971.png
    headingSize: xl
    imageOverflow: 42
    background:
      type: pattern
      pattern: grid
      mask: none
    haze:
      - x: 0.1628
        rx: 506px
        'y': 49.6%
        ry: 63.4%
    buttonSections:
      - _component: building-blocks/core-elements/button
        variant: primary
        text: Start your free trial
      - _component: building-blocks/core-elements/button
        variant: text
        iconName: arrow-right
        iconPosition: after
        text: Book a demo
    note:
      - text: No credit card · 14-day free trial · No lock-in
        iconName: check
        iconColor: default
  - _component: page-sections/proof/logo-cloud
    backgroundColor: surface
    logos:
      # The models, in the design's order, each at its own drawn size: the
      # file's viewBox and the size the design draws it at are the same to
      # within a pixel, so there is nothing to scale.
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
    heading: WE WORK WITH ALL MODELS
  - _component: page-sections/conversion/cta-center
    heading: Ready, set, code
    subtext: AI agents working on the site have complete context
    backgroundColor: base
    colorScheme: dark
    lockColorScheme: true
    subtextSize: lg
    subtextWidth: 580
    headingSize: lg
    background:
      type: pattern
      pattern: grid
      mask: fade
  # A pinned stepper, not a split: the design draws one band with a progress
  # bar along its foot, which is what this component is for. The media takes
  # two thirds and the copy one, which is the 803 of 1293 the design gives the
  # editor mockup and the 307 it leaves the paragraph.
  - _component: page-sections/explainers/pinned-steps
    heading: ''
    eyebrow: ''
    subtext: ''
    alignmentHorizontal: start
    # The mockup is on the left and the copy on the right, which is this
    # component's own order rather than its reversed one.
    reverse: false
    mediaWidth: wide
    progressWidth: content
    # #034AD7 and #333333 off the design, which are Pacific and Midnight.
    progressColor: pacific
    progressTrackColor: midnight
    backgroundColor: base
    colorScheme: dark
    lockColorScheme: true
    steps:
      # No number: the design does not draw one on this band.
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
        # Cut out on transparency, with the band's own dark where the panel is
        # solid: it is drawn to sit on this band rather than being a picture of
        # one. Decorative, because the copy beside it says what it shows.
        mediaSections:
          - _component: building-blocks/core-elements/image
            source: /src/assets/images/marketing/editor-code-view-1.png
            alt: ''
            decorative: true
      # Drawn on the canvas rather than in the page frame, as
      # `ai-ready-benefits-slide-2`, which is why neither the section reader
      # nor the crop tool ever saw it.
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
  - _component: page-sections/proof/testimonial-section
    text: >-
      You can have lots of concurrent pieces of work: a solutions page, a new case study layout, new
      terms and conditions, a legal section, all on different branches with different agents working
      on them in isolation, without corrupting your main site.
    authorName: Ed Stennett
    authorDescription: Head of Growth · Nomio
    layout: split
    markPosition: start
    markStyle: plain
    company: Nomio
    linkText: Read case study
    authorImage: /src/assets/images/marketing/ellipse-287.jpg
    background:
      type: pattern
      pattern: dots
      mask: none
    backgroundColor: base
    colorScheme: dark
    lockColorScheme: true
    haze:
      - x: 0.4938
        rx: 933px
        'y': 49.8%
        ry: 74.8%
  - _component: page-sections/conversion/cta-split
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
    heading: We've already taught agents how to use CloudCannon
    subtext: >-
      Our agent skills are open source. Point your agent at them and it can help to migrate an
      existing site onto CloudCannon, write the config, and set up visual editing, without you
      needing to explain how any of it works first.
    subtextSize: lg
    backgroundColor: base
    headingSize: lg
    buttonSections:
      - _component: building-blocks/core-elements/button
        variant: primary
        text: Get skills repo
  - _component: page-sections/conversion/cta-split
    contentCard: true
    paddingVertical: 5xl
    imageSource: /src/assets/images/marketing/camera-01-1.png
    imageReveal: ''
    # Click the camera and it takes one.
    camera:
      label: Take a picture
      # The subjects are four heroes from around the site, all of them
      # cutouts, so the scratched ground shows through behind each one. One
      # colour across all four: the prints are a set, and four different
      # grounds read as four unrelated things rather than one roll of film.
      shots:
        - source: /src/assets/images/marketing/hero-lowmaintenance-01-1.png
          alt: ''
          color: var(--dark-sand)
        # This page's own hero, the kiwi with the burst.
        - source: /src/assets/images/marketing/screenshot-2026-08-15-at-15-46-59-1-3806-68971.png
          alt: ''
          color: var(--dark-sand)
        # High Performance's, which is the motorbike with someone on it.
        - source: /src/assets/images/marketing/screenshot-2026-08-15-at-15-52-30-1-3806-70839.png
          alt: ''
          color: var(--dark-sand)
        # And the pair, back to back.
        - source: /src/assets/images/marketing/thumbsup-01-1.png
          alt: ''
          color: var(--dark-sand)
    heading: Give AI the full picture
    subtext: With CloudCannon the code and content stay in Git, and the repo stays yours.
    subtextSize: lg
    headingSize: lg
    background:
      type: pattern
      pattern: grid
      mask: none
    backgroundColor: muted
    buttonSections:
      - _component: building-blocks/core-elements/button
        variant: primary
        text: Start your free trial
      - _component: building-blocks/core-elements/button
        variant: text
        iconName: arrow-right
        iconPosition: after
        text: Book a demo
---
