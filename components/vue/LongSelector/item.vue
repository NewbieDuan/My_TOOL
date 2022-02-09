<template>
	<div
		:class="{ 'long-selector-item': true, selected: selectedFn() }"
		:title="labelShow(source)"
		@click="itemclick"
	>
		{{ labelShow(source) }}
	</div>
</template>
<script>
export default {
	props: {
		index: {
			type: Number
		},
		source: {
			type: Object,
			default() {
				return {};
			}
		},
		labelKey: {
			type: String,
			default: 'label'
		},
		valueKey: {
			type: String,
			default: 'value'
		},
		labelShow: {
			type: Function,
			default(item) {
				return `${item[this.labelKey]}`;
			}
		},
		selectedValue: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	data() {
		return {};
	},
	methods: {
		itemclick() {
			this.$parent.$parent.$emit('item-click', this.source);
		},
		selectedFn() {
			return this.selectedValue.includes(this.source[this.valueKey]);
		}
	}
};
</script>
<style scoped></style>
