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
                text: >-
                  <a href="https://soundcloud.com/stephstephens/sets/poser"
                  target="_blank" rel="noopener">STREAM ON SOUNDCLOUD</a>
                iconName: social/soundcloud
                iconColor: default
              - _component: building-blocks/core-elements/list-item
                text: STREAM ON APPLE MUSIC
                iconName: social/apple
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
