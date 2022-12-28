import UserContext from './UserContext';
import ItemContext from './ItemContext';

interface Props {
  children?: React.ReactNode;
}

function ContextProvider({ children }: Props) {
  return (
    <UserContext>
      <ItemContext>{children}</ItemContext>
    </UserContext>
  );
}

export default ContextProvider;
