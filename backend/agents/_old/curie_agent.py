import os
import json
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from skopt import Optimizer

print("[Curie] Current directory:", os.getcwd())

# Step 1: Prepare or load data
if not os.path.exists("dat.csv"):
    df = pd.DataFrame({
        'metal_amount': [0.1, 0.2, 0.15],
        'modulator': ['AcOH', 'AcOH', 'EtOH'],
        'add_solvent': ['DMF', 'DEF', 'DMF'],
        'reaction_time': [12, 10, 14],
        'reaction_temperature': [120, 110, 130],
        'crystallinity': [8.2, 7.8, 9.0]
    })
    df.to_csv("dat.csv", index=False)
    print("[Curie] Created default dat.csv")

# Step 2: Load and use numerical features only
data = pd.read_csv("dat.csv")
X_values = data[['metal_amount', 'reaction_time', 'reaction_temperature']].values
y = -data["crystallinity"].values

# Step 3: Run BO
rf = RandomForestRegressor(n_estimators=100, random_state=42)
opt = Optimizer(
    dimensions=[
        (0.05, 0.25),     # metal_amount
        (5, 20),          # reaction_time
        (100, 150)        # reaction_temperature
    ],
    base_estimator=rf
)

opt.tell(X_values.tolist(), y.tolist())
x_next = opt.ask()

# Step 4: Save suggestion
os.makedirs("results", exist_ok=True)
with open("results/curie_output.json", "w") as f:
    json.dump({"next_suggestion": [x.item() if hasattr(x, 'item') else x for x in x_next]}, f)

print("[Curie] BO step complete. Saved to results/curie_output.json")
