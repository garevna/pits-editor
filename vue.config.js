module.exports = {
  chainWebpack: config => config.optimization.minimize(true),
  transpileDependencies: [
    'vuetify'
  ]
}
