"use client";

export default function QuestionCard({
  question,
  index,
  imagePath,
}) {
  return (
    <div className="question-card">

      <div className="question-number">
        Domanda {index}
      </div>

      <div className="question-body">

        {imagePath && (
          <div className="question-image-wrapper">

            <img
              src={imagePath}
              alt=""
              className="question-image"
            />

          </div>
        )}

        <h2 className="question-text">
          {question}
        </h2>

      </div>

    </div>
  );
}