# Hugo responsive images  [<img src="https://d33wubrfki0l68.cloudfront.net/c38c7334cc3f23585738e40334284fddcaf03d5e/2e17c/images/hugo-logo-wide.svg" align="right" width="250">](https://gohugo.io/)

[![GitHub License](https://img.shields.io/github/license/future-wd/hugo-responsive-images?style=flat-square)](https://github.com/future-wd/hugo-responsive-images/blob/master/LICENSE)
[![GitHub release (latest SemVer including pre-releases)](https://img.shields.io/github/v/release/future-wd/hugo-responsive-images?include_prereleases&style=flat-square)](https://github.com/future-wd/hugo-responsive-images/releases)
[![GoLang version"](https://img.shields.io/github/go-mod/go-version/future-wd/hugo-responsive-images?style=flat-square)](https://go.dev/)
[![Awesome](https://awesome.re/badge-flat.svg)](https://github.com/budparr/awesome-hugo)

Hugo responsive images makes generating responsive images for either figures or standard picture elements a breeze.

Minimal inline code is required and configuration can take place either inline, image resource meta data (front matter), page front matter, or in your site's config file.

The project generates both fixed width responsive images (1x,2x etc) and variable width responsive images for responsive pages. Nearly of Hugo's powerful image processing options have been exposed.

The default CSS classes which are added to images and figures are based on Bootstrap, although this can be easily overridden with the configuration below. **You must provide your own CSS or CSS framework.**

In-keeping with Hugo's philosophy of being non-opinionated, this module does not come with any CSS. Parameter naming is derived from Hugo with the exception of image fit types for aspect ratio resizing based on CSS due to a naming conflict.

## Installation (as a module)

You must initialize your project for hugo modules using the command

```YAML
hugo mod init github.com/user/project
```

Then add this module to your projects configuration

```YAML
# config.yaml
module:
  imports:
  - path: github.com/future-wd/hugo-responsive-images
```

Then you need to install the module with 

```
hugo mod get
```

## Prerequisites

- The latest GoLang (minimum 1.16). See <https://golang.org/dl/>.
- The lates git for downloading the module. See <https://git-scm.com/downloads/>.
- Install the latest hugo (at least 0.101.0)
- You hugo project must be initialized for hugo modules e.g. `hugo mod init github.com/username/project` in the root of your project.
- Update your modules with `hugo mod get -u`

## Usage Examples (Quick Start)

###  Partial - Fixed width & page resource

```html
<!-- <img> generation -->
{{ partial "image_only"  (dict
  "ctx" .
  "src" "image.jpg"
  "width" 300
  "alt" "Test image"
  ) }}
```

```html
<!-- <picture> generation, with original and webp image formats included (default)-->
{{ partial "picture"  (dict
  "ctx" .
  "src" "image.jpg"
  "width" 300
  "alt" "Test image"
  )}}
```

> By providing the "width" key, you will be generating a fixed with image with multiple densities.
>
> Providing `width` will override `widths`. You can also provide `height` (see below - to alter aspect ratio)
>
> "src" is relative to the page's directory, unless you specify a gobal resource is "assets/{image path}"

### Partial - Fixed with & global resource

```html
{{ partial "image"  (dict
  "ctx" .
  "src" "assets/images/image.jpg"
  "width" 300
  "alt" "Test image"
  )}}
```

### Partial - Responsive width & page resource

```html

{{ partial "picture" (dict
  "src" "images/image.jpg"
  "ctx" .
  "alt" "Test image"
  // sizes not needed if loading=lazysizes
  "sizes" [string] // set the sizes property for the image tag, defaults to "100vw"
  // optional 
  "widths" (slice 400 800 1200) // override default responsive widths.
  ) }}
```

> You don't need to provide the "widths" key to generate responsive width images, this is the default behavior and the widths config will be used.

### Partial - Cropping an image to an aspect ratio

```html
{{ partial "picture"  (dict
  "ctx" .
  "src" "image.jpg"
  "aspect_ratio" (slice 4 3)
  "alt" "Test image"
  ) }}
```

If you are generating a fixed with image, you can alternatively specify the aspect ratio by supplying a `height` along with the `width`. This overrides `aspect_ratio`.


```html
{{ partial "picture"  (dict
  "ctx" .
  "src" "image.jpg"
  "width" 300
  "height" 300
  "alt" "Test image"
  ) }}
```

### Shortcode - Cropping an image to an aspect ratio, custom respnsive widths

```html
{{< picture src=image.jpg aspect_ratio=4,3  widths=400,900 alt="Test Image" >}}
```

> The page context is already provided by the shortcode
>
> Double quotes (" ") don't have to be used for the property values if there are no spaces.
>
> Comma seperated values are converted into arrays, numbers are converted into integers.

### Shortcode - Single positional parameter

```html
{{< picture image.jpg >}}
```

> The image will have no alt text, you will need to suppress the error, or use resource meta data to pass params.

## Partial - Figure

```html
{{ partial "figure"  (dict
  "ctx" .
  "src" "image.jpg" 
  "figure_title" "Boat x54"
  "caption" "My favourite boat"
  "link" "https://www.google.com"
  "alt" "Test figure"
  ) }}
```

## Usage as a markdown render hook

By default a markdown render hook template has been included. To turn it on set the config params.image.renderHook: true. It has been disabled by default as it may break existing functionality.

The render hook will only render page resource images - the image path will be relative to the page's markdown file.

The render hook template will take title and alt from the markdown image tag e.g.

```md
[Image ALT text](img1.jpg "Image TITLE text")
```

You can set configuration at a resource meta data, page or site level e.g.

- turn on the render hook just for one page (image.imageRenderHook: true)
- set the responsive widths (image.widths: [400, 900])
- set the image width through page image resource meta data

Render hook only responsive widths default to shortcode responsive widths, and then standard widths. See above for site/page configuration. (image.RenderHookWidths > image.ShortcodeWidths > image.widths)

A div wrapper around the image has been provided see above for configuration (image.render_hook_wrapper_class)

You can also set configuration via image resources meta data using the following example:

```yaml
---
resources:
- src: img1.jpg
  title: Optionally Set title here
  params:
    alt: Optionally set alt here
    width: 300
    class: custom-class # etc
---
```

Then..

```mardown
![](img1.jpg)
```

(I have opted to set alt and title via frontmatter to make the example more informative..)

### Aspect ratio resizing

To alter the aspect ratio of the image set `aspect_ratio` with a slice e.g. (slice 16 9) or [16,9] (yaml).

The `fit` option allows you to set the kind of resize (uses CSS rules)

- `cover` (crops the image to the aspect ratio using Image.Fill - **default**)
- `contain` (image is contained within the aspect ratio (letterboxing) uses Image.Fit) CSS may be required to center the image vertically/horizontally as desired.
- `fill` (image is resized to fill the aspect ratio, one edge will be squished or stretched uses Image.Resize)


## Configuration - Site Config

The first set of configuration items are from [Hugo's image processing configuration. See the docs for more info.](https://gohugo.io/content-management/image-processing/#processing-options).

You can suppress the no alt text error with the `ignoreErrors` config.

```yaml

imaging:
  anchor: Smart # for smart cropping when setting the fillRatio
  bgColor: '#ffffff' # when converting transparent images to formats which dont support transparency
  hint: photo # for conversin to webp
  quality: 75 # compression quality
  resample_filter: Box # compression filter
ignoreErrors: ["alt-error"] # suppress error message if no alt text (or title) has been provided.
```

> If setting imaging options at a site level, this is the best method. You can also use image parameters if you wish to set image options just for this module, although this would probably be best used at a page level.

```yaml
params:
  image:
    anchor: Smart
    bgColor: "#ffffff"
    hint: photo
    quality: 75
    resample_filter: Box
```

## Configuration - Site or page params (Defaults shown)

```yaml
params:
  image:
    widths: [600, 900, 1300] # widths to generate if widths not specified
    # shortcode_widths: [600, 900, 1300] # custom widths for shortcode use in markdown files. If unset defaults to widths
    # render_hook_widths: [600, 900, 1300] # custom widths for render hook use in markdown files. If unset defaults to shortcode widths
    densities: [1,2] # densities which are output when an image width is specified
    formats: [webp, original] # set output formats. options are `original`, `bmp`, `gif`, `jpeg`, `jpg`, `png`, `tif`, `tiff`, and `webp`. In order of least supported to most supported. For "image_only" the first format will be used.
    class: img-fluid # default image class if no class is specified
    figure_class: "figure img-fluid" # default figure class
    figure_image_class: "figure-img img-fluid" # default figure image class (appended to image class) ## USE .class to override outside of config
    figcaption_class: figure-caption # default figcaption class
    figcaption_title_h: 4 # heading level for figure title
    render_hook_wrapper_class: img-wrapper # image wrapper class for render hook
    shortcode_wrapper_class: img-wrapper # image wrapper class for shortcode
    loading: lazy # or auto/lazysizes # lazy/auto are for stock browser behavior, lazysizes will use lazysizes.js
    render_hook: false # set to false to disable included markdown image render hook
                      # override by setting imageRenderHook: true/false in front matter
    # placeholder: lqip # or dominant/file_name  (see colours set up in assets/images/placeholder-colors) use filename without .gif
    lqip_blur_amount: 5 # apply gaussian blur amount of 5 to lqip
                      # may need to be increased at a page level for larger images
    lqip_div_amount: 5 # lqip is 5x smaller than the smallest image in srcset
    gif_div_amount: 10 # single color gif placeholder is 10x smaller than smallest image in srcset
    # provider: netlify # currently only supports netlify image processing.
    suppress_width_warning: false # turn of warning that image cannot be resized to the widths specified
    type: page # or global # useful for setting all images on a page to global resources, or set default
```

All of image parameter configuration items can also be configured on a per page basis by adding the config to the page's front matter.

For example:

```markdown
---
title: About 
image:
  widths: [400, 750, 1300]
---
```

You can also use [resource meta data](https://gohugo.io/content-management/page-resources/#page-resources-metadata) in the page's markdown - you have to target the resource(s) with glob matching e.g.

```
resources:
- src: images/sunset.jpg # you can also glob match e.g. "product*.jpg"
  params:
    images:
      placeholder: lqip # use any of the settings here
```

## Partial or shortcode configuration

The following options are only available at a partial or shortcode level:

```go
# image_only, picture and figure
"src" "image_path.jpg" # relative to page, or assets folder (for global resource)
"title" "Image Title" # defaults to figureTitle, and then the pages title
"class" "img-fluid" # class for image (not a figure image)
"alt" "Image Alt Text"
"aspect_ratio" (slice 4 3) # width by height, image will be cropped. 
"width" 300 # for fixed with image
"widths" (slice 500 900 1500) # for responsive images
# figure only
"figure_title" "Title for figure caption" # can be left blank
"caption" "Figure Caption Text"
"attr" "Author Attribution"
"attr_link" "Attribution link"
```

The following options can be configured at a partial/shortcode & page/site config level

See above for explanations

image and figure (with partial example)

```go
{{ partial "image" (dict 
  "densities" (slice 1 2)
  "formats" (slice "original" "jpg")
  "provider" "netlify"
  "loading" "lazy"
  "sizes" "100vw"
) }}
```

figure only

```go
"target" "_blank"
"rel" "noopener noreferrer"
"link" "https://gohugo.io"
"figure_class" "figure-img img-fluid"
"figcaption_class" "figure-caption"
"figcaption_title_h" 4
```

placeholder options

```go
"placeholder" "lqip" # set to lqip, dominant, [file_name] or false
"lqip_div_factor" 5 # smallest image in srcset is divided by this number for LQIP size
"lqip_blur_amount" 5 # amount of gaussian blur to apply to LQIP
"gif_div_factor" 10 # dominant/gif file is resized to this division factor (of smallest image in srcset)
```

hugo image processing options

its recommended to use [hugos native image config](https://gohugo.io/content-management/image-processing/#imaging-configuration) unless you want to only set for this module.

```go
"quality" 75
"rotate" 0
"resample_filter" "box"
"hint" "photo"
"anchor" "smart"
"bg_color" "#ffffff"
```

> See above for examples of how to set these options from within a shortcode

### Noscript required HTML, JS and CSS

The following elements are required for the `<noscript>` module to work. 

```yaml
#config.yaml
params:
  image:
    noscript: true # or enable at page/meta data/inline level
```

The script must be the first item in the `<head>` to ensure that the `js` class is added before any rendering takes plage.

```HTML
<!-- baseof.html -->
<html>
  <head>
    <script>
      const noJs = document.documentElement.classList.contains('no-js');
      if (noJs) document.documentElement.classList.remove('no-js');
      document.documentElement.classList.add('js');
    </script>
    <title>Title</title>
    <style>
      /* can also be included in a css file */
    img.lazyload {
      display: none;
    }
    noscript img.lazyload {
      display: block;
    }
    .js img.lazyload  {
      display: block;
    } 
    </style>
  </head>
  <body>

  </body>
</html>
```

## Placeholder

Displaying a placeholder image while the actual image is loading is dependent on the use of lazysizes.js for the purpose of swapping the image. `loading: lazysizes` must be set in site/page configuration, or per image.

The configuration item `placeholder` has three options; `lqip`, `dominant` (dominant color used), or specify an image in the `assets/images/placeholder-images` directory, without the .gif extension. False can be used to override a placeholder configuration at a page or partial/shortcode level.

The following colours (based on bootstrap) have been provided:

- white
- gray-100
- gray-200
- gray-300
- gray-400
- gray-500
- gray-600
- gray-700
- gray-800
- gray-900
- black

To create a custom color, make a 10px x 10px gif image with only 1 color and save it in the directory and then call it by its file name, without the .gif extension.

Lqip gaussian blur amount can be adjusted with the `lqip_blur_amount` configuration item in site/page configuration, or per image.

Lqip image size division factor can be adjusted with the `lqip_div_factor` configuration item in site/page configuration, or per image. It is based off the smallest image in the srcset.

Dominant/single color gif image size division factor can be adjusted with the `gif_div_factor` configuration item in site/page configuration, or per image. It is based off the smallest image in the srcset.

example config:

```yaml
#config.yaml
params:
  images:
    loading: lazysizes # must be set as lazysizes will swap out the placeholder on load
    placeholder: lqip   # or dominant or file_name e.g. gray-300 
    # config below this line is not required if not changing the defaults
    lqip_blur_amount: 6 # apply gaussian blur amount of 6 to lqip
                      # may need to be increased at inline level for larger images
    lqip_div_factor: 2 # lqip is 2x smaller than the smallest image in srcset
    gif_div_factor: 10 # single color gif placeholder will be 10x smaller than smallest image in srcset
```

## Setting up Lazysizes.js

### Add required CSS for sizes property to work

```css
img[data-sizes="auto"] { display: block; width: 100%; }
/* so bootstrap 5 figures display correctly */
.figure {display: block}
```

### Import inline via CDN

```html
https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js
```

### JavaScript Module via NPM

Install

```bash
npm install lazysizes
```

Import core package

```javascript
import 'lazysizes';
```

Add native lazyloading plugin

```javascript
import lazySizes from 'lazysizes';
import 'lazysizes/plugins/native-loading/ls.native-loading';

lazySizes.cfg.nativeLoading = {
  setLoadingAttribute: true, // adds loading="lazy" to match non-native behavior
  disableListeners: {
    scroll: true // speeds up browser by not listening to scroll if native lazy load support detected
  },
};
```

### Module configuration

```yaml
params:
  image:
    loading: lazysizes
```

## Contribution

Issues and pull requests are welcome. If need be, make changes to the test site directly in this repository.

Test site is visible @ <https://hugo-responsive-images.netlify.app/>

Test site resides in /.testSite

## Parameters

| Name   | Inline | Meta | Page | Site | Description | Default |
| ------------ | --- | --- | --- | --- | ----------- | ------- |
| src          | YES | NO  | NO  | NO  | Provide resource path | `undefined` |
| type         | YES | YES | YES | YES | page/global - Type of image resource | `page` |
| title        | YES | YES | NO  | NO  | Image title | `figcaption_title` |
| aspect_ratio | YES | YES | YES | NO  | Aspect ratio for image | `null` |
| fit          | YES | YES | YES | NO  | Fit type for aspect_ratio (`cover`, `contain`, `fill`) | `cover` |
| widths       | YES | YES | YES | YES | Widths for responsive width image generation | [600, 900, 1300] |
| width        | YES | YES | YES | NO  | Set widths for fixed with image. Disables widths | 'null' |
| densities    | YES | YES | YES | YES | Densities for fixed with image generation | [1,2] |
| formats      | YES | YES | YES | YES | Image formats to generate. One must be original. In order of browser support. | ["original", "webp" ] |
| provider     | YES | YES | YES | YES | External image processing provider. Only netlify supported for now | `null`|
| loading      | YES | YES | YES | YES | auto/lazy/lazysizes - Type of image loading | `"auto"` |
| sizes        | YES | YES | YES | NO  | [string] - Image sizes for responsive widths images | `"100vw"` |
| class        | YES | YES | YES | YES | Image class | `"img-fluid"` |
| alt          | YES | YES | NO  | NO  | Image alt text | `caption` (figure) then `Image of [title]` then generates error. |

## Placeholder variables

| Name | Inline | Meta | Page Param | Site Param | Description | Default |
| ---------------- | --- | --- | --- | --- | ----------- | ------- |
| placeholder      | YES | YES | YES | YES | lqip/dominant/[gif file name] - Set the placeholder type | `null` |
| lqip_div_factor  | YES | YES | YES | YES | Division factor for lqip gif size | 5 |
| lqip_blur_amount | YES | YES | YES | YES | Amount of gaussian blur for lqip | 5 |
| gif_div_factor   | YES | YES | YES | YES | Division factor for solid gif placeholder | 10 |

## Image processing parameters (overrides hugo image processing defaults if set at any level)

See <https://gohugo.io/content-management/image-processing/#imaging-configuration> for settings

| Name             | Inline | Meta | Page Param | Site Param | Description |
| -----------------| --- | --- | --- | --- | ----------- |
| quality          | YES | YES | YES | YES | Override hugo image processing default |
| rotate           | YES | YES | YES | YES | Override hugo image processing default |
| resample_filter  | YES | YES | YES | YES | Override hugo image processing default |
| hint             | YES | YES | YES | YES | Override hugo image processing default |
| anchor           | YES | YES | YES | YES | Override hugo image processing default |
| background_color | YES | YES | YES | YES | Override hugo image processing default |

## Figure Specific Parameters

| Name              | Inline | Meta | Page Param | Site Param | Description | Default | Notes |
| ------------------ | --- | --- | --- | --- | ----------- | ------- | --- |
| link               | YES | YES | NO  | NO  | Figure image link | `null` | |
| target             | YES | YES | YES | YES | Figure link or attrLink target | `"_blank"` for http links | |
| rel                | YES | YES | YES | YES | Figure link or attrLink rel| `"noopender, noreferrer"` for http links | |
| figure_class       | YES | YES | YES | YES | Figure class | `"figure"` | |
| figure_image_class | YES | YES | YES | YES | Figure image class | `"figure-img img-fluid"` | Outside of config file, .class is used to override default. |
| figcaption_class   | YES | YES | YES | YES | Figcaption class | `"figure-caption"` | |
| figcaption_title_h | YES | YES | YES | YES | Figcaption title level | 4 | |
| figcaption_title   | YES | YES | NO  | NO  | Figcaption Title | `null` | |
| attr               | YES | YES | NO  | NO  | Figcaption atttribute | `null` | |
| attr_link          | YES | YES | NO  | NO  | Figcaption attribute link | `null` | |
| caption            | YES | YES | NO  | NO  | Figcaption caption | `null` | |
