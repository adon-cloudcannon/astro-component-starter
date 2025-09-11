---
_schema: default
title: Your Site
pageBlocks:
  - _bookshop_name: wrappers/container
    label: ''
    contentBlocks:
      - _bookshop_name: primitives/counter
        number: 100
        prefix: $
        suffix: NZD
        horizontalAlignment: center
      - _bookshop_name: primitives/definition-list
        items:
          - title: A list item
            text: Here's some text
          - title: A list item2
            text: Here's some text again
          - title: A list item 3
            text: Here's some text Another one
        horizontalAlignment: start
      - _bookshop_name: primitives/divider
        padding: lg
      - _bookshop_name: primitives/embed
        source: https://community.cloudcannon.com/
        title: Community is everything
        aspectRatio: widescreen
      - _bookshop_name: primitives/heading
        text: >-
          A *heading* <u>and</u> <sub>some</sub> <sup>formatting</sup> <a
          href="https://community.cloudcannon.com/" title="Commmmmmmunity"
          target="_blank" rel="noopener">Hello</a>?
        type: h2
        size: 6xl
        align: start
        iconName: academic-cap
        iconPosition: after
      - _bookshop_name: primitives/icon
        name: chart-bar
        size: lg
        background: subtle
      - _bookshop_name: primitives/list
        items:
          - text: A list item
            icon: adjustments-horizontal
          - text: A list item
            icon: chat-bubble-oval-left
        direction: vertical
        horizontalAlignment: start
        size: xl
      - _bookshop_name: primitives/rich-text
        text: >-
          I **love** to make *trees*. You <a href="https://bobrosslipsum.net/"
          title="Bob Ross" target="_blank" rel="noopener">didn't</a> know you
          had so much power, did you? Let me tell you what I've got going on up
          here. Don't be afraid of this big brush.


          > If there's a secret to anything, it's practice. Create that little
          fuzzy look. Hit it, and get away from it. So many things you can
          create.


          * A lsit

          * Another list

          * Another list


          1. A numbered list

          2. Another list item

          3. Antoerh one
        align: start
      - _bookshop_name: primitives/simple-text
        text: >-
          **Just** let it *work* around <u>and</u> play. <s>That's</s>
          <sub>the</sub> fun part of this whole technique. We're
          <sup>ready</sup> to get <a href="https://bobrosslipsum.net/"
          title="Ross Bobb" target="_blank" rel="noopener">serious</a> with
          this. Enough of that.


          Don't just cover it all up -- leave these spots! We want this
          swirling, churning actions here. We don't want to overload it, just a
          little bit. Let your imagination wander around while you're doing
          these things.
        align: start
        size: md
      - _bookshop_name: primitives/smart-image
        src:
        alt:
        rounded: false
        aspectRatio:
        positionVertical: center
        positionHorizontal: center
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
