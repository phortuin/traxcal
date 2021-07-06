<script>
	import { onMount } from 'svelte'

	export let stuff = 'Waiting for something'
	export let data_ = []
	export let portions_ = []
	export let foods_ = []
	export let goal = 3500

	onMount(async () => {
		stuff = await fetch(`/api/read_diary`)
			.then(response => response.json())
			.then(data => {
				portions_ = data.portions
				foods_ = data.foods
				data_ = data.diary.reduce((calories, item) => {
					return [ ...calories, item.size / 100 * item.calories ]
				}, [])
				return data.diary.reduce((string, item) => {
					const numbers = portionNumbers(item)
					string += `${item.portion}: ${numbers.calories}cal, ${numbers.carb}c, ${numbers.protein}p, ${numbers.fat}f <form class="inline" method="post" action="/api/diary"><input type="hidden" name="_method" value="delete"><input type="hidden" name="id" value="${item.diary_id}"><button>delete</button></form><br>`
					return string
				}, '')
			})
			.catch(console.log)
		})

	function portionNumbers({ size, calories, carb, protein, fat }) {
		const portionSize = size / 100
		return {
			calories: Math.ceil(portionSize * calories),
			carb: Math.ceil(portionSize * carb),
			protein: Math.ceil(portionSize * protein),
			fat: Math.ceil(portionSize * fat),
		}
	}

	$: totalCals = Math.ceil(data_.reduce((total, calories) => total + calories, 0))
	$: towardGoal = Math.ceil(100 * totalCals / goal) + '%'

	async function handleSubmit(event) {
		const form = event.target
		const method = form.method
		const action = form.action
		const response = await fetch(action,
		{
		    method,
		    body: form.portion.value
		});
		if (response.ok) {
			window.location.reload()
		} else {
			alert('Something wrong :(')
			response.json()
				.then(console.log)
		}
	}

	async function handlePortionSubmit(event) {
		const form = event.target
		const action = form.action
		const method = form.method
		const response = await fetch(action,
		{
			method,
			body: JSON.stringify({
				portion: form.portion.value,
				size: form.size.value,
				food_id: form.food_id.value,
			})
		})
		if (response.ok) {
			window.location.reload()
		} else {
			alert('NOOO')
			response.json()
				.then(console.log)
		}
	}

	async function handleFoodSubmit(event) {
		const form = event.target
		const action = form.action
		const method = form.method
		const response = await fetch(action,
		{
			method,
			body: JSON.stringify({
				food: form.food.value,
				calories: form.calories.value,
				carb: form.carb.value,
				protein: form.protein.value,
				fat: form.fat.value,
			})
		})
		if (response.ok) {
			window.location.reload()
		} else {
			alert('AW SHUCKS')
			response.json()
				.then(console.log)
		}
	}
</script>

<article>
	{@html stuff }
	Total cals (have to get { goal }): { totalCals }, complete: { towardGoal }

	<h2>New item in diary</h2>
	<form method="post"
		action="/api/diary"
		on:submit|preventDefault={ handleSubmit }>

		<label for="portion">Add portion to today</label>
		<input list="portions" id="portion" name="portion" />

		<datalist id="portions">
			{#each portions_ as portion}
		    <option value="{ portion.id }">{ portion.portion } ({ portion.size }g)</option>
		    {/each}
		</datalist>
		<button>add portion</button>
	</form>

	<h2>New portion</h2>

	<form method="post"
		action="/api/create_portion"
		on:submit|preventDefault={ handlePortionSubmit }>
		<label>Portion description</label>
		<input type="text" name="portion">
		<label>Portion size (gram)</label>
		<input type="number" name="size">
		<label>Food</label>
		<input list="foods" name="food_id">
		<datalist id="foods">
			{#each foods_ as food}
			<option value="{ food.id }">{ food.food }</option>
			{/each}
		</datalist>
		<button>create portion</button>
	</form>

	<h2>New food</h2>

	<form method="post"
		action="/api/create_food"
		on:submit|preventDefault={ handleFoodSubmit }>
		<label>Food description</label>
		<input type="text" name="food">
		<label>Calories</label>
		<input type="number" name="calories">
		<label>Carbs (g)</label>
		<input type="number" name="carb" step="0.1">
		<label>Protein (g)</label>
		<input type="number" name="protein" step="0.1">
		<label>Fat (g)</label>
		<input type="number" name="fat" step="0.1">
		<button>create food</button>
	</form>
</article>
