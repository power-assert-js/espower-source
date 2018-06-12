import assert from 'assert';

const urls = [
    'https://github.com/tc39/proposal-object-rest-spread',
    'https://github.com/tc39/proposal-regexp-lookbehind',
    'https://github.com/tc39/proposal-regexp-unicode-property-escapes',
    'https://github.com/tc39/proposal-promise-finally',
    'https://github.com/tc39/proposal-async-iteration'
];

async function * ait () {
    for (const url of urls) {
        console.log(`Fetching: ${url}`);
        const response = await fetch(url);
        const iterable = response.text();
        yield iterable;
    }
}

async function b () {
    for await (const x of ait()) {
        const title = x.match(/<title>(.+)<\/title>/)[1];
        assert(title);
    }
}

b();

const obj = { a: 1, b: 2 };
assert.deepStrictEqual({ ...obj, c: 3 }, { a: 1, b: 2, c: 3 });
