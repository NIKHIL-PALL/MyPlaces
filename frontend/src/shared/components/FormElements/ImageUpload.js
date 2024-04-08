import React, { useEffect, useRef, useState } from "react";
import "./ImageUpload.css";
import Button from "./Button";
const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState();
  const filePickerHandler = useRef();


  const pickImageHandler = () => {
    filePickerHandler.current.click();
  };

  const pickedHandler = (event) => {
    let filePicked;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length == 1) {
      filePicked = event.target.files[0];
      setIsValid(true);
      setFile(filePicked);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, filePicked, fileIsValid);
  };

  useEffect(()=>{
    if(!file) {
      return ;
    }
    const fileReader = new FileReader();
    fileReader.onload = ()=> {
      setPreviewUrl(fileReader.result);
    }
    fileReader.readAsDataURL(file);
  }, [file]);

  return (
    <div className="form-control">
      <input
        type="file"
        accept=".jpg,.jpeg,.png "
        ref={filePickerHandler}
        style={{ display: "none" }}
        id={props.id}
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
         {previewUrl &&  <img src={previewUrl} alt="Preview" />}
         {!previewUrl && <p>Please select an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && props.errorText}
    </div>
  );
};

export default ImageUpload;
