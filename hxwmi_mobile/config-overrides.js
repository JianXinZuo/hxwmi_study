const modifyVars = require('./LessVars');
const {
    override,
    addDecoratorsLegacy,
    disableEsLint,
    // addBundleVisualizer,
    // addWebpackAlias,
    // adjustWorkbox,
    fixBabelImports,
    addLessLoader,
} = require("customize-cra");

const path = require("path");
module.exports = override(
    //启用旧式装饰器babel插件
    addDecoratorsLegacy(),
   
    //关闭EsLint
    disableEsLint(),
   
    // // add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
    // process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),
   
    // // add an alias for "ag-grid-react" imports
    // addWebpackAlias({
    //   ["ag-grid-react$"]: path.resolve(__dirname, "src/shared/agGridWrapper.js")
    // }),
   
    // // adjust the underlying workbox
    // adjustWorkbox(wb =>
    //   Object.assign(wb, {
    //     skipWaiting: true,
    //     exclude: (wb.exclude || []).concat("index.html")
    //   })
    // ),

    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        libraryDirectory: 'es',
        style: true,
    }),

    addLessLoader({
        javascriptEnabled: true,
        modifyVars,     //自定义主题
    }),

  );