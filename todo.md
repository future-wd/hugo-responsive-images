# TODO

there is an error messagage in render_hook which comes before the common variables its "out of scope" can these variables be defined higher up as constants and pulled in where needed?

point img and pictue to an image partial, but set partial=img and partial=picture
then throughout the process refer to partial=img 
this must be set even if .common already exists!

update shortcode-get-params error messages, after error message re write
sanitize shortcode params
move shortcode widths to general params to simplify param workflow.
configure partials for use with common
move image error from get-image to image

scope figure sanitized params present in image as "figure_params" etc.
fix up the rest of the params/merge sanitization
look into adding shortcode/render hook/ or direct partial name to error messages
- currently set up with figure image, picture image, and img




{{/*  to be added below, conditional on .common.shortcode 
    will possibly need to be modified

    {{ $widths_site := default $site.shortcodeWidths | default $site.shortcode_widths | default $site.widths }}
{{ $withs_page  := $page.shortcode_widths | default $page.shortcodeWidths | default $page.widths | default $widths_site }}
{{ $widths_meta := $meta.shortcode_widths | default $meta.shortcodeWidths | default $meta.widths | default $withs_page  }}
{{ $widths := .widths | default $widths_meta }}    /*}}


## render hook widths
dependant on .common.render_hook

{{ $widths_site := $site.renderHookWidths | default $site.render_hook_widths | default $site.shortcodeWidths | default $site.shortcode_widths  | default $site.widths }}
{{ $widths_page  := $page.render_hook_widths | default $page.renderHookWidths | default $page.shortcode_widths | default $page.shortcodeWidths | default $page.widths | default $widths_site }}
{{ $widths_meta := $meta.render_hook_widths | default $meta.renderHookWidths | default $meta.shortcode_widths | default $meta.shortcodeWidths | default $meta.widths | default $widths_page}}
{{ $widths := $widths_meta }}


allow the param of image_only: true for render hook to only generate <img> and figure: true for figure

astro image processing params:
- aspect_ratio: string ratio for image resize string "16:9", int also e.g. 1.32
- use regex to check for 0-9*:0-9*
- deprecate slice

test site fix js error - forEach iterating over undefined.. need to debug

add remote image src

change quality of lqip if fit/crop ratio reduces the width of the image. see poor examples on test site

can gif divison be removed, and fixed size solid gif be used

for above - page partial would be needed. Could caching be done here? use page context for scratch?

check all required image/page/site params have been added to params partial

prettier go formatter - comment block behavior & multiline dict/slice, log issue

ADD:

INVESTIGATE

- [ ] add .filter support????? how would this be implemented for on image hover etc ????

DOCS

- [ ] check all figure configs can be set inline
- [ ] check all standard configs can be set inline

EXAMPLE SIZES - BOOTSTRAP 5 BREAKPOINTS

sm-6
(min-width: 576px) 50vw, 100vw

md-4
(min-width: 768px) 33.33vw, 100vw

md-5
(min-width: 768px) 41.67vw, 100vw

md-6
(min-width: 768px) 50vw, 100vw

md-7
(min-width: 768px) 58.33vw, 100vw

md-8
(min-width: 768px) 66.67vw, 100vw

md-9
(min-width: 768px) 75w, 100vw

lg-6
(min-width: 992px) 50vw, 100vw

xl-6
(min-width: 1200px) 50vw, 100vw

xxl-6
(min-width: 1400px)

6 = 6/.12 = 50

3 = 3/.12 = 25

etc.

BAD IDEAS

add inline styles/css styles - use css head partial or .Publish on css resource and import ???
inline_styles=true
>placeholder.dominant > .Colours[0] to css background-color? NO as it won't work with transparent images!


TODO V2

- depreciate camelCase params
- depreciate "type" "global"
- depreciate "image" partial and rename "image_only" to "image"
