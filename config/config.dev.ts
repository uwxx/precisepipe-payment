import { defineConfig } from 'umi';

export default defineConfig({
  proxy: {
    '/front-api': {
      // target: 'http://localhost:8090',
      // target: 'http://192.168.31.108:8091',
      target: 'https://test.uooi.com/front-api/', // 测试地址
      changeOrigin: true,
      pathRewrite: { '^/front-api': '' },
    },
  },
  define: {
    'process.env.URL': '/front-api',
    'process.env.STATIC': 'https://uooi.oss-cn-hongkong.aliyuncs.com',
    'process.env.STATIC_URL': 'https://uooi.oss-cn-hongkong.aliyuncs.com',
    'process.env.GOOGLE_MAP_KEY': 'AIzaSyAEGXRVAePhfubx_2m0Udcp1wkMLDIWizU',
  },
});
