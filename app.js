const typedElement = document.getElementById('typed');
const typedItems = ["Student","Researcher", "Traveller", "Philanthropist"];
let currentItemIndex = 0;
let currentText = '';
let isDeleting = false;

function type() {
    const item = typedItems[currentItemIndex];
    if (isDeleting) {
        currentText = item.substring(0, currentText.length - 1);
    } else {
        currentText = item.substring(0, currentText.length + 1);
    }

    typedElement.innerHTML = currentText;

  if (!isDeleting && currentText === item) {
    typedElement.classList.add('emphasis'); // add emphasis class to typed element
    isDeleting = true;
    setTimeout(() => type(), 1000);
  } else if (isDeleting && currentText === '') {
    typedElement.classList.add('emphasis'); // remove emphasis class from typed element
    isDeleting = false;
    currentItemIndex = (currentItemIndex + 1) % typedItems.length;
    setTimeout(() => type(), 500);
  } else {
    const delay = isDeleting ? 50 : 100;
    setTimeout(() => type(), delay);
    }
}

type();

(function () {

  [...document.querySelectorAll(".control")].forEach(button => {
      button.addEventListener("click", function() {
          document.querySelector(".active-btn").classList.remove("active-btn");
          this.classList.add("active-btn");
          document.querySelector(".active").classList.remove("active");
          document.getElementById(button.dataset.id).classList.add("active");
      })
  });
  document.querySelector(".theme-btn").addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
  })



})();
var backToTopBtn = document.getElementById("back-to-top-btn");

// Add a scroll event listener to the window object
window.addEventListener("scroll", function() {
  // If the user has scrolled more than 500 pixels, show the button
  if (window.pageYOffset > 500) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

// Add a click event listener to the button
backToTopBtn.addEventListener("click", function() {
  // Scroll to the top of the page using smooth scrolling
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

var form = document.getElementById("my-form");
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          
          status.innerHTML = "Thanks for your submission!";
          form.reset()
          status.classList.add("success")
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.innerHTML = "Oops! There was a problem submitting your form"
              status.classList.add("error")
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
        status.classList.add("error")
      });
    }
    form.addEventListener("submit", handleSubmit)