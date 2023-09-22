import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface Props {
  children: ReactNode;
}

interface ContextTypes {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
}

export const MainContext = createContext<ContextTypes | null>(null);

const ContextProvider: React.FC<Props> = ({ children }) => {
  const [state, setState] = useState(false);
  return (
    <MainContext.Provider value={{ state, setState }}>
      {children}
    </MainContext.Provider>
  );
};

export default ContextProvider;
