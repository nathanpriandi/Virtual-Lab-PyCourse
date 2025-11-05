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
        correctAnswer: 2
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
  },
  'data-types': {
    title: 'Data Types Quiz',
    questions: [
      {
        question: "Tipe data dari x = [\"apple\", \"banana\"] adalah...",
        options: ["tuple", "list", "set", "dict"],
        correctAnswer: 1
      },
      {
        question: "Tipe data mana yang merupakan kumpulan pasangan kunci-nilai (key-value pairs)?",
        options: ["list", "tuple", "dict", "set"],
        correctAnswer: 2
      }
    ]
  },
  'numbers': {
    title: 'Numbers Quiz',
    questions: [
      {
        question: "Apa tipe data dari x = 5.0?",
        options: ["int", "float", "complex", "str"],
        correctAnswer: 1
      },
      {
        question: "Apa hasil dari operasi floor division 10 // 3?",
        options: ["3.33", "3.0", "4", "3"],
        correctAnswer: 3
      }
    ]
  },
  'casting': {
    title: 'Casting Quiz',
    questions: [
      {
        question: "Apa hasil dari kode int(8.9)?",
        options: ["8.9", "9", "8", "Error"],
        correctAnswer: 2
      },
      {
        question: "Fungsi apa yang digunakan untuk mengubah integer menjadi string?",
        options: ["string()", "castToString()", "str()", "toString()"],
        correctAnswer: 2
      }
    ]
  },
  'boolean': {
    title: 'Boolean Quiz',
    questions: [
      {
        question: "Manakah dari nilai berikut yang dianggap True dalam konteks boolean?",
        options: ["0", "\"\" (string kosong)", "None", "\"False\" (string)"],
        correctAnswer: 3
      },
      {
        question: "Apa hasil dari bool([])?",
        options: ["True", "False", "Error", "None"],
        correctAnswer: 1
      }
    ]
  },
  'operator': {
    title: 'Operator Quiz',
    questions: [
      {
        question: "Operator mana yang digunakan untuk perpangkatan (exponentiation)?",
        options: ["^", "**", "!", "pow()"],
        correctAnswer: 1
      },
      {
        question: "Apa nama dari operator `%` di Python?",
        options: ["Pembagian", "Persentase", "Modulus", "Sama dengan"],
        correctAnswer: 2
      }
    ]
  },
  'if-else': {
    title: 'Conditionals Quiz',
    questions: [
      {
        question: "Keyword apa yang digunakan untuk kondisi 'else if' di Python?",
        options: ["elseif", "else if", "elif", "case"],
        correctAnswer: 2
      },
      {
        question: "Apakah Python menggunakan kurung kurawal `{}` untuk mendefinisikan blok kode if?",
        options: ["Ya", "Tidak"],
        correctAnswer: 1
      }
    ]
  },
  'while-loop': {
    title: 'While Loop Quiz',
    questions: [
      {
        question: "Statement apa yang digunakan untuk menghentikan iterasi saat ini dan lanjut ke iterasi berikutnya?",
        options: ["break", "stop", "next", "continue"],
        correctAnswer: 3
      },
      {
        question: "Apa yang akan terjadi jika Anda lupa menulis `i += 1` di dalam `while i < 5:`?",
        options: ["Error", "Loop berhenti setelah 1 iterasi", "Infinite loop (perulangan tak terbatas)", "Tidak terjadi apa-apa"],
        correctAnswer: 2
      }
    ]
  },
  'for-loop': {
    title: 'For Loop Quiz',
    questions: [
      {
        question: "Fungsi apa yang umum digunakan dengan for loop untuk melakukan perulangan sebanyak N kali?",
        options: ["loop()", "repeat()", "range()", "count()"],
        correctAnswer: 2
      },
      {
        question: "Bisakah `for loop` digunakan untuk melakukan iterasi pada sebuah string?",
        options: ["Ya", "Tidak"],
        correctAnswer: 0
      }
    ]
  },
  'functions': {
    title: 'Functions Quiz',
    questions: [
      {
        question: "Keyword apa yang digunakan untuk mendefinisikan sebuah fungsi di Python?",
        options: ["function", "def", "fun", "define"],
        correctAnswer: 1
      },
      {
        question: "Statement apa yang digunakan untuk mengirim nilai kembali dari sebuah fungsi?",
        options: ["send", "return", "give", "exit"],
        correctAnswer: 1
      }
    ]
  }
};

module.exports = quizzes;