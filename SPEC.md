---
AIGC:
    ContentProducer: Minimax Agent AI/youzi177
    ContentPropagator: Minimax Agent AI/youzi177
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3046022100cf90e6078294d12b407189b1191a23e69f570b8c7ccfb533687f66b89e7dee0b022100def06d2087267615474c068aecffa42515d177fc27384a2846d25d827a65a5bf
    ReservedCode2: 304402203ed9fd1972e5466b11f43944c7f894f2798a9be5a9fd2aec86d4c64ea1e94433022079a35253fb8db9c984de8cbdefa328201a5f1ffb2f9566afef7c5f09ead72671
---

# 古风个人网站主页 - 项目规范

## 1. Concept & Vision

打造一个充满东方韵味的个人网站，以古典水墨画风格为基调，融合现代交互体验。整体感觉如同翻阅一卷古朴的书卷，墨香四溢，意境悠远。页面简洁而不简单，每个动画都如同水墨晕染般自然流畅。

## 2. Design Language

### 美学方向
- **风格**: 新中式/古风水墨
- **意象**: 山水、祥云、毛笔书法、印章
- **氛围**: 宁静、雅致、书卷气

### 色彩方案
```
主色调 (墨色):     #2c2c2c - 浓墨
次要色 (淡墨):     #4a4a4a - 淡墨
强调色 (朱砂):     #c74b4b - 朱砂红
背景色 (宣纸):     #f5f0e8 - 米白宣纸
辅助背景:          #e8e0d5 - 浅米色
文字色:            #333333 - 浓墨文字
浅文字:            #666666 - 淡墨文字
金色点缀:           #b8956e - 古铜金
```

### 字体选择
- **标题/谚语**: "ZCOOL XiaoWei" (站酷小薇), "Noto Serif SC", serif
- **正文/链接**: "Noto Sans SC", "PingFang SC", sans-serif

### 动效哲学
- **墨韵渐显**: 元素如同水墨在宣纸上晕染显现
- **笔触轨迹**: 链接hover时如毛笔划过
- **云卷云舒**: 背景装饰元素缓慢飘动
- 所有动画使用 ease-out 或 cubic-bezier(0.4, 0, 0.2, 1)
- 动画时长: 快速 200ms, 标准 400ms, 慢速 800ms

## 3. 技术实现
- HTML5 语义化标签
- CSS3 动画与响应式
- Vanilla JavaScript
- SEO 优化 (meta, 结构化数据)

## 4. 页面结构
- 顶部祥云装饰
- 中间谚语区域（印章+名言+链接）
- 底部水墨装饰+备案信息
