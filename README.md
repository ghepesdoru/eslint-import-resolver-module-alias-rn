# eslint-import-resolver-module-alias-rn

A [babel-plugin-module-alias-rn](https://github.com/ghepesdoru/babel-plugin-module-alias-rn) resolver for [eslint-plugin-import][eslint-plugin-import]

## Installation

```sh
npm install --save-dev eslint-plugin-import eslint-import-resolver-module-alias-rn
```

## Usage

Inside your `.eslintrc` file, pass this resolver to `eslint-plugin-import`:
```
"settings": {
  "import/resolver": {
    "module-alias-rn": {}
  }
}
```

And see [babel-plugin-module-alias-rn](https://github.com/ghepesdoru/babel-plugin-module-alias-rn) to know how to configure your aliases.

### Example

```
{
  react: Boolean,
  root: String,
  map: [
    {
      expose: String,
      src: String
    },
    ...
  ]
}
```

## License

MIT, see [LICENSE.md](/LICENSE.md) for details.
