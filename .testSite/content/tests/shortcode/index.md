---
title: "Shortcode"
date: 2022-08-28T15:35:39-07:00
draft: true
disableRange: true
testImages:
- id: js-test1
  title: 1. Basic
  subtitle: Alt and title set
  tests:
    img:
      alt: 'Alt text'
      title: 'Title text'
      class: ['img-fluid', 'lazyloaded', lazyautosizes]
- id: js-test2
  title: 1. Basic
  subtitle: Alt and title set
  tests: 
    source:
      types: ['webp', 'png', 'jpeg'] 
--- 

{{< shortcode1.inline >}}
<div class="col-md-6" id="js-test1">
  <h2>1. Basic</h2>
  <p>test.jpg</p>
{{< /shortcode1.inline >}}

{{< image src="test1.jpg" alt="Alt text" title="Title text" >}}

{{< shortcode2.inline >}}
<div id="js-test1-results"></div>
</div>
{{< /shortcode2.inline >}}
