from agents import Agent, Runner, gen_trace_id, trace
from agents.mcp import MCPServer, MCPServerStdio
from typing import List

async def run_server(server: MCPServer, message: str, instructions: List[str]):
    agent = Agent(
        name="Assistant",
        instructions=(
            "\n".join(instructions)
        ),
        model="gpt-4o",
        mcp_servers=[server]
    )
    result = await Runner.run(agent, message)
    return result.final_output

async def call_agent(message: str, instructions: List[str]):
    async with MCPServerStdio(
        name="Project Manager",
        params={
            "command": "PATH_TO_MCP_SERVER",
        },
    ) as server:
        trace_id = gen_trace_id()
        with trace(workflow_name="SSE Example", trace_id=trace_id):
            return await run_server(server, message, instructions)