
default: test

test: node_modules $(wildcard test/*.js)
	@node_modules/.bin/mocha test/test.js

clean:
	@rm -rf build.js ccc.js ccc.min.js components node_modules

node_modules: package.json
	@npm install

bundle: index.js
	@duo --standalone ccc --stdout index.js > ccc.js
	@uglifyjs ccc.js --mangle --compress --output ccc.min.js

.PHONY: clean test
