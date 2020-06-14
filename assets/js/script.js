const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];

const weekHtml = '<div class="week-container"><div class="week dates"><div class="day"><p></p></div><div class="day"><p></p></div><div class="day"><p></p></div><div class="day"><p></p></div><div class="day"><p></p></div><div class="day"><p></p></div><div class="day"><p></p></div></div></div>';
const hourHtml = '<div class="hour"><div class="hour-value"><p>[]</p></div><div class="hour-booking"><canvas class=\'hours-canvas\'></canvas></div></div>';

const MINYEAR = 2010;
const MAXYEAR = new Date().getFullYear();
var currentYear = new Date().getFullYear();
var currentMonth = { value :new Date().toLocaleString('default', { month: 'long' }), id:new Date().getMonth()};

var dayBooking = {year:currentYear,month:currentMonth.id,hours:{}};

function generateCalendarStructure(){
	let calendarDiv = document.querySelector('.calendar');
	for(let i =0; i< 6;i++)
		calendarDiv.innerHTML += weekHtml;
}

function resetCaneldar(){
	calendarDays = document.querySelectorAll('.week.dates>.day>p');
	for(let i = 0; i < calendarDays.length;i++){
		calendarDays[i].innerText = '';
	}
}

function displayDayNames(){
	days = [ "sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
	days = days.map( day => day.charAt(0).toUpperCase() + day.substring(1))

	daysOfWeek = document.querySelectorAll('.week.days>.day>p');

	for(i = 0;i<days.length;i++){
		daysOfWeek[i].innerText = days[i];
	}
}

function calendarControls(){

	yearControl = document.querySelector('#year');
	monthControl = document.querySelector('#month');

	for (let i = 2010; i <= currentYear; i++) {
		if(i == currentYear){
			yearControl.innerHTML += "<option selected >"+i+"</option>";
		}
		else
			yearControl.innerHTML += "<option value='"+i+"'>"+i+"</option>";
	}

	for (let i = 0 ; i < 12; i++) {
		if(currentMonth.id == i){
			monthControl.innerHTML += "<option selected value='"+i+"' >"+monthNames[i]+"</option>";
		}
		else
			monthControl.innerHTML += "<option value='"+i+"' >"+monthNames[i]+"</option>";
	}

}

function populateCalendar(){
	resetCaneldar();
	totalDays = new Date(currentYear,(currentMonth.id + 1),0).getDate();
	today = new Date().getDay();
	calendarDays = document.querySelectorAll('.week.dates>.day>p');
	startDay = new Date(currentYear,(currentMonth.id)).getDay();
	for(let i = 0; i < totalDays;i++){
		if(i+1 == today){
			calendarDays[i + startDay].classList.add('today');
		}
		calendarDays[i+startDay].innerText = (i+1);

	}
}

function monthChange(value){
	monthControl = document.querySelector('#month');
	if (value){
		if(value == 'right'){
			newMonth =  monthControl.selectedIndex + 1;
			monthControl.selectedIndex = newMonth == 12 ? 0 : newMonth ;
			if (newMonth == 12) {
				monthControl.selectedIndex = 0;
				yearChange(currentYear +1);
			}
			else{
				monthControl.selectedIndex = newMonth ;
			}
		}
		else if(value == 'left'){
			newMonth = monthControl.selectedIndex - 1;
			if (newMonth == -1) {
				monthControl.selectedIndex =  11;
				yearChange(currentYear -1);	
			}
			else{
				monthControl.selectedIndex = newMonth;
			}

		}

	}
	currentMonth = { value : monthNames[monthControl.selectedIndex], id:monthControl.selectedIndex};
	populateCalendar();
}

function yearChange(value){
	yearControl = document.querySelector('#year');
	if(value){
		value = value > MAXYEAR ? MAXYEAR: value;
		value = value < MINYEAR ? MINYEAR : value;
		yearControl.selectedIndex = value - MINYEAR; 
	}
	currentYear = new Date(yearControl.selectedIndex + MINYEAR).getFullYear();
	populateCalendar();
}


function generateHoursOfday(){
	let hourViewHtml = document.querySelector('.day-view')
	for(let i = 0;i<24;i++){
		hourViewHtml.innerHTML += hourHtml.replace('[]',(i+'').padStart(2,'0')+':00');
	}
}


function generateHourControls(){
	let fromControl = document.querySelector('#hour-from');
	let toControl = document.querySelector('#hour-to');
}

function setupCanvasListener(){
	document.querySelectorAll('.hours-canvas').forEach(data => {
		data.addEventListener('drag',(event) =>{
			console.log('dragger');
		});
	});

}

generateCalendarStructure();
generateHoursOfday();
populateCalendar();
calendarControls();
displayDayNames();
setupCanvasListener();


