---
_schema: default
title: Astro Component Starter
pageSections:
  - _component: page-sections/heroes/hero-split
    eyebrow: STEPH STEPHENS
    heading: POSER
    subtext: DEBUT ALBUM OUT NOW
    imageSource: /src/assets/images/poser-album-cover.png
    imageAlt: Hero image
    imageAspectRatio: square
    buttonSections:
      - _component: building-blocks/core-elements/button
        text: STREAM NOW
        link: /poser/
        iconName: ''
        iconPosition: before
        variant: primary
        size: lg
      - _component: building-blocks/core-elements/button
        text: ALBUM INFO
        link: /releases/
        iconName:
        iconPosition: after
        hideText: false
        variant: secondary
        size: lg
    reverse: true
    colorScheme: contrast
    backgroundColor: surface
  - _component: page-sections/builders/custom-section
    label: ''
    contentSections:
      - _component: building-blocks/core-elements/embed
        html: >-
          <iframe width="560" height="315"
          src="https://www.youtube.com/embed/IZT6R8PPBqI?si=tONhH_KBpG2MtMvm"
          title="YouTube video player" frameborder="0" allow="accelerometer;
          autoplay; clipboard-write; encrypted-media; gyroscope;
          picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen></iframe>
        aspectRatio: widescreen
      - _component: building-blocks/core-elements/embed
        html: >-
          <iframe width="560" height="315"
          src="https://www.youtube.com/embed/QYpkSl615_0?si=tKPg80BWSIFmh5jn"
          title="YouTube video player" frameborder="0" allow="accelerometer;
          autoplay; clipboard-write; encrypted-media; gyroscope;
          picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen></iframe>
        aspectRatio: widescreen
    maxContentWidth: lg
    paddingHorizontal: md
    paddingVertical: 3xl
    colorScheme: contrast
    backgroundColor: base
    backgroundImage:
      source: ''
      alt: ''
      positionVertical: top
      positionHorizontal: center
    rounded: false
---
