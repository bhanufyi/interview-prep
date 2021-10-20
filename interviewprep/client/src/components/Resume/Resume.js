import React,{useState} from 'react';
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

export default function Resume() {

      const [numPages, setNumPages] = useState(null);
      const [pageNumber, setPageNumber] = useState(1);

      function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
      }

      const moveLeftPage = (e) => {
        if (pageNumber !== 1) {
          setPageNumber(pageNumber - 1);
        }
      };

      const moveRightPage = (e) => {
        if (pageNumber !== numPages) {
          setPageNumber(pageNumber + 1);
        }
      };

    return (
      <div className="d-flex flex-column align-items-center">
        <Document
          className="shadow-lg mb-3"
          options={{
            cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
            cMapPacked: true,
          }}
          file="/public/pdfs/resume.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>

        <p>
          <span className="mr-2">
            <i className="fas fa-arrow-left" onClick={() => moveLeftPage()} />
          </span>
          Page {pageNumber} of {numPages}
          <span className="ml-2">
            <i className="fas fa-arrow-right" onClick={() => moveRightPage()} />
          </span>
        </p>
        <br />
        {/* <embed
            src="/public/pdfs/annotations.pdf"
            width="500"
            height="646"
          ></embed> */}
      </div>
    );
}
