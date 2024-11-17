import React from "react";
import { Modal, Box, Typography } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const ViewContactModal = ({ open, contact, onClose }) => {
  const excludeFields = ["_id", "__v"]; // Fields to exclude from the display

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={2}>
          Contact Details
        </Typography>
        {contact ? (
          <>
            {Object.entries(contact)
              .filter(([key]) => !excludeFields.includes(key)) // Filter out undesired fields
              .map(([key, value]) => (
                <Typography key={key} mb={1}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                </Typography>
              ))}
          </>
        ) : (
          <Typography>No contact selected.</Typography>
        )}
      </Box>
    </Modal>
  );
};

export default ViewContactModal;
