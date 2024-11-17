import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Tab,
  Tabs,
  AppBar,
  Toolbar,
  Switch,
  useMediaQuery,
  Card,
  CardContent,
} from "@mui/material";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import api from "./api";
import ContactTable from "./components/ContactsTable";
import ContactForm from "./components/ContactForm";
import EditContactModal from "./components/EditContactModal";
import ViewContactModal from "./components/viewContactModel";
import { saveAs } from "file-saver";
import SearchIcon from "@mui/icons-material/Search";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [currentTab, setCurrentTab] = useState(0); // To track which tab is selected
  const isMobile = useMediaQuery("(max-width:600px)");

  // Light/Dark mode theme
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#1976d2", // Customize as needed
      },
      secondary: {
        main: "#ff4081", // Customize as needed
      },
    },
    typography: {
      fontFamily: "'Roboto', sans-serif", // A clean font for the app
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 500,
      },
      h6: {
        fontWeight: 500,
      },
      body1: {
        fontWeight: 400,
      },
    },
  });

  const fetchContacts = async () => {
    try {
      const response = await api.get("/contacts");
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const addContact = async (contact) => {
    const duplicate = contacts.find(
      (existingContact) =>
        existingContact.email === contact.email ||
        existingContact.phoneNumber === contact.phoneNumber
    );

    if (duplicate) {
      alert("A contact with the same email or phone number already exists.");
      return false;
    }

    try {
      const response = await api.post("/contacts", contact);
      setContacts([...contacts, response.data]);
      alert("Contact added successfully!");
      return true;
    } catch (error) {
      console.error("Error adding contact:", error.message);
      return false;
    }
  };

  const deleteContact = async (id) => {
    try {
      await api.delete(`/contacts/${id}`);
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error.message);
    }
  };

  const updateContact = async (updatedContact) => {
    try {
      const response = await api.put(`/contacts/${updatedContact._id}`, updatedContact);
      setContacts(
        contacts.map((contact) =>
          contact._id === updatedContact._id ? response.data : contact
        )
      );
      setSelectedContact(null);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating contact:", error.message);
    }
  };

  const openEditModal = (contact) => {
    setSelectedContact(contact);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedContact(null);
    setIsEditModalOpen(false);
  };

  const openViewModal = (contact) => {
    setSelectedContact(contact);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setSelectedContact(null);
    setIsViewModalOpen(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" sx={{ boxShadow: "none" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", padding: "0 2rem" }}>
          <Typography variant="h4" sx={{ fontFamily: "Roboto Slab", fontWeight: 500 ,textAlign : "center",padding : "10px 0px 0px 20px"}}>
            Contact Management System
          </Typography>
        </Toolbar>
        <Tabs
  value={currentTab}
  onChange={handleTabChange}
  centered
  sx={{
    borderBottom: "4px solid",
    borderColor: "divider",
    backgroundColor: theme.palette.background.default, // Add a subtle background to the tabs
  }}
>
  <Tab
    label="Add Contact"
    sx={{
      fontWeight: 600, // Bold text for a stronger header
      fontSize: "16px", // Set font size for uniformity
      textTransform: "none", // Remove default uppercase transformation for labels
      padding: "12px 16px", // Increase padding for better click areas
      "&.Mui-selected": {
        color: theme.palette.primary.main, // Highlight active tab with primary color
        fontWeight: 700, // Make active tab label bold
        borderBottom: "4px solid", // Add an underline to the active tab
        borderColor: theme.palette.primary.main, // Set underline color to match primary color
      },
      "&:hover": {
        backgroundColor: theme.palette.action.hover, // Add a hover effect on tabs
      },
    }}
  />
  <Tab
    label="View Contacts"
    sx={{
      fontWeight: 600,
      fontSize: "16px",
      textTransform: "none",
      padding: "12px 16px",
      "&.Mui-selected": {
        color: theme.palette.primary.main,
        fontWeight: 700,
        borderBottom: "4px solid",
        borderColor: theme.palette.primary.main,
      },
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    }}
  />
  <Tab
    label="Settings"
    sx={{
      fontWeight: 600,
      fontSize: "16px",
      textTransform: "none",
      padding: "12px 16px",
      "&.Mui-selected": {
        color: theme.palette.primary.main,
        fontWeight: 700,
        borderBottom: "4px solid",
        borderColor: theme.palette.primary.main,
      },
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    }}
  />
</Tabs>
      </AppBar>

      <Container>
        <Box sx={{ marginTop: 1 }}>
          
          {currentTab === 0 && (
            <Card sx={{ marginBottom: 2, padding: 2 }}>
              <CardContent>
                
                <ContactForm onSubmit={addContact} />
              </CardContent>
            </Card>
          )}

          {currentTab === 1 && (
            <>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  label="Search Contacts"
                  variant="outlined"
                  fullWidth
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <ContactTable
                contacts={contacts}
                onEdit={openEditModal}
                onDelete={deleteContact}
                onView={openViewModal}
                searchQuery={searchQuery}
              />
            </>
          )}

          {currentTab === 2 && (
            <Card sx={{ marginBottom: 2, padding: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>Settings</Typography>
                <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                  <Typography variant="body1" sx={{ marginRight: 1 }}>
                    Dark Mode
                  </Typography>
                  <Switch checked={darkMode} onChange={toggleDarkMode} />
                </Box>
              
              </CardContent>
            </Card>
          )}
        </Box>

        <EditContactModal
          open={isEditModalOpen}
          contact={selectedContact}
          onClose={closeEditModal}
          onSave={updateContact}
        />
        <ViewContactModal
          open={isViewModalOpen}
          contact={selectedContact}
          onClose={closeViewModal}
        />
      </Container>
    </ThemeProvider>
  );
};

export default App;
