from flask import Flask, request, jsonify
from adk import AgentBuilder  # 伪代码，实际 import ADK
from workflows.crystal_opt import run_workflow

app = Flask(__name__)
agent_system = AgentBuilder(...).build(...)

@app.route("/optimize", methods=["POST"])
def optimize():
    data = request.json
    result = run_workflow(agent_system, {"research_topic": data["topic"]})
    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
