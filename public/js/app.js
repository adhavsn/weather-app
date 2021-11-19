

console.log('Hello I am js!!!');



const searchForm = document.querySelector('form');
const search = document.querySelector('input');
const mesgOne = document.querySelector('#mesg-1');
const mesgTwo = document.querySelector('#mesg-2');


searchForm.addEventListener("submit", (e)=> {
    e.preventDefault();
    const location = search.value;
    mesgOne.textContent = 'loading...';
    mesgTwo.textContent = '';
    
    fetch("/weather?address=" + location).then((response)=>{
    response.json().then((data) => {
        if(data.error) {
            mesgOne.textContent = data.error;
        } else {
            mesgOne.textContent = data.region;
            mesgTwo.textContent = data.forecast;
        }

    });
});
});

