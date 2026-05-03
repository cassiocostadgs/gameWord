import React from 'react';
import Crossword from './src/components/Crossword';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-background">
      <Crossword />
    </div>
  );
};

export default App;