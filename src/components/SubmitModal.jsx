import React from 'react';
import { AlertTriangle, Check, X } from 'lucide-react';

export default function SubmitModal({ exam, questionStates, onConfirmSubmit, onClose }) {
  // Compute breakdown for each section
  const sectionStats = exam.sections.map(sec => {
    let answered = 0;
    let notAnswered = 0;
    let review = 0;
    let ansReview = 0;
    let notVisited = 0;

    sec.questions.forEach(q => {
      const st = questionStates[q.id]?.status || 'not-visited';
      if (st === 'answered') answered++;
      else if (st === 'not-answered') notAnswered++;
      else if (st === 'review') review++;
      else if (st === 'ans-review') ansReview++;
      else notVisited++;
    });

    return {
      name: sec.name,
      total: sec.questions.length,
      answered,
      notAnswered,
      review,
      ansReview,
      notVisited
    };
  });

  const totalQuestions = sectionStats.reduce((acc, curr) => acc + curr.total, 0);
  const totalAnswered = sectionStats.reduce((acc, curr) => acc + curr.answered, 0);
  const totalAnsReview = sectionStats.reduce((acc, curr) => acc + curr.ansReview, 0);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '750px' }}>
        <div className="modal-header" style={{ background: '#1c3b68' }}>
          <div className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={20} color="#ffc107" /> Exam Summary & Submission Confirmation
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ fontSize: '14px', marginBottom: '16px', color: '#333' }}>
            Below is the section-wise summary of your responses. Please verify your attempts before final submission.
          </p>

          <table className="summary-table">
            <thead>
              <tr>
                <th>Section Name</th>
                <th>Total Qs</th>
                <th>Answered</th>
                <th>Not Answered</th>
                <th>Marked for Review</th>
                <th>Ans & Marked for Review</th>
                <th>Not Visited</th>
              </tr>
            </thead>
            <tbody>
              {sectionStats.map((stat, idx) => (
                <tr key={idx}>
                  <td style={{ textAlign: 'left', fontWeight: 600 }}>{stat.name}</td>
                  <td>{stat.total}</td>
                  <td style={{ color: 'green', fontWeight: 'bold' }}>{stat.answered}</td>
                  <td style={{ color: 'red', fontWeight: 'bold' }}>{stat.notAnswered}</td>
                  <td style={{ color: 'purple' }}>{stat.review}</td>
                  <td style={{ color: 'purple', fontWeight: 'bold' }}>{stat.ansReview}</td>
                  <td style={{ color: '#666' }}>{stat.notVisited}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '20px', background: '#e8f4fd', border: '1px solid #bce8f1', padding: '12px', borderRadius: '6px', color: '#31708f', fontSize: '13px' }}>
            <strong>Note:</strong> Total Questions Answered for Evaluation: <strong>{totalAnswered + totalAnsReview}</strong> out of {totalQuestions}. Once submitted, you cannot modify your answers.
          </div>

          <div style={{ marginTop: '16px', textAlign: 'center', fontWeight: 600, color: '#cc0000', fontSize: '15px' }}>
            Are you sure you want to submit this test paper?
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-nta btn-clear" onClick={onClose}>
            <X size={16} /> No, Return to Test
          </button>
          
          <button className="btn-nta btn-submit-exam" onClick={onConfirmSubmit}>
            <Check size={16} /> Yes, Final Submit
          </button>
        </div>
      </div>
    </div>
  );
}
