import * as jsbeautify from "js-beautify";
import { Beautifier, Language } from "unibeautify";

import options from "./options";
const beautifyJS = jsbeautify.js;
const beautifyHTML = jsbeautify.html;
const beautifyCSS = jsbeautify.css;
const pkg = require("../package.json");

export const beautifier: Beautifier = {
  name: "JS-Beautify",
  package: pkg,
  options: {
    // HTML
    HTML: options.HTML,
    XML: options.HTML,
    Handlebars: options.HTML,
    Mustache: options.HTML,
    Liquid: options.HTML,
    // JavaScript
    JavaScript: options.JavaScript,
    EJS: options.JavaScript,
    JSX: options.JavaScript,
    JSON: options.JavaScript,
    // CSS
    CSS: options.CSS
  },
  beautify(data) {
    return new Promise((resolve, reject) => {
      const { language, options, text } = data;
      try {
        switch (language.name) {
          case "JSON":
          case "JavaScript":
            return resolve(beautifyJS(text, options));
          case "JSX":
            options.e4x = true;
            options.es4 = true;
            return resolve(beautifyJS(text, options));
          case "Handlebars":
          case "Mustache":
            options.indent_handlebars = true;
            return resolve(beautifyHTML(text, options));
          case "EJS":
          case "Liquid":
          case "HTML":
          case "XML":
            return resolve(beautifyHTML(text, options));
          case "CSS":
            return resolve(beautifyCSS(text, options));
          default:
            return reject(
              new Error("Unknown language for JS Beautify: " + language)
            );
        }
      } catch (error) {
        return reject(error);
      }
    });
  }
};

export default beautifier;
