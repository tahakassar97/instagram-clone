import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

/**
 * npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/react-fontawesome
 */
export const TogglePasswordInput = (props) => {
  let eye;
  if (props.hide) {
    eye = <FontAwesomeIcon icon={faEyeSlash} />;
  } else {
    eye = <FontAwesomeIcon icon={faEye} />;
  }
  return (
    <div className="input-icon">
      <input
        type={props.hide === true ? "password" : "text"}
        placeholder="Password"
        className="input-field"
        value={props.value}
        onChange={props.onChange}
      />
      <i onClick={props.togglePassword}>{eye}</i>
    </div>
  );
};
