function handleSubmit(e) {
  e.preventDefault();

  //Grab inputs, and do quick validate.

  let address = document.querySelector(`input[name="address"]`);

  let amount = document.querySelector(`input[name="amount"]`);

  let errorMessage = document.querySelector(".errorMessage");

  let successMessage = document.querySelector(".successMessage");

  let checkmark = document.querySelector(".checkmark");

  let form = document.querySelector(".sendCoinsContainer");

  let txText = document.querySelector(".transactionConfirmation");

  //Available passed in through home.pug template !!
  let availableHNS = available;

  if (amount.value == 0) {
    errorMessage.innerHTML = "Please enter an amount above 0.";
    errorMessage.classList.add("visible");

    amount.classList.add("error");

    return;
  }

  if (Math.round(amount.value * 100) > Math.round(availableHNS * 100)) {
    errorMessage.innerHTML =
      "You can't withdraw more than the available amount.";
    errorMessage.classList.add("visible");

    amount.classList.add("error");

    return;
  }

  //Do more checking later, maybe a full regex. XXX
  if (!address.value.startsWith("ts")) {
    errorMessage.innerHTML = "Please enter a valid HNS Testnet address";
    errorMessage.classList.add("visible");

    address.classList.add("error");

    return;
  }

  //Send Ajax request
  xhr = new XMLHttpRequest();

  xhr.open("POST", "/withdraw");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function() {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      form.classList.add("hidden");
      successMessage.classList.add("visible");
      checkmark.classList.add("active");
      txText.innerHTML = `You have been sent ${
        amount.value
      } HNS! View the transaction <a class="purpleLink" target="_blank" rel="noopener noreferrer" href="http://localhost:7000/tx/${
        data.hash
      }">here</a>`;
    } else if (xhr.status >= 400 && xhr.status < 500) {
      if (xhr.status === 429) {
        errorMessage.innerHTML =
          "Too many requests. Please try again in an hour";
        errorMessage.classList.add("visible");
      } else {
        errorMessage.innerHTML = xhr.responseText;
        errorMessage.classList.add("visible");
      }
    } else {
      errorMessage.innerHTML = "Something went wrong... Please try again later";
      errorMessage.classList.add("visible");
    }
  };
  xhr.send(
    JSON.stringify({
      address: address.value,
      amount: amount.value * 1000000
    })
  );
}

function resetInput(e) {
  e.target.classList.remove("error");
}
