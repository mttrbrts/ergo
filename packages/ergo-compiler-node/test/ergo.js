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

const Ergo = require('../lib/ergo-compiler-node');
const Chai = require('chai');

Chai.should();
Chai.use(require('chai-things'));

const Fs = require('fs');
const Path = require('path');

describe('ergo-compiler-node', () => {
    it('should compile the volumediscount Ergo smart contract with contract name', async function () {
        const ergoText = Fs.readFileSync(Path.resolve(__dirname, 'data/volumediscount', 'logic.ergo'), 'utf8');
        const ctoText = Fs.readFileSync(Path.resolve(__dirname, 'data/volumediscount', 'model.cto'), 'utf8');
        const result = await Ergo.compile(ergoText, ctoText, 'VolumeDiscount', null, false);
        result.should.not.be.null;
    });
});
