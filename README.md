# Yvonne 的小宇宙

基于 Hexo 与 [Meow](https://github.com/chanwj/hexo-theme-meow) 主题的个人博客。

## 本地预览

```bash
npm run server
```

构建静态文件：

```bash
npm run build
```

生成结果位于 `public/`。

## 文章分区

在文章开头使用标签决定展示位置：

```yaml
tags:
  - Professional # 专业技术页 /professional/
  - DailyLife    # 日常生活页 /daily-life/
```

一篇文章可同时使用两个标签，会同时展示在两个页面。

## 域名部署

将 `public/` 部署到任意静态站点托管服务后，把 `yvonnedisicoding.cn` 的 DNS 记录指向该服务，并在服务后台添加此自定义域名。部署前确认 `_config.yml` 中的 `url` 保持为 `https://yvonnedisicoding.cn`。
