astronaut="";
abyss="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
score_LeftWrist=0;
score_RightWrist=0;
playing_song1="";
playing_song2="";

function preload() {

    astronaut=loadSound("The-Astronaut.mp3");
    abyss=loadSound("Abyss Song Download Mp3 BTS.mp3");
}

function setup() {
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw() {

    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("#FF0000");

    playing_song1=astronaut_isPlaying();
    playing_song2=abyss_isPlaying();

    if (score_LeftWrist >0.2){
        circle(leftWristX,leftWristY,20);
        abyss.stop();
    }
    if(playing_song1 = false){
        astronaut.play();
        document.getElementById("song_name").innerHTML= "Song Name - Astronaut";
        background="The Astronaut.jpg";

    }

    if (score_RightWrist >0.2){
        circle(rightWristX,rightWristY,20);
        astronaut.stop();
    }
    if(playing_song2 = false){
        abyss.play();
        document.getElementById("song_name").innerHTML= "Song Name - Abyss";
        background="Abyss.jpg";

    }
}

function modelLoaded(){
    console.log('PoseNet Is Initialized');
}
function gotPoses(){
    if(results.length > 0) {
        console.log(results);

        score_LeftWrist=results[0].pose.keypoints[9].score;
        score_RightWrist=results[0].pose.keypoints[10].score;

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("leftWristX ="+ leftWristX +"leftWristY =" + leftWristY);
        console.log("rightWristX ="+ rightWristX +"rightWristY =" + rightWristY);
    }


}