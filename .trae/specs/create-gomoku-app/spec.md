# Gomoku Web App Spec

## Why
User wants a web-based Gomoku (Five-in-a-Row) game with specific customizable settings and a distinct Cyberpunk visual style. This will provide an engaging and stylish gaming experience.

## Technical Stack
- **Framework**: React
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: CSS (with Cyberpunk aesthetics)

## What Changes
- Initialize a new Vite + React + TypeScript project.
- Implement game board rendering logic using React components.
- Implement Gomoku game rules and win detection in TypeScript.
- Implement game settings UI and logic using React state.
- Apply Cyberpunk aesthetic to the UI.

## Impact
- **New Files**: Standard Vite + React project structure (`src/App.tsx`, `src/components/`, `src/hooks/`, etc.).

## ADDED Requirements

### Requirement: Game Configuration
The system SHALL allow the user to configure the game before starting.
- **Board Size**: The user can input a board size between 20 and 50 (inclusive). The board is a square grid.
- **Player Side**: The user can choose to play as Black (first move) or White (second move).

### Requirement: Game Logic
The system SHALL implement standard Gomoku rules.
- **Win Condition**: The first player to get an unbroken row of five stones horizontally, vertically, or diagonally wins.
- **Turns**: Players alternate turns placing one stone at a time.

### Requirement: User Interface
The system SHALL have a Cyberpunk visual style.
- **Color Palette**: Neon colors (cyan, magenta, electric blue) against a dark/black background.
- **Styling**: Futuristic fonts, glowing effects, high contrast.
