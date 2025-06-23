import json
import os

print("[Deng] Running robot protocol generator...")

input_path = "results/curie_output.json"
if os.path.exists(input_path):
    with open(input_path, 'r') as f:
        data = json.load(f)
    suggestion = data.get("next_suggestion", [])
else:
    suggestion = []

# Safety fallback
if len(suggestion) < 5:
    print(f"[WARN] Invalid suggestion data: {suggestion}")
    suggestion = [0, 0, 0, 0, 0]

robot_steps = {
    "steps": [
        f"Add {suggestion[0]} mg of metal salt",
        f"Add {suggestion[1]} mol of modulator",
        f"Add solvent option {suggestion[2]}",
        f"Heat for {suggestion[3]} hours at {suggestion[4]} °C"
    ]
}

with open("results/deng_output.json", "w") as f:
    json.dump(robot_steps, f, indent=2)

print("[Deng] Robot protocol generated.")
