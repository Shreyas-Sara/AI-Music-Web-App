song1 = "";
song2 = "";
LwristX = 0;
LwristY = 0;
RwristX = 0;
RwristY = 0;
LwristScore = 0;

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modaloaded);
    posenet.on('pose', all_poses);
}

function modaloaded() {
    console.log("Modal Loaded successfully");
}

function draw() {
    image(video, 0, 0, 500, 400);

    fill("red");
    stroke("black");

    if(LwristScore > 0.2){
        circle(LwristX, LwristY, 20);
        song2.stop();

        if(song1 == "false"){
        song1.play();
        document.getElementById("music_name").innerHTML = "harry potter";
        }
    }

}

function all_poses(results) {
    if(results.length > 0) {
        console.log(results);
        RwristX = results[0].pose.rightWrist.x;
        RwristY = results[0].pose.rightWrist.y;

        LwristX = results[0].pose.leftWrist.x;
        LwristY = results[0].pose.leftWrist.y;

        console.log("Left Wrist X: " + LwristX + ", Left Wrist Y: " + LwristY);
        console.log("Right Wrist X: " + RwristX + ", Right Wrist Y: " + RwristY);
    }
}