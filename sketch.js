// 用於儲存圖片精靈的變數
let spriteSheet1, spriteSheet2, spriteSheet3;

let animation1, animation2, animation3; // 動畫設定物件
let activeAnimation; // 用於追蹤當前播放的動畫

// 在 setup() 之前預先載入圖片資源
function preload() {
  // 假設圖片與 sketch.js 在同一個資料夾中
  spriteSheet1 = loadImage('ALL1.png');
  spriteSheet2 = loadImage('ALL2.png');
  spriteSheet3 = loadImage('ALL3.png');
}

function setup() {
  // 建立一個全螢幕的畫布
  createCanvas(windowWidth, windowHeight);

  // 設定背景顏色
  background('#003049');

  // 設定動畫播放速度 (每秒的影格數)
  frameRate(15);

  // 初始化第一個動畫的設定
  animation1 = {
    sheet: spriteSheet1,
    totalFrames: 9,
    frameWidth: 1255 / 9, // 每張圖片的寬度
    frameHeight: 73,
    currentFrame: 0,
    x: width / 2, // 初始 x 座標 (畫布中央)
    y: height / 2 + 150 // 初始 y 座標 (往下偏移)
  };

  // 初始化第二個動畫的設定
  animation2 = {
    sheet: spriteSheet2,
    totalFrames: 51,
    frameWidth: 7691 / 51, // 每張圖片的寬度
    frameHeight: 65,
    currentFrame: 50, // 從最後一格開始 (51 - 1)
    x: width / 2, // 初始 x 座標 (畫布中央)
    y: height / 2, // 初始 y 座標 (畫布正中央)
    reverse: true // 新增一個屬性來標記反向播放
  };

  // 初始化第三個動畫的設定
  animation3 = {
    sheet: spriteSheet3,
    totalFrames: 12,
    frameWidth: 547 / 12, // 每張圖片的寬度
    frameHeight: 61,
    currentFrame: 0,
    x: width / 2, // 初始 x 座標 (畫布中央)
    y: height / 2 // 初始 y 座標 (畫布中央)
  };

  // 設定初始播放的動畫為 ALL3
  activeAnimation = animation3;
}

function draw() {
  // 用背景色清除畫布，製造動畫效果
  background('#003049');

  // 繪製當前的活動動畫，並檢查是否已播放完畢
  const finished = drawSprite(activeAnimation);

  // 如果動畫播放完畢，則切換到下一個動畫
  if (finished) {
    if (activeAnimation === animation3) {
      activeAnimation = animation2;
    } else { // activeAnimation is animation2
      activeAnimation = animation3;
    }
  }

  // 在下方獨立繪製並播放 ALL1 動畫
  drawSprite(animation1);
}

// 用於繪製單一動畫影格的函式
function drawSprite(anim) {
  // 計算目前影格在圖片精靈中的 x 座標
  const sx = anim.currentFrame * anim.frameWidth;

  // 從圖片精靈中複製出目前的影格，並繪製到畫布上
  // image(img, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight)
  image(anim.sheet, anim.x - anim.frameWidth / 2, anim.y - anim.frameHeight / 2, anim.frameWidth, anim.frameHeight, sx, 0, anim.frameWidth, anim.frameHeight);

  let justFinished = false;

  // 根據正向或反向來更新影格
  if (anim.reverse) {
    anim.currentFrame--;
    if (anim.currentFrame < 0) {
      anim.currentFrame = anim.totalFrames - 1; // 重置以便下次播放
      justFinished = true;
    }
  } else {
    anim.currentFrame = (anim.currentFrame + 1);
    if (anim.currentFrame >= anim.totalFrames) {
      anim.currentFrame = 0; // 重置以便下次播放
      justFinished = true;
    }
  }
  return justFinished;
}

// 當瀏覽器視窗大小改變時，重新調整畫布大小並置中動畫
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // 重新計算動畫位置
  animation1.x = width / 2;
  animation1.y = height / 2 + 150;

  animation2.x = width / 2;
  animation2.y = height / 2;

  animation3.x = width / 2;
  animation3.y = height / 2;
}
