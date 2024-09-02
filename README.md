# Finance App

This is a data table component that visualizes IRB and Western IRB data using the MUI Data Table library.

## Installation

Clone the repo onto your local machine using this command

```bash
git clone https://github.com/UF-COM-OR/irbDashboard.git
```

### Running the Application

Once inside the directory run the following command to install the dependencies to run the IRB Dashboard.

```bash
npm install --legacy-peer-deps
```

Then to run the application on the local host run this command

```bash
npm run dev
```
The product should look like this

![image](https://github.com/user-attachments/assets/85096e0f-e18e-491d-8bd4-a530d57c78fa)

To set up the flask application open up a new terminal tab and then run these commands

```bash
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```
Then finally run 
```bash
python src/app.py
```
# Features of the Product

Model and Techniques
--------------------

### Deep Learning Model

The backend uses a pre-trained Keras model to predict whether a transaction is fraudulent. The model is based on a shallow neural network architecture. The model was trained on a dataset of credit card transactions that includes both legitimate and fraudulent activities. Here are some key aspects of the model:

-   **Input Features**: The model uses PCA-transformed features from the transaction data, along with the transaction `Amount` and `Time` as inputs.
-   **Architecture**: The neural network consists of several dense layers, with ReLU activation functions and dropout for regularization.
-   **Training**: The model was trained using TensorFlow, with binary cross-entropy as the loss function and the Adam optimizer.

The Keras model is loaded in the Flask app using the following code snippet:

python

Copy code

`from tensorflow.keras.models import load_model

# Load the Keras model
keras_model = load_model('src/shallow_nn_b_final.keras')`

### Evaluation

The model was evaluated using the Area Under the Precision-Recall Curve (AUPRC) due to the highly imbalanced nature of the dataset. The model achieved high precision in detecting fraudulent transactions, making it suitable for real-world applications where minimizing false positives is critical.

Frontend (React)
----------------

The frontend is designed to visualize transaction data in an interactive data table and provide real-time predictions using the backend model. Below is an overview of the key components:

### Pages

This directory contains the page components of the webpage.

html

Copy code

`import React from 'react';
import Table from '../components/table';

const TablePage = () => {
  return <Table />;
};

export default TablePage;`

This is where you would add additional components like a navbar. Since this GitHub repo contains only the table, there is only one page inside here, which corresponds to the table page. When more pages are added to this repo, this is the directory where these pages will be kept.

### Code Explanation for `Table` Component

This code defines a React component that displays two data tables using Material-UI (MUI) and React Router. The component allows switching between two sets of data using tabs.

#### Imports

-   **React**: For creating the component.
-   **react-router-dom**: For handling routing and navigation within the application.
-   **mui-datatables**: For rendering responsive data tables.
-   **@mui/material/styles**: For creating custom themes with Material-UI.
-   **@mui/material/Tabs and @mui/material/Tab**: For creating the tabs that switch between the data tables.
-   **Data Imports**: The data to be displayed in the tables (`myIRBData` and `westernIRBData`).

#### Helper Functions

-   **getStatusColor**: Determines the color of a table cell based on the value (e.g., 'Missing', 'Closed', 'Approved', 'Changed').

#### Columns Configuration

-   **columns**: Defines the columns for the `myIRBData` table, including custom rendering for status values.
-   **westernIRBColumns**: Defines the columns for the `westernIRBData` table, including custom rendering for status values.

#### MUI Theme Configuration

-   **getMuiTheme**: Creates a custom theme for MUI components with specific typography and color palette.

#### Data Table Components

-   **MyIRBDataTable**: A functional component that renders the `myIRBData` table using `MUIDataTable`.
-   **WesternIRBDataTable**: A functional component that renders the `westernIRBData` table using `MUIDataTable`.

#### Main Table Component

-   **Table**: The main functional component that:
    -   Uses `useLocation` from `react-router-dom` to track the current route.
    -   Renders the tabs (`myIRB Data` and `Western IRB Data`) using MUI `Tabs` and `Tab` components.
    -   Uses `Routes` and `Route` from `react-router-dom` to switch between the `MyIRBDataTable` and `WesternIRBDataTable` based on the current path.

#### Detailed Breakdown of the `Table` Component

1.  **Styling and Theme**:

    -   `getMuiTheme`: Customizes the MUI theme to use specific colors and typography.
    -   `ThemeProvider`: Applies the custom theme to all MUI components within the `Table` component.
2.  **Tabs**:

    -   **Tabs Component**: Contains two tabs for switching between the two datasets.
        -   **Tab 1**: "myIRB Data" - Links to the root path `/`.
        -   **Tab 2**: "Western IRB Data" - Links to `/western-irb`.
3.  **Routes**:

    -   **Route for `/`**: Renders the `MyIRBDataTable` component.
    -   **Route for `/western-irb`**: Renders the `WesternIRBDataTable` component.

#### Example Use Case

When the user navigates to the application:

1.  **Initial View**: The application displays the `myIRBData` table by default.
2.  **Switching Tabs**: Clicking on the "Western IRB Data" tab changes the route to `/western-irb` and displays the `westernIRBData` table.
3.  **Custom Styling**: The table cells are styled based on the data values using the `getStatusColor` function.

#### Visual Features Correspondence

-   **Tabs**: The `Tabs` and `Tab` components create the visual tabs at the top of the table.
-   **Table Data**: The `MUIDataTable` components (`MyIRBDataTable` and `WesternIRBDataTable`) display the actual data in table format.
-   **Custom Styles**: Custom styles are applied to table cells based on the data values using the `getStatusColor` function and the theme created by `getMuiTheme`.

Styling
-------

This project uses **Tailwind CSS** and **Google Fonts**, all of which can be seen in `index.css`. Tailwind CSS provides utility-first CSS classes for rapid UI development, while Google Fonts adds custom fonts for better typography.

Acknowledgements
----------------

This project was developed as part of a learning exercise in building a full-stack application that integrates a machine learning model into a web interface. Special thanks to the creators of Flask, React, and MUI for their excellent tools and libraries.
