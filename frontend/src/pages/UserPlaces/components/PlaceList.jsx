import React from "react";

import { Card } from "../../../components";
import PlaceItem from "./PlaceItem";
import "./PlaceList.css";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

const PlaceList = ({ items, onDeletePlace }) => {
  if (items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Link to="/places/new">
            <Button className="mx-auto mt-4">Share Place</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {items.map((place) => (
        <PlaceItem key={place.id} place={place} onDelete={onDeletePlace} />
      ))}
    </ul>
  );
};

export default PlaceList;
