"""Training loop for SE4L model.

Usage:
  python3 scripts/train_se4l.py --epochs 10

This script uses in-memory dummy data by default to avoid requiring a dataset.
"""

import argparse
import numpy as np
from models.se4l import create_se4l_model


def train_se4l(X_train, y_train, epochs=50):
    model = create_se4l_model(X_train.shape[1])

    print("Starting training for se4l Environmental Model...")
    history = model.fit(
        X_train,
        y_train,
        epochs=epochs,
        batch_size=32,
        validation_split=0.2,
        verbose=1,
    )

    model.save("se4l_model.h5")
    print("Model saved as se4l_model.h5")
    return history


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--epochs", type=int, default=10)
    args = parser.parse_args()

    # Default to a tiny dummy dataset so this script can run in CI or locally
    dummy_X = np.random.rand(200, 5)
    dummy_y = np.random.randint(2, size=200)

    train_se4l(dummy_X, dummy_y, epochs=args.epochs)


if __name__ == "__main__":
    main()