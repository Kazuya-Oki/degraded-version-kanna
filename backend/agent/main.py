import random

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
from agent import call_agent

app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Part(BaseModel):
    type: str
    text: str

class Message(BaseModel):
    role: str
    content: str
    parts: List[Part]

class MessageRequest(BaseModel):
    id: str
    messages: List[Message]

@app.post("/")
async def run_root(req: MessageRequest):
    last_message = req.messages[-1]
    instructions = req.messages[:-1]
    instruction_messages = list(map(lambda x: x.content, instructions))
    response = await call_agent(last_message.content, instruction_messages)
    return { "id": str(random.randint(10, 10000)), "message": response }
