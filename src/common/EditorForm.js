import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const EditoForm = ({ onChange, value, initialValue }) => {
  const handleEditorChange = (content, editor) => onChange(content);

  function postImage(blobInfo, success, failure, progress) {
    const baseUrl =
      "http://ec2-35-180-42-115.eu-west-3.compute.amazonaws.com:8081";
    const imageUrl = "/public/images/";

    var xhr, formData;

    xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open("POST", baseUrl + imageUrl, true);

    xhr.upload.onprogress = function (e) {
      progress((e.loaded / e.total) * 100);
    };

    xhr.onload = function () {
      var json;

      if (xhr.status === 403) {
        failure("HTTP Error: " + xhr.status, { remove: true });
        return;
      }

      if (xhr.status < 200 || xhr.status >= 300) {
        failure("HTTP Error: " + xhr.status);
        return;
      }

      json = xhr.responseText;

      if (!json || typeof json != "string") {
        failure("Invalid JSON: " + xhr.responseText);
        return;
      }

      success(baseUrl + json);
    };

    xhr.onerror = function () {
      failure(
        "Image upload failed due to a XHR Transport error. Code: " + xhr.status
      );
    };

    formData = new FormData();
    formData.append("file", blobInfo.blob(), blobInfo.filename());
    xhr.send(formData);
  }
  return (
    <Editor
      value={value}
      initialValue="<p>This is the initial content of the editor</p>"
      init={{
        height: 500,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
          "image",
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | image| help ",
        image_uploadtab: true,
        image_title: false,
        images_upload_handler: postImage,
        init_instance_callback: function (editor) {
          var freeTiny = document.querySelector(".tox .tox-notification--in");
          freeTiny.style.display = "none";
        },
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default EditoForm;
