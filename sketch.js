const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
var slider;
var sliderRed;
var sliderGreen;
var sliderBlue;
var angle = 0;

function setup() {
    createCanvas(WIDTH, HEIGHT);

    let treeDiv = createDiv('TREE');
    treeDiv.addClass('tree');

    angleText = createP(`Angle`);
    sliderAngle = createSlider(0, Math.PI * 2, 0.500, 0);
    treeDiv.child(angleText);
    treeDiv.child(sliderAngle);
    
    lengthText = createP(`Length`);
    sliderLength = createSlider(0, HEIGHT/2.5, 200);
    sliderLength.attribute('title', 'This can cause some lags');
    treeDiv.child(lengthText);
    treeDiv.child(sliderLength);
    
    facText = createP(`Fac`);
    sliderFac = createSlider(0, 100, 67);
    sliderFac.attribute('title', 'This can cause too lags');
    treeDiv.child(facText);
    treeDiv.child(sliderFac);
    
    let swayStrengthDiv = createDiv('Sway');
    swayStrengthDiv.addClass('sway-strength');
    
    swayStrengthText = createP(`SWAY`);
    sliderSwayStrength = createSlider(0, 100, 50);
    swayStrengthDiv.child(swayStrengthText);
    swayStrengthDiv.child(sliderSwayStrength);

    let colorsDiv = createDiv('COLORS');
    colorsDiv.addClass('colors');
    
    redText = createP(`Red`);
    sliderRed = createSlider(0, 255);
    colorsDiv.child(redText);
    colorsDiv.child(sliderRed);
    
    greenText = createP(`Green`);
    sliderGreen = createSlider(0, 255);
    colorsDiv.child(greenText);
    colorsDiv.child(sliderGreen);
    
    blueText = createP(`Blue`);
    sliderBlue = createSlider(0, 255);
    colorsDiv.child(blueText);
    colorsDiv.child(sliderBlue);

    let headerDiv = createDiv();
    headerDiv.addClass('header');

    headerDiv.child(treeDiv);
    headerDiv.child(swayStrengthDiv);
    headerDiv.child(colorsDiv);
    headerDiv.addClass('flex');
}

function draw() {
    background(255);
    angle = sliderAngle.value();

    // Origin position
    translate(Number.parseInt(WIDTH / 2), HEIGHT);

    // Start branch
    branch(sliderLength.value());

    // Labels
    angleText.html(`Angle: ${sliderAngle.value().toFixed(3)} rad`);
    lengthText.html(`Length: ${sliderLength.value()}px (initial branch)`);
    facText.html(`Fac: ${sliderFac.value()/100} <b>CAUTION!</b>`);
    swayStrengthText.html(`Sway Strength: ${sliderSwayStrength.value()/100}`);
    redText.html(`Red: ${sliderRed.value()}`);
    greenText.html(`Green: ${sliderGreen.value()}`);
    blueText.html(`Blue: ${sliderBlue.value()}`);
}

function branch(length) {
    var r = sliderRed.value();
    var g = sliderGreen.value();
    var b = sliderBlue.value();
    var framing = frameCount * 0.05
    
    // Natural Tree movement
    let calculatedSway = sliderSwayStrength.value()/100 * sin(framing) / (length*.3);
    
    const fac = sliderFac.value()/100; // -> recursive length of next branch (the closer to 1 the more denser and lag)

    stroke(Number.parseInt((r - length)), Number.parseInt((g - length)), Number.parseInt((b - length)));
    line(0, 0, 0, -length);
    translate(0, -length);

    // Length limit (The smaller the more lag)
    if (length > 2) {
        push();
        rotate(angle + calculatedSway);
        branch(length * fac);
        pop();
        push();
        rotate(-angle + calculatedSway);
        branch(length * fac);
        pop();
    }
}