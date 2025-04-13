"use client";

import { useChat } from "@ai-sdk/react";
import { UserSentMessage } from "@/src/ui/UserSentMessage";
import { ChatInputField } from "@/src/ui/ChatInputField";
import { LoadingSkeleton } from "@/src/ui/LoadingSkeleton";

export default function Chat() {
  const {
    messages,
    input,
    status,
    handleInputChange,
    handleSubmit,
    setMessages,
  } = useChat({
    api: "ENDPOINT_TO_PYTHON_BACKEND",
    initialMessages: [],
    onResponse: async (response) => {
      const body = await response.json();
      setMessages((messages) => {
        return [
          ...messages,
          {
            id: body.id,
            content: body.message,
            role: "assistant",
          },
        ];
      });
    },
  });
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "600px",
          height: "800px",
          padding: "12px 24px",
          border: "1px solid #3d444d",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            borderBottom: "1px solid #3d444d",
          }}
        >
          <h2 style={{ fontSize: "20px" }}>劣化版KANNA AIエージェント</h2>
        </div>
        <div
          style={{
            height: "100%",
            paddingTop: "24px",
            paddingBottom: "12px",
            overflowY: "scroll",
          }}
        >
          {messages.map((message) => {
            if (message.role === "user") {
              return (
                <UserSentMessage
                  key={message.id}
                  id={message.id}
                  content={message.content}
                />
              );
            }

            return (
              <div key={message.id} style={{ marginBottom: "12px" }}>
                {message.parts.map((part, i) => {
                  switch (part.type) {
                    case "text": {
                      // Function to parse text and convert **text** to bold
                      const renderFormattedText = (text: string) => {
                        const parts = text.split(/(\*\*.*?\*\*)/g);
                        return parts.map((part, index) => {
                          if (part.startsWith("**") && part.endsWith("**")) {
                            // Extract text between ** and render as bold
                            const boldText = part.slice(2, -2);
                            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            return <strong key={index}>{boldText}</strong>;
                          }
                          return part;
                        });
                      };

                      return (
                        <span
                          key={`${message.id}-${i}`}
                          style={{ whiteSpace: "pre-wrap" }}
                        >
                          {renderFormattedText(part.text)}
                        </span>
                      );
                    }
                  }
                })}
              </div>
            );
          })}
          {status === "submitted" && <LoadingSkeleton />}
        </div>
        <ChatInputField
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
