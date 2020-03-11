import React, { Component } from "react";
import { createBrowserHistory } from "history";
import matchPath from './15.2MatchPath'

//创建一个上下文保存history、location等
const RouterContext = React.createContext();

// Router：管理历史记录变更，location变更等等，并传递给后代
class BrowserRouter extends Component {
  constructor(props) {
    super(props);

    // 创建浏览器history对象
    this.history = createBrowserHistory(this.props);

    // 创建状态管理location
    this.state = {
      location: this.history.location
    };

    // 开启监听
    this.unlisten = this.history.listen(location => {
      this.setState({ location });
    });
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }

  render() {
    return (
      <RouterContext.Provider
        value={{
          history: this.history,
          location: this.state.location
        }}
        children={this.props.children}
      />
    );
  }
}

class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          const location = context.location;

          // 根据pathname和用户传递props获得match对象
          const match = matchPath(location.pathname, this.props);

          // 要传递一些参数
          const props = { ...context, match };

          // children component render
          let { children, component, render } = this.props;

          if (children && typeof children === "function") {
            children = children(props);
          }

          return (
            <RouterContext.Provider value={props}>
              {children // children优先级最高，不论匹配与否存在就执行
                ? children
                : (props.match // 后面的component和render必须匹配
                ? (component // 若匹配首先查找component
                  ? React.createElement(component) // 若它存在渲染之
                  : (render // 若render选项存在
                  ? render(props) // 按render渲染结果
                  : null))
                : null)}
            </RouterContext.Provider>
          );
        }}
      </RouterContext.Consumer>
    );
  }
}

class Link extends React.Component {
  handleClick(event, history) {
    event.preventDefault();
    history.push(this.props.to);
  }

  render() {
    const { to, ...rest } = this.props;
    return <RouterContext.Consumer>
        {context => {
          return (
            <a {...rest}
              onClick={event => this.handleClick(event, context.history)}
              href={to}
            >
              {this.props.children}
            </a>
          );
        }}
      </RouterContext.Consumer>
  }
}

export default class MyRouterTest extends Component {
  render() {
    return (
      <BrowserRouter>
        <Link to="/foo">foo</Link>&nbsp;|&nbsp;
        <Link to="/bar">bar</Link>&nbsp;|&nbsp;
        <Link to="/mua/aaa">mua</Link>
        <Route path="/foo" component={() => <div>foo</div>} />
        <Route path="/bar" component={() => <div>bar</div>} />
        <Route path="/mua/:ns" render={({ match }) => match.params.ns} /><br/>
        {/* Route里children优先级最高, 无论什么路径, 或者出现什么<Link></Link>,如果出现children都要匹配 */}
        <Route children={({location}) => "xxx"} />
      </BrowserRouter>
    );
  }
}
