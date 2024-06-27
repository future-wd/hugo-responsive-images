---
title: "Page Resources"
date: 2022-08-28T15:35:39-07:00
draft: false
resources: # for test 8 (metadata)
- src: test8.jpg
  params:
    image:
      alt: Alt set via metadata
      title: Title set via metadata
testImages:
- id: js-test1
  title: 1. Basic
  subtitle: Alt and title set
  params:
    src: test1.jpg
    alt: Test Image Alt
    title: Test Image Title
    loading: lazysizes
  tests:
    img:
      dataSizes: 'auto'
      alt: 'Test Image Alt'
      title: 'Test Image Title'
      dataSizes: 'auto'
      class: ['img-fluid', 'lazyloaded', lazyautosizes]
    source: 
      types: ['webp', 'jpeg']
      dataWidths: ['600w', '900w', '1300w']
- id: js-test2
  title: 2. Formats
  subtitle: original (jpeg), png, webp
  params:
    src: test2.jpg
    alt: Formats
    formats: [original, png, webp]
  tests: 
    source:
      types: ['webp', 'png', 'jpeg'] 
- id: js-test2a
  title: 2a. Formats - one format only, other than original
  subtitle: webp and png (different to original format)
  params:
    src: test2.jpg
    alt: Formats
    formats: [webp, png]
  tests: 
    source:
      types: ['original', 'webp'] 
- id: js-test3
  # title: 3. Width and densities
  title: 3
  subtitle: widths 400, densities 1,2,3. 
  params:
    src: test3.jpg
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
    src: test4.jpg
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
  title: 5. loading lazy, sizes 60vw
  subtitle: no lazysizes
  params:
    src: test5.jpg
    alt: no lazysizes
    loading: lazy
    sizes: 60vw
  tests:
    img: 
      loading: lazy
      sizes: 60vw
      class: [img-fluid]
- id: js-test6
  title: 6. loading lazysizes, sizes 50vw
  subtitle: lazysizes enabled
  params:
    src: test6.jpg
    alt: lazysizes enabled
    loading: lazysizes
    sizes: 50vw
  tests:
    img:
      sizes: 50vw
      class: ['img-fluid', 'lazyloaded']
- id: js-test7
  title: 7. figure
  subtitle: 
  partial: figure
  params:
    src: test7.jpg
    alt: figure
    figcaption_title: Figure Title
    figcaption_title_h: 3
    caption: Figure Caption, including comma
    attr: Attribution Text
    attr_link: http://www.author.com
    link: /
  tests:
    img:
      dataSizes: auto
      class: ['figure-img', 'img-fluid', 'lazyloaded']
    figure:
      class: [figure]
    figcaption:
      class: [figure-caption]
- id: js-test7a
  title: 7a. figure external link
  subtitle: 
  partial: figure
  params:
    src: test7.jpg
    alt: figure
    figcaption_title: Figure Title
    figcaption_title_h: 3
    caption: Figure Caption, including comma
    attr: Attribution Text
    attr_link: http://www.author.com
    link: http://www.google.com
  tests:
    img:
      dataSizes: auto
      class: ['figure-img', 'img-fluid', 'lazyloaded']
    figure:
      class: [figure]
    figcaption:
      class: [figure-caption]
- id: js-test8
  title: 8. Image metadata
  subtitle: title and alt set in markup metadata
  params:
    src: test8.jpg
  tests:
    img:
      title: Title set via metadata
      alt: Alt set via metadata
- id: js-test9
  title: 9. Standard resize, larger than original width. orig width 1920px
  subtitle: Width 900, 1200, 2000 down to 1920
  params:
    src: test9.jpg
    alt: Test Image Alt
    title: Test Image Title
    widths: [900, 1200, 2000]
  tests:
    source: 
      dataWidths: ['900w', '1200w', '1920w']
- id: js-test10
  title: 10. aspect_ratio 3:4, larger than original width/height. orig width 1920px
  subtitle: Width 200, 400, 900 down to  607
  params:
    src: test10.jpg
    alt: Test Image Alt
    title: Test Image Title
    widths: [200, 400, 900]
    aspect_ratio: "3:4"
    anchor: TopLeft
  tests:
    source: 
      dataWidths: ['200w', '400w', '607w']
- id: js-test11
  title: 11. aspect ratio, fit=contain
  subtitle: Width 900, 1200, 2000 down to 1920
  params:
    src: test11.jpg
    alt: Test Image Alt
    title: Test Image Title
    widths: [900, 1200, 2000]
    aspect_ratio: "1:1"
    fit: contain
  tests:
    source: 
      dataWidths: ['900w', '1200w', '1920w']
- id: js-test12
  title: 12. aspect ratio, fit=fill
  subtitle: Width 900, 1200, 2000 down to 1920
  params:
    src: test11.jpg
    alt: Test Image Alt
    title: Test Image Title
    widths: [900, 1200, 2000]
    aspect_ratio: 1:1
    fit: fill
  tests:
    source: 
      dataWidths: ['900w', '1200w', '1920w']
- id: js-test13
  title: 13. Image processing options
  subtitle: 
  params:
    src: test13.jpg
    alt: Test Image Alt
    title: Test Image Title
    quality: 90
    rotate: 180
    resample_filter: Box
    hint: photo
    anchor: TopLeft
    background_color: "#fff"
  tests:
    source: 
      dataWidths: ['200w', '400w', '607w']
- id: js-test14
  title: 14. Placeholder dominant
  subtitle: 
  params:
    src: test14.jpg
    alt: Test Image Alt
    title: Test Image Title
    placeholder: dominant
- id: js-test15
  title: 15. Duplicate format (original, webp for webp src)
  subtitle: 
  params:
    src: webp-test.webp
    alt: Test Image Alt
    title: Test Image Title
--- 
