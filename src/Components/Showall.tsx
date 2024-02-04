import React, { useState } from "react";
import "../CSSs/Showall.css";

// let arr1=[], arr2=[], arr3=[], arr4=[];
// // 맨처음 2단을 보여주기 위해 그냥 2단을 먼저 넣어놓는 부분=================================
//     for (let j = 1; j <= 5; j++) {
//         let result = 2 + " x " + j + " = " + 2 * j ;
//         arr1 = [...arr1, result];
//         result =  2 + " x " + j;
//         arr2 = [...arr2, result];
//     }
//     // 5줄 4줄로 나눠서 보여주기 위해 다른배열에 넣어놓음..
//     for(let j=6; j<10; j++){
//         let result = 2 + " x " + j + " = " + 2 * j ;
//         arr3 = [...arr3, result];
//         result =  2 + " x " + j;
//         arr4 = [...arr4, result];
//     }

//     let temp1 = arr1.map((menu, index) => (
//         <li className="showall_listitem" key={index}>{menu}</li>) // key 중복 바꿔야함 !!=========================================
//     );
//     let temp2 = arr3.map((menu, index)=>(
//         <li className="showall_listitem" key={index}>{menu}</li>
//     ))
//     let temp3 = arr2.map((menu, index)=>(
//         <li className="showall_listitem" key={index}>{menu}</li>
//     ))
//     let temp4 = arr4.map((menu, index)=>(
//         <li className="showall_listitem" key={index}>{menu}</li>
//     ))

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
            {[2, 3, 4, 5].map((num, i) => {
              return (
                <button
                  className={number === num ? "dan_btn numberOn" : "dan_btn"}
                  id={num + ""}
                  onClick={btnClick(num)}
                >
                  {num}단
                </button>
              );
            })}
          </div>
          <div className="DanButtonLine">
            {[6, 7, 8, 9].map((num, i) => {
              return (
                <button
                  className={number === num ? "dan_btn numberOn" : "dan_btn"}
                  id={num + ""}
                  onClick={btnClick(num)}
                >
                  {num}단
                </button>
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
