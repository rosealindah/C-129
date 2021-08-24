song = ""
var leftwristx = 0;
var leftwristy = 0;
var rightwristy = 0;
var rightwristx = 0;

function preload() {
    song = loadSound("music.mp3")
};


function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelloaded)
    poseNet.on('pose', gotposes);

};

function draw() {
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");
    circle(leftwristx, leftwristy, 20);
    var num1 = Number(leftwristy);
    var num2 = floor(num1);
    var volume = num2 / 500;
    document.getElementById("volume").innerHTML = "volume =" + volume;
    song.setVolume(volume);
};

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);

}

function stop() {
    song.pause();
}

function modelloaded() {
    console.log("model has been loaded");

}

function gotposes(results) {
    if (results.length > 0) {
        console.log(results);
        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        console.log("leftwrist = " + leftwristx + "," + leftwristy);
        console.log("rightwrist = " + rightwristx + "," + rightwristy);
    }
}