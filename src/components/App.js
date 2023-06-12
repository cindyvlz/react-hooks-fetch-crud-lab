import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = () => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  };

  const handleCreateQuestion = (questionData) => {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionData),
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestions([...questions, data]);
        setPage("List");
      })
      .catch((error) => {
        console.error("Error creating question:", error);
      });
  };

  const handleDeleteQuestion = (questionId) => {
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "DELETE",
    }).then(() => {
      setQuestions(questions.filter((question) => question.id !== questionId));
    });
  };

  const handleUpdateQuestion = (questionId, updatedData) => {
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedQuestions = questions.map((question) =>
          question.id === questionId ? { ...question, ...data } : question
        );
        setQuestions(updatedQuestions);
      })
      .catch((error) => {
        console.error("Error updating question:", error);
      });
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm  onCreateQuestion={handleCreateQuestion}/> ) : ( 
        <QuestionList 
        questions={questions}
        onDeleteQuestion={handleDeleteQuestion}
        onUpdateQuestion={handleUpdateQuestion}
        />
      ) }
    </main>
  );
}

export default App;
