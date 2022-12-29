module github.com/future-wd/hugo-responsive-images-test-site

go 1.18

// replace main module in all envs for test site
replace github.com/future-wd/hugo-responsive-images => ../

require (
	github.com/future-wd/hugo-imaging-common v0.0.4 // indirect
	github.com/future-wd/hugo-responsive-images v1.1.3 // indirect
)
