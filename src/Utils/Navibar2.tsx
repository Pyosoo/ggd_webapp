import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Routes, Route, Link, Outlet, useNavigate } from "react-router-dom";
import "../CSSs/Navibar2.css";
import { connect } from "react-redux";

const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: "auto",
  },
};

let ImgArr = ["monkey", "mice", "tiger", "rabbit"];

function Navibar2(props) {
  const [toggle, setToggle] = useState<boolean>(false);
  const [topTitle, setTopTitle] = useState<string>("");
  const [naviColor, setNaviColor] = useState<string>("#1E7CDE");
  const { classes } = props;

  let navigate = useNavigate();

  const handleDrawerToggle = (e) => {
    setToggle(!toggle);
    setTopTitle(e.target.name);
    if (props.imgidx === 0 || props.imgidx === 2) {
      setNaviColor("#87CEEB");
    } else {
      setNaviColor("#F0A7B4");
    }
  };

  //console.log(`현재 Navibar이고 , Main으로 부터 받은 index 는 ${this.props.imgidx} 이다.` )

  return (
    <>
      <div className={classes.root}>
        <AppBar
          className="Top_bar"
          position="static"
          style={{ display: "block", backgroundColor: "#1E7CDE" }}
        >
          <IconButton
            className={classes.menuButton}
            id="hamburgerMenu"
            color="inherit"
            onClick={handleDrawerToggle}
          >
            <MenuIcon className="hamburgeIcon" />
          </IconButton>
          <p
            className="Top_bar_text"
            style={{
              display: "inline-block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {topTitle}
          </p>
        </AppBar>
        <Drawer open={toggle}>
          <div className="navibar_body" style={{ backgroundColor: naviColor }}>
            <div className="Navi_Xbtn" onClick={handleDrawerToggle}></div>
            <div className="Navibar_imgbox">
              <MenuItem onClick={handleDrawerToggle}>
                <img
                  alt=""
                  className="Navibar2_img"
                  onClick={() => navigate("/")}
                  src={require(`../Images/${ImgArr[props.ImageIndex]}.png`)}
                />
              </MenuItem>
            </div>
            <p className="Navibar_name">{props.name}</p>
            <MenuItem id="구구단 표" onClick={handleDrawerToggle}>
              <Link className="linkitem" to="/showall">
                구구단 표
              </Link>
            </MenuItem>
            <MenuItem id="연습 하기" onClick={handleDrawerToggle}>
              <Link className="linkitem" to="/practice">
                연습 하기
              </Link>
            </MenuItem>
            <MenuItem id="시험 보기" onClick={handleDrawerToggle}>
              <Link className="linkitem" to="/easytest">
                시험 보기
              </Link>
            </MenuItem>
            <MenuItem id="성적 확인" onClick={handleDrawerToggle}>
              <Link className="linkitem" to="/checkscore">
                {props.name}의 성적 확인
              </Link>
            </MenuItem>
          </div>
        </Drawer>
      </div>

      <Outlet />
    </>
  );
}

export default withStyles(styles)(connect(mapStateToProps)(Navibar2));

// Redux state로부터 home에 prop으로써 전달한다는 뜻.
function mapStateToProps(state, ownProps) {
  return { ImageIndex: state.ImageIndex };
}
