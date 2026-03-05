# Tasks

- [x] Task 1: Project Initialization
  - [x] Initialize Vite project with React and TypeScript template (`npm create vite@latest . -- --template react-ts`).
  - [x] Install dependencies (`npm install`).
  - [x] Set up project structure (components, hooks, styles folders).
  - [x] Configure basic Cyberpunk global styles (variables for neon colors, dark background).

- [x] Task 2: Game Settings Component
  - [x] Create `Settings` component.
  - [x] Implement board size input (number/range, 20-50).
  - [x] Implement player side selection (Black/White).
  - [x] Add "Start Game" button.

- [x] Task 3: Game Board Component
  - [x] Create `Board` component.
  - [x] Implement grid rendering based on props (size).
  - [x] Create `Cell` or `Intersection` component for individual interaction.
  - [x] Style the board with glowing grid lines and neon effects.

- [x] Task 4: Game Logic (Custom Hook)
  - [x] Create `useGomoku` hook.
  - [x] Manage state: `board` (2D array), `currentPlayer`, `winner`, `gameStatus`.
  - [x] Implement `placeStone` function with validation.
  - [x] Implement `checkWin` algorithm (horizontal, vertical, diagonal).

- [x] Task 5: Integration and Polish
  - [x] Integrate `Settings` and `Board` in `App.tsx`.
  - [x] Implement game over overlay/modal with Cyberpunk styling.
  - [x] Add "Restart" functionality.
  - [x] Verify responsiveness.
