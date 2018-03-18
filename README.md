## demo说明

写这个demo的意图是为了分享给群里好友做个示例,因为经常看到大家问相同的问题，不到一天写完的，质量比较粗糙，还往大家多多原谅。数据库使用的是Mysql，文件已经导出了.

本demo大量使用es6、es7语法，需要了解的朋友也可以看看

## 如何启动
### 开发调试
> 推荐使用`yarn`

`npm install` 安装依赖, `npm run start` 启动客户端 http://localhost:3000, `npm run server` 启动服务端 http://localhost:5000

### 打包
`npm run build`(此时得停止服务端的服务), 然后 `npm run server`, 就可以在http://localhost:5000 查看了

> 打包后就可以部署到服务器了,但是本demo比较简单,部署没有实际意义

## 一期说明
使用到的框架以及库

### 前端
> 前端使用es6模块规范
1. React
2. ant design
3. moment
4. isomorphic-unfetch (fetch兼容库)
5. create-react-app

### 服务端
> 服务端使用CommonJs规范
1. moment
2. express
3. express-session
4. mysql
5. express-mysql-session
6. passport
7. isomorphic-unfetch (fetch兼容库)
9. cors
10. excel-export
11. md5
11. passport-local
12. uuid

### 波折
本来打算一期就开始做基于Next.js的React SSR，但是有个大问题没有解决，问题在github的issue里面发现了，但是也没人解决，并且我也提了issue。临时换成了不做SSR。后续解决了再走版本迭代完成。

## 一期完成功能
- [x] 博客列表展示
- [x] 博客点赞
- [x] 查看博客详情
- [x] 关于我们页面
- [x] 联系页面
- [x] 后台管理系统登录
- [x] 后台管理系统接口鉴权
- [x] 基于passport的鉴权
- [x] session保留会话
- [x] 后台新增、修改博客文章
- [x] 后台软删除博客文章
- [x] 后台禁用、启用用户和分类
- [x] 后台导出所有的文章信息到excel

## 二期完成功能
- [x] 服务端拆分成简单的model、controller分离的结构
- [x] 整理服务端代码(一期功能简单,所有没有分开)
- [x] 加入Redux或者Mobx作为状态管理（最终采用的Redux）
- [x] 客户端增加路由运用，使用query来传参
- [x] 增加图片上传功能，用来设置用户头像
- [x] 首页气泡弹窗来评论文章，使用markdown编辑器
- [x] 详情页面展示所有评论
- [x] 详情页面增加评论(支持markdown)
- [x] 增加注册页面
- [x] 增加退出功能 (一期其实服务端已经写好了)
- [x] 后台管理新增、编辑文章支持markdown
- [x] 后台管理新增、编辑文章支持富文本(使用富文本带来的最大威胁就是xss攻击,本demo只做了简单的xss处理)

## 三期计划
- [ ] 增加装饰器示例
- [ ] 客户端增加eslint来规范代码，可能会采用airbnb的规范
- [ ] 将客户端状态管理修改为Mobx
- [ ] 增加客户端页面导出excel功能
- [ ] 增加prop-types来约束react组件props
- [ ] 服务端增加Typescript，将已有代码改造成ts版本
- [ ] 鉴权方式修改为jwt(token)
- [ ] 增加权限处理,根据角色来设置菜单权限和数据权限(一期没有设置任何权限,动作权限和数据权限)
- [ ] 增加头像以及头像处理功能(前端图片裁切)
- [ ] 希望能解决Next.js的问题，或者采用其他方式实现SSR

## 四期计划
- [ ] 前端从React切换到Angular5
- [ ] 服务端从express切换到Koa2
- [ ] 切换样式库到Material UI
