### 目录

[开始](#开始)
[行为、数据、与视图](#行为、数据、与视图)
[依赖收集](#依赖收集)
[虚拟 dom](#虚拟dom)
[脏检查](#脏检查)

### 开始

// todo

### 行为、数据、与视图

// todo

### 依赖收集

// todo

### 虚拟 dom

// todo

### 脏检查

// todo

---

虚拟 dom
依赖收集
脏检查

解释下这三者的区别，以及为什么会有这样的区别

render Virtual DOM + diff O(template size) + O(DOM change)
scope digest O(watcher count) + 必要 DOM 更新 O(DOM change)
重新收集依赖 O(data change) + 必要 DOM 更新 O(DOM change)

虚拟 dom：通过维护 json 对象，渲染出虚拟 dom，在 dom 结构层面做 diff 然后做必要的 dom 更新
依赖收集：通过观察数据变化并保留对实际 DOM 元素的引用，当有数据变化时进行对应的 dom 操作
脏检查：通过设置一个监听队列，用来监听数据变化并更新 view，当接收到事件处理时，脏检查触发，遍历监听队列，，最后更新 dom

小量数据更新
修改了一个 a 节点的内容

依赖收集：a 节点修改，操作 dom 更新
Virtual DOM：生成新 vdom，做 diff，操作 dom 更新
脏检查：遍历监听队列，做 diff，操作 dom 更新
