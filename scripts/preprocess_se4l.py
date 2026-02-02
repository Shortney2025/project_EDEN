"""Simple preprocessing helper for se4l datasets.
Converts a CSV with expected columns to numpy features for model input.
"""

import numpy as np
import pandas as pd


def preprocess_se4l_data(data_source: str):
    """Load CSV and return ndarray of features [veg_score, waste_score, energy_presence, job_market_index, water_proximity]

    Args:
        data_source: path to CSV
    Returns:
        numpy.ndarray shape (N, 5)
    """
    df = pd.read_csv(data_source)

    veg_mapping = {"None": 0, "Low": 1, "Medium": 2, "High": 3}
    df["veg_score"] = df.get("vegetation_type", "None").map(veg_mapping) if "vegetation_type" in df else 0

    # Avoid division by zero issues — assume a 0-100 metric
    df["waste_score"] = df.get("garbage_metric", 0) / 100.0

    features = df[["veg_score", "waste_score", "energy_presence", "job_market_index", "water_proximity"]]
    return np.array(features)


if __name__ == "__main__":
    # Example usage
    print("This helper converts CSVs into model-ready features. Call preprocess_se4l_data('file.csv')")