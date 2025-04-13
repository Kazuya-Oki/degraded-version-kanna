import React, { type ChangeEvent, type FormEvent, type KeyboardEvent, useRef, useEffect } from "react";

export type ChatInputFieldProps = {
	input: string;
	placeholder?: string;
	handleInputChange: (e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export const ChatInputField = ({
	input,
	placeholder = "依頼してみましょう",
	handleInputChange,
	handleSubmit,
}: ChatInputFieldProps) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const adjustHeight = () => {
		const textarea = textareaRef.current;
		if (textarea) {
			// Reset height to auto to get the correct scrollHeight
			textarea.style.height = 'auto';
			// Set the height to the scrollHeight
			textarea.style.height = `${textarea.scrollHeight}px`;
		}
	};

	// Adjust height when input changes or component mounts
	useEffect(() => {
		adjustHeight();
	}, [input]);

	// Also adjust height after the component has mounted to handle initial content
	useEffect(() => {
		adjustHeight();
		// Add a small delay to ensure the DOM has fully rendered
		const timeoutId = setTimeout(adjustHeight, 0);
		return () => clearTimeout(timeoutId);
	}, []);


	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		// If Enter is pressed with Command/Meta key, submit the form
		if (e.key === "Enter" && e.metaKey) {
			e.preventDefault();
			const form = e.currentTarget.form;
			if (form) {
				form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
			}
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			style={{
				display: "flex",
				marginTop: "12px",
			}}
		>
			<textarea
				ref={textareaRef}
				value={input}
				placeholder={placeholder}
				onChange={(e) => {
					handleInputChange(e);
					// The height will be adjusted by the useEffect
				}}
				onKeyDown={handleKeyDown}
				rows={1}
				style={{
					flex: 1,
					padding: "10px 15px",
					borderRadius: "20px",
					border: "1px solid #3d444d",
					fontSize: "14px",
					outline: "none",
					backgroundColor: "transparent",
					color: "inherit",
					resize: "none",
					overflow: "auto",
					minHeight: "40px",
					maxHeight: "120px",
					fontFamily: "inherit",
				}}
			/>
			<div>
				<button
					type="submit"
					style={{
						marginLeft: "8px",
						padding: "8px 16px",
						borderRadius: "20px",
						border: "none",
						backgroundColor: "#00A26A",
						color: "white",
						cursor: "pointer",
						fontSize: "14px",
						height: "40px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					送信
				</button>
			</div>
		</form>
	);
};
