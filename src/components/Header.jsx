import React from 'react';
import { Clock, HelpCircle, FileText, ZoomIn, ZoomOut, RotateCcw, Award } from 'lucide-react';

export default function Header({
  examTitle,
  timeLeftSeconds,
  candidateName,
  candidatePhoto,
  systemName,
  fontSize,
  setFontSize,
  onOpenInstructions,
  onOpenQuestionPaper,
  onSwitchExam,
  language,
  setLanguage
}) {
  const formatTime = (totalSeconds) => {
    if (totalSeconds < 0) return "00:00:00";
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const isTimeRunningOut = timeLeftSeconds <= 300;

  return (
    <header className="header-container">
      {/* Top Main Blue Strip */}
      <div className="nta-header">
        <div className="nta-header-left">
          <div className="nta-logo-badge">
            <Award size={18} />
            <span>TEST PRACTISER</span>
          </div>
          <div className="nta-exam-title">
            {examTitle}
          </div>
        </div>

        <div className="nta-header-right">
          {/* Live Timer Clock */}
          <div className={`nta-timer-box ${isTimeRunningOut ? 'timer-warning' : ''}`}>
            <Clock size={16} />
            <span>Time Left: {formatTime(timeLeftSeconds)}</span>
          </div>

          {/* Candidate Profile Box */}
          <div className="nta-user-info-box">
            <img 
              src={candidatePhoto || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80"} 
              alt="Candidate" 
              className="user-avatar-img" 
            />
            <div>
              <div style={{ fontWeight: 600 }}>{candidateName || "Candidate Name"}</div>
              <div style={{ fontSize: '11px', opacity: 0.85 }}>System: {systemName || "C001"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Header Tools & Language Switcher */}
      <div className="nta-subheader">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontWeight: 600, color: '#337ab7' }}>Paper: {examTitle}</span>
        </div>

        <div className="header-action-btns">
          {/* Zoom controls */}
          <span style={{ fontSize: '12px', color: '#555', marginRight: '4px' }}>Font Size:</span>
          <button 
            className="btn-nta-small" 
            onClick={() => setFontSize(prev => Math.min(prev + 2, 22))}
            title="Increase Font Size"
          >
            <ZoomIn size={14} /> A+
          </button>
          <button 
            className="btn-nta-small" 
            onClick={() => setFontSize(15)}
            title="Reset Font Size"
          >
            <RotateCcw size={13} /> A
          </button>
          <button 
            className="btn-nta-small" 
            onClick={() => setFontSize(prev => Math.max(prev - 2, 12))}
            title="Decrease Font Size"
          >
            <ZoomOut size={14} /> A-
          </button>

          {/* Language selector */}
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="btn-nta-small"
            style={{ fontWeight: 500 }}
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi (हिंदी)</option>
            <option value="Gujarati">Gujarati (ગુજરાતી)</option>
          </select>

          {/* Question Paper View */}
          <button className="btn-nta-small" onClick={onOpenQuestionPaper}>
            <FileText size={14} /> Question Paper
          </button>

          {/* Instructions View */}
          <button className="btn-nta-small" onClick={onOpenInstructions}>
            <HelpCircle size={14} /> Instructions
          </button>

          {/* Switch Exam */}
          <button 
            className="btn-nta-small" 
            onClick={onSwitchExam}
            style={{ backgroundColor: '#f0ad4e', color: 'white', borderColor: '#eea236' }}
          >
            Exit / Switch Test
          </button>
        </div>
      </div>
    </header>
  );
}
