/* Topic 6.7 · Forward Contract — interactive behaviour for this topic's content. */

document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('.sec-div').forEach(function(section){
    var button=section.querySelector('.expand-btn');
    var content=section.nextElementSibling;
    if(!button || !content) return;

    button.addEventListener('click',function(){
      var expanded=button.getAttribute('aria-expanded')==='true';
      content.style.display=expanded?'none':'';
      button.setAttribute('aria-expanded',expanded?'false':'true');
      button.textContent=expanded?'⏶':'⏷';
    });
  });
});
