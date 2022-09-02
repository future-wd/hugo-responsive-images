---
title: "Page resources"
date: 2022-08-28T15:35:39-07:00
draft: false
menu: main
type: tests
test_image: test.jpg
image:
  renderHook: false
testImages:
- id: js-test1
  title: 1. Basic
  subtitle: Alt and title set
  params:
    alt: Test Image Alt
    title: Test Image Title
- id: js-test2
  title: 2. Formats
  subtitle: original (jpeg), png, webp
  params:
    alt: Formats
    formats: [original, png, webp]
- id: js-test3
  title: 3. Width and densities
  subtitle: widths 400, densities 1,2,3
  params:
    alt: Width, densities
    width: 400
    densities: [1,2,3]
- id: js-test4
  title: 4. Loading auto, sizes 50vw
  subtitle: no lazysizes
  params:
    alt: loading, sizes
    loading: auto
    sizes: 50vw
- id: js-test5
  title: 5. loading auto, sizes lazysizes
  subtitle: lazysizes enabled
  params:
    alt: lazysizes enabled
    loading: auto
    sizes: lazysizes
- id: js-test6
  title: 6. loading lazy, sizes lazysizes
  subtitle: lazysizes enabled
  params:
    alt: lazysizes enabled
    loading: lazy
    sizes: lazysizes
--- 

<!-- Image with renderHook: false
![Alt Text](test.jpg "Test Title") -->
