---
title: "Render Hook and page resource metadata"
date: 2022-08-28T15:35:39-07:00
draft: false
disableRange: true
resources:
- src: test.jpg
- src: test1.jpg
  title: Title set via metadata
  params: 
    alt: Alt set via metadata
testImages:
- id: js-test1
  title: 1. Basic
  subtitle: Alt and title set
  tests:
    img:
      alt: 'Alt text'
      title: 'Title text'
      class: ['img-fluid', 'lazyload']
--- 
{{< shortcode1.inline >}}
<div class="col-md-6 render-hook-test" id="js-test1">
  <h2>1. Basic</h2>
  <p>test.jpg</p>
{{< /shortcode1.inline >}}
![Alt Text](test.jpg "Test Title")
{{< shortcode2.inline >}}
<div id="js-test1-results"></div>
</div>
{{< /shortcode2.inline >}}
