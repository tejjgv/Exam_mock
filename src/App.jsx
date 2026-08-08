import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LoginScreen from './components/LoginScreen';
import InstructionsScreen from './components/InstructionsScreen';
import QuestionArea from './components/QuestionArea';
import QuestionPalette from './components/QuestionPalette';
import QuestionPaperModal from './components/QuestionPaperModal';
import SubmitModal from './components/SubmitModal';
import ResultScreen from './components/ResultScreen';
import { MOCK_EXAMS } from './data/mockExams';

export default function App() {
  // App views: 'LOGIN' | 'INSTRUCTIONS' | 'EXAM' | 'RESULT'
  const [currentView, setCurrentView] = useState('LOGIN');

  // Selected Exam & Candidate Info
  const [activeExam, setActiveExam] = useState(MOCK_EXAMS[0]);
  const [candidateDetails, setCandidateDetails] = useState({
    candidateName: 'John Doe',
    rollNumber: '240310084920',
    candidatePhoto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    systemName: 'C001'
  });

  // Current Active Section & Question Indices
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  // Question States: Map of q.id -> { status: 'not-visited'|'not-answered'|'answered'|'review'|'ans-review', answer: val }
  const [questionStates, setQuestionStates] = useState({});

  // Active transient answer input before clicking Save
  const [transientAnswer, setTransientAnswer] = useState(null);

  // Timer state
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(180 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Font size & Language & Modals
  const [fontSize, setFontSize] = useState(15);
  const [language, setLanguage] = useState('English');
  const [showQuestionPaperModal, setShowQuestionPaperModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Initialize Exam Session
  const initExamSession = (examObj, details) => {
    setActiveExam(examObj);
    if (details) setCandidateDetails(details);

    // Initialize all question states to 'not-visited'
    const initialStates = {};
    examObj.sections.forEach(sec => {
      sec.questions.forEach(q => {
        initialStates[q.id] = {
          status: 'not-visited',
          answer: null
        };
      });
    });

    // Mark first question of first section as 'not-answered' (visited)
    const firstQId = examObj.sections[0]?.questions[0]?.id;
    if (firstQId) {
      initialStates[firstQId].status = 'not-answered';
    }

    setQuestionStates(initialStates);
    setActiveSectionIdx(0);
    setCurrentQuestionIdx(0);
    setTransientAnswer(null);
    setTimeLeftSeconds(examObj.durationMinutes * 60);
    setCurrentView('INSTRUCTIONS');
  };

  // Custom Exam Upload Handler
  const handleCustomExamUpload = (customExam, details) => {
    initExamSession(customExam, details);
  };

  // Start Timer when entering EXAM view
  useEffect(() => {
    let timerInterval = null;
    if (currentView === 'EXAM' && isTimerRunning) {
      timerInterval = setInterval(() => {
        setTimeLeftSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            handleFinalSubmit(); // Auto submit when time reaches 0!
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [currentView, isTimerRunning]);

  // Current active section and question objects
  const activeSection = activeExam.sections[activeSectionIdx] || activeExam.sections[0];
  const activeQuestions = activeSection ? activeSection.questions : [];
  const currentQuestion = activeQuestions[currentQuestionIdx];

  // Sync transient answer whenever active question changes
  useEffect(() => {
    if (currentQuestion) {
      const existingState = questionStates[currentQuestion.id];
      setTransientAnswer(existingState?.answer !== undefined ? existingState.answer : null);
    }
  }, [currentQuestionIdx, activeSectionIdx, currentQuestion]);

  // Action: Change Section Tab
  const handleSectionChange = (secIdx) => {
    setActiveSectionIdx(secIdx);
    setCurrentQuestionIdx(0);
    const newSectionQ = activeExam.sections[secIdx]?.questions[0];
    if (newSectionQ) {
      setQuestionStates(prev => {
        const curr = prev[newSectionQ.id] || {};
        if (curr.status === 'not-visited') {
          return { ...prev, [newSectionQ.id]: { ...curr, status: 'not-answered' } };
        }
        return prev;
      });
    }
  };

  // Helper to move to next question or next section
  const navigateToNextQuestion = () => {
    if (currentQuestionIdx < activeQuestions.length - 1) {
      const nextIdx = currentQuestionIdx + 1;
      setCurrentQuestionIdx(nextIdx);
      const nextQ = activeQuestions[nextIdx];
      markVisitedIfNeeded(nextQ.id);
    } else if (activeSectionIdx < activeExam.sections.length - 1) {
      const nextSecIdx = activeSectionIdx + 1;
      setActiveSectionIdx(nextSecIdx);
      setCurrentQuestionIdx(0);
      const nextQ = activeExam.sections[nextSecIdx].questions[0];
      markVisitedIfNeeded(nextQ.id);
    }
  };

  const markVisitedIfNeeded = (qId) => {
    setQuestionStates(prev => {
      const curr = prev[qId] || {};
      if (curr.status === 'not-visited') {
        return { ...prev, [qId]: { ...curr, status: 'not-answered' } };
      }
      return prev;
    });
  };

  // Control Actions: Save & Next
  const handleSaveAndNext = () => {
    if (!currentQuestion) return;
    const hasAnswer = transientAnswer !== null && transientAnswer !== undefined && transientAnswer !== '';
    const newStatus = hasAnswer ? 'answered' : 'not-answered';

    setQuestionStates(prev => ({
      ...prev,
      [currentQuestion.id]: {
        status: newStatus,
        answer: hasAnswer ? transientAnswer : null
      }
    }));

    navigateToNextQuestion();
  };

  // Control Actions: Clear Response
  const handleClearResponse = () => {
    if (!currentQuestion) return;
    setTransientAnswer(null);
    setQuestionStates(prev => ({
      ...prev,
      [currentQuestion.id]: {
        status: 'not-answered',
        answer: null
      }
    }));
  };

  // Control Actions: Save & Mark for Review
  const handleSaveAndMarkForReview = () => {
    if (!currentQuestion) return;
    const hasAnswer = transientAnswer !== null && transientAnswer !== undefined && transientAnswer !== '';
    const newStatus = hasAnswer ? 'ans-review' : 'review';

    setQuestionStates(prev => ({
      ...prev,
      [currentQuestion.id]: {
        status: newStatus,
        answer: hasAnswer ? transientAnswer : null
      }
    }));

    navigateToNextQuestion();
  };

  // Control Actions: Mark for Review & Next
  const handleMarkForReviewAndNext = () => {
    if (!currentQuestion) return;
    const hasAnswer = transientAnswer !== null && transientAnswer !== undefined && transientAnswer !== '';
    const newStatus = hasAnswer ? 'ans-review' : 'review';

    setQuestionStates(prev => ({
      ...prev,
      [currentQuestion.id]: {
        status: newStatus,
        answer: hasAnswer ? transientAnswer : null
      }
    }));

    navigateToNextQuestion();
  };

  // Palette Click Handler
  const handleSelectQuestionFromPalette = (qIdx) => {
    setCurrentQuestionIdx(qIdx);
    const selectedQ = activeQuestions[qIdx];
    if (selectedQ) {
      markVisitedIfNeeded(selectedQ.id);
    }
  };

  // Confirm Final Submit
  const handleFinalSubmit = () => {
    setIsTimerRunning(false);
    setShowSubmitModal(false);
    setCurrentView('RESULT');
  };

  return (
    <div className="app-container">
      {/* LOGIN VIEW */}
      {currentView === 'LOGIN' && (
        <LoginScreen
          onStartExam={({ exam, candidateName, rollNumber, candidatePhoto, systemName }) => {
            initExamSession(exam, { candidateName, rollNumber, candidatePhoto, systemName });
          }}
          onCustomExamUpload={handleCustomExamUpload}
        />
      )}

      {/* INSTRUCTIONS VIEW */}
      {currentView === 'INSTRUCTIONS' && (
        <InstructionsScreen
          exam={activeExam}
          candidateDetails={candidateDetails}
          onProceedToExam={() => {
            setIsTimerRunning(true);
            setCurrentView('EXAM');
          }}
          onBackToLogin={() => setCurrentView('LOGIN')}
        />
      )}

      {/* EXAM CBT MAIN VIEW */}
      {currentView === 'EXAM' && (
        <>
          {/* Header Component */}
          <Header
            examTitle={activeExam.title}
            timeLeftSeconds={timeLeftSeconds}
            candidateName={candidateDetails.candidateName}
            candidatePhoto={candidateDetails.candidatePhoto}
            systemName={candidateDetails.systemName}
            fontSize={fontSize}
            setFontSize={setFontSize}
            language={language}
            setLanguage={setLanguage}
            onOpenInstructions={() => setShowInstructionsModal(true)}
            onOpenQuestionPaper={() => setShowQuestionPaperModal(true)}
            onSwitchExam={() => {
              if (window.confirm("Are you sure you want to exit the test session? Progress will be lost.")) {
                setCurrentView('LOGIN');
              }
            }}
          />

          {/* Section Selector Tabs Bar */}
          <div className="nta-subheader">
            <div className="section-tabs">
              {activeExam.sections.map((sec, idx) => (
                <button
                  key={sec.id}
                  className={`section-tab-btn ${idx === activeSectionIdx ? 'active' : ''}`}
                  onClick={() => handleSectionChange(idx)}
                >
                  {sec.name}
                </button>
              ))}
            </div>

            <div style={{ fontSize: '13px', color: '#555', fontWeight: 500 }}>
              Section Instructions: {activeSection.instructions}
            </div>
          </div>

          {/* Main Body Grid */}
          <main className="exam-main-body">
            <QuestionArea
              question={currentQuestion}
              questionIndex={currentQuestionIdx}
              totalQuestionsInSection={activeQuestions.length}
              userAnswer={transientAnswer}
              onSelectOption={(val) => setTransientAnswer(val)}
              onClearResponse={handleClearResponse}
              onSaveAndNext={handleSaveAndNext}
              onSaveAndMarkForReview={handleSaveAndMarkForReview}
              onMarkForReviewAndNext={handleMarkForReviewAndNext}
              onNavigatePrev={() => {
                if (currentQuestionIdx > 0) {
                  setCurrentQuestionIdx(prev => prev - 1);
                }
              }}
              onNavigateNext={navigateToNextQuestion}
              fontSize={fontSize}
            />

            <QuestionPalette
              candidateDetails={candidateDetails}
              questions={activeQuestions}
              questionStates={questionStates}
              currentQuestionIndex={currentQuestionIdx}
              onSelectQuestion={handleSelectQuestionFromPalette}
              onSubmitTest={() => setShowSubmitModal(true)}
            />
          </main>
        </>
      )}

      {/* RESULT VIEW */}
      {currentView === 'RESULT' && (
        <ResultScreen
          exam={activeExam}
          questionStates={questionStates}
          candidateDetails={candidateDetails}
          onRestart={() => initExamSession(activeExam, candidateDetails)}
          onNewTest={() => setCurrentView('LOGIN')}
        />
      )}

      {/* MODALS */}
      {showQuestionPaperModal && (
        <QuestionPaperModal
          exam={activeExam}
          onClose={() => setShowQuestionPaperModal(false)}
        />
      )}

      {showInstructionsModal && (
        <InstructionsScreen
          exam={activeExam}
          candidateDetails={candidateDetails}
          onProceedToExam={() => setShowInstructionsModal(false)}
          onBackToLogin={() => setShowInstructionsModal(false)}
        />
      )}

      {showSubmitModal && (
        <SubmitModal
          exam={activeExam}
          questionStates={questionStates}
          onConfirmSubmit={handleFinalSubmit}
          onClose={() => setShowSubmitModal(false)}
        />
      )}
    </div>
  );
}
