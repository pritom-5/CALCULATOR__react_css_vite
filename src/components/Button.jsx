import { useState } from "react";

export default function Button({ id, name, value, type, getValue }) {
  const clickHandler = () => {
    getValue(value, type);
  };
  return (
    <button
      id="buttonContainer"
      className={`button ${name}`}
      onClick={clickHandler}
    >
      {value}
    </button>
  );
}
