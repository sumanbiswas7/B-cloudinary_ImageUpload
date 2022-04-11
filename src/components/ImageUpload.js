import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export function ImageUpload() {
  const [imageUrl, setImageUrl] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [crop, setCrop] = useState();

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1000,
        1000,
        "JPEG",
        80,
        0.8,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });
  function onFileChange(event) {
    setImageUrl(event.target.files[0]);
    const resizeImage = async (event) => {
      try {
        const file = event.target.files[0];
        const image = await resizeFile(file);
        setPreviewUrl(image);
        setImageUrl(image);
      } catch (err) {
        console.log(err);
      }
    };
    resizeImage(event);
  }
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", imageUrl);
    data.append("upload_preset", "nhpvtkem");
    data.append("cloud_name", "dg4rjg58p");
    fetch("  https://api.cloudinary.com/v1_1/dg4rjg58p/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        console.log(data.url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {/* {previewUrl && <img src={previewUrl} style={{ width: 700 }} />} */}
      <ReactCrop
        crop={imageUrl}
        onChange={(c) => {
          setImageUrl(c);
        }}
        onComplete={(c) => {
          console.log(c);
          setImageUrl(c);
        }}
      >
        <img src={previewUrl} />
      </ReactCrop>
      <input
        type="file"
        accept="image/png, image/jpg, image/jpeg"
        onChange={onFileChange}
      />
      <button onClick={uploadImage}>Upload</button>
    </>
  );
}

//  DOCUMENTATION
// Resizer.imageFileResizer(
//   file, // Is the file of the image which will resized.
//   maxWidth, // Is the maxWidth of the resized new image.
//   maxHeight, // Is the maxHeight of the resized new image.
//   compressFormat, // Is the compressFormat of the resized new image.
//   quality, // Is the quality of the resized new image.
//   rotation, // Is the degree of clockwise rotation to apply to uploaded image.
//   responseUriFunc, // Is the callBack function of the resized new image URI.
//   outputType, // Is the output type of the resized new image.
//   minWidth, // Is the minWidth of the resized new image.
//   minHeight // Is the minHeight of the resized new image.
// );
