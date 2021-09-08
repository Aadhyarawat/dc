predicion_1="";
predicion_2="";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

    
camera=document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';

    });
}

classisier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/88HmHMWyz/model.json',modelLoaded);


function modelLoaded(){
    console.log("Model Loaded")
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data=toSpeak;
    
    var utterThis= new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
function check()
{
    img=document.getElementById("captured_image");
    classisier.classify(img,gotResult);
}

function gotResult(error,results)
{
    if(error)
    {
        console.error(error);
    }
    else{
        document.getElementById("result_object_name").innerHTML=results[0].label;
        
        gesture=results[0].label;
        toSpeak="";
        
        if(gesture == "punch")
        {
            toSpeak="punch";
            document.getElementById("update_emoji").innerHTML="&#9994;";
        }
        else if(gesture == "thumbsup")
        {
            toSpeak="thumbsup";
            document.getElementById("update_emoji").innerHTML="&#128077;;";
        }
        else if(gesture == "thumbsdown")
        {
            toSpeak="thumbsdown";
            document.getElementById("update_emoji").innerHTML="&#128078;";
        }
        
        
        speak();
    }
}
