window.onload = () => {
  const hamburger = document.querySelector(".hamburger"),
    navLink = document.querySelectorAll(".nav-link"),
    navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLink.forEach((link) =>
    link.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    })
  );
  const btnId = document.getElementById('i001');
  const btn = document.querySelector(".dark-light");
  var nav = document.querySelector(".fixed-top");
  var nav_link = document.getElementsByClassName("nav-link");
  var darkIcon = document.getElementsByClassName("dark-light");
  btn.addEventListener('click' , () => {
    if (btnId.classList.contains("fa-sun")) {
      btnId.classList.remove('fa-sun');
      btnId.classList.add('fa-moon');
      nav.style.backgroundColor = "#d4cece";
      for(var i=0;i<nav_link.length;i++)
      {
        nav_link[i].style.color = "#01021d";
      }
    }
    else
    {
      btnId.classList.remove('fa-moon');
      btnId.classList.add('fa-sun');
      nav.style.backgroundColor = "#01021d";
      for(var i=0;i<nav_link.length;i++)
      {
        nav_link[i].style.color = "#d4cece";
      }
      darkIcon[0].style.color = "white";
    }
  })
};
