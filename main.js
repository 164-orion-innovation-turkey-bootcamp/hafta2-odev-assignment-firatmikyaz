//Products List
var materialList = {
	pickle: 5,
	sauce: 2,
	onion: 5,
	meatball: 5,
	chicken: 5,
	tomato: 5,
	bread: 5,
	fries: 5,
	coke: 5,
};

// What to do in order
const todos = [
	{ id: 0, description: "Sipariş alındı.." },
	{ id: 1, description: "Stok kontrolü yapiliyor.." },
	{ id: 2, description: "Köfte mi, Tavuk mu kontrol ediliyor.." },
	{
		id: 3,
		description: "Köfte seçildi. Az pişmiş köfteniz hazırlanıyor..",
	},
	{
		id: 4,
		description: "Köfte seçildi. orta pişmiş köfteniz hazırlanıyor..",
	},
	{
		id: 5,
		description: "Köfte seçildi. cok pişmiş köfteniz hazırlanıyor..",
	},
	{ id: 6, description: "Tavuk secildi ve pişiriliyor.." },
	{ id: 7, description: "Patatesler hazırlanıyor.." },
	{ id: 8, description: "İçecekler hazırlanıyor.." },
	{ id: 9, description: "Sosları ve Ürünleri Servis Tepsisine Koy.." },
	{ id: 10, description: "Siparisiniz hazir, afiyet olsun :)" },
];

function checkMaterialList(materialList) {
	// Object values methodu objenin icinde bulunan degerleri array olarak return eder.
	// every methodu dizinin tum elemanlarini kosula gore kontrol eder. return true or false
	return Object.values(materialList).every((element) => element > 0);
}

//the function that we convert todos to to promises
function newTodo(todo, timeout) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(console.log(todo.description));
		}, timeout);
	});
}
//Set Meatball cooking time
async function cookingTime(time) {
	switch (time) {
		case "well":
			// console.log("well");
			await newTodo(todos[5], 4000);
			break;
		case "medium":
			// console.log("medium");
			await newTodo(todos[4], 3000);

			break;
		case "rare":
			// console.log("rare");
			await newTodo(todos[3], 2000);

			break;
		default:
			break;
	}
}
//We check stock and return new products list
function stockDecrease(meatType, list) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			Object.entries(list).map((element) => {
				if (meatType == "meatball") {
					list[element[0]] -= 1;
					if (element[0] === "chicken") {
						list[element[0]]++;
					}
				} else {
					if (element[0] === "meatball") {
						list[element[0]]++;
					}
					list[element[0]] -= 1;
				}
			});
			resolve(console.log("Hamburger hazırlandı.."));
		}, 1000);
	});
}

//We check that meatball or chicken
async function burger(order, list) {
	await newTodo(todos[2], 1000);
	if (order.meat === "meatball") {
		await cookingTime(order.cookTime);
	} else {
		await newTodo(todos[6], 3000);
	}
	await stockDecrease(order.meat, list);
}
//that function provides that step 3-4-5 can start at same time
async function layer(order, list) {
	return new Promise((resolve, reject) => {
		resolve(
			burger(order, list),
			newTodo(todos[7], 5000),
			newTodo(todos[8], 2000)
		);
	});
}
let hata ="1";
//Main function
async function meal(order, list) {
	await newTodo(todos[0], 1000);
	await newTodo(todos[1], 3000);
	if (checkMaterialList(list)) {
		console.log("Stok var..");
		await layer(order, list);
		await newTodo(todos[9], 1000);
		await newTodo(todos[10], 1000);
		hata = true;
	} else {
		hata = false;
		console.error("Stok Bitti!");
	}

	console.log(materialList);
}

//Orders types
let order1 = {
	meat: "meatball",
	cookTime: "well",
};
let order2 = {
	meat: "chicken",
};

//We create orders
async function main(amount,type) {
	for (let i = 0; i < amount; i++) {
		if(hata == true){
			await meal(type, materialList);
		}
	}	
}

//Run the main function
main(1,order1);

