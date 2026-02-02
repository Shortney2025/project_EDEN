import subprocess
import unittest

class InitLovelAITest(unittest.TestCase):
    def test_initializer_outputs_message(self):
        result = subprocess.run(["python3", "scripts/init_lovel_ai.py"], capture_output=True, text=True)
        self.assertEqual(result.returncode, 0)
        self.assertIn("Initializing Lovel AI...", result.stdout)

if __name__ == "__main__":
    unittest.main()
