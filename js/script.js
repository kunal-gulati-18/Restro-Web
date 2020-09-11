$(function(){ //same as document.addEventListener("DOMCONTENTLOADED")

//same as document.queryselector().addEventListener("blur")

$("#navbarToggle").blur(
    function(event){

    var screenWidth=window.innerWidth;
    if(screenWidth<768)
    {
        $("#collapsable-nav").collapse('hide');
    }    
    }

    

);






});

(function(global){

var dc={};

var homehtml="snippets/home-snippet.html";
var allCategoriesUrl="data/categories.json";
var categoryhtml="snippets/category-snippet.html";
var categoriesTitleHtml="snippets/categories-title-snippet.html";
var menuItemsTitleHtml="snippets/menu-items-title.html";
var menuItemHtml="snippets/menu-item.html";
var menuitemsurl="data/menu_items.json";
var aboutpageurl="snippets/about-page-snippet.html";
var cartpageurl="snippets/cartpage.html"
//Convenience function for inserting innerhtml for 'select'

var insertHtml=function(selector,html){

var targetElem=document.querySelector(selector);
targetElem.innerHTML=html;
};

var showLoading=function(selector){
    var html="<div class='text-center'>";
    
    html+="<img src='images/ajax-loader-new.gif' style='width:55px;height:55px;'></div>";
    insertHtml(selector,html);
};
//return substitute of '{{propName}}'
var insertProperty=function(string,propName,propValue){

var propToReplace="{{"+propName+"}}";
string =string.replace(new RegExp(propToReplace,"g"),propValue);
return string;
};




//on page load before images or css

document.addEventListener("DOMContentLoaded",function(event){

showLoading("#main-content");



var IDLE_TIMEOUT = 2000; //seconds
var _idleSecondsCounter = 0;

document.onclick = function () {
    _idleSecondsCounter = 0;
};

document.onmousemove = function () {
    _idleSecondsCounter = 0;
};

document.onkeypress = function () {
    _idleSecondsCounter = 0;
};

document.ontouchstart = function () {
    _idleSecondsCounter = 0;
};

document.ontouchmove = function () {
    _idleSecondsCounter = 0;
};

document.onmousedown = function () {
    _idleSecondsCounter = 0;
};

document.onscroll = function () {
    _idleSecondsCounter = 0;
};

window.setInterval(CheckIdleTime, 1000);

function CheckIdleTime() {
    _idleSecondsCounter++;
    var oPanel = document.getElementById("SecondsUntilExpire");
    if (oPanel)
        oPanel.innerHTML = (IDLE_TIMEOUT - _idleSecondsCounter) + "";
    if (_idleSecondsCounter > IDLE_TIMEOUT) {
        
       window.location.reload();
       var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
       if (mobile) {
           alert("Time expired!Please select your order again"); 
           sessionStorage.clear();  
                      
       }

       else{
       alert("Time expired!Please select your order again");
       sessionStorage.clear();  
       }
        

        
    }
    
}





$ajaxUtils.sendGetRequest(
    homehtml,
    function(responseText)
    {
        document.querySelector("#main-content").innerHTML=responseText;
    },false);

    

dc.loadaboutpage=function()
{
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
        aboutpageurl,function(responsepage)
        {
            document.querySelector("#main-content").innerHTML=responsepage;    
        },false);

        var classes=document.querySelector("#navhomebutton").className;
        var classes1=document.querySelector("#navmenubutton").className;
        
        classes=classes.replace(new RegExp('active','g'),"");
        document.querySelector("#navhomebutton").className=classes;
        classes1=classes1.replace(new RegExp('active','g'),"");
        document.querySelector("#navmenubutton").className=classes;
 
 //add active to menu button if not already there
        classes=document.querySelector("#navaboutbutton").className;
        if(classes.indexOf('active')==-1)
        {
            classes+=" active";
            document.querySelector("#navaboutbutton").className=classes;
 }

        
        var element = document.getElementById("phone-content");
        element.parentNode.removeChild(element);
};
 //load the menu categories view
 dc.loadMenuCategories= function(){
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
        allCategoriesUrl,buildAndShowCategoriesHTML);
        document.getElementById("main-content2").style.display="none";

        var classes=document.querySelector("#navhomebutton").className;
        var classes1=document.querySelector("#navaboutbutton").className;
        classes=classes.replace(new RegExp('active','g'),"");
        classes1=classes1.replace(new RegExp('active','g'),"");
        document.querySelector("#navhomebutton").className=classes;
        document.querySelector("#navaboutbutton").className=classes1;
 //add active to menu button if not already there
        classes=document.querySelector("#navmenubutton").className;
        if(classes.indexOf('active')==-1)
        {
            classes+=" active";
            document.querySelector("#navmenubutton").className=classes;
 }

    
 }; 

 dc.loadMenuItems=function(categoryShort,top_name,instructions) //function jo ki category-snippet.html se call hoga
 {
     //L
     showLoading("#main-content");
     
     $ajaxUtils.sendGetRequest(
         menuitemsurl, function(res)
         {
             var a = 0;
             var all = new Array();
             
 
              for(var i=0;i<res.menu_items.length;i++)
              {
                 var str = res.menu_items[i].short_name;
                 var regexStr = str.match(/[a-z]+|[^a-z]+/gi);
                 
                 if(categoryShort==regexStr[0])
                 {
                    all[a] =res.menu_items[i];
                    a=a+1;
                 }
                 
              }

            
              
              
 
             $ajaxUtils.sendGetRequest(
                 menuItemsTitleHtml,
                 function(menuItemsTitleHtml)
                 {
                    
                    //retrieve single category snippet
                    $ajaxUtils.sendGetRequest(menuItemHtml,
                    function(menuItemHtml){
                       
                        $ajaxUtils.sendGetRequest(
                            cartpageurl,function(cartpage){
                                var menuItemViewHtml=buildMenuItemViewHtml(all,menuItemsTitleHtml,menuItemHtml,categoryShort,top_name,instructions,cartpage);
                                insertHtml("#main-content",menuItemViewHtml);
                                

                            },false);
                        
                        
                        
        
                    },
        
                    false);
                 },false
             );
 
         });
         var classes=document.querySelector("#navhomebutton").className;
         classes=classes.replace(new RegExp('active','g'),"");
         document.querySelector("#navhomebutton").className=classes;
  
  //add active to menu button if not already there
         classes=document.querySelector("#navmenubutton").className;
         if(classes.indexOf('active')==-1)
         {
             classes+=" active";
             document.querySelector("#navmenubutton").className=classes;
         }
  
 };
 

 dc.loadVegItems=function(categoryShort,top_name,flagval) //function jo ki category-snippet.html se call hoga
 {
     //SP
     console.log(top_name);
     //console.log(instructions);

     console.log(flagval);
     
     showLoading("#main-content2");
     $ajaxUtils.sendGetRequest(
         menuitemsurl, function(res)
         {
             var a = 0;
             var all = new Array();
             
 
              for(var i=0;i<res.menu_items.length;i++)
              {
                 var str = res.menu_items[i].short_name;
                 var regexStr = str.match(/[a-z]+|[^a-z]+/gi);
                 
                 if(categoryShort==regexStr[0])
                 {
                    all[a] =res.menu_items[i];
                    a=a+1;
                 }
                 
              }

              $ajaxUtils.sendGetRequest(
                menuItemsTitleHtml,
                function(menuItemsTitleHtml)
                {
                   
                   //retrieve single category snippet
                   $ajaxUtils.sendGetRequest(menuItemHtml,
                   function(menuItemHtml){
                      
                       $ajaxUtils.sendGetRequest(
                           cartpageurl,function(cartpage){
                               var VegItemViewHtml=buildVegItemViewHtml(all,menuItemsTitleHtml,menuItemHtml,categoryShort,top_name,cartpage,flagval);
                               insertHtml("#main-content2",VegItemViewHtml);
                               document.getElementById("main-content2").style.display="block";
                           },false);
                       
                       
                       
       
                   },
       
                   false);
                },false
            );
               
         });
         
  
 };
 


//dc.switchMenuToActive=function(){
//remove 'active' from home button


//};

 //builds HTML for the categoriesn page based on data from the server
 function buildAndShowCategoriesHTML(categories)
 {
     //loading the title snippet of categories page
     
     $ajaxUtils.sendGetRequest(
         categoriesTitleHtml,
         function(categoriesTitleHtml)
         {
            //retrieve single category snippet
            $ajaxUtils.sendGetRequest(categoryhtml,
            function(categoryhtml){
                var categoriesViewHtml=buildCategoriesViewHtml(categories,categoriesTitleHtml,categoryhtml);
                insertHtml("#main-content",categoriesViewHtml);


            },

            false);
         },false
     );
 }  


 

 function buildCategoriesViewHtml(categories,categoriesTitleHtml,categoryhtml)
 {
     var finalHtml=categoriesTitleHtml;
     finalHtml+="<section class='row rowss'>";

     //loop over categories
     for(var i=0;i<categories.length;i++)
     {
         var html=categoryhtml;
         var name="" + categories[i].name;
         var namereplace=name;
         var short_name=categories[i].short_name;
         var instructions=categories[i].special_instructions;
         html=insertProperty(html,"name",name);
         html=insertProperty(html,"short_name",short_name);
         html=insertProperty(html,"instructions",instructions);
         html=insertProperty(html,"valuename",namereplace.replace(/\'/gi,''));
        finalHtml+=html; 
     }
     finalHtml+="</section>";
     return finalHtml;
 }

 //for menu items
//   function buildAndShowMenuItemsHTML(categoryMenuItems)
//  {
//      //loading the title snippet of categories page
     
//      $ajaxUtils.sendGetRequest(
//          menuItemsTitleHtml,
//          function(menuItemsTitleHtml)
//          {
//             //retrieve single category snippet
//             $ajaxUtils.sendGetRequest(menuItemHtml,
//             function(menuItemHtml){
//                 var menuItemViewHtml=buildMenuItemViewHtml(categoryMenuItems,menuItemsTitleHtml,menuItemHtml);
//                 insertHtml("#main-content",menuItemViewHtml);


//             },

//             false);
//          },false
//      );
//  }  

 
function buildMenuItemViewHtml(all,menuItemsTitleHtml,menuItemHtml,categoryShort,top_name,instructions,cartpage)
{
    
    menuItemsTitleHtml=insertProperty(menuItemsTitleHtml,"name",top_name);
    menuItemsTitleHtml=insertProperty(menuItemsTitleHtml,"special_instructions",instructions);
    var ok=document.getElementById("lati").innerHTML;
    var kj=document.getElementById("longi").innerHTML;
    
    // var classes=document.querySelector(".add-to-cart").className;
    // classes=classes.replace(new RegExp('btn btn-primary','g')," addtocartbuttonstyle");
    //      document.querySelector(".add-to-cart").className=classes;

    var finalHtml=menuItemsTitleHtml;
    if((ok>=28.535476684570302&&ok<=28.536240083) && (kj>=75.2589263889139&&kj<=77.2603616308))   
    {
        //28.536240083
        // /77.2603616308

        var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
        var valuealert = JSON.parse(sessionStorage.getItem('alert'));
        if(valuealert=='false'||valuealert==""||valuealert==null)
        {
        if (mobile) {
            alert("You can click on ADD To Cart and then place your Order!");    
            sessionStorage.setItem('alert', 'true');          
        }
        else{
            alert("You can click on ADD To Cart and then place your Order!"); 
            sessionStorage.setItem('alert', 'true');
        }
    }

    else
    {
        console.log("ok");
    }

         finalHtml+=cartpage;


        
    }

    else{
        
        var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
        var valuealert = JSON.parse(sessionStorage.getItem('alert'));
        
        if(valuealert=='false'||valuealert==""||valuealert==null){
        if (mobile) {
            alert("You can only order inside the Restaurant!");  
            sessionStorage.setItem('alert', 'true');
                        
        }
        else{
            alert("You can only order inside the Restaurant!"); 
            sessionStorage.setItem('alert', 'true');
            
        }
    }

    else
    {
            console.log("ok");
    }
    }
    finalHtml+="<section class='row'>";

    //loop over menu items
    var menuItems=all;
    var catShortName=categoryShort;
    for(var i=0;i<menuItems.length;i++)
    {
        var html=menuItemHtml;
        var descreplace=menuItems[i].description;
        html=insertProperty(html,"catShortName",catShortName);
        html=insertProperty(html,"short_name",menuItems[i].short_name);
        html=insertItemPrice(html,"price_small",menuItems[i].price_small);
        html=insertItemPrice(html,"price_large",menuItems[i].price_large);
        html=insertProperty(html,"name",menuItems[i].name);
        html=insertProperty(html,"description",menuItems[i].description);
        html=insertProperty(html,"valueclass",i);
        html=insertProperty(html,"valuedesc",descreplace.replace(/\'/gi,''));
        
        var matchvariable=menuItems[i].description;

        var res = matchvariable.match(/chicken/gi);
        var res1=matchvariable.match(/beef/gi);
        result=checkstring(res,res1);
        console.log(result);

        if(result==false)
        {
            html=insertintocart(html,"https://img.icons8.com/color/15/000000/non-vegetarian-food-symbol.png","https://img.icons8.com/color/15/000000/vegetarian-food-symbol.png");
        }

        if(!(ok>=25.535476684570302&&ok<=28.536240083) || !(kj>=75.2589263889139&&kj<=77.2603616308))   
        {
            
            //28.536240083
        // /77.2603616308
            html=insertintocart(html,"add-to-cart","addtocartbuttonstyle"); //hides cart
        }
       //adding clearfix after every second menu item

       if(i%2!=0)
       {
           html+="<div class='visible-lg-block visible-md-block'></div>";
       }
       
       finalHtml+=html; 
    }
    finalHtml+="</section>";

    return finalHtml;
}

function buildVegItemViewHtml(all,menuItemsTitleHtml,menuItemHtml,categoryShort,top_name,cartpage,flagval)
{
    
    // menuItemsTitleHtml=insertProperty(menuItemsTitleHtml,"name",top_name);
    // menuItemsTitleHtml=insertProperty(menuItemsTitleHtml,"special_instructions",instructions);
    var ok=document.getElementById("lati").innerHTML;
    var kj=document.getElementById("longi").innerHTML;
    // var classes=document.querySelector(".add-to-cart").className;
    // classes=classes.replace(new RegExp('btn btn-primary','g')," addtocartbuttonstyle");
    //      document.querySelector(".add-to-cart").className=classes;

    var finalHtml;
    if((ok>=28.535476684570302&&ok<=28.536240083) && (kj>=75.2589263889139&&kj<=77.2603616308))   
    {
            //28.536240083
        // /77.2603616308
         
        
        finalHtml+=cartpage;


        
    }

    
    finalHtml+="<section class='row'>";

    //loop over menu items
    var newstore=new Array();
    var bothstore=new Array();
    var m=0;
    var n=0;

    for(var i=0;i<all.length;i++)
    {
            //console.log("all are"+all[i].description);
            var matchvar= all[i].description;
            var res = matchvar.match(/chicken/gi);
            var res1=matchvar.match(/beef/gi);
            result=checkstring(res,res1);
            if(result==false)
            {
                newstore[m]=all[i];  //loading veg items 
                m=m+1;

             }

             bothstore[n]=all[i];  //loading all items 
                n=n+1;

    }

    if(flagval=='v')
    {
    var menuItems=newstore;
    var catShortName=categoryShort;
    if(menuItems==null||menuItems==""||menuItems=='')
    {

        // var tag = document.createElement("p");
        //  tag.innerHTML = "No items in veg for category nmvhjvjvlgcgcfghccccc";
        //  tag.id="stylethistag";
        //  document.querySelector("#main-content2").appendChild(tag); 
    
        
        //insertHtml("#main-content2",VegItemViewHtml);

        return alert("No veg item available for category "+categoryShort);
    }

    else
    {
    for( i=0;i<menuItems.length;i++)
    {
        var html=menuItemHtml;
        

        html=insertProperty(html,"catShortName",catShortName);
        html=insertProperty(html,"short_name",menuItems[i].short_name);
        html=insertItemPrice(html,"price_small",menuItems[i].price_small);
        html=insertItemPrice(html,"price_large",menuItems[i].price_large);
        html=insertProperty(html,"name",menuItems[i].name);
        html=insertProperty(html,"description",menuItems[i].description);
        var matchvariable=menuItems[i].description;

        var res = matchvariable.match(/chicken/gi);
        var res1=matchvariable.match(/beef/gi);
        result=checkstring(res,res1);
        console.log(result);

        if(result==false)
        {
            html=insertintocart(html,"https://img.icons8.com/color/15/000000/non-vegetarian-food-symbol.png","https://img.icons8.com/color/15/000000/vegetarian-food-symbol.png");
        }

        if(!(ok>=25.535476684570302&&ok<=28.536240083) || !(kj>=74.2589263889139&&kj<=77.2603616308))   
        {
            
                //28.536240083
        // /77.2603616308
            html=insertintocart(html,"add-to-cart","addtocartbuttonstyle"); //hides cart
        }
       //adding clearfix after every second menu item

       if(i%2!=0)
       {
           html+="<div class='visible-lg-block visible-md-block'></div>";
       }
       
       finalHtml+=html; 
    }
    }
    }

    else if(flagval==='b')
    {
        var menuItems=bothstore;
    var catShortName=categoryShort;

    for( i=0;i<menuItems.length;i++)
    {
        var html=menuItemHtml;
        

        html=insertProperty(html,"catShortName",catShortName);
        html=insertProperty(html,"short_name",menuItems[i].short_name);
        html=insertItemPrice(html,"price_small",menuItems[i].price_small);
        html=insertItemPrice(html,"price_large",menuItems[i].price_large);
        html=insertProperty(html,"name",menuItems[i].name);
        html=insertProperty(html,"description",menuItems[i].description);
        var matchvariable=menuItems[i].description;

        var res = matchvariable.match(/chicken/gi);
        var res1=matchvariable.match(/beef/gi);
        result=checkstring(res,res1);
        console.log(result);

        if(result==false)
        {
            html=insertintocart(html,"https://img.icons8.com/color/15/000000/non-vegetarian-food-symbol.png","https://img.icons8.com/color/15/000000/vegetarian-food-symbol.png");
        }

        if(ok!=25.6326784 || kj!=77.2046848)   
        {
                    //28.536240083
        // /77.2603616308
            html=insertintocart(html,"add-to-cart","addtocartbuttonstyle"); //hides cart
        }
       //adding clearfix after every second menu item

       if(i%2!=0)
       {
           html+="<div class='visible-lg-block visible-md-block'></div>";
       }
       
       finalHtml+=html; 
    } 
    }

    finalHtml+="</section>";

    return finalHtml;
}


function insertItemPrice(html,pricepropName,priceValue){

if(!priceValue)
{
    return insertProperty(html,pricepropName,"");
}
priceValue="$"+priceValue.toFixed(2);
html=insertProperty(html,pricepropName,priceValue);
return html;
};

function insertintocart(string,propName,value)
{
    
string =string.replace(new RegExp(propName,"g"),value);
return string;
};

function checkstring(res,res1)
{
    if(res==null&&res1!=null)
    {
        return true;
    }

    else if(res!=null&&res1==null)
    {
        return true;
    }
    else if(res!=null&&res1!==null)
    {
        return true;
    }

    else if(res==null&&res1==null)
    {
        return false;
    }
}

});
global.$dc=dc;
})(window);