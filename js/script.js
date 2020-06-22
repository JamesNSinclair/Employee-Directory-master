const cards = document.getElementsByClassName('card');
const profilepic = document.getElementById('profile-pic');
const name = document.getElementById('name');
const email = document.getElementById('email');
const town = document.getElementById('town');
const contactInfo = 'https://randomuser.me/api/?results=12&inc=name,location,email,dob,cell,picture&?nat=us,gb';
let modal = document.getElementById('modalDiv');

//FETCH

fetch(contactInfo)
.then(response => response.json())
.then(data => createData(data.results))


//FUNCTIONS

function createData(data) {
	for (let i = 0; i < data.length; i+=1) {
		//emptyDiv(data);
		number = i+1;
		let dataLengthCount = data[i];
		storeData(dataLengthCount, number, data);

	}
	}

//FUNCTION


function storeData(dataLengthCount, number, data) {

	const	cardIndex =	'goesHere' + number;
	let goesHere = document.getElementById(cardIndex);

	const html = `
		<div class="employee" id=${number}>
			<img class='profile-pic' src="${dataLengthCount.picture.large}">
				<div class='employee-deets'>
					<h4> ${dataLengthCount.name.title} ${dataLengthCount.name.first} ${dataLengthCount.name.last}</h4>
					<p> ${dataLengthCount.email}</p>
					<p> ${dataLengthCount.location.city}</p>
					</div>
		</div>`;

		goesHere.innerHTML = html;

		createLightbox(cardIndex, dataLengthCount, data);


}


function createLightbox(cardIndex, dataLengthCount, data) {
	let toChange = document.getElementById(cardIndex);

		toChange.addEventListener('click', e => {
		 let index = parseInt(e.target.id);
		 console.log(index);
		 modal.style.zIndex = 5;
		 	modal.style.visibility = "visible";

		 const html = `
		 <div class="employeeModal">
			 <span class="close">&times;</span>
			 <span class="previous">&#60;</span>
			 <span class="next">&#62;</span>
			 <div class="modal-employee">
			 	<img class='profile-pic' src="${dataLengthCount.picture.large}">
					<div class="cardUnder">
							<h4> ${dataLengthCount.name.title} ${dataLengthCount.name.first} ${dataLengthCount.name.last}</h4>
				 			<p> ${dataLengthCount.email}</p>
				 			<p> ${dataLengthCount.location.city}</p>
							<hr>
				 			<p> ${dataLengthCount.cell}</p>
				 			<p> ${dataLengthCount.location.street.number} ${dataLengthCount.location.street.name}</p>
							<p> ${dataLengthCount.location.state} </p>
							<p> ${dataLengthCount.location.postcode}</p>
					</div>
				</div>
		 </div>`;

		 	modal.innerHTML = html;

		index += -1;
		createScroll(data, index, cardIndex);
	})

}


function createScroll(data, index, cardIndex) {
	let next = document.querySelector('.next');
	let previous = document.querySelector('.previous');
	let close = document.querySelector('.close');

			close.addEventListener('click', e  => {
				modal.style.visibility = "hidden";
			 modal.style.zIndex = -1;
		});

		next.addEventListener('click', e => {
			if (index < 11) {
					index += 1;
				 createModal(index, data, cardIndex);
				 createScroll(data, index, cardIndex);
		 		} else {
				 console.log('hello')
				}
		});

		previous.addEventListener('click', e => {
			if (index > 0) {
					index += -1;
		 			createModal(index, data, cardIndex);
			  } else {
				console.log('hello')
			}
		});

};


function createModal(index, data, cardIndex) {
	console.log(index);
 let dataLengthCount = data[index]

const html = `
<div class="employeeModal">
	<span class="close">&times;</span>
	<span class="previous">&#60;</span>
	<span class="next">&#62;</span>
		<div class="modal-employee">
		<img class='profile-pic' src="${dataLengthCount.picture.large}">
			<div class="cardUnder">
				<h4> ${dataLengthCount.name.title} ${dataLengthCount.name.first} ${dataLengthCount.name.last}</h4>
				<p> ${dataLengthCount.email}</p>
				<p> ${dataLengthCount.location.city}</p>
				<hr>
				<p> ${dataLengthCount.cell}</p>
				<p> ${dataLengthCount.location.street.number}  ${dataLengthCount.location.street.name}</p>
				<p> ${dataLengthCount.location.state}</p>
				<p> ${dataLengthCount.location.postcode}</p>
			</div>
		</div>
</div>`;

modal.innerHTML = html;


createScroll(data, index, cardIndex);
}

// SEARCH TIME
function nameFilterFunction() {
    const input = document.getElementById('name');
    const filter = input.value.toUpperCase();
    console.log(input);
    console.log(filter);

    for (i = 0; i < cards.length; i += 1) {
        searchName = cards[i].firstElementChild.getElementsByTagName('p')[0];
        txtValue = searchName.textContent || serachName.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = '';
        } else {
            cards[i].style.display = 'none';
        }
    }

}
