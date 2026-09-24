/* 保留 /articles/ 作为「全部文章」别名。
 * 首页改为根路径后，导航菜单与历史链接仍能访问全部文章列表。
 * 标记 __index: true，使该页与首页拥有相同的固定背景、页面标题等行为。
 */
hexo.extend.generator.register('articles_alias', function (locals) {
  const posts = locals.posts.sort('-date');
  return {
    path: 'articles/index.html',
    layout: 'index',
    data: {
      __index: true,
      posts: posts,
      base: 'articles/',
      total: 1,
      current: 1,
      current_url: 'articles/',
      prev: 0,
      prev_link: '',
      next: 0,
      next_link: ''
    }
  };
});
