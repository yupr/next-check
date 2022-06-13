import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';

interface CanvasContextInterface {
  imageUrl: string;
  setImageUrl: Dispatch<SetStateAction<string>>;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const CanvasContext = createContext({} as CanvasContextInterface);

export const useCanvasContext = () => {
  return useContext(CanvasContext);
};

export const CanvasProvider = ({ children }: Props): JSX.Element => {
  const [imageUrl, setImageUrl] = useState('');

  const value = {
    imageUrl,
    setImageUrl,
  };

  return (
    <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>
  );
};
