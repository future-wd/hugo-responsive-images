---
title: "Render Hook and page resource metadata"
date: 2022-08-28T15:35:39-07:00
draft: false
disable_range: true
resources:
- src: test3.jpg
  params: 
    image:
      widths: [100,200, 2000]
      aspect_ratio: [1,1]
- src: test4.jpg
  params: 
    image:
      render_hook: false
# testImages:
# - id: js-test1
#   tests:
#     img:
#       alt: 'Alt text'
#       title: 'Title text'
#       class: ['img-fluid', 'lazyload']
--- 
{{< renderhook1a.inline >}}
<div class="col-md-6 render-hook-test" id="js-test1">
  <h2>1. Basic - render hook</h2>
  <p>test1.jpg</p>
{{< /renderhook1a.inline >}}
![Alt Text](test1.jpg "Test Title")
{{< renderhook1b.inline >}}
<div id="js-test1-results"></div>
</div>
{{< /renderhook1b.inline >}}

{{< shortcode2a.inline >}}
<div class="col-md-6 render-hook-test" id="js-test2">
  <h2>2. Basic - shortcode</h2>
  <p>test2.jpg</p>
{{< /shortcode2a.inline >}}
{{< picture src=test2.jpg alt="Alt text" title="Title text" aspect_ratio=1:1 >}}
{{< shortcode2b.inline >}}
<div id="js-test2-results"></div>
</div>
{{< /shortcode2b.inline >}}




{{< render3a.inline >}}
<div class="col-md-6 render-hook-test" id="js-test3">
  <h2>3. Basic - render hook widths too wide for image</h2>
  <p>test3.jpg</p>
{{< /render3a.inline >}}
![Alt Text](test3.jpg "Test Title")
{{< render3b.inline >}}
<div id="js-test3-results"></div>
</div>
{{< /render3b.inline >}}

{{< renderhook4a.inline >}}
<div class="col-md-6 render-hook-test" id="js-test4">
  <h2>4. Basic - render_hook: false (replicated stock markdown handling of img)</h2>
  <p>test4.jpg</p>
{{< /renderhook4a.inline >}}
![Alt Text](test4.jpg "Test Title")
{{< renderhook4b.inline >}}
<div id="js-test1-results"></div>
</div>
{{< /renderhook4b.inline >}}

{{< shortcode5a.inline >}}
<div class="col-md-6 render-hook-test" id="js-test5">
  <h2>5. Shortcode img & positional parameters</h2>
  <p>test5.jpg</p>
{{< /shortcode5a.inline >}}
{{< img test5.jpg >}}
{{< shortcode5b.inline >}}
<div id="js-test5-results"></div>
</div>
{{< /shortcode5b.inline >}}


{{< shortcode6a.inline >}}
<div class="col-md-6 render-hook-test" id="js-test6">
  <h2>6. Custom shortcode "custom-img"</h2>
  <p>test5.jpg</p>
{{< /shortcode6a.inline >}}
{{< custom-img src=test6.jpg shortcode=img >}}
{{< shortcode6b.inline >}}
<div id="js-test6-results"></div>
</div>
{{< /shortcode6b.inline >}}
