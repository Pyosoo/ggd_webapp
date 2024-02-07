import React, { useState } from "react";
import "../CSSs/Showall.css";

function Showall() {
  const [showAnswer, setShowAnswer] = useState(true);
  const [number, setNumber] = useState(2);

  const btnClick =
    (selectedNumber: number) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setNumber(selectedNumber);
    };
  const modeClick =
    (type: boolean) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setShowAnswer(type);
    };

  //InitialGugudan();
  return (
    <div className="Showall_Container">
      <div className="showmodebtn_box">
        <button
          className={showAnswer ? "showmode_btn btnOn" : "showmode_btn"}
          onClick={modeClick(true)}
        >
          답보기
        </button>
        <button
          className={!showAnswer ? "showmode_btn btnOn" : "showmode_btn"}
          onClick={modeClick(false)}
        >
          답가리기
        </button>
      </div>

      <div className="ShowBox_BtnBox">
        <div className="DanBox">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, i) => {
            return (
              <div className="DanLine" title={number * num + ""}>
                {number} x {num}{" "}
                <span className={showAnswer ? "" : "hide"}>
                  {" "}
                  = {number * num}
                </span>
              </div>
            );
          })}
        </div>
        {/* 구구단 표 고르는 버튼들 */}
        <div className="dan_btn_Container">
          <p className="OnTablet_text" style={{ fontSize: "25px" }}>
            외우고자 하는 구구단을 선택해주세요!
          </p>
          <div className="DanButtonLine">
            {[2, 3, 4, 5, 6, 7, 8, 9].map((num, i) => {
              return (
                <>
                  <button
                    className={number === num ? "dan_btn numberOn" : "dan_btn"}
                    id={num + ""}
                    onClick={btnClick(num)}
                  >
                    {num}단
                  </button>
                  {i === 3 ? <br /> : null}
                </>
              );
            })}
          </div>
          <div className="OnTablet">
            <button
              className={showAnswer ? "showmode_btn btnOn" : "showmode_btn"}
              onClick={modeClick(true)}
            >
              답보기
            </button>
            <button
              className={!showAnswer ? "showmode_btn btnOn" : "showmode_btn"}
              onClick={modeClick(false)}
            >
              답가리기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Showall;
