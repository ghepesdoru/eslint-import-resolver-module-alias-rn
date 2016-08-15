const path = require('path');
const mapModule = require('babel-plugin-module-alias-rn').mapModule;
const findBabelConfig = require('find-babel-config'); // eslint-disable-line

function findModuleAliasConfig(conf) {
  if (conf.plugins) {
    return conf.plugins.find(p => p[0] === 'module-alias-rn' || p[0] === 'babel-plugin-module-alias-rn');
  }
  return null;
}

function getPluginOpts(config) {
  const env = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';

  if (config) {
    const pluginConfig = findModuleAliasConfig(config);

    if (config.env && config.env[env]) {
      const envPluginConfig = findModuleAliasConfig(config.env[env]);
      if (envPluginConfig) {
        if (pluginConfig) {
          return {
            root: [].concat(pluginConfig[1].root, envPluginConfig[1].root),
            react: pluginConfig[1].react || envPluginConfig[1].react,
            map: Object.assign({}, pluginConfig[1].map, envPluginConfig[1].map)
          };
        }

        return envPluginConfig[1];
      }
    }

    if (pluginConfig) {
      return pluginConfig[1];
    }
  }

  return {};
}

exports.interfaceVersion = 2;

/**
 * Find the full path to 'source', given 'file' as a full reference path.
 *
 * resolveImport('./foo', '/Users/ben/bar.js') => '/Users/ben/foo.js'
 * @param  {string} source - the module to resolve; i.e './some-module'
 * @param  {string} file - the importing file's full path; i.e. '/usr/local/bin/file.js'
 * @param  {object} options - the resolver options
 * @return {object}
 */
exports.resolve = (source, file) => {
  const babelConfig = findBabelConfig.sync(path.dirname(file));
  const babelrcPath = babelConfig.file;
  const config = babelConfig.config;
  if (babelrcPath) {
    // Editor have a working directory equals to the directory in which `file` is located
    // But the babel plugin works with a working directory based on the babelrc file
    process.chdir(path.dirname(babelrcPath));
  }

  try {
    const pluginOpts = { opts: getPluginOpts(config) };
    console.log({
      source, pluginOpts
    });
    const src = mapModule(source, pluginOpts) || source;
    return {
      found: true,
      path: require.resolve(src),
    };
  } catch (e) {
    return { found: false, e };
  }
};
