## [0.10.0](https://github.com/twada/espower-source/releases/tag/v0.10.0) (2014-11-11)


* **espower-source:**
  * update espower to 0.10.0 ([cd05911e](https://github.com/twada/espower-source/commit/cd05911e9199ea079f8522348624387b92a97208))


### 0.9.1 (2014-09-15)


#### Features

* **espower-source:** update espower to 0.9.1 ([8acad23d](https://github.com/twada/espower-source/commit/8acad23d1eeb613c539ed1dba09830b86e932c0f))


## 0.9.0 (2014-08-31)


#### Features

* **espower-source:** backport espowerify to support multi-stage sourcemaps ([71de737c](https://github.com/twada/espower-source/commit/71de737cb16231db852a44592e896a43c447298b))


## 0.8.0 (2014-08-12)


#### Features

* **espower-source:**
  * update espower to 0.8.0 ([ae15a229](https://github.com/twada/espower-source/commit/ae15a229367c65a7a590104f3fb0fc0b2a7582d0))
  * simple xtend would be better for options handling ([6bea0a92](https://github.com/twada/espower-source/commit/6bea0a9241aba71f2dcae9c285561e68d91531bb))


#### Breaking Changes

  * update espower to 0.8.0 ([ae15a229](https://github.com/twada/espower-source/commit/ae15a229367c65a7a590104f3fb0fc0b2a7582d0))

If you already customize instrumentation pattern using `powerAssertVariableName` and `targetMethods`, you need to migarte. To migrate, change your code from the following:

```javascript
var espowerSource = require('espower-source');
var options = {
    powerAssertVariableName: 'yourAssert',
    targetMethods: {
        oneArg: [
            'okay'
        ],
        twoArgs: [
            'equal',
            'customEqual'
        ]
    }
};
var modifiedCode = espowerSource(originalCode, filepath, options);
```

To:

```javascript
var espowerSource = require('espower-source');
var options = {
    patterns: [
        'yourAssert(value, [message])',
        'yourAssert.okay(value, [message])',
        'yourAssert.equal(actual, expected, [message])',
        'yourAssert.customEqual(actual, expected, [message])'
    ]
};
var modifiedCode = espowerSource(originalCode, filepath, options);
```
