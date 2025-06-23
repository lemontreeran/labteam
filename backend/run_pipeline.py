import os
import subprocess
import argparse
import sys
import json

def already_injected(notebook_path, strategy):
    with open(notebook_path, 'r') as f:
        nb_data = json.load(f)
    for cell in nb_data.get("cells", []):
        if cell.get("cell_type") == "markdown" and f"[Injected Prompt: {strategy}]" in cell.get("source", ""):
            return True
    return False

def run_atlas(defense_mode):
    print("[Atlas] Generating prompt...")
    subprocess.run([
        sys.executable,
        "generate_prompt_injection.py",
        "--strategy", defense_mode,
        "--notebook", "agents/atlas_prompt_generator.ipynb"
    ])
    subprocess.run([
        "jupyter", "nbconvert", "--to", "notebook", "--execute", "--inplace",
        "agents/atlas_prompt_generator.ipynb"
    ])
    print("[Atlas] Prompt generation complete.")

def run_curie():
    print("[Curie] Running Bayesian Optimization...")
    print("[Curie] Current directory:", os.getcwd())
    subprocess.run([sys.executable, "agents/curie_agent.py"])
    print("[Curie] BO complete.")

def run_deng():
    print("[Deng] Generating robot protocol...")
    subprocess.run([sys.executable, "agents/deng_robot.py"])
    print("[Deng] Robot protocol generated.")

def run_edison():
    print("[Edison] Generating 3D print model...")
    subprocess.run([
        "openscad",  # use PATH version
        "-o", "output/tuberack_6.stl",
        "Edison_Tuberack.scad"
    ])
    print("[Edison] 3D print model generated.")

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--defense_mode", type=str, default="no_defense", help="Defense strategy: no_defense | passive_instruction | active_instruction | passive_vaccine | active_vaccine")
    parser.add_argument('--notebook', type=str, default='agents/atlas_prompt_generator.ipynb', help='Path to notebook to inject into')

    args = parser.parse_args()
    print("--- Starting one iteration of the ChatGPT Lab pipeline ---")

    run_atlas(args.defense_mode)
    run_curie()
    run_deng()
    run_edison()

    print("--- Pipeline iteration complete ---")

if __name__ == "__main__":
    main()
