import test from "ava";
import { newUnibeautify, Beautifier } from "unibeautify";
import beautifier from "../../dist";

test.beforeEach(t => {
  t.context.unibeautify = newUnibeautify();
});

test("should successfully beautify HTML text", t => {
  const { unibeautify } = t.context;
  unibeautify.loadBeautifier(beautifier);

  const text = `<div>\n<span>Hello</span>\n<span>World</span>\n</div>`;
  const beautifierResult = `<div>\n  <span>Hello</span>\n  <span>World</span>\n</div>`;

  return unibeautify
    .beautify({
      languageName: "HTML",
      options: {
        HTML: {
          indent_char: " ",
          indent_size: 2
        }
      },
      text
    })
    .then(results => {
      t.is(results, beautifierResult);
    });
});

