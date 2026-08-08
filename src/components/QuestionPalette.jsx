import React from 'react';
import { LogOut } from 'lucide-react';

export default function QuestionPalette({
  candidateDetails,
  questions,
  questionStates, // Map of qId -> { status: 'not-visited'|'not-answered'|'answered'|'review'|'ans-review', answer: val }
  currentQuestionIndex,
  onSelectQuestion,
  onSubmitTest
}) {
  // Compute counts for all 5 states across active questions
  const stats = {
    notVisited: 0,
    notAnswered: 0,
    answered: 0,
    review: 0,
    ansReview: 0
  };

  questions.forEach(q => {
    const st = questionStates[q.id]?.status || 'not-visited';
    if (st === 'not-visited') stats.notVisited++;
    else if (st === 'not-answered') stats.notAnswered++;
    else if (st === 'answered') stats.answered++;
    else if (st === 'review') stats.review++;
    else if (st === 'ans-review') stats.ansReview++;
  });

  // Render question shape class based on status
  const getShapeClass = (status) => {
    switch (status) {
      case 'answered': return 'q-shape-answered';
      case 'not-answered': return 'q-shape-not-answered';
      case 'review': return 'q-shape-review';
      case 'ans-review': return 'q-shape-ans-review';
      default: return 'q-shape-not-visited';
    }
  };

  return (
    <aside className="question-palette-sidebar">
      {/* Candidate Profile Box */}
      <div className="candidate-profile-card">
        <div className="candidate-img-box">
          <img src={candidateDetails.candidatePhoto} alt="Candidate" />
        </div>
        <div className="candidate-details">
          <div className="candidate-name">{candidateDetails.candidateName}</div>
          <div>Roll: {candidateDetails.rollNumber}</div>
          <div style={{ fontSize: '11px', color: '#ffeb3b', marginTop: '2px' }}>System: {candidateDetails.systemName}</div>
        </div>
      </div>

      {/* Legend Box with counts */}
      <div className="legend-panel">
        <div className="legend-grid">
          <div className="legend-item" title="Answered">
            <span className="q-box-shape q-shape-answered">{stats.answered}</span>
            <span>Answered</span>
          </div>
          <div className="legend-item" title="Not Answered">
            <span className="q-box-shape q-shape-not-answered">{stats.notAnswered}</span>
            <span>Not Answered</span>
          </div>
          <div className="legend-item" title="Not Visited">
            <span className="q-box-shape q-shape-not-visited">{stats.notVisited}</span>
            <span>Not Visited</span>
          </div>
          <div className="legend-item" title="Marked for Review">
            <span className="q-box-shape q-shape-review">{stats.review}</span>
            <span>Marked for Review</span>
          </div>
          <div className="legend-item" title="Answered & Marked for Review" style={{ gridColumn: 'span 2' }}>
            <span className="q-box-shape q-shape-ans-review">{stats.ansReview}</span>
            <span>Ans & Marked for Review (will be evaluated)</span>
          </div>
        </div>
      </div>

      {/* Question Grid Section Header */}
      <div className="palette-grid-header">
        Question Palette
      </div>

      {/* 1..N Question Buttons Grid */}
      <div className="palette-grid-container">
        {questions.map((q, idx) => {
          const st = questionStates[q.id]?.status || 'not-visited';
          const isCurrent = idx === currentQuestionIndex;
          const shapeClass = getShapeClass(st);

          return (
            <button
              key={q.id}
              className={`q-palette-btn ${isCurrent ? 'active-q' : ''}`}
              onClick={() => onSelectQuestion(idx)}
              title={`Go to Question ${idx + 1}`}
            >
              <span className={`q-box-shape ${shapeClass}`}>
                {idx + 1}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom Submit Test Button */}
      <div style={{ padding: '12px', background: '#ffffff', borderTop: '1px solid var(--nta-border)' }}>
        <button 
          className="btn-nta btn-submit-exam" 
          onClick={onSubmitTest}
          style={{ width: '100%', padding: '12px', fontSize: '15px' }}
        >
          <LogOut size={16} /> SUBMIT TEST
        </button>
      </div>
    </aside>
  );
}
