add sprint 1 (2 days)
## <0.1.0> - <2024-06-05>

### Sprint learnings

**API Management and HTTP Requests:** Initial implementation of API management and HTTP requests handling.
**Code Modularization:** Segregation of code into modules to enhance organization and maintainability.
**Data Transformation for React Components:** Emphasis on data transformation for proper functioning of components.
**Unit Testing:** Implementation and integration of unit tests for components and functions.
**React Components Development:** Creation and initial development of essential React components.
**CSS Modularization:** Segmentation of CSS code for improved maintenance and scalability.

### Added

* Add a barloader component while fetching data from the API.
* Unique key implementation for each component.
* Use of Jest library for testing functions and components.
* Development of a getMovies function to retrieve movie data from an API, including configuration for the GET request including API token.
* Development of a function to transform movie data from the API.
* creacion de componente paginate


### Changed

* Relevant changes in package.json regarding the installation of dependencies (build, test jest, eslint).

### Fixed

* Unit tests correction for movie listing components and each movie card.
* Code restructuring for CSS and project root.

### Removed

* Removal of test files (spec).
* Removal of CSS files as a good practice for implementing CSS modularization.



## <0.1.1> - <2024-06-12>

### Sprint learnings

**Home View Styling Improvement:** Update and enhancement of the home page styling.
**API Notifications:** Implementation of notifications (React toastify) during data retrieval from the API.
**React Router Integration:** Integration of React Router in App.tsx.
**Branch Creation:** Branch creation facilitated through GitHub.
**Test Modularization:** Modularization of unit test files to improve code organization."
**Unit Test Configuration:** Setting up tests with proper cleanup and isolation to prevent interference.



### Added
* Implementation of styling for the Home component.
* Adding changelog file.
* Implementation of Hooks states to manage errors during the data retrieval process.
* Created new branch add from GitHub.
* creacion componente navbar para activar rutas para vistas.


### Changed

* Styling in Structural Home Components:

* Addition of navbar as a component.

* Adjustments in unit tests to prevent interference between tests."

### Fixed

* I encountered several issues with the unit tests, particularly with the use of toBeInTheDocument(). This was rectified after thorough investigation.

* I faced difficulties with the visibility of the barloader due to its animation speed."


* Deployment issues on Vercel due to an error 'Error: Command "npm run build" exited with 2'.


### Removed
