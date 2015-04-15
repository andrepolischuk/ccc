
default: test

test: node_modules $(wildcard test/*.js)
	@node_modules/.bin/mocha test/test.js

clean:
	@rm -rf build.js ccc.js ccc.min.js components node_modules

node_modules: package.json
	@npm install

ccc.js: node_modules $(wildcard i*.js lib/*.js)
	@node_modules/.bin/duo --standalone ccc --stdout index.js > $@

ccc.min.js: ccc.js
	@node_modules/.bin/uglifyjs $< --mangle --compress --output $@

.PHONY: clean test
