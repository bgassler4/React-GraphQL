import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Title from "./styles/Title";
import ItemsStyles from "./styles/ItemStyles";
import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";

Item.propTypes = {
  item: PropTypes.object.isRequired,
};

function Item(props) {
  const { item } = props;

  return (
    <ItemsStyles>
      {item.image && <img src={item.image} alt={item.title}></img>}
      <Title>
        <Link
          href={{
            pathname: "./item",
            query: { id: item.id },
          }}
        >
          <a>{item.title}</a>
        </Link>
      </Title>
      <PriceTag>{formatMoney(item.price)}</PriceTag>
      <p>{item.description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: "update",
            query: { id: item.id },
          }}
        >
          <a>Edit ✏️</a>
        </Link>
        <button>Add To Cart</button>
        <button>Delete</button>
      </div>
    </ItemsStyles>
  );
}

export default Item;
