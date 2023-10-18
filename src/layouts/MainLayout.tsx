/**
 * 全局公共组件，用来加载缓存的数据，自动登录等
 * Created at 2022-06-13 17:54
 */
import { getDvaApp } from 'umi';

const MainLayout = (props: any) => {
  if (getDvaApp()._store?.dispatch) {
    getDvaApp()._store?.dispatch({
      type: 'member/autoLogin',
    });
  }
  return props.children;
};

export default MainLayout;
