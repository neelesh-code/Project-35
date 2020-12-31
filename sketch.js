//Create variables here
 
var dog, happyDog, database
var foodS, foodStock, d, hd

var fedTime, lastFed;
var feed, addFood;
var FoodObj;
 
function preload()
{
 d=loadImage("images/dogImg.png");
 hd=loadImage("images/dogImg1.png");
 //load images here
}
 
function setup() {
 createCanvas(1000, 400);
  database=firebase.database();
  dog=createSprite(800, 200, 150, 150);
 dog.addImage(d);
 dog.scale=0.15;
 
  foodObj= new Food();

 foodStock=database.ref("Food");
 foodStock.on("value", readStock);
 
 feed=createButton("Feed the dog!");
 feed.position(700,95);
 feed.mousePressed(feedDog);

 addFood =createButton("Add Food!");
 addFood.position(800,95);
 addFood.mousePressed(addFoods);
}
 
 
function draw() { 
 
 background(46,139,87);

 drawSprites();
 //add styles here
 
 foodObj.display();

 fedTime=database.ref("FeedTime");

 fedTime.on("value", function(data){
   lastFed = data.val();
 });

 textSize(15);
 fill(255,255,254);
 if(lastFed >= 12){
   text("Last Feed: "+ lastFed%12+"PM", 350,30);
 }
 else if(lastFed===0){
   text("Last Feed: 12 AM", 350, 30);
 }
 else{
   text("Last Feed: "+lastFed+"AM", 350,30);
 }


}
 
 
 
function readStock(data){
 foodS=data.val();

 foodObj.updateFoodStock(foodS);
 
}
 


function feedDog(){
  dog.addImage(hd);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);

  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods(){
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}

