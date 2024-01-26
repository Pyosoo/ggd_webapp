import React from "react";
import "../CSSs/Homepage.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Homepage(props) {
  let userName = localStorage.getItem("Nickname");
  let navigate = useNavigate();
  const ImageIndex = useSelector((state) => state.ImageIndex);

  let ImgArr = ["monkey", "mice", "tiger", "rabbit"];

  return (
    <div className="Homepage_Container">
      <div className="Homepage_ImgBox">
        <img
          alt=""
          className="Homepage_img"
          src={require(`../Images/${ImgArr[ImageIndex]}.png`)}
        ></img>
      </div>

      <div className="Homepage_BtnBox">
        <button
          className="Homepage_Btn"
          id="1"
          type="button"
          onClick={() => navigate("/showall")}
        >
          구구단 표
        </button>
        <button
          className="Homepage_Btn"
          id="2"
          type="button"
          onClick={() => navigate("/practice")}
        >
          연습 하기
        </button>
        <button
          className="Homepage_Btn"
          id="3"
          type="button"
          onClick={() => navigate("/easytest")}
        >
          시험 보기
        </button>
        <button
          className="Homepage_Btn"
          id="4"
          type="button"
          onClick={() => navigate("/checkscore")}
        >
          {userName}의 성적 확인하기
        </button>
      </div>
    </div>
  );
}

export default Homepage;
