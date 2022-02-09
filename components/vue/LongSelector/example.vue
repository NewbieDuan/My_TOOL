<template>
	<div>
		<long-selector
			style="width: 200px;"
			:data="items"
			value-key="code"
			label-key="name"
			value="unique_1"
			placeholder="placeholder1111"
			v-model="aa"
			:labelShow="(item) => `${item.code} ${item.name}`"
		/>
		<long-selector
			style="width: 200px;"
			:data="items"
			value-key="code"
			label-key="name"
			value="unique_1"
			filterable
			clearable
			placeholder="placeholder"
			:labelShow="(item) => `${item.code} ${item.name}`"
		/>
		<long-selector
			style="width: 300px;"
			:data="items"
			v-model="bb"
			value-key="code"
			label-key="name"
			multiple
			placeholder="placeholder"
			filterable
			clearable
			:labelShow="(item) => `${item.code} ${item.name}`"
			is-show-all
		/>
	</div>
</template>
<script>
import LongSelector from '@/components/LongSelector/LongSelector.vue';
let items = [];
for (var i = 0; i < 30000; i++) {
	items.push({ code: 'unique_' + i, name: 'unique_' + i });
}

export default {
	components: { 'long-selector': LongSelector },
	data() {
		return {
			aa: '',
			bb: [],
			items
		};
	}
};
</script>
