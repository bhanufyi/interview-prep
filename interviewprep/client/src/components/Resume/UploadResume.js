import React, { useState } from "react";
import axios from "axios";

const UploadResume = () => {
  const [file, setFile] = useState("");
  const [resumePreview, setResumePreview] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(file);
    formData.append("resume", file);
    const config = {
      withCredentials: true,
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    console.log(formData);

    axios
      .post("/api/profile/uploadResume", formData, config)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const fileChangeHandler = (e) => {
    e.preventDefault();

    console.log(e.target.files);
    setFile(e.target.files[0]);

    let reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
      setResumePreview(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const cancelImageUpload = (e) => {
    setResumePreview("");
    setFile("");
  };
  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <h1>File Upload</h1>
        <div className="form-group">
          <label htmlFor="exampleFormControlFile1">Example file input</label>
          <input
            type="file"
            accept=".pdf"
            class="form-control-file"
            id="exampleFormControlFile1"
            onChange={fileChangeHandler}
          />
        </div>
        <input
          type="submit"
          value="submit"
          className="btn btn-info btn-block mt-4"
        />
      </form>
      <br />
      <br />
      <div>
        <img src={resumePreview} width="100px" height="100px" alt="" />
        <br />
        <br />
        <button onClick={cancelImageUpload}>Cancel</button>
      </div>
    </div>
  );
};

export default UploadResume;
