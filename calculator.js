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
			break;
		case "sub":
			state.operation = sub(n);
			break;
		case "mul":
			state.operation = mul(n);
			break;
		case "div":
			state.operation = div(n);
			break;
	}
}

document.querySelector('#input').value = state.initialState;

(function(){
	var nums = document.getElementsByClassName('num')
	for (i =0;i < nums.length; i++){
		nums[i].addEventListener('click',function(){
			state.val += event.target.value;
			document.querySelector('#input').value = state.val
		})
	}//should use map
})();

(function (){
	var ops = document.getElementsByClassName('operation')
	for (i=0;i<ops.length; i++){
		ops[i].addEventListener('click',function(){
			if (!state.operation && state.val){
				operations(event.target.id,Number(state.val));
				state.total = state.val;
				state.val = '';
				document.querySelector('#input').value = state.total;
			}
			else if (state.operation && !state.val){
				operations(event.target.id,Number(state.total));
			}
			else if (state.operation && state.val){
				state.total = state.operation(Number(state.val));
				state.val = '';
				operations(event.target.id,Number(state.total));
				document.querySelector('#input').value = state.total;
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
		state.val = '';
		state.memory = state.operation
		state.operation = '';
		document.querySelector('#input').value = state.total;
	}
	else {
		state.total = state.memory(Number(state.total));
		state.val = '';
		document.querySelector('#input').value = state.total;
	}
}


document.getElementById('eq').addEventListener('click',equals)



