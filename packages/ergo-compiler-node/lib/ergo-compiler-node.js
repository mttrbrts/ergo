/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const Ergo = require('@accordproject/ergo-compiler/lib/ergo');
const ergoruntime = require('@accordproject/ergo-engine/lib/ergoruntime.js');

/**
 * Utility class that implements the internals for Ergo.
 * @class
 */
class ErgoEngine {
    /**
     * Execute Ergo
     *
     * @param {string} ergoText text for Ergo code
     * @param {string} ctoText text for CTO model
     * @param {string} contractName of the contract to compile
     * @param {string} clauseName of the clause to compile
     * @param {bool} withDispatch whether to generate dispatch function
     * @returns {object} Promise to the result of execution
     */
    static async compile(ergoText,ctoText,contractName,clauseName,withDispatch) {

        let ergoCode = await Ergo.compile(ergoText,ctoText,contractName, null, withDispatch);
        // TODO (MR) Remove hack to remove use strict. Need to modify codegen
        ergoCode = ergoCode.replace('\'use strict\';', '');

        const funcs = Object.getOwnPropertyNames(ergoruntime);
        const funcsCode = funcs.map((f) => { return `const ${f} = ergo.${f};`; }).join(`
`);

        let nodeCode = `'use strict';
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-var */
/* eslint-disable class-methods-use-this */
/* eslint-disable vars-on-top */
const ergo = require('@accordproject/ergo-engine/lib/ergoruntime.js');
${funcsCode}
${ergoCode}/* eslint-enable no-var */
/* eslint-enable class-methods-use-this */
/* eslint-enable vars-on-top */
module.exports = ${contractName};
`;
        return nodeCode;
    }
}

module.exports = ErgoEngine;
