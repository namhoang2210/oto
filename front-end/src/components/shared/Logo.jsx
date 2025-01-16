import React, { Component } from "react";

class Logo extends Component {
  render() {
    return (
      <div className="flex justify-center items-center cursor-pointer text-[#081f4d]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-7 -rotate-45 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>

        <h2 className="text-2xl font-bold">OtoBuy</h2>
      </div>
    );
  }
}

export default Logo;
