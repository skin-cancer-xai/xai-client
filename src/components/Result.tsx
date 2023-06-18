import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const ResultFeedback = () => {
  const router = useRouter();

  const [inputImage, setInputImage] = useState<string>("");
  const [gradcamImage, setGradcamImage] = useState<string>("");
  const [feedback, setFeedback] = useState<Array<string>>([]);

  useEffect(() => {
    const id = router.query.id;

    const getResult = async () => {
      const response = await axios.get(
        `https://0bf0-1-229-150-242.ngrok-free.app/developer/result?id=${id}`,
        {
          headers: {
            "Content-Type": `application/json`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      console.log(response);
      setInputImage(response.data.image);
      setGradcamImage(response.data.gradcam_image);
    };

    const getFeedback = async () => {
      const response = await axios.get(
        `https://0bf0-1-229-150-242.ngrok-free.app/developer/feedback?id=${id}`,
        {
          headers: {
            "Content-Type": `application/json`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      console.log(response);
      setFeedback(response.data.feedback);
    };

    if (id !== undefined) {
      getResult();
      getFeedback();
    }
  }, []);

  return (
    <div className="result-feedback">
      <div>
        <p style={{ fontSize: "10px" }}>{`진단ID: ${router.query.id}`}</p>
        <h2>진단 보고서</h2>
        <img src={inputImage} alt="error" width={400} height={200} />
        <h3>시각화 방식</h3>
        <p>Grad CAM</p>
        <img src={gradcamImage} alt="error" width={400} height={200} />
      </div>
      <div className="right">
        <h3>평가 결과</h3>
        <div>
          <p className="question">
            1. 이 시각적 설명에서 누락된 정보는 무엇인가요?
          </p>
          <p className="answer">{feedback[0]}</p>
        </div>
        <div>
          <p className="question">
            2. 이 설명이 이해하기 쉽나요? 이해가 안된 부분이 있다면 어떤
            부분인가요?
          </p>
          <p className="answer">{feedback[1]}</p>
        </div>
        <div>
          <p className="question">
            3. 서비스를 이용하시면서 어려웠던 점이 있나요? 있다면 무엇인가요?
          </p>
          <p className="answer">{feedback[2]}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultFeedback;
