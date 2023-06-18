import React from "react";
import Link from "next/link";

import DiagnosisCard from "@/components/DiagnosisCard";

interface resultType {
  id: Number;
  date: string;
  image: string;
  gradcam_image: string;
}

interface resultPropsType {
  results: Array<resultType>;
}

const ResultList = ({ results }: { results: resultPropsType }) => {
  return (
    <div className="resultList">
      <h3>진단 결과 목록</h3>
      <div className="resultList-container">
        <div className="resultList-wrapper">
          {results.results.map((result) => (
            <Link href={`/developer/${result.id}`}>
              <DiagnosisCard
                imgUrl={result.image}
                id={String(result.id)}
                hospital="아주대병원"
                date={result.date.split(" ")[0]}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultList;

export async function getStaticProps() {
  const res = await fetch(
    "https://0bf0-1-229-150-242.ngrok-free.app/developer/resultList",
    {
      headers: {
        "Content-Type": `application/json`,
        "ngrok-skip-browser-warning": "69420",
      },
    }
  );
  const results = await res.json();

  return {
    props: {
      results,
    },
  };
}
