"use client";

import { FormEvent, forwardRef, Ref, useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { Input } from "@puzzlepop2/react-components-input";
import { Flex } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";

const COLOR = "orange";

interface Props {
  onSubmit: (message: string) => void;
}

const ChatInput = (props: Props, ref: Ref<HTMLInputElement>) => {
  const { onSubmit } = props;

  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (message) {
      onSubmit(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        align="center"
        style={{
          position: "relative",
        }}
      >
        <Input
          ref={ref}
          color={COLOR}
          placeholder="채팅"
          value={message}
          onChange={e => setMessage(e.target.value)}
          autoComplete="off"
          style={{
            flex: 1,
            paddingRight: "2rem",
          }}
        />
        <button
          type="submit"
          style={{
            position: "absolute",
            border: "none",
            right: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            cursor: "pointer",
          }}
          aria-label="메시지 전송"
        >
          <FaArrowAltCircleUp
            className="hover-grow"
            color={message ? vars.colors[COLOR][600] : vars.colors.grey[800]}
            style={{
              fontSize: "1rem",
            }}
          />
        </button>
      </Flex>
    </form>
  );
};

const _ChatInput = forwardRef(ChatInput);
export { _ChatInput as ChatInput };
