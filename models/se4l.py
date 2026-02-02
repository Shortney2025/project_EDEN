"""SE4L (Save Earth for Lilith) model definitions.
Contains a small, demonstrative TensorFlow Keras model used for environmental suitability
classification. This is intentionally lightweight and intended for local experimentation.
"""

import tensorflow as tf
from tensorflow.keras import layers, models


def create_se4l_model(input_shape: int = 5):
    """Create a small feed-forward model for binary suitability prediction.

    Args:
        input_shape: number of input features (default: 5)

    Returns:
        Compiled tf.keras.Model
    """
    model = models.Sequential([
        layers.Input(shape=(input_shape,)),
        layers.Dense(64, activation="relu"),
        layers.Dense(128, activation="relu"),
        layers.Dropout(0.2),
        layers.Dense(64, activation="relu"),
        layers.Dense(1, activation="sigmoid"),
    ])

    model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])
    return model


if __name__ == "__main__":
    # Quick smoke-run to verify model builds
    m = create_se4l_model()
    m.summary()