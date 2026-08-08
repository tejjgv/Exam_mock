import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, HelpCircle, RefreshCw, ArrowLeft, Download, Eye } from 'lucide-react';

export default function ResultScreen({ exam, questionStates, candidateDetails, onRestart, onNewTest }) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  let totalScore = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  // Max possible marks = 1 mark per question (No negative marking)
  const maxPossibleMarks = exam.sections.reduce((acc, sec) => acc + (sec.questions.length * 1), 0);

  const evaluatedQuestions = [];

  exam.sections.forEach(sec => {
    sec.questions.forEach(q => {
      const qState = questionStates[q.id];
      const userAns = qState?.answer;
      const isEvaluated = qState?.status === 'answered' || qState?.status === 'ans-review';
      
      let status = 'UNANSWERED';
      let marksAwarded = 0;

      if (isEvaluated && userAns !== undefined && userAns !== null && userAns !== '') {
        let isCorrect = false;
        if (q.type === 'MCQ') {
          isCorrect = String(userAns) === String(q.correctAnswer);
        } else if (q.type === 'NUMERICAL') {
          isCorrect = String(userAns).trim() === String(q.correctAnswer).trim();
        }

        if (isCorrect) {
          status = 'CORRECT';
          marksAwarded = 1;
          correctCount++;
          totalScore += 1;
        } else {
          status = 'INCORRECT';
          marksAwarded = 0; // No negative marking!
          incorrectCount++;
        }
      } else {
        unansweredCount++;
      }

      evaluatedQuestions.push({
        ...q,
        sectionName: sec.name,
        userAnswer: userAns,
        evaluationStatus: status,
        marksAwarded
      });
    });
  });

  const totalAttempted = correctCount + incorrectCount;
  const accuracyPercentage = totalAttempted > 0 ? ((correctCount / totalAttempted) * 100).toFixed(1) : "0.0";
  const scorePercentage = maxPossibleMarks > 0 ? ((totalScore / maxPossibleMarks) * 100).toFixed(1) : "0.0";

  const filteredQuestions = evaluatedQuestions.filter(q => {
    if (activeFilter === 'CORRECT') return q.evaluationStatus === 'CORRECT';
    if (activeFilter === 'INCORRECT') return q.evaluationStatus === 'INCORRECT';
    if (activeFilter === 'UNANSWERED') return q.evaluationStatus === 'UNANSWERED';
    return true;
  });

  const exportResultJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      candidateDetails,
      examTitle: exam.title,
      totalScore,
      maxPossibleMarks,
      accuracyPercentage,
      scorePercentage,
      evaluatedQuestions
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Test_Result_${candidateDetails.rollNumber}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f9', paddingBottom: '40px' }}>
      {/* Header Bar */}
      <header className="nta-header">
        <div className="nta-header-left">
          <div className="nta-logo-badge"><Award size={18} /> EXAM RESULT</div>
          <div className="nta-exam-title">{exam.title} - Scorecard & Performance Analysis</div>
        </div>
        <div className="nta-header-right">
          <button className="btn-nta-small" onClick={onNewTest} style={{ background: '#ffffff', color: '#1c3b68' }}>
            <ArrowLeft size={14} /> Start New Test
          </button>
        </div>
      </header>

      <div className="result-container">
        {/* Scorecard Hero Banner */}
        <div className="score-banner">
          <div className="score-metric">
            <div className="metric-label">Candidate Name</div>
            <div style={{ fontSize: '20px', fontWeight: 600, marginTop: '4px' }}>{candidateDetails.candidateName}</div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>Roll: {candidateDetails.rollNumber}</div>
          </div>

          <div className="score-metric" style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', borderRight: '1px solid rgba(255,255,255,0.2)', padding: '0 24px' }}>
            <div className="metric-label">Total Score</div>
            <div className="metric-value">{totalScore} <span style={{ fontSize: '18px', opacity: 0.8 }}>/ {maxPossibleMarks}</span></div>
            <div style={{ fontSize: '13px', marginTop: '2px' }}>Percentage: {scorePercentage}%</div>
          </div>

          <div className="score-metric">
            <div className="metric-label">Accuracy</div>
            <div className="metric-value">{accuracyPercentage}%</div>
            <div style={{ fontSize: '12px', opacity: 0.9, marginTop: '2px' }}>
              Attempted: {totalAttempted} / {evaluatedQuestions.length}
            </div>
          </div>
        </div>

        {/* Quick Performance Breakdown Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          <div style={{ background: 'white', borderLeft: '4px solid #28a745', padding: '16px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ color: '#28a745', fontWeight: 600, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} /> CORRECT ANSWERS
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, marginTop: '6px' }}>{correctCount}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>+{correctCount * 1} Marks</div>
          </div>

          <div style={{ background: 'white', borderLeft: '4px solid #dc3545', padding: '16px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ color: '#dc3545', fontWeight: 600, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <XCircle size={16} /> INCORRECT ANSWERS
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, marginTop: '6px' }}>{incorrectCount}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>0 Negative Marks</div>
          </div>

          <div style={{ background: 'white', borderLeft: '4px solid #6c757d', padding: '16px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ color: '#6c757d', fontWeight: 600, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <HelpCircle size={16} /> UNANSWERED
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, marginTop: '6px' }}>{unansweredCount}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>0 Marks</div>
          </div>
        </div>

        {/* Action Controls Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className={`btn-nta ${activeFilter === 'ALL' ? 'btn-mark-next' : 'btn-clear'}`} onClick={() => setActiveFilter('ALL')}>
              All Questions ({evaluatedQuestions.length})
            </button>
            <button className={`btn-nta ${activeFilter === 'CORRECT' ? 'btn-save-next' : 'btn-clear'}`} onClick={() => setActiveFilter('CORRECT')}>
              Correct ({correctCount})
            </button>
            <button className={`btn-nta ${activeFilter === 'INCORRECT' ? 'btn-save-mark' : 'btn-clear'}`} onClick={() => setActiveFilter('INCORRECT')}>
              Incorrect ({incorrectCount})
            </button>
            <button className={`btn-nta ${activeFilter === 'UNANSWERED' ? 'btn-mark-next' : 'btn-clear'}`} onClick={() => setActiveFilter('UNANSWERED')}>
              Unanswered ({unansweredCount})
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-nta btn-clear" onClick={exportResultJSON}>
              <Download size={15} /> Export JSON
            </button>
            <button className="btn-nta btn-save-next" onClick={onRestart}>
              <RefreshCw size={15} /> Re-attempt Test
            </button>
          </div>
        </div>

        {/* Detailed Solutions Viewer List */}
        <h3 style={{ color: '#1c3b68', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Eye size={20} /> Question-by-Question Detailed Solutions
        </h3>

        {filteredQuestions.map((q, idx) => {
          const isCorrect = q.evaluationStatus === 'CORRECT';
          const isIncorrect = q.evaluationStatus === 'INCORRECT';

          return (
            <div key={q.id} className="question-review-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontWeight: 600, fontSize: '13px', color: '#337ab7' }}>
                  Section: {q.sectionName} | Q{idx + 1}
                </span>

                <div>
                  {isCorrect && <span className="review-correct-badge">✔ Correct (+1)</span>}
                  {isIncorrect && <span className="review-wrong-badge">✖ Incorrect (0)</span>}
                  {!isCorrect && !isIncorrect && <span style={{ background: '#e2e3e5', color: '#383d41', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>Unanswered (0)</span>}
                </div>
              </div>

              <div style={{ fontWeight: 500, fontSize: '15px', color: '#111', marginBottom: '12px' }}>
                {q.questionText}
              </div>

              {/* Options Breakdown */}
              {q.type === 'MCQ' && q.options && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: '10px 0' }}>
                  {q.options.map((optText, oIdx) => {
                    const isUserChoice = String(q.userAnswer) === String(oIdx);
                    const isCorrectChoice = String(q.correctAnswer) === String(oIdx);

                    let bg = '#f9f9f9';
                    let border = '1px solid #ddd';

                    if (isCorrectChoice) {
                      bg = '#d4edda';
                      border = '1px solid #c3e6cb';
                    } else if (isUserChoice && !isCorrectChoice) {
                      bg = '#f8d7da';
                      border = '1px solid #f5c6cb';
                    }

                    return (
                      <div key={oIdx} style={{ padding: '8px 12px', borderRadius: '4px', background: bg, border, fontSize: '14px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>
                          <strong>({optionLabels[oIdx]})</strong> {optText}
                        </span>
                        {isCorrectChoice && <span style={{ color: 'green', fontWeight: 'bold' }}>✓ Correct Answer</span>}
                        {isUserChoice && !isCorrectChoice && <span style={{ color: 'red', fontWeight: 'bold' }}>✗ Your Choice</span>}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Numerical Response Breakdown */}
              {q.type === 'NUMERICAL' && (
                <div style={{ margin: '10px 0', fontSize: '14px' }}>
                  <div>Your Answer: <strong>{q.userAnswer || 'None'}</strong></div>
                  <div>Correct Answer: <strong style={{ color: 'green' }}>{q.correctAnswer}</strong></div>
                </div>
              )}

              {/* Explanation Box */}
              {q.explanation && (
                <div className="review-explanation-box">
                  <strong>Solution / Explanation:</strong>
                  <p style={{ marginTop: '4px', lineHeight: '1.5' }}>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
