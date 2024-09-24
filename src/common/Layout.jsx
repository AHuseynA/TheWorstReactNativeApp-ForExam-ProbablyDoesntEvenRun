import {StyledView} from './StyledComponents.jsx';
import CustomHeader from './CustomHeader';

const Layout = ({children, title}) => {
  return <StyledView className="flex-1">{children}</StyledView>;
};

export default Layout;
