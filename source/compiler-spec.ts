/**
 * @license Copyright © 2017 Nicholas Jamieson et al. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/ts-snippet
 */
/*tslint:disable:no-unused-expression*/

import { expect } from "chai";
import { Compiler } from "./compiler";

describe("Compiler", () => {

    describe("compile", () => {

        it("should compile the snippet", () => {

            const compiler = new Compiler();
            const program = compiler.compile({
                "snippet.ts": `
                    import * as Lint from "tslint";
                    const pi: number = 3.14159265359;
                `
            });

            expect(program).to.be.an("object");
            expect(program.getSourceFile("snippet.ts")).to.be.an("object");
            expect(compiler.getDiagnostics("snippet.ts")).to.be.empty;
        });

        it("should compile multiple snippet files", () => {

            const compiler = new Compiler();
            const program = compiler.compile({
                "other.ts": `
                    export const other = "other";
                `,
                "snippet.ts": `
                    import { other } from "./other";
                    console.log(other);
                `
            });

            expect(program).to.be.an("object");
            expect(program.getSourceFile("other.ts")).to.be.an("object");
            expect(program.getSourceFile("snippet.ts")).to.be.an("object");
            expect(compiler.getDiagnostics("other.ts")).to.be.empty;
            expect(compiler.getDiagnostics("snippet.ts")).to.be.empty;
        });

        it("should support recompiling snippets", () => {

            const compiler = new Compiler();
            let program = compiler.compile({
                "snippet.ts": `
                    const pi: string = 3.14159265359;
                `
            });

            expect(program).to.be.an("object");
            expect(program.getSourceFile("snippet.ts")).to.be.an("object");
            expect(compiler.getDiagnostics("snippet.ts")).to.not.be.empty;

            program = compiler.compile({
                "snippet.ts": `
                    const pi: number = 3.14159265359;
                `
            });

            expect(program).to.be.an("object");
            expect(program.getSourceFile("snippet.ts")).to.be.an("object");
            expect(compiler.getDiagnostics("snippet.ts")).to.be.empty;
        });
    });
});