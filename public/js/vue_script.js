
/*
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

  var emp4 = new MenuItem('Dwarf', '300', '', 'https://www.nixo.pl/wp-content/uploads/2016/12/Flying-Burger-Nixo-Dominik-Janasik.jpg');

  var emp5 = new MenuItem('Hood', '700', 'gluten and lactose', 'https://www.nixo.pl/wp-content/uploads/2016/12/Flying-Burger-Nixo-Dominik-Janasik.jpg');

  var burgerArray=[emp, emp2, emp3, emp4, emp5]
*/

function add_element_to_array()
{
    var name = document.getElementById("fullname").value;
    var mail = document.getElementById("email").value;
    //var street = document.getElementById("street").value;
    //var house = document.getElementById("house").value;
    var request = document.getElementById("requests").value;

    //because default
    var gender = document.getElementById("undisclosed").value;

    //if gender is activly changed
    if (document.getElementById("male").checked){
        var gender = document.getElementById("male").value;
    } else if (document.getElementById("female").checked){
        var gender = document.getElementById("female").value;
    } else if (document.getElementById("nonbinary").checked){
        var gender = document.getElementById("nonbinary").value;
    }

    var payment = document.getElementById("recipient").value;
    
    var array = [name, mail, /*street, house,*/ request, gender, payment];
    return array;
    
}

function get_checked_burgers()
{
    var burgers = document.getElementsByClassName("burgerChecker");
    var checkedBurgers = []
    var length = burgers.length;
    for (var i=0; i<length; i++)
    {
        var checked = burgers[i].checked;
        if(checked)
        {
            checkedBurgers.push(burgers[i].id);
        }
    }
    return checkedBurgers;
}


var vm = new Vue({
    el: '#menuList',
    data: {
        items: food
    }
})


/*
new Vue({
    el: '#orders',
    data: {
        show: false,
        burgers: "burgers",
        name: "name",
        mail: "mail",
        // street: "street",
        // house: "house",
        request: "request",
        gender: "gender",
        payment: "payment" 
    },
    methods: {
        markDone: function() {
            var orderList = add_element_to_array();
            this.burgers = get_checked_burgers().join(", "),
            this.name = orderList[0],
            this.mail = orderList[1],
            //   this.street = orderList[2],
            //   this.house = orderList[3],
            this.request = orderList[2],
            this.gender = orderList[3],
            this.payment = orderList[4],
            this.show=true
        } 
    }
}); */

/*jslint es5:true, indent: 2 */
/*global Vue, io */
/* exported vm */
'use strict';
var socket = io();

var vm = new Vue({
    el: '#orders',
    data: {
        show: false,
        burgers: "burgers",
        name: "name",
        mail: "mail",
        // street: "street",
        // house: "house",
        request: "request",
        gender: "gender",
        payment: "payment",
        orders: {show:false},
    },
    created: function () {
        socket.on('initialize', function (data) {
            this.orders = data.orders;
        }.bind(this));

        socket.on('currentQueue', function (data) {
            this.orders = data.orders;
        }.bind(this));
    },
    methods: {
        markDone: function() {
            var orderList = add_element_to_array();
            this.burgers = get_checked_burgers().join(", "),
            this.name = orderList[0],
            this.mail = orderList[1],
            this.request = orderList[2],
            this.gender = orderList[3],
            this.payment = orderList[4],
            this.show=true
        },
        getNext: function () {
            var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
                return Math.max(last, next);
            }, 0);
            return lastOrder + 1;
        },
        addOrder: function (event) {
            var orderList = add_element_to_array();
            this.burgers = get_checked_burgers().join(", "),
            this.name = orderList[0],
            this.mail = orderList[1],
            this.request = orderList[2],
            this.gender = orderList[3],
            this.payment = orderList[4],
            this.show=true
            var offset = {x: event.currentTarget.getBoundingClientRect().left,
                          y: event.currentTarget.getBoundingClientRect().top};
            socket.emit("addOrder", { orderId: this.getNext(),
                                      details: { x: event.clientX - 10 - offset.x,
                                                 y: event.clientY - 10 - offset.y },
                                      orderItems: ["Beans", "Curry"]
                                    });
        },
        displayOrder: function () {
            var offset = {x: event.currentTarget.getBoundingClientRect().left,
                          y: event.currentTarget.getBoundingClientRect().top}; 
            this.orders = { show:true,
                            x: event.clientX - 10 - offset.x,
                            y: event.clientY - 10 - offset.y };
            
        }  
        
    }
});

