// Node Library

let fs = require("fs");
let inquirer = require("inquirer");

let licenseDescription;

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your project Title?",
      name: "title",
    },
    {
      type: "input",
      message: "Please enter in a brief description of your project:",
      name: "description",
    },
    {
      type: "input",
      message: "Please detail the Installation Instructions:",
      name: "installation",
    },
    {
      type: "input",
      message: "Please detail the project's usage:",
      name: "usage",
    },
    {
      type: "input",
      message: "Please detail any contributing resources",
      name: "contribution",
    },
    {
      type: "input",
      message: "Please detail any Tests:",
      name: "tests",
    },
    {
      type: "rawlist",
      message: "which license did you use for the project?",
      name: "license",
      choices: ["MIT", "GPL", "BSD 3.0", "Apache 2.0", "Other"],
    },
    {
      name: "input",
      message: "What is your Github Username?",
      name: "github",
    },
    {
      name: "input",
      message: "what is your email address?",
      name: "email",
    },
  ])
  .then(function (response) {

    printTitle(response);
    hasLicense(response);
    mainContent(response);

  });

//Creates readme file, writes title, checks for license value and writes badge
  function printTitle(response) {
    let title = 
`# ${response.title}`;
    fs.writeFile("README.md", title, (err) => {
      if (err) throw err;
      console.log("Readme created and title written to page");
    })

    if (response.license !== "Other") {
      badge =  `\n ![](https://img.shields.io/badge/license-${response.license}-green)`

      fs.appendFile("README.md", badge, (err) => {
        if (err) throw err;
        console.log("badge written to document");
      })
    }
  }
//checks license selections and assigns licenseDescription with correct description 
  function hasLicense(response) {
    if (response.license === "Apache 2.0") {
      licenseDescription =
        "A permissive license whose main conditions require preservation of copyright and license notices.Contributors provide an express grant of patent rights. Licensed works, modifications, and larger works may be distributed under different terms and without source code";
    } else if (response.license === "MIT") {
      licenseDescription = "A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.";
    } else if (response.license === "GPL") {
      licenseDescription = "The GNU GPL is the most widely used free software license and has a strong copyleft requirement. When distributing derived works, the source code of the work must be made available under the same license. There are multiple variants of the GNU GPL, each with different requirements.";
    } else if (response.license === "BSD 3.0") {
      licenseDescription = "OpenBSD strives to provide code that can be freely used, copied, modified, and distributed by anyone and for any purpose. This maintains the spirit of the original Berkeley Software Distribution";
    } else {
      licenseDescription = "No license information available"
    }
  }
//takes the rest of the input and appends to the readme
  function mainContent(response) {

    const content =     
    `\n ## Table of Contents 
  * [Description](#description) 
  * [Installation](#installation) 
  * [Usage](#usage)
  * [License](#license)
  * [Contribution](#Contribution) \n
  * [Tests](#tests)
  * [Questions](#questions)` 
  +
  `\n## Description \n${response.description}` +
  `\n## Installation \n${response.installation}` +
  `\n## Usage \n${response.usage}` +
  `\n## Contributionv\n${response.contribution}` +
  `\n## Tests \n${response.tests}` +
  `\n## License \n${response.license}\n` +
  `\n${licenseDescription}` +
  `\n## Questions \n you can contact me directly for any questions you maybe have via email:  ${response.email}.
  \nPlease visit my github page here: www.github.com/${response.github}`;
        
    fs.appendFile("README.md", content, (err) => {
      if (err) throw err;
      console.log("Main content written to the page");
    })
  }