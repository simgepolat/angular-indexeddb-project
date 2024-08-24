# AngularIndexeddbEmployeeCompany Project

# Project Overview
This project is a frontend application designed to manage companies and their employees using IndexedDB as the client-side storage solution. The application allows users to add, edit, and delete company and employee information.

Access to these features is controlled through Google Authentication:

Authenticated users can perform CRUD (Create, Read, Update, Delete) operations on both companies and employees.
Unauthenticated users have read-only access, allowing them to view the data but not modify it. While they can see the edit buttons, attempting to use them will redirect them to the login page.

The application ensures that HTML, CSS, and JavaScript code is written following best practices, making it maintainable and scalable for years to come while ensuring a seamless user experience.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.13.


## Technologies Used

- Angular

- IndexedDB

- Google Authentication

- Bootstrap

## Screenshots

## Features

User Authentication: Google Sign-In is used to authenticate users.

Authenticated users can add, edit, and delete companies and their associated employees.

Unauthenticated users have read-only access to the data.

Data Management: Allows registired users to manage company and employee data using IndexedDB.

Responsive Design: The application is fully responsive and adapts to different screen sizes using Bootstrap.

Offline Support: Leveraging IndexedDB for data storage ensures that the application works offline and syncs when online.

## Installation Instructions
To set up and run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/project-name.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd project-name
   ```

3. **Install dependencies: Make sure you have Node.js and Angular CLI installed**
   ```bash
   npm install
   ```

4. **Run the development server**
   ```bash
   ng serve
   ```
The application will be accessible at http://localhost:4200/.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page..
