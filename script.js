let pipe = document.getElementById("pipe");
let hole = document.getElementById("hole");
let character = document.getElementById("character");
let para = document.getElementById("text");
let jumping = 0,counter = 1,start = 1,count_prev = 0;

if(confirm("Start game")){
    hole.addEventListener('animationiteration', () => {
        let colorSet = '0123456789ABCDEF',colourPipe = '#',colourChar = '#';    
        let randomLocation = 0;
        if (start === 1)
        {
            randomLocation = -300;
            start = 0;
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

    let chk_Hole = setInterval(function(){
        let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if(jumping==0){
            character.style.top = (characterTop+3)+"px";
        }
        let pipeLeft = parseInt(window.getComputedStyle(pipe).getPropertyValue("left"));
        let holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
        let cTop = -(500-characterTop);
        if((characterTop>490)||((pipeLeft<20)&&(pipeLeft>-50)&&((cTop<holeTop)||(cTop>holeTop+141))))
        {
            if (confirm("Game over. Score: "+(counter-1)))
                {
                    pipe.style.animation = 'none';
                    pipe.offsetHeight;
                    pipe.style.animation = null;
                    hole.style.animation = 'none';
                    hole.offsetHeight;
                    hole.style.animation = null;  
                    character.style.top = 100 + "px";
                    hole.style.top = -300 + "px";
                    pipe.style.backgroundColor = '#000000';
                    character.style.backgroundColor = '#008000';
                    start = 1;
                    if ((counter-1) >= count_prev)
                        {
                            count_prev = counter-1;
                            console.log(`High score: ${count_prev}`);
                            para.innerHTML = `High score: ${count_prev}`;
                        }
                    counter = 1;   
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
}
