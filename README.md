css3&html5案例
==============

### c3h5站点架构

文件组织与加载方案-lv+joy

1. 首页

	> index.html

2. 案例

	> 请参考下面的c3h5案例规范

3. JS交互

	A，建立一个案例的json文件c3h5/showcase.json，存放showcase id列表
	[‘xxx’,’yyy’]

	B，首页通过showcase.json拉取所有showcase的cfg数据生成页面，拉取cfg.json时，通过version判断是否加入localStorage

	C，点击首页的showcase item，ajax或iframe拉取showcase/xxx/index.html


### c3h5案例规范

	> 每个c3h5的案例emo至于showcase目录下，例如案例xxx的目录结构为：

	+ c3h5/showcase/xxx/index.html -案例html
	+ c3h5/showcase/xxx/cfg.json -案例配置文件，用于首页拉取
	+ cfg.json示例

		{"name":"xxx","version":1.0,"desc":"blabla","category":"foobar"}

	> 案例的html结构分为三部分内容

	+ 左边展示区
	+ 右边说明+分享微博

**注：案例的html模板由小立负责输出**，大概效果如下：

![c3h5模板效果图](http://oxox.io/c3h5/img/showcase_tpl.jpg "c3h5模板效果图")
