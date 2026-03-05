import { useState } from 'react';
import type React from 'react';
import type { GameConfig, Player } from '../types';

interface SettingsProps {
  onStartGame: (config: GameConfig) => void;
}

const Settings: React.FC<SettingsProps> = ({ onStartGame }) => {
  const [boardSize, setBoardSize] = useState<number>(20);
  const [playerSide, setPlayerSide] = useState<Player>('black');

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value, 10);
    setBoardSize(size);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartGame({ boardSize, playerSide });
  };

  return (
    <div className="settings-panel" style={{
      border: '2px solid var(--color-primary)',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 0 20px rgba(0, 255, 242, 0.2)',
      maxWidth: '400px',
      width: '100%',
      backdropFilter: 'blur(5px)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
        System Configuration
      </h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className="form-group">
          <label htmlFor="boardSize" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-secondary)' }}>
            Grid Size ({boardSize}x{boardSize})
          </label>
          <input
            type="range"
            id="boardSize"
            min="20"
            max="50"
            value={boardSize}
            onChange={handleSizeChange}
            style={{ width: '100%', accentColor: 'var(--color-secondary)' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', opacity: 0.7 }}>
            <span>20</span>
            <span>50</span>
          </div>
        </div>

        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-secondary)' }}>
            Select Faction (opponent is AI)
          </label>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <label style={{ 
              flex: 1, 
              padding: '10px', 
              border: `1px solid ${playerSide === 'black' ? 'var(--color-primary)' : 'var(--color-grid)'}`,
              cursor: 'pointer',
              textAlign: 'center',
              backgroundColor: playerSide === 'black' ? 'rgba(0, 255, 242, 0.1)' : 'transparent',
              transition: 'all 0.3s'
            }}>
              <input
                type="radio"
                name="playerSide"
                value="black"
                checked={playerSide === 'black'}
                onChange={() => setPlayerSide('black')}
                style={{ display: 'none' }}
              />
              BLACK (First)
            </label>
            <label style={{ 
              flex: 1, 
              padding: '10px', 
              border: `1px solid ${playerSide === 'white' ? 'var(--color-primary)' : 'var(--color-grid)'}`,
              cursor: 'pointer',
              textAlign: 'center',
              backgroundColor: playerSide === 'white' ? 'rgba(0, 255, 242, 0.1)' : 'transparent',
              transition: 'all 0.3s'
            }}>
              <input
                type="radio"
                name="playerSide"
                value="white"
                checked={playerSide === 'white'}
                onChange={() => setPlayerSide('white')}
                style={{ display: 'none' }}
              />
              WHITE (Second)
            </label>
          </div>
        </div>

        <button type="submit" style={{ marginTop: '1rem' }}>
          Initialize Sequence
        </button>
      </form>
    </div>
  );
};

export default Settings;
