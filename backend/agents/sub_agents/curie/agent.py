from google.adk.agents import Agent
# from .prompt import SYSTEM_PROMPT
from .prompt import render_prompt

from agents.llm.llm_provider import get_model # import model provider

curie_agent = Agent(
    name="curie_agent",
    model="gemini-1.5-pro",
    # instruction=SYSTEM_PROMPT,
    instruction=render_prompt(parent_agent="atlas_agent"),
    description="Curie: synthesis modeling specialist."
)
