import React, { useState } from 'react';
import styles from './Quiz.module.css';

function Quiz({ quizData, onQuizComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = quizData.questions[currentQuestionIndex];

  const handleOptionSelect = (optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Convert selectedAnswers object to a simple array
    const answers = quizData.questions.map((_, index) => selectedAnswers[index] ?? null);
    await onQuizComplete(answers);
    setIsSubmitting(false);
  };

  const isAllAnswered = Object.keys(selectedAnswers).length === quizData.questions.length;

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizHeader}>
        <h2>{quizData.title}</h2>
        <p>Pertanyaan {currentQuestionIndex + 1} dari {quizData.questions.length}</p>
      </div>

      <div className={styles.questionCard}>
        <h3>{currentQuestion.question}</h3>
        <div className={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`${styles.optionButton} ${
                selectedAnswers[currentQuestionIndex] === index ? styles.selected : ''
              }`}
              onClick={() => handleOptionSelect(index)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.navigationButtons}>
        <button onClick={handleBack} disabled={currentQuestionIndex === 0}>
          Kembali
        </button>
        {currentQuestionIndex < quizData.questions.length - 1 ? (
          <button onClick={handleNext}>
            Selanjutnya
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={!isAllAnswered || isSubmitting}>
            {isSubmitting ? 'Menilai...' : 'Selesaikan Kuis'}
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;
