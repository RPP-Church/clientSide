import React from 'react';

const MessageToken = React.createContext();

export const MessageTokenProvider = ({ children }) => {
  const [token, setToken] = React.useState('');

  return (
    <MessageToken.Provider value={{ token, setToken }}>
      {children}
    </MessageToken.Provider>
  );
};

export const useMessageToken = () => {
  const context = React.useContext(MessageToken);
  if (!context) {
    throw new Error(
      'useMessageToken must be used within a MessageTokenProvider'
    );
  }
  return context;
};
