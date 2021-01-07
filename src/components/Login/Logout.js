import Link from '@material-ui/core/Link';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { IconButton,Tooltip } from '@material-ui/core';


export const Logout = () => {
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout);
  }

  const noPointer = {cursor: 'pointer'};

    return (
      <>
        {/* <Link href="" onClick={logoutUser}>
          Logout
        </Link> */}
        <Tooltip title="Logout from memories?">
        <IconButton style={noPointer} onClick={logoutUser}>
          <ExitToAppIcon />
        </IconButton>
        </Tooltip>
      </>
    );
  };