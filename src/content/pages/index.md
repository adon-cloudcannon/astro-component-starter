---
_schema: default
title: Your Site
pageBlocks:
  - _bookshop_name: wrappers/container
    label: ''
    contentBlocks:
      - _bookshop_name: typography/heading
        text: Welcome to your CloudCannon Starter Component site
        type: h1
        alignX: center
        iconPosition: before
      - _bookshop_name: wrappers/button-group
        buttonBlocks:
          - _bookshop_name: elements/button
            text: View Components
            link: /component-library/
            iconPosition: before
            hideText: false
            variant: primary
            size: lg
          - _bookshop_name: elements/button
            text:
            link:
            iconName:
            iconPosition: before
            hideText: false
            variant: primary
            size: md
        direction: row
        alignX: center
      - _bookshop_name: wrappers/accordion
        label: An accordion
        items:
          - title: How does Skele work?
            contentBlocks:
              - _bookshop_name: typography/rich-text
                text: It works by working!
                alignX: start
              - _bookshop_name: typography/heading
                text: The process
                type: h3
                size: md
                alignX: start
                iconName: adjustments-vertical
                iconPosition: before
          - title: How does Marrow work?
            contentBlocks:
              - _bookshop_name: typography/rich-text
                text: It works by working!
                alignX: start
              - _bookshop_name: typography/heading
                text: The process
                type: h3
                size: md
                alignX: start
                iconName: adjustments-vertical
                iconPosition: before
        openFirst: false
        singleOpen: true
      - _bookshop_name: wrappers/card
        label: A single card
        contentBlocks:
          - _bookshop_name: typography/heading
            text: A definition list
            type: h2
            size:
            alignX: start
            iconName:
            iconPosition: before
          - _bookshop_name: typography/definition-list
            items:
              - title: Df 1
                text: How to do something
              - title: Df 2
                text: How to do something else
              - title: Df 3
                text: How to do something else
            alignX: start
        headerContentBlocks: []
        footerContentBlocks: []
        paddingHorizontal: md
        paddingVertical: lg
        colorScheme: default
        backgroundColor: surface
        backgroundImage:
          source:
          alt:
          positionVertical: top
          positionHorizontal: center
        link:
        rounded: true
        border: false
    maxContentWidth: 2xl
    paddingHorizontal: lg
    paddingVertical: lg
    colorScheme: default
    backgroundImage:
      source: ''
      alt: ''
      positionVertical: top
      positionHorizontal: center
    rounded: false
---
