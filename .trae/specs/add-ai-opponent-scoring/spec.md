# Gomoku 增强：AI 对手与积分系统 Spec

## Why
在现有五子棋应用基础上提升单人可玩性与反馈机制：当用户选择黑/白棋后，由 AI 控制另一方进行对弈；引入步数与积分体系，增强游戏目标感与成就感。

## What Changes
- 新增 AI 对手逻辑：当用户选择其阵营后，另一阵营由 AI 自动落子（基础实现为随机合法落子，后续可扩展）。
- 扩展游戏流程：在用户每一步之后，若游戏未结束且轮到 AI，则 AI 自动执行一步。
- 新增计分与步数统计：用户每次落子 +10 分；胜利 +100；失败 -100；分数在 HUD 与结算弹窗中展示。
- UI 更新：信息栏增加“步数”“分数”；结算弹窗展示最终得分。
- 非破坏性变更（与现有功能兼容），但需调整部分组件/逻辑以接入 AI 与计分。

## Impact
- Affected specs: 游戏设置、对弈流程、UI 信息展示、结算逻辑
- Affected code:
  - 核心逻辑：[useGomoku.ts](file:///Users/bytedance/Work/ai_learn/ai_trae_spec_gomoko/src/hooks/useGomoku.ts)
  - 组件：[App.tsx](file:///Users/bytedance/Work/ai_learn/ai_trae_spec_gomoko/src/App.tsx)、[Board.tsx](file:///Users/bytedance/Work/ai_learn/ai_trae_spec_gomoko/src/components/Board.tsx)、[Settings.tsx](file:///Users/bytedance/Work/ai_learn/ai_trae_spec_gomoko/src/components/Settings.tsx)
  - 新增 AI 策略文件：src/ai/aiPlayer.ts

## ADDED Requirements
### Requirement: AI 对手
系统应在用户选择阵营后自动将另一阵营交由 AI 控制：
- AI 需仅在其回合且游戏未结束时落子；
- AI 落子必须合法（空位、遵守规则）；
- 基础实现：在可落子空位中随机选择（保证在 50×50 上仍具备良好性能）。

#### Scenario: AI 正常响应
- WHEN 用户完成一次合法落子且未分出胜负
- THEN 若下一回合为 AI 阵营，AI 应在短延迟内自动在空位落子

### Requirement: 计分与步数统计
系统应统计用户步数与分数，并在 HUD 与结算弹窗中展示：
- 每次用户落子，步数 +1，分数 +10；
- 用户胜利时，分数再 +100；用户失败时，分数再 -100；
- 结算弹窗需显示“最终得分”；重开对局后计分清零（MVP）。

#### Scenario: 计分与展示
- WHEN 用户每次落子
- THEN HUD 步数+1、分数+10 实时更新
- WHEN 对局结束（胜/负）
- THEN 分数按规则加/减并在结算弹窗显示“最终得分”

## MODIFIED Requirements
### Requirement: 游戏流程与设置
- 玩家在设置中选择黑/白棋后，对局开始时另一方由 AI 控制；
- 在 AI 回合中，用户不可落子（需在交互上禁用或忽略点击）。

## REMOVED Requirements
无

