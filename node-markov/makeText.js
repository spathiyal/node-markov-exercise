/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

function generate(text) {
    let markMach = new markov.MarkovMachine(text);
    console.log(markMach.makeText());
}

function makeText(path) {
    fs.readFile(path, "utf8", function callback(err, data) {
        if (err) {
            console.error(`cannot read file:${path}:${err} `);
            process.exit(1);
        } else {
            generate(data);
        }
    });
}

async function makeURL(url) {
    let response;
    try {
        response = await axios.get(url)
    }
    catch (err) {
        console.error(`cannot read file:${url}:${err} `);
        process.exit(1);
    }
    generate(response.data);
}

let [method, path] = process.argv.slice(2);
if (method === 'file') {
    makeText(path)
}
else {
    console.error(`unknown method:${method}  `);
    process.exit(1);
}