import React, { useState }from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedAnswer, setSelectedAnswer] = useState(correctIndex);

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleDelete = () => {
    onDeleteQuestion(id);
  };

  const handleUpdate = (event) => {
    const updatedData = {
      correctIndex: parseInt(event.target.value, 10),
    };
    setSelectedAnswer(updatedData.correctIndex);
    onUpdateQuestion(id, updatedData);
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={selectedAnswer} onChange={handleUpdate}>
          {options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;