import { useState } from "react";
import "./App.css";
import { MdCloudUpload } from "react-icons/md";

function App() {
  const [img, setImg] = useState("");

  // convert image to base64:
  const imageBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    const data = new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

    return data;
  };

  // file upload
  const handleFileUploadChange = async (e) => {
    const file = e.target.files[0];
    const image = await imageBase64(file);
    setImg(image);
    // console.log("IMAGE", image);
  };

  // on Image Upload to Database:
  const onImageUpload = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/upload", {
      method: "POST",
      body: JSON.stringify({ img }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <>
      <div className="imageContainer">
        <form action="">
          <label htmlFor="uploadImage">
            <div className="uploadBox">
              <input
                type="file"
                id="uploadImage"
                onChange={(e) => handleFileUploadChange(e)}
              />
              {img ? <img src={img} /> : <MdCloudUpload />}
              {/* <MdCloudUpload /> */}
            </div>
          </label>
          <div className="btn-div">
            <button onClick={(e) => onImageUpload(e)}>Upload</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
