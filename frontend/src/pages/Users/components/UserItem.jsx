import React from "react";
import { Link } from "react-router-dom";

// import { Avatar, Card } from "../../../components";

import "./UserItem.css";
import { Dropdown, Card } from "flowbite-react";

const UserItem = (props) => {
  return (
    <Card className="m-4" style={{ width: "300px" }}>
      <Link to={`/${props.id}/places`}>
        <div className="flex flex-row items-center justify-around">
          <img
            alt={props.name}
            height="96"
            src={`${import.meta.env.VITE_FILES_URL}/${props.image}`}
            width="96"
            className="mb-3 rounded-full shadow-lg"
          />
          <div>
            {" "}
            <h2 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {props.name}
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
            </span>
          </div>
        </div>
      </Link>
    </Card>
    // <li className="user-item">
    //   <Card className="user-item__content">
    //     <Link to={`/${props.id}/places`}>
    //       <div className="user-item__image">
    //         <Avatar
    //           image={`${import.meta.env.VITE_FILES_URL}/${props.image}`}
    //           alt={props.name}
    //         />
    //       </div>
    //       <div className="user-item__info">
    //         <h2>{props.name}</h2>
    //         <h3>
    //           {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
    //         </h3>
    //       </div>
    //     </Link>
    //   </Card>
    // </li>
  );
};

export default UserItem;
