import React, { useState } from "react";
import image from "../assets/help.jpg";

const HelpDesk = () => {
  const [showContainer, setShowContainer] = useState(false);
  const [activeQuestionId, setActiveQuestionId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const questionsPerPage = 4;
  const questions = [
    {
      id: 1,
      question: "How do I create a new account?",
      answer:
        " To create a new account, add all credentials details and click to the Sign Up.",
    },

    {
      id: 2,
      question: "How do I log in to my account?",
      answer: "Add on your Credentials infromation then click to the Log in out ",
    },
    {
      id: 3,
      question: "If a perso forget pPassword?",
      answer: "Go to log in page there wil be shown like hat forget passwor the fill all term and condiion.",
    },
    {
      id: 4,
      question: "How do I add and update my profile details?",
      answer: "After logging in,click on the profile . Here, you can add and update your personal details",
    },
    {
      id: 5,
      question: "How do I log out of the app?",
      answer: "Click on your profile picture or the user icon at the top right corner of the dashboard , then select logout from the dropdown menu. ",
    },
  ];


  const handleLogoClick = () => {
    setShowContainer(!showContainer);
  };

  const handleQuestionClick = (id) => {
    setActiveQuestionId(id === activeQuestionId ? null : id);
  };

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
    setActiveQuestionId(null); // Reset the active question when loading more
  };

  const handleLoadLess = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setActiveQuestionId(null); // Reset the active question when loading more
    }
  };

  const startIndex = currentPage * questionsPerPage;
  const displayedQuestions = questions.slice(
    startIndex,
    startIndex + questionsPerPage
  );

  return (
    <div className="flex justify-center items-center relative">
      <div>
        <div>
          <h2>Click this help image to get data related to help</h2>
        </div>
        <div className="flex justify-center items-center">
          <img
            src={image}
            alt="Profile Logo"
            className="w-24 h-auto cursor-pointer"
            onClick={handleLogoClick}
          />
        </div>
      </div>
      {showContainer && (
        <div className="absolute top--20 right-0 bg-white p-4 rounded-lg shadow-lg max-w-xs w-full">
          {currentPage >=1 && (
            <button
              className="load-more-button text-blue-500 mt-4"
              onClick={handleLoadLess}
            >
              Load less
            </button>
          )}
          {displayedQuestions.map((question) => (
            <div key={question.id} className="mb-4">
              <button
                className="question-button text-left w-full py-2 border-b border-gray-200"
                onClick={() => handleQuestionClick(question.id)}
              >
                {question.question}
              </button>
              {activeQuestionId === question.id && (
                <div className="mt-2 text-gray-700">{question.answer}</div>
              )}
            </div>
          ))}
          {startIndex + questionsPerPage < questions.length && (
            <button
              className="load-more-button text-blue-500 mt-4"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          )}
          <button
            className="close-button absolute top-2 right-2"
            onClick={handleLogoClick}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default HelpDesk;
