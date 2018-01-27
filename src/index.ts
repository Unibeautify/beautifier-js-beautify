import * as jsbeautify from "js-beautify";
import { Beautifier, Language } from "unibeautify";
import { wrapBeautifier, AtomPackage } from "unibeautify-beautifier";

const beautifyJS = jsbeautify.js;
const beautifyHTML = jsbeautify.html;
const beautifyCSS = jsbeautify.css;

const pkg = require("../package.json");

export const beautifier: Beautifier = {
  name: "JS-Beautify",
  options: {
    _: {
      indent_size: true,
      indent_char: true,
      // eol: true,
      preserve_newlines: true,
      // unindent_chained_methods: true,
      break_chained_methods: true,
      max_preserve_newlines: true,
      space_in_paren: true,
      // space_in_empty_paren: true,
      // jslint_happy: true,
      space_after_anon_function: true,
      keep_array_indentation: true,
      space_before_conditional: true,
      unescape_strings: true,
      wrap_line_length: true,
      // e4x: true,
      end_with_newline: true
      // comma_first: true,
      // operator_position: true,
    },
    HTML: true,
    XML: true,
    Handlebars: true,
    Mustache: true,
    JavaScript: true,
    Liquid: true,
    EJS: true,
    JSX: true,
    JSON: true,
    CSS: {
      indent_size: true,
      indent_char: true,
      selector_separator_newline: true,
      newline_between_rules: true,
      preserve_newlines: true,
      wrap_line_length: true,
      end_with_newline: true
    }
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

const config = {};

const wrappedBeautifier: Beautifier | AtomPackage = wrapBeautifier(
  pkg,
  beautifier,
  config
);
export { Beautifier, AtomPackage };
export default wrappedBeautifier;
