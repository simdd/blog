虚拟 dom
依赖收集
脏检查

解释下这三者的区别，以及为什么会有这样的区别

render Virtual DOM + diff O(template size) + O(DOM change)
scope digest O(watcher count) + 必要 DOM 更新 O(DOM change)
重新收集依赖 O(data change) + 必要 DOM 更新 O(DOM change)

虚拟dom：通过维护json对象，渲染出虚拟dom，在dom结构层面做diff然后做必要的dom更新
依赖收集：通过观察数据变化并保留对实际 DOM 元素的引用，当有数据变化时进行对应的dom操作
脏检查：通过设置一个监听队列，用来监听数据变化并更新view，当接收到事件处理时，脏检查触发，遍历监听队列，，最后更新dom

小量数据更新
修改了一个a节点的内容

依赖收集：a节点修改，操作dom更新
Virtual DOM：生成新vdom，做diff，操作dom更新
脏检查：遍历监听队列，做diff，操作dom更新