
PATH := node_modules/.bin:$(PATH)
SHELL := /bin/bash

.SILENT:

all: prep js css minify

demo: production all
	dev-server dist --watch 'src/**/*' 'make'

start: development prep js css
	dev-server dist --watch 'src/**/*.js' 'make js' --watch 'src/**/*.scss' 'make css'

development:
	cp .env-development .env

production:
	cp .env-production .env

prep:
	rm -rf dist
	mkdir dist
	cp -r fonts images index.html favicon.png sitemap.xml dist

js:
	env $$(cat .env) rollup src/app.js -o dist/app.js -f iife -m -c

css:
	node-sass src/app.scss -o dist --source-map true --source-map-contents

minify:
	uglifyjs dist/app.js -o dist/app.js -c -m --source-map content='dist/app.js.map',url='app.js.map'
	cleancss dist/app.css -o dist/app.css --source-map --source-map-inline-sources

setup:
	npm i \
		@whaaaley/hyperapp-object-view \
		hyperapp
	npm i -D \
		@jamen/dev-server \
		clean-css-cli \
		node-sass \
		rollup \
		rollup-plugin-node-resolve \
		uglify-js
