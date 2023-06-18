import React from "react";

interface CardProps {
  imgUrl: string;
  id: string;
  hospital: string;
  date: string;
}

const DiagnosisCard = ({ imgUrl, id, hospital, date }: CardProps) => {
  return (
    <div className="diagnosisCard">
      <div>
        <img src={imgUrl} alt="error" width={"100%"} height={150} />
      </div>
      <div className="diagnosisCard-padding">
        <div>{`진단ID: ${id}`}</div>
        <div className="diagnosisCard-footer">
          <div>{date}</div>
          <div>{hospital}</div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisCard;
