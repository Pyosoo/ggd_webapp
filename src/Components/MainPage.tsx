import React, { useState } from "react";
import "../CSSs/MainPage.css";
import Navibar2 from "../Utils/Navibar2";
import { useNavigate } from "react-router-dom";

function MainPage(props) {
  const { setImgIndex, setUserName, setDan } = props;
  const navigate = useNavigate();

  const [registerInput, setRegisterInput] = useState("");
  const [registerDisplay, setRegisterDisplay] = useState("");
  const [choiceDisplay, setChoiceDisplay] = useState("none");
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const ImgArr = ["monkey", "mice", "tiger", "rabbit"];

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
        <button
          className="Main_registerBtn"
          onClick={() => {
            localStorage.setItem("Nickname", registerInput);
            navigate("/home");
          }}
        >
          등록하기
        </button>
      </div>

      <div className="choice" style={{ display: choiceDisplay }}>
        <Navibar2 name={registerInput} imgidx={currentImgIndex} />
      </div>
    </div>
  );
}

export default MainPage;
