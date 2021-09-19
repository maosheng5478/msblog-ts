interface tab {
  label: string;
  name: string;
  path: string;
}
const state = {
  currentMenu: null,
  tabsList: [
    {
      label: '首页',
      name: 'dashboard',
      path: '/admin'
    }
  ]
};
const mutations = {
  // 选择标签
  selectMenu(state: any, val: tab) {
    if (val.name === 'home') {
      state.currentMenu = null;
    } else {
      state.currentMenu = val;
      // 如果等于-1说明tabsList不存在那么插入，否则什么都不做
      const result = state.tabsList.findIndex((item: tab) => item.name === val.name);
      if (result === -1) {
        state.tabsList.push(val);
      }
    }
  },
  // 关闭标签
  closeTab(state: any, val: tab) {
    const result = state.tabsList.findIndex((item: tab) => item.name === val.name);
    state.tabsList.splice(result, 1);
  },
};

const actions = {
};

export default {
  state,
  mutations,
  actions
};