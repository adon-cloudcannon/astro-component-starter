---
title: Justice
description: A simple law firm themed template with testimonials, staff and contact pages.
image: https://cc-dam.imgix.net/community/images/templates/justice/1.jpg
imageAlt: Justice
order: 2
collections:
  - editor-friendly
ssgs:
  - jekyll
  - 11ty
  - hugo
  - nextjs
  - sveltekit
previewUrl: https://plum-dew.cloudvent.net/
repoUrl: https://github.com/CloudCannon/justice-jekyll-bookshop-template
gallery:
  - image: https://cc-dam.imgix.net/community/images/templates/justice/1.jpg
    alt: >-
      Screenshot of Justice theme layout of the front page with a heading and menu on the
      top right ontop of a simple black and white picture of a building
  - image: https://cc-dam.imgix.net/community/images/templates/justice/2.jpg
    alt: >-
      Screenshot of Justice theme layout of the bottom of the front page with a three column
      grid containing testimonials, followed by a testimonial block and a footer
  - image: https://cc-dam.imgix.net/community/images/templates/justice/3.jpg
    alt: >-
      Screenshot of Justice theme layout of a product features page with a heading,
      paragraph and then a full width image
  - image: https://cc-dam.imgix.net/community/images/templates/justice/4.jpg
    alt: >-
      Screenshot of Justice theme layout of the contact page with about info on the left and
      a contact form on the right
  - image: https://cc-dam.imgix.net/community/images/templates/justice/5.jpg
    alt: >-
      Screenshot of Justice theme layout of a blog page full width white blog cards on a
      grey background
---

> **Important**
>
> This template is no longer actively maintained but remains available for reference and learning. For production sites, we recommend our [modern templates](https://cloudcannon.com/templates/).

Law firm themed business template for Jekyll. Browse through a [live demo](https://simple-water.cloudvent.net/).
Increase the web presence of a business or law firm with this configurable theme.

Justice was made by [CloudCannon](http://cloudcannon.com/), the Cloud CMS for Jekyll and Hugo.
The component library is built and maintained for use with [Bookshop](https://github.com/cloudcannon/bookshop/)

Find more templates, themes and step-by-step Jekyll tutorials at [CloudCannon Community](https://cloudcannon.com/community/).

## Features

* Easy theme switching
* Customisable themes
* Live editing with [CloudCannon](http://cloudcannon.com/)
* Component library for website building
* Dark mode
* Fully configurable Website
* Contact form
* Pre-built pages
* Pre-styled components
* Blog
* Post category pages
* Staff and author system
* RSS/Atom feed
* Search engine optimisation

## Setup

1. Open *Website Settings > General Settings*
2. Add your website name and live domain URL
3. Add an author to the Staff Members collection
4. Build and adjust your website locally, or with live visual editing on [CloudCannon](https://app.cloudcannon.com/)
5. Add any remaining options to *Website Settings > General Settings* if required

## Develop

Justice was built with [Jekyll](http://jekyllrb.com/) version 4.2.1, but should support newer versions as well.

Install the dependencies for Bookshop:

~~~bash
$ npm install
~~~

Install the Jekyll dependencies with [Bundler](http://bundler.io/):

~~~bash
$ cd site
$ bundle install
~~~

Run the website:

~~~bash
$ cd ../
$ npm start
~~~

## Editing

Justice is already optimised for adding, updating and removing pages, and components in CloudCannon.

### Posts

* Add, update or remove a post in the *Posts* collection.
* The **Staff Author** field links to members in the **Staff Members** collection.
* Change the defaults when new posts are created in `_posts/_defaults.md`.

### Contact Forms

* Preconfigured to work with CloudCannon, but easily changed to another provider (e.g. [FormSpree](https://formspree.io/)).
* Sends email to the address defined within the component.

### Staff

* Reused around the site to save multiple editing locations.

### Navigation

* Managed as a data file to give clients better access.
* Set in the *Website Settings > Navigation* section.

### Footer

* Managed as a data file to give clients better access.
* Set in the *Website Settings > Footer* section.
