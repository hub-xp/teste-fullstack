# Book Reviews Platform

## Overview

This project is a "Book Reviews" platform that allows users to browse and review books. It is built using Next.js for the frontend and connects to a NestJS backend with a MongoDB database.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: NestJS, MongoDB
- **Data Fetching**: React Query

## Features

- CRUD functionality for books and reviews
- Display of top-rated books
- Responsive design using Tailwind CSS
- Optimistic UI updates for adding reviews

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:

   ```
   git clone <your-repo-url>
   cd book-reviews-frontend
   ```

2. Install dependencies:

   ```
   pnpm install
   ```

3. Create a `.env` file based on the `.env.example` file and fill in the necessary environment variables.

### Running the Application

To start the development server, run:

```
pnpm dev
```

The frontend will be available at `http://localhost:3000`.

### Directory Structure

- `app/`: Contains the main application files and pages.
- `components/`: Contains reusable React components.
- `hooks/`: Custom hooks for data fetching.
- `utils/`: Utility functions for API calls.
- `public/`: Static assets like images and icons.
- `tailwind.config.js`: Configuration for Tailwind CSS.
- `postcss.config.js`: Configuration for PostCSS.
- `tsconfig.json`: TypeScript configuration.
- `package.json`: Project dependencies and scripts.

## Running Tests

To run tests, use:

```
pnpm test
```

## Documentation

For detailed API documentation, refer to the backend repository.

## Contributing

Feel free to submit issues or pull requests. Please ensure your code adheres to the project's coding standards.

## License

This project is licensed under the MIT License.
