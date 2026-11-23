# 记一杯

> 一页一杯，记录喝过的饮料。

一款个人饮品记录手帐 Web 应用。整体采用手帐风格视觉（手写字体、卡片式布局、暖色主题 `#FBF7EF`），移动端优先设计。

## 在线访问

- **站点**：https://wintermoon123.github.io/getadrink/
- **仓库**：https://github.com/wintermoon123/getadrink

## 功能特性

- **记录管理**：新增、编辑、删除饮品记录。每条记录包含日期、品牌、名称、口味、评分（1–5 星），并自动记录创建与更新时间。
- **检索与筛选**：支持关键词搜索（品牌 / 名称 / 口味），可按品牌、口味、评分下限筛选，结果按日期倒序排列。
- **数据统计**：顶部统计栏汇总记录情况。
- **云端同步**：填入 GitHub Personal Access Token 后，通过 GitHub Contents API 将记录读写至本仓库的 `data/drinks.json`；未连接时数据保存在浏览器本地作为兜底。
- **数据备份**：支持 JSON 格式导出与导入，便于迁移。

## 技术栈

React 19 · TypeScript · Vite 7 · Tailwind CSS 3 · shadcn/ui · lucide-react · sonner

## 本地开发

```bash
npm install
npm run dev      # 启动开发服务器
npm run build    # 生产构建，产物输出到 dist/
npm run preview  # 本地预览构建产物
```

## 部署

站点通过 GitHub Actions 自动部署至 GitHub Pages。向 `main` 分支推送代码即会触发重新构建与发布，无需手动操作。

部署工作流位于 `.github/workflows/deploy.yml`，Pages 构建源已在仓库设置中配置为 GitHub Actions（`build_type: workflow`）。

## 数据说明

饮品记录统一存放在 `data/drinks.json`，结构如下：

```json
{
  "version": 1,
  "updatedAt": "2026-11-23T00:00:00.000Z",
  "drinks": [
    {
      "id": "唯一标识",
      "date": "2026-11-23",
      "brand": "品牌",
      "name": "饮品名称",
      "flavor": "口味",
      "rating": 5,
      "createdAt": "创建时间",
      "updatedAt": "更新时间"
    }
  ]
}
```

应用通过 GitHub Contents API 读写该文件，因此同步功能需要 token 具备本仓库的 `repo` 权限。

## 更新记录

| 日期 | 提交 | 内容 |
|---|---|---|
| 2026-11-23 | `211d76e` | 初始提交：完整应用源码 |
| 2026-11-23 | `157976a` | 新增 GitHub Pages 自动部署工作流 |
| 2026-11-23 | `ffc40aa` | 清理脚手架冗余文件 `index.html''` |
