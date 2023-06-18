import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Colors,
  BarElement,
} from "chart.js";

import Button from "@/components/Button";
import Modal from "@/components/Modal";

const Model = () => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Colors);

  const [diagnoseID, setDiagnoseID] = useState<Number>(0);
  const [fileValue, setFileValue] = useState<string>("");
  const [gradcamImage, setGradcamImage] = useState<string>("");
  const [prediction, setPrediction] = useState<string>("");
  const [modelID, setModelID] = useState<Number>(1);
  const [chartKey, setChartKey] = useState<Array<string>>([]);
  const [chartValue, setChartValue] = useState<Array<Number>>([]);
  const [modalOpen, setModalOpen] = useState<Number>(0);

  const modelDescription =
    "D&D는 ResNet 모델(Residual neural network)을 사용합니다. ResNet은 잔차 학습이라는 개념으로 모델의 층이 깊어져도 학습이 잘 되도록 구현된 모델입니다. 잔차 학습은 입력과 출력의 차이를 학습해서 네트워크를 훈련시키는 방법입니다. 이로써 신경망의 하위 층으로 전달될수록 그래디언트 값(모델의 결과에 영향을 주는 값)이 작아지는 문제를 개선할 수 있어, 이미지 분류, 객체 검출 등의 작업에 유용하게 사용되고 있습니다.";

  const modelList = [
    { id: 0, title: "RISE" },
    { id: 1, title: "Grad CAM" },
    { id: 2, title: "Score CAM" },
  ];

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    let imageData = e.target.files[0];
    let formData = new FormData();
    formData.append("image", imageData);
    const response = await axios.post(
      "https://0bf0-1-229-150-242.ngrok-free.app/doctor/predict_image",
      formData
    );

    setDiagnoseID(response.data.id);
    setGradcamImage(response.data.gradcam_image_urls[0]);
    setPrediction(response.data.prediction);

    setChartKey(Object.keys(response.data.class_probabilities));
    setChartValue(
      Object.values(response.data.class_probabilities).map((data: any) =>
        Number(data.slice(0, data.length - 1))
      )
    );

    setFileValue(URL.createObjectURL(imageData));
  };

  const onModelChange = (id: Number) => {
    setModelID(id);
    id === 1 ? setModalOpen(0) : setModalOpen(1);
  };

  return (
    <div className="model flex-row">
      <div className="model-file flex-center">
        {fileValue !== "" ? (
          <img
            className="model-file-custom"
            src={fileValue}
            alt="result"
            width={"100%"}
            height={"100%"}
          />
        ) : (
          <label htmlFor="file" className="model-file-custom">
            +
          </label>
        )}
        <input type="file" id="file" onChange={onFileChange} />
      </div>
      <div className="model-result">
        <div>
          <h3>진단 모델 / 시각화 방법 선택</h3>
          <div className="model-description">{modelDescription}</div>
          <div className="button-wrapper flex-row">
            {modelList.map((model) => (
              <Button
                primary="secondary"
                size="xsmall"
                label={model.title}
                key={model.id}
                active={Number(model.id) === modelID ? true : false}
                onClick={() => onModelChange(Number(model.id))}
              />
            ))}
            {modalOpen === 1 && (
              <Modal setModalOpen={setModalOpen}>
                아직 지원하지 않는 기능입니다.
              </Modal>
            )}
          </div>
        </div>
        <div>
          <h3>진단 결과</h3>
          {gradcamImage !== "" && prediction !== "" ? (
            <>
              <div
                style={{
                  marginBottom: "15px",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
              >
                가능성이 가장 높은 결과:{" "}
                <div style={{ fontWeight: 700 }}>{prediction}</div>
              </div>
              <div style={{ marginTop: "50px" }}>
                <Bar
                  data={{
                    labels: chartKey,
                    datasets: [
                      {
                        data: chartValue,
                        backgroundColor: [
                          "#0079FF",
                          "#00DFA2",
                          "#F6FA70",
                          "#FF0060",
                          "#D9F8C4",
                          "#FAD9A1",
                          "#F37878",
                        ],
                      },
                    ],
                  }}
                  width={"100%"}
                  height={50}
                />
              </div>
              <h3>결과 근거</h3>
              <img
                className="model-gradcam"
                src={gradcamImage}
                alt="result"
                width={"100%"}
                height={300}
              />
            </>
          ) : (
            <div>진단 이미지를 입력하세요.</div>
          )}
        </div>
        <div className="model-feedback-wrapper">
          {diagnoseID !== 0 ? (
            <Link
              href={{
                pathname: "/doctor/test",
                query: { id: String(diagnoseID) },
              }}
            >
              <Button primary="sub" size="xsmall" label="피드백하기" />
            </Link>
          ) : (
            <Button primary="sub" size="xsmall" label="피드백하기" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Model;
