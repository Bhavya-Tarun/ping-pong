video="";
status1="";
objects=[]
;function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotPoses);
}

function setup(){
    canvas=createCanvas(480, 380);
    canvas.center();
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status1!=""){
        objectDetector.detect(video, gotResult);
        for(i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML= "Status: objects detected";
            document.getElementById("no.of.objects").innerHTML= "no, of objects detected"+objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded());
    document.getElementById("status").innerHTML = "status:detecting objects";
}

function modelLoaded(){
    console.log("ready to identify the object");
    status1=true;
    video.speed(1);
    video.loop();
    video.volume(0);
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        objects=results;
    }
}