import test from "ava";
import { newUnibeautify, Beautifier } from "unibeautify";
import beautifier from "../../dist";

test.beforeEach(t => {
  t.context.unibeautify = newUnibeautify();
});

test("should successfully beautify JSX text", t => {
  const { unibeautify } = t.context;
  unibeautify.loadBeautifier(beautifier);

  const text = `export default class TestCase extends React.Component {
    render() {
      return ( <div className={this.props.className} someAttr>
        <div>Smth</div>
      </div> );
    }
  }`;
  const beautifierResult = `export default class TestCase extends React.Component {
  render() {
    return (<div className={this.props.className} someAttr>
        <div>Smth</div>
      </div>);
  }
}`;

  return unibeautify
    .beautify({
      languageName: "JSX",
      options: {
        JSX: {
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

test("should successfully beautify JSX text with wrap_line_length", t => {
  const { unibeautify } = t.context;
  unibeautify.loadBeautifier(beautifier);

  const text = `export default class TestCase extends React.Component {
    render() {
      return ( <div className={this.props.className} someAttr>
        <div>Smth</div>
      </div> );
    }
  }`;
  const beautifierResult = `export default class TestCase extends React
  .Component {
    render() {
      return (
        <div className={this.props.className} someAttr>
        <div>Smth</div>
      </div>
      );
    }
  }`;

  return unibeautify
    .beautify({
      languageName: "JSX",
      options: {
        JSX: {
          indent_char: " ",
          indent_size: 2,
          wrap_line_length: 40
        }
      },
      text
    })
    .then(results => {
      t.is(results, beautifierResult);
    });
});
