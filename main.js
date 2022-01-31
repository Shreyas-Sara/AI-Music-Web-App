song1 = "";
song2 = "";
LwristX = 0;
LwristY = 0;
RwristX = 0;
RwristY = 0;
LwristScore = 0;
RwristScore = 0;
status1="";
status2="";

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
    status1=song1.isPlaying();
    if(LwristScore > 0.1){
        circle(LwristX, LwristY, 20);
        song2.stop();
       
        if(status1 =="false"){
        song1.play();
        document.getElementById("music_name").innerHTML = "harry potter";
        }
    }
    status2 = song2.isPlaying();
    if(RwristScore > 0.1){
        circle(RwristX, RwristY, 20);
        song1.stop();

        if(status2 == "false"){
            song2.play();
            document.getElementById("music_name").innerHTML = "peter pan song";
        }
    }
}

function all_poses(results) {
    if(results.length > 0) {
        console.log(results);
        LwristScore = results[0].pose.keypoints[9].score;
        RwristScore = results[0].pose.keypoints[10].score;

        RwristX = results[0].pose.rightWrist.x;
        RwristY = results[0].pose.rightWrist.y;

        LwristX = results[0].pose.leftWrist.x;
        LwristY = results[0].pose.leftWrist.y;

        console.log("Left Wrist X: " + LwristX + ", Left Wrist Y: " + LwristY);
        console.log("Right Wrist X: " + RwristX + ", Right Wrist Y: " + RwristY);
    }
}

function play_music() {
    song1.play();
    song1.rate(1);
    song1.setVolume(1);
}