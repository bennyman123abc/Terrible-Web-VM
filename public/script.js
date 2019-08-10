const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

const displayWidth = 64;
const displayHeight = 64;

const width = 320;
const height = 320;

const pixWidth = width / displayWidth;
const pixHeight = height / displayHeight;

const memorySize = 255;
const cycleSpeed = 30;

canvas.width = width;
canvas.height = height;

var program = [];

var memory = [];
var pc = 0;
var regs = [];
var curReg = 0;

var prevKey = 0;
var key = 0;
var stackLocations = [];
var stackLevel = 0;

var breakFlag = 0;

function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
}

function fillScreen() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
}

function drawPixel(x, y) {
    ctx.fillStyle = "white";
    ctx.fillRect(x * pixWidth, y * pixHeight, pixWidth, pixHeight);
}

function erasePixel(x, y) {
    ctx.fillStyle = "black";
    ctx.fillRect(x * pixWidth, y * pixHeight, pixWidth, pixHeight);
}

document.addEventListener("keydown", function (event) {
    key = event.keyCode;
});

document.addEventListener("keyup", function (_) {
    key = 0;
});

function initMemory() {
    var i = 0;
    while (i != memorySize) {
        memory.push(0);
        i += 1;
    }
}

function initRegs() {
    var i = 0;
    while (i != 16) {
        regs.push(0);
        i += 1;
    }
}

function initialize() {
    initMemory();
    initRegs();
}

function execute(opcode) {
    opcode = opcode.toString(16);
    var l = parseInt(opcode.charAt(0), 16);
    var c = opcode.charAt(1) + opcode.charAt(2);
    var x = 0;
    var r;
    if (l > 3) {
        x = opcode.slice(3, l);
    }

    switch (c) {
        case("00"):
            regs[curReg] += parseInt(x, 16);
            break;
        case("01"):
            regs[0] -= parseInt(x, 16);
            if (regs[curReg] < 0) regs[0] = 0;
            break;
        case("02"):
            regs[curReg] *= parseInt(x, 16);
            break;
        case("03"):
            regs[curReg] += 1;
            break;
        case("04"):
            regs[curReg] -= 1;
            break;
        case("10"):
            memory[parseInt(x, 16)] = regs[curReg];
            break;
        case("11"):
            regs[curReg] = memory[parseInt(x, 16)];
            break;
        case("12"):
            memory[parseInt(x, 16)] = 0;
            break;
        case("20"):
            curReg = parseInt(x, 16);
            break;
        case("21"):
            regs[parseInt(x, 16)] = 0;
            break;
        case("22"):
            r = x.split("");
            regs[parseInt(r[1], 16)] = regs[parseInt(r[0], 16)];
            break;
        case("23"):
            r = x.split("");
            regs[parseInt(r[1], 16)] = regs[parseInt(r[0], 16)];
            regs[parseInt(r[0], 16)] = 0;
            break;
        case("24"):
            r = x.split("");
            var t = regs[parseInt(r[1], 16)];
            regs[parseInt(r[1], 16)] = regs[parseInt(r[0], 16)];
            regs[parseInt(r[0], 16)] = t;
            break;
        case("30"):
            r = x.split("");
            console.log(r);
            console.log(parseInt(r[0], 16));
            console.log(parseInt(r[1], 16));
            drawPixel(parseInt(r[0] + r[1], 16), parseInt(r[2] + r[3], 16));
            break;
        case("31"):
            r = x.split("");
            console.log(r);
            console.log(parseInt(r[0] + r[1], 16));
            console.log(parseInt(r[2] + r[3], 16));
            erasePixel(parseInt(r[0] + r[1], 16), parseInt(r[2] + r[3], 16));
            break;
        case("32"):
            clearScreen();
            break;
        case("33"):
            fillScreen();
            break;
        case("40"):
            regs[curReg] = key;
            break;
        case("41"):
            memory[parseInt(x, 16)] = key;
            break;
        case("50"):
            regs[curReg] = stackLevel + 1;
            break;
        default:
            console.log(`Warning: Undefined opcode ${opcode}`);
    }
    console.log(`${l}, ${c}, ${x}`);
}

function fetch() {
    // read opcode from array
}

function cycle() {
    if (breakFlag === 1) {
        console.log("Break flag set, execution halted!")
        return;
    }

    if (pc >= program.length) {
        console.log("Execution completed!");
        return;
    }

    prevKey = key;
}

function start() {
    initialize();
    setInterval(cycle, 1000 / cycleSpeed);
}

clearScreen();