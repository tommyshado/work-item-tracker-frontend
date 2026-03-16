# Work Item Tracker — Frontend

A React + TypeScript single-page application for managing work items (tasks, bugs, features, etc.) with full CRUD operations, search, and status filtering.

## Tech Stack

| Layer        | Technology                        |
| ------------ | --------------------------------- |
| UI Library   | React 19                          |
| Language     | TypeScript 5.9                    |
| Build Tool   | Vite 8                            |
| HTTP Client  | Axios                             |
| Routing      | React Router 7                    |
| Date Utility | date-fns                          |
| Styling      | Vanilla CSS + React Bootstrap     |
| Linting      | ESLint 9 with TypeScript plugin   |

## Prerequisites

- **Node.js** ≥ 18
- **npm** (or another package manager)
- A running instance of the **Work Item Tracker API** on `http://localhost:5000`

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server (default: http://localhost:5173)
npm run dev
```

### Available Scripts

| Script          | Description                                    |
| --------------- | ---------------------------------------------- |
| `npm run dev`   | Start the Vite dev server with HMR             |
| `npm run build` | Type-check with `tsc` and build for production |
| `npm run lint`  | Run ESLint across the project                  |
| `npm run preview` | Serve the production build locally           |

## Project Structure

```
src/
├── main.tsx                        # App entry — Axios base URL, BrowserRouter
├── App.tsx                         # Root component, renders WorkItemsPage
├── api/
│   └── WorkItemTrackerAPI.tsx      # Axios service (CRUD, search, filter)
├── types/
│   └── WorkItem.tsx                # WorkItem interface, statuses, form types
├── pages/
│   └── work-item/
│       ├── index.tsx               # WorkItemsPage — state, fetch logic, CRUD
│       ├── WorkItemList.tsx        # Table of work items
│       ├── WorkItemDetail.tsx      # Single work-item detail view
│       └── WorkItemSearchBar.tsx   # Search input + status filter dropdown
└── components/
    ├── header/Header.tsx           # Top nav bar with "+ New" button
    ├── modal/Modal.tsx             # Create / Edit form modal
    ├── field/Field.tsx             # Form field wrapper with label & error
    ├── status-badge/StatusBadge.tsx# Coloured status pill
    └── confirmation/
        └── DeleteConfirmDialog.tsx # Delete confirmation dialog
```

## API Integration

The frontend communicates with the backend REST API at the configured base URL (`http://localhost:5000`). All HTTP calls are in [src/api/WorkItemTrackerAPI.tsx](src/api/WorkItemTrackerAPI.tsx).

| Method   | Endpoint                              | Description                         |
| -------- | ------------------------------------- | ----------------------------------- |
| `POST`   | `/api/workitems`                      | Create a new work item              |
| `GET`    | `/api/workitems`                      | Fetch all work items                |
| `GET`    | `/api/workitems/:id`                  | Fetch a single work item by ID      |
| `PUT`    | `/api/workitems/:id`                  | Update a work item                  |
| `DELETE` | `/api/workitems/:id`                  | Delete a work item                  |
| `GET`    | `/api/workitems/search?query=:query`  | Search by title or description      |
| `GET`    | `/api/workitems/status/:status`       | Filter by status                    |

## Data Model

### WorkItem

| Field         | Type     | Notes              |
| ------------- | -------- | ------------------ |
| `id`          | number   | Auto-generated     |
| `title`       | string   | Required           |
| `description` | string   | Required           |
| `status`      | string   | One of the values below |
| `createdAt`   | string   | ISO timestamp      |
| `updatedAt`   | string?  | Optional           |

### Statuses

| Status        | Colour  |
| ------------- | ------- |
| Open          | Blue    |
| In Progress   | Amber   |
| Blocked       | Red     |
| Done          | Green   |
| Closed        | Grey    |

## Features

- **List view** — Browse all work items in a table with status badges and action buttons.
- **Detail view** — Click a row to view the full work item, then edit or delete from there.
- **Create** — Open the modal via the "+ New" header button; title and description are validated.
- **Edit** — Update title, description, and status through the same modal.
- **Delete** — Confirmation dialog before removal.
- **Search** — Real-time text search across titles and descriptions.
- **Filter by status** — Dropdown to narrow the list to a single status or show all.

## Configuration

| Setting           | Location                          | Default                    |
| ----------------- | --------------------------------- | -------------------------- |
| API base URL      | [src/main.tsx](src/main.tsx) (`axios.defaults.baseURL`) | `http://localhost:5000/` |
| Dev server port   | Vite defaults                     | `5173`                     |
| TypeScript target | [tsconfig.app.json](tsconfig.app.json) | ES2023                |
