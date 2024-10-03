import React from "react";

import { Modal } from "../";
import { Button } from "flowbite-react";

export const ErrorModal = ({ error, onClear }) => {
  return (
    <Modal
      show={!!error}
      onCancel={onClear}
      header="An Error Occurred!"
      footer={<Button onClick={onClear}>Okay</Button>}
    >
      <p>{error}</p>
    </Modal>
  );
};
