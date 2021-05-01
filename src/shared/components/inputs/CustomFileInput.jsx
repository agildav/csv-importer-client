import React from "react";

function CustomFileInput(props) {
  const { id, name, onChange, display, accept, disabled } = props;
  const defaultMissingHandler = undefined;
  const defaultDisplay = display ? display : "inline";

  return (
    <>
      <label htmlFor={id}>{props.children}</label>
      {accept ? (
        <input
          style={{
            display: defaultDisplay
          }}
          name={name}
          id={id}
          type="file"
          accept={accept}
          onChange={onChange || defaultMissingHandler}
          disabled={disabled || false}
        />
      ) : (
        <input
          style={{
            display: defaultDisplay
          }}
          name={name}
          id={id}
          type="file"
          onChange={onChange || defaultMissingHandler}
          disabled={disabled || false}
        />
      )}
    </>
  );
}

export default CustomFileInput;
