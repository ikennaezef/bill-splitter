const bill = document.querySelector('.bill .form-control input');
const billMsg = document.querySelector('.bill .msg');
const tipBtns = document.querySelectorAll('.tip .buttons .btn');
const customTip = document.querySelector('.tip .form-control input');
const customTipForm = document.querySelector('.tip .form-control');
const tipMsg = document.querySelector('.tip .msg');
const people = document.querySelector('.people .form-control input');
const peopleMsg = document.querySelector('.people .msg');
const tipAmount = document.querySelector('.tip-amount .price span');
const total = document.querySelector('.total .price span');
const calcBtn = document.querySelector('.calc-btn')
const resetBtn = document.querySelector('.reset-btn');

let tipPercent;

tipBtns.forEach(btn => {
	btn.addEventListener('click', ()=>{
		customTip.value = '';
		tipBtns.forEach(button => button.classList.remove('active'));
		btn.classList.add('active');
		if (btn.id == 'custom') {
			customTipForm.style.display = 'flex';
			customTip.focus();
		}else{
			customTipForm.style.display = 'none';
		}
	})
})


calcBtn.addEventListener('click', generateBill);
resetBtn.addEventListener('click', reset);

function generateBill(){
	if (isNaN(bill.value) || bill.value === '') {
		billMsg.innerText = 'Please enter a valid bill';
	}else{
		tipBtns.forEach(btn => {
			if (btn.classList.contains('active')) {
				if (btn.id === 'custom') {
					isNaN(customTip.value) || customTip.value === '' ? tipMsg.innerText = 'Please enter a valid tip' : tipPercent = customTip.value;
				}else{
					tipPercent = btn.id;
				}
			}
		})
		if (tipPercent!= undefined){
			if (isNaN(people.value) || people.value === '') {
				peopleMsg.innerText = 'Please enter a valid number of people';
			}else {
				let tempTip = ((tipPercent/100)*bill.value)/people.value;
				tipAmount.innerText = (Math.round(tempTip*100))/100;
				let tempTotal = (bill.value/people.value) + ((tipPercent/100)*bill.value)/people.value;
				total.innerText = (Math.round(tempTotal*100))/100;
			}
		}
	}
}

function reset(){
	bill.value = '';
	billMsg.innerText = '';
	tipBtns.forEach((btn, index)=> {
		btn.classList.remove('active');
		btn.index === 0 ? btn.classList.add('active') : '';
	})
	customTipForm.style.display = 'none';
	tipMsg.innerText = '';
	people.value = '';
	peopleMsg.innerText = '';
	tipAmount.innerText = '0';
	total.innerText = '0';
}