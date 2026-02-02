import unittest
import numpy as np

from models.se4l import create_se4l_model


class SE4LModelTest(unittest.TestCase):
    def test_create_and_predict(self):
        model = create_se4l_model()
        # run a single forward pass with dummy input
        dummy = np.random.rand(1, 5)
        pred = model.predict(dummy)
        self.assertEqual(pred.shape, (1, 1))


if __name__ == "__main__":
    unittest.main()