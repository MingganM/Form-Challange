const steps = document.querySelectorAll('.step'); //all steps
const stepsInfo = document.querySelectorAll('.step__info');  //all step__info
const buttons = document.getElementsByTagName('button'); //all buttons
const ticks = document.querySelectorAll('.tick'); //all ticks
const form = document.querySelector('.form'); // form element
const policyCheck = document.getElementById('policyCheck'); //policy checkbox
const inputs = document.getElementsByTagName('input');
let policyIsChecked = false;

function btnFunction(e){
    if(this.className === 'submit') return;
    e.preventDefault();
    
    const targetParent = this.parentElement;
    const targetInputs = targetParent.querySelectorAll('input');
    let foundEmpty = 0;
    
    targetInputs.forEach(function(input){
        if (input.value.trim() === '') {
            foundEmpty++;
            input.classList.add('warn');
        }
    });
    if(foundEmpty === 0){
        targetInputs.forEach(function (input){
            if(input.classList.contains('warn')){
                input.classList.remove('warn');
            }
        });
        let nextStep = parseInt(this.dataset.to);
        toNextStep(nextStep);
    }

}


function toNextStep(nextStep){
    let nextElement = document.querySelector(`.step__info[data-step="${nextStep}"]`);
            
    nextElement.classList.remove('step__info-hide');
    ticks[nextStep - 2].classList.add('tick-filled');
    buttons[nextStep - 2].classList.add('button-filled');
}

function reset(){
    stepsInfo.forEach(function (stepInfo){
        stepInfo.classList.add('step__info-hide');
    });

    stepsInfo[0].classList.remove('step__info-hide');

    policyCheck.checked = false;
    policyIsChecked = policyCheck.checked;
        
    Array.from(buttons).forEach(function(btn){
        btn.classList.remove('button-filled')
    });
}

window.addEventListener('load',function(){ //show first step only
    reset();
});

Array.from(buttons).forEach(function(btn){ //looping the buttons
    btn.addEventListener('click',btnFunction);
});

form.addEventListener('submit',function(e){ //
    e.preventDefault();
            
    if(policyIsChecked){
        ticks.forEach(function(tick) {
            tick.classList.remove('tick-filled');
        });

        Array.from(inputs).forEach(function(input){
            input.value = '';
        });

         reset();
    }
            
});

policyCheck.addEventListener('change',function(){
    ticks[ticks.length - 1].classList.toggle('tick-filled');

    policyIsChecked = !policyIsChecked;
});