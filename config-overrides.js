const {rewireWorkboxInject, defaultInjectConfig} = require('react-app-rewire-workbox');
const path = require('path');

module.exports = function override(config, env) {
  const workboxConfig = {
    ...defaultInjectConfig,
    swSrc: path.join(__dirname, 'src', 'serviceworker.js')
  };
  return rewireWorkboxInject(workboxConfig)(config, env);
};