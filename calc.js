//basic functions for calculator
let currInput='';
let currOperation='';
let prevInput='';
document.addEventListener("keydown", handleKey);
//to add user input
function appendNumber(number) {
    currInput+=number;
    document.getElementById('display').value=`${prevInput} ${currOperation} ${currInput}`;
}

// add the input operation
function appendOperation(op){
    if(currInput==='') return;
    if(prevInput !=='') {
        calculate();
    }
    currOperation=op;
    prevInput=currInput;
    currInput='';
    document.getElementById('display').value=`${prevInput} ${currOperation}`;

}
//lets u calculate the basic arithmetic operation
function calculate(){
    if(prevInput ==='' || currInput ==='') return;
    let res;
    let prev=parseFloat(prevInput);
    let curr=parseFloat(currInput);

    switch (currOperation){
        case '+' :
            res=prev+curr;
            break;
        case '-':
            res=prev-curr;
            break;
        case '*':
            res=prev*curr;
            break;
        case '/':
            if (curr===0){
                alert("cannot divide by 0!");
                return;
            }
            res=prev/curr;
            break;
        default:
            return;
    }
    currInput=res.toString();
    currOperation='';
    prevInput='';
    document.getElementById('display').value=currInput;
}
//clear btn func
function clearDisplay(){
    currInput='';
    prevInput='';
    currOperation='';
    document.getElementById('display').value='';

}
function delLast(){
    currInput=currInput.slice(0,-1);
    if (currInput === "") {
        currInput = "";
    }

    document.getElementById('display').value =
        `${prevInput} ${currOperation} ${currInput}`.trim();
}
function handleKey(e){
    const key=e.key;

    //(0-9)
    if (!isNaN(key)){
        appendNumber(key);
    }
    //+,-,*,/
    else if (key === "+") appendOperation("+");
    else if (key === "-") appendOperation("-");
    else if (key === "*") appendOperation("*");
    else if (key === "/") appendOperation("/");

    //decimal
    else if (key === ".") appendNumber(".");

    //enter/= calc
    else if (key === "Enter" || key === "="){
        e.preventDefault();
        calculate();
    }
    //backlspace->dellast item
    else if (key === "Backspace"){
        e.preventDefault();
        delLast();
    }
    //esc->clear
    else if (key === "Escape"){
        clearDisplay();
    }

}
//theme settings
//toggle the dark and light theme+icons
const toggleBtn=document.getElementById("theme");
const sunIcon=`<svg id="sun" xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
viewBox="0 0 24 24"  stroke="currentColor" stroke-width="2" 
stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
</svg>`;
//svg code breakdown:

/* xmlns = XML Namespace
<svg width="24" height="24" viewBox="0 0 24 24" ...>

width="24" height="24"
→ size on screen (24px × 24px)
viewBox="0 0 24 24"
→ internal coordinate system
stroke → outline color
fill="none" → no inside color
stroke-width="2" → thickness
currentColor → inherits text color from CSS

<circle cx="12" cy="12" r="5"></circle> cx="12" → center x
cy="12" → center y
r="5" → radius


So: a circle in the middle 
<line x1="12" y1="1" x2="12" y2="3"></line>
A line from (12,1) → (12,3)
Top → (12,1 → 12,3)
Bottom → (12,21 → 12,23)
Left → (1,12 → 3,12)
Diagonal → (4.22,4.22 → 5.64,5.64)*/


const moonIcon=`<svg id="moon" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 
    7 7 0 0 0 21 12.79z"></path>
</svg>`;
//svg breakdown:
/*
<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
<path> = custom shape using drawing commands
for cresant moon:
A9 9 0 1 1
arc command->A → arc
9 9 → radius
rest → direction + curve */

//toggle
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    if (document.body.classList.contains("light-theme")){
        toggleBtn.innerHTML=sunIcon;
        localStorage.setItem("theme","light"); //key:theme , val:light

    }else{
        toggleBtn.innerHTML=moonIcon;
        localStorage.setItem("theme","dark");
    }
});
if (localStorage.getItem("theme") === "light"){
    document.body.classList.add("light-theme");
    toggleBtn.innerHTML=sunIcon;

}else{
    toggleBtn.innerHTML=moonIcon
}