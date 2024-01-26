import React, { useState } from "react";
import "../CSSs/MainPage.css";
import Navibar2 from "../Utils/Navibar2";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { useNavigate } from "react-router-dom";

function MainPage(props) {
  const { setImgIndex, setUserName, setDan } = props;
  const navigate = useNavigate();

  const [registerInput, setRegisterInput] = useState("");
  const [registerDisplay, setRegisterDisplay] = useState("");
  const [choiceDisplay, setChoiceDisplay] = useState("none");
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const ImgArr = ["monkey", "mice", "tiger", "rabbit"];

  const CheckID = () => {
    // ID를 입력했다면 -> Display변경을 통해 Homepage로 전환
    if (registerInput !== "") {
      setRegisterDisplay("none");
      setChoiceDisplay("grid");
      localStorage.setItem("Nickname", registerInput);

      // 이미지 이름과 UserName을 모든 컴포넌트에서 사용하기 편하게 Store에 저장
      setImgIndex(currentImgIndex);
      setUserName(registerInput);
    } else {
      alert("사용하실 닉네임을 설정해주세요!");
    }
  };

  return (
    <div>
      <div className="register" style={{ display: registerDisplay }}>
        <div className="Main_ImgBox">
          <div className="forVertical">
            <img
              alt=""
              className="changeImg changeImgLeft"
              onClick={() => {
                if (currentImgIndex === 0) {
                  setCurrentImgIndex(3);
                } else {
                  setCurrentImgIndex(currentImgIndex - 1);
                }
              }}
              src={require("../Images/leftArrow.png")}
            />
          </div>
          <img
            alt=""
            className="Mainpage_img"
            src={require(`../Images/${ImgArr[currentImgIndex]}.png`)}
          />
          <div className="forVertical">
            <img
              alt=""
              className="changeImg changeImgRight"
              onClick={() => {
                if (currentImgIndex === 3) {
                  setCurrentImgIndex(0);
                } else {
                  setCurrentImgIndex(currentImgIndex + 1);
                }
              }}
              src={require(`../Images/rightArrow.png`)}
            />
          </div>
        </div>
        <p className="Mainpage_text">캐릭터를 선택해주세요.</p>
        <input
          className="Main_InputBox"
          type="text"
          value={registerInput}
          placeholder="이름을 입력해주세요."
          onChange={(e) => {
            setRegisterInput(e.target.value);
          }}
        ></input>
        <button className="Main_registerBtn" onClick={() => navigate("/home")}>
          등록하기
        </button>
      </div>

      <div className="choice" style={{ display: choiceDisplay }}>
        <Navibar2 name={registerInput} imgidx={currentImgIndex} />
      </div>
    </div>
  );
}

// Redux state로부터 home에 prop으로써 전달한다는 뜻.
function mapStateToProps(state, ownProps) {
  return { UserPlusImageName: state }; //toDos에 state를 가져온다.
}

// reducer에 action을 알리는 함수
function mapDispatchToProps(dispatch) {
  return {
    setImgIndex: (idx) => dispatch(actionCreators.setImgIndex(idx)),
    setUserName: (idx) => dispatch(actionCreators.setUserName(idx)),
    setDan: (idx) => dispatch(actionCreators.setDan(idx)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
