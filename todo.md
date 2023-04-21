# TODO

render hook get params - error ctx uses "src" update error print to match this.


look into error handling when image cannot be found (Both global and page resource)



test site fix js error - forEach iterating over undefined.. need to debug


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
