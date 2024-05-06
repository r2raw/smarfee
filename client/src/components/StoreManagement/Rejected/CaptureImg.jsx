import React, { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import CameraAltSharpIcon from "@mui/icons-material/CameraAltSharp";
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};
function CaptureImg(props) {
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
    <div className="photo-capture" style={styleParent}>
      <div>
        <Webcam
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          ref={webcamRef}
        />
        <button className="solid tertiary fade" style={{width: '100%'}} onClick={handleCapture}>
          Capture <CameraAltSharpIcon />
        </button>
      </div>
    </div>
  );
}

export default CaptureImg;


const styleParent = {
    position: "fixed",
    top: '0',
    left: '0',
    width: '100%',
    height: '100dvh',
    backgroundColor: '#ffffff80',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '100'
}