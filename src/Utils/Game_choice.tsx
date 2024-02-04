/*

    객관식 게임의 진행 과정

    1. 단을 선택한다 

*/
import React, { forwardRef, ReactNode, useState } from "react";
import { useSpring, animated, SpringConfig } from "react-spring";
import "../CSSs/Game_choice.css";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useNavigate } from "react-router-dom";
let randnum1,
  randnum2 = 1;

let answers = [];
const makeRandom = (val) => {
  if (Number(val) === 10) {
    //만약 props로 받은 dan이 10이라면 모두를 선택한것.
    randnum1 = generateRandom(2, 9);
    randnum2 = generateRandom(2, 9);
    let answerA = (randnum1 - 1) * randnum2;
    let answerB = randnum1 * (randnum2 - 1);
    let answerC = randnum1 * randnum2;
    let answerD = randnum1 * (randnum2 + 1);
    answers = [answerA, answerB, answerC, answerD];
    answers.sort(function () {
      return Math.random() - Math.random();
    });
  } else {
    let answerA = (randnum1 - 1) * randnum2;
    let answerB = randnum1 * (randnum2 - 1);
    let answerC = randnum1 * randnum2;
    let answerD = randnum1 * (randnum2 + 1);
    answers = [answerA, answerB, answerC, answerD];
    answers.sort(function () {
      return Math.random() - Math.random();
    });
  }
};
let generateRandom = function (min, max) {
  let ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return ranNum;
};
// ==================== 게임끝날을때 결과 알려줄 팝업창 실행 함수 ===============================
const EndOfGame = () => {
  alert("게임끝났엉");
  randnum2 = 1;
};

// ===================== 게임 종료시 모달 창 ==========================================
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 260,
    height: 270,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

interface FadeProps {
  in: boolean;
  children?: ReactNode;
  onEnter?: () => void;
  onExited?: () => void;
}

const Fade = forwardRef<HTMLDivElement, FadeProps>(function Fade(
  { in: open, children, onEnter, onExited, ...other },
  ref
) {
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style as any} {...other}>
      {children}
    </animated.div>
  );
});

let O = 0;
let X = 0;

function Game_choice(props) {
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);
  const [descDP, setDescDP] = useState("");
  const [gameDP, setGameDP] = useState("inline-block");
  const [resultDP, setResultDP] = useState("none");
  const [TabletChoiceBoxDP, setTCBD] = useState("");

  let navigate = useNavigate();

  randnum1 = props.dan;
  if (props.dan !== "10") randnum2 = count + 1;
  // 모달 위한 함수들
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //============================================================

  const check = (e) => {
    e.preventDefault();
    //정답일시
    if (Number(e.target.id) === randnum1 * randnum2) {
      console.log("정답");
      randnum2++;
      setCount(count + 1);
      setScore(score + 1);
      makeRandom(props.dan);
      setAnswer("");
      O++;
    }
    //오답일시
    else {
      console.log("오답");
      alert(`정답은 ${randnum1 * randnum2} 입니다.`);
      randnum2++;
      X++;
      makeRandom(props.dan);
      setCount(count + 1);
      setAnswer("");
    }
    if (count === 9) {
      // 게임 끝날때 동작해야 할 코드들
      setGameDP("none");
      setResultDP("");
      EndOfGame();
      handleOpen();
      setTCBD("none");
      randnum2 = 1;
    }
  };

  const goHome = () => {
    navigate("/");
  };

  makeRandom(props.dan); //맨 처음에 하나 만들어 놓음

  return (
    <div className="Game_choice_Container">
      <div className="GH_gugudan_box" style={{ display: gameDP }}>
        <div className="Problem_numberBox">문제 {count + 1}</div>
        <p className="text" style={{ width: "100%" }}>
          　　　{randnum1}
        </p>
        <p className="text" style={{ width: "100%" }}>
          <span className="text" style={{ width: "100%" }}>
            <span className="text">X　　</span>{" "}
            <span className="text text2">{randnum2}</span>
          </span>
        </p>
        <div className="cutline"></div>
        {/* 객관식 답 누를 수 있는 버튼 */}
        <div className="OnMobile_ChoiceBox">
          <div className="Choice_Line">
            <button className="Answer_Btn" id={answers[0]} onClick={check}>
              {answers[0]}
            </button>
            <button className="Answer_Btn" id={answers[1]} onClick={check}>
              {answers[1]}
            </button>
          </div>
          <div className="Choice_Line">
            <button className="Answer_Btn" id={answers[2]} onClick={check}>
              {answers[2]}
            </button>
            <button className="Answer_Btn" id={answers[3]} onClick={check}>
              {answers[3]}
            </button>
          </div>
        </div>
        <div className="OnTablet_AnswerBox"></div>
      </div>

      {/* 타블렛 이상 크기의 기기에서 보여질 객관식 창 */}
      <div
        className="OnTablet_ChoiceBox"
        style={{ display: TabletChoiceBoxDP }}
      >
        <p className="OnTablet_text">다음 중에 알맞은 답을 고르세요</p>
        <div className="Choice_Line">
          <button className="Answer_Btn" id={answers[0]} onClick={check}>
            {answers[0]}
          </button>
          <button className="Answer_Btn" id={answers[1]} onClick={check}>
            {answers[1]}
          </button>
        </div>
        <div className="Choice_Line">
          <button className="Answer_Btn" id={answers[2]} onClick={check}>
            {answers[2]}
          </button>
          <button className="Answer_Btn" id={answers[3]} onClick={check}>
            {answers[3]}
          </button>
        </div>
      </div>

      {/* 게임 끝났을 시 나올 모달 창 */}
      <div className="result_box" style={{ display: resultDP }}>
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          onBackdropClick={() => {
            navigate("/");
          }}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <p className="Result_text">
                맞힌 문항 수 : 　<span className="Result_text2">{O}</span>
              </p>
              <p className="Result_text">
                틀린 문항 수 : 　<span className="Result_text2">{X}</span>
              </p>
              <button
                className="Result_Btn Result_Btn1"
                onClick={(e) => {
                  setScore(0);
                  setCount(0);
                  setAnswer("");
                  setGameDP("inline-block");
                  setResultDP("none");
                  randnum2 = 1;
                  if (window.innerWidth > 360) {
                    setTCBD("inline-block");
                  }
                  handleClose();
                  O = 0;
                  X = 0;
                }}
              >
                다시하기
              </button>
              <button
                className="Result_Btn Result_Btn2"
                onClick={() => {
                  setScore(0);
                  setCount(0);
                  setAnswer("");
                  randnum2 = 1;
                  O = 0;
                  X = 0;
                  handleClose();
                  goHome();
                }}
              >
                홈으로 가기
              </button>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

export default Game_choice;
