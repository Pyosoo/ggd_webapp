import { createStore } from "redux";

//2. action 객체를 생성해 놓는다.
const setImgIndex = (ind) => {
  return {
    type: "UPDATE_IMG_INDEX",
    ind,
  };
};
const setUserName = (name) => {
  return {
    type: "SET_USER_NAME",
    name,
  };
};
const setDan = (dan) => {
  return {
    type: "SET_DAN",
    dan,
  };
};

export interface storeState {
  ImageIndex: number;
  UserName: string;
  dan: number;
}

//3. reducer를 생성한다. state와 action을 입력 받고 바뀐 결과 state를 return 한다.
const reducer = (
  state:storeState = {
    ImageIndex: 0,
    UserName: "사용자명",
    dan: 0,
  },
  action
) => {
  switch (action.type) {
    case "UPDATE_IMG_INDEX":
      return {
        ...state,
        ImageIndex: action.payload,
      };
    case "SET_USER_NAME":
      return {
        ...state,
        UserName: action.payload,
      };
    case "SET_DAN":
      return {
        ...state,
        dan: action.payload,
      };
    default:
      return state;
  }
};

//4. store 객체를 생성하는데 reducer를 매개변수로 갖고 시작한다.
const store = createStore(reducer);

//5. 내가 만든 action들을 다른 컴포넌트에서 쓸수 있도록 묶어서 export해준다.
export const actionCreators = {
  setImgIndex,
  setUserName,
  setDan,
};

export default store;
