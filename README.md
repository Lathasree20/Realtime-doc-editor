REAL-TIME COLLABORATIVE DOCUMENT EDITOR

COMPANY : CODTECH IT SOLUTIONS

NAME : MANIYARI LATHA SREE

INTERN ID : CT06DG2732

DOMAIN : FULL STACK WEB DEVELOPMENT

DURATION : 6 WEEKS

MENTOR : Neela Santhosh Kumar

Description:-

The Realtime Document Editor is a full-stack collaborative editing platform that allows multiple users to edit a document in real-time. The application is designed to mimic the core functionality of popular tools such as Google Docs. It supports live updates, collaborative typing, and automatic saving to a cloud database. The project is developed using a modular architecture with separate client and server components.

Features:-

Real-Time Collaboration
Multiple users can edit the same document simultaneously. Edits are reflected instantly across all connected clients.

Auto-Save Functionality
The application automatically saves the document to the database every few seconds to ensure no data loss.

Unique Document Links
Each session generates a unique document ID that can be shared with others for collaborative editing.

WebSocket Integration
Real-time communication is handled using Socket.IO, allowing fast and efficient data exchange.

Rich Text Editing
The frontend includes a rich text editor built using Quill.js, enabling formatting options like bold, italics, lists, links, and headings.

Persistent Document Storage
All documents are stored in a MongoDB database using Mongoose for long-term access and management.

Organized Project Structure
The project follows a clean separation of concerns with independent client and server directories.

Technologies and Tools Used:-

Frontend:

ReactJS for building the user interface

React Router for navigation between document routes

Quill.js for rich text editing

Socket.IO Client for real-time communication

Backend:

Node.js for the server runtime

Express.js as the web framework

Socket.IO for handling WebSocket communication

MongoDB as the NoSQL database

Mongoose for object data modeling

Development Tools:

Visual Studio Code as the code editor

Git for version control

GitHub for repository hosting

npm for dependency management

How It Works:-

When the user visits the application, they are redirected to a unique document URL. This ID is used to identify the specific document in the backend. A connection is established with the backend server using WebSockets through Socket.IO. As the user types or modifies content, changes are captured and emitted to the server. The server then broadcasts these updates to all connected clients editing the same document.

Simultaneously, the server saves the document’s content to MongoDB at regular intervals to ensure persistence. When another user accesses the same URL, the existing content is fetched from the database and synchronized in real-time.

Real-World Use Cases

Remote teams collaborating on documentation or meeting notes

Educational environments where students work together on assignments

Technical writing or blogging platforms that require collaborative editing

Customer service teams creating internal knowledge base content

How to Run the Project Locally:-

Clone the repository and install dependencies in both client and server directories using npm install.

Start the backend server with node index.js from the server folder.

Start the frontend with npm start from the client folder.

Open your browser and navigate to http://localhost:3000.
