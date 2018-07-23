// listen for submit;
const  cal_btn = document.getElementById('compute');
console.log(cal_btn.parentElement);
cal_btn.addEventListener('click',function(e){
  //Hide results
    document.getElementById('results').style.display = 'none';
  //show loader
  document.getElementById('loading').style.display = 'block';

  //show laoder for two seconds that disappear

  setTimeout(calculateResults,2000)
  e.preventDefault()
});
function calculateResults(e){
  // All UI varibales
  const amount = document.getElementById('amount').value;
  const intrest = document.getElementById('intrest').value;
  const yearsToPay = document.getElementById('years').value;
  const monthlyPayments = document.getElementById('monthly-payment');
  const totalPayments = document.getElementById('total-payment');
  const totalIntrest = document.getElementById('total-intrest');
  //parse float can accept fractions where ass parseInt rounds the decimal to the nearset whole number
  const principal = parseFloat(amount) ;
  // what ever the number is * 12 / 100
  const calculatedInterest = parseFloat(intrest) /100/12;
  // the amount of years you want to pay so for example if you had 1 years you would have 12 months to pay that amount
  const calculatedPayments = parseFloat(yearsToPay)*12;
  console.log(calculatedPayments);
  //compute the monthly payments
  const x = Math.pow(1+calculatedInterest,calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);
  if (isFinite(monthly)) {
    // to fixed means round to the nearset second decimal place
    //fisrt block of the results ui
    monthlyPayments.value = monthly.toFixed(2);
    //second block of the results ui
    totalPayments.value = (monthly*calculatedPayments).toFixed(2);
    //third block of the results UI
    totalIntrest.value = ((monthly*calculatedPayments)-principal).toFixed(2);
    document.getElementById('results').style.display = 'block';
    //show Results

    //hide loader
    document.getElementById('loading').style.display = 'none'
  }else {
    showError('Please check your numbers');
    document.getElementById('loading').style.display = 'none'
  }

}
function showError(error){
  // create div;
  const errorDiv = document.createElement('div');

  // get Elements
    const card = document.getElementById('card');
    const heading = document.getElementById('heading');
  //Add class
  errorDiv.className = 'alert alert-danger';
  errorDiv.id = 'error'
  //Create text node and append to div
  const errorMessage = document.createTextNode(error);
  errorDiv.appendChild(errorMessage)
  //insert error inside heading
  //the second element is the method you want to set it before
  card.insertBefore(errorDiv,heading);

  //clear error after three seconds
  //taskes two paremeters the first is the function and the second is the time in milliseconds
  setTimeout(clearError,2000);
}
//Clear Error

function clearError(){
  document.getElementById('error').remove();
}
