import React from "react";
import CustomFade from "../../shared/components/animations/CustomFade";

const MissingPage = props => {
  const texts = {
    notFound: "No existe el recurso",
    goBack: "Volver"
  };

  return (
    <CustomFade in={true}>
      <div
        id="missing-page"
        style={{
          marginTop: "4rem",
          textAlign: "center"
        }}
      >
        <div
          style={{
            margin: "auto",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap"
          }}
        >
          <span
            style={{
              fontSize: "1.2rem"
            }}
          >
            {texts.notFound} <code>{props.location.pathname}</code>
          </span>
        </div>
        <div
          style={{
            cursor: "pointer",
            marginTop: "2rem",
            textDecoration: "underline"
          }}
          onClick={() => props.history.push("/")}
        >
          <h2>{texts.goBack}</h2>
        </div>
      </div>
    </CustomFade>
  );
};

export default MissingPage;
