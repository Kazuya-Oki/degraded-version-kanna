export type UserSentMessageType = {
  id: string;
  content: string;
};

export const UserSentMessage = ({ content }: UserSentMessageType) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "12px",
      }}
    >
      <div
        style={{
          backgroundColor: "#00A26A",
          color: "white",
          padding: "10px 15px",
          borderRadius: "18px",
          maxWidth: "70%",
          position: "relative",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
          whiteSpace: "pre-wrap",
        }}
      >
        {content}
      </div>
    </div>
  );
};
