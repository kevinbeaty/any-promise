PROJECT:=any-promise

JS_TARGET ?= build/$(PROJECT).js
JS_WEBPACK ?= build/$(PROJECT)-wp.js

.PHONY: all clean js test serve
all: test js

clean:
	rm -rf build

test: | node_modules
	npm test

node_modules:
	npm install

%.min.js: %.js | node_modules
	`npm bin`/uglifyjs $< -o $@ -c -m

%.gz: %
	gzip -c9 $^ > $@

js: $(JS_TARGET) $(JS_TARGET:.js=.min.js) $(JS_WEBPACK) $(JS_WEBPACK:.js=.min.js)

$(JS_TARGET): index.js register-shim.js register.js loader.js | build
	`npm bin`/browserify $< > $@

$(JS_WEBPACK): index.js register-shim.js register.js loader.js | build
	`npm bin`/webpack $< $@

build:
	mkdir -p build
