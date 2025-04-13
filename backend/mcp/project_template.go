package main

import (
	"fmt"
	"strings"
)

// ProjectTemplate represents a project template with id and name
type ProjectTemplate struct {
	ID   string
	Name string
}

// listProjectTemplates lists all project templates
func listProjectTemplates() string {

	// Create sample project templates
	templates := []ProjectTemplate{
		{ID: "1", Name: "建設業用テンプレート"},
		{ID: "2", Name: "製造業用テンプレート"},
		{ID: "3", Name: "不動産業用テンプレート"},
		{ID: "4", Name: "ソフトウェア開発用テンプレート"},
		{ID: "5", Name: "設備管理用テンプレート"},
	}

	// Format templates into a string with each template on a new line
	var templateLines []string
	for _, t := range templates {
		templateLines = append(templateLines, fmt.Sprintf("Template ID: %s, Name: %s", t.ID, t.Name))
	}

	result := strings.Join(templateLines, "\n")

	return result
}
