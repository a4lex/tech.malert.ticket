import React from 'react';
import {Provider as AuthProvider} from './src/context/AuthContext';
import MainStack from './src/routes/MainStack';

const App = () => (
  <AuthProvider>
    <MainStack />
  </AuthProvider>
);

export default App;
