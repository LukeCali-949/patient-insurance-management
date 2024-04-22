import React, { useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
  LoadCanvasTemplateNoReload,
} from "react-simple-captcha";

function CaptchaTest({ userCaptcha, setUserCaptcha }) {
  useEffect(() => {
    loadCaptchaEnginge(6, "black", "white");
  }, []);

  const doSubmit = () => {
    if (validateCaptcha(userCaptcha) === true) {
      alert("Captcha Matched");
      loadCaptchaEnginge(6);
      setUserCaptcha("");
    } else {
      alert("Captcha Does Not Match");
      setUserCaptcha("");
    }
  };

  const handleCaptchaInputChange = (e) => {
    setUserCaptcha(e.target.value);
  };

  return (
    <div>
      <div className="">
        <div className="">
          <div className="col mt-3">
            <LoadCanvasTemplateNoReload />
          </div>
          <div className="col mt-3">
            {/* <input
              placeholder="Enter Captcha Value"
              id="user_captcha_input"
              name="user_captcha_input"
              type="text"
              value={userCaptcha}
              onChange={handleCaptchaInputChange}
            /> */}

            <input
              placeholder="Enter Captcha Value"
              id="user_captcha_input"
              name="user_captcha_input"
              type="text"
              value={userCaptcha}
              onChange={handleCaptchaInputChange}
              className="w-full p-4 border rounded-lg bg-gray-50 border-gray-300 focus:ring-[#747264] focus:border-[#747264]"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaptchaTest;
