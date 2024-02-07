import React, { useState } from "react";
import "../CSSs/Practice.css";
import Game_choice from "../Utils/Game_choice";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import { storeState } from "../store";

// 문제연습은 객관식
// 시험보기만 주관식

function Practice() {
  const [dan, setDan] = useState();
  const [btnDP, setBtnDP] = useState("");
  const [gameDP, setGameDP] = useState("none");
  const ImgArr = ["monkey", "mice", "tiger", "rabbit"];

  const ImgIndex = useSelector((state: storeState) => state.ImageIndex);

  const danChoice = (d) => {
    setDan(d);
    alert(`${d}단을 연습합니다.`);
    setGameDP("");
    setBtnDP("none");
  };

  return (
    <div className="Practice_Container">
      <div style={{ display: gameDP }}>
        <Game_choice dan={dan} />
      </div>

      <div style={{ display: btnDP }}>
        <div className="Practice_imgbox">
          <img
            alt=""
            className="Practice_img"
            src={require(`../Images/${ImgArr[ImgIndex]}.png`)}
          ></img>
        </div>
        <p className="Practice_text">연습하고자 하는 구구단을 선택하세요</p>
        <div className="Practice_Btn_Line">
          {[2, 3, 4, 5, 6, 7, 8, 9].map((d, i) => {
            return (
              <>
                <button className="Practice_Btn" onClick={() => danChoice(d)}>
                  {d}단
                </button>
                {i === 3 ? <br /> : null}
              </>
            );
          })}
        </div>
        <button className="Practice_Btn2" id="10" onClick={danChoice}>
          모두
        </button>
      </div>
    </div>
  );
}

export default Practice;
