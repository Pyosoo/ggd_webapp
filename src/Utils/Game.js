import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import '../CSSs/Game.css';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


let LimitCountDown;
var flag = false;
// ==========================랜덤 수 발생 함수======================================
let generateRandom = function (min, max) {
    let ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return ranNum;
}

let randnum1, randnum2;

const makeRandom = () => {
    randnum1 = generateRandom(2, 9);
    randnum2 = generateRandom(2, 9);
}



// ==============점수와 날짜를 localstorage에 담아두기 위한 배열들===================
/*
 LocalStorage가 계속 초기화 시킬때 사용
var gr = [];
var ty = [];
var tm = [];
var td = [];
var th = [];  //시
var tb = []; //분
*/
    var gr;
    var ty;
    var tm;
    var td;   
    var th; //시
    var tb;//분
const getLocalStorageData = () => {
     gr = JSON.parse(localStorage.getItem("Totalscore"));
        if(gr === null) gr = []; 
     ty = JSON.parse(localStorage.getItem("YearOfScore"));
        if(ty === null) ty = [];
     tm = JSON.parse(localStorage.getItem("MonthOfScore"));
        if(tm === null) tm = [];
     td = JSON.parse(localStorage.getItem("DateOfScore"));
        if(td === null) td = [];
     th = JSON.parse(localStorage.getItem("HourOfScore"));
        if(th === null) th = [];  //시
     tb = JSON.parse(localStorage.getItem("BoonOfScore"));
        if(tb === null) tb = []; //분
}


// ===================정답과 오답을 종료 후 보여 주기 위한 부분=======================
let RightAnswer = [];
let WrongAnswer = [];

let RightAnswerList, WrongAnswerList;
let RightAnswerListIndex = 0, WrongAnswerListIndex = 0;
const mapingRightAnswer = () => {
    console.log("mapingRightAnswer 실행");
    RightAnswerList = RightAnswer.map(data => (
        <li className="result_listitem" style={{ listStyle: 'none', color: '#6A6A6A' }} key={RightAnswerListIndex++}>{data}</li>
    ))
}
const mapingWrongAnswer = () => {
    console.log("mapingWrongAnswer 실행");
    WrongAnswerList = WrongAnswer.map(data => (
        <li className="result_listitem" style={{ listStyle: 'none', color: '#D9534F' }} key={WrongAnswerListIndex++}>{data}</li>
    ))
}



let score = 0;
const IncreaseScore = () => { score += 1; }
const ZeroScore = () => { score = 0; }


getLocalStorageData();

let ImgArr = ["monkey", "mice", "tiger", "rabbit"];

function Game(props) {
    const [answer, setAnswer] = useState('');
    // const [score, setScore] = useState(0);
    const [count, setCount] = useState(1);
    const [descDP, setDescDP] = useState('');
    const [gameDP, setGameDP] = useState('none');
    const [resultDP, setResultDP] = useState('none');
    const [open, setOpen] = useState(false);
    const [textcount, setTextcount] = useState(3);
    const [limitTime, setLimitTime] = useState(120);


    let history = useHistory();

    //==================== 타이머 관련 함수 =============================================
    const useStyles = makeStyles((theme) => ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            width: 216,
            height: 166,
        },
    }));
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
        countdown();
    };

    const handleClose = () => {
        setOpen(false);
        LimitCountDown();
    };


    
    let t = 3;
    const countdown = () => {
        const test = setInterval(() => {
            if (t === 1) {
                clearInterval(test);
                handleClose();
            }
            t -= 1;
            setTextcount(t);
        }, 1000);
    }



    // =============================== 시험 제한 시간 타이머 ==================================================

    let limittimer = null;
    var limit = 120;
    useEffect(()=>{
        // 타이머
        LimitCountDown = () => {
            console.log("제한시간타이머 작동");
             limittimer = window.setInterval(()=>{
                 console.log(`시간 : ${limit}`);
                if(limit === 0){
                    clearInterval(limittimer);
                    console.log("limit 타이머 종료");
                    setGameDP('none');
                                    setResultDP('');
                                    gr.push(score);
                                    localStorage.setItem("Totalscore", JSON.stringify(gr));
                                    let today = new Date();
                                    let year = today.getFullYear(); ty.push(year); localStorage.setItem("YearOfScore", JSON.stringify(ty));
                                    let month = today.getMonth(); tm.push(month + 1); localStorage.setItem("MonthOfScore", JSON.stringify(tm)); //월은 +1 해줘야함
                                    let hour = today.getHours(); th.push(hour); localStorage.setItem("HourOfScore", JSON.stringify(th));
                                    let miniute = today.getMinutes(); tb.push(miniute); localStorage.setItem("BoonOfScore", JSON.stringify(tb));
                                    let date = today.getDate(); td.push(date); localStorage.setItem("DateOfScore", JSON.stringify(td));
    
                            //        console.log(localStorage.getItem("Totalscore"));
                            //        console.log(localStorage.getItem("YearOfScore"));
                            //        console.log(localStorage.getItem("MonthOfScore"));
                            //        console.log(localStorage.getItem("DateOfScore"));
    
                                    mapingRightAnswer();
                                    mapingWrongAnswer();
                                    RightAnswer = [];
                                    WrongAnswer = [];
                }
                // 전역 변수로 선언된 flag가 게임이 끝나면 true로 바뀐다. true면 타이머는 초기화된다.
                if(flag === false){
                    limit -= 1;
                    setLimitTime(limit);
                }
                else if(flag === true){
                    clearInterval(limittimer);
                }
            },1000);
        }
        //--- 끝 ---
        return ()=>{
            window.clearInterval(limittimer); 
            console.log("타이머 화면  UnMount 됩니다.")
        }

    },[]);
    

    // =======================================================================================================






    return (
        <div>
            {/* 게임 시작을 누르는 div */}
            <div className="desc_box" style={{ display: descDP }}>
                <img alt='' className="Game_start_img" src={require(`../Images/${ImgArr[props.idx]}.png`)} ></img>
                <button className="Game_startBtn" onClick={e => {
                    setDescDP('none');
                    setGameDP('');
                    setResultDP('none');
                    makeRandom();
                    ZeroScore();
                    handleOpen();
                    RightAnswer = [];
                    WrongAnswer = [];
                    flag = false;
                }}>시작하기</button>


            </div>
            {/* 게임 진행되는 div */}
            <div className="gugudan_box" style={{ display: gameDP }}>
                {/* ============타이머 모달창=============== */}
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    disableBackdropClick = {true}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div id="Modal_box" className={classes.paper}>
                            {textcount}
                        </div>
                    </Fade>
                </Modal>
                <div className="top_number">
                    문제 {count}  
                </div>
                <div className="limit_bar_container">
                    <div className="limit_bar_img"></div> 
                    <div className="limit_bar_back">
                        <div className={"limit_bar " + "sec" + limitTime}>
                        </div>
                    </div>
                    
                </div>

                {/* 문제 나오는 부분 */}
                <form className="Form">
                    <p className="Game_text">{randnum1} x {randnum2} =
                    <input
                            className="InputBox"
                            type="text"
                            value={answer}
                            onChange={e => setAnswer(e.target.value)}
                            onKeyPress={e => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    if (Number(answer) === (randnum1 * randnum2)) {   //정답일때
                                        setCount(count + 1);
                                        //console.log(`${score}에서 `);
                                        //setScore(score + 1);
                                        IncreaseScore();
                                        //console.log(`${score}로 증가`)
                                        RightAnswer.push(`${randnum1} x ${randnum2} = ${randnum1 * randnum2}`);
                                        makeRandom();
                                        setAnswer('');
                                        //console.log(`정답, 현재 스코어 ${score}`);
                                    }
                                    else {                                          //오답일때
                                        setCount(count + 1);
                                        WrongAnswer.push(`${randnum1} x ${randnum2} = ${randnum1 * randnum2}`)
                                        makeRandom();
                                        setAnswer('');
                                        //console.log("오답");
                                    }
                                    if (Number(count) === 10) {        // 모든 시험이 끝났을때
                                        //console.log(`맞음${score} 틀림:${count - score}`)
                                        limit = 1;
                                        flag = true;
                                        setLimitTime(limit);
                                        setGameDP('none');
                                        setResultDP('');
                                        gr.push(score);
                                        localStorage.setItem("Totalscore", JSON.stringify(gr));
                                        let today = new Date();
                                        let year = today.getFullYear(); ty.push(year); localStorage.setItem("YearOfScore", JSON.stringify(ty));
                                        let month = today.getMonth(); tm.push(month + 1); localStorage.setItem("MonthOfScore", JSON.stringify(tm)); //월은 +1 해줘야함
                                        let date = today.getDate(); td.push(date); localStorage.setItem("DateOfScore", JSON.stringify(td));
                                        let hours = today.getHours(); th.push(hours); localStorage.setItem("HourOfScore", JSON.stringify(th));
                                        let boons = today.getMinutes(); tb.push(boons); localStorage.setItem("BoonOfScore", JSON.stringify(tb));
                                        
                                //        console.log(localStorage.getItem("Totalscore"));
                                //        console.log(localStorage.getItem("YearOfScore"));
                                //        console.log(localStorage.getItem("MonthOfScore"));
                                //        console.log(localStorage.getItem("DateOfScore"));

                                        mapingRightAnswer();
                                        mapingWrongAnswer();
                                    }
                                }
                            }
                            }
                        >
                        </input>
                    </p>



                    <div>
                        <button id="1" className="Keypad_Btn" onClick={e => {
                            e.preventDefault();
                            setAnswer(answer + e.target.id);
                        }}>1</button>
                        <button id="2" className="Keypad_Btn" onClick={e => {
                            e.preventDefault();
                            setAnswer(answer + e.target.id);
                        }}>2</button>
                        <button id="3" className="Keypad_Btn" onClick={e => {
                            e.preventDefault();
                            setAnswer(answer + e.target.id);
                        }}>3</button>
                    </div>

                    <div>
                        <button id="4" className="Keypad_Btn" onClick={e => {
                            e.preventDefault();
                            setAnswer(answer + e.target.id);
                        }}>4</button>
                        <button id="5" className="Keypad_Btn" onClick={e => {
                            e.preventDefault();
                            setAnswer(answer + e.target.id);
                        }}>5</button>
                        <button id="6" className="Keypad_Btn" onClick={e => {
                            e.preventDefault();
                            setAnswer(answer + e.target.id);
                        }}>6</button>
                    </div>

                    <div>
                        <button id="7" className="Keypad_Btn" onClick={e => {
                            e.preventDefault();
                            setAnswer(answer + e.target.id);
                        }}>7</button>
                        <button id="8" className="Keypad_Btn" onClick={e => {
                            e.preventDefault();
                            setAnswer(answer + e.target.id);
                        }}>8</button>
                        <button id="9" className="Keypad_Btn" onClick={e => {
                            e.preventDefault();
                            setAnswer(answer + e.target.id);
                        }}>9</button>
                    </div>

                    <div>
                        <button className="Keypad_cancel" onClick={e => {
                            e.preventDefault();
                            setAnswer('');
                        }}>　</button>
                        <button id="0" className="Keypad_Btn" onClick={e => {
                            e.preventDefault();
                            setAnswer(answer + e.target.id);
                        }}>0</button>
                        <button className="Keypad_check" onClick={e => {
                            e.preventDefault();
                            if (Number(answer) === (randnum1 * randnum2)) {   //정답일때
                                setCount(count + 1);
                                console.log(`${score}에서 `);
                                //setScore(score + 1);
                                IncreaseScore();
                                console.log(`${score}로 증가`)
                                RightAnswer.push(`${randnum1} x ${randnum2} = ${randnum1 * randnum2}`);
                                makeRandom();
                                setAnswer('');
                                console.log(`정답, 현재 스코어 ${score}`);
                            }
                            else {                                          //오답일때
                                setCount(count + 1);
                                WrongAnswer.push(`${randnum1} x ${randnum2} = ${randnum1 * randnum2}`)
                                makeRandom();
                                setAnswer('');
                                console.log("오답");
                            }
                            if (Number(count) === 10) {        // 모든 시험이 끝났을때
                                flag = true;
                                setGameDP('none');
                                setResultDP('');
                                gr.push(score);
                                localStorage.setItem("Totalscore", JSON.stringify(gr));
                                let today = new Date();
                                let year = today.getFullYear(); ty.push(year); localStorage.setItem("YearOfScore", JSON.stringify(ty));
                                let month = today.getMonth(); tm.push(month + 1); localStorage.setItem("MonthOfScore", JSON.stringify(tm)); //월은 +1 해줘야함
                                let hour = today.getHours(); th.push(hour); localStorage.setItem("HourOfScore", JSON.stringify(th));
                                let miniute = today.getMinutes(); tb.push(miniute); localStorage.setItem("BoonOfScore", JSON.stringify(tb));
                                let date = today.getDate(); td.push(date); localStorage.setItem("DateOfScore", JSON.stringify(td));

                            //    console.log(localStorage.getItem("Totalscore"));
                            //    console.log(localStorage.getItem("YearOfScore"));
                            //    console.log(localStorage.getItem("MonthOfScore"));
                            //    console.log(localStorage.getItem("DateOfScore"));

                                mapingRightAnswer();
                                mapingWrongAnswer();
                            }
                        }}>　</button>
                    </div>
                </form>
            </div>

            {/* 시험 끝나면 display 될 곳 */}
            <div className="G_result_box" style={{ display: resultDP }}>
                <p className="result_text">점수</p>
                <p className="result_score">{score * 10}</p>
                <div className="G_cutline"></div>
                <div className="G_cutline"></div>
                <div className="RightWrong_Container">
                    <div className="Right_box">
                        {score} <br />
                        정답
                    </div>
                    <div className="Wrong_box">
                        {10 - score} <br />
                        오답
                    </div>
                </div>
                <div className="result_problem">
                    <div className="result_rightPb">
                        {RightAnswerList}
                    </div>
                    <div className="result_wrongPb">
                        {WrongAnswerList}
                    </div>
                </div>


               
                <div className="result_Btn_div">
                    <div className="OnTablet_ResultScoreDiv">
                            <img alt='' className="OnTablet_ResultImg" src={require(`../Images/${ImgArr[props.idx]}.png`)}></img>
                            <p className="OnTablet_Resulttext1">점수</p>
                            <p className="OnTablet_Resulttext2">{score * 10}</p>
                            <div className="OnTablet_Cutline"></div>
                            <div className="OnTablet_Cutline"></div>
                    </div>
                    <button className="G_Result_Btn G_Result_Btn1" onClick={e => {
                        // setScore(0);
                        ZeroScore();
                        setCount(1);
                        setAnswer('');
                        setGameDP('');
                        setResultDP('none');
                        handleOpen();
                        RightAnswer = [];
                        WrongAnswer = [];
                        RightAnswerList = [];
                        WrongAnswerList = [];
                        history.push("/checkscore");
                    }}>성적 확인하기</button>
                    <button className="G_Result_Btn" onClick={e => {
                        ZeroScore();
                        setCount(1);
                        setAnswer('');
                        setGameDP('');
                        setResultDP('none');
                        RightAnswer = [];
                        WrongAnswer = [];
                        RightAnswerList = [];
                        WrongAnswerList = [];
                        history.push("/")
                    }}>
                        홈으로 가기
                    </button>
                </div>
                
            </div>
        </div>
    )
}

export default Game;