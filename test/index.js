/* eslint-env mocha */
import assert from 'assert';
import path from 'path';
import resolverPlugin from '../src';

const opts = {};
const PROJECT_ROOT = path.join(path.dirname(__filename), '..');
const TESTS_FILE = path.join(PROJECT_ROOT, 'test', 'index.js');

describe('Resolves mappings for Eslint', () => {
  beforeEach(() => {
    process.chdir(PROJECT_ROOT);
  });

  it('handles npm modules - babel-core :: absolute', () => {
    const result = resolverPlugin.resolve('babel-core', TESTS_FILE, opts);

    assert.deepEqual(result, {
      found: true,
      path: `${PROJECT_ROOT}/node_modules/babel-core/index.js`
    });
  });

  it('handles npm prefixed modules - babel-core :: absolute', () => {
    const result = resolverPlugin.resolve('npm:babel-core', TESTS_FILE, opts);

    assert.deepEqual(result, {
      found: true,
      path: `${PROJECT_ROOT}/node_modules/babel-core/index.js`
    });
  });

  it('handles relative prefixed modules - fallback.js :: absolute', () => {
    const result = resolverPlugin.resolve('./mock/fallback.js', TESTS_FILE, opts);

    assert.deepEqual(result, {
      found: true,
      path: `${PROJECT_ROOT}/test/mock/fallback.js`
    });
  });

  it('handles relative prefixed modules with aliases - fallback.js :: absolute', () => {
    const result = resolverPlugin.resolve('mocks/fallback', TESTS_FILE, opts);

    assert.deepEqual(result, {
      found: true,
      path: `${PROJECT_ROOT}/test/mock/fallback.js`
    });
  });
});
