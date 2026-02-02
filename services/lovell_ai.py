"""Lovell AI wrapper to interface with local SE4L models and preprocessing.
This module provides a lightweight class used by the app to analyze a location by
running preprocessing and model inference when a model file is present.
"""

import os
from typing import Dict, Any

try:
    import numpy as np
    import tensorflow as tf
    from tensorflow.keras.models import load_model
except Exception:
    # Defer heavy imports until runtime; keep module importable in CI even without TF
    np = None
    tf = None
    load_model = None


class LovellAI:
    def __init__(self, model_path: str = "se4l_model.h5"):
        self.name = "Lovell"
        self.project = "se4l"
        self.model_path = model_path
        self.model = None

    def load_model(self):
        if load_model and os.path.exists(self.model_path):
            self.model = load_model(self.model_path)

    def analyze_location(self, data: Dict[str, Any]):
        """Analyze a location. `data` should contain the 5 feature values in any form.

        Returns a simple string for now; this can be expanded to structured output.
        """
        # Lazy model load
        if self.model is None:
            self.load_model()

        if self.model is not None and np is not None:
            # Expect data as dict of the five features (order: veg, waste, energy, job, water)
            features = np.array([[
                data.get("veg_score", 0),
                data.get("waste_score", 0),
                data.get("energy_presence", 0),
                data.get("job_market_index", 0),
                data.get("water_proximity", 0),
            ]])
            pred = float(self.model.predict(features)[0][0])
            return {"suitability": pred}

        return {"message": f"Lovell is analyzing {data.get('location', 'unknown')}..."}
