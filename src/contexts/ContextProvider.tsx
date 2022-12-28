import UserContext from './UserContext.jsx';

interface Props {
  children?: React.ReactNode;
}

function ContextProvider({ children }: Props) {
  return <UserContext>{children}</UserContext>;
}

export default ContextProvider;
