import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Bookmark, Trash2, FileText } from 'lucide-react';

export default function QuestionArea({
  question,
  questionIndex,
  totalQuestionsInSection,
  userAnswer,
  onSelectOption,
  onClearResponse,
  onSaveAndNext,
  onSaveAndMarkForReview,
  onMarkForReviewAndNext,
  onNavigatePrev,
  onNavigateNext,
  fontSize
}) {
  if (!question) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>No question available.</div>;
  }

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="question-panel-wrapper">
      {/* Question Header Status Bar */}
      <div className="question-info-bar">
        <div>
          <span>Question No. {questionIndex + 1}</span>
          <span style={{ margin: '0 8px', color: '#999' }}>|</span>
          <span className="question-type-badge">
            {question.type === 'NUMERICAL' ? 'Numerical Answer Type' : 'Multiple Choice Question (MCQ)'}
          </span>
        </div>

        <div className="marking-scheme-text">
          Marks for correct answer: <span style={{ color: 'green', fontWeight: 'bold' }}>+1</span> | Negative mark: <span style={{ color: '#666', fontWeight: 'bold' }}>0 (No Negative Marking)</span>
        </div>
      </div>

      {/* Main Question & Option Container */}
      <div className="question-content-container" style={{ fontSize: `${fontSize}px` }}>
        {/* Optional Reading Passage / Context Box */}
        {question.passage && (
          <div style={{ background: '#f8f9fa', borderLeft: '4px solid #337ab7', border: '1px solid #e0e0e0', borderLeftWidth: '4px', padding: '14px 18px', borderRadius: '4px', marginBottom: '20px', fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
            <div style={{ fontWeight: 600, color: '#1c3b68', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileText size={16} /> Reference Passage / Comprehension Context:
            </div>
            <div style={{ whiteSpace: 'pre-line' }}>{question.passage}</div>
          </div>
        )}

        {/* Question Text */}
        <div className="question-text-box" style={{ whiteSpace: 'pre-line' }}>
          <span style={{ fontWeight: 'bold', color: '#1c3b68', marginRight: '6px' }}>Q.{questionIndex + 1}</span>
          {question.questionText}
        </div>

        {/* MCQ Options */}
        {question.type === 'MCQ' && (
          <div className="options-list">
            {question.options && question.options.map((optText, optIdx) => {
              const isSelected = userAnswer === optIdx;
              return (
                <div
                  key={optIdx}
                  className={`option-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => onSelectOption(optIdx)}
                >
                  <input
                    type="radio"
                    name={`q-${question.id}`}
                    checked={isSelected}
                    onChange={() => onSelectOption(optIdx)}
                    className="option-radio"
                  />
                  <div className="option-label" style={{ whiteSpace: 'pre-line' }}>
                    <strong style={{ marginRight: '6px' }}>({optionLabels[optIdx]})</strong>
                    {optText}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Numerical Input Type */}
        {question.type === 'NUMERICAL' && (
          <div className="numerical-input-container">
            <label className="numerical-input-label">
              Enter your numerical answer (e.g. integer or decimal):
            </label>
            <input
              type="text"
              value={userAnswer !== undefined && userAnswer !== null ? userAnswer : ''}
              onChange={(e) => onSelectOption(e.target.value)}
              placeholder="Type your answer here..."
              className="numerical-input-field"
            />
            <p style={{ fontSize: '12px', color: '#666', marginTop: '6px' }}>
              Note: Answer should be entered using numbers or decimal points.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Control Action Bar */}
      <div className="bottom-action-bar">
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button className="btn-nta btn-save-mark" onClick={onSaveAndMarkForReview}>
            <Bookmark size={14} /> Save & Mark for Review
          </button>
          
          <button className="btn-nta btn-mark-next" onClick={onMarkForReviewAndNext}>
            Mark for Review & Next
          </button>

          <button className="btn-nta btn-clear" onClick={onClearResponse}>
            <Trash2 size={14} /> Clear Response
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="btn-nta btn-clear" 
            onClick={onNavigatePrev}
            disabled={questionIndex === 0}
            style={{ opacity: questionIndex === 0 ? 0.5 : 1 }}
          >
            <ArrowLeft size={14} /> Back
          </button>

          <button className="btn-nta btn-save-next" onClick={onSaveAndNext}>
            <CheckCircle2 size={14} /> Save & Next <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
