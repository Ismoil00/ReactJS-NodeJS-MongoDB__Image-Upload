import { useState } from "react";
import "./App.css";
import { MdCloudUpload } from "react-icons/md";

function App() {
  const [img, setImg] = useState("");

  // convert image to base64:
  const imageBase64 = async (file) => {
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
    if (img) {
      const res = await fetch("http://localhost:8080/upload", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ img }),
      });
      const data = await res.json();

      if (data.status_code === 200) {
        setImg("");
      }
    }
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
