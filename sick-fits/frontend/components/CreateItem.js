import React, { useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

const CreateItem = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [largeImage, setLargeImage] = useState("");

  const uploadFile = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "sickfits"); // for cloundinary

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dsuu1l1xq/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    console.log(file);
    setImage(file.secure_url);
    setLargeImage(file.eager[0].secure_url);
  };

  return (
    <Mutation
      mutation={CREATE_ITEM_MUTATION}
      variables={{ title, description, price, image, largeImage }}
    >
      {(createItem, { loading, error, called, data }) => (
        <Form
          onSubmit={async (e) => {
            //stop the form from submitting
            e.preventDefault();
            //call the mutation
            const res = await createItem();
            //go to the single item page
            Router.push({
              pathname: "/item",
              query: { id: res.data.createItem.id },
            });
          }}
        >
          <Error error={error}></Error>
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="file">Image</label>
            <input
              type="file"
              id="file"
              name="file"
              placeholder="Upload an Image"
              required
              onChange={(e) => uploadFile(e)}
            />
            {image && <img src={image} width="200" alt="Upload Preview"></img>}
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="0.00"
              required
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
            <label htmlFor="description">Price</label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Enter a Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </fieldset>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Mutation>
  );
};

export default CreateItem;
export { CREATE_ITEM_MUTATION };
