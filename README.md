espower-source
================================

[![Build Status][travis-image]][travis-url]
[![NPM package][npm-image]][npm-url]
[![Bower package][bower-image]][bower-url]
[![Dependency Status][depstat-image]][depstat-url]
[![License][license-image]][license-url]


Power Assert instrumentor from code to code, with SourceMap.


DESCRIPTION
---------------------------------------
`espower-source` is a source code transformer that applies [espower](http://github.com/power-assert-js/espower) to target code.

`espower` manipulates assertion expression (JavaScript Code) represented as [Mozilla JavaScript AST](https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API), to instrument power-assert feature into the code. SourceMap information is appended in SourceMap Comment syntax at the end of returned code.

Please note that `espower-source` is a beta version product. Pull-requests, issue reports and patches are always welcomed.

See [power-assert](http://github.com/power-assert-js/power-assert) project for more documentation.


CHANGELOG
---------------------------------------
See [CHANGELOG](https://github.com/power-assert-js/espower-source/blob/master/CHANGELOG.md)


API
---------------------------------------

### var modifiedCode = espowerSource(originalCode, filepath, [options])

| return type |
|:------------|
| `string`    |

`espowerSource` function manipulates `originalCode` then returns (transformed) JavaScript code as string. SourceMap information is appended in SourceMap Comment syntax at the end of returned code.

#### originalCode

| type     | default value |
|:---------|:--------------|
| `string` | N/A           |

Original JavaScript source code that is a source of code transformation.

#### filepath

| type     | default value |
|:---------|:--------------|
| `string` | N/A           |

Filepath of `originalCode`. If passed, espowerSource stores filepath information for later reporting.

#### options

| type     | default value |
|:---------|:--------------|
| `object` | (return value of `espower.defaultOptions()` but with `destructive` option is `true`) |

Configuration options for `espower` module. If not passed, default options (Same as [espower.defaultOptions()](https://github.com/power-assert-js/espower#var-options--espowerdefaultoptions)) will be used, but `destructive` option is set to `true` by espower-source module.


AUTHOR
---------------------------------------
* [Takuto Wada](http://github.com/twada)


CONTRIBUTORS
---------------------------------------
* [azu](https://github.com/azu)


LICENSE
---------------------------------------
Licensed under the [MIT](https://github.com/power-assert-js/espower-source/blob/master/MIT-LICENSE.txt) license.


[npm-url]: https://npmjs.org/package/espower-source
[npm-image]: https://badge.fury.io/js/espower-source.svg

[bower-url]: http://badge.fury.io/bo/espower-source
[bower-image]: https://badge.fury.io/bo/espower-source.svg

[travis-url]: http://travis-ci.org/power-assert-js/espower-source
[travis-image]: https://secure.travis-ci.org/power-assert-js/espower-source.svg?branch=master

[depstat-url]: https://gemnasium.com/power-assert-js/espower-source
[depstat-image]: https://gemnasium.com/power-assert-js/espower-source.svg

[license-url]: https://github.com/power-assert-js/espower-source/blob/master/MIT-LICENSE.txt
[license-image]: http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat
