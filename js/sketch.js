let width, height, ctr, wall, ground, small_block, large_block;
let small_size, inputField, hint, button, weight_text, steps;
function setup() {
    width = innerWidth;
    height = innerHeight - 200;
    small_size = 30;
    large_size = 100;
    steps = 10;
    createCanvas(width, height);

    // Input Field
    inputField = createInput();
    inputField.position(width / 2, height + 50);
    inputField.value('1');

    hint = createElement('p', 'Number of digits of PI: ');
    hint.position(width / 2 - 180, height + 37);
    setAnimation();

    button = createButton('Play Animation')
    button.addClass('w3-btn w3-round-large w3-black w3-hover-teal');
    button.position(width / 2 - 50, height + 100);
    button.mousePressed(setAnimation);
}

function draw() {
    for (let i = 0; i < steps; i++) {
        background(150);
        wall.show();
        ground.show();

        checkCollisionBlockToBlock();
        checkCollisionWallToBlock();

        small_block.move();
        large_block.move();

        x1 = constrain(small_block.x, wall.x1 + small_size / 2, large_block.x, - (large_size / 2 + small_size / 2));
        x2 = constrain(large_block.x, x1 + (small_size / 2 + large_size / 2), 5000);

        small_block.show(x1);
        large_block.show(x2);

        weight_text.show();

        textSize(12);
        text('1 kg', x1, small_block.y + 4);

        fill(0);
        textSize(32);
        text(ctr, width / 2, 50);
    }
}

function setAnimation() {
    ctr = 0;
    large_block_weight = Math.pow(100, Number(inputField.value()) - 1);

    wall = new Wall(25, 50, 25, height - 20);
    ground = new Wall(5, height - 50, width - 5, height - 50);

    small_block = new Block(wall.x1 + 30, ground.y1 - small_size / 2, small_size, 1, 0);
    large_block = new Block(width - large_size, ground.y1 - large_size / 2, large_size, large_block_weight, 0);

    weight_text = new Text(`${large_block_weight} kg`, large_block);
}

function checkCollisionBlockToBlock() {
    if (small_block.x + small_size / 2 >= large_block.x - large_size / 2) {
        s = small_block.xSpeed;
        l = large_block.xSpeed;
        small_block.xSpeed = ((small_block.m - large_block.m) / (small_block.m + large_block.m)) * s + (2 * large_block.m * l / (small_block.m + large_block.m));
        large_block.xSpeed = ((large_block.m - small_block.m) / (small_block.m + large_block.m)) * l + (2 * small_block.m * s / (small_block.m + large_block.m));
        ctr++;
    }
}

function checkCollisionWallToBlock() {
    if (small_block.x - small_block.size / 2 <= wall.x1) {
        small_block.xSpeed *= -1;
        ctr++;
    }
}

class Block {
    constructor(x, y, size, m, xSpeed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.m = m;
        this.xSpeed = xSpeed;
    }

    show(constrian_x) {
        fill(255);
        rectMode(CENTER);
        rect(constrian_x, this.y, this.size, this.size);
    }

    move() {
        this.x += this.xSpeed;
    }
}

class Wall {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
    }

    show() {
        line(this.x1, this.y1, this.x2, this.y2);
    }
}

class Text {
    constructor(weight) {
        this.weight = weight;
    }

    show() {
        fill(0);
        textSize(16);
        textAlign(CENTER);
        text(this.weight, x2, large_block.y);
    }
}