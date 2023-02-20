// TODO
// calculator works fine
// add styling and another theme with switcher

import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import { divideFn, minusFn, multiplyFn, plusFn } from "./helper/helperFn";
import helperObj from "./helper/helperObj";

function App() {
  const [currNumberState, setCurrNumberState] = useState("");
  const [prevNumberState, setPrevNumberState] = useState("");
  const [actionState, setActionState] = useState(null);
  const [themeState, setThemeState] = useState(1);

  const getValueHandler = (value, type) => {
    // delete one digit from the last
    // convert currentNumberState to string then substring from 0 to length - 1
    // thought DEL is action button it gets priority and edits currNumberState

    if (value === "DEL") {
      const editedValue = currNumberState
        .toString()
        .substring(0, currNumberState.toString().length - 1);
      setCurrNumberState(+editedValue);
      return;
    }

    // if any of the action buttons pressed: +, -, x, /, RESET

    if (type === "action") {
      // if there is no previous state:
      // // set prevNumberState -> currNumberState and setCurrNumberState -> ''

      if (!prevNumberState) {
        setPrevNumberState(+currNumberState);
        setCurrNumberState("");
      }

      //check and action for signs:
      // // set clicked value to setActionState

      if (value === "+") {
        setActionState("+");
      }
      if (value === "-") {
        setActionState("-");
      }
      if (value === "x") {
        setActionState("x");
      }
      if (value === "/") {
        setActionState("/");
      }

      // reset action button
      // // reset prevNumberState, currNumberState, actionState

      if (value === "RESET") {
        setPrevNumberState("");
        setCurrNumberState("");
        setActionState(null);
      }

      // if = button pressed
      // // check:
      // // // both currNumberState or prevNumberState has to be number

      // // call funcitons and store returned value to finalValue

      // // setPrevNumberState -> finalValue
      // // reset both currNumberState and actionState

      if (value === "=") {
        if (isNaN(+currNumberState) || isNaN(+prevNumberState)) return;

        let finalValue;
        switch (actionState) {
          case "+":
            finalValue = plusFn(+prevNumberState, +currNumberState);
            break;
          case "-":
            finalValue = minusFn(+prevNumberState, +currNumberState);
            break;
          case "x":
            finalValue = multiplyFn(+prevNumberState, +currNumberState);
            break;
          case "/":
            finalValue = divideFn(+prevNumberState, +currNumberState);
            break;

          default:
            break;
        }
        setPrevNumberState(finalValue);
        setCurrNumberState("");
        setActionState(null);
      }
    }

    // type: number pressed

    if (type === "number") {
      // if type:number pressed before type:action
      // // reset prevNumberState

      if (!actionState) {
        setPrevNumberState("");
      }

      // if value:'.' type:'number' pressed
      // // currNumberState -> string + '.'
      // else
      // // currNumberState -> convert input number to string => concat and convert back

      if (value === ".") {
        setCurrNumberState(currNumberState.toString() + ".");
      } else {
        setCurrNumberState(currNumberState + value.toString());
      }
    }
  };

  const themeHandler = (themeNo) => {
    setThemeState(themeNo);
  };

  // theme btn
  const themeBtnClass = themeState === 1 ? "theme_btn" : "theme_btn";

  return (
    <div className={themeState === 1 ? "App dark" : "App light"}>
      <div id="page" className="page">
        <div id="toggle" className="toggle">
          <div id="theme" className="theme">
            THEME
          </div>
          <div id="theme_buttons" className="theme_buttons">
            <button
              className={themeBtnClass + " theme_one"}
              onClick={themeHandler.bind(this, 1)}
            >
              1
            </button>
            <button
              className={themeBtnClass + " theme_two"}
              onClick={themeHandler.bind(this, 2)}
            >
              2
            </button>
          </div>
        </div>
        <div id="screen" className="screen">
          <div id="screen_container" className="screen_container">
            <div id="prev" className="prev">
              {!prevNumberState ? 0 : prevNumberState}
            </div>
            <div id="curr" className="curr">
              {!currNumberState ? 0 : currNumberState}
            </div>
            <div id="action" className="action">
              {actionState}
            </div>
          </div>
        </div>
        <div id="buttons_container" className="buttons_container">
          <div id="buttons" className="buttons">
            {helperObj.map((item) => (
              <Button
                key={item.id}
                name={item.name}
                value={item.value}
                type={item.type}
                getValue={getValueHandler}
              />
            ))}
          </div>
        </div>

        <div id="credit" className="credit">
          made by PRITOM
        </div>
      </div>
    </div>
  );
}

export default App;
