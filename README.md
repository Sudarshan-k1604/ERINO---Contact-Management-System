

# ERINO - Contact Management System  

*ERINO* is a user-friendly *Contact Management System* that simplifies storing, editing, searching, and deleting contact information. Built using the *MERN stack* (MongoDB, Express, React, Node.js), it features a responsive design, dynamic functionality, and intuitive user experience.  

---

## Table of Contents  

1. [Screenshots](#screenshots)  
2. [Features](#features)  
3. [Unique Code Features](#unique-code-features)  
4. [Technical Decisions](#technical-decisions)  
5. [Project Structure](#project-structure)  
6. [Setup Instructions](#setup-instructions)  
7. [Problems Faced](#problems-faced)  
8. [Drive Link for more photos](#drive-link-for-demo-photos)  

---

## Screenshots  

### Add Contact Page  

<img src="https://github.com/Sudarshan-k1604/ERINO---Contact-Management-System/blob/master/erino1.jpg" />


- A sleek form with fields for *First Name, **Last Name, **Phone Number, **Email, **Company, and **Job Title*.  
- Input fields are adorned with intuitive icons for better user engagement.  
- Includes *Submit* and *Reset* buttons for ease of use.  
- Styled with a calming light blue background and a bold *"Add Contact"* heading.
   

### Contact List Page  


<img src="https://github.com/Sudarshan-k1604/ERINO---Contact-Management-System/blob/master/erino2.jpg?raw=true"/>


- Displays a *searchable, **sortable, and **paginated* table of contacts.  
- Columns include *Name, **Email, **Phone Number, **Company, **Job Title, and **Actions*.  
- Features Edit and Delete icons for efficient contact management.  
- Includes a soft blue theme with clean layouts, ensuring an intuitive user experience.  

---

## Features  

- *Add Contacts*: Enter detailed information like name, email, phone number, company, and job title.  
- *Edit Contacts*: Update and modify stored contact details.  
- *Delete Contacts*: Remove outdated or unnecessary entries.  
- *Search Contacts*: Instantly search by name, email, phone, company, or job title.  
- *Pagination*: Navigate large contact lists seamlessly.  
- *Dark Mode*: Toggle between light and dark themes for better accessibility.  
- *Responsive UI*: Optimized for both desktop and mobile devices.  
- *Professional Design: Leveraging **Material-UI* for a modern, responsive, and consistent UI.  

---

## Unique Code Features  

1. *Duplicate Prevention*:  
   - Ensures no duplicate entries for contacts by validating *email* and *phone number* before saving.  
   - Alerts users if duplicate data is detected during addition.  

2. *Dynamic Tabs*:  
   - The app employs *MUI Tabs* for seamless navigation between features: Add Contact, View Contacts, and Settings.  
   - Tabs are styled with hover effects, active indicators, and bold labels for a polished look.  

3. *Search Optimization*:  
   - The *search feature* dynamically filters through the table in real-time as users type, making data retrieval faster.  

4. *Dark Mode Integration*:  
   - Custom theme toggling using MUI’s *createTheme* API allows for light/dark mode switches.  
   - Preserves user preference for theme mode across sessions.  

5. *Validation Alerts*:  
   - Form fields include both *client-side validations* for formats and *server-side checks* for uniqueness.  

6. *Scalable Backend*:  
   - Built with *RESTful APIs* using Node.js and Express, ensuring modularity and scalability.  
   - Database queries are optimized for MongoDB to handle large datasets efficiently.  

7. *Reusable Components*:  
   - ContactForm, ContactsTable, and Modals are designed as *reusable components*, reducing redundancy and improving code maintainability.  

---

## Technical Decisions  

### Database Choice:  
- *MongoDB* was chosen over PostgreSQL due to its schema-less nature, flexibility, and simplicity for a single-collection system.  
- Ideal for storing contact data without complex relational dependencies.  

### UI Framework:  
- *Material-UI (MUI)* was selected for its comprehensive set of pre-designed components and customizable themes, ensuring a professional, consistent UI.  

### Frontend-Backend Integration:  
- *Axios* is used for efficient communication between the frontend and backend.  
- Built a scalable API structure to handle CRUD operations seamlessly.  

---

## Project Structure  

plaintext  
ERINO-Contact-management-system/  
│  
├── backend/  
│   ├── models/               # Mongoose schemas for contact data  
│   ├── routes/               # API routes for CRUD operations  
│   ├── .env                  # Environment variables for MongoDB URI and PORT  
│   └── server.js             # Entry point for the backend server  
│  
├── frontend/  
│   ├── components/           # Reusable React components (ContactForm, ContactsTable, EditContactModal,viewContactModel)  
│   ├── App.js                # Main React app file  
│   ├── index.js              # React entry point  
│   ├── api.js                # Axios instance for API communication  
│   └── App.css            # Global CSS for styling  
│  
└── README.md                 # Project documentation (this file)  
  

---

## Setup Instructions  

### Prerequisites  

- *Node.js (v14+)*  
- *MongoDB Atlas* or *local MongoDB installation*  
- *Git*  

### Installation  

#### Step 1: Clone the Repository  

bash  
git clone https://github.com/prathamKumarshetty/ERINO-Contact-management-system.git  
cd ERINO-Contact-management-system  
  

#### Step 2: Install Dependencies  

- *Backend*:  
  bash  
  cd erino-backend  
  npm install  body-parser,cors,env,express,mongoose
    

- *Frontend*:  
  bash  
  cd erino-frontend  
  npm install @mui/*, axios, file-saver, react, react-dom, react-toastify,papaparse
    

#### Step 3: Set Up MongoDB  

- Create a .env file in the backend directory with these variables:  

  plaintext  
  MONGODB_URI=mongodb+srv://sudarshan:sudu@cluster0.xbmvj.mongodb.net/
  PORT=5000  
    

#### Step 4: Run the Application  

- Start the backend server:  
  bash  
  cd erino-backend  
  npm start  
    

- Start the frontend server:  
  bash  
  cd erino-frontend  
  npm start  
    

- Access the app in your browser at http://localhost:3000.  

---

## Problems Faced  

1. Choosing the Right Database
Initially considered relational databases like PostgreSQL but realized the simplicity of the project didn't require complex relationships.
Opted for MongoDB due to its schema-less flexibility and easier scalability, which perfectly aligned with the contact management system's requirements.

2. Mastering Material-UI (MUI)
Using MUI for the first time was both exciting and challenging.
Understanding its component structure and styling system required diving deep into tutorials and documentation.
Balancing MUI's flexibility with creating a unique and cohesive design took substantial experimentation.

3. Handling Deployment Challenges
Encountered persistent issues while deploying on Render.com, such as server misconfigurations and failed database connections.
These issues required troubleshooting deployment logs, revising configurations, and researching hosting best practices.

4. Implementing Search and Pagination
Integrating the search and pagination features while maintaining fast responsiveness with a large dataset was tricky.
Fine-tuning backend queries and optimizing frontend state management became key learning points.

5. Iterative Design Process
Creating a UI that felt intuitive yet modern required continuous refinement.
Feedback from peers and iterative testing helped improve the layout, color schemes, and responsiveness.

---

## Drive Link for photos  

[*Click here to download the project demo from Google Drive*](https://drive.google.com/drive/folders/1di9bdhvL2B0Wz-l6PmaFE1uw6QovDf6r)
