import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Button from "@/components/Button";
import Modal from "@/components/Modal";

const Test = () => {
  const router = useRouter();

  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [modalOpen, setModalOpen] = useState<Number>(-1);

  const onQ1Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQ1(e.target.value);
  };

  const onQ2Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQ2(e.target.value);
  };

  const onQ3Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQ3(e.target.value);
  };

  const submitQuestion = async () => {
    const response = await axios.post(
      "https://0bf0-1-229-150-242.ngrok-free.app/doctor/feedback",
      [q1, q2, q3]
    );
    console.log(response.data);
    response.data.status === 200 && setModalOpen(1);
  };

  useEffect(() => {
    if (modalOpen === 0) {
      router.push("/doctor/model");
    }
  }, [modalOpen]);

  return (
    <div className="test">
      <div className="test-wrapper">
        <div>
          <p>1. 이 시각적 설명에서 누락된 정보는 무엇인가요?</p>
          <textarea value={q1} onChange={onQ1Change} />
        </div>
        <div>
          <p>
            2. 이 설명이 이해하기 쉽나요? 이해가 안된 부분이 있다면 어떤
            부분인가요?
          </p>
          <textarea value={q2} onChange={onQ2Change} />
        </div>
        <div>
          <p>
            3. 서비스를 이용하시면서 어려웠던 점이 있나요? 있다면 무엇인가요?
          </p>
          <textarea value={q3} onChange={onQ3Change} />
        </div>
      </div>
      <div style={{ marginTop: "5em" }}>
        <Button
          primary="sub"
          size="xsmall"
          label="제출하기"
          onClick={submitQuestion}
        />
        {modalOpen === 1 && (
          <Modal setModalOpen={setModalOpen}>감사합니다!</Modal>
        )}
      </div>
    </div>
  );
};

export default Test;
