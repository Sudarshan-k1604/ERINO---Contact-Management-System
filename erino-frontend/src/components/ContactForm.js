import React, { useState } from "react";
import { TextField, Button, Box, Typography, Snackbar, Alert, useTheme } from "@mui/material";

const ContactForm = ({ onSubmit, backendError }) => {
  const theme = useTheme();
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    jobTitle: "",
    company: "",
  });

  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!contact.firstName.trim()) tempErrors.firstName = "First name is required.";
    if (!contact.lastName.trim()) tempErrors.lastName = "Last name is required.";
    if (!contact.email.trim() || !/\S+@\S+\.\S+/.test(contact.email))
      tempErrors.email = "Valid email is required.";
    if (!contact.phoneNumber.trim() || !/^\d{10}$/.test(contact.phoneNumber))
      tempErrors.phoneNumber = "Valid phone number (10 digits) is required.";
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true); // Show loading spinner
      const success = await onSubmit(contact);
      setLoading(false); // Hide loading spinner
      if (!success) {
        setSnackbarOpen(true); // Open snackbar if backend returns an error
      } else {
        setContact({ firstName: "", lastName: "", email: "", phoneNumber: "", jobTitle: "", company: "" });
        setErrors({});
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        margin: "0 auto",
        padding: 4,
        borderRadius: 2,
        boxShadow: theme.palette.mode === "dark" ? "0 4px 10px rgba(0,0,0,0.3)" : "0 4px 10px rgba(0,0,0,0.1)",
        backgroundColor: theme.palette.background.paper,
        maxWidth: 600,
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Add Details
      </Typography>
      <Typography variant="body2" color="textSecondary" textAlign={"left"} gutterBottom>
        Fields marked with * are required.
      </Typography>
      <TextField
        label="First Name *"
        name="firstName"
        value={contact.firstName}
        onChange={handleChange}
        error={!!errors.firstName}
        helperText={errors.firstName}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Last Name *"
        name="lastName"
        value={contact.lastName}
        onChange={handleChange}
        error={!!errors.lastName}
        helperText={errors.lastName}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Email *"
        name="email"
        value={contact.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Phone Number *"
        name="phoneNumber"
        value={contact.phoneNumber}
        onChange={handleChange}
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Job Title"
        name="jobTitle"
        value={contact.jobTitle}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Company"
        name="company"
        value={contact.company}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
        {loading ? "Adding..." : "Add Contact"}
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: "100%" }}>
          {backendError || "An error occurred. Please try again."}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactForm;
