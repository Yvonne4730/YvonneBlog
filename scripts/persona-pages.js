/* 双入口页面生成器。文章可同时添加 Professional 与 DailyLife 标签。 */
hexo.extend.generator.register('persona_pages', function (locals) {
  const posts = locals.posts.toArray();
  const inTag = (tagName) => posts.filter((post) => post.tags && post.tags.toArray().some((tag) => tag.name === tagName));
  return [
    { path: 'professional/index.html', layout: 'persona', data: { title: '学习专业技术的我', persona: 'professional', eyebrow: 'PROFESSIONAL NOTES', description: '把复杂的问题拆开，把可靠的方法留下。', posts: inTag('Professional') } },
    { path: 'daily-life/index.html', layout: 'persona', data: { title: '生活化日常化的我', persona: 'daily-life', eyebrow: 'LITTLE DAILY MOMENTS', description: '收集日常的微光、心情和不经意的发现。', posts: inTag('DailyLife') } }
  ];
});
