import React,{useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("http://localhost:4000/questions");
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await fetch(`http://localhost:4000/questions/${questionId}`, {
        method: "DELETE",
      });
      const updatedQuestions = questions.filter(
        (question) => question.id !== questionId
      );
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleUpdateQuestion = async (questionId, updatedData) => {
    try {
      await fetch(`http://localhost:4000/questions/${questionId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const updatedQuestions = questions.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            ...updatedData,
          };
        }
        return question;
      });
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      < ul> 
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDeleteQuestion={handleDeleteQuestion}
            onUpdateQuestion={handleUpdateQuestion}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;