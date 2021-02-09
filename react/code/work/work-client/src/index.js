/*
api             ajax请求相关模块文件
assets          共用资源文件夹
components      UI组件模块文件夹
containers      容器组件模块文件夹
utils           工具模块文件夹

npm install --save-dev babel-plugin-import react-app-rewired
index           入口文件夹
*/

/*
由于绝大部分路由都要与redux进行交互
所以要定义在containers文件夹中
前端路由  注册：  /register   register.js
          登录:  /login       login/js
        主界面: main.js{
            老板主界面: /laoban   laoban.js
            大神主界面: /dashen   dashen.js
            消息列表界面: /message  message.js
            个人中心界面:  /personal  personal.js
            老板信息完善界面  /laobaninfo  /laoban-info.js
        }



*/
import { HashRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import store from './redux/store';
import Register from './containers/register/register';
import Login from './containers/login/login';
import Main from './containers/main/main';
import  './assets/css/index.less';

ReactDOM.render(
   <Provider store={store}>
        <HashRouter>
            <Switch> {/*三个组件只能显示一个 */}
                <Route path='/register' component={Register}></Route>
                <Route path='/login' component={Login}></Route>
                <Route component={Main}></Route> {/*main相当于默认组件 */}
            </Switch>
        </HashRouter>
   </Provider>,
document.getElementById('root'))