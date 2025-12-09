const width = 80;
const height = 25;
const chars = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789@#$%^&*';
const colors = ['\x1b[32m', '\x1b[92m', '\x1b[92m'];

class MatrixRain {
  constructor() {
    this.drops = [];
    for (let i = 0; i < width; i++) {
      this.drops[i] = Math.floor(Math.random() * height);
    }
  }

  draw() {
    let output = '\x1b[2J\x1b[H';
    
    const screen = Array(height).fill(null).map(() => Array(width).fill(' '));
    
    for (let i = 0; i < this.drops.length; i++) {
      const y = this.drops[i];
      
      if (y < height) {
        screen[y][i] = colors[2] + chars[Math.floor(Math.random() * chars.length)] + '\x1b[0m';
      }
      
      if (y - 1 >= 0 && y - 1 < height) {
        screen[y - 1][i] = colors[1] + chars[Math.floor(Math.random() * chars.length)] + '\x1b[0m';
      }
      
      for (let j = 2; j < 8; j++) {
        if (y - j >= 0 && y - j < height) {
          screen[y - j][i] = colors[0] + chars[Math.floor(Math.random() * chars.length)] + '\x1b[0m';
        }
      }
      
      this.drops[i]++;
      
      if (this.drops[i] * Math.random() > height * 0.95) {
        this.drops[i] = 0;
      }
    }
    
    for (let row of screen) {
      output += row.join('') + '\n';
    }
    
    console.log(output);
    console.log('\x1b[36m💻 Матрица активна... Нажмите Ctrl+C для выхода\x1b[0m');
  }

  start() {
    console.log('\x1b[32m🎬 Добро пожаловать в Матрицу!\x1b[0m\n');
    setInterval(() => this.draw(), 100);
  }
}

const matrix = new MatrixRain();
matrix.start();