/* eslint-disable import/prefer-default-export */
import {
  ErrorShowType,
  RequestConfig,
  history,
  isBrowser,
  getLocale,
  getDvaApp,
} from 'umi';
import { RequestOptionsInit } from 'umi-request';
import { Toast } from 'antd-mobile';

const loginPath = '/login';

// export async function getInitialState() {
//   const res = window.localStorage.getItem('member');
//   if (!res) {
//     return null;
//   }
//   return {
//     member: JSON.parse(res),
//   };
// }

export const request: RequestConfig = {
  requestInterceptors: [
    (url: string, options: RequestOptionsInit) => {
      if (!options.silent) {
        Toast.show({
          icon: 'loading',
          duration: 0,
        });
      }
      let newUrl = url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        if (isBrowser()) {
          newUrl = process.env.URL + newUrl;
        } else {
          newUrl = process.env.SSR_URL + newUrl;
        }
      }

      const headers: any = {};
      if (getDvaApp()._store.getState()?.member?.loginMember) {
        headers.memberId =
          getDvaApp()._store.getState()?.member?.loginMember.id;
        headers.token =
          getDvaApp()._store.getState()?.member?.loginMember.token;
      }
      if (options.headers) {
        Object.assign(headers, options.headers);
      }
      // eslint-disable-next-line no-param-reassign
      options.headers = headers;

      return {
        url: newUrl,
        options,
      };
    },
  ],
  responseInterceptors: [
    (response: Response, options: RequestOptionsInit) => {
      if (!options.silent) {
        Toast.clear();
      }
      return response;
    },
  ],
  headers: {
    'Accept-Language': getLocale(),
  },
  // errorConfig: {
  //   adaptor: (resData: any) => ({
  //     success: resData && resData.code === 0,
  //     errorMessage: resData.msg,
  //     showType: ErrorShowType.WARN_MESSAGE,
  //   }),
  // },
  errorConfig: {
    adaptor: (resData: any) =>
      // console.log(resData);
      // eslint-disable-next-line implicit-arrow-linebreak
      ({
        success: resData && resData.code === 0,
        errorMessage: resData.msg,
        showType: ErrorShowType.WARN_MESSAGE,
      }),
  },
  errorHandler: (error: any) => {
    const { response, info } = error;

    if (!response || !info) {
      Toast.show({
        icon: 'fail',
        content:
          'Your network is abnormal and you cannot connect to the server.',
      });
    }
    if (info?.showType) {
      Toast.show({
        icon: 'fail',
        content: info.errorMessage,
      });
    }

    if (response && (response.code === 401 || response.code === 403)) {
      getDvaApp()._store.dispatch({
        type: 'member/updateLoginMember',
        payload: undefined,
      });
      window.localStorage.removeItem('member');
      // 401表示未登录，跳转到登录
      history.push(loginPath);
    }
    throw error;
  },
};

// function parseLanguage(lang = '') {
//   const allLocales = getAllLocales();
//   // 完全匹配
//   if (allLocales.includes(lang)) {
//     return lang;
//   }

//   // 前缀匹配
//   const matchedLang = allLocales.find((aLang = '')
// => aLang.split('-')[0] === lang.split('-')[0]);
//   if (matchedLang) {
//     return matchedLang;
//   }

//   const language = allLocales[0] || 'zh-CN';
//   return language;
// }

// export const locale = {
//   getLocale() {
//     // const { search } = window.location;
//     // const {local: local} = qs;
//     let language;
//     if (isBrowser()) {
//       language = parseLanguage(window.navigator.language);
//     } else {
//       // @ts-ignore
//       const lang = global._navigatorLang || 'zh-CN';
//       language = parseLanguage(lang);
//     }
//     return language;
//   },
// };
export const dva = {
  config: {
    onError(e: Error) {
      // message.error(e.message, 3);
      // Toast.show(e.message);
    },
  },
};
