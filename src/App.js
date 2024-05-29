import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./comp/NextButton";
import Progress from "./comp/Progress";
import FinishScreen from "./comp/FinishScreen";
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore:0
};

function reducer(state, action) {
  switch (action.type) {
    case "dataResived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "new answer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextquestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
      case "finished":
        return {
          ...state,
          status:"finished",
          highscore: state.points > state.highscore ? state.points : state.highscore
        };
        case "Restart":
          return {
            ...initialState,
            questions:state.questions,
            status:"ready",
        
          };
    default:
      throw new Error("unkown");
  }
}

function App() {
  const [{ questions, status, index, answer , points , highscore}, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;

  const maxPoints=questions.reduce((prev,curr)=> prev + curr.points ,0);
  console.log(maxPoints)
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataResived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
          <Progress index={index} numQuestions={numQuestions} points={points}   maxPoints={maxPoints} answer={answer}/>
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            
            />
            <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions } />
          </>
        )}
        {status==="finished" && <FinishScreen points={points} maxPoints={maxPoints} highscore={highscore}   dispatch={dispatch}/>}
      </Main>
    </div>
  );
}

export default App;
