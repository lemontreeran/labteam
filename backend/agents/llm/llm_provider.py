# agents/llm/llm_provider.py

import os
from typing import Type, TypeVar
from pydantic import BaseModel
from google.adk.models.lite_llm import LiteLlm

PROVIDER = os.getenv("AGENT_LLM_PROVIDER", "bedrock")  # support：bedrock, ollama
T = TypeVar("T", bound=BaseModel)


def get_model(output_model: Type[T] | None = None):
    kwargs = {}

    if PROVIDER == "bedrock":
        os.environ["AWS_REGION_NAME"] = "us-east-1"  # Get Bedrock ready
        kwargs["model"] = "bedrock/us.anthropic.claude-3-5-haiku-20241022-v1:0"
        if output_model is not None:
            kwargs["response_format"] = output_model

    elif PROVIDER == "ollama":
        kwargs["model"] = "ollama_chat/qwen2.5:3b"
        kwargs["api_base"] = "http://localhost:11434"
        if output_model is not None:
            kwargs["format"] = output_model.model_json_schema()

    else:
        raise ValueError(f"Unsupported provider: {PROVIDER}")

    return LiteLlm(**kwargs)
