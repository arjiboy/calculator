
var state = {
	initialState: 0,
	total: 0,
	val: '',
	operation: '',
	memory: ''
}

function add(x){
	return function add1(y){
		return x+y;
	}
}
function sub(x){
	return function sub1(y){
		return x-y;
	}
}function mul(x){
	return function mul1(y){
		return x*y;
	}
}function div(x){
	return function div1(y){
		return x/y;
	}
}

function operations(id,n){
	switch (id){
		case "add":
			state.operation = add(n);
			state.memory = add;
			break;
		case "sub":
			state.operation = sub(n);
			state.memory = sub;
			break;
		case "mul":
			state.operation = mul(n);
			state.memory = mul;
			break;
		case "div":
			state.operation = div(n);
			state.memory = div;
			break;
	}
}

document.querySelector('#input').value = state.initialState;

(function(){
	var nums = document.getElementsByClassName('num')
	for (i =0;i < nums.length; i++){
		nums[i].addEventListener('click',function(){
			state.val += event.target.value;
			document.querySelector('#input').value = Number(state.val)
		})
	}//should use map
})();

(function op(){
	var ops = document.getElementsByClassName('operation')
	for (i=0;i<ops.length; i++){
		ops[i].addEventListener('click',function(){
			if (!state.operation && state.val){ 
				operations(event.target.id,Number(state.val));
				state.total = state.val;
				state.val = '';
				document.querySelector('#input').value = Number(state.total);
			}
			else if (state.operation && !state.val){
				operations(event.target.id,Number(state.total));
			}
			else if (state.operation && state.val){
				state.total = state.operation(Number(state.val));
				state.val = '';
				operations(event.target.id,Number(state.total));
				document.querySelector('#input').value = Number(state.total);
			}
			else if(!state.operation && !state.val && state.total){
				operations(event.target.id,Number(state.total));
			}
		});
	}
})();

function equals(){

	if (state.val){
		state.total = state.operation(Number(state.val));
		state.memory = state.memory(Number(state.val));
		state.val = '';
		state.operation = '';
		document.querySelector('#input').value = Number(state.total);
	}
	else {
		state.total = state.memory(Number(state.total));
		state.val = '';
		document.querySelector('#input').value = Number(state.total);
	}
}

function clearAll(){
	state = {
		initialState: 0,
		total: 0,
		val: '',
		operation: '',
		memory: ''
	}
}

function clearOne(x){
	var data = x.split("");
	var deleted = data.slice(0,data.length -1)
	return deleted.join("")
}

document.getElementById('eq').addEventListener('click',equals)
document.getElementById('clear').addEventListener('click',function(){
	clearAll();
	document.querySelector('#input').value = state.initialState;
})

document.getElementById('delete').addEventListener('click',function(){
	state.val = clearOne(state.val)
	document.querySelector('#input').value = state.val || 0;
})





