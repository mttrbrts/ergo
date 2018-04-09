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
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const packageJson = require('../../package.json');
const Ergo = require('@accordproject/ergo-compiler-node/lib/ergo-compiler-node');

module.exports = class extends Generator {

  /**
  * Promts for the user
  * @return {Promise} a promise to the user prompts
  */
  prompting() {
  // Have Yeoman greet the user.
      this.log(
          yosay('Welcome to the ' + chalk.red('generator-ergo-serverless') + ' generator!')
      );

      const prompts = [
          {
              type: 'input',
              name: 'templateFolder',
              message: 'Which folder contains your template?',
          },
          {
              type: 'input',
              name: 'destination',
              message: 'Where do you want to write your generated package?',
              default: './'
          }
      ];

      return this.prompt(prompts).then(props => {
          props.engineVersion= packageJson.version;
          // To access props later use this.props.someAnswer;
          this.props = props;
      });
  }

  /**
  * Build the template values
  */
  async configuring() {
    // * @param {string} ergoText text for Ergo code
    // * @param {string} ctoText text for CTO model
    // * @param {string} contractName of the contract to compile
    // * @param {string} clauseName of the clause to compile
    // * @param {bool} withDispatch whether to generate dispatch function
    const templateSrc = Ergo.compile(
      this.props.templateFolder+'/logic.ergo',
      this.props.templateFolder+'/model.cto',
    );

    // data.contractName
    this.props.contractName = null;
    // data.clauseName
    this.props.clauseName = null;
    // data.requestJson
    this.props.requestJson = null;
    // data.contractJson
    this.props.contractJson = null;
    // data.templateSrc
    this.props.templateSrc = JSON.stringify(templateSrc);


   }

  /**
  * Write data to disk
  */
  writing() {
      this.fs.copyTpl(
          this.templatePath('.'),
          this.destinationPath(this.props.destination),
          { data: this.props }
      );
  }

  /**
  * Install phase
  */
  install() {}
};
