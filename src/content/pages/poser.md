---
_schema: default
title: Poser
pageSections:
  - _component: page-sections/builders/custom-section
    label: ''
    contentSections:
      - _component: building-blocks/core-elements/image
        source: /src/assets/images/poser-album-cover.png
        alt: ''
        rounded: true
        aspectRatio: square
        positionVertical: center
        positionHorizontal: center
        priority: false
      - _component: building-blocks/wrappers/card
        label:
        contentSections:
          - _component: building-blocks/core-elements/list
            items:
              - _component: building-blocks/core-elements/list-item
                text: List item
                iconName: social/soundcloud
                iconColor: default
            direction: vertical
            alignX: start
            size: 2xl
        maxContentWidth:
        paddingHorizontal: sm
        paddingVertical: sm
        colorScheme:
        backgroundColor: base
        backgroundImage:
          source:
          alt:
          positionVertical: top
          positionHorizontal: center
        link:
        rounded: false
        border: false
        showBeforeAfter: false
        beforeContentSections: []
        afterContentSections: []
    maxContentWidth: xs
    paddingHorizontal: md
    paddingVertical: md
    colorScheme: contrast
    backgroundColor: surface
    backgroundImage:
      source: ''
      alt: ''
      positionVertical: top
      positionHorizontal: center
    rounded: false
---
