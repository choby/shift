import modelExtend from 'dva-model-extend';
import { Message } from 'antd';

const model = {
  effects: {
    * setPageTitle ({ payload }, { put }) {
      if (payload) {
        yield put({
          type: 'app/updateState',
          payload: { suffix: payload.title },
        });
      }
    },
  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },

    success (state, { message }) {
      Message.success(message);
      return { ...state };
    },

    info (state, { message }) {
      Message.info(message);
      return { ...state };
    },

    warning (state, { message }) {
      Message.warning(message);
      return { ...state };
    },

    error (state, { message }) {
      Message.error(message);
      return { ...state };
    },

  },
};

const pageModel = modelExtend(model, {

  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `Total ${total} Items`,
      current: 1,
      total: 0,
    },
  },

  reducers: {
    querySuccess (state, { payload }) {
      const { list, pagination } = payload;
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      };
    },
  },

});


export { model, pageModel };
