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
--- 

<!-- Image with renderHook: false
![Alt Text](test.jpg "Test Title") -->
