package main

import (
	"fmt"
	"strings"
)

// Project represents a project with id and name
type Project struct {
	ID   string
	Name string
}

// createProject creates a new project
func createProject(name string, description string, projectTemplateID string) string {
	return "Project created successfully"
}

// listProjects lists all projects
func listProjects() string {

	// Create sample projects
	projects := []Project{
		{ID: "1", Name: "〇〇邸 建設工事"},
		{ID: "2", Name: "〇〇社用 製造"},
		{ID: "3", Name: "〇〇様 契約関連"},
		{ID: "4", Name: "KANNA 開発"},
		{ID: "5", Name: "〇〇施設 設備管理"},
	}

	// Format projects into a string with each project on a new line
	var projectLines []string
	for _, p := range projects {
		projectLines = append(projectLines, fmt.Sprintf("Project ID: %s, Name: %s", p.ID, p.Name))
	}

	result := strings.Join(projectLines, "\n")

	return result
}

// editProject updates an existing project
func editProject(taskID, description string) string {
	return "Project updated successfully"
}

// deleteProject deletes a project
func deleteProject(taskID string) string {
	return "Project deleted successfully"
}
