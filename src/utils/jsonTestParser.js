/**
 * Comprehensive JSON Test Parser
 * Designed to handle AI-extracted JSON test papers from real PDFs (TET, JEE, NEET, Bank Exams, etc.)
 */

export function parseCustomJSONTest(json) {
  let title = json.title || json.examTitle || "Custom Practice Test";
  let rawQuestions = [];
  let answerKeyMap = json.answerKey || json.key || null;

  // Case 1: Structured sections format
  if (json.sections && Array.isArray(json.sections)) {
    const totalQCount = json.sections.reduce((a, s) => a + (s.questions ? s.questions.length : 0), 0);
    const durationMinutes = Number(json.durationMinutes || json.duration || totalQCount || 60);

    return {
      id: json.id || `custom-test-${Date.now()}`,
      title,
      subtitle: json.subtitle || "Imported Question Paper",
      durationMinutes,
      totalMarks: totalQCount * 1, // +1 mark per question
      sections: json.sections.map((sec, sIdx) => ({
        id: sec.id || `sec-${sIdx}`,
        name: sec.name || sec.subject || `Section ${sIdx + 1}`,
        instructions: sec.instructions || "Select the correct option (+1 for correct answer, 0 for incorrect).",
        questions: (sec.questions || []).map((q, qIdx) => sanitizeQuestion(q, sec.name, qIdx, answerKeyMap))
      }))
    };
  }

  // Case 2: Array of questions OR Object with `questions` array
  if (Array.isArray(json)) {
    rawQuestions = json;
  } else if (json.questions && Array.isArray(json.questions)) {
    rawQuestions = json.questions;
  } else {
    throw new Error("Invalid JSON structure. Must contain a 'questions' array or a 'sections' array.");
  }

  if (rawQuestions.length === 0) {
    throw new Error("No questions found in the provided JSON.");
  }

  // Calculate 1 minute per question
  const totalQCount = rawQuestions.length;
  const durationMinutes = Number(json.durationMinutes || json.duration || totalQCount);

  // Group questions by subject / section automatically
  const sectionMap = {};
  rawQuestions.forEach((q, idx) => {
    const subjectName = q.subject || q.section || q.category || "General Knowledge & Subject";
    if (!sectionMap[subjectName]) {
      sectionMap[subjectName] = [];
    }
    sectionMap[subjectName].push(sanitizeQuestion(q, subjectName, idx, answerKeyMap));
  });

  const sections = Object.keys(sectionMap).map((secName, sIdx) => ({
    id: `sec-${sIdx}`,
    name: secName,
    instructions: "Select the correct option (+1 for correct answer, 0 for wrong answer).",
    questions: sectionMap[secName]
  }));

  return {
    id: `custom-test-${Date.now()}`,
    title,
    subtitle: "Imported Question Paper",
    durationMinutes,
    totalMarks: totalQCount * 1, // +1 mark per question
    sections
  };
}

function sanitizeQuestion(q, defaultSubject, index, answerKeyMap) {
  const qNum = index + 1;
  const type = q.type || (q.options && q.options.length > 0 ? "MCQ" : "NUMERICAL");
  
  // Extract Raw Answer from question object OR top-level answerKey map
  let rawAns = q.correctAnswer !== undefined ? q.correctAnswer : q.correct_answer;
  if (rawAns === undefined && q.answer !== undefined) {
    rawAns = q.answer;
  }
  if (rawAns === undefined && answerKeyMap) {
    if (Array.isArray(answerKeyMap)) {
      rawAns = answerKeyMap[index];
    } else if (typeof answerKeyMap === 'object') {
      rawAns = answerKeyMap[qNum] || answerKeyMap[String(qNum)] || answerKeyMap[q.id];
    }
  }

  // Convert raw answer into normalized index / string
  let correctAnswer = 0;
  if (type === 'MCQ') {
    correctAnswer = normalizeMCQAnswer(rawAns, q.options);
  } else {
    correctAnswer = rawAns !== undefined && rawAns !== null ? String(rawAns).trim() : "0";
  }

  return {
    id: q.id || `q-${qNum}-${Date.now()}`,
    type: type.toUpperCase(),
    questionText: q.questionText || q.question || q.text || `Question ${qNum}`,
    passage: q.passage || q.context || q.comprehension || null,
    options: q.options || (type === 'MCQ' ? ["Option A", "Option B", "Option C", "Option D"] : []),
    correctAnswer,
    explanation: q.explanation || q.solution || "No detailed explanation available for this question.",
    subject: q.subject || defaultSubject,
    topic: q.topic || "General"
  };
}

function normalizeMCQAnswer(rawAns, options = []) {
  if (rawAns === undefined || rawAns === null) return 0;

  // Case: Numeric 0, 1, 2, 3 or 1, 2, 3, 4
  if (typeof rawAns === 'number') {
    if (rawAns >= 0 && rawAns < 4) return rawAns;
    if (rawAns >= 1 && rawAns <= 4) return rawAns - 1; // 1-indexed to 0-indexed
  }

  const str = String(rawAns).trim().toUpperCase();

  // Case: Letter "A", "B", "C", "D" or "1", "2", "3", "4"
  if (str === 'A' || str === 'OPTION A' || str === 'OPTION 1' || str === '1') return 0;
  if (str === 'B' || str === 'OPTION B' || str === 'OPTION 2' || str === '2') return 1;
  if (str === 'C' || str === 'OPTION C' || str === 'OPTION 3' || str === '3') return 2;
  if (str === 'D' || str === 'OPTION D' || str === 'OPTION 4' || str === '4') return 3;

  // Case: Match exact option text string
  if (options && options.length > 0) {
    const matchIdx = options.findIndex(opt => String(opt).trim().toLowerCase() === String(rawAns).trim().toLowerCase());
    if (matchIdx !== -1) return matchIdx;
  }

  return 0;
}

export const SAMPLE_SIMPLE_JSON = `[
  {
    "question": "What is the unit of electric current?",
    "subject": "Physics",
    "options": ["Volt", "Ampere", "Ohm", "Watt"],
    "correctAnswer": 2,
    "explanation": "Electric current is measured in Amperes (A)."
  },
  {
    "question": "Which gas is released during photosynthesis by green plants?",
    "subject": "Biology",
    "options": ["Carbon Dioxide", "Nitrogen", "Oxygen", "Hydrogen"],
    "correctAnswer": 3,
    "explanation": "Plants release Oxygen gas during photosynthesis."
  }
]`;

export const SAMPLE_ADVANCED_JSON = `{
  "title": "TET Paper 2A Practice Quiz",
  "durationMinutes": 150,
  "sections": [
    {
      "name": "Child Development",
      "questions": [
        {
          "question": "The role of intelligence in overall growth and development of a child is:",
          "options": [
            "to learn, adjust and take right decision at right time",
            "to achieve academic goals only",
            "to gain technological skills",
            "to develop industrial skills"
          ],
          "correctAnswer": 1,
          "explanation": "Intelligence helps the child adapt and make appropriate decisions."
        }
      ]
    }
  ]
}`;
