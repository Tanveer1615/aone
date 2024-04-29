import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cards = ({ item, kg }) => {
  // console.log(item)
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };
  return (
    <div
      to={`/menu/`}
      className=" bg-primaryBG shadow-xl relative h-72  mx-3 rounded-md w-60 mc"
      style={{ minWidth: "15rem" }}
    >
      <div
        className={`rating  absolute right-0 top-0  p-2 heartStar bg-green ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-5 h-5 cursor-pointer" />
      </div>
      <Link to={`/menu/`}>
        <figure className="flex justify-center">
          <img
            src={item.image}
            alt="Shoes"
            className=" h-36  rounded-md  mt-6"
          />
        </figure>
      </Link>
      <div className="mt-9">
        <Link to={`/menu/`}>
          <p className=" font-semibold text-center p-0 ">{item.title}</p>
        </Link>
      </div>

      <div className="mt-3">
        <Link to={`/menu/`}>
          <div className="text-md font-semibold  flex justify-between  ">
            <div className="flex items-center self-center ml-3 pt-1 ">
              Rs. {item.price} {kg}
            </div>
            <div className="text-red text-3xl mr-3">+</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Cards;
