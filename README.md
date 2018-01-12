# mustache-simple

[![npm version](https://badge.fury.io/js/mustache-simple.svg)](https://www.npmjs.com/package/mustache-simple)

Dead simple limited mustache compiler

## Install
```
npm install --save mustache-simple
```

## Features
* Support nested object map
* Two types of behavior. Full/Partial compile

## Usage
* `compileAll` remove all unmatched mustaches
* `compileMatch` don't touch unmatched mustaches. In case pre-preocess partially
* `false`, `null` will be ''
* `undefined` is treated as unmatched
* No filter, No escape

### Nested Object map

```js
const mustache = require('mustache-simple')
const config = {
  foo: 'bar',
  hello: 'world',
  users: {
    bob: {
      age: 23
    }
  }
}
const parser = mustache.compileMatch(config)
const res = parser('The foo is {{foo}}, hello {{hello}}\n Age of bob is {{users.bob.age}}')

// The foo is bar, hello world\n Age of bob is 23
```

### Limited words
You can give allowed list of words. Only they are compiled. others will not be changed at all

```js
const parser2 = mustache.compileMatch(config, ['foo', 'users.bob.age'])

const res = parser('The foo is {{foo}}, hello {{hello}}\n Age of bob is {{users.bob.age}}')

// The foo is bar, hello {{hello}}\n Age of bob is 23
```
