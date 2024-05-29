function RestartButton({dispatch}) {
    return (
        <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "Restart" })}
      >
        Restart
      </button>
    )
}

export default RestartButton
