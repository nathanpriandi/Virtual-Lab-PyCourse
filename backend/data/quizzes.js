const quizzes = {
  'variables-syntax': {
    title: 'Variables & Syntax Quiz',
    questions: [
      {
        question: "Manakah dari berikut ini yang merupakan nama variabel yang valid di Python?",
        options: [
          "1variable",
          "variable-name",
          "_variable_name",
          "variable name"
        ],
        correctAnswer: 2 // Index of the correct option
      },
      {
        question: "Bagaimana cara menulis komentar satu baris di Python?",
        options: [
          "// Ini komentar",
          "/* Ini komentar */",
          "# Ini komentar",
          "<!-- Ini komentar -->"
        ],
        correctAnswer: 2
      },
      {
        question: "Tipe data untuk menyimpan teks dalam Python adalah...",
        options: [
          "char",
          "string",
          "txt",
          "str"
        ],
        correctAnswer: 3
      }
    ]
  }
  // Tambahkan kuis untuk modul lain di sini
};

module.exports = quizzes;
