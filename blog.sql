/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-03-18 22:06:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `categoryId` varchar(60) NOT NULL,
  `name` varchar(20) NOT NULL,
  `status` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', '1', 'JavaScript', '1');
INSERT INTO `category` VALUES ('2', '81268a4b-0fb9-4d83-95ac-4a73572d9df8', 'HTML', '1');
INSERT INTO `category` VALUES ('3', 'f6fe773d-d7d7-404a-ba57-2ba4c999e2cf', 'CSS', '1');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `postId` int(5) NOT NULL,
  `time` varchar(14) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES ('11', '范德萨范德萨 ', '19', '1521356906333');
INSERT INTO `comments` VALUES ('12', 'fdsafdsajklfj', '19', '1521357231215');
INSERT INTO `comments` VALUES ('13', '来一个评论看', '19', '1521357510989');
INSERT INTO `comments` VALUES ('14', '再一个评论', '19', '1521357532468');
INSERT INTO `comments` VALUES ('15', '### 评论一个带格式的', '19', '1521357649729');
INSERT INTO `comments` VALUES ('16', '### 来一个代码\n\n防守打法\n\n```javascript\nconst a = 1;\nconsole.log(a)\n```', '19', '1521357846252');
INSERT INTO `comments` VALUES ('17', '来一个代码\n\n```javascript\n\nmarked.setOptions({\n            highlight: function(code) {\n                return Highlight.highlightAuto(code).value;\n            },\n        });\n```', '19', '1521359124365');
INSERT INTO `comments` VALUES ('18', '可以试试', '24', '1521363232082');

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `abstract` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `author` varchar(60) NOT NULL,
  `ctime` varchar(14) NOT NULL,
  `mtime` varchar(14) DEFAULT '0',
  `category` int(5) NOT NULL,
  `comment` int(5) DEFAULT '0',
  `like` int(5) DEFAULT '0',
  `status` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of posts
-- ----------------------------
INSERT INTO `posts` VALUES ('14', '测试title1', '测试摘要1', '测试content1245', '1dbbfd67-72b6-49f6-9d40-dfc49dc24558', '1520586371052', '1520745079090', '1', '0', '20', '1');
INSERT INTO `posts` VALUES ('15', '5435', '5454', '54543', '1dbbfd67-72b6-49f6-9d40-dfc49dc24558', '1520652040085', '1520653322446', '1', '0', '31', '1');
INSERT INTO `posts` VALUES ('16', '5435', '5', '5', '1dbbfd67-72b6-49f6-9d40-dfc49dc24558', '1520652733944', '0', '1', '0', '10', '1');
INSERT INTO `posts` VALUES ('17', '534', '543', '543', '1dbbfd67-72b6-49f6-9d40-dfc49dc24558', '1520745088662', '0', '1', '0', '0', '1');
INSERT INTO `posts` VALUES ('18', 'html', 'html', 'html', '1dbbfd67-72b6-49f6-9d40-dfc49dc24558', '1520745778992', '0', '1', '0', '1', '1');
INSERT INTO `posts` VALUES ('19', 'html', 'html', 'html', '1dbbfd67-72b6-49f6-9d40-dfc49dc24558', '1520745944243', '0', '2', '0', '0', '1');
INSERT INTO `posts` VALUES ('20', 'html', 'html', 'html', '1dbbfd67-72b6-49f6-9d40-dfc49dc24558', '1520746116296', '0', '2', '0', '0', '1');
INSERT INTO `posts` VALUES ('21', 'html', 'html', 'html', '1dbbfd67-72b6-49f6-9d40-dfc49dc24558', '1520746158993', '0', '2', '0', '0', '1');
INSERT INTO `posts` VALUES ('22', '543', '5345', '<p><img src=\"https://dn-cnode.qbox.me/FhSNYCv6Ab9wzT6aUSfKLa0GtP4w\" alt=\"image.png\" /></p>\n<blockquote>\n<p>原文地址：知乎专栏 <a href=\"https://zhuanlan.zhihu.com/p/31640541\" target=\"_blank\" rel=\"noopener noreferrer\">https://zhuanlan.zhihu.com/p/31640541</a></p>\n</blockquote>\n<p>给大家介绍下，Egg 2.0 正式版，今天 12.3 冒泡啦，距 3.21 的 <a href=\"https://zhuanlan.zhihu.com/p/25860846\" target=\"_blank\" rel=\"noopener noreferrer\">Egg 1.0 版本</a> 时隔 8 个月。</p>\n<p><img src=\"https://dn-cnode.qbox.me/FrC_ZbrhyLkhVIquPOsMqPhvqsHX\" alt=\"image.png\" /></p>\n<blockquote>\n<p><a href=\"https://eggjs.org/\" target=\"_blank\" rel=\"noopener noreferrer\">Egg</a> 是阿里 Node.js 的核心基础框架，面向『企业级的 Web 基础框架』这个领域，提供了「微内核 + 插件机制 + 框架定制能力」，完美达成生态共建和差异化定制的平衡点。<br /> 既适合个人小项目快速开发，也适合团队架构师基于自身的技术架构在 Egg 基础上扩展出适合特定团队业务场景的框架。<br /> 它沉淀自阿里在各行各业不同领域的大规模工程实践经验，稳定支撑了多年天猫双11大促，顶级流量压力。</p>\n</blockquote>\n<h2>2.0 特性</h2>\n<ul>\n<li>基于 Koa 2.x\n<ul>\n<li>异步解决方案直接基于 Async Function 。</li>\n<li>去除 co 兼容后<a href=\"https://github.com/eggjs/egg/wiki/co-vs-async\" target=\"_blank\" rel=\"noopener noreferrer\">堆栈信息更清晰</a>。</li>\n</ul>\n</li>\n<li>框架层优化带来&nbsp;<a href=\"https://eggjs.github.io/benchmark/plot/\" target=\"_blank\" rel=\"noopener noreferrer\">30% 左右的性能提升</a>，不含 Node 8 带来的提升。</li>\n<li>为了方便开发者快速升级，保持了对 Egg 1.x 以及 generator function 的兼容。</li>\n</ul>\n<p><img src=\"https://dn-cnode.qbox.me/Fuf5DkXMxM7wfClcN6B6LzX5d18Q\" alt=\"image.png\" /></p>\n<h2>如何升级</h2>\n<p><strong><a href=\"https://eggjs.org/\" target=\"_blank\" rel=\"noopener noreferrer\">Egg</a> 的理念之一是渐进式增强，故我们为开发者提供渐进升级的体验。</strong></p>\n<ol>\n<li>Node.js 使用最新的 LTS 版本（&gt;=8.9.0）。</li>\n<li>修改 package.json 中 egg 的依赖为 ^2.0.0。</li>\n<li>检查相关插件是否发布新版本（可选）。</li>\n<li>重新安装依赖，跑单元测试。</li>\n</ol>\n<p><strong>搞定！几乎不需要修改任何一行代码，就已经完成了升级。</strong></p>\n<p>这得益于 Egg 对 1.x 的兼容，但为了更好的统一代码风格，以及更佳的性能和错误堆栈，我们建议开发者参考 <a href=\"https://eggjs.org/zh-cn/migration.html\" target=\"_blank\" rel=\"noopener noreferrer\">升级指南</a> 进一步升级。</p>\n<h2>未来规划</h2>\n<p>如您所知，Egg 采用的是 <strong>『微内核 + 插件 + 上层框架』</strong> 模式。</p>\n<p>其中微内核经过 3 年 4 个版本，以及在阿里的大规模应用，已经打磨的非常稳定。</p>\n<p>接下来我们的<strong>重心主要在开发者体验方面的优化</strong>，包括：</p>\n<ul>\n<li>更好的开发者体验，包括 TypeScript，开发者工具，IDE 工具等方面。</li>\n<li>社区扶持\n<ul>\n<li>协助业界的前端团队，打造适合特定团队业务场景的上层框架，欢迎勾搭。</li>\n<li>分享我们在团队、协作、规范化等方面的经验。</li>\n<li>分享在 Docker，GraphQL，SSR 等方面的探索和最佳实践分享。</li>\n</ul>\n</li>\n<li>国际化，官网和<a href=\"https://github.com/eggjs/egg/issues/363\" target=\"_blank\" rel=\"noopener noreferrer\">文档翻译</a>等。</li>\n</ul>\n<p>同时，我们也欢迎社区更多的<a href=\"https://github.com/orgs/eggjs/projects\" target=\"_blank\" rel=\"noopener noreferrer\">参与</a>，一起打造更完善的生态。</p>\n<p><img src=\"https://dn-cnode.qbox.me/Fg_WHGNC13j2azgEWb-ONk5whle5\" alt=\"image.png\" /></p>', '1dbbfd67-72b6-49f6-9d40-dfc49dc24558', '1521344083333', '1521345118199', '2', '0', '0', '1');
INSERT INTO `posts` VALUES ('23', '数组扁平化', '数组扁平化', '\n```javascript\nvar arr = [\n            [1, 2, 2],\n            [3, 4, 5, 5],\n            [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10\n        ];\n\n        function delayer(arr) {\n            var temp = [];\n\n            function delay(arr) {\n                if (hasArr(arr)) {\n                    delay(arr.concat.apply([], arr));\n                } else {\n                    temp = arr;\n                }\n            }\n\n            delay(arr, temp);\n            return temp;\n        }\n\n        function hasArr(arr) {\n            return arr.some(function(item) {\n                return Array.isArray(item);\n            });\n        }\n        var newArr = delayer(arr);\n        console.log(newArr);\n        \n        http://refined-x.com/\n        \n        \n        function delayer(arr) {\n            return arr.toString().split(\',\').map(item =&gt; Number(item));\n        }\n\n        var newArr = delayer(arr);\n        console.log(newArr);\n        \n        http://www.jianshu.com/p/d8fcd04864bb\n        \n        function delayer(arr) {\n            while (arr.some(item =&gt; item instanceof Array)) arr = [].concat(...arr);\n            return arr;\n            // return [...new Set(arr)].sort((a, b) =&gt; a - b);\n        }\n\n        var newArr = delayer(arr);\n        console.log(newArr);\n        http://book.apebook.org/minghe/webstorm/plugins/plugins.html\n				```', '1dbbfd67-72b6-49f6-9d40-dfc49dc24558', '1521361987660', '1521362643016', '1', '0', '0', '1');
INSERT INTO `posts` VALUES ('24', 'debounce和throttle', 'debounce和throttle', '## 遇到的问题\n在开发过程中会遇到频率很高的事件或者连续的事件，如果不进行性能的优化，就可能会出现页面卡顿的现象，比如：\n\n1. 鼠标事件：mousemove(拖曳)/mouseover(划过)/mouseWheel(滚屏)\n2. 键盘事件：keypress(基于ajax的用户名唯一性校验)/keyup(文本输入检验、自动完成)/keydown(游戏中的射击)\n3. window的resize/scroll事件(DOM元素动态定位)\n为了解决这类问题，常常使用的方法就是throttle(节流)和debounce(去抖)。`throttle(节流)`和`debounce(去抖)`都是用来控制某个函数在一定时间内执行多少次的解决方案，两者相似而又不同。\n\n在处理诸如 `resize`、`scroll`、`mousemove` 和 `keydown/keyup/keypress` 等事件的时候，通常我们不希望这些事件太过频繁地触发，尤其是监听程序中涉及到大量的计算或者有非常耗费资源的操作。\n\n有多频繁呢？以 `mousemove` 为例，根据 [DOM Level 3](https://www.w3.org/TR/DOM-Level-3-Events/#event-type-mousemove) 的规定，「如果鼠标连续移动，那么浏览器就应该触发多个连续的 `mousemove` 事件」，这意味着浏览器会在其内部计时器允许的情况下，根据用户移动鼠标的速度来触发 `mousemove`事件。（当然了，如果移动鼠标的速度足够快，比如“刷”一下扫过去，浏览器是不会触发这个事件的）。`resize、scroll` 和 `key*` 等事件与此类似。\n\n## 认识throttle和debounce\nthrottle和debounce的作用就是确认事件执行的方式和时机，以前总是不太清楚两者的区别，容易把二者弄混。\n\n下面就通过两个简单的场景描述一下debounce和throttle，以后想到这两个场景就不会再弄混了：\n\n### debounce\ndebounce假设你正在乘电梯上楼，当电梯门关闭之前发现有人也要乘电梯，礼貌起见，你会按下开门开关，然后等他进电梯； __如果在电梯门关闭之前，又有人来了，你会继续开门；这样一直进行下去，你可能需要等待几分钟，最终没人进电梯了，才会关闭电梯门__，然后上楼。\n\n\n所以debounce的作用是，`当调用动作触发一段时间后，才会执行该动作，若在这段时间间隔内又调用此动作则将重新计算时间间隔。`\n\nDOM 事件里的 `debounce` 概念其实是从机械开关和继电器的“去弹跳”（debounce）衍生 出来的，基本思路就是把多个信号合并为一个信号。\n\n在 JavaScript 中，`debounce` 函数所做的事情就是，强制一个函数在某个连续时间段内只执行一次，哪怕它本来会被调用多次。我们希望在用户停止某个操作一段时间之后才执行相应的监听函数，而不是在用户操作的过程当中，浏览器触发多少次事件，就执行多少次监听函数。\n\n比如，在某个 3s 的时间段内连续地移动了鼠标，浏览器可能会触发几十（甚至几百）个 `mousemove` 事件，不使用 `debounce` 的话，监听函数就要执行这么多次；如果对监听函数使用 100ms 的“去弹跳”，那么浏览器只会执行一次这个监听函数，而且是在第 3.1s 的时候执行的。\n\n### throttle\nthrottle假设你正在乘电梯上楼，当电梯门关闭之前发现有人也要乘电梯，礼貌起见，你会按下开门开关，然后等他进电梯；  但是，你是个没耐心的人，__你最多只会等待电梯停留一分钟；在这一分钟内，你会开门让别人进来，但是过了一分钟之后，你就会关门__，让电梯上楼。\n\n所以throttle的作用是，`预先设定一个执行周期，当调用动作的时刻大于等于执行周期则执行该动作，然后进入下一个新的时间周期。`\n\n\n`throttle` 的概念理解起来更容易，就是固定函数执行的速率，即所谓的“节流”。正常情况下，`mousemove` 的监听函数可能会每 20ms（假设）执行一次，如果设置 200ms 的“节流”，那么它就会每 200ms 执行一次。比如在 1s 的时间段内，正常的监听函数可能会执行 50（1000/20） 次，“节流” 200ms 后则会执行 5（1000/200） 次。\n\n## 实现\n\n### debounce实现\n\n我们这个 `debounce` 函数接收两个参数，第一个是要“去弹跳”的回调函数 `fn`，第二个是延迟的时间 `delay`。\n\n&gt; 实际上，大部分的完整 `debounce` 实现还有第三个参数 `immediate` ，表明回调函数是在一个时间区间的最开始执行（`immediate` 为 `true`）还是最后执行（`immediate` 为 `false`），比如 `underscore` 的 [`_.debounce`](http://underscorejs.org/#debounce)。本文不考虑这个参数，只考虑最后执行的情况，感兴趣的可以自行研究。\n\n```javascript\n/**\n*\n* @param fn {Function}   实际要执行的函数\n* @param delay {Number}  延迟时间，也就是阈值，单位是毫秒（ms）\n*\n* @return {Function}     返回一个“去弹跳”了的函数\n*/\nfunction debounce(fn, delay) {\n\n  // 定时器，用来 setTimeout\n  var timer\n\n  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数\n  return function () {\n\n    // 保存函数调用时的上下文和参数，传递给 fn\n    var context = this\n    var args = arguments\n\n    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn\n    clearTimeout(timer)\n\n    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），\n    // 再过 delay 毫秒就执行 fn\n    timer = setTimeout(function () {\n      fn.apply(context, args)\n    }, delay)\n  }\n}\n```\n其实思路很简单，`debounce` 返回了一个闭包，这个闭包依然会被连续频繁地调用，但是在闭包内部，却限制了原始函数 `fn` 的执行，强制 `fn` 只在连续操作停止后只执行一次。\n\n`debounce` 的使用方式如下：\n```javascript\n$(document).on(\'mouvemove\', debounce(function(e) {\n	// 代码\n}, 250))\n```\n### 使用\n还是以 `mousemove` 为例，为其绑定一个“去弹跳”的监听器，效果是怎样的？请看这个 [Demo](https://codepen.io/llh911001/pen/MaxmmE?editors=101)。\n\n再来考虑另外一个场景：根据用户的输入实时向服务器发 ajax 请求获取数据。我们知道，浏览器触发 `key*` 事件也是非常快的，即便是正常人的正常打字速度，`key*` 事件被触发的频率也是很高的。以这种频率发送请求，一是我们并没有拿到用户的完整输入发送给服务器，二是这种频繁的无用请求实在没有必要。\n\n更合理的处理方式是，在用户“停止”输入一小段时间以后，再发送请求。那么 `debounce` 就派上用场了：\n\n```javascript\n$(\'input\').on(\'keyup\', debounce(function(e) {\n	// 发送 ajax 请求\n}, 300))\n```\n可以查看这个 [Demo](https://codepen.io/llh911001/pen/EVMLJw?editors=101) 看看效果。\n\n### Throttle实现\n\n`throttle` 的概念理解起来更容易，就是固定函数执行的速率，即所谓的“节流”。正常情况下，`mousemove` 的监听函数可能会每 20ms（假设）执行一次，如果设置 200ms 的“节流”，那么它就会每 200ms 执行一次。比如在 1s 的时间段内，正常的监听函数可能会执行 50（1000/20） 次，“节流” 200ms 后则会执行 5（1000/200） 次。\n\n我们先来看 [Demo](https://codepen.io/llh911001/pen/XmGYKV?editors=101)。可以看到，不管鼠标移动的速度是慢是快，“节流”后的监听函数都会“匀速”地每 250ms 执行一次。\n\n与 `debounce` 类似，我们这个 `throttle` 也接收两个参数，一个实际要执行的函数 `fn`，一个执行间隔阈值 `threshhold`。\n\n&gt; 同样的，`throttle` 的更完整实现可以参看 `underscore` 的 [_.throttle](http://underscorejs.org/#throttle)。\n\n```javascript\n/**\n*\n* @param fn {Function}   实际要执行的函数\n* @param delay {Number}  执行间隔，单位是毫秒（ms）\n*\n* @return {Function}     返回一个“节流”函数\n*/\n\nfunction throttle(fn, threshhold) {\n\n  // 记录上次执行的时间\n  var last\n\n  // 定时器\n  var timer\n\n  // 默认间隔为 250ms\n  threshhold || (threshhold = 250)\n\n  // 返回的函数，每过 threshhold 毫秒就执行一次 fn 函数\n  return function () {\n\n    // 保存函数调用时的上下文和参数，传递给 fn\n    var context = this\n    var args = arguments\n\n    var now = +new Date()\n\n    // 如果距离上次执行 fn 函数的时间小于 threshhold，那么就放弃\n    // 执行 fn，并重新计时\n    if (last && now &lt; last + threshhold) {\n      clearTimeout(timer)\n\n      // 保证在当前时间区间结束后，再执行一次 fn\n      timer = setTimeout(function () {\n        last = now\n        fn.apply(context, args)\n      }, threshhold)\n\n    // 在时间区间的最开始和到达指定间隔的时候执行一次 fn\n    } else {\n      last = now\n      fn.apply(context, args)\n    }\n  }\n}\n```\n\n原理也不复杂，相比 `debounce`，无非是多了一个时间间隔的判断，其他的逻辑基本一致。`throttle` 的使用方式如下：\n\n```javascript\n$(document).on(\'mouvemove\', throttle(function(e) {\n	// 代码\n}, 250))\n```\n\n### 使用\n`throttle` 常用的场景是限制 `resize` 和 `scroll` 的触发频率。以 `scroll` 为例，查看这个 [Demo](https://codepen.io/llh911001/pen/MaxXPV?editors=101) 感受下。\n\n### 可视化解释\n\n如果还是不能完全体会 `debounce` 和 `throttle` 的差异，可以到 [这个页面](http://demo.nimius.net/debounce_throttle/) 看一下两者可视化的比较。\n\n## 总结\n\n`debounce` 强制函数在某段时间内只执行一次，`throttle` 强制函数以固定的速率执行。在处理一些高频率触发的 DOM 事件的时候，它们都能极大提高用户体验。', '1dbbfd67-72b6-49f6-9d40-dfc49dc24558', '1521363185552', '0', '1', '0', '3', '1');

-- ----------------------------
-- Table structure for sessions
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sessions
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `uid` varchar(60) NOT NULL,
  `uname` varchar(20) NOT NULL,
  `nickname` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '1',
  `avatar` varchar(60) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '1dbbfd67-72b6-49f6-9d40-dfc49dc24558', 'admin', 'admin', 'fdb93343548e548af01bcce98008dbfa', '1', '');
INSERT INTO `user` VALUES ('8', 'aec08b9c-7948-4043-8343-b2891d7291ca', 'admin1', '53528556-768a-41a4-8aae-df0c859368d9', 'fdb93343548e548af01bcce98008dbfa', '1', '1521380077853.jpeg');
