import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Grid,
  Typography,
} from "@mui/material";

// Modal styling
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

// Define the fields for the form
const contactFields = [
  "firstName",
  "lastName",
  "email",
  "phoneNumber",
  "company",
  "jobTitle"
];

const EditContactModal = ({ open, contact, onClose, onSave }) => {
  const [formData, setFormData] = useState({});

  // Sync formData with contact when modal opens
  useEffect(() => {
    if (contact) {
      setFormData(contact);
    }
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  // Check if required fields are filled
  const isFormValid =
    formData.firstName && formData.lastName && formData.email && formData.phoneNumber;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle} aria-labelledby="edit-contact-modal" role="dialog">
        <Typography variant="h6" mb={2}>
          Edit Contact
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {contactFields.map((field) => (
              <Grid item xs={12} key={field}>
                <TextField
                  name={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  required={["firstName", "lastName", "email", "phoneNumber"].includes(field)}
                  fullWidth
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!isFormValid} // Disable if required fields are not filled
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default EditContactModal;
