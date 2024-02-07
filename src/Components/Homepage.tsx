import React from "react";
import "../CSSs/Homepage.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { storeState } from "../store";

export default function Homepage() {
  let userName = localStorage.getItem("Nickname");
  let navigate = useNavigate();
  const ImageIndex = useSelector((state: storeState) => state.ImageIndex);

  let ImgArr = ["monkey", "mice", "tiger", "rabbit"];

  let pageLayout = [
    {
      name: "구구단표",
      link: "/showall",
    },
    {
      name: "연습하기",
      link: "/practice",
    },
    {
      name: "시험보기",
      link: "/easytest",
    },
    {
      name: "성적확인",
      link: "/checkscore",
    },
  ];

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
        {pageLayout.map((layout, index) => {
          return (
            <button
              className="Homepage_Btn"
              type="button"
              onClick={() => navigate(layout.link)}
            >
              {layout.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
