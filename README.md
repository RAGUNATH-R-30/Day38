# Hall Booking API (No Database)

This API provides endpoints for booking halls or venues for events. It operates without a traditional database, using in-memory data structures instead.

## Features

- **CRUD Operations**: Allows CRUD operations for halls and bookings.
- **Availability Management**: Checks and manages availability of halls for booking.
- **Data Validation**: Validates input data to ensure integrity and security.
- **Logging and Error Handling**: Logs actions and handles errors gracefully.

## Technologies Used

- **Node.js**: A JavaScript runtime for server-side development.
- **Express.js**: A web application framework for Node.js to build APIs.

- ## API Endpoints

- **Halls**:
  - `GET /api/halls`: Retrieve all halls.
  - `POST /api/halls`: Create a new hall.
  - `GET /api/halls/:id`: Retrieve a hall by ID.
  - `PUT /api/halls/:id`: Update a hall by ID.
  - `DELETE /api/halls/:id`: Delete a hall by ID.

- **Bookings**:
  - `GET /api/bookings`: Retrieve all bookings.
  - `POST /api/bookings`: Create a new booking.
  - `GET /api/bookings/:id`: Retrieve a booking by ID.
  - `PUT /api/bookings/:id`: Update a booking by ID.
  - `DELETE /api/bookings/:id`: Delete a booking by ID.
