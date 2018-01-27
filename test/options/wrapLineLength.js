import test from "ava";
import { newUnibeautify, Beautifier } from "unibeautify";
import beautifier from "../../dist";

test.beforeEach(t => {
  t.context.unibeautify = newUnibeautify();
});

testWithWrapLineLength(12);
testWithWrapLineLength(20);
testWithWrapLineLength(80);
testWithWrapLineLength(120);

function testWithWrapLineLength(wrapLineLength) {
  test(`should successfully beautify JavaScript text with wrap_line_length=${wrapLineLength}`, t => {
    const { unibeautify } = t.context;
    unibeautify.loadBeautifier(beautifier);

    const shortString = "c";
    const veryLongString = "c".repeat(Math.ceil(wrapLineLength / 2));

    const shortText = `["${shortString}", "${shortString}"];`;
    const shortBeautifierResult = shortText;

    if (shortText.length > wrapLineLength) {
      throw new Error(`Test text will always wrap. Please use a printWidth value greater than ${shortText.length}.`);
    }
    const longText = `["${veryLongString}", "${veryLongString}"];`;
    const longBeautifierResult = `["${veryLongString}",\n  "${veryLongString}"\n];`;

    const indentSize = 2;
    return Promise.all([
      beautifyWithPrintWidth(unibeautify, shortText, wrapLineLength).then(results => {
        t.is(results, shortBeautifierResult, "Short text should not wrap");
      }),
      beautifyWithPrintWidth(unibeautify, longText, wrapLineLength).then(results => {
        t.is(results, longBeautifierResult, "Long text should wrap");
      })
    ]);
  });
}

function beautifyWithPrintWidth(unibeautify, text, printWidth) {
  const indentSize = 2;
  return unibeautify.beautify({
    languageName: "JavaScript",
    options: {
      JavaScript: {
        indent_char: " ",
        indent_size: indentSize,
        end_with_comma: false,
        wrap_line_length: printWidth
      }
    },
    text
  });
}
