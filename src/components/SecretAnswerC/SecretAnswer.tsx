import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SECRET_ANSWER } from "../../constants/Constants";
import { TErrorMessage } from "../../types/TErrorMessage";
import { Error } from "../ErrorC/Error";

interface stateType {
  pathname: string;
  state: {
    from: string;
  };
}

//enum type for 3 possible error messages
enum ERROR_MESSAGE {
  NOT_EMPTY = "Secret answer cannot be empty",
  TOO_SHORT = "Secret answer is too short",
  WRONG_ANSWER = "Wrong secret answer",
}

function SecretAnswer(props: { hello: string }) {
  const [inputAnswer, setInputAnswer] = useState("");
  const navigate = useNavigate();
  const location = useLocation() as stateType;

  const [errorMessage, setErrorMessage] = useState<TErrorMessage | null>(null);
  const renderError = errorMessage && <Error message={errorMessage} />;

  useEffect(() => {
    console.log(`${props.hello} Secret Answer Component`);

    if (inputAnswer.toLowerCase() === SECRET_ANSWER) {
      localStorage.setItem("secretAnswer", "banana");
    }
  }, [inputAnswer, props.hello]);

  /**
   * Submit function
   * error checking
   * if no errors found, push answer to localStorage and log user in Single post page
   */
  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!inputAnswer) {
      setErrorMessage(ERROR_MESSAGE.NOT_EMPTY);
      return;
    }
    if (inputAnswer.length < 5) {
      setErrorMessage(ERROR_MESSAGE.TOO_SHORT);
      return;
    }
    if (inputAnswer.toLowerCase() === SECRET_ANSWER) {
      navigate(location.state.from);
      return;
    } else {
      setErrorMessage(ERROR_MESSAGE.WRONG_ANSWER);
    }
  };

  return (
    <div id="secretAnswerBody">
      <h1 className="blueText">SecretAnswer</h1>
      <p>If you want to continue please provide us with the secret answer.</p>
      <p>Do you know our secret answer?</p>
      <label>Secret Answer</label>
      <form onSubmit={onSubmit}>
        <div>
          <input
            className={`formInput ${errorMessage !== null ? "hasError" : ""}`}
            id="secretForm"
            type="password"
            value={inputAnswer}
            onChange={(e) => {
              setInputAnswer(e.target.value);
            }}
          />
        </div>
        {renderError}
        <button className="btn-lg btn-outline-dark" disabled={!inputAnswer}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default SecretAnswer;
