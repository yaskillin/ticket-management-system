### README.md

````markdown
# Ticket Management System

This is a full-stack ticket management system built with a React front-end, a .NET back-end, and SQL Server as the database.

## Features

- Add, edit, and delete tickets
- Filter and sort tickets by status, description, and date
- Connect to a SQL Server database

## Requirements

- Node.js (for running the React front-end)
- .NET Core SDK (for running the .NET back-end)
- SQL Server (for the database)

## Setup Instructions

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/your-repo/ticket-management-system.git
cd ticket-management-system
```
````

### 2. Set Up the SQL Server Database

- Make sure you have SQL Server installed on your machine. You can download SQL Server from [here](https://www.microsoft.com/en-us/sql-server/sql-server-downloads).
- Use SQL Server Management Studio (SSMS) to create a database called `TicketDb`.
- Run the following SQL script to create the `Tickets` table:

```sql
CREATE TABLE Tickets (
    TicketID INT PRIMARY KEY IDENTITY(1,1),
    Description NVARCHAR(255) NOT NULL,
    Status NVARCHAR(50) NOT NULL,
    Date DATETIME NOT NULL
);
```

### 3. Set Up the .NET Back-end

1. **Navigate to the server directory**:

   ```bash
   cd server
   ```

2. **Configure the connection string**:
   Update the `appsettings.json` file with your SQL Server configuration. Example:

   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=TicketDb;Integrated Security=True;"
     },
     "AllowedHosts": "*"
   }
   ```

   Replace `YOUR_SERVER_NAME` with the name of your SQL Server instance.

3. **Install dependencies**:
   Run the following command to restore dependencies for the .NET project:

   ```bash
   dotnet restore
   ```

4. **Run database migrations** (if using Entity Framework):
   Run the following command to apply migrations and set up the database:

   ```bash
   dotnet ef database update
   ```

5. **Run the back-end**:
   Start the .NET back-end by running the following command:
   ```bash
   dotnet run
   ```

The back-end will be running on `http://localhost:5143`.

### 4. Set Up the React Front-end

1. **Navigate to the client directory**:

   ```bash
   cd ../client
   ```

2. **Install dependencies**:
   Run the following command to install the necessary dependencies:

   ```bash
   npm install
   ```

3. **Start the React front-end**:
   Run the following command to start the React development server:
   ```bash
   npm start
   ```

The front-end will be running on `http://localhost:3000`.

### 5. Interacting with the Application

- **Front-end**: Go to `http://localhost:3000` to interact with the ticket management system.
- **Back-end**: The back-end API will be running at `http://localhost:5143/api/ticket`.

### 6. Testing the Application

You can use tools like Postman or your browser to test the API endpoints. Here are the available routes:

- `GET /api/ticket`: Fetch all tickets
- `POST /api/ticket`: Add a new ticket
- `PUT /api/ticket/{id}`: Update an existing ticket
- `DELETE /api/ticket/{id}`: Delete a ticket

### 7. Building for Production

To build the React app for production, run the following command from the `client` directory:

```bash
npm run build
```

This will create a `build` directory with the optimized production files.

### 8. Troubleshooting

If you encounter issues during setup, ensure that:

- SQL Server is running and accessible.
- The connection string in the `.NET` back-end is properly configured.
- Both the `.NET` back-end and React front-end are running.

## License

This project is licensed under the MIT License.

```

### Key Sections:

- **Requirements**: Lists the software prerequisites like Node.js, .NET SDK, and SQL Server.
- **Setup Instructions**: Step-by-step guidance for setting up the back-end, front-end, and database.
- **Running the Application**: Instructions for starting the React and .NET servers.
- **Testing the API**: Information about the available API routes.
- **Building for Production**: How to create a production build of the React app.
- **Troubleshooting**: Helps with common setup issues.

This README file will guide users through setting up and running the full-stack application. Let me know if you need any more changes or additions!
```
