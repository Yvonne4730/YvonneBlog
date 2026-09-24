/* 生成 /tags/index.html：按标签分类整理的标签总览页。
 * 侧边栏「标签」入口与 /tags/ 直链都指向这里。
 */
hexo.extend.generator.register('tags_index', function (locals) {
  return {
    path: 'tags/index.html',
    layout: 'page',
    data: {
      type: 'tag',
      title: '标签',
      tags: locals.tags
    }
  };
});
