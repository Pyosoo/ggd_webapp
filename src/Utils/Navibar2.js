import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Routes, Route, Link, Outlet } from "react-router-dom";
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

class Navibar2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      toptitle: "",
      naviColor: "#1E7CDE",
    };
  }
  handleDrawerToggle = (e) => {
    this.setState({
      toggle: !this.state.toggle,
      toptitle: e.target.name,
    });
    this.setcolor();
  };

  setcolor = () => {
    if (this.props.imgidx === 0 || this.props.imgidx === 2) {
      this.setState({ naviColor: "#87CEEB" });
    } else {
      this.setState({ naviColor: "#F0A7B4" });
    }
  };

  render() {
    //console.log(`현재 Navibar이고 , Main으로 부터 받은 index 는 ${this.props.imgidx} 이다.` )

    const { classes } = this.props;
    const { toptitle } = this.state;
    console.log(this.props);
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
              onClick={this.handleDrawerToggle}
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
              {toptitle}
            </p>
          </AppBar>
          <Drawer open={this.state.toggle}>
            <div
              className="navibar_body"
              style={{ backgroundColor: this.state.naviColor }}
            >
              <div
                className="Navi_Xbtn"
                onClick={this.handleDrawerToggle}
              ></div>
              <div className="Navibar_imgbox">
                <MenuItem onClick={this.handleDrawerToggle}>
                  <Link name="" className="linkitem1" to="/">
                    <img
                      alt=""
                      className="Navibar2_img"
                      src={require(`../Images/${
                        ImgArr[this.props.ImageIndex]
                      }.png`)}
                    />
                  </Link>
                </MenuItem>
              </div>
              <p className="Navibar_name">{this.props.name}</p>
              <MenuItem id="구구단 표" onClick={this.handleDrawerToggle}>
                <Link name="구구단표 보기" className="linkitem" to="/showall">
                  구구단 표
                </Link>
              </MenuItem>
              <MenuItem id="연습 하기" onClick={this.handleDrawerToggle}>
                <Link name="연습 하기" className="linkitem" to="/practice">
                  연습 하기
                </Link>
              </MenuItem>
              <MenuItem id="시험 보기" onClick={this.handleDrawerToggle}>
                <Link name="시험 보기" className="linkitem" to="/easytest">
                  시험 보기
                </Link>
              </MenuItem>
              <MenuItem id="성적 확인" onClick={this.handleDrawerToggle}>
                <Link
                  name={this.props.name + "의 성적 확인"}
                  className="linkitem"
                  to="/checkscore"
                >
                  {this.props.name}의 성적 확인
                </Link>
              </MenuItem>
            </div>
          </Drawer>
        </div>

        <Outlet />
      </>
    );
  }
}

export default withStyles(styles)(connect(mapStateToProps)(Navibar2));

// Redux state로부터 home에 prop으로써 전달한다는 뜻.
function mapStateToProps(state, ownProps) {
  return { ImageIndex: state.ImageIndex };
}
