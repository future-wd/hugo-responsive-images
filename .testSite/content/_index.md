---
title: "Tests"
date: 2022-08-28T15:35:39-07:00
draft: false
image:
  renderHook: false
testImages:
- id: js-test1
  title: 1. Basic
  subtitle: Alt and title set
  params:
    alt: Test Image Alt
    title: Test Image Title
  tests:
    img:
      dataSizes: 'auto'
      alt: 'Test Image Alt'
      title: 'Test Image Title'
      dataSizes: 'auto'
      class: ['img-fluid', 'lazyload']
    source: 
      types: ['webp', 'jpeg']
      dataWidths: ['600w', '900w', '1300w']
- id: js-test2
  title: 2. Formats
  subtitle: original (jpeg), png, webp
  params:
    alt: Formats
    formats: [original, png, webp]
  tests: 
    source:
      types: ['webp', 'png', 'jpeg'] 
- id: js-test3
  title: 3. Width and densities
  subtitle: widths 400, densities 1,2,3
  params:
    alt: Width, densities
    width: 400
    densities: [1,2,3]
  tests:
    img:
      width: 400
    source: 
      dataDensities: ['1x', '2x', '3x']
- id: js-test4
  title: 4. Loading auto, sizes 50vw
  subtitle: no lazysizes
  params:
    alt: loading, sizes
    loading: auto
    sizes: 50vw
  tests:
    img: 
      loading: 'auto'
      sizes: '50vw'
      class: ['img-fluid']
      notClass: ['lazysizes']
- id: js-test5
  title: 5. loading auto, sizes lazysizes
  subtitle: lazysizes enabled
  params:
    alt: lazysizes enabled
    loading: auto
    sizes: lazysizes
  tests:
    img: 
      loading: 'auto'
      dataSizes: 'auto'
      class: ['img-fluid', 'lazyload']
- id: js-test6
  title: 6. loading lazy, sizes lazysizes
  subtitle: lazysizes enabled
  params:
    alt: lazysizes enabled
    loading: lazy
    sizes: lazysizes
  tests:
    img:
      loading: 'lazy'
      dataSizes: 'auto'
      class: ['img-fluid', 'lazyload']
- id: js-test7
  title: 7. figure
  subtitle: 
  partial: figure
  params:
    alt: figure
    figureTitle: Figure Title
    figureTitleH: 3
    figureClass: hello
    caption: Figure Caption
    attr: Attribution Text
    attrLink: http://www.author.com
    link: /
  tests:
    img:
      dataSizes: auto
      class: ['figure-img', 'img-fluid', 'lazyload']
    figure:
      class: [figure-image]
    figcaption:
      class: [figure-caption]
- id: js-test8
  title: 8. figure
  subtitle: 
  partial: figure
  params:
    alt: figure
    figureTitle: Figure Title
    figureTitleH: 3
    figureClass: hello
    caption: Figure Caption
    attr: Attribution Text
    attrLink: http://www.author.com
    link: /
  tests:
    img:
      dataSizes: auto
      class: ['img-fluid', 'figure-img', 'lazyload']
    figure:
      class: [figure-image]
    figcaption:
      class: [figure-caption]
--- 

<!-- Image with renderHook: false
![Alt Text](test.jpg "Test Title") -->
