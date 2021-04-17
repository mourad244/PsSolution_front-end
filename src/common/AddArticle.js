import React, { useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import EditoForm from "../Editor/EditorForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { postArticle } from "../api/articles";
import { useHistory } from "react-router-dom";
import Article from "./Article";
const AddArticle = () => {
  let history = useHistory();
  const { register, handleSubmit, errors, setValue, control } = useForm();
  const onSubmit = async (values) => {
    console.log(values);
    let formData = new FormData();
    formData.append("image", values.image[0]);
    formData.append("title", values.title);
    formData.append("author", values.author);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("content", values.content);

    const result = await postArticle(formData);

    if (!result.ok) {
      console.log(result);

      return;
    }
    history.push("/articles");
  };
  useEffect(() => {
    setValue("content", "<h1>Hi this is a h1</h1>");
  }, []);
  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>ADD NEW ARTICLE</h2>
      <div className="form-article-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col xs={12} md={6}>
              <Form.Control
                type="text"
                ref={register({ required: true })}
                name="author"
                placeholder="Author"
                className="input-form-article"
              />
              <Form.Control
                type="text"
                className="input-form-article"
                ref={register({ required: true })}
                name="title"
                placeholder="Title"
              />
              <Form.Control
                type="text"
                className="input-form-article"
                ref={register({ required: true })}
                name="description"
                placeholder="Description"
              />

              <Form.Control
                type="file"
                className="input-form-article input-form-file-article"
                ref={register({ required: true })}
                name="image"
                placeholder="Image"
              />
              <Form.Control
                type="text"
                className="input-form-article"
                ref={register({ required: true })}
                name="category"
                placeholder="Category"
              />
            </Col>
            <Col xs={12} md={6}>
              <Controller
                name="content"
                control={control}
                defaultValue=""
                render={({ onChange, value }) => (
                  <EditoForm onChange={onChange} value={value} />
                )}
              />
            </Col>
          </Row>
          <Button
            variant="success"
            type="submit"
            size="lg"
            style={{ marginTop: "20px" }}
          >
            <FontAwesomeIcon icon={faFileUpload} />
            <span> </span> Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;
