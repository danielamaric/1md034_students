function MenuItem(name, cal, all, im) {
    this.name = name; // The this keyword refers to the object itself
    this.calories = cal;
    this.allergy = all;
    this.image = im;
    this.info = function() {
        return this.name + ' ' + this.calories + ' ' + this.allergy;
    };
}

// Objects are then instantiated using the new keyword
var emp = new MenuItem('Thor', '700', 'lactose', 'https://www.foodlovers.in/wp-content/uploads/2017/06/black-bun-burgers.png');
 // Output: Thor 700

var emp2 = new MenuItem('Guardian', '600', 'gluten and lactose', 'https://static01.nyt.com/images/2016/04/20/dining/20REST-SPOTTEDPIG-slide-YHHD/20REST-SPOTTEDPIG-slide-YHHD-articleLarge.jpg?quality=75&auto=webp&disable=upscale');

var emp3 = new MenuItem('Clark', '600', 'gluten', 'https://www.nixo.pl/wp-content/uploads/2016/12/Flying-Burger-Nixo-Dominik-Janasik.jpg');

var emp4 = new MenuItem('Dwarf', '300', 'No allergenes', 'https://www.nixo.pl/wp-content/uploads/2016/12/Flying-Burger-Nixo-Dominik-Janasik.jpg');

var emp5 = new MenuItem('Hood', '700', 'gluten and lactose', 'https://www.nixo.pl/wp-content/uploads/2016/12/Flying-Burger-Nixo-Dominik-Janasik.jpg');

var array=[emp, emp2, emp3, emp4, emp5]
var columnNames = ["thor", "guardian", "clark", "dwarf", "hood"]

var myElement = document.getElementById("myID");

for (var a in array)
{
    var box = document.createElement("div");
    box.classList.add("box");
    box.classList.add(columnNames[a]);
    myElement.appendChild(box);
    
    var title = document.createElement("h2");
    var titleContent = document.createTextNode(array[a].name);
    title.appendChild(titleContent);
    box.appendChild(title);

    var image = document.createElement("IMG");
    image.setAttribute("src", array[a].image);
    image.setAttribute("width", "200");
    box.appendChild(image);
    
    var list = document.createElement("ul")
    var itemCals = document.createElement("li");
    var itemAlls = document.createElement("li");
    var cals = document.createTextNode(array[a].calories);
    var alls = document.createTextNode(array[a].allergy);
    itemCals.appendChild(cals);
    itemAlls.appendChild(alls);
    
    list.appendChild(itemCals);
    list.appendChild(itemAlls);
    box.appendChild(list);
    
}



var myButton = document.getElementById("butt");

myButton.onclick = function () {
    console.log("Button clicked!");
    console.log(add_element_to_array());
}


