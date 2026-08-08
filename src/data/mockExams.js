import { parseCustomJSONTest } from '../utils/jsonTestParser';

const DEFAULT_PRESET_QUESTIONS = [
  {
    "question": "1. The role of intelligence in overall growth and development of a child is",
    "subject": "Child Development and Pedagogy",
    "options": [
      "to learn, adjust and take right decision at the right time",
      "to achieve academic goals for a bright future",
      "to gain useful technological skills",
      "to develop proficiency in productive sectors"
    ],
    "correctAnswer": "1",
    "explanation": ""
  },
  {
    "question": "2. Among the factors that influence growth and development the parental and family care received by child comes under",
    "subject": "Child Development and Pedagogy",
    "options": [
      "Biological",
      "External",
      "Hereditary",
      "Social nature"
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "3. Every child is unique with respect to the various dimensions of development. This applies to the following principle of development.",
    "subject": "Child Development and Pedagogy",
    "options": [
      "Inter-relationships",
      "Individual differences",
      "Predictability",
      "Integration"
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "4. One of the following is not correct with respect to the growth and development.",
    "subject": "Child Development and Pedagogy",
    "options": [
      "Growth refers to physical change and development for overall change",
      "Growth is a part of development and development addresses changes in total.",
      "The changes of both growth and development are totally measurable and observable",
      "Physical change may not result in functional change"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "5. With regard to the structural development during Pre-natal period, embryonic period is between",
    "subject": "Child Development and Pedagogy",
    "options": [
      "3rd week to 8th week",
      "First two weeks",
      "8th week to birth",
      "5th week to 8th week"
    ],
    "correctAnswer": "1",
    "explanation": ""
  },
  {
    "question": "6. In the early childhood stage, the thinking and reasoning develops in relation to",
    "subject": "Child Development and Pedagogy",
    "options": [
      "Abstract materials",
      "Concrete materials",
      "Moving pictures",
      "Unavailable materials"
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "7. When a baby below 1 year old is playing with a toy, if the toy is replaced with a pillow, she forgets the toy and starts playing with pillow. According to piaget, this is because of",
    "subject": "Child Development and Pedagogy",
    "options": [
      "The concept of object permanence",
      "Lack of concept of irreversibility",
      "The absence of object permanence concept",
      "ego centrism"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "8. The major focus of 'behavioristic theory' of development is on",
    "subject": "Child Development and Pedagogy",
    "options": [
      "Cognitive abilities and perception",
      "Learning of stimulus-response associations",
      "Importance of early childhood experiences on later development of child",
      "The ability to construct mental images involving reasoning."
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "9. One of the following is not true with respect to \"Self-concept\"",
    "subject": "Child Development and Pedagogy",
    "options": [
      "'Self-concept' is what the individual thinks about himself",
      "'Self-concept' is knowing one's strengths and weaknesses",
      "'Self-concept' develops self-respect and self confidence",
      "'Self-concept' does not influence the individual differences"
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "10. The important tool of thinking is",
    "subject": "Child Development and Pedagogy",
    "options": [
      "Motivation",
      "Intelligence",
      "Personality",
      "Language"
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "11. One of the following is not the innate individual difference",
    "subject": "Child Development and Pedagogy",
    "options": [
      "Physical",
      "Mental",
      "Emotional",
      "Educational"
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "12. One of the following is not correct with respect to Intelligence",
    "subject": "Child Development and Pedagogy",
    "options": [
      "Intelligence is the ability to carry out abstract thinking",
      "Knowledge comes through learning and intelligence occurs naturally",
      "Intelligence pertains to all fields. Aptitude belongs to a particular field",
      "All the persons who have intelligence have creativity but not all creative have intelligence"
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "13. One of the following is not a subtest of Differential Aptitude Test (DAT)",
    "subject": "Child Development and Pedagogy",
    "options": [
      "Verbal ability",
      "Numerical ability",
      "Object assembly test",
      "Spatial ability"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "14. Among the blocks of creativity, \"Excessive reliance on authority\" comes under this category",
    "subject": "Child Development and Pedagogy",
    "options": [
      "Perceptional blocks",
      "Emotional blocks",
      "Intellectual blocks",
      "Cultural blocks"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "15. Interest is formed in this way a. Naturally, due to person's nature b. Due to reaction with surroundings c. Because of the experiences gained over time",
    "subject": "Child Development and Pedagogy",
    "options": [
      "a only",
      "a, b",
      "b, c",
      "a, b, c"
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "16. The projective test of personality among the following",
    "subject": "Child Development and Pedagogy",
    "options": [
      "Personality inventories",
      "Rating scales",
      "Sentence completion test",
      "Anecdotal record"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "17. According to Hippocrates 'type approach' to personality, the dominant fluid in the \"choleric\" personality type is",
    "subject": "Child Development and Pedagogy",
    "options": [
      "Blood",
      "phlegm (mucus)",
      "Black bile",
      "yellow bile"
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "18. One of the following is not the part of central processing unit",
    "subject": "Child Development and Pedagogy",
    "options": [
      "Control unit",
      "Memory unit",
      "Arithmetic & logical unit",
      "Printer"
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "19. Behavioristic theories of development was proposed by",
    "subject": "Child Development and Pedagogy",
    "options": [
      "Sigmund Freud and Erik Erikson",
      "Ivan Pavlov and B.F. Skinner",
      "Jean Piaget and Bandura",
      "Kohlberg and Goldstein"
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "20. \"Adjustment means the modification to compensate for or meet special conditions\". This definition is given by",
    "subject": "Child Development and Pedagogy",
    "options": [
      "Webster",
      "Carter V. Good",
      "Warren",
      "James Drever"
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "21. \"Conflict is a painful emotional state which results from a tension between two opposed and contradictory wishes\". This definition is given by",
    "subject": "Child Development and Pedagogy",
    "options": [
      "Kurt Lewin",
      "Douglass and Holland",
      "Murray",
      "Jacob.L. Moreno"
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "22. When requirements are not met during developmental stages, some people though they are elders behave like children. This defense mechanism is",
    "subject": "Child Development and Pedagogy",
    "options": [
      "Repression",
      "Regression",
      "Compensation",
      "Rationalization"
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "23. \"Measuring without instruments\" is also the name of the following method of psychology",
    "subject": "Child Development and Pedagogy",
    "options": [
      "Projective tests",
      "Observation method",
      "Experimental method",
      "Case study method"
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "24. One of the following is correct with respect to learning",
    "subject": "Child Development and Pedagogy",
    "options": [
      "Learning involves making sense of the presented material",
      "Learning is a relatively temporary change in behaviour",
      "No relation between learning and adjustment",
      "Learning is a product"
    ],
    "correctAnswer": "1",
    "explanation": ""
  },
  {
    "question": "25. Correctly matched pair is",
    "subject": "Child Development and Pedagogy",
    "options": [
      "Pavlov - Operant conditioning",
      "Kohlberg - Language development theory",
      "Bandura - Social learning theory",
      "Rogers - Social constructivism"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "26. 'Attention Concentration' is",
    "subject": "Child Development and Pedagogy",
    "options": [
      "An indicator of attention 'depth'",
      "An indicator of attention width and narrowness",
      "Attention is the speed of transition from one object to another",
      "The duration of voluntary attention"
    ],
    "correctAnswer": "1",
    "explanation": ""
  },
  {
    "question": "27. One of the following is not the part of planning phase of teaching.",
    "subject": "Child Development and Pedagogy",
    "options": [
      "Selection of content to be taught",
      "Organization of the content",
      "Selection and presentation of stimuli",
      "Sequencing the elements of content for presentation"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "28. One of the following is not correct regarding the use of knowledge of group dynamics to the teacher.",
    "subject": "Child Development and Pedagogy",
    "options": [
      "He can improve social and emotional climate of the group",
      "He finds out the causes that work against conducive environment of the class",
      "He can improve intra group relations",
      "He can understand the relationship patterns which are same for all activities."
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "29. The creator of project method",
    "subject": "Child Development and Pedagogy",
    "options": [
      "John Dewey",
      "Kil Patrik",
      "Froebel",
      "Morrison"
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "30. One of the following is not correct with regard to the 'instruction' and 'teaching'",
    "subject": "Child Development and Pedagogy",
    "options": [
      "Instruction is suggesting directions in teaching learning Process",
      "Teaching is based on individual differences on learning",
      "Instruction may not be possible in informal Education",
      "Teaching takes place only in formal education"
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "61. By the time she was eleven her marks had deteriorated and her headmistress urged her parents to take her to a specialist. When something 'deteriorated' it:",
    "subject": "English",
    "options": [
      "improved",
      "enhanced",
      "declined",
      "strengthened."
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "62. Actually, the overall pattern for her progress is quite satisfactory. Identify the antonym of 'progress' in the context of the sentence:",
    "subject": "English",
    "options": [
      "regress",
      "enhance",
      "strengthen",
      "improvement"
    ],
    "correctAnswer": "1",
    "explanation": ""
  },
  {
    "question": "63. Your life __________ by this book. Identify the option that best fits the blank.",
    "subject": "English",
    "options": [
      "will be changed",
      "will change",
      "will changed",
      "will be changing"
    ],
    "correctAnswer": "1",
    "explanation": ""
  },
  {
    "question": "64. Choose the correct suffix to mean 'without' in the 'fearless'.",
    "subject": "English",
    "options": [
      "-ty",
      "-ness",
      "-ment",
      "-less"
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "65. Even though it was hard to bite the bullet, Tom finally told about the mistake. In the above sentence, \"bite the bullet\" is used in the following sense:",
    "subject": "English",
    "options": [
      "to endure a painful experience",
      "to take a dangerous risk",
      "to argue with someone.",
      "to finish a difficult task."
    ],
    "correctAnswer": "1",
    "explanation": ""
  },
  {
    "question": "66. She decided to bring up the issue during the meeting. Identify what 'bring up' means in the sentence:",
    "subject": "English",
    "options": [
      "to ignore",
      "to remove",
      "to finish",
      "to start discussing"
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "67. In a dictionary, words with the same prefix, such as 'uncle' and 'uncleared' should be ordered:",
    "subject": "English",
    "options": [
      "by the length of the word.",
      "alphabetically by the characters following the prefix.",
      "by their semantic meaning.",
      "alphabetically by their prefixes."
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "68. Choose the sentence that correctly uses commas with a quotation:",
    "subject": "English",
    "options": [
      "He said \"I'll be, back soon\".",
      "He said, \"I'll be back soon.\"",
      "He, said \"I'll be back soon.\"",
      "He said I'll be back, soon.\""
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "69. To finish your project in time, you should start now. Choose the sentence that correctly converts the simple sentence into a complex sentence:",
    "subject": "English",
    "options": [
      "You should start now, so you finish your project in time.",
      "You should start now if you want to finish your project in time.",
      "You need to start now because you want to finish your project in time.",
      "Start working now to complete your project in time"
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "70. Identify the grammatically correct sentence:",
    "subject": "English",
    "options": [
      "It is a old television set.",
      "It is an old television set.",
      "It is old television set.",
      "It is an old television sets."
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "71. Choose the sentence that describes a feeling:",
    "subject": "English",
    "options": [
      "She walks to school every day.",
      "I feel very happy today.",
      "Can you open the window?",
      "Please shut the computer."
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "72. Identify the correct spelling of the word.",
    "subject": "English",
    "options": [
      "encyclipedea",
      "encyclopedia",
      "encylopidia",
      "encyclopaedia"
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "73. John said to Mary, \"You are innocent\". Choose the correct indirect speech.",
    "subject": "English",
    "options": [
      "John told Mary that she was innocent.",
      "John told Mary that she has innocent.",
      "John told Mary that you were innocent.",
      "John told Mary that you are innocent."
    ],
    "correctAnswer": "1",
    "explanation": ""
  },
  {
    "question": "74. Whether we will go to the beach this weekend depends on the weather. Identify the noun clause:",
    "subject": "English",
    "options": [
      "we will go",
      "to the beach",
      "Whether we will go to the beach this weekend.",
      "depends on the weather."
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "75. Identify the term for a person who is a bootlicker or flatterer:",
    "subject": "English",
    "options": [
      "Sychophant",
      "Patriot",
      "Misanthropist",
      "Philanthropist"
    ],
    "correctAnswer": "1",
    "explanation": ""
  },
  {
    "question": "76. The news _________ the entire nation. Choose the option that fits the blank.",
    "subject": "English",
    "options": [
      "shock",
      "is shocked",
      "shocking",
      "shocks"
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "77. Choose the correct example of an imperative sentence.",
    "subject": "English",
    "options": [
      "Where is the nearest Pharmacy?",
      "Please take out the trash.",
      "Wow, that was amazing!",
      "Are you coming to the party?"
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "78. The chef prepared a delicious meal. _______, the guests were impressed with his culinary skills. Choose the linker that fits the blank.",
    "subject": "English",
    "options": [
      "Consequently",
      "Yet",
      "For example",
      "Similarly"
    ],
    "correctAnswer": "1",
    "explanation": ""
  },
  {
    "question": "79. Identify the example where the definite article is used before trades and professions following a proper noun:",
    "subject": "English",
    "options": [
      "Newton, the scientist",
      "The lion is the king of a forest.",
      "The Hindus in India",
      "The goat was all skin and bones."
    ],
    "correctAnswer": "1",
    "explanation": ""
  },
  {
    "question": "80. I _________ finish the report tomorrow. Identify the modal verb used to express a future intention.",
    "subject": "English",
    "options": [
      "would",
      "should",
      "could",
      "will"
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "81. Choose the sentence that correctly uses 'because' as a subordinating conjunction.",
    "subject": "English",
    "options": [
      "Because he went to bed, he was tired.",
      "She was late because the traffic was bad.",
      "Because it was raining, but they went outside.",
      "I will go because of home."
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "82. Choose the sentence that uses a subordinating conjunction to show contrast.",
    "subject": "English",
    "options": [
      "We will go to beach when the sun comes out.",
      "She finished her homework before she watched TV.",
      "Although he was tired, he kept working.",
      "He went to the store because he needed milk."
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "83. The first part of a dairy entry typically includes:",
    "subject": "English",
    "options": [
      "A summary of the day's events",
      "A personal reflection",
      "The date and time",
      "A closing line."
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "84. The purpose of an invitation is to __________. Choose the best option.",
    "subject": "English",
    "options": [
      "Provide a summary of the event.",
      "request someone to attend an event.",
      "detail the organization's history.",
      "outline the event's budget."
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "85. Choose the negative form of the Present Perfect tense:",
    "subject": "English",
    "options": [
      "Subject + do not + base form of the verb.",
      "Subject + has / have + not + Past Participle.",
      "Subject + was / were + not + verb + ing",
      "Subject + will not + base form of the verb."
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "86. One of the following is NOT an example of the Present Perfect Continuous tense. Identify it.",
    "subject": "English",
    "options": [
      "She has been reading a book for two hours.",
      "They have been travelling since last week.",
      "He has finished his work.",
      "I have been working on this project for a month."
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "87. The keys are _________ the drawyer. Choose the correct preposition to fill the blank.",
    "subject": "English",
    "options": [
      "inside of",
      "in charge of",
      "in place of",
      "in back of"
    ],
    "correctAnswer": "1",
    "explanation": ""
  },
  {
    "question": "88. _________ the rain, they went for a walk. Identify the option that fits the blank.",
    "subject": "English",
    "options": [
      "Instead of",
      "Inspite of",
      "In exchange of",
      "In case of"
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "89. Read the following passage. Child labour remains a significant issue in India, with many children working in hazardous conditions instead of attending school. Efforts to combat child labour include legislation and social programmes aimed at improving education and economic opportunities for families. However, enforcement and implementation challenges persist, making it a complex problem to resolve. Identify the main focus of efforts to combat child labour in India:",
    "subject": "English",
    "options": [
      "Increasing industrial jobs",
      "Promoting child entertainment",
      "Expanding child labour laws only",
      "Improving education and economic opportunities"
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "90. Read the following passage. Child labour remains a significant issue in India, with many children working in hazardous conditions instead of attending school. Efforts to combat child labour include legislation and social programmes aimed at improving education and economic opportunities for families. However, enforcement and implementation challenges persist, making it a complex problem to resolve. Efforts to address child labour face challenges related to ____. Choose the option that fits the blank.",
    "subject": "English",
    "options": [
      "public awareness",
      "enforcement and implementation",
      "media coverage",
      "technological advancement."
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "91. If Tan A = 3/4. Then the value of (1 - Cot A)/(1 + Cot A) is",
    "subject": "Mathematics",
    "options": [
      "-1/7",
      "-7",
      "1/7",
      "7"
    ],
    "correctAnswer": "1",
    "explanation": ""
  },
  {
    "question": "92. A semicircular Cardboard piece is made to rotate speedily along its diameter as axis of rotation forms the following 3-D object to our visualization",
    "subject": "Mathematics",
    "options": [
      "Cuboid",
      "Cube",
      "Sphere",
      "Cylinder"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "93. The value of (Sinθ + Cosθ)² + (Sinθ - Cosθ)² is",
    "subject": "Mathematics",
    "options": [
      "4",
      "3",
      "2",
      "1"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "94. Ravi borrowed ` 10,000 at 10% per annum for 3 years at simple interest and Raju borrowed the same amount for the same period at 10% per annum, compounded annually. Then difference of their interest paid is",
    "subject": "Mathematics",
    "options": [
      "` 300",
      "` 310",
      "` 320",
      "` 330"
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "95. Find the correct mathematical statement in the following",
    "subject": "Mathematics",
    "options": [
      "2 x + 3 y = 5 xy",
      "4( x - 5) = 4 x - 5",
      "(3 x + 2) 2 = 9 x 2 + 12 x + 4",
      "( x - 5) 2 = x 2 - 25"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "96. While representing the data of histogram on a graph if the first class interval does not start from 'O', we use ___ on the axis to show it on the graph.",
    "subject": "Mathematics",
    "options": [
      "Circle",
      "Bar",
      "Kink",
      "No sign is necessary to be shown"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "97. 3, 2, (2x+8) and (x+6) are in proportion. Then value of 'x' is",
    "subject": "Mathematics",
    "options": [
      "3",
      "1",
      "-1",
      "2"
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "98. In the adjacent diagram, 'O' is the centre of the circle. A, C, B are the points on the circle. If ∠AOB = 110°, then ∠ACB = ?",
    "subject": "Mathematics",
    "options": [
      "70°",
      "55°",
      "125°",
      "110°"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "99. The additive inverse of multiplicative identity of -3 is",
    "subject": "Mathematics",
    "options": [
      "0",
      "-1",
      "+1",
      "3"
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "100. If p/q = (2/3)^3 ÷ (3/2)^-3, then (p/q)^-10 is",
    "subject": "Mathematics",
    "options": [
      "3",
      "-3",
      "-1",
      "1"
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "101. The point which divides the line segment joining the points (2,-3) and (-1,4) in the ratio 3:2 internally is",
    "subject": "Mathematics",
    "options": [
      "(2/5, 6/5)",
      "(1/5, 6/5)",
      "(-2/5, 6/5)",
      "(1/5, -6/5)"
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "102. An angle is 2/7th of its complement. Then the difference between the complement and the original angle is",
    "subject": "Mathematics",
    "options": [
      "90°",
      "70°",
      "50°",
      "20°"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "103. Set builder form of Set A-B is",
    "subject": "Mathematics",
    "options": [
      "{x : x ∈ B or x ∉ A}",
      "{x : x ∈ B and x ∉ A}",
      "{x : x ∈ A or x ∉ B}",
      "{x : x ∈ A and x ∉ B}"
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "104. Distance between two points (Cosθ, -Sinθ) and (Sinθ, Cosθ) is (in units)",
    "subject": "Mathematics",
    "options": [
      "√2",
      "√3",
      "√(Sinθ + Cosθ)",
      "√(Cosθ - Sinθ)"
    ],
    "correctAnswer": "1",
    "explanation": ""
  },
  {
    "question": "105. The value of k, if (x-1) is a factor of 4 x 3 + 3x 2 - 4 x + k",
    "subject": "Mathematics",
    "options": [
      "2",
      "-3",
      "-2",
      "3"
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "106. Nainika orders a circular pizza of radius 8cm in a restaurant. But due to unavailability of 8cm pizzas, the bearer served two circular pizzas of radii 5cm each to her. Nainika argues that she was supplied with lesser quantity than what she has ordered. Whereas the bearer claims that he supplied two 5cm radii pizzas which is 2cm more than what Nainika ordered. Identify the correct argument and by how much?",
    "subject": "Mathematics",
    "options": [
      "Bearer is correct by 2cm",
      "Nainika is correct by 14π cm²",
      "Bearer is correct by 14π cm²",
      "Nainika is correct by 2cm"
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "107. Identify the TRUE statement",
    "subject": "Mathematics",
    "options": [
      "(a+√b)(a-√b) = a-b, a≠0, b≠0",
      "(√a+√b) = a+2ab+b, a≠0, b≠0",
      "a^m/a^n = a^(m+n), m>n",
      "ⁿ√a = a^(1/n), a>0, n∈Z+"
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "108. Diameter of a circle with centre (3,2) and passing through (-5,6) is (in units)",
    "subject": "Mathematics",
    "options": [
      "2 5",
      "4 5",
      "6 5",
      "8 5"
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "109. The probability of an event E is P(E). Then identify the TRUE statement in the following",
    "subject": "Mathematics",
    "options": [
      "0 < P(E) ≤ 1",
      "0 < P(E) < 1",
      "0 ≤ P(E) < 1",
      "0 ≤ P(E) ≤ 1"
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "110. ABCD is a square. If a diagonal AC=10cm then AB + BC = (in cm)",
    "subject": "Mathematics",
    "options": [
      "5√2",
      "10√2",
      "20√2",
      "5/√2"
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "111. The height of a right circular cone with slant height 10cm and base radius 6cm is _____ (in cm)",
    "subject": "Mathematics",
    "options": [
      "4",
      "√136",
      "8",
      "16"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "112. In Geometric progression (G.P) 2, 2 2 , 4...... which term is 128.",
    "subject": "Mathematics",
    "options": [
      "12th",
      "10th",
      "13th",
      "11th"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "113. A bag contain 5x red balls and 3x+14 blue balls. If the probability of getting red ball is equal to half of probability of getting blue ball the total balls in a bag is",
    "subject": "Mathematics",
    "options": [
      "70",
      "50",
      "30",
      "25"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "114. In the formulae for finding the Median of a grouped data",
    "subject": "Mathematics",
    "options": [
      "Mid value of the median class",
      "Lower boundary of the median class",
      "Upper boundary of the median class",
      "Sum of the frequencies"
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "115. The first part of 'Siddhanta Siromani' Book is",
    "subject": "Mathematics",
    "options": [
      "Leelavathi",
      "Bijaganitam",
      "Graha Ganitam",
      "Goladhyaya"
    ],
    "correctAnswer": "1",
    "explanation": ""
  },
  {
    "question": "116. A 9th class student named Laxmi gave 'definition for the slant height of a cone'. This is related to following objective",
    "subject": "Mathematics",
    "options": [
      "Understanding",
      "Knowledge",
      "Application",
      "Skill"
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "117. 'Preparatory Value' is given in whose classification of educational values?",
    "subject": "Mathematics",
    "options": [
      "Young",
      "Breslich",
      "Munnick",
      "Locke"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "118. 'Picto-graphs' come under the category of",
    "subject": "Mathematics",
    "options": [
      "3D-Aids",
      "A.V. Aids",
      "Audio Aids",
      "2d-Aids"
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "119. The term \"Summative\" is derived from this word",
    "subject": "Mathematics",
    "options": [
      "Sum",
      "Summation",
      "Total",
      "Total Learning"
    ],
    "correctAnswer": "1",
    "explanation": ""
  },
  {
    "question": "120. One of the following is not an attribute of 'Heuristic Method'",
    "subject": "Mathematics",
    "options": [
      "Gives immense encouragement to the students",
      "Takes less time to conduct",
      "Chance to develop a sense of perception",
      "Develops self-study habits"
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "121. A particle moves along a circular path of radius 7m. The magnitude of displacement when it covers 1/4th of revolution is",
    "subject": "Science",
    "options": [
      "11m",
      "7√2 m",
      "0",
      "2√7 m"
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "122. If the distance between the objects is halved, then the gravitational force between them becomes",
    "subject": "Science",
    "options": [
      "4 times",
      "1/4 times",
      "2 times",
      "1/2 times"
    ],
    "correctAnswer": "1",
    "explanation": ""
  },
  {
    "question": "123. A: Ultrasonics are sound waves with very long wave lengths B: Ultrasonic waves move with the same velocity as sound waves Choose the correct option:",
    "subject": "Science",
    "options": [
      "Both A, B are correct",
      "A correct, B incorrect",
      "A incorrect, B correct",
      "Both A and B are incorrect"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "124. The temperature of a substance increases by 73K. On the centigrade scale, this increase is equal to",
    "subject": "Science",
    "options": [
      "-200° C",
      "200° C",
      "73° C",
      "346° C"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "125. There is a voltage drop of 220V across a wire of resistance 484Ω. The power consumed will be",
    "subject": "Science",
    "options": [
      "5/11 W",
      "11/5 W",
      "1/100 W",
      "100 W"
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "126. When a proton is moving perpendicular to magnetic field",
    "subject": "Science",
    "options": [
      "Magnetic field will not affect the motion of the proton",
      "Proton will bend in an arc of a circle",
      "Proton will continue to move in the same direction with increasing speed",
      "Proton will continue to move in the opposite direction with decreasing speed"
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "127. The final product in oxidation reaction of ethanol in presence of alkaline KMnO4",
    "subject": "Science",
    "options": [
      "Ethanal",
      "Methanoic acid",
      "Ethanoic acid",
      "Methanal"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "128. The constellation with distorted shape of letter 'M'",
    "subject": "Science",
    "options": [
      "Big dipper",
      "Cancer",
      "Cassiopeia",
      "Orion"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "129. Match the scientists in SET-A with their discoveries given in SET-B SET-A SET-B A) Rutherford P. Stationary orbits B) Sommerfeld Q. Electrons C) Neils Bohr R. Elliptical orbits D) Thomson S. Nucleus SET-A SET-B",
    "subject": "Science",
    "options": [
      "A-R, B-S, C-P, D-Q",
      "A-S, B-R, C-Q, D-P",
      "A-S, B-R, C-P, D-Q",
      "A-P, B-Q, C-R, D-S"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "130. \"The physical and chemical properties of elements are the periodic functions of the electronic configurations of their atoms\" This is stated by",
    "subject": "Science",
    "options": [
      "Mendleff",
      "Neils Bohr",
      "Moseley",
      "Heisenberg"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "131. Assertion(A): The alkalimetal, sodium stored in Kerosene Reason(R): Sodium is a highly reactive metal. Choose the correct answer.",
    "subject": "Science",
    "options": [
      "Both 'A'& 'R' correct. But 'R' is not correct explanation of 'A'",
      "Both 'A' & 'R' correct and 'R' is the correct explanation of 'A'",
      "A is correct and R is incorrect",
      "A is incorrect and R is correct"
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "132. Study the statements and choose correct option. Rohan: Most of the thermoplastics can be recycled. Roshan: Plastics are non-biodegradable.",
    "subject": "Science",
    "options": [
      "Rohan correct, Roshan incorrect",
      "Rohan incorrect , Roshan correct",
      "Both Rohan and Roshan incorrect",
      "Both Rohan and Roshan correct"
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "133. Identify the organism that does not have gills A) Fish B) Squid C) Octopus D) Whale",
    "subject": "Science",
    "options": [
      "A only",
      "B and C",
      "D only",
      "C and D"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "134. The tissue that is seen in lining of kidney tubule and ducts of salivary glands",
    "subject": "Science",
    "options": [
      "Squamous epithelial tissue",
      "Stratified epithelial tissue",
      "Cuboidal epithelial tissue",
      "Columnar epithelial tissue"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "135. The diseases caused by bacteria are A) Polio B) Typhoid C) Malaria D) Citrus Canker",
    "subject": "Science",
    "options": [
      "A and D",
      "B and D",
      "A and C",
      "B and C"
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "136. Assertion (A): The Lipase enzyme in bile juice digests the fats. Reason(R): The process of converting large fat globules into small ones is called emulsification. Choose the correct answer",
    "subject": "Science",
    "options": [
      "A is correct; R is incorrect",
      "A is incorrect; R is correct",
      "Both A and R are correct and R is correct explanation of A",
      "Both A and R are correct but R is not a correct explanation of A"
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "137. The correct order of events in respiration is A) Gaseous exchange at tissue level B) Gaseous exchange at Lung level C) Breathing D) Cellular respiration E) Gas transport by blood",
    "subject": "Science",
    "options": [
      "B, E, A, D, C",
      "C, D, B, A, E",
      "C, B, E, A, D",
      "A, C, D, E, B"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "138. The Incorrect statement from the following is A) The tricuspid valve allow blood from Right auricle to ventricle. B) The mitral valve allow blood from left ventricle to auricle. C) The pulmonary valve allow blood from Right ventricle to pulmonary artery. D) The aortic valves allow blood from left ventricle to body parts.",
    "subject": "Science",
    "options": [
      "A only",
      "B only",
      "A and B",
      "C and D"
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "139. Match the following i) Caffeine a) Antimalarial drug ii) Nicotine b) Central nervous system stimulant iii) Reserpine c) Insecticide iv) Quinine d) Snake bite",
    "subject": "Science",
    "options": [
      "i-b, ii-d, iii-a, iv-c",
      "i-d, ii-a, iii-c, iv-b",
      "i-b, ii-c, iii-d, iv-a",
      "i-d, ii-b, iii-c, iv-a"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "140. The correct statement about Diencephalon from the following is",
    "subject": "Science",
    "options": [
      "It has centers for Vasomotor activities",
      "It controls voluntary movements initiated by cerebrum",
      "It controls coughing and sneezing",
      "It controls reflex centres for muscular activities"
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "141. The incorrect statement from the following is",
    "subject": "Science",
    "options": [
      "The prostate gland secretions supply nutrients to sperms",
      "Cowper glands secretions activates sperms",
      "Seminal fluid gives energy to sperms outside the body",
      "Vasa efferentia carry sperms to epididymis"
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "142. The product that is not produced from petroleum",
    "subject": "Science",
    "options": [
      "Nylon",
      "Wax",
      "Medical devices",
      "Cellulose"
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "143. The first reserve forest of India is",
    "subject": "Science",
    "options": [
      "Satpura National Park",
      "Kaziranga National Park",
      "Great Nicobar Biosphere Reserve",
      "Lockchao Wildlife Sanctuary"
    ],
    "correctAnswer": "1",
    "explanation": ""
  },
  {
    "question": "144. The organic impurities in sewage water are A) Herbicide B) Phosphate C) Nitrogen D) Urine",
    "subject": "Science",
    "options": [
      "A and C",
      "B and D",
      "B and C",
      "A and D"
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "145. This does not belong to the academic standard \"Conceptual understanding\"",
    "subject": "Science",
    "options": [
      "Classification",
      "Analysis",
      "Asking questions",
      "Giving reasons"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "146. The incorrect statement about field trip is",
    "subject": "Science",
    "options": [
      "Teacher and student representative should visit before the field trip.",
      "We should not discuss with students the experiences and observations of previous trips.",
      "Either individual or group wise reports has be submitted by the students.",
      "Student reports should be evaluated after completion of the visit."
    ],
    "correctAnswer": "2",
    "explanation": ""
  },
  {
    "question": "147. This is not a co-curricular programme suggested by NCF-2005 for science curriculum",
    "subject": "Science",
    "options": [
      "Science corners",
      "utilization of science kits",
      "utilization of ICT in Science teaching",
      "conducting exams for content"
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "148. \"A project is a bit of real-life that has been imported into the school\". This was stated by",
    "subject": "Science",
    "options": [
      "W.H. Kilpatrick",
      "Parker",
      "J.A. Stevenson",
      "Ballard"
    ],
    "correctAnswer": "4",
    "explanation": ""
  },
  {
    "question": "149. According to Edgar Dale's cone of Experience the percentage of learning that occurs in a student through directly attending a demonstration of experiment to show that sunlight is required for photosynthesis by a teacher is",
    "subject": "Science",
    "options": [
      "20%",
      "50%",
      "70%",
      "90%"
    ],
    "correctAnswer": "3",
    "explanation": ""
  },
  {
    "question": "150. This among the following is not a fundamental principle in formulation of \"A.P. State Curriculum Frame Work - 2011\"",
    "subject": "Science",
    "options": [
      "Connecting knowledge to life outside the school",
      "Medium of instruction shall, as for as possible, be in English",
      "Simplifying examinations and making them an integral part of teaching-learning processes",
      "Prioritizing children's culture, experiences and local context in the classroom."
    ],
    "correctAnswer": "2",
    "explanation": ""
  }
];

// Parse default preset into structured exam object
const parsedDefaultExam = parseCustomJSONTest({
  title: "TET Paper 2A - Maths & Science Mock Test",
  subtitle: "Teacher Eligibility Test Paper 2A (Full 90 Questions)",
  questions: DEFAULT_PRESET_QUESTIONS
});

export const MOCK_EXAMS = [
  parsedDefaultExam
];

export const GENERAL_INSTRUCTIONS = [
  "1. Total duration of examination is 1 minute per question (e.g. 90 questions = 90 minutes).",
  "2. The clock will be set at the server. The countdown timer in the top right corner of screen will display the remaining time available for you to complete the examination.",
  "3. The Question Palette displayed on the right side of screen will show the status of each question using standard status symbols:",
  "   - Grey: You have not visited the question yet.",
  "   - Red: You have not answered the question.",
  "   - Green: You have answered the question.",
  "   - Purple: You have NOT answered the question, but have marked the question for review.",
  "   - Purple with Green Circle/Dot: The question(s) 'Answered and Marked for Review' will be considered for evaluation.",
  "4. Navigating to a Question:",
  "   - Click on the question number in the Question Palette at the right of your screen to go to that numbered question directly.",
  "   - Click on 'Save & Next' to save your answer for the current question and then go to the next question.",
  "   - Click on 'Mark for Review & Next' to save your answer for the current question, mark it for review, and then go to the next question.",
  "5. Answering a Question:",
  "   - Click on one of the option buttons to select your choice.",
  "   - To deselect your chosen answer, click 'Clear Response'.",
  "   - To save your answer, you MUST click 'Save & Next'.",
  "6. Marking Scheme: Each correct question carries +1 Mark. There is NO NEGATIVE MARKING (0 marks for incorrect or unanswered questions).",
  "7. Note that ONLY Questions for which answers are saved or marked for review after answering will be considered for evaluation."
];
