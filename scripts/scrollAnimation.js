const observer = new IntersectionObserver((entries) =>
    entries.forEach((entry) => {
        entry.isIntersecting ? entry.target.classList.add("shown") : entry.target.classList.remove("shown");
    })
);

const elements = document.querySelectorAll(".hidden");
elements.forEach((element) => observer.observe(element));
