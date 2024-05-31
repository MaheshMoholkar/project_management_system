# Project Assignment: Project Management System

## Overview
This repository contains the source code for a Project Management System. The system provides functionalities for managing project details, user authentication, and displaying various reports and dashboards. The following features are implemented in this assignment:

## Features

### 1. Login with Authentication
- **Description:** Secure login system with user authentication.
- **Functionality:** Users must provide valid credentials to access the system.

### 2. Insert Project Details
- **Description:** Allows users to add new project details.
- **Functionality:** Users can input project information such as name, description, start date, end date, department, and status.

### 3. List Project Details
- **Description:** Displays a list of all projects in the system.
- **Functionality:** Users can view project information in a tabular format.

### 4. Search a Project
- **Description:** Provides search functionality to find specific projects.
- **Functionality:** Users can search projects by name, department, or other criteria.

### 5. Sort the List by Any One Column Selected from Dropdown
- **Description:** Allows sorting of the project list based on a selected column.
- **Functionality:** Users can select a column from a dropdown menu to sort the project list.

### 6. Pagination
- **Description:** Implements pagination for the project list.
- **Functionality:** Users can navigate through multiple pages of projects if the list is long.

### 7. Update Project Status
- **Description:** Enables updating the status of a project.
- **Functionality:** Users can change the status of a project.

### 8. Dashboard
- **Description:** Provides a dashboard view with various summaries and visual representations.
- **Functionality:** Displays key metrics and visual data about the projects.

### 9. Cards to Show Status Counters
- **Description:** Displays cards with counters for different project statuses.
- **Functionality:** Users can see the number of projects in various statuses (e.g., In Progress, Completed, Pending).

### 10. Graph to Show Department Wise Project Completion Report
- **Description:** Shows a graphical report of project completion by department.
- **Functionality:** Users can view a graph that illustrates the number of completed projects in each department.

## Getting Started

### Prerequisites
- Nodejs
- Typescript
- Vite
- React
- TailwindCSS
- Docker

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/MaheshMoholkar/project-management-system.git
    ```
2. Navigate to the project directory:
    ```bash
    cd project-management-system/frontend
    ```
    OR
    ```
    cd project-management-system/backend
    ```
3. Install dependencies:
    ```bash
    npm i
    ```
4. Set up the database:
    ```bash
    cd backend && docker compose up
    ```
5. Start the application:
    ```bash
    npm run dev
    ```

### Usage
- Open your browser and navigate to `http://localhost:5173` to access the application.
- Log in with your credentials to access the project management features.

- Credentials
  johndoe@gmail.com
  secretpassword 
  
---
