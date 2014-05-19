espower-source
================================

[![Build Status](https://travis-ci.org/twada/espower-source.svg?branch=master)](https://travis-ci.org/twada/espower-source)
[![NPM version](https://badge.fury.io/js/espower-source.svg)](http://badge.fury.io/js/espower-source)
[![Dependency Status](https://gemnasium.com/twada/espower-source.svg)](https://gemnasium.com/twada/espower-source)

Power Assert instrumentor from source to source, with source-map.


DESCRIPTION
---------------------------------------
`espower-source` is a source code transformer that applies [espower](http://github.com/twada/espower) to target source.

`espower` manipulates assertion expression (JavaScript Code) represented as [Mozilla JavaScript AST](https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API), to instrument power-assert feature into the code.

Please note that `espower-source` is a beta version product. Pull-requests, issue reports and patches are always welcomed.

See [power-assert](http://github.com/twada/power-assert) project for more documentation.


AUTHOR
---------------------------------------
* [Takuto Wada](http://github.com/twada)


CONTRIBUTORS
---------------------------------------
* [azu](https://github.com/azu)


LICENSE
---------------------------------------
Licensed under the [MIT](https://github.com/twada/espower-source/blob/master/MIT-LICENSE.txt) license.
