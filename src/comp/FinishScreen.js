import RestartButton from "./RestartButton";
 
function FinishScreen({ points, maxPoints, highscore , dispatch}) {
  const pres = (points / maxPoints) * 100;
  let emoji;
  if (pres === 100) emoji = "🥇";

  if (pres >= 80 && pres < 100) emoji = "🥈";
  if (pres >= 50 && pres < 80) emoji = "🥉";
  if (pres >= 0 && pres < 50) emoji = "🏅";
  if (pres === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> your score <strong>{points}</strong> out of{" "}
        {maxPoints} ({Math.ceil(pres)}%)
      </p>
      <p className="highscore">(Highscore is {highscore} Points) </p>
      <RestartButton   dispatch={dispatch}/>
    </>
  );
}

export default FinishScreen;
