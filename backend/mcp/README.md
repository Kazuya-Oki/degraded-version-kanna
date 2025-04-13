# Degraded Version KANNA

A project management application built with Go, providing tools for managing projects and project templates.

## Description

Degraded Version KANNA is a backend service that allows users to perform various project management operations such as creating, listing, editing, and deleting projects. It also provides functionality to list project templates for different industries.

## Features

- Project management operations:
  - Create new projects
  - List existing projects
  - Edit project details
  - Delete projects
- Project template management:
  - List available project templates

## Project Templates

The application includes templates for various industries:
- Construction industry
- Manufacturing industry
- Real estate industry
- Software development
- Facility management

## Installation

### Prerequisites

- Go 1.23 or higher

### Steps

1. Clone the repository:
   ```
   git clone <repository-url>
   cd backend/mcp
   ```

2. Install dependencies:
   ```
   go mod download
   ```

3. Build the application:
   ```
   go build
   ```

## Usage

### Running the Application

```
./mcp
```

### API Usage Examples

The application exposes tools that can be used through the MCP framework:

#### Managing Projects

- Create a new project:
  ```
  operation: "create"
  name: "New Project Name"
  description: "Project description"
  projectTemplateID: "1"
  ```

- List all projects:
  ```
  operation: "list"
  ```

- Edit a project:
  ```
  operation: "edit"
  projectID: "1"
  description: "Updated description"
  ```

- Delete a project:
  ```
  operation: "delete"
  projectID: "1"
  ```

#### Managing Project Templates

- List all project templates:
  ```
  operation: "list"
  ```

## Dependencies

- [github.com/mark3labs/mcp-go](https://github.com/mark3labs/mcp-go) - MCP framework for Go
- [github.com/google/uuid](https://github.com/google/uuid) - UUID generation
- [github.com/yosida95/uritemplate](https://github.com/yosida95/uritemplate) - URI template library