// Node Library 

let fs = require("fs");
let inquirer = require("inquirer");

//list for application lincese 


inquirer
    .prompt([
        {
            type: "input",
            message: "What is your project Title?",
            name: "title"
        },

        {
            type: "input", 
            message: "Please enter in a quick description of your project.",
            name: "description"
        },
        {
            type: "rawlist",
            message: "Choose your fighter",
            name: "pokemon",
            choices: ["pikachu", "charmander", "squirtle", "bulbasaur", "myself"]
        },

    ]).then(function(response) {
        //responses.name write to file 
        const title = `#${response.title}`
        fs.writeFile("README.md", title, (error)=> {
            if (error) throw error;
            console.log("success");
        });
    })