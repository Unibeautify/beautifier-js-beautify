import { BeautifierOptions, OptionValues, BeautifierLanguageOptions } from "unibeautify";
const commonOptions: BeautifierLanguageOptions = {
  indent_char: [
    ["indent_style"],
    (options: OptionValues): string | undefined => {
      if (options.indent_style === "tab") {
        return "\t";
      } else if (options.indent_style === "space") {
        return " ";
      }
    }
  ],
};
const options: BeautifierOptions = {
  JSON: {
    ...commonOptions,
    indent_size: true,
  },
  JavaScript: {
    ...commonOptions,
    indent_size: true,
    brace_style: true,
    // eol: true,
    preserve_newlines: true,
    unindent_chained_methods: [
      ["indent_chained_methods"],
      ({ indent_chained_methods: val }) =>
        (val === true) ? false : ((val === false) ? true : val)
    ],
    break_chained_methods: true,
    max_preserve_newlines: true,
    space_in_paren: true,
    space_in_empty_paren: true,
    jslint_happy: true,
    space_after_anon_function: true,
    keep_array_indentation: true,
    space_before_conditional: true,
    unescape_strings: true,
    wrap_line_length: true,
    end_with_newline: true,
    comma_first: true,
    keep_function_indentation: true,
  },
  HTML: {
    ...commonOptions,
    indent_size: true,
    brace_style: true,
    indent_inner_html: true,
    wrap_line_length: true,
    unformatted: true,
    // content_unformatted: true,
    indent_scripts: true,
    preserve_newlines: true,
    max_preserve_newlines: true,
    end_with_newline: true,
    extra_liners: "newline_before_tags",
    wrap_attributes: true,
    wrap_attributes_indent_size: true,
  },
  CSS: {
    ...commonOptions,
    indent_size: true,
    selector_separator_newline: true,
    newline_between_rules: true,
    preserve_newlines: true,
    wrap_line_length: true,
    end_with_newline: true
  }
};

export default options;
