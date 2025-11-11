import React, { useState } from 'react';
import { client } from '../amplifyConfig';

interface HaikuGeneratorProps {
  className?: string;
}

export const HaikuGenerator: React.FC<HaikuGeneratorProps> = ({ className }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [haiku, setHaiku] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGenerateHaiku = async () => {
    if (!prompt.trim()) {
      setError('Please enter a topic for your haiku');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const result = await client.queries.generateHaiku({ prompt });
      
      if (result.data) {
        setHaiku(result.data);
      } else if (result.errors) {
        setError(result.errors.map(e => e.message).join(', '));
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      handleGenerateHaiku();
    }
  };

  return (
    <div className={className}>
      <h2>AI Haiku Generator</h2>
      
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a topic for your haiku (e.g., cherry blossoms in spring)"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.5rem',
            fontSize: '1rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      <button
        onClick={handleGenerateHaiku}
        disabled={loading || !prompt.trim()}
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Generating...' : 'Generate Haiku'}
      </button>

      {error && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            borderRadius: '4px',
          }}
        >
          {error}
        </div>
      )}

      {haiku && (
        <div
          style={{
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
            borderLeft: '4px solid #007bff',
          }}
        >
          <h3>Your Haiku:</h3>
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              fontFamily: 'Georgia, serif',
              fontSize: '1.1rem',
              lineHeight: '1.6',
              margin: 0,
            }}
          >
            {haiku}
          </pre>
        </div>
      )}
    </div>
  );
};
