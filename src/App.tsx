import { useState } from 'react';
import './index.css';
import Settings from './components/Settings';
import Board from './components/Board';
import type { GameConfig } from './types';
import { useGomoku } from './hooks/useGomoku';

function App() {
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);
  const { board, currentPlayer, winner, placeStone, resetGame, isDraw } = useGomoku();

  const handleStartGame = (config: GameConfig) => {
    setGameConfig(config);
    resetGame(config);
  };

  const handleRestart = () => {
    if (gameConfig) {
      resetGame(gameConfig);
    }
  };

  const handleQuit = () => {
    setGameConfig(null);
  };

  return (
    <div className="app-container">
      <h1 style={{ marginBottom: '1rem', fontSize: '3rem', textShadow: '0 0 20px var(--color-primary)' }}>
        Cyber Gomoku
      </h1>
      
      {!gameConfig ? (
        <Settings onStartGame={handleStartGame} />
      ) : (
        <div className="game-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div className="game-info" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            width: '100%', 
            maxWidth: '600px',
            marginBottom: '1rem',
            fontSize: '1.2rem',
            color: 'var(--color-text)'
          }}>
            <div>
              Status: <span style={{ color: winner ? 'var(--color-accent)' : 'var(--color-primary)' }}>
                {winner ? 'GAME OVER' : 'ACTIVE'}
              </span>
            </div>
            <div>
              Turn: <span style={{ 
                color: currentPlayer === 'black' ? '#aaa' : '#fff',
                textShadow: currentPlayer === 'white' ? '0 0 10px #fff' : 'none'
              }}>
                {currentPlayer.toUpperCase()}
              </span>
            </div>
          </div>

          <Board 
            board={board} 
            onCellClick={placeStone} 
            currentPlayer={currentPlayer}
          />

          <div className="controls" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={handleRestart}>Reboot System</button>
            <button onClick={handleQuit} style={{ borderColor: 'var(--color-secondary)', color: 'var(--color-secondary)' }}>
              Abort
            </button>
          </div>

          {(winner || isDraw) && (
            <div className="modal-overlay" style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 100
            }}>
              <div className="modal-content" style={{
                backgroundColor: 'var(--color-bg)',
                border: '2px solid var(--color-accent)',
                padding: '3rem',
                borderRadius: '10px',
                textAlign: 'center',
                boxShadow: '0 0 50px var(--color-accent)',
                animation: 'fadeIn 0.5s ease-out'
              }}>
                <h2 style={{ fontSize: '3rem', color: 'var(--color-accent)', marginBottom: '1rem' }}>
                  {winner ? `${winner.toUpperCase()} WINS` : 'DRAW'}
                </h2>
                <p style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>
                  {winner ? 'Sequence Complete. Target Eliminated.' : 'Stalemate Detected.'}
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button onClick={handleRestart} style={{ fontSize: '1.2rem' }}>
                    Restart Mission
                  </button>
                  <button onClick={handleQuit} style={{ borderColor: 'var(--color-secondary)', color: 'var(--color-secondary)', fontSize: '1.2rem' }}>
                    Return to Base
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
