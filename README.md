# htmlparser

A forgiving HTML parser. Convert HTML string to AST.

## Usage

```js
const htmlParser = require('html-parser')
const html = `<div style="height: 10px;width: 10px;" data-id="react-root"><!-- Comment -->Hello World <br><b>Road to Roman</b> </div>`
htmlParser(html, {})

```
