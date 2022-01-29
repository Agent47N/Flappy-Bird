let pipe = document.getElementById("pipe");
let hole = document.getElementById("hole");
let character = document.getElementById("character");
let para = document.getElementById("text");
let jumping = 0,counter = 1,start = 1,count_prev = 0;

hole.addEventListener('animationiteration', () => {
    let colorSet = '0123456789ABCDEF',colourPipe = '#',colourChar = '#';    
    let randomLocation = 0;
    if (start === 1)
    {
        randomLocation = -300;
        start = 0;
        pipe.style.backgroundColor = black;
        character.style.backgroundColor = green;
    }
    else
        randomLocation = -((Math.random()*300)+150);
    hole.style.top = randomLocation + "px";
    counter++;
    for (let i=0;i<6;i++)
    {
        colourPipe += colorSet[Math.floor(Math.random()*16)];
        colourChar += colorSet[Math.floor(Math.random()*16)];
    }
    if (colourChar !== '#FFFFFF' || colourChar !== '#FFFFFF')
        {
            pipe.style.backgroundColor = colourPipe;
            character.style.backgroundColor = colourChar;
        }    
});

setInterval(function(){
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if(jumping==0){
        character.style.top = (characterTop+3)+"px";
    }
    let pipeLeft = parseInt(window.getComputedStyle(pipe).getPropertyValue("left"));
    let holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    let cTop = -(500-characterTop);
    if((characterTop>490)||((pipeLeft<20)&&(pipeLeft>-50)&&((cTop<holeTop)||(cTop>holeTop+141)))){
        if (counter === 0)
            counter = 1;
        alert("Game over. Score: "+(counter-1));
        character.style.top = 100 + "px";
        counter = 0;
        start = 1;
        if (counter > count_prev)
            {
                count_prev = counter;
                console.log( `High score: ${count_prev}`);
                para.innerHTML = `High score: ${count_prev}`;
            }    
    }
},10);

function jump(){
    jumping = 1;
    let jumpCount = 0;
    let jumpInterval = setInterval(function(){
        let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if((characterTop>6)&&(jumpCount<15)){
            character.style.top = (characterTop-5)+"px";
        }
        if(jumpCount>20){
            clearInterval(jumpInterval);
            jumping=0;
            jumpCount=0;
        }
        jumpCount++;
    },10);
}
