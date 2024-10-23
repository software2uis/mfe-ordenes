# mfe-ordenes
MFE responsible for the visualization and management of the product order microservice.

# Documentation
To create this project with Angular using Module Federation, the following is required:

- angular-cli: 18.2.7
- angular-architects/module-federation: 18.0.6

# Process for Structuring the Development Environment

## 1. **Angular (Frontend)**

1. **Installation of Node.js and npm**:

   - Download and install [Node.js](https://nodejs.org) (includes npm).
   
   - Verify the installation:

     ```bash
     node -v
     npm -v
     ```

2. **Installation of Angular CLI**:

   - Run the following command:

     ```bash
     npm install -g @angular/cli@18.2.7
     ```

3. **Install Module Federation**:

   ```bash
   ng add @angular-architects/module-federation@18.0.6
   ```

4. **Clone the repository**:

   - Clone the repository where the project is located:

     ```bash
     git clone https://github.com/[username]/[project-name].git
     ```

   - Enter the project folder:

     ```bash
     cd [project-name]
     ```

5. **Install dependencies**:

   - Inside the Angular project, install the dependencies defined in the `package.json` file:

     ```bash
     npm install
     ```

6. **Run the development server**:

   - To start the application on a local server:

     ```bash
     ng serve
     ```
  
