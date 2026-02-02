import unittest
from scripts.project_eden_engine import ProjectEdenEngine


class ProjectEdenEngineTests(unittest.TestCase):
    def test_run_reforestation_success(self):
        engine = ProjectEdenEngine()
        result = engine.run_reforestation_logic("Test Site", 10)
        self.assertIn("Project Eden successfully updated", result)

    def test_broken_shovel_shutdown(self):
        engine = ProjectEdenEngine()
        ok = engine.broken_shovel_test("corrupted")
        self.assertFalse(ok)
        self.assertFalse(engine.system_active)
        self.assertTrue(engine.status.startswith("SYSTEM HALTED"))


if __name__ == "__main__":
    unittest.main()
