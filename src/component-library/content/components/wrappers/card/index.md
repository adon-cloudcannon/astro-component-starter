---
title: Card
description: A container component that provides card layout with background options, padding controls, and optional link.
order: 2
slots:
  - title: default
    description: The contents for the body of the Card.
    fallback_for: contentBlocks
    child_component:
  - title: header
    description: The contents of header of the Card.
    fallback_for: headerContentBlocks
    child_component:
  - title: footer
    description: The contents of footer of the Card.
    fallback_for: footerContentBlocks
    child_component:
examples:
  - slugs:
      - link
  - slugs:
      - border
      - border-none
  - title: "Padding Options"
    slugs:
      - padding-xs
      - padding-sm
      - padding-md
      - padding-lg
      - padding-xl
      - padding-2xl
    size: md
  - title: "Background Options"
    slugs:
      - background-accent
      - background-highlight
      - background-surface
      - background-base
      - background-none
    size: md
  - title: "Corner Options"
    slugs:
      - rounded
      - rounded-none
    size: md
  - title: "Background image"
    slugs:
      - bg-image-position-top-left
      - bg-image-position-center-center
      - bg-image-position-bottom-right
    size: md
---
