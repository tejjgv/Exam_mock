import React, { useState } from 'react';
import { Award, User, BookOpen, Play, Upload, Code, Download, CheckCircle2, HelpCircle, Copy, X, FileText } from 'lucide-react';
import { MOCK_EXAMS } from '../data/mockExams';
import { parseCustomJSONTest, parsePastedJSONText, SAMPLE_SIMPLE_JSON, SAMPLE_ADVANCED_JSON } from '../utils/jsonTestParser';

const AI_PDF_PROMPT = `Extract all questions from the attached PDF question paper into a JSON array with this exact structure:

[
  {
    "question": "Exact question text (include both English & regional language if bilingual)",
    "subject": "Subject Name (e.g. Child Development, Mathematics, Science, English)",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correctAnswer": "1",
    "explanation": "Step-by-step solution if available, or an empty string"
  }
]

Output rules:
- Return ONE JSON array and nothing else. No prose before or after.
- No markdown code fences, no trailing commas, no comments (// or /* */).
- Every object must have exactly these keys: question, subject, options, correctAnswer, explanation.
- "options" must always be an array of exactly 4 strings.
- "correctAnswer" must be the string "1", "2", "3", or "4".
- "explanation" must be a string; use "" if no solution is available.
- Escape all newlines inside strings as \\n. Do not use literal line breaks.
- Do not truncate. If the paper has N questions, return N objects.
- End the output immediately after the closing ] with no extra characters.

Return the JSON array now.`;

export default function LoginScreen({ onStartExam }) {
  const [selectedExamId, setSelectedExamId] = useState(MOCK_EXAMS[0].id);
  const [candidateName, setCandidateName] = useState("John Doe");
  const [rollNumber, setRollNumber] = useState("240310084920");
  const [candidatePhoto] = useState("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80");
  const [systemName] = useState("C001");

  // Custom Test States
  const [customExamObj, setCustomExamObj] = useState(null);
  const [customJsonText, setCustomJsonText] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [showSyntaxModal, setShowSyntaxModal] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedSample, setCopiedSample] = useState(false);
  const [activeTab, setActiveTab] = useState("PRESET");

  // Process File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setJsonError("");
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        const parsed = parseCustomJSONTest(json);
        setCustomExamObj(parsed);
      } catch (err) {
        setJsonError(err.message || "Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
  };

  // Process Pasted JSON
  const handleParsePastedJson = () => {
    setJsonError("");
    if (!customJsonText.trim()) {
      setJsonError("Please paste JSON text into the text area.");
      return;
    }
    try {
      const json = parsePastedJSONText(customJsonText);
      const parsed = parseCustomJSONTest(json);
      setCustomExamObj(parsed);
    } catch (err) {
      setJsonError(err.message || "Invalid JSON syntax. Please check formatting.");
    }
  };

  // Download Sample JSON File
  const handleDownloadSample = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(SAMPLE_SIMPLE_JSON);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "sample_test_questions.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Copy Helpers
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(AI_PDF_PROMPT);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleOpenClaude = async () => {
    const claudeWindow = window.open('https://claude.ai/new', '_blank', 'noopener,noreferrer');
    try {
      await navigator.clipboard.writeText(AI_PDF_PROMPT);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } catch (error) {
      setJsonError("Claude was opened, but the prompt could not be copied automatically. Please copy it manually.");
    }
    if (!claudeWindow) {
      setJsonError("The Claude tab was blocked by the browser. Please allow pop-ups and try again.");
    }
  };

  const handleCopySample = () => {
    navigator.clipboard.writeText(SAMPLE_SIMPLE_JSON);
    setCopiedSample(true);
    setTimeout(() => setCopiedSample(false), 2000);
  };

  // Start Exam
  const handleFormSubmit = (e) => {
    e.preventDefault();
    let examToRun = MOCK_EXAMS[0];

    if (activeTab !== "PRESET" && customExamObj) {
      examToRun = customExamObj;
    } else {
      examToRun = MOCK_EXAMS.find(ex => ex.id === selectedExamId) || MOCK_EXAMS[0];
    }

    onStartExam({
      exam: examToRun,
      candidateName,
      rollNumber,
      candidatePhoto,
      systemName
    });
  };

  return (
    <div className="login-page-bg">
      {/* Top Banner */}
      <div className="login-header-banner">
        <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '24px' }}>
          <Award size={30} /> ONLINE TEST PRACTISER
        </h2>
        <p style={{ fontSize: '14px', marginTop: '4px', opacity: 0.9 }}>
          Computer Based Test (CBT) Practice Portal & Exam Simulator
        </p>
      </div>

      <div className="login-card-container">
        <div className="login-card" style={{ maxWidth: '620px' }}>
          {/* Header Candidate Info */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img 
              src={candidatePhoto} 
              alt="Candidate Profile" 
              style={{ width: '74px', height: '74px', borderRadius: '50%', border: '3px solid #1c3b68', objectFit: 'cover' }} 
            />
            <h3 style={{ marginTop: '6px', color: '#1c3b68', fontSize: '18px' }}>Candidate Sign-In</h3>
            <span style={{ fontSize: '12px', color: '#666', background: '#eef2f5', padding: '2px 10px', borderRadius: '4px' }}>
              System Name: {systemName}
            </span>
          </div>

          {/* Tab Selector: Select Preset vs Upload Custom JSON vs Paste JSON */}
          <div style={{ display: 'flex', borderBottom: '2px solid #ddd', marginBottom: '20px' }}>
            <button
              type="button"
              onClick={() => { setActiveTab("PRESET"); setJsonError(""); }}
              style={{
                flex: 1,
                padding: '10px',
                border: 'none',
                background: activeTab === "PRESET" ? "#337ab7" : "#f1f1f1",
                color: activeTab === "PRESET" ? "white" : "#444",
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                borderRadius: '4px 0 0 0'
              }}
            >
              Preset Exam Papers
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab("UPLOAD"); setJsonError(""); }}
              style={{
                flex: 1,
                padding: '10px',
                border: 'none',
                background: activeTab === "UPLOAD" ? "#337ab7" : "#f1f1f1",
                color: activeTab === "UPLOAD" ? "white" : "#444",
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              📁 Upload JSON File
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab("PASTE"); setJsonError(""); }}
              style={{
                flex: 1,
                padding: '10px',
                border: 'none',
                background: activeTab === "PASTE" ? "#337ab7" : "#f1f1f1",
                color: activeTab === "PASTE" ? "white" : "#444",
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                borderRadius: '0 4px 0 0'
              }}
            >
              📋 Paste JSON Text
            </button>
          </div>

          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Candidate Details Inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#444', marginBottom: '4px' }}>
                  Candidate Name:
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    value={candidateName} 
                    onChange={(e) => setCandidateName(e.target.value)} 
                    required
                    style={{ width: '100%', padding: '8px 8px 8px 32px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '13px' }}
                  />
                  <User size={16} style={{ position: 'absolute', left: '8px', top: '10px', color: '#888' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#444', marginBottom: '4px' }}>
                  Roll Number:
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    value={rollNumber} 
                    onChange={(e) => setRollNumber(e.target.value)} 
                    required
                    style={{ width: '100%', padding: '8px 8px 8px 32px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '13px' }}
                  />
                  <BookOpen size={16} style={{ position: 'absolute', left: '8px', top: '10px', color: '#888' }} />
                </div>
              </div>
            </div>

            {/* TAB 1: PRESET EXAMS */}
            {activeTab === "PRESET" && (
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#444', marginBottom: '4px' }}>
                  Select Built-in Test Paper:
                </label>
                <select 
                  value={selectedExamId} 
                  onChange={(e) => setSelectedExamId(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px', background: '#fff' }}
                >
                  {MOCK_EXAMS.map(exam => (
                    <option key={exam.id} value={exam.id}>
                      {exam.title} ({exam.durationMinutes} Mins - {exam.sections.length} Subjects)
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* TAB 2: UPLOAD JSON FILE */}
            {activeTab === "UPLOAD" && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '6px', border: '1px dashed #337ab7', textAlign: 'center' }}>
                  <Upload size={30} color="#337ab7" style={{ marginBottom: '6px' }} />
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#333' }}>Select your questions JSON file</p>
                  <p style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>Supports 1-indexed/0-indexed keys, passages, & bilingual text</p>
                  
                  <input 
                    type="file" 
                    accept=".json" 
                    onChange={handleFileUpload} 
                    style={{ display: 'none' }} 
                    id="json-file-picker" 
                  />
                  <label 
                    htmlFor="json-file-picker" 
                    className="btn-nta btn-mark-next"
                    style={{ cursor: 'pointer', padding: '8px 20px', fontSize: '14px' }}
                  >
                    Browse JSON File
                  </label>
                </div>

                {/* Prompt Box to copy when extracting PDF using AI */}
                <div style={{ background: '#eef4fc', border: '1px solid #c2dcf8', borderRadius: '6px', padding: '12px 14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#1c3b68', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FileText size={14} /> PDF-to-JSON AI Extraction Prompt:
                    </span>
                    <button 
                      type="button" 
                      onClick={handleCopyPrompt} 
                      style={{ background: '#337ab7', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '3px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Copy size={12} /> {copiedPrompt ? "Copied!" : "Copy Prompt"}
                    </button>
                    <button
                      type="button"
                      onClick={handleOpenClaude}
                      style={{ background: '#d97757', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '3px', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}
                    >
                      Open Claude + Copy
                    </button>
                  </div>
                  <pre style={{ background: '#ffffff', border: '1px solid #d0e3f7', padding: '8px 10px', borderRadius: '4px', fontSize: '11px', color: '#333', whiteSpace: 'pre-wrap', maxHeight: '90px', overflowY: 'auto' }}>
                    {AI_PDF_PROMPT}
                  </pre>
                  <span style={{ fontSize: '11px', color: '#666', marginTop: '4px', display: 'block' }}>
                    💡 Copy this prompt and paste it into ChatGPT / Gemini / Claude along with your Question Paper PDF!
                  </span>
                </div>
              </div>
            )}

            {/* TAB 3: PASTE JSON TEXT */}
            {activeTab === "PASTE" && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#444' }}>
                      Paste JSON Array:
                    </label>
                    <button 
                      type="button" 
                      onClick={handleCopyPrompt} 
                      style={{ background: 'none', border: 'none', color: '#337ab7', cursor: 'pointer', fontSize: '12px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Copy size={13} /> {copiedPrompt ? "Prompt Copied!" : "Copy AI Prompt"}
                    </button>
                    <button
                      type="button"
                      onClick={handleOpenClaude}
                      style={{ background: '#d97757', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '3px', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}
                    >
                      Open Claude + Copy
                    </button>
                  </div>

                  <textarea 
                    rows={6}
                    value={customJsonText}
                    onChange={(e) => setCustomJsonText(e.target.value)}
                    placeholder={`[
  {
    "question": "What is the speed of light in vacuum?",
    "subject": "Physics",
    "options": ["3 x 10^8 m/s", "3 x 10^6 m/s", "1.5 x 10^8 m/s", "300 m/s"],
    "correctAnswer": "1",
    "explanation": "3 x 10^8 m/s in vacuum."
  }
]`}
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontFamily: 'monospace', fontSize: '12px' }}
                  />
                  <button 
                    type="button" 
                    onClick={handleParsePastedJson} 
                    className="btn-nta btn-clear"
                    style={{ marginTop: '8px', width: '100%' }}
                  >
                    <Code size={14} /> Validate & Load JSON Questions
                  </button>
                </div>
              </div>
            )}

            {/* Success Loaded Card */}
            {activeTab !== "PRESET" && customExamObj && (
              <div style={{ background: '#d4edda', border: '1px solid #c3e6cb', color: '#155724', padding: '12px', borderRadius: '4px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={20} color="green" />
                <div>
                  <strong>Test Ready:</strong> {customExamObj.title}<br />
                  Total Questions: <strong>{customExamObj.sections.reduce((a, s) => a + s.questions.length, 0)}</strong> across {customExamObj.sections.length} Subject(s) ({customExamObj.sections.map(s => s.name).join(', ')}).
                </div>
              </div>
            )}

            {/* Error Message */}
            {jsonError && (
              <div style={{ background: '#f8d7da', border: '1px solid #f5c6cb', color: '#721c24', padding: '10px', borderRadius: '4px', fontSize: '13px' }}>
                ❌ {jsonError}
              </div>
            )}

            {/* Action Buttons */}
            <button 
              type="submit" 
              className="btn-save-next" 
              disabled={activeTab !== "PRESET" && !customExamObj}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                marginTop: '10px',
                opacity: (activeTab !== "PRESET" && !customExamObj) ? 0.5 : 1,
                cursor: (activeTab !== "PRESET" && !customExamObj) ? 'not-allowed' : 'pointer'
              }}
            >
              <Play size={18} /> Proceed to Instructions & Start Test
            </button>
          </form>

          {/* JSON Syntax & Template Helper Bar */}
          <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button 
              type="button" 
              onClick={() => setShowSyntaxModal(true)} 
              style={{ background: 'none', border: 'none', color: '#337ab7', cursor: 'pointer', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <HelpCircle size={15} /> View JSON Format Syntax
            </button>

            <button 
              type="button" 
              onClick={handleDownloadSample} 
              style={{ background: 'none', border: 'none', color: '#28a745', cursor: 'pointer', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Download size={15} /> Download Sample .JSON File
            </button>
          </div>
        </div>
      </div>

      {/* JSON SYNTAX GUIDANCE MODAL */}
      {showSyntaxModal && (
        <div className="modal-overlay" onClick={() => setShowSyntaxModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '750px' }}>
            <div className="modal-header">
              <div className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Code size={18} /> JSON Format Syntax Guide for Questions
              </div>
              <button onClick={() => setShowSyntaxModal(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ fontSize: '13px', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '12px' }}>
                Our parser supports simple question arrays, multi-subject papers, and bilingual text format.
              </p>

              <h4 style={{ color: '#1c3b68', marginBottom: '6px' }}>Format 1: Simple Questions Array (Recommended)</h4>
              <div style={{ position: 'relative', marginBottom: '16px' }}>
                <pre style={{ background: '#272822', color: '#f8f8f2', padding: '12px', borderRadius: '4px', overflowX: 'auto', fontSize: '12px' }}>
                  {SAMPLE_SIMPLE_JSON}
                </pre>
                <button 
                  onClick={handleCopySample}
                  style={{ position: 'absolute', top: '8px', right: '8px', background: '#444', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '3px', cursor: 'pointer', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Copy size={12} /> {copiedSample ? "Copied!" : "Copy"}
                </button>
              </div>

              <h4 style={{ color: '#1c3b68', marginBottom: '6px' }}>Format 2: Advanced Multi-Section Paper</h4>
              <pre style={{ background: '#272822', color: '#f8f8f2', padding: '12px', borderRadius: '4px', overflowX: 'auto', fontSize: '12px' }}>
                {SAMPLE_ADVANCED_JSON}
              </pre>

              <div style={{ marginTop: '14px', background: '#e7f1fc', border: '1px solid #bce8f1', padding: '10px', borderRadius: '4px', color: '#31708f', fontSize: '12px' }}>
                <strong>Key JSON Fields:</strong>
                <ul style={{ marginLeft: '20px', marginTop: '4px' }}>
                  <li><code>question</code> / <code>questionText</code>: Question statement (multiline bilingual English/Telugu text supported).</li>
                  <li><code>subject</code>: Subject name (e.g. Child Development, Mathematics, Science, Telugu, English).</li>
                  <li><code>options</code>: Array of 4 string choices.</li>
                  <li><code>correctAnswer</code>: For pasted AI output, use the string `"1"`, `"2"`, `"3"`, or `"4"`.</li>
                  <li><code>passage</code> (optional): Reading comprehension or passage paragraph.</li>
                  <li><code>explanation</code> (optional): Detailed solution shown on the result page.</li>
                  <li><code>answerKey</code> (optional): Separate answer key object e.g. <code>{`{ "1": 1, "2": 2 }`}</code>.</li>
                </ul>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-nta btn-clear" onClick={handleDownloadSample}>
                <Download size={14} /> Download Sample File
              </button>
              <button className="btn-nta btn-mark-next" onClick={() => setShowSyntaxModal(false)}>
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
