$(document).ready(function () {
  $("form").submit(function (event) {
    event.preventDefault();
    $(".error-message").remove(); 

    const fullName = $("#fullName").val().trim();
    const Email = $("#Email").val();
    const Password = $("#Password").val().trim();
    const Mobile = $("#Mobile").val();
    const Gender = $("input[name='gender']:checked").val();
    const State = $("#State").val();
    const Address = $("#Address").val().trim();
    const City = $("#City").val().trim();
    const Pincode = $("#Pincode").val();
    let Date = $("#Date").val();
     Date = Date.split("-").reverse().join("-");
    const Hobbies = $("input[name='Group']:checked")
      .map(function () {
        return $(this).val();
      })
      .get();
    const fileInput = $("#Upload")[0].files[0];

    let isValid = true;

    const showError = (selector, message) => {
      $(selector).after(`<span class="error-message" style="color: red;">${message}</span>`);
    };

    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(fullName)) {
      isValid = false;
      showError("#fullName", "Please enter a valid name (A-Z, a-z, spaces only).");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(Email)) {
      isValid = false;
      showError("#Email", "Please enter a valid email address.");
    }

    const mobilePattern = /^\d{10}$/;
    if (!mobilePattern.test(Mobile)) {
      isValid = false;
      showError("#Mobile", "Please enter a valid 10-digit mobile number.");
    }

    // const pincodePattern = /^\d{6}$/;
    // if (!pincodePattern.test(Pincode)) {
    //   isValid = false;
    //   showError("#Pincode", "Please enter a valid 6-digit Pincode.");
    // }

    // if (!State || State === "Select") {
    //   isValid = false;
    //   showError("#State", "Please select a valid state.");
    // }

    // if (!City) {
    //   isValid = false;
    //   showError("#City", "Please enter a valid city.");
    // }

    // if (!Address) {
    //   isValid = false;
    //   showError("#Address", "Please enter a valid address.");
    // }

    if (Password.length < 8 || Password.length > 16) {
      isValid = false;
      showError("#Password", "Password must be 8-16 characters.");
    }

    if (isValid) {
      const confirmSubmit = confirm("Are you sure you want to submit the form?");
      if (confirmSubmit) {
        alert("Form submitted successfully!");

        $("#output").html(
          `<strong>Full Name:</strong> ${fullName} <br>
           <strong>Email:</strong> ${Email} <br>
          <strong>Password:</strong> 
          <span id="outputPassword">
          <span id="passwordText" style="letter-spacing: 3px;">${"*".repeat(
           Password.length
         )}</span>
         <button type="button" class="btn btn-outline-secondary" id="togglePassword">Show</button>
       </span>
       <br>
         <strong>Mobile:</strong> ${Mobile} <br>
           <strong>Gender:</strong> ${Gender} <br>
           <strong>State:</strong> ${State} <br>
           <strong>Address:</strong> ${Address} <br>
           <strong>City:</strong> ${City} <br>
           <strong>Pincode:</strong> ${Pincode} <br>
           <strong>Date:</strong> ${Date} <br>
           <strong>Hobbies:</strong> ${
             Hobbies.length > 0 ? Hobbies.join(", ") : "None selected"
           } <br>`
        );

        $("#togglePassword").on("click", function () {
          const passwordText = $("#passwordText");
          const isHidden = passwordText.text() === "*".repeat(Password.length);

          if (isHidden) {
            passwordText.text(Password);
            $(this).text("Hide");
          } else {
            passwordText.text("*".repeat(Password.length));
            $(this).text("Show");
          }
        });

        if (fileInput) {
          const fileReader = new FileReader();
          fileReader.onload = function (e) {
            $("#filePreview").html(
              `<h4>Uploaded File Preview:</h4>
               <img src="${e.target.result}" alt="Uploaded File" style="max-width: 100%; height: auto;">`
            );
          };
          fileReader.readAsDataURL(fileInput);
        }

        $("form")[0].reset();
        clearFilePreview();
      }
    } else {
      alert("Please fill out all required fields before submitting the form.");
    }
  });

  $("#Mobile, #Pincode").on("keypress", function (event) {
    const key = event.which || event.keyCode;
    if (key < 48 || key > 57) {
      event.preventDefault();
    }
  });

  $("#fullName, #City").on("keypress", function (event) {
    const key = event.which || event.keyCode;
    if (!((key >= 65 && key <= 90) || (key >= 97 && key <= 122) || key === 32)) {
      event.preventDefault();
    }
  });

  const clearFilePreview = () => {
    $("#imgPreview").hide().attr("src", "");
  };

  $("#Upload").on("change", function () {
    const fileInput = this.files[0];
    if (fileInput) {
      const fileReader = new FileReader();
      fileReader.onload = function (e) {
        $("#imgPreview").attr("src", e.target.result).show();
      };
      fileReader.readAsDataURL(fileInput);
    } else {
      clearFilePreview();
    }
  });
});
