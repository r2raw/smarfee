import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Link, useParams } from "react-router-dom";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
function PdfViewer() {
  const { store, type, url } = useParams();
  const newplugin = defaultLayoutPlugin();
  return (
    <div>
      <Link to={`../Store-Application/${store}`}>
        <div className="go-back">
          <ArrowBackSharpIcon />
        </div>
      </Link>
      <h1>Store: {store} - {type}</h1>
      <div className="pdf-container">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer
            fileUrl={`http://localhost:5000/storeCredentials/${url}`}
            plugins={[newplugin]}
          />
        </Worker>
      </div>
    </div>
  );
}

export default PdfViewer;
