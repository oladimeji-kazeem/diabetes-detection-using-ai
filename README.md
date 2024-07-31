# Diabetes Prediction

This repository contains a machine learning project for predicting diabetes using several classifiers. The dataset used in this project is sourced from [Pima Indians Diabetes Database](https://www.kaggle.com/uciml/pima-indians-diabetes-database).

## Table of Contents

- [Introduction](#introduction)
- [Dataset](#dataset)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Models](#models)
- [Results](#results)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project aims to predict the onset of diabetes based on diagnostic measures. Several machine learning algorithms are implemented and evaluated to identify the best performing model.

## Dataset

The dataset used in this project is the Pima Indians Diabetes Database, which contains several medical predictor variables and one target variable, `Outcome`. The predictor variables include the number of pregnancies, BMI, insulin level, age, and others.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/diabetes-prediction.git
    cd diabetes-prediction
    ```

2. Create a virtual environment and activate it:
    ```bash
    python -m venv venv
    source venv/bin/activate   # On Windows, use `venv\Scripts\activate`
    ```

3. Install the required packages:
    ```bash
    pip install -r requirements.txt
    ```

## Usage

1. Ensure that the dataset (`diabetes.csv`) is placed in the `data` directory.
2. Run the Jupyter Notebook to execute the code cells:
    ```bash
    jupyter notebook Diabetes\ Prediction.ipynb
    ```

3. Alternatively, you can run the script directly if converted to a Python script:
    ```bash
    python diabetes_prediction.py
    ```

## Project Structure

- `data/`: Contains the dataset file (`diabetes.csv`).
- `model/`: Directory where the best model is saved.
- `Diabetes Prediction.ipynb`: Jupyter Notebook containing the code for data processing, model training, and evaluation.
- `requirements.txt`: File containing the required Python packages.

## Models

The following machine learning models are implemented and evaluated:
- Logistic Regression
- Random Forest
- Support Vector Machine (SVC)
- K-Nearest Neighbors
- Gradient Boosting

## Results

The best performing model is selected based on accuracy on the test set and saved as a pickle file in the `model/` directory. The evaluation metrics for each model are printed during execution.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or additions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
