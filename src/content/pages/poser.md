---
_schema: default
title: Poser
pageSections:
  - _component: page-sections/builders/custom-section
    label: ''
    contentSections:
      - _component: building-blocks/wrappers/split
        label: ''
        firstColumnContentSections:
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
                    text: STREAM ON SOUNDCLOUD
                    iconName: social/soundcloud
                    iconColor: default
                direction: vertical
                alignX: start
                size: 2xl
            maxContentWidth:
            paddingHorizontal: md
            paddingVertical: sm
            colorScheme: contrast
            backgroundColor: base
            backgroundImage:
              source:
              alt:
              positionVertical: top
              positionHorizontal: center
            link: https://soundcloud.com/stephstephens/sets/poser
            rounded: false
            border: false
            showBeforeAfter: false
            beforeContentSections: []
            afterContentSections: []
          - _component: building-blocks/wrappers/card
            label:
            contentSections:
              - _component: building-blocks/core-elements/list
                items:
                  - _component: building-blocks/core-elements/list-item
                    text: STREAM ON APPLE MUSIC
                    iconName: social/apple
                    iconColor: default
                direction: vertical
                alignX: start
                size: 2xl
            maxContentWidth:
            paddingHorizontal: md
            paddingVertical: sm
            colorScheme: contrast
            backgroundColor: base
            backgroundImage:
              source:
              alt:
              positionVertical: top
              positionHorizontal: center
            link: https://music.apple.com/ca/album/poser/1869494094
            rounded: false
            border: false
            showBeforeAfter: false
            beforeContentSections: []
            afterContentSections: []
          - _component: building-blocks/wrappers/card
            label:
            contentSections:
              - _component: building-blocks/core-elements/list
                items:
                  - _component: building-blocks/core-elements/list-item
                    text: STREAM ON AMAZON MUSIC
                    iconName: social/amazon-music
                    iconColor: default
                direction: vertical
                alignX: start
                size: 2xl
            maxContentWidth:
            paddingHorizontal: md
            paddingVertical: sm
            colorScheme: contrast
            backgroundColor: base
            backgroundImage:
              source:
              alt:
              positionVertical: top
              positionHorizontal: center
            link: https://music.amazon.ca/albums/B0GH5Z5FBN
            rounded: false
            border: false
            showBeforeAfter: false
            beforeContentSections: []
            afterContentSections: []
        secondColumnContentSections:
          - _component: building-blocks/core-elements/embed
            html: >-
              <iframe data-testid="embed-iframe" style="border-radius:12px"
              src="https://open.spotify.com/embed/album/27qa4dN1FKElFa0WfvZ2LN?utm_source=generator&theme=0"
              width="100%" height="352" frameBorder="0" allowfullscreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen;
              picture-in-picture" loading="lazy"></iframe>
            aspectRatio: portrait
        distributionMode: fixed-flexible
        fixedWidth: 400
        minSplitWidth: 300
        verticalAlignment: top
        reverse: false
        reverseOrderOnMobile: false
        gap: 2xl
    maxContentWidth: 2xl
    paddingHorizontal: md
    paddingVertical: 3xl
    colorScheme: contrast
    backgroundColor: surface
    backgroundImage:
      source: ''
      alt: ''
      positionVertical: top
      positionHorizontal: center
    rounded: false
---
