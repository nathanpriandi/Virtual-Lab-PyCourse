import variablesImage from '../assets/variables.jpg';
import dataTypesImage from '../assets/data types.png';
import numbersImage from '../assets/numbers.png';
import castingImage from '../assets/casting.png';
import booleanImage from '../assets/boolean.png';
import operatorsImage from '../assets/operators.png';
import conditionalsImage from '../assets/conditionals.jpg';
import whileLoopImage from '../assets/while loop.jpg';
import forLoopImage from '../assets/for loop.jpg';
import functionsImage from '../assets/function.jpg';

export const modules = [
  {
    id: 'variables-syntax',
    title: 'Variables & Syntax',
    imageUrl: variablesImage,
    defaultCode: '# Selamat datang di modul Variabel & Sintaks!\n# Coba jalankan kode di bawah ini atau tulis kodemu sendiri.\n\nx = 10\nnama = "PyCourse"\n\nprint("Halo, " + nama + "!")\nprint("Nilai x adalah:", x)\n',
    quiz: {
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
        },
        {
          question: "Bagaimana cara menulis komentar satu baris di Python?",
          options: [
            "// Ini komentar",
            "/* Ini komentar */",
            "# Ini komentar",
            "<!-- Ini komentar -->"
          ],
        },
        {
          question: "Tipe data untuk menyimpan teks dalam Python adalah...",
          options: [
            "char",
            "string",
            "txt",
            "str"
          ],
        }
      ]
    },
    materi: `
      <h3>Memulai dengan Python</h3>
      <p>Python dikenal dengan sintaksnya yang sederhana dan mudah dibaca, mirip dengan bahasa Inggris. Python menggunakan indentasi (spasi di awal baris) untuk mendefinisikan blok kode, tidak seperti bahasa lain yang sering menggunakan kurung kurawal.</p>

      <h3>Apa itu Variabel?</h3>
      <p>Variabel adalah wadah untuk menyimpan nilai data. Dalam Python, variabel dibuat saat Anda pertama kali memberinya nilai. Anda tidak perlu mendeklarasikan tipe variabel secara eksplisit.</p>
      <pre><code># x adalah variabel bertipe int (integer)\nx = 5\n\n# nama adalah variabel bertipe str (string)\nnama = "Michael"\n\nprint(x)\nprint(nama)</code></pre>
      
      <h3>Aturan Penamaan Variabel</h3>
      <p>Sebuah variabel harus dimulai dengan huruf atau karakter garis bawah (_). Variabel tidak bisa dimulai dengan angka dan hanya boleh berisi karakter alfanumerik dan garis bawah (A-z, 0-9, dan _). Ingat, nama variabel di Python bersifat <b>case-sensitive</b> (<code>usia</code> dan <code>USIA</code> adalah dua variabel yang berbeda).</p>
      
      <h3>Komentar (Comments)</h3>
      <p>Komentar digunakan untuk menjelaskan kode dan membuat kode lebih mudah dibaca. Komentar di Python dimulai dengan tanda <code>#</code>.</p>
      <pre><code># Ini adalah komentar satu baris\nprint("Hello, World!")</code></pre>
    `
  },
  {
    id: 'data-types',
    title: 'Data Types',
    imageUrl: dataTypesImage,
    defaultCode: '# Selamat datang di modul Tipe Data!\n# Coba periksa tipe data variabel di bawah ini.\n\nx = 10\ny = "Hello"\nz = [1, 2, 3]\n\nprint(type(x))\nprint(type(y))\nprint(type(z))\n',
    quiz: {
      title: 'Data Types Quiz',
      questions: [
        {
          question: "Tipe data dari x = [\"apple\", \"banana\"] adalah...",
          options: ["tuple", "list", "set", "dict"],
        },
        {
          question: "Tipe data mana yang merupakan kumpulan pasangan kunci-nilai (key-value pairs)?",
          options: ["list", "tuple", "dict", "set"],
        }
      ]
    },
    materi: `
      <h3>Tipe Data Bawaan</h3>
      <p>Variabel dapat menyimpan data dari tipe yang berbeda, dan tipe yang berbeda dapat melakukan hal yang berbeda. Python memiliki tipe data bawaan berikut secara default:</p>
      <ul>
        <li><b>Text Type:</b> <code>str</code></li>
        <li><b>Numeric Types:</b> <code>int</code>, <code>float</code>, <code>complex</code></li>
        <li><b>Sequence Types:</b> <code>list</code>, <code>tuple</code>, <code>range</code></li>
        <li><b>Mapping Type:</b> <code>dict</code></li>
        <li><b>Set Types:</b> <code>set</code>, <code>frozenset</code></li>
        <li><b>Boolean Type:</b> <code>bool</code></li>
        <li><b>Binary Types:</b> <code>bytes</code>, <code>bytearray</code>, <code>memoryview</code></li>
      </ul>
      
      <h3>Mendapatkan Tipe Data</h3>
      <p>Anda bisa mendapatkan tipe data dari variabel apa pun dengan menggunakan fungsi <code>type()</code>.</p>
      <pre><code>x = 5\nprint(type(x))  # Output: <class 'int'>\n\ny = "Hello"\nprint(type(y))  # Output: <class 'str'>\n\nz = 1.5\nprint(type(z))  # Output: <class 'float'></code></pre>
    `
  },
  {
    id: 'numbers',
    title: 'Numbers',
    imageUrl: numbersImage,
    defaultCode: '# Selamat datang di modul Angka!\n# Coba operasikan angka-angka di bawah ini.\n\na = 10\nb = 3\n\nprint("a + b =", a + b)\nprint("a // b =", a // b)\n',
    quiz: {
      title: 'Numbers Quiz',
      questions: [
        {
          question: "Apa tipe data dari x = 5.0?",
          options: ["int", "float", "complex", "str"],
        },
        {
          question: "Apa hasil dari operasi floor division 10 // 3?",
          options: ["3.33", "3.0", "4", "3"],
        }
      ]
    },
    materi: `
      <h3>Tipe Angka Python</h3>
      <p>Ada tiga tipe angka numerik dalam Python: <code>int</code>, <code>float</code>, dan <code>complex</code>.</p>
      
      <h3>Integer (int)</h3>
      <p>Integer adalah bilangan bulat, positif atau negatif, tanpa desimal, dengan panjang tidak terbatas.</p>
      <pre><code>x = 1\ny = 1234567890\nz = -32</code></pre>

      <h3>Float</h3>
      <p>Float, atau "floating point number", adalah angka, positif atau negatif, yang mengandung satu atau lebih desimal.</p>
      <pre><code>x = 1.10\ny = 1.0\nz = -35.59</code></pre>

      <h3>Complex</h3>
      <p>Bilangan kompleks ditulis dengan "j" sebagai bagian imajiner.</p>
      <pre><code>x = 3 + 5j\ny = 5j\nz = -5j</code></pre>
    `
  },
  {
    id: 'casting',
    title: 'Casting',
    imageUrl: castingImage,
    defaultCode: '# Selamat datang di modul Casting!\n# Coba ubah tipe data variabel.\n\nx = "123"\ny = int(x)\n\nprint(type(x))\nprint(type(y))\n',
    quiz: {
      title: 'Casting Quiz',
      questions: [
        {
          question: "Apa hasil dari kode int(8.9)?",
          options: ["8.9", "9", "8", "Error"],
        },
        {
          question: "Fungsi apa yang digunakan untuk mengubah integer menjadi string?",
          options: ["string()", "castToString()", "str()", "toString()"],
        }
      ]
    },
    materi: `
      <h3>Apa itu Casting?</h3>
      <p>Terkadang, Anda mungkin perlu menentukan tipe data pada sebuah variabel. Ini dapat dilakukan dengan *casting*. Python adalah bahasa berorientasi objek, dan karenanya ia menggunakan fungsi konstruktor untuk melakukan casting:</p>
      <ul>
        <li><code>int()</code> - membuat bilangan bulat dari literal integer, float (dengan membulatkan ke bawah), atau string (jika string mewakili bilangan bulat).</li>
        <li><code>float()</code> - membuat bilangan float dari literal integer, float, atau string (jika string mewakili float atau integer).</li>
        <li><code>str()</code> - membuat string dari berbagai tipe data, termasuk integer, float, dan string.</li>
      </ul>
      
      <h3>Contoh Casting</h3>
      <pre><code># Integer\nx = int(1)     # x akan menjadi 1\ny = int(2.8)   # y akan menjadi 2\nz = int("3")   # z akan menjadi 3\n\n# Float\na = float(1)     # a akan menjadi 1.0\nb = float(2.8)   # b akan menjadi 2.8\nc = float("3")   # c akan menjadi 3.0\n\n# String\ns = str("s1")    # s akan menjadi 's1'\nt = str(2)       # t akan menjadi '2'\nu = str(3.0)     # u akan menjadi '3.0'</code></pre>
    `
  },
  {
    id: 'boolean',
    title: 'Boolean',
    imageUrl: booleanImage,
    defaultCode: '# Selamat datang di modul Boolean!\n# Coba evaluasi ekspresi boolean.\n\nprint(10 > 9)\nprint(bool("Hello"))\nprint(bool(0))\n',
    quiz: {
      title: 'Boolean Quiz',
      questions: [
        {
          question: "Manakah dari nilai berikut yang dianggap True dalam konteks boolean?",
          options: ["0", "\"\" (string kosong)", "None", "\"False\" (string)"],
        },
        {
          question: "Apa hasil dari bool([])?",
          options: ["True", "False", "Error", "None"],
        }
      ]
    },
    materi: `
      <h3>Nilai Boolean</h3>
      <p>Dalam pemrograman, Anda sering perlu tahu apakah suatu ekspresi itu <code>True</code> atau <code>False</code>. Anda dapat mengevaluasi ekspresi apa pun di Python, dan mendapatkan salah satu dari dua jawaban, <code>True</code> atau <code>False</code>.</p>
      
      <h3>Mengevaluasi Nilai</h3>
      <p>Saat Anda membandingkan dua nilai, ekspresi tersebut dievaluasi dan Python mengembalikan jawaban Boolean.</p>
      <pre><code>print(10 > 9)   # Output: True\nprint(10 == 9)  # Output: False\nprint(10 < 9)   # Output: False</code></pre>
      
      <h3>Hampir Semua Nilai adalah True</h3>
      <p>Hampir semua nilai dievaluasi sebagai <code>True</code> jika memiliki semacam konten. String apa pun adalah <code>True</code>, kecuali string kosong. Angka apa pun adalah <code>True</code>, kecuali 0. List, tuple, set, dan dictionary apa pun adalah <code>True</code>, kecuali yang kosong.</p>
      
      <h3>Beberapa Nilai adalah False</h3>
      <p>Nilai-nilai berikut dievaluasi sebagai <code>False</code>: <code>False</code>, <code>None</code>, <code>0</code>, <code>""</code>, <code>()</code>, <code>[]</code>, <code>{}</code>.</p>
    `
  },
  {
    id: 'operator',
    title: 'Operator',
    imageUrl: operatorsImage,
    defaultCode: '# Selamat datang di modul Operator!\n# Coba berbagai operasi matematika.\n\na = 15\nb = 4\n\nprint("a + b =", a + b)\nprint("a % b =", a % b)\nprint("a ** b =", a ** b)\n',
    quiz: {
      title: 'Operator Quiz',
      questions: [
        {
          question: "Operator mana yang digunakan untuk perpangkatan (exponentiation)?",
          options: ["^", "**", "!", "pow()"],
        },
        {
          question: "Apa nama dari operator `%` di Python?",
          options: ["Pembagian", "Persentase", "Modulus", "Sama dengan"],
        }
      ]
    },
    materi: `
      <h3>Operator Python</h3>
      <p>Operator digunakan untuk melakukan operasi pada variabel dan nilai. Python membagi operator ke dalam beberapa grup:</p>
      <ul>
        <li>Operator Aritmatika</li>
        <li>Operator Penugasan (Assignment)</li>
        <li>Operator Perbandingan (Comparison)</li>
        <li>Operator Logika (Logical)</li>
        <li>Operator Identitas (Identity)</li>
        <li>Operator Keanggotaan (Membership)</li>
      </ul>

      <h3>Operator Aritmatika</h3>
      <p>Digunakan dengan nilai numerik untuk melakukan operasi matematika umum:</p>
      <ul>
        <li><code>+</code> (Penjumlahan)</li>
        <li><code>-</code> (Pengurangan)</li>
        <li><code>*</code> (Perkalian)</li>
        <li><code>/</code> (Pembagian)</li>
        <li><code>%</code> (Modulus - sisa bagi)</li>
        <li><code>**</code> (Pangkat)</li>
        <li><code>//</code> (Floor division - pembulatan ke bawah)</li>
      </ul>
      <pre><code>x = 10\ny = 3\nprint(x + y)  # Output: 13\nprint(x % y)  # Output: 1\nprint(x // y) # Output: 3</code></pre>

      <h3>Operator Perbandingan</h3>
      <p>Digunakan untuk membandingkan dua nilai:</p>
      <ul>
        <li><code>==</code> (Sama dengan)</li>
        <li><code>!=</code> (Tidak sama dengan)</li>
        <li><code>></code> (Lebih besar dari)</li>
        <li><code><</code> (Lebih kecil dari)</li>
        <li><code>>=</code> (Lebih besar atau sama dengan)</li>
        <li><code><=</code> (Lebih kecil atau sama dengan)</li>
      </ul>
    `
  },
  {
    id: 'if-else',
    title: 'Conditionals',
    imageUrl: conditionalsImage,
    defaultCode: '# Selamat datang di modul Kondisional!\n# Coba buat keputusan dengan if-else.\n\numur = 18\n\nif umur >= 18:\n  print("Anda dewasa")\nelse:\n  print("Anda belum dewasa")\n',
    quiz: {
      title: 'Conditionals Quiz',
      questions: [
        {
          question: "Keyword apa yang digunakan untuk kondisi 'else if' di Python?",
          options: ["elseif", "else if", "elif", "case"],
        },
        {
          question: "Apakah Python menggunakan kurung kurawal `{}` untuk mendefinisikan blok kode if?",
          options: ["Ya", "Tidak"],
        }
      ]
    },
    materi: `
      <h3>Kondisi Python dan Pernyataan If</h3>
      <p>Python mendukung kondisi logika umum dari matematika:</p>
      <ul>
        <li>Sama dengan: <code>a == b</code></li>
        <li>Tidak Sama dengan: <code>a != b</code></li>
        <li>Kurang dari: <code>a < b</code></li>
        <li>Kurang dari atau sama dengan: <code>a <= b</code></li>
        <li>Lebih besar dari: <code>a > b</code></li>
        <li>Lebih besar dari atau sama dengan: <code>a >= b</code></li>
      </ul>

      <h3>If, Elif, dan Else</h3>
      <p>Kondisi ini dapat digunakan dalam pernyataan "if" dan "loop".</p>
      <pre><code>a = 200\nb = 33\n\nif b > a:\n  print("b lebih besar dari a")\nelif a == b:\n  print("a dan b sama")\nelse:\n  print("a lebih besar dari b")</code></pre>
      
      <h3>Penjelasan</h3>
      <ul>
        <li><code>if</code>: Ini adalah kondisi pertama. Jika <code>True</code>, blok kodenya dieksekusi.</li>
        <li><code>elif</code>: Singkatan dari "else if". Ini adalah kondisi opsional untuk dicoba jika kondisi <code>if</code> pertama <code>False</code>.</li>
        <li><code>else</code>: Blok opsional ini akan dieksekusi jika tidak ada kondisi <code>if</code> atau <code>elif</code> sebelumnya yang <code>True</code>.</li>
      </ul>
    `
  },
  {
    id: 'while-loop',
    title: 'While Loop',
    imageUrl: whileLoopImage,
    defaultCode: '# Selamat datang di modul While Loop!\n# Coba buat perulangan sederhana.\n\ni = 0\nwhile i < 3:\n  print("Iterasi ke-", i)\n  i += 1\n',
    quiz: {
      title: 'While Loop Quiz',
      questions: [
        {
          question: "Statement apa yang digunakan untuk menghentikan iterasi saat ini dan lanjut ke iterasi berikutnya?",
          options: ["break", "stop", "next", "continue"],
        },
        {
          question: "Apa yang akan terjadi jika Anda lupa menulis `i += 1` di dalam `while i < 5:`?",
          options: ["Error", "Loop berhenti setelah 1 iterasi", "Infinite loop (perulangan tak terbatas)", "Tidak terjadi apa-apa"],
        }
      ]
    },
    materi: `
      <h3>Python While Loop</h3>
      <p>Dengan *while loop*, kita dapat mengeksekusi satu set pernyataan selama kondisi bernilai benar (True).</p>
      <pre><code># Cetak i selama i kurang dari 6\ni = 1\nwhile i < 6:\n  print(i)\n  i += 1  # Penting! Jangan lupa menaikkan i</code></pre>
      <p><b>Penting:</b> Ingatlah untuk menambah nilai variabel i, jika tidak, *loop* akan berlanjut selamanya (infinite loop).</p>

      <h3>Kata Kunci <code>break</code></h3>
      <p>Dengan pernyataan <code>break</code>, kita dapat menghentikan *loop* bahkan jika kondisi *while* masih benar.</p>
      <pre><code># Keluar dari loop saat i adalah 3\ni = 1\nwhile i < 6:\n  print(i)\n  if i == 3:\n    break\n  i += 1</code></pre>

      <h3>Kata Kunci <code>continue</code></h3>
      <p>Dengan pernyataan <code>continue</code>, kita dapat menghentikan iterasi saat ini dan melanjutkan ke iterasi berikutnya.</p>
      <pre><code># Lewati iterasi jika i adalah 3\ni = 0\nwhile i < 6:\n  i += 1\n  if i == 3:\n    continue\n  print(i) # Output: 1, 2, 4, 5, 6</code></pre>
    `
  },
  {
    id: 'for-loop',
    title: 'For Loop',
    imageUrl: forLoopImage, 
    defaultCode: '# Selamat datang di modul For Loop!\n# Coba buat perulangan dengan for.\n\nbuah = ["apel", "pisang", "ceri"]\nfor x in buah:\n  print(x)\n',
    quiz: {
      title: 'For Loop Quiz',
      questions: [
        {
          question: "Fungsi apa yang umum digunakan dengan for loop untuk melakukan perulangan sebanyak N kali?",
          options: ["loop()", "repeat()", "range()", "count()"],
        },
        {
          question: "Bisakah `for loop` digunakan untuk melakukan iterasi pada sebuah string?",
          options: ["Ya", "Tidak"],
        }
      ]
    },
    materi: `
      <h3>Python For Loop</h3>
      <p>Sebuah *for loop* digunakan untuk melakukan iterasi (perulangan) pada sebuah urutan (seperti <code>list</code>, <code>tuple</code>, <code>dict</code>, <code>set</code>, atau <code>string</code>).</p>
      
      <h3>Iterasi pada String</h3>
      <p>Bahkan string adalah objek yang dapat diiterasi, mereka berisi urutan karakter:</p>
      <pre><code># Ulangi huruf-huruf dalam kata "banana"\nfor x in "banana":\n  print(x)</code></pre>

      <h3>Kata Kunci <code>break</code></h3>
      <p>Sama seperti di *while loop*, <code>break</code> dapat menghentikan *loop* sebelum selesai.</p>
      <pre><code>fruits = ["apple", "banana", "cherry"]\nfor x in fruits:\n  print(x)\n  if x == "banana":\n    break</code></pre>

      <h3>Fungsi <code>range()</code></h3>
      <p>Untuk mengulang blok kode sebanyak jumlah tertentu, kita bisa menggunakan fungsi <code>range()</code>. Fungsi <code>range()</code> mengembalikan urutan angka, dimulai dari 0 secara default, dan bertambah 1, dan berakhir pada angka yang ditentukan.</p>
      <pre><code># Cetak angka dari 0 hingga 5\nfor x in range(6):\n  print(x)</code></pre>
    `
  },
  {
    id: 'functions',
    title: 'Functions',
    imageUrl: functionsImage,
    defaultCode: '# Selamat datang di modul Fungsi!\n# Coba buat dan panggil fungsi pertamamu.\n\ndef sapa(nama):\n  print("Halo, " + nama + "!")\n\nsapa("Dunia")\n',
    quiz: {
      title: 'Functions Quiz',
      questions: [
        {
          question: "Keyword apa yang digunakan untuk mendefinisikan sebuah fungsi di Python?",
          options: ["function", "def", "fun", "define"],
        },
        {
          question: "Statement apa yang digunakan untuk mengirim nilai kembali dari sebuah fungsi?",
          options: ["send", "return", "give", "exit"],
        }
      ]
    },
    materi: `
      <h3>Apa itu Fungsi?</h3>
      <p>Fungsi adalah blok kode yang hanya berjalan ketika dipanggil. Anda dapat meneruskan data, yang dikenal sebagai parameter, ke dalam suatu fungsi. Sebuah fungsi dapat mengembalikan data sebagai hasilnya.</p>
      
      <h3>Membuat dan Memanggil Fungsi</h3>
      <p>Dalam Python, fungsi didefinisikan menggunakan kata kunci <code>def</code>:</p>
      <pre><code># Mendefinisikan fungsi\ndef sapaan_saya():\n  print("Halo dari dalam fungsi!")\n
# Memanggil fungsi\nsapaan_saya()</code></pre>

      <h3>Argumen (Parameter)</h3>
      <p>Informasi dapat diteruskan ke fungsi sebagai argumen. Argumen ditentukan setelah nama fungsi, di dalam tanda kurung.</p>
      <pre><code>def sapaan_nama(nama):\n  print("Halo, " + nama + "!")\n
sapaan_nama("Michael")\nsapaan_nama("Budi")</code></pre>

      <h3>Kata Kunci <code>return</code></h3>
      <p>Untuk membiarkan fungsi mengembalikan nilai, gunakan pernyataan <code>return</code>:</p>
      <pre><code>def kali_lima(x):\n  return 5 * x\n
print(kali_lima(3))  # Output: 15\nprint(kali_lima(10)) # Output: 50</code></pre>
    `
  },
];