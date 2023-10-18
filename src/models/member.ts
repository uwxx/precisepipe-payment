import { Effect, Reducer, request } from 'umi';

export interface MemberModelState {
  loginMember?: any;
}

export interface MemberModelType {
  namespace: 'member';
  state: MemberModelState;
  effects: {
    login: Effect;
    updateLoginMember: Effect;
    autoLogin: Effect;
  };
  reducers: {
    save: Reducer<MemberModelState>;
  };
  // subscriptions: { setup: Subscription };
}

const MemberModel: MemberModelType = {
  namespace: 'member',

  state: {
    loginMember: undefined,
  },

  effects: {
    *login({ payload, callback }, { call, put }) {
      console.log(2222222222);
      const res = yield call(request, '/pc/account/login', {
        method: 'POST',
        data: payload,
      });
      callback(res);
      if (res.data) {
        window.localStorage.setItem('member', JSON.stringify(res.data));
        yield put({
          type: 'save',
          payload: {
            loginMember: res.data,
          },
        });
      }
    },
    *updateLoginMember({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          loginMember: payload,
        },
      });
    },
    *autoLogin(a, { put }) {
      const res = window.localStorage.getItem('member');
      if (!res) {
        return;
      }
      yield put({
        type: 'save',
        payload: {
          loginMember: JSON.parse(res),
        },
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     return history.listen(({ pathname }) => {
  //       if (pathname === '/') {
  //         dispatch({
  //           type: 'query',
  //         });
  //       }
  //     });
  //   },
  // },
};

export default MemberModel;
