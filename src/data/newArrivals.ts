import type { NewArrivalsFile } from '@/types/newArrival'

/**
 * 新品速递数据 —— 手动维护。
 *
 * 更新方式：编辑本文件的 items 数组，替换为本批次新品；同时把 batch 和
 * updatedAt 改为本批次日期。页面会自动按 launchDate 从新到旧排序，无需手动排列。
 * 字段说明：
 *   id          唯一标识，batch + 序号即可，如 '2026-11-23-1'
 *   brand       品牌名
 *   name        新品名称（系列多款可用 / 分隔）
 *   price       可选，价格区间或起售价；不确定可留空
 *   launchDate  上市日期，'YYYY-MM-DD'；仅知月份可写 'YYYY-MM'
 *   sourceUrl   可选，来源报道链接
 *   sourceName  可选，来源媒体名
 *
 * 数据来源：品牌官宣、行业媒体、测评平台的公开报道。品牌点单小程序为封闭生态，
 * 无对外内容接口，无法直接抓取。建议每次保留 8–15 条，覆盖主流连锁品牌。
 */
export const newArrivals: NewArrivalsFile = {
  batch: '2026-11-23',
  updatedAt: '2026-11-23T00:00:00.000Z',
  items: [
    {
      id: '2026-11-23-1',
      brand: '瑞幸',
      name: '云南季：深烘美式 / 深烘拿铁 / 苹果肉桂美式',
      launchDate: '2026-11-23',
      sourceUrl: 'https://www.163.com/dy/article/LCEQ3A920519EGA0.html',
      sourceName: '网易',
    },
    {
      id: '2026-11-23-2',
      brand: '甜啦啦',
      name: '可可系列：超浓奥利奥可可 / 三重浓可可 / 超浓可可冰淇淋',
      price: '¥8 起',
      launchDate: '2026-11-20',
      sourceUrl: 'https://www.drinknewspaper.com/sys-nr/?g=18&mid=324',
      sourceName: '饮品报',
    },
    {
      id: '2026-11-23-3',
      brand: '星巴克',
      name: '星现烤系列（11 款）',
      price: '¥14–25',
      launchDate: '2026-11-19',
      sourceUrl: 'https://www.163.com/dy/article/LCEQ3A920519EGA0.html',
      sourceName: '网易',
    },
    {
      id: '2026-11-23-4',
      brand: '茶百道',
      name: '「富」得流油',
      launchDate: '2026-11-16',
      sourceUrl: 'https://www.163.com/dy/article/LBSTU5CP0512D3VJ.html',
      sourceName: '新京报',
    },
    {
      id: '2026-11-23-5',
      brand: '喜茶',
      name: '生打椰拉面',
      launchDate: '2026-11-13',
      sourceUrl: 'https://www.drinknewspaper.com/news/10544.html',
      sourceName: '饮品报',
    },
    {
      id: '2026-11-23-6',
      brand: '沪上阿姨',
      name: '红豆系列：红豆桃胶炖奶等',
      launchDate: '2026-11-07',
      sourceUrl: 'https://m.cnfin.com/hg-lb//zixun/20261116/4496245_1.html',
      sourceName: '新华财经',
    },
    {
      id: '2026-11-23-7',
      brand: '甜啦啦',
      name: '草莓系列：多肉草莓茉莉 / 满杯草莓桃桃 / 芝芝多肉莓莓',
      price: '¥7 起',
      launchDate: '2026-11-06',
      sourceUrl: 'https://drinknewspaper.com/news/10532.html',
      sourceName: '饮品报',
    },
    {
      id: '2026-11-23-8',
      brand: '奈雪的茶',
      name: '暖暖现烤系列：烤布蕾黑糖珍珠 / 烤布蕾米布布',
      launchDate: '2026-11-05',
      sourceUrl: 'https://www.drinknewspaper.com/sys-nr/?_reqArgs=%7B%22args%22%3A%7B%22_np%22%3A%220_652_11%22%7D%2C%22type%22%3A15%7D',
      sourceName: '饮品报',
    },
    {
      id: '2026-11-23-9',
      brand: '喜茶',
      name: '手打米糯糯牛乳茶',
      price: '约 ¥25',
      launchDate: '2026-11-05',
      sourceUrl: 'https://post.smzdm.com/p/am9v70wd',
      sourceName: '什么值得买',
    },
    {
      id: '2026-11-23-10',
      brand: '星巴克',
      name: '太妃榛果家族（5 款）',
      launchDate: '2026-11-04',
      sourceUrl: 'https://www.sznews.com/news/content/2026-11/04/content_32205803.htm',
      sourceName: '深圳新闻网',
    },
    {
      id: '2026-11-23-11',
      brand: '星巴克臻选',
      name: '节日季：祝悦杜松子风味拿铁等 4 款限定',
      launchDate: '2026-11-03',
      sourceUrl: 'https://www.163.com/dy/article/LAVLP6VV0519C95F.html',
      sourceName: '斑马消费',
    },
    {
      id: '2026-11-23-12',
      brand: '瑞幸',
      name: '木薯桃胶炖奶',
      launchDate: '2026-11-02',
      sourceUrl: 'https://post.smzdm.com/p/am9v70wd',
      sourceName: '什么值得买',
    },
    {
      id: '2026-11-23-13',
      brand: 'MANNER',
      name: '苹果卡布奇诺',
      launchDate: '2026-11-02',
      sourceUrl: 'https://www.sina.cn/news/detail/5360791630120680.html',
      sourceName: '新浪',
    },
    {
      id: '2026-11-23-14',
      brand: '古茗',
      name: '红岩桃胶炖奶',
      launchDate: '2026-11',
      sourceUrl: 'https://post.smzdm.com/p/am9v70wd',
      sourceName: '什么值得买',
    },
    {
      id: '2026-11-23-15',
      brand: '霸王茶姬',
      name: '茶咖融合系列（5 款）',
      launchDate: '2026-11',
      sourceUrl: 'https://www.163.com/dy/article/LCEQ3A920519EGA0.html',
      sourceName: '网易',
    },
  ],
}
