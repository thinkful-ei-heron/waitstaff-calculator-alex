const store = {
  mealCounter: 0, tipCounter: 0, subTotal: 0, tipAmount: 0, totalAmount: 0
}


//listens for reset button
const resetButton = function() {

}

//renders html for MY EARNINGS INFO html
const renderMyEarningsInfo = function() {

}

//renders html for CUSTOMER CHARGES html
const renderCustomerCharges = function() {
  const customerChargesString = `<h2>CUSTOMER CHARGES</h2>
  <p>
    SUBTOTAL: ${store.subTotal} <br>
    TIP: ${store.tipAmount} <br>
    TOTAL: ${store.totalAmount}
  </p>`
  $('.js-customer-charges').html(customerChargesString);
}

const tipCalc = function(mealPrice, taxRate, tipRate) {
  const grossTax = mealPrice * taxRate;
  const taxAmount = grossTax / 100;
  const subTotal = parseInt(mealPrice) + parseInt(taxAmount);
  const tipAmount = (subTotal * tipRate) / 100;
  store.tipCounter += tipAmount;
  const totalAmount = parseInt(subTotal) + parseInt(tipAmount);
  store.tipAmount = tipAmount;
  store.subTotal = subTotal;
  store.totalAmount = totalAmount;
}

//gathers numbers from meal info form
const submitMealNumbers = function() {
    $('.js-meal-input').submit(function(event) {
      event.preventDefault();
      store.tipAmount = 0;
      store.subTotal = 0;
      store.totalAmount = 0;
      console.log("CLICK");
      const mealPrice = $('.js-meal-price').val();
      const taxRate = $('.js-tax-rate').val();
      const tipRate = $('.js-tip-rate').val();
      $('.js-meal-price').val('');
      $('.js-tax-rate').val('');
      $('.js-tip-rate').val('');
      store.mealCounter++;
      tipCalc(mealPrice, taxRate, tipRate);
      renderCustomerCharges();
    });
  };


//resets values in form when clicking cancel
const handleCancelClick = function() {
  $('.js-cancel-button').click(function(event) {
    event.preventDefault();
    $('.js-meal-price').val('');
    $('.js-tax-rate').val('');
    $('.js-tip-rate').val('');
  });
};

//calls all necessary functions
const handleCalculator = function() {
  submitMealNumbers();
  handleCancelClick();
  renderCustomerCharges();
}

$(handleCalculator);