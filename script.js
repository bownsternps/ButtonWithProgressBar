const btn = document.querySelector(".btn");
btn.addEventListener("click", ()=>{
  btn.classList.add("active");
  setTimeout(()=>{
    btn.classList.remove("active");
    btn.querySelector("i").classList.replace("bx-cloud-download", "bx-check-circle")
    btn.querySelector("span").innerText = "Completed";
  },6000);
});
