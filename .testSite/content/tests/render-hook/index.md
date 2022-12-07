---
title: "Render Hook and page resource metadata"
date: 2022-08-28T15:35:39-07:00
draft: false
disable_range: true
# resources:
# - src: test.jpg
#   title: Title set via metadata
#   params: 
#     alt: Alt set via metadata
testImages:
- id: js-test1
  tests:
    img:
      alt: 'Alt text'
      title: 'Title text'
      class: ['img-fluid', 'lazyload']
--- 
{{< shortcode1a.inline >}}
<div class="col-md-6 render-hook-test" id="js-test1">
  <h2>1. Basic - render hook</h2>
  <p>test.jpg</p>
{{< /shortcode1a.inline >}}
![Alt Text](test1.jpg "Test Title")
{{< shortcode1b.inline >}}
<div id="js-test1-results"></div>
</div>
{{< /shortcode1b.inline >}}
{{< shortcode2a.inline >}}
<div class="col-md-6 render-hook-test" id="js-test1">
  <h2>2. Basic - shortcode</h2>
  <p>test.jpg</p>
{{< /shortcode2a.inline >}}
{{< image src=test2.jpg alt="Alt text" title="Title text" widths=200,400 >}}
{{< shortcode2b.inline >}}
<div id="js-test1-results"></div>
</div>
{{< /shortcode2b.inline >}}
