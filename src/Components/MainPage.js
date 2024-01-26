import React from "react";
import "../CSSs/MainPage.css";
import Navibar2 from "../Utils/Navibar2";
import { connect } from "react-redux";
import { actionCreators } from "../store";

let currentIdx = 0;

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerInput: "",
      registerDP: "",
      choiceDP: "none",
      CurrentImgIndex: 0,
    };
  }

  render() {
    const { updateState } = this.props;

    let ImgArr = ["monkey", "mice", "tiger", "rabbit"];
    const CheckID = () => {
      // ID를 입력했다면 -> Display변경을 통해 Homepage로 전환
      if (this.state.registerInput !== "") {
        this.setState({
          registerDP: "none",
          choiceDP: "grid",
        });
        localStorage.setItem("Nickname", this.state.registerInput);

        // 이미지 이름과 UserName을 모든 컴포넌트에서 사용하기 편하게 Store에 저장
        updateState(this.state.CurrentImgIndex, this.state.registerInput);
      } else {
        alert("사용하실 닉네임을 설정해주세요!");
      }
    };

    return (
      <div>
        <div className="register" style={{ display: this.state.registerDP }}>
          <div className="Main_ImgBox">
            <div className="forVertical">
              <img
                alt=""
                className="changeImg changeImgLeft"
                onClick={() => {
                  if (currentIdx === 0) {
                    this.setState({ CurrentImgIndex: 3 });
                    currentIdx = 3;
                  } else {
                    this.setState({
                      CurrentImgIndex: this.state.CurrentImgIndex - 1,
                    });
                    currentIdx -= 1;
                  }
                }}
                src={require("../Images/leftArrow.png")}
              />
            </div>
            <img
              alt=""
              className="Mainpage_img"
              src={require(`../Images/${
                ImgArr[this.state.CurrentImgIndex]
              }.png`)}
            />
            <div className="forVertical">
              <img
                alt=""
                className="changeImg changeImgRight"
                onClick={() => {
                  if (currentIdx === 3) {
                    this.setState({ CurrentImgIndex: 0 });
                    currentIdx = 0;
                  } else {
                    this.setState({
                      CurrentImgIndex: this.state.CurrentImgIndex + 1,
                    });
                    currentIdx += 1;
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
            value={this.state.registerInput}
            placeholder="이름을 입력해주세요."
            onChange={(e) => {
              this.setState({ registerInput: e.target.value });
            }}
          ></input>
          <button className="Main_registerBtn" onClick={CheckID}>
            등록하기
          </button>
        </div>

        <div className="choice" style={{ display: this.state.choiceDP }}>
          <Navibar2 name={this.state.registerInput} imgidx={currentIdx} />
        </div>
      </div>
    );
  }
}
/* Redux를 사용하는 컴포넌트에서의 역할

    1. mapStateToProps(state, ownProps) 를 만든다 (이는 Props로 state를 가져오겠다는 것)
    2. mapDispatchToProps(dispatch) 를 만든다 (이는 이 컴포넌트에서 state를 변경할 수 있게 해준다, 여기선 등록하는 일만 할 것이므로 addToDo만 return 된 것이다.);
    3. 컴포넌트와 앞서 만든 함수들을 connect해준다. connect는 컴포넌트에서 store에 접근할 수 있게 연결을 해주는 것이다.
*/

// Redux state로부터 home에 prop으로써 전달한다는 뜻.
function mapStateToProps(state, ownProps) {
  return { UserPlusImageName: state }; //toDos에 state를 가져온다.
}

// reducer에 action을 알리는 함수
function mapDispatchToProps(dispatch) {
  return {
    updateState: (II, UN) => dispatch(actionCreators.updateState(II, UN)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
