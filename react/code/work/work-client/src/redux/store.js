/*
redux最核心的管理对象模块 代码十分固定
首先创建一个store,并且引入redux
之后暴露store
之后要给createStore传入reducers,同时引入./reducers
最后引入插件thunk，和应用插件applyMiddleware，
调试工具import {composeWithDevTools} from 'redux-devtools-extension';
最后在index入口文件中使用store ，引入Provider
*/
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import reducers from './reducers';


//向外暴露store
export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))