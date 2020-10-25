import { selectors as authSelectors } from '../../store/ducks/auth';
import { useSelector } from 'react-redux';

const AuthBasedComponent = ({ children }) => {
  const isAuthenticated = useSelector(authSelectors.isUserAuthenticated);
  return children({ isAuthenticated });
};

export default AuthBasedComponent;
