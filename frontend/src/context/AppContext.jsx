import { createContext, useState } from "react";

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [childData, setChildData] = useState(null);
  const [parentData, setParentData] = useState(null);

  return (
    <AppContext.Provider
      value={{ childData, setChildData, parentData, setParentData }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
