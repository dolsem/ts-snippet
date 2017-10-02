# ts-snippet

[![NPM version](https://img.shields.io/npm/v/ts-snippet.svg)](https://www.npmjs.com/package/ts-snippet)
[![Build status](https://img.shields.io/travis/cartant/ts-snippet.svg)](http://travis-ci.org/cartant/ts-snippet)
[![dependency status](https://img.shields.io/david/cartant/ts-snippet.svg)](https://david-dm.org/cartant/ts-snippet)
[![devDependency Status](https://img.shields.io/david/dev/cartant/ts-snippet.svg)](https://david-dm.org/cartant/ts-snippet#info=devDependencies)
[![peerDependency Status](https://img.shields.io/david/peer/cartant/ts-snippet.svg)](https://david-dm.org/cartant/ts-snippet#info=peerDependencies)
[![Greenkeeper badge](https://badges.greenkeeper.io/cartant/ts-snippet.svg)](https://greenkeeper.io/)

### What is it?

`ts-snippet` is a TypeScript snippet testing library for any test framework.

### Why might you need it?

...

## Install

Install the package using npm:

```
npm install ts-snippet --save-dev
```

## Usage

The package exports a `snippet` function that returns a `Snippet` instance, upon which assertions/expectations can be made.

The `snippet` function takes an object containing one or more files - with the keys representing the file names and the values the file content (as strings). The function also takes an optional `Compiler` instance - if not specified, a `Compiler` instance is created within the `snippet` call. With snippets that import large packages (such as RxJS) re-using the compiler can effect significant performance gains.

Using Mocha, the tests look something like this:

```ts
import { Compiler, snippet } from "ts-snippet";

describe("snippets", () => {

  let compiler: Compiler;

  before(() => {
    compiler = new Compiler();
  });

  it("should infer Observable<number>", () => {
    const s = snippet({
      "snippet.ts": `
        import * as Rx from "rxjs";
        let ob = Rx.Observable.from([0, 1]);
      `
    }, compiler);
    s.expect("snippet.ts").toInfer("ob", "Observable<number>");
  });

  it("should be not be assignable to Observable<number>", () => {
    const s = snippet({
      "snippet.ts": `
        import * as Rx from "rxjs";
        let ob: Rx.Observable<number> = Rx.Observable.from([0, "1"]);
      `
    }, compiler);
    s.expect("snippet.ts").toFail(/is not assignable to type 'Observable<number>'/);
  });
});
```

If the BDD-style expectations are not to your liking, there are alternate methods that are more terse.

When using `ts-snippet` with AVA or tape, the import should specify the specific subdirectory so that the appropriate assertions are configured and the assertions/expectations count towards the test runner's plan.

Using the tape-specfic import and terse assertions, tests would look something like this:

```ts
import * as tape from "tape";
import { snippet } from "ts-snippet/tape";

tape("should infer Observable<number>", (t) => {
  t.plan(1);
  const s = snippet(t, {
    "snippet.ts": `
      import * as Rx from "rxjs";
      let ob = Rx.Observable.from([0, 1]);
    `
  });
  s.infer("snippet.ts", "ob", "Observable<number>");
});
```

## API

...