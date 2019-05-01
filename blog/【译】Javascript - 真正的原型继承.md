> 原文地址：[Javascript – How Prototypal Inheritance really works](http://blog.vjeux.com/2011/javascript/how-prototypal-inheritance-really-works.html)

在网上可以看到各种关于 Javascript 原型继承的文章，但 Javascript 规范中只提供了 new 操作符这一种实现原型继承的方法。因此网上大多数的文章是具有迷惑性的，很混乱。这篇文章会让你清晰的认识到什么是真正的原型继承？并且怎么样使用它？

### **原型继承的定义:**

你会经常看到如下关于原型继承的定义：

> 访问一个对象属性的时候，Javascript 会沿着原型链向上寻找，直到找到该属性。

Javascript 中大多数实现方式都是使用**proto**来指定原型链中下一个被访问的对象，接下来会揭示**proto**与 prototype 之间的区别。

**注意：不要在你的代码中使用**proto**，文中使用它仅仅是为了更好的解释 Javascript 继承是如何工作的。**

下面的代码展示了 Javascript 引擎如何检索对象的属性（伪代码，仅为了方便理解）

    function getProperty(obj, prop) {
        if (obj.hasOwnProperty(prop)){
            return obj[prop];
        }else if (obj.__proto__ !== null){
            return getProperty(obj.__proto__, prop);
        }else{
            return undefined;
        }
    }

举个例子：一个二维的点。拥有 x 坐标属性，y 坐标属性和一个 print 方法。

用书面语言来表示该定义就是：我们定义了一个有三个属性的对象：x，y 和 print。为了构造一个新点，我们只需要创建一个对象并将他的**proto**属性指向 Point。

    var Point = {
        x: 0,
        y: 0,
        print: function () { console.log(this.x, this.y); }
    };
    var p = {x: 10, y: 20, __proto__: Point};
    p.print(); // 10 20

### **奇怪的原型继承:**

怪异之处在于解释原型继承的人给出的例子往往与他们的定义不相符合，他们给出的代码通常如下所示：

    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype = {
        print: function () { console.log(this.x, this.y); }
    };
    var p = new Point(10, 20);
    p.print(); // 10 20

上面所例举的代码跟原型继承完全不相关，Point 是构造函数，它有一个 prototype 属性，使用了 new 操作符，但是然后呢？

### **new 是如何工作的:**

Brendan Eich 想让 javascript 像 Java，C++这些传统的面向对象语言一样，用 new 操作类直接构造一个实例，所以他给 Javascript 也添了 new 操作符。

- C++中有构造函数，用来初始化实例的属性。因此，new 操作符操作的对象必须是函数。
- 我们需要把对象的方法挂载到某个地方，由于我们使用的是原型语言，我们把他放在函数的原型属性里。

### **new 操作符构造步骤有三步：**

1.  构造一个类的实例：这个实例是一个空对象，并且他的**proto**属性指向构造函数的原型。
2.  初始化实例：构造函数被调用，并将 this 指向这个实例。
3.  返回实例对象。

现在我们了解了 new 构造的过程，我们在 Javascript 中实现它：

    function New (f) {
        var n = { '__proto__': f.prototype };
        return function () {
            f.apply(n, arguments);
            return n;
        };
    }

举一个小例子：

    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype = {
        print: function () { console.log(this.x, this.y); }
    };

    var p1 = new Point(10, 20);
    p1.print(); // 10 20
    console.log(p1 instanceof Point); // true

    var p2 = New (Point)(10, 20);
    p2.print(); // 10 20
    console.log(p2 instanceof Point); // true

### **Javascript 中真正的原型继承:**

Javascript 规范只定义了 new 操作符的工作流程，Douglas Crockford 发现了一种利用 new 实现原型继承的新方法，他写的 Object.create 函数。

    Object.create = function (parent) {
        function F() {}
        F.prototype = parent;
        return new F();
    };

看起来很奇怪，但实际上很简洁。他只创建了一个新的对象，原型你可以随意设置。如果允许使用**proto**的话，这个例子可以这样写：

    Object.create = function (parent) {
        return { '__proto__': parent };
    };

下面这个 Point 例子才是真正的原型继承。

    var Point = {
        x: 0,
        y: 0,
        print: function () { console.log(this.x, this.y); }
    };

    var p = Object.create(Point);
    p.x = 10;
    p.y = 20;
    p.print(); // 10 20

### **结论:**

我们了解了原型继承并用一种具体的方法实现了它。但这样写有一些缺点：

- 不标准：**proto**不是标准并不赞成使用， 并且原生的 Object.create 和 Douglas Crockford 的实现不等同。
- 不优化：Object.create (原生的或自定义的)作为构造函数是及其不高效的。

![image](https://user-images.githubusercontent.com/27946444/56470206-1d2e4180-6476-11e9-9f7c-3b63fcb425f3.png)
