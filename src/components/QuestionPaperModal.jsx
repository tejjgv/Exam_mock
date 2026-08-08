import React from 'react';
import { X, Printer } from 'lucide-react';

export default function QuestionPaperModal({ exam, onClose }) {
  const handlePrint = () => {
    window.print();
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px' }}>
        <div className="modal-header">
          <div className="modal-title">Question Paper - {exam.title}</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" id="printable-question-paper">
          <div style={{ textAlign: 'center', borderBottom: '2px solid #337ab7', paddingBottom: '12px', marginBottom: '20px' }}>
            <h2>ONLINE TEST PRACTISER</h2>
            <h3>{exam.title}</h3>
            <p style={{ color: '#666', fontSize: '13px', marginTop: '4px' }}>
              Duration: {exam.durationMinutes} Minutes | Max Marks: {exam.totalMarks}
            </p>
          </div>

          {exam.sections.map((section, secIdx) => (
            <div key={section.id} style={{ marginBottom: '30px' }}>
              <h3 style={{ background: '#e7f1fc', color: '#1c3b68', padding: '8px 12px', borderRadius: '4px', marginBottom: '16px' }}>
                Section {secIdx + 1}: {section.name}
              </h3>

              {section.questions.map((q, qIdx) => (
                <div key={q.id} style={{ marginBottom: '20px', padding: '12px', border: '1px solid #eee', borderRadius: '6px' }}>
                  <div style={{ fontWeight: 600, fontSize: '15px', color: '#222', marginBottom: '8px' }}>
                    Q{qIdx + 1}. {q.questionText}
                  </div>

                  {q.type === 'MCQ' && q.options && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginLeft: '16px' }}>
                      {q.options.map((opt, oIdx) => (
                        <div key={oIdx} style={{ fontSize: '14px', color: '#444' }}>
                          <strong>({optionLabels[oIdx]})</strong> {opt}
                        </div>
                      ))}
                    </div>
                  )}

                  {q.type === 'NUMERICAL' && (
                    <div style={{ marginLeft: '16px', color: '#666', fontSize: '13px', fontStyle: 'italic' }}>
                      [Numerical Answer Type Question]
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button className="btn-nta btn-clear" onClick={handlePrint}>
            <Printer size={16} /> Print Question Paper
          </button>
          <button className="btn-nta btn-mark-next" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
