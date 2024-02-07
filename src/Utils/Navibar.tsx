import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import EasyTest from "../Components/EasyTest";
import Showall from "../Components/Showall";
import Practice from "../Components/Practice";
import Homepage from "../Components/Homepage";
import MainPage from "../Components/MainPage";

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function Navibar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentPagename, setCurrentPagename] = useState("어서오세요");

  let navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setCurrentPagename(e.currentTarget.name); //페이지 이동시 해당 페이지의 이름을 가져와 맨위에 띄워주기 위함
    setAnchorEl(null);
  };

  return (
    <>
      <div style={{ position: "fixed" }}>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          ▤
        </Button>
      </div>
      {/* <Routes basename="/main"> */}
      <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Home"
            onClick={() => navigate("/")}
          ></ListItemText>
        </StyledMenuItem>

        <StyledMenuItem>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="ShowAll"
            onClick={() => navigate("/showall")}
          ></ListItemText>
        </StyledMenuItem>

        <StyledMenuItem>
          <ListItemIcon>
            <DraftsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Practice"
            onClick={() => navigate("/practice")}
          ></ListItemText>
        </StyledMenuItem>

        <StyledMenuItem>
          <ListItemIcon>
            <InboxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="EasyTest"
            onClick={() => navigate("/easytest")}
          ></ListItemText>
        </StyledMenuItem>

        <StyledMenuItem>
          <ListItemIcon>
            <InboxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={props.name + "의 점수확인"}
            onClick={() => navigate("/checkscore")}
          ></ListItemText>
        </StyledMenuItem>
      </Menu>
      <Route index path="/" element={<MainPage />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/practice" element={<Practice />} />
      <Route path="/showall" element={<Showall />} />
      <Route path="/easytest" element={<EasyTest />} />
      {/* </Routes> */}
    </>
  );
}

export default Navibar;
