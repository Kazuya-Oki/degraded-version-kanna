package main

import (
	"context"
	"github.com/mark3labs/mcp-go/mcp"
	"github.com/mark3labs/mcp-go/server"
)

func main() {

	s := server.NewMCPServer(
		"Degraded Version KANNA",
		"1.0.0",
		server.WithResourceCapabilities(true, true),
		server.WithLogging(),
	)

	toolsForProjects := mcp.NewTool("manageProjects",
		mcp.WithDescription("Perform project management operations"),
		mcp.WithString("operation",
			mcp.Required(),
			mcp.Description("Project management operations"),
			mcp.Enum("create", "list", "edit", "delete"),
		),
		mcp.WithString("projectID",
			mcp.Description("Project ID is required for edit and delete operations"),
		),
		mcp.WithString("name",
			mcp.Description("Project name is required for create operation"),
		),
		mcp.WithString("description",
			mcp.Description("Project description"),
		),
		mcp.WithString("projectTemplateID",
			mcp.Description("Project template ID is required for create operation"),
		),
	)

	// Tool for project templates management
	toolsForProjectTemplates := mcp.NewTool("manageProjectTemplates",
		mcp.WithDescription("Perform project template management operations"),
		mcp.WithString("operation",
			mcp.Required(),
			mcp.Description("Project template management operations"),
			mcp.Enum("list"),
		),
	)

	s.AddTool(toolsForProjects, func(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {
		op := request.Params.Arguments["operation"].(string)

		var res string
		switch op {
		case "create":
			name := request.Params.Arguments["name"].(string)
			description := request.Params.Arguments["description"].(string)
			projectTemplateID := request.Params.Arguments["projectTemplateID"].(string)
			res = createProject(name, description, projectTemplateID)
		case "list":
			res = listProjects()
		case "edit":
			projectID := request.Params.Arguments["projectID"].(string)
			description := request.Params.Arguments["description"].(string)
			res = editProject(projectID, description)
		case "delete":
			projectID := request.Params.Arguments["projectID"].(string)
			res = deleteProject(projectID)
		}
		return mcp.NewToolResultText(res), nil
	})

	s.AddTool(toolsForProjectTemplates, func(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {
		op := request.Params.Arguments["operation"].(string)

		var res string
		switch op {
		case "list":
			res = listProjectTemplates()
		}
		return mcp.NewToolResultText(res), nil
	})

	if err := server.ServeStdio(s); err != nil {
		//fmt.Printf("Server error: %v\n", err)
	}
}
