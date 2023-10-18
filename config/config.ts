import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  locale: {
    default: 'en',
    antd: true,
    baseNavigator: true,
    baseSeparator: '-',
  },
  antd: {
    mobile: false,
  },
  // mfsu: {},
  dva: {},
  dynamicImport: {
    loading: '@/components/PageLoading',
  },
  routes: [
    {
      component: '@/layouts/MainLayout',
      routes: [
        {
          path: '/',
          exact: true,
          component: './main/index',
        },
      ],
    },
  ],
  fastRefresh: {},
});
