import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Button,
  Box,
  TablePagination,
  CircularProgress,
  Checkbox,
} from "@mui/material";
import { motion } from "framer-motion";
import { saveAs } from "file-saver"; // Import saveAs from file-saver
import Papa from "papaparse"; // For CSV export

const ContactTable = ({ contacts, onEdit, onDelete, onView, searchQuery }) => {
  const [selectedContacts, setSelectedContacts] = useState(new Set());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  // Filtered contacts based on the search query
  const filteredContacts = contacts.filter((contact) =>
    contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phoneNumber.includes(searchQuery.toLowerCase()) ||
    (contact.company && contact.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (contact.jobTitle && contact.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Handle "Select All" checkbox
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedContacts(new Set(filteredContacts.map(contact => contact._id)));
    } else {
      setSelectedContacts(new Set());
    }
  };

  // Handle individual contact selection
  const handleSelectContact = (event, contactId) => {
    const newSelectedContacts = new Set(selectedContacts);
    if (event.target.checked) {
      newSelectedContacts.add(contactId);
    } else {
      newSelectedContacts.delete(contactId);
    }
    setSelectedContacts(newSelectedContacts);
  };

  // Handle bulk delete
  const handleDeleteBulk = () => {
    selectedContacts.forEach((contactId) => onDelete(contactId));
    setSelectedContacts(new Set()); // Reset selected contacts
  };

  // Handle export of selected contacts
  const handleExportSelected = (format) => {
    const selectedData = contacts.filter(contact => selectedContacts.has(contact._id));

    if (format === "json") {
      const blob = new Blob([JSON.stringify(selectedData, null, 2)], { type: "application/json" });
      saveAs(blob, "selected_contacts.json");
    } else if (format === "csv") {
      const csv = Papa.unparse(selectedData);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "selected_contacts.csv");
    }

    // Reset selected contacts and uncheck "Select All" checkbox after export
    setSelectedContacts(new Set());
  };

  // Paginate filtered contacts
  const paginatedContacts = filteredContacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Search and Filter Box */}
          {/* Bulk Actions */}
          <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteBulk}
              disabled={selectedContacts.size === 0}
            >
              Bulk Delete
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleExportSelected("csv")}
              disabled={selectedContacts.size === 0}
            >
              Export Selected (CSV)
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleExportSelected("json")}
              disabled={selectedContacts.size === 0}
            >
              Export Selected (JSON)
            </Button>
          </Box>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    onChange={handleSelectAll}
                    checked={filteredContacts.length > 0 && selectedContacts.size === filteredContacts.length}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedContacts.map((contact) => (
                <TableRow key={contact._id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedContacts.has(contact._id)}
                      onChange={(event) => handleSelectContact(event, contact._id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Avatar sx={{ bgcolor: "#0b5096a5" }}>
                      {contact.firstName[0]}{contact.lastName[0]}
                    </Avatar>
                    {contact.firstName} {contact.lastName}
                  </TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phoneNumber}</TableCell>
                  <TableCell>
                    <Button onClick={() => onEdit(contact)}>Edit</Button>
                    <Button onClick={() => onDelete(contact._id)}>Delete</Button>
                    <Button onClick={() => onView(contact)}>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredContacts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
          />
        </>
      )}
    </motion.div>
  );
};

export default ContactTable;
