"""Simple preprocessing helper for se4l datasets.
Converts a CSV with expected columns to numpy features for model input.
"""

import numpy as np
import pandas as pd


def preprocess_se4l_data(csv_path):
    """Simpler CSV-based preprocess helper.

    Args:
        csv_path: path to a CSV file with the required feature columns
    Returns:
        numpy.ndarray shape (N, 5)
    """
    df = pd.read_csv(csv_path)
    # Mapping and normalization logic may already be present in the CSV
    features = df[['veg_score', 'waste_score', 'energy_presence', 'job_market_index', 'water_proximity']]
    return np.array(features)


if __name__ == "__main__":
    print("This helper converts CSVs into model-ready features. Call preprocess_se4l_data('file.csv')")