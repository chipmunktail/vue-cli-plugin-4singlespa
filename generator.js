module.exports = api => {
  const isTs = api.entryFile.endsWith('.ts')
  const usesRouter = Boolean(require(api.resolve('package.json')).dependencies['vue-router'])
  const usesStore = Boolean(require(api.resolve('package.json')).dependencies['vuex'])
  const usesElementUI = Boolean(require(api.resolve('package.json')).dependencies['element-ui'])
  const usesSingleSpa = Boolean(require(api.resolve('package.json')).dependencies['single-spa-vue'])
  const projectName = require(api.resolve('package.json')).name;

  api.render('./template', {
    isTs,
    usesRouter,
    usesStore,
    usesElementUI,
    usesSingleSpa,
    appName: projectName,
  })

  api.extendPackage({
    scripts: {
      'gulp': 'gulp',
      'micro': 'npm run build && serve --cors -l 5100 ./dist'
    },
    dependencies: {
      'gulp': '^4.0.2',
    },
    devDependencies: {
      'axios': '^0.19.2',
    }
  })

  if (api.invoking && api.hasPlugin('typescript')) {
    /* eslint-disable-next-line node/no-extraneous-require */
    const convertFiles = require('@vue/cli-plugin-typescript/generator/convert')
    convertFiles(api)
  }
}
