function runpanel(obj,name,description){
    // Slide In Panel - by CodyHouse.co
   // console.log("panel"+shortname);
	//var panelTriggers = document.getElementsByClassName('js-cd-panel-trigger');
	//var panelTriggers= $(this).attr('class');
	
	var nameofclass=document.getElementsByClassName(obj.className);

	

			    var panelClass='js-cd-panel-'+obj.getAttribute('data-panel'),
				panel = document.getElementsByClassName(panelClass)[0];
				event.preventDefault();
				document.getElementById("headingname").innerHTML=name;
				
				console.log(description);
				document.getElementById("panel-description").innerHTML=description;
				addClass(panel, 'cd-panel--is-visible');
}

function closepanel()
{
	
	var classes=document.querySelector(".cd-panel").className;
	classes=classes.replace(new RegExp('cd-panel--is-visible','g'),"");
	document.querySelector(".cd-panel").className=classes;
	var video=document.getElementById("myvideo");
	video.pause();
	video.currentTime = 0; 
   
}

//close panel if we touch other than panel
document.body.addEventListener('click', function(evt) {
    var evt = window.event || evt; //window.event for IE
    if (!evt.target) {
      evt.target = evt.srcElement; //extend target property for IE
    }
    var e = evt.target;
	
	if(evt.target.className=='cd-panel cd-panel--from-right js-cd-panel-main cd-panel--is-visible')

	{
			closepanel();
	}
  });
function addClass(el, className) {
   if (el.classList) el.classList.add(className);
   else if (!hasClass(el, className)) el.className += " " + className;
}
