import test from "ava";
import { newUnibeautify, Beautifier } from "unibeautify";
import beautifier from "../../dist";

test.beforeEach(t => {
  t.context.unibeautify = newUnibeautify();
});

// testWithIndentSize(0, true);
testWithIndentSize(1, true);
// testWithIndentSize(2, true);

// testWithIndentSize(0, false);
testWithIndentSize(2, false);
testWithIndentSize(4, false);

function testWithIndentSize(indentSize, useTabs = false) {
  test(`should successfully beautify JavaScript text with indent_size=${indentSize} using ${useTabs ? "tabs" :"spaces"}`, t => {

    const { unibeautify } = t.context;
    unibeautify.loadBeautifier(beautifier);

    const indentChar = useTabs ? "\t" : " ";
    const indentation = useTabs ? "\t" : indentChar.repeat(indentSize);

    const text = `function test(n){return n+1;}`;
    const beautifierResult = `function test(n) {
${indentation}return n + 1;
}`;

    return unibeautify
      .beautify({
        languageName: "JavaScript",
        options: {
          JavaScript: {
            indent_char: indentChar,
            indent_size: indentSize,
          }
        },
        text
      })
      .then(results => {
        t.is(results, beautifierResult);
      });
  });
}
