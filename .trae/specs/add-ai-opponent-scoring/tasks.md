# Tasks

- [x] Task 1: 定义 AI 接口与默认实现（RandomAI）
  - [x] 新增文件 `src/ai/aiPlayer.ts`，定义 `chooseMove(board, player)` 接口
  - [x] 实现随机合法落子的 `RandomAI`（确保在 50×50 上高效）
  - [x] 导出可替换策略（便于后续扩展更强算法）

- [x] Task 2: 扩展 useGomoku 支持 AI 回合
  - [x] 在用户 `placeStone` 后，若未结束且轮到 AI，则调度 AI 落子
  - [x] AI 回合期间禁用用户落子（忽略点击或显示“AI 思考中”）
  - [x] 落子后复用现有胜负/和棋判定

- [x] Task 3: 引入计分与步数状态
  - [x] 在逻辑层新增 `movesCount` 与 `score` 状态
  - [x] 用户每次落子：`movesCount +1`，`score +10`
  - [x] 用户胜利：`score +100`；用户失败：`score -100`
  - [x] `resetGame` 时清零（MVP）

- [x] Task 4: UI 更新与整合
  - [x] 在顶部信息栏展示：当前回合、步数、分数
  - [x] 在结算弹窗展示最终得分
  - [x] 在设置面板文案中明确“另一方由 AI 控制”

- [x] Task 5: 测试与验证
  - [x] 在 20 与 50 尺寸棋盘验证 AI 自动落子与无阻塞
  - [x] 验证计分在胜利/失败/重开时正确更新
  - [x] 验证 AI 不会落子到已占用格

# Task Dependencies
- [Task 2] 依赖 [Task 1]
- [Task 4] 依赖 [Task 2] 与 [Task 3]
- [Task 5] 依赖前述所有任务
