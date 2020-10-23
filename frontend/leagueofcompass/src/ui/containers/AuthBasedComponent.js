import { isUserAuthenticated } from '../../store/ducks/auth/selectors';
import { useSelector } from 'react-redux';

const AuthBasedComponent = ({ children }) => {
  const isAuthenticated = useSelector(isUserAuthenticated);
  return children({ isAuthenticated });
};

export default AuthBasedComponent;
