/* global window */
/* global document */
/* global location */
import { routerRedux } from 'dva/router';
import { parse } from 'qs';
import config from '../utils/config';
import { EnumRoleType } from 'enums';
import * as queryString from 'query-string';
import { query, logout, fetchAccount } from '../services/app';
import {clearLogin,permission} from "utils";
import { goLogin } from "utils/sso";


const { prefix } = config;

export default {
  namespace: 'app',
  state: {
    //账号可用账套
    accountList:[],
    /****  分割 *****/
    employeeInfo: {},
    permissions: {
      visit: [],
    },
    menu: [
      // {
      //   id: 1,
      //   icon: 'laptop',
      //   name: 'Dashboard',
      //   router: '/dashboard',
      // },
    ],
    menuPopoverVisible: false,
    siderFold: window.localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: window.localStorage.getItem(`${prefix}darkTheme`) === 'true',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(window.localStorage.getItem(`${prefix}navOpenKeys`)) || [],
    locationPathname: '',
    locationQuery: {},
    suffix: ''
  },
  subscriptions: {

    setupHistory ({ dispatch, history }) {
      history.listen((location) => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: queryString.parse(location.search),
            suffix: '', // 每个页面进入时，清空页面标题后缀，需要设置时在每个页面的model单独设置
          },
        });
      });
    },

    setup ({ dispatch,history }) {
      if(location.pathname ==="/logout"){ //如果访问的/logout页面，则调用登出方法，其他什么也不做
        dispatch({ type: 'logout' });
        return ;
      }

      dispatch({ type: 'query' });
      let tid;
      window.onresize = () => {
        clearTimeout(tid);
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' });
        }, 300);
      };
    },

  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const { prefix, openPages } = config;
      if (openPages && !openPages.includes(location.pathname)) {
       
        const response = yield call(query, payload);
       
        if(!response || !response.data)
          return;
          
        const { success, data:{employeeInfo,menus, permissionCodes} } = response;
        const { locationPathname } = yield select(_ => _.app);
        if (success && employeeInfo) {
          permission.setCache(permissionCodes);//缓存权限
          
          yield put({
            type: 'updateState',
            payload: {
              employeeInfo,
              menu:menus
            },
          });
        };

        // yield put({ type: 'fetchAccount' })
        // if (location.pathname === '/login') {
        //   yield put(routerRedux.push({
        //     pathname: '/dashboard',
        //   }));
        // }
      }
     
    },

    * logout ({
      payload,
    }, { call, put }) {
      const data = yield call(logout, parse(payload));
      if (data.success) {
        clearLogin();
        goLogin();
      } else {
        throw (data);
      }
    },

    * changeNavbar (action, { put, select }) {
      const { app } = yield (select(_ => _));
      const isNavbar = document.body.clientWidth < 769;
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar });
      }
    },

    // 账号下面的可切换账套
    // *fetchAccount(_, { put, call }){
    //   const res = yield call(fetchAccount);
    //   if(res.success){
    //     yield put({
    //       type:'updateState', 
    //       payload: {
    //         accountList: res.data.results
    //       }})
    //   }
    // },

  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },

    switchSider (state) {
      window.localStorage.setItem(`${prefix}siderFold`, !state.siderFold);
      return {
        ...state,
        siderFold: !state.siderFold,
      };
    },

    switchTheme (state) {
      window.localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme);
      return {
        ...state,
        darkTheme: !state.darkTheme,
      };
    },

    switchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      };
    },

    handleNavbar (state, { payload }) {
      return {
        ...state,
        isNavbar: payload,
      };
    },

    handleNavOpenKeys (state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      };
    },
  },
};
