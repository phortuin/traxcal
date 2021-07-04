<script>
	import { onMount } from 'svelte'

	export let stuff = 'Waiting for something'

	onMount(async () => {
		stuff = await fetch(`/api/get_stuff`)
			.then(response => response.json())
			.then(data => {
				return data.reduce((string, item) => {
					string += `${item.id} - ${item.food}`
					return string
				}, '')
			})
	})
</script>

<article>
	{ stuff }
</article>
