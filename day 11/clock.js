let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

let days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


function refresh(){
    let d = new Date();
    
    document.getElementById('year').innerHTML = d.getFullYear();
    
    document.getElementById('Month').innerHTML = `${months[d.getMonth()]} / ${d.getDate()}`;
    
    document.getElementById('Day').innerHTML = days[d.getDay()];
    
    document.getElementById('Hour').innerHTML = d.getHours() + " Hours";
    
    document.getElementById('Minute').innerHTML = d.getMinutes() + " Minutes";
    
    document.getElementById('Second').innerHTML = d.getSeconds() + " Seconds";

}
setInterval(refresh, 1000);

setInterval(() => {
    document.getElementById('space').innerHTML = Date.now() + " Miliseconds";
}, );



    



