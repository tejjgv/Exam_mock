import React, { useState } from 'react';
import { GENERAL_INSTRUCTIONS } from '../data/mockExams';

export default function InstructionsScreen({ exam, candidateDetails, onProceedToExam, onBackToLogin }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f5f7fa' }}>
      {/* Top Banner */}
      <header className="nta-header">
        <div className="nta-header-left">
          <div className="nta-logo-badge">TEST PRACTISER</div>
          <div className="nta-exam-title">General Instructions - {exam.title}</div>
        </div>
        <div className="nta-user-info-box">
          <img src={candidateDetails.candidatePhoto} alt="Candidate" className="user-avatar-img" />
          <div>
            <div style={{ fontWeight: 600 }}>{candidateDetails.candidateName}</div>
            <div style={{ fontSize: '11px', opacity: 0.85 }}>Roll: {candidateDetails.rollNumber}</div>
          </div>
        </div>
      </header>

      {/* Main Instructions Area */}
      <div style={{ flex: 1, padding: '20px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <div style={{ background: '#ffffff', border: '1px solid #ccc', borderRadius: '6px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#1c3b68', borderBottom: '2px solid #337ab7', paddingBottom: '8px', marginBottom: '16px' }}>
            Please Read the Instructions Carefully
          </h3>

          <div style={{ fontSize: '14px', lineHeight: '1.7', color: '#333' }}>
            <h4 style={{ color: '#444', marginBottom: '8px' }}>General Instructions:</h4>
            
            {GENERAL_INSTRUCTIONS.map((text, idx) => (
              <p key={idx} style={{ marginBottom: '10px' }}>{text}</p>
            ))}

            {/* Visual Symbol Legend Demonstration */}
            <div style={{ background: '#f9f9f9', border: '1px solid #ddd', padding: '16px', borderRadius: '6px', margin: '20px 0' }}>
              <h4 style={{ marginBottom: '12px', color: '#1c3b68' }}>Question Palette Symbols Legend:</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                <div className="legend-item">
                  <span className="q-box-shape q-shape-not-visited">1</span>
                  <span><strong>Not Visited:</strong> You have not visited question.</span>
                </div>
                <div className="legend-item">
                  <span className="q-box-shape q-shape-not-answered">2</span>
                  <span><strong>Not Answered:</strong> You visited but not answered.</span>
                </div>
                <div className="legend-item">
                  <span className="q-box-shape q-shape-answered">3</span>
                  <span><strong>Answered:</strong> You have answered question.</span>
                </div>
                <div className="legend-item">
                  <span className="q-box-shape q-shape-review">4</span>
                  <span><strong>Marked for Review:</strong> Not answered, marked for review.</span>
                </div>
                <div className="legend-item">
                  <span className="q-box-shape q-shape-ans-review">5</span>
                  <span><strong>Answered & Marked for Review:</strong> Will be evaluated!</span>
                </div>
              </div>
            </div>

            <div style={{ background: '#fff3cd', border: '1px solid #ffeeba', padding: '12px', borderRadius: '4px', color: '#856404', fontSize: '13px' }}>
              <strong>Important Notice:</strong> Please ensure your browser remains in fullscreen or default view during the test session. Clicking "I am ready to begin" will start your timer immediately.
            </div>
          </div>

          {/* Declaration Checkbox */}
          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #ddd' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', fontSize: '13px', color: '#222' }}>
              <input 
                type="checkbox" 
                checked={isChecked} 
                onChange={(e) => setIsChecked(e.target.checked)}
                style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: '#337ab7' }}
              />
              <span>
                I have read and understood all the instructions given above. I undertake that I am not in possession of any prohibited material and I agree to abide by all test rules.
              </span>
            </label>
          </div>

          {/* Proceed Button */}
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button className="btn-nta btn-clear" onClick={onBackToLogin}>
              &laquo; Back
            </button>

            <button 
              className="btn-nta btn-save-next" 
              disabled={!isChecked}
              onClick={onProceedToExam}
              style={{
                opacity: isChecked ? 1 : 0.5,
                cursor: isChecked ? 'pointer' : 'not-allowed',
                padding: '10px 24px',
                fontSize: '15px'
              }}
            >
              I AM READY TO BEGIN &raquo;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
