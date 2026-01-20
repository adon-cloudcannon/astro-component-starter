---
_schema: default
title: Astro Component Starter
pageSections:
  - _component: page-sections/heroes/hero-split
    eyebrow: STEPH STEPHENS
    heading: POSER
    subtext: DEBUT ALBUM OUT NOW
    imageSource: /src/assets/images/poser.jpg
    imageAlt: Hero image
    imageAspectRatio: square
    buttonSections:
      - _component: building-blocks/core-elements/button
        text: STREAM NOW
        link: '/poser/'
        iconName: ''
        iconPosition: before
        hideText: false
        variant: primary
        size: lg
      - _component: building-blocks/core-elements/button
        text: ALBUM INFO
        link: '/releases/'
        iconName:
        iconPosition: after
        hideText: false
        variant: secondary
        size: lg
    reverse: true
    colorScheme: contrast
    backgroundColor: surface
  - _component: page-sections/ctas/cta-center
    heading: Ready to start building?
    subtext: >-
      Browse the complete Astro Component Starter and see live examples of every
      component in action. All components are ready to use in CloudCannon and
      are fully customizable.
    buttonSections:
      - _component: building-blocks/core-elements/button
        text: Explore Components
        link: /component-library/
        iconName: ''
        iconPosition: before
        hideText: false
        variant: primary
        size: md
      - _component: building-blocks/core-elements/button
        text: View in GitHub
        link: https://github.com/CloudCannon/astro-component-starter
        iconName: ''
        iconPosition: before
        hideText: false
        variant: tertiary
        size: md
    colorScheme: contrast
    backgroundColor: surface
    rounded: false
---
