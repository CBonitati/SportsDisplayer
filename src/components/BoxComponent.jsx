import React from "react";

class Box extends React.Component {
  render() {
    const { children, color } = this.props;

    const boxStyle = {
        backgroundColor: color,
        borderRadius: "5px",
        boxShadow: "10px 10px 8px #888888"

      };

    return (
      <div className="box-container-item">
        <div className="box" style={boxStyle}>{children}</div>
      </div>
    );
  }
}

export default Box;
