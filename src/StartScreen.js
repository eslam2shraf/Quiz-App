function StartScreen({numQuestions , dispatch}) {
    return (
        <div className="start">
            <h2> Welcom To React Quiz </h2>
            <h3>{numQuestions} Questions To Test Your React Mastery </h3>
            <button className="btn btn-ui" onClick={()=>dispatch({type:"start"})}>Let's Start</button>
        </div>
    )
}

export default StartScreen
