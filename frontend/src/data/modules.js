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
      <pre><code># x adalah variabel bertipe int (integer)
x = 5

# nama adalah variabel bertipe str (string)
nama = "Michael"

print(x)
print(nama)</code></pre>
      
      <h3>Aturan Penamaan Variabel</h3>
      <p>Sebuah variabel harus dimulai dengan huruf atau karakter garis bawah (_). Variabel tidak bisa dimulai dengan angka dan hanya boleh berisi karakter alfanumerik dan garis bawah (A-z, 0-9, dan _). Ingat, nama variabel di Python bersifat <b>case-sensitive</b> (<code>usia</code> dan <code>USIA</code> adalah dua variabel yang berbeda).</p>
      
      <h3>Komentar (Comments)</h3>
      <p>Komentar digunakan untuk menjelaskan kode dan membuat kode lebih mudah dibaca. Komentar di Python dimulai dengan tanda <code>#</code>.</p>
      <pre><code># Ini adalah komentar satu baris
print("Hello, World!")</code></pre>
    `
  },
  {
    id: 'data-types',
    title: 'Data Types',
    imageUrl: dataTypesImage,
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
      <pre><code>x = 5
print(type(x))  # Output: <class 'int'>

y = "Hello"
print(type(y))  # Output: <class 'str'>

z = 1.5
print(type(z))  # Output: <class 'float'></code></pre>
    `
  },
  {
    id: 'numbers',
    title: 'Numbers',
    imageUrl: numbersImage,
    materi: `
      <h3>Tipe Angka Python</h3>
      <p>Ada tiga tipe angka numerik dalam Python: <code>int</code>, <code>float</code>, dan <code>complex</code>.</p>
      
      <h3>Integer (int)</h3>
      <p>Integer adalah bilangan bulat, positif atau negatif, tanpa desimal, dengan panjang tidak terbatas.</p>
      <pre><code>x = 1
y = 1234567890
z = -32</code></pre>

      <h3>Float</h3>
      <p>Float, atau "floating point number", adalah angka, positif atau negatif, yang mengandung satu atau lebih desimal.</p>
      <pre><code>x = 1.10
y = 1.0
z = -35.59</code></pre>

      <h3>Complex</h3>
      <p>Bilangan kompleks ditulis dengan "j" sebagai bagian imajiner.</p>
      <pre><code>x = 3 + 5j
y = 5j
z = -5j</code></pre>
    `
  },
  {
    id: 'casting',
    title: 'Casting',
    imageUrl: castingImage,
    materi: `
      <h3>Apa itu Casting?</h3>
      <p>Terkadang, Anda mungkin perlu menentukan tipe data pada sebuah variabel. Ini dapat dilakukan dengan *casting*. Python adalah bahasa berorientasi objek, dan karenanya ia menggunakan fungsi konstruktor untuk melakukan casting:</p>
      <ul>
        <li><code>int()</code> - membuat bilangan bulat dari literal integer, float (dengan membulatkan ke bawah), atau string (jika string mewakili bilangan bulat).</li>
        <li><code>float()</code> - membuat bilangan float dari literal integer, float, atau string (jika string mewakili float atau integer).</li>
        <li><code>str()</code> - membuat string dari berbagai tipe data, termasuk integer, float, dan string.</li>
      </ul>
      
      <h3>Contoh Casting</h3>
      <pre><code># Integer
x = int(1)     # x akan menjadi 1
y = int(2.8)   # y akan menjadi 2
z = int("3")   # z akan menjadi 3

# Float
a = float(1)     # a akan menjadi 1.0
b = float(2.8)   # b akan menjadi 2.8
c = float("3")   # c akan menjadi 3.0

# String
s = str("s1")    # s akan menjadi 's1'
t = str(2)       # t akan menjadi '2'
u = str(3.0)     # u akan menjadi '3.0'</code></pre>
    `
  },
  {
    id: 'boolean',
    title: 'Boolean',
    imageUrl: booleanImage,
    materi: `
      <h3>Nilai Boolean</h3>
      <p>Dalam pemrograman, Anda sering perlu tahu apakah suatu ekspresi itu <code>True</code> atau <code>False</code>. Anda dapat mengevaluasi ekspresi apa pun di Python, dan mendapatkan salah satu dari dua jawaban, <code>True</code> atau <code>False</code>.</p>
      
      <h3>Mengevaluasi Nilai</h3>
      <p>Saat Anda membandingkan dua nilai, ekspresi tersebut dievaluasi dan Python mengembalikan jawaban Boolean.</p>
      <pre><code>print(10 > 9)   # Output: True
print(10 == 9)  # Output: False
print(10 < 9)   # Output: False</code></pre>
      
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
      <pre><code>x = 10
y = 3
print(x + y)  # Output: 13
print(x % y)  # Output: 1
print(x // y) # Output: 3</code></pre>

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
      <pre><code>a = 200
b = 33

if b > a:
  print("b lebih besar dari a")
elif a == b:
  print("a dan b sama")
else:
  print("a lebih besar dari b")</code></pre>
      
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
    materi: `
      <h3>Python While Loop</h3>
      <p>Dengan *while loop*, kita dapat mengeksekusi satu set pernyataan selama kondisi bernilai benar (True).</p>
      <pre><code># Cetak i selama i kurang dari 6
i = 1
while i < 6:
  print(i)
  i += 1  # Penting! Jangan lupa menaikkan i</code></pre>
      <p><b>Penting:</b> Ingatlah untuk menambah nilai variabel i, jika tidak, *loop* akan berlanjut selamanya (infinite loop).</p>

      <h3>Kata Kunci <code>break</code></h3>
      <p>Dengan pernyataan <code>break</code>, kita dapat menghentikan *loop* bahkan jika kondisi *while* masih benar.</p>
      <pre><code># Keluar dari loop saat i adalah 3
i = 1
while i < 6:
  print(i)
  if i == 3:
    break
  i += 1</code></pre>

      <h3>Kata Kunci <code>continue</code></h3>
      <p>Dengan pernyataan <code>continue</code>, kita dapat menghentikan iterasi saat ini dan melanjutkan ke iterasi berikutnya.</p>
      <pre><code># Lewati iterasi jika i adalah 3
i = 0
while i < 6:
  i += 1
  if i == 3:
    continue
  print(i) # Output: 1, 2, 4, 5, 6</code></pre>
    `
  },
  {
    id: 'for-loop',
    title: 'For Loop',
    imageUrl: forLoopImage, 
    materi: `
      <h3>Python For Loop</h3>
      <p>Sebuah *for loop* digunakan untuk melakukan iterasi (perulangan) pada sebuah urutan (seperti <code>list</code>, <code>tuple</code>, <code>dict</code>, <code>set</code>, atau <code>string</code>).</p>
      
      <h3>Iterasi pada String</h3>
      <p>Bahkan string adalah objek yang dapat diiterasi, mereka berisi urutan karakter:</p>
      <pre><code># Ulangi huruf-huruf dalam kata "banana"
for x in "banana":
  print(x)</code></pre>

      <h3>Kata Kunci <code>break</code></h3>
      <p>Sama seperti di *while loop*, <code>break</code> dapat menghentikan *loop* sebelum selesai.</p>
      <pre><code>fruits = ["apple", "banana", "cherry"]
for x in fruits:
  print(x)
  if x == "banana":
    break</code></pre>

      <h3>Fungsi <code>range()</code></h3>
      <p>Untuk mengulang blok kode sebanyak jumlah tertentu, kita bisa menggunakan fungsi <code>range()</code>. Fungsi <code>range()</code> mengembalikan urutan angka, dimulai dari 0 secara default, dan bertambah 1, dan berakhir pada angka yang ditentukan.</p>
      <pre><code># Cetak angka dari 0 hingga 5
for x in range(6):
  print(x)</code></pre>
    `
  },
  {
    id: 'functions',
    title: 'Functions',
    imageUrl: functionsImage,
    materi: `
      <h3>Apa itu Fungsi?</h3>
      <p>Fungsi adalah blok kode yang hanya berjalan ketika dipanggil. Anda dapat meneruskan data, yang dikenal sebagai parameter, ke dalam suatu fungsi. Sebuah fungsi dapat mengembalikan data sebagai hasilnya.</p>
      
      <h3>Membuat dan Memanggil Fungsi</h3>
      <p>Dalam Python, fungsi didefinisikan menggunakan kata kunci <code>def</code>:</p>
      <pre><code># Mendefinisikan fungsi
def sapaan_saya():
  print("Halo dari dalam fungsi!")

# Memanggil fungsi
sapaan_saya()</code></pre>

      <h3>Argumen (Parameter)</h3>
      <p>Informasi dapat diteruskan ke fungsi sebagai argumen. Argumen ditentukan setelah nama fungsi, di dalam tanda kurung.</p>
      <pre><code>def sapaan_nama(nama):
  print("Halo, " + nama + "!")

sapaan_nama("Michael")
sapaan_nama("Budi")</code></pre>

      <h3>Kata Kunci <code>return</code></h3>
      <p>Untuk membiarkan fungsi mengembalikan nilai, gunakan pernyataan <code>return</code>:</p>
      <pre><code>def kali_lima(x):
  return 5 * x

print(kali_lima(3))  # Output: 15
print(kali_lima(10)) # Output: 50</code></pre>
    `
  },
];
