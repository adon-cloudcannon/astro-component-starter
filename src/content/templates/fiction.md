---
title: Fiction
description: Sleek and modern agency template made with Bootstrap
image: https://cc-dam.imgix.net/fiction-image-hero-resized.png
imageAlt: Fiction template
order: 4
collections:
  - editor-friendly
ssgs:
  - hugo
previewUrl: https://scenic-sea.cloudvent.net/
repoUrl: https://github.com/CloudCannon/fiction-hugo-template
gallery:
  - image: https://cc-dam.imgix.net/fiction-image-hero-resized.png
    alt: Hero with single image
  - image: https://cc-dam.imgix.net/fiction-slider-hero-resized.png
    alt: Hero with slider images
  - image: https://cc-dam.imgix.net/fiction-pricing-resized.png
    alt: Pricing cards
  - image: https://cc-dam.imgix.net/fiction-portfolio-resized.png
    alt: Portfolio
  - image: https://cc-dam.imgix.net/fiction-blog-resized.png
    alt: Blog
  - image: https://cc-dam.imgix.net/fiction-contact-form-resized.png
    alt: Contact form
  - image: https://cc-dam.imgix.net/fiction-footer-resized.png
    alt: Footer
---

> **Important**
>
> This template is no longer actively maintained but remains available for reference and learning. For production sites, we recommend our [modern templates](https://cloudcannon.com/templates/).

Template for Hugo. Browse through a [live demo](https://scenic-sea.cloudvent.net/). This theme has been adapted from the MIT-licensed [Fiction Bootstrap template from Theme Fisher](https://themefisher.com/products/fiction-bootstrap-agency-template/).

Fiction was made by [Themefisher](https://themefisher.com/) and converted to Hugo by [CloudCannon](https://cloudcannon.com/), a Jamstack platform for the whole team.

## Features

* Pre-built pages
* Pre-styled components
* Contact form
* Blog with pagination and category pages
* Configurable navigation and footer
* Multiple hero options - single image, image slider and video
* Optimised for editing in [CloudCannon](https://cloudcannon.com/)
* Configurable search engine optimisation
* Search using [Pagefind](https://pagefind.app/)

## Setup

Get a workflow going to see your site's output (with [CloudCannon](https://app.cloudcannon.com/) or Hugo locally).

## Prerequisites
* Hugo [install](https://gohugo.io/getting-started/installing/) (version >= 0.128.0). `brew install hugo`
* Go [install](https://go.dev/learn/). `brew install go`

[Hugo installation documentation](https://gohugo.io/installation/).

### Quickstart
1. In the terminal at the root dir, run: `npm i`
2. Start local development server: `npm run start`

## Editing

Fiction is set up for adding, updating and removing pages, components, posts, portfolio items, company details and footer elements in [CloudCannon](https://app.cloudcannon.com/).

### Company details

* Reused around the site to save multiple editing locations.
* Set in the *Data* / *Company* section.

### Nav/footer details

* Reused around the site to save multiple editing locations.
* Set in the *Data* section with respective names

### Map

To use the google maps functionality within the site you will need to add your api key to *Data* / *Company* under the `google_maps_api_key` variable.

To see more about getting an api key see the [documentation](https://developers.google.com/maps/documentation/javascript/get-api-key).

### Hero component

There are three different hero components that are designed to be used at the top of the index page. They can be changed in the index page using [CloudCannon](https://app.cloudcannon.com/) live editing or locally.

#### Image hero

This component uses a single image behind some heading text

#### Slider hero

This component uses any number of images behind some heading text

#### Video hero

This component uses a video behind some heading text.

- **Desktop/Chrome**: Uses jQuery Vide plugin (existing functionality)
- **Safari/iOS/Mobile**: Uses HTML5 `<video>` element with Safari-specific attributes
