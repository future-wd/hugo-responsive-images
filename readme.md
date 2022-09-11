# Hugo responsive images  [<img src="https://d33wubrfki0l68.cloudfront.net/c38c7334cc3f23585738e40334284fddcaf03d5e/2e17c/images/hugo-logo-wide.svg" align="right" width="250">](https://gohugo.io/)

[![GitHub License](https://img.shields.io/github/license/future-wd/hugo-responsive-images?style=flat-square)](https://github.com/future-wd/hugo-responsive-images/blob/master/LICENSE)
[![GitHub release (latest SemVer including pre-releases)](https://img.shields.io/github/v/release/future-wd/hugo-responsive-images?include_prereleases&style=flat-square)](https://github.com/future-wd/hugo-responsive-images/releases)
[![GoLang version"](https://img.shields.io/github/go-mod/go-version/future-wd/hugo-responsive-images?style=flat-square)](https://go.dev/)
[![Awesome](https://awesome.re/badge-flat.svg)](https://awesome.re)

Hugo responsive images makes generating responsive images for either figures or standard picture elements a breeze.

Minimal inline code is required and configuration can take place either inline or in your site's config file.

The project generates both fixed width responsive images (1x,2x etc) and variable width responsive images for responsive pages. All of Hugo's powerful image processing options have been exposed.

You images will have a default class of `img-fluid` (Bootstrap responsive image), but you can set this in the config, or inline.

## Installation (as a module)

``` YAML
# config.yaml
module:
  imports:
  - path: github.com/future-wd/hugo-responsive-images
```

## Prerequisites

- You must install the latest GoLang (minimum 1.12). See <https://golang.org/dl/>.
- You must have a VCS client e.g. git. See <https://git-scm.com/downloads/>.
- Install the latest hugo (at least 0.83.0)
- You hugo project must be initialized for hugo modules e.g. `hugo mod init github.com/username/project` in the root of your project.
- Update your modules with `hugo mod get -u`

## Configuration - Site Config

The first set of configuration items are from [Hugo's image processing configuration. See the docs for more info.](https://gohugo.io/content-management/image-processing/#processing-options).

All the hugo image options can be set at a partial/shortcode level. See below

You can suppress the no alt text error with the `ignoreErrors` config. If you suppress the error, the ALT text will default to "image of [title]` (title defaults to the page's title)

```yaml

imaging:
  anchor: Smart # for smart cropping when setting the fillRatio
  bgColor: '#ffffff' # when converting transparent images to formats which dont support transparency
  hint: photo # for conversin to webp
  quality: 75 # compression quality
  resampleFilter: Box # compression filter
ignoreErrors: ["alt-error"] # suppress error message if no alt text has been provided.
```

> If setting imaging options at a site level, this is the best method. You can also use image parameters if you wish to set image options just for this module, although this would probably be best used at a page level.

```yaml
params:
  image:
    anchor: Smart
    bgColor: "#ffffff"
    hint: photo
    quality: 75
    resampleFilter: Box
```

## Configuration - Site or page params (Defaults shown)

```yaml
params:
  image:
    widths: [600, 900, 1300] # widths to generate if widths not specified
    # shortcodeWidths: [600, 900, 1300] # custom widths for shortcode use in markdown files. If unset defaults to widths
    # renderHookWidths: [600, 900, 1300] # custom widths for render hook use in markdown files. If unset defaults to shortcode widths
    densities: [1,2] # densities which are output when an image width is specified
    formats: [webp, original] # set output formats. options are `original`, `bmp`, `gif`, `jpeg`, `jpg`, `png`, `tif`, `tiff`, and `webp`. In order of least supported to most supported.
    class: img-fluid # default image class if no class is specified
    figureClass: "figure img-fluid" # default figure class
    figcaptionClass: figure-caption # default figcaption class
    figureImageClass: "figure-img img-fluid" # default figure image class (appended to image class) ## USE .class inline
    figureTitleH: 4 # heading level for figure title
    renderHookWrapperClass: img-wrapper # image wrapper class for render hook
    shortcodeWrapperClass: img-wrapper # image wrapper class for shortcode
    loading: lazy # or auto/lazysizes # lazy/auto are for stock browser behavior, lazysizes will use lazysizes.js 
    sizes: user # or lazysizes # uses lazysizes to automatically generate the sizes property
    renderHook: false # set to false to disable included markdown image render hook
                      # override by setting imageRenderHook: true/false in front matter
    # placeholder: lqip # or dominant/file_name  (see colours set up in assets/images/placeholder-colors) use filename without .gif
    lqipBlurAmount: 5 # apply gaussian blur amount of 5 to lqip
                      # may need to be increased at a page level for larger images
    lqipDivAmount: 5 # lqip is 5x smaller than the smallest image in srcset
    gifDivAmount: 10 # single color gif placeholder is 10x smaller than smallest image in srcset
    # provider: netlify # currently only supports netlify image processing.
    # suppressWidthWarning: true # turn off image too narrow warning
    # type: page # or global # useful for setting all images on a page to global resources, or set default
```

> All of image parameter configuration items can also be configured on a per page basis by adding the config to the page's front matter.

For example:

```markdown
---
title: About 
image:
  widths: [400, 750, 1300]
---
```

## Partial or shortcode configuration

The following options are only available at a partial or shortcode level:

```go
# image and figure
"src" "image_path.jpg" # relative to page, or assets folder (for global resource)
"title" "Image Title" # defaults to figureTitle, and then the page's title
"class" "img-fluid" # class for image (not a figure image)
"alt" "Image Alt Text"
"fillRatio" (slice 4 3) # width by height, image will be cropped. 
"width" 300 # for fixed with image
"widths" (slice 500 900 1500) # for responsive images
# figure only
"figureTitle" "Title for figure caption" # can be left blank
"caption" "Figure Caption Text"
"attr" "Author Attribution"
"attrLink" "Attribution link"
```

The following options can be configured at a partial/shortcode & page/site config level

See above for explanations

```go
# image and figure (with partial example)
{{ partial "image" (dict 
  "densities" (slice 1 2)
  "type" "page"
  "formats" (slice "original" "jpg")
  "provider" "netlify"
  "loading" "lazy"
  "sizes" "100vw"
) }}

# figure only

"target" "_blank"
"rel" "noopener noreferrer"
"link" "https://gohugo.io"
"figureClass" "figure-img img-fluid"
"figureCaptionClass" "figure-caption"
"figureTitleH" 4

# placeholder options

"placeholder" "lqip" # set to lqip, dominant, [file_name] or false
"lqipDivFactor" 5 # smallest image in srcset is divided by this number for LQIP size
"lqipBlurAmount" 5 # amount of gaussian blur to apply to LQIP
"gifDivFactor" 10 # dominant/gif file is resized to this division factor (of smallest image in srcset)

# hugo image processing options - if setting at a site level, its recommended to use hugos native image config

"quality" 75
"rotate" 0
"resampleFilter" "box"
"hint" "photo"
"anchor" "smart"
``

> See below for examples of how to set these options from within a shortcode

## Usage Examples

###  Partial - Fixed width & page resource

```html
{{ partial "image"  (dict
  "page" .
  "src" "image.jpg"
  "width" "300"
  )}}
```

> A "type" of "page" does not need to be provided. Default behavior is page resource images.
>
> By providing the "width" key, you will be generating a fixed with image.
>
> "src" is relative to the page's directory

### Partial - Fixed with & gobal resource

```html
{{ partial "image"  (dict
  "page" .
  "src" "image.jpg"
  "width" "300"
  "type" "global"
  )}}
```

### Partial - Responsive width & page resource

```html

{{ partial "image" (dict
  "src" "images/image.jpg"
  "page" .
  // if in config sizes=user (not needed for sizes=lazysizes) 
  "sizes" [string] // set the sizes property for the image tag, defaults to "100vw"
  // optional 
  "widths" (slice 400 800 1200) // override default responsive widths.
  ) }}
```

> You don't need to provide the "widths" key to generate responsive width images, this is the default behavior and the widths config will be used.

### Partial - Cropping an image to an aspect ratio

```html
{{ partial "image"  (dict
  "page" .
  "src" "image.jpg"
  "fillRatio" (slice 4 3)
  ) }}
```

### Shortcode - Cropping an image to an aspect ratio, custom respnsive widths

```html
{{< image src=image.jpg fillRatio=4,3  widths=400,900 >}}
```

> The page context is already provided by the shortcode
>
> Double quotes (" ") don't have to be used for the property values if there are no spaces.
>
> Comma seperated values are converted into arrays, numbers are converted into integers.

### Shortcode - Single positional parameter

```html
{{< image image.jpg >}}
```

> The alt text will default to "image of [page title]" You will need to suppress the alt error (see above)

## Partial - Figure

```html
{{ partial "figure"  (dict
  "page" .
  "src" "image.jpg" 
  "figureTitle" "Boat x54"
  "caption" "My favourite boat"
  "link" "https://www.google.com"
  ) }}
```

## Usage as a markdown render hook

By default a markdown render hook template has been included. To turn it on set the config params.image.renderHook: true. It has been disabled by default as it may break existing functionality.

The render hook will only render page resource images - the image path will be relative to the page's markdown file.

You can set configuration at a page or site level e.g. 

- make all images on the page global (image.type: global)
- turn on the render hook just for one page (image.imageRenderHook: true)
- set the widths for the page (image.widths: [400, 900])

Render hook only responsive widths default to shortcode responsive widths, and then standard widths. See above for site/page configuration. (image.RenderHookWidths > image.ShortcodeWidths > image.widths)

A div wrapper around the image has been provided see above for configuration (image.renderHookWrapperClass)

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

<!-- 
### Noscript required HTML, JS and CSS

The following elements are required for the `<noscript>` module to work. The script must come first.

```HTML

1<html class="no-js">
  <head>
    <script>
      document.documentElement.className = document.documentElement.className.replace("no-js", "js");
    </script>
    <title>Title</title>
    <style>
      /* can also be included in a css file */
      .no-js img.lazyload {
          display: none;
        }
    </style>
  </head>
  <body>

  </body>
</html>

``` -->

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

Lqip gaussian blur amount can be adjusted with the `lqipBlurAmount` configuration item in site/page configuration, or per image.

Lqip image size division factor can be adjusted with the `lqipDivFactor` configuration item in site/page configuration, or per image. It is based off the smallest image in the srcset.

Dominant/single color gif image size division factor can be adjusted with the `gifDivFactor` configuration item in site/page configuration, or per image. It is based off the smallest image in the srcset.

example config:

```yaml
#config.yaml
params:
  images:
    loading: lazysizes # must be set as lazysizes will swap out the placeholder on load
    placeholder: lqip   # or dominant or file_name e.g. gray-300 
    # config below this line is not required if not changing the defaults
    lqipBlurAmount: 5 # apply gaussian blur amount of 5 to lqip
                      # may need to be increased at a page level for larger images
    lqipDivFactor: 5 # lqip is 5x smaller than the smallest image in srcset
    gifDivFactor: 10 # single color gif placeholder is 10x smaller than smallest image in srcset
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
    sizes: lazysizes
```

## Contribution

Issues and pull requests are welcome. If need be, make changes to the test site directly in this repository.

Test site is visible @ <https://hugo-responsive-image.netlify.app/>

Test site resides in /.testSite
