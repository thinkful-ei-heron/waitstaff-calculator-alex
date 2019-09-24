const store = {
  mealCounter: 0, tipCounter: 0, subTotal: 0, tipAmount: 0, totalAmount: 0, avgTip: 0
};



//renders html for MY EARNINGS INFO html
const renderMyEarningsInfo = function() {
  const myEarningsString = `<h2>MY EARNINGS INFO</h2>
  <p>
    TIP TOTAL: ${store.tipCounter.toFixed(2)} <br>
    MEAL COUNT: ${store.mealCounter} <br>
    TIP AVERAGE: ${store.avgTip.toFixed(2)}
  </p>`
  $('.js-earnings-info').html(myEarningsString);
};

//renders html for CUSTOMER CHARGES html
const renderCustomerCharges = function() {
  const customerChargesString = `<h2>CUSTOMER CHARGES</h2>
  <p>
    SUBTOTAL: ${store.subTotal.toFixed(2)} <br>
    TIP: ${store.tipAmount.toFixed(2)} <br>
    TOTAL: ${store.totalAmount.toFixed(2)}
  </p>`
  $('.js-customer-charges').html(customerChargesString);
};

const valCalc = function(mealPrice, taxRate, tipRate) {
  const grossTax = mealPrice * taxRate;
  const taxAmount = grossTax / 100;
  const subTotal = parseInt(mealPrice) + parseInt(taxAmount);
  const tipAmount = (subTotal * tipRate) / 100;
  store.tipCounter += tipAmount;
  const totalAmount = parseInt(subTotal) + parseInt(tipAmount);
  store.tipAmount = tipAmount;
  store.subTotal = subTotal;
  store.totalAmount = totalAmount;
  store.avgTip = parseInt(store.tipCounter) / parseInt(store.mealCounter);
};

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
      valCalc(mealPrice, taxRate, tipRate);
      renderCustomerCharges();
      renderMyEarningsInfo();
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

//listens for reset button
const resetButton = function() {
  $('.js-reset-button').click(function(event) {
    location.reload();
  });
};

//calls all necessary functions
const handleCalculator = function() {
  submitMealNumbers();
  handleCancelClick();
  renderCustomerCharges();
  renderMyEarningsInfo();
  resetButton();
};

$(handleCalculator);