import React, { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import CameraAltSharpIcon from "@mui/icons-material/CameraAltSharp";
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};

function PhotoCapture(props) {
  const [captured, setCaptured] = useState("");

  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 480,
      height: 480,
    });

    setCaptured(imageSrc);
  }, []);

  useEffect(() => {
    if (captured) {
      props.handlePhotoCapture(captured);
      props.handleCaptureModal(false);
    }
  }, [captured]);

  const handleCapture = async () => {
    capture();
  };
  return (
    <div className="photo-capture">
      <div>
        <Webcam
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          ref={webcamRef}
        />
        <button className="solid tertiary fade" onClick={handleCapture}>
          Capture <CameraAltSharpIcon />
        </button>
      </div>
    </div>
  );
}

export default PhotoCapture;
