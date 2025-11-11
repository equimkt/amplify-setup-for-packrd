import React from 'react';
import { HaikuGenerator } from './components/HaikuGenerator';
import './amplifyConfig'; // Initialize Amplify configuration

const App: React.FC = () => {
  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '2rem auto', 
      padding: '1rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        AWS Amplify + Bedrock Demo
      </h1>
      
      <HaikuGenerator />
      
      <footer style={{ 
        marginTop: '2rem', 
        textAlign: 'center', 
        color: '#666',
        fontSize: '0.9rem'
      }}>
        <p>Powered by AWS Amplify and Amazon Bedrock</p>
      </footer>
    </div>
  );
};

export default App;
