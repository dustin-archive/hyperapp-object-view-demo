
.EXPORT_ALL_VARIABLES:
.ONESHELL:
.PHONY: all start prep css js minify html
.SILENT:

PATH := node_modules/.bin:$(PATH)
SHELL := /bin/bash

all: NODE_ENV=production

all: prep css js minify html
	gzip -k -n -9 public/index.html

start: prep css js html
	node scripts/server --css "$(MAKE) css" --js "$(MAKE) js"

prep:
	rm -rf public
	mkdir public
	cp -r src/_root/* public

css:
	echo
	node-sass src/app.scss -o public --source-map true --source-map-contents

js:
	$(ENV) rollup src/app.js -o public/app.js -f iife -m -c

minify:
	uglifyjs public/app.js -o public/app.js -c -m --source-map "content='public/app.js.map',url='app.js.map'"
	cleancss -O2 public/app.css -o public/app.css --source-map --source-map-inline-sources

html:
	$(ENV) rollup src/index.js -f cjs -e fs -c | node > public/index.html
