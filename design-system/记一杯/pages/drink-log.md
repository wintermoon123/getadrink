# Page Override: 饮品记录主页（drink-log）

本文件覆盖 `MASTER.md` 中适用于「记一杯」主页的规则。

## Color Palette（奶油纸张手帐）

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Paper background | `#FBF7EF` | `--paper` |
| Card surface | `#FFFCF5` | `--surface` |
| Ink / primary text | `#3B332B` | `--ink` |
| Muted text | `#8A7D6D` | `--muted` |
| Accent / washi tape | `#C97B63` | `--accent` |
| Accent soft | `#E9D8C3` | `--accent-soft` |
| Line / border | `#D9CDBB` | `--line` |
| Rating gold | `#C9A227` | `--rating` |

不允许深色模式。

## Typography

- **Heading:** `"Long Cang", "Ma Shan Zheng", "STKaiti", "KaiTi", cursive`
- **Body:** `"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif`
- **Latin / numbers decorative:** `Caveat`

```css
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Long+Cang&family=Noto+Sans+SC:wght@400;500;700&display=swap');
```

标题使用手写体，正文使用清晰无衬线体，保证 16px 最小字号与 4.5:1 对比度。

## Visual Elements（轻装饰，非拼贴）

- 背景：奶油纸色 + 极淡的 CSS 渐变纹理（不使用图片）。
- 卡片：`1px solid var(--line)`，圆角 `10px`，轻微纸张阴影，不使用夸张投影。
- 分隔：细实线、虚线、日期圆形印章。
- 强调：一条 washi 胶带色条作为标题下划线或卡片顶部装饰；不使用贴纸/邮票等拼贴元素。
- 交互：所有可点击元素 `cursor-pointer`，hover 使用 150–300ms 的颜色/边框/阴影过渡，不使用位移或缩放造成的布局抖动。

## Layout

- 单栏，最大宽度 `max-w-2xl`，移动端优先，左右 16px / 桌面 24px 内边距。
- 顶部：手写体标题 + 当日日期印章 + 设置入口。
- 统计条：本月杯数、平均评分、总记录数。
- 筛选栏：搜索框、品牌下拉、口味下拉、评分下拉。
- 列表：卡片式记录，含日期、品牌、名称、口味、评分与编辑/删除按钮。
- 新增/编辑：居中 Dialog；移动端底部固定「+」按钮，注意 `safe-area-inset-bottom`。

## Accessibility

- 所有输入有可见 label。
- 键盘焦点有可见 outline。
- `prefers-reduced-motion` 下关闭动画。
- 响应式覆盖 375px / 768px / 1024px / 1440px，无横向滚动。
