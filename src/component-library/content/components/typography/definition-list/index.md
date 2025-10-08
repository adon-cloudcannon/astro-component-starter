---
title: Definition List
slots:
  - title: default
    description: The content inside the DefinitionList.
    fallback_for: items
    child_component:
      name: DefinitionListItem
      props:
        - "text/slot"
        - "title/slot(title)"
examples:
  - slugs:
      - alignment-start
      - alignment-center
      - alignment-end
    title: AlignX
    size: md
---
