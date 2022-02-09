<template>
	<div class="long-selector" :title="title">
		<el-input
			v-popover:selectorPopover
			v-if="!multiple"
			:placeholder="placeholderLabel"
			v-model="showLabel"
			:readonly="!filterable"
			@focus="handleFocus"
			@input="handleInput"
			@mouseenter.native="inputHovering = true"
			@mouseleave.native="inputHovering = false"
			size="small"
		>
			<template slot="suffix">
				<i
					v-show="!(clearable && inputHovering && selectedValue.length)"
					:class="'el-icon-arrow-down el-input__icon ' + (popoverVisiable ? 'is-reverse' : '')"
				></i>
				<i
					v-if="clearable && inputHovering && selectedValue.length"
					class="el-icon-circle-close el-input__icon"
					@click="clear"
				></i>
			</template>
		</el-input>
		<div
			v-else
			v-popover:selectorPopover
			:class="'long-selector-multiple' + (popoverVisiable ? ' focus' : '')"
			@mouseenter="inputHovering = true"
			@mouseleave="inputHovering = false"
		>
			<span v-if="selectedItem.length" class="long-selector-multiple_tag">
				<el-tag size="mini" closable type="info" @close="closeTag">
					{{ isAllSelected ? '全选' : labelShow(selectedItem[0]) }}
				</el-tag>
				<el-tag v-if="selectedItem.length > 1" size="mini" type="info" style="margin-left: 5px;">
					+{{ selectedItem.length - 1 }}
				</el-tag>
			</span>
			<input
				class="long-selector-multiple_input"
				v-model="showLabel"
				:readonly="!filterable || !popoverVisiable"
				:placeholder="!selectedValue.length ? placeholder : ''"
				@input="handleInput"
			/>
			<div class="long-selector-multiple_icon">
				<i
					v-show="!(clearable && inputHovering && selectedValue.length)"
					:class="'el-icon-arrow-down el-input__icon ' + (popoverVisiable ? 'is-reverse' : '')"
				></i>
				<i
					v-if="clearable && inputHovering && selectedValue.length"
					class="el-icon-circle-close el-input__icon"
					@click="clear"
				></i>
			</div>
		</div>
		<el-popover
			ref="selectorPopover"
			v-model="popoverVisiable"
			popper-class="long-selector-popover"
			placement="bottom-start"
			trigger="click"
			@show="popoverShow"
			@hide="popoverHide"
		>
			<div
				v-if="isShowAll && showList && showList.length"
				:class="{ 'long-selector-item': true, selected: isAllSelected }"
				@click="all_itemClick"
			>
				全选
			</div>
			<div v-if="!(showList && showList.length)" class="empty-text">
				暂无数据
			</div>
			<virtual-list
				ref="virtualList"
				:class="{ 'is-multiple': multiple, 'item-list': true, disabled: isAllSelected }"
				:data-key="valueKey"
				:data-sources="showList"
				:data-component="itemComponent"
				:extra-props="{ labelShow, valueKey, labelKey, selectedValue }"
				@item-click="itemClick"
				:style="{ minWidth: minWidth }"
			/>
		</el-popover>
	</div>
</template>
<script>
import VirtualList from 'vue-virtual-scroll-list';
import item from './item.vue';

function _broadcast(componentName, eventName, params) {
	this.$children.forEach(function (child) {
		var name = child.$options.componentName;

		if (name === componentName) {
			child.$emit.apply(child, [eventName].concat(params));
		} else {
			_broadcast.apply(child, [componentName, eventName].concat([params]));
		}
	});
}

export default {
	name: 'LongSelector',
	components: { 'virtual-list': VirtualList },
	props: {
		placeholder: String,
		data: {
			type: Array,
			default() {
				return [];
			}
		},
		value: {
			type: [String, Array]
		},
		placeholder: String,
		title: String,
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
		multiple: Boolean,
		isShowAll: Boolean,
		filterable: Boolean,
		clearable: Boolean
	},

	data() {
		return {
			itemComponent: item, //单选项组件
			popoverVisiable: false, //下拉显隐
			showList: [], //下拉具体展示列表
			showLabel: '', //展示值
			selectedValue: [], //选中值
			selectedItem: [], //选中的item
			isAllSelected: false, //是否全选
			placeholderLabel: '', // input中placeholder具体展示值
			inputHovering: false, // 悬浮状态
			minWidth: '150px'
		};
	},
	computed: {
		// 单选时input展示内容
		singleShowLabel() {
			if (this.multiple) {
				return '';
			}
			if (this.selectedValue.length) return this.labelShow(this.selectedItem[0]);
		}
	},
	mounted() {
		this.minWidth = this.$el.getBoundingClientRect().width + 'px';
	},
	watch: {
		data: {
			immediate: true,
			handler(newVal) {
				this.showList = newVal || [];
			}
		},
		value: {
			immediate: true,
			handler(newVal) {
				if (newVal === void 0 || newVal === '' || !newVal.length) {
					this.clear();
					return;
				}
				this.selectedValue = !this.multiple ? [newVal] : newVal;
				this.isAllSelected = this.multiple && this.selectedValue.includes('全选') ? true : false;
				this.$nextTick(() => {
					this.selectedItem = this.selectedValue.map((val) => {
						return this.data.find((item) => item[this.valueKey] === val);
					});
					if (!this.multiple) {
						this.showLabel = this.labelShow(this.selectedItem[0]);
					}
				});
				this.dispatch('ElFormItem', 'el.form.change', newVal);
			}
		}
	},
	methods: {
		// item 点击时间
		itemClick(item) {
			let val = item[this.valueKey];
			let index = this.selectedValue.indexOf(val);
			if (!this.multiple) {
				if (index > -1) {
					this.selectedValue = [];
					this.selectedItem = [];
					this.showLabel = '';
				} else {
					this.selectedValue = [val];
					this.selectedItem = [item];
					this.showLabel = this.labelShow(item);
					this.isitemclick = true;
				}
				this.popoverVisiable = false;
				return;
			}

			if (index > -1) {
				this.selectedValue.splice(index, 1);
				this.selectedItem.splice(index, 1);
			} else {
				this.selectedValue.push(val);
				this.selectedItem.push(item);
			}
		},
		// 全选的点击事件
		all_itemClick() {
			if (!this.isAllSelected) {
				this.selectedValue = ['全选'];
				this.selectedItem = [{ [this.valueKey]: '全选', [this.labelKey]: '全选' }];
			} else {
				this.selectedValue = [];
				this.selectedItem = [];
			}
			this.isAllSelected = !this.isAllSelected;
		},

		//多选 tag close事件
		closeTag() {
			let findItem = this.selectedItem[0];
			if (this.isAllSelected) {
				this.all_itemClick();
			} else {
				this.itemClick(findItem);
			}
		},

		//单选 input fouce事件
		handleFocus() {
			this.placeholderLabel = this.singleShowLabel || this.placeholder;
			if (this.filterable) {
				this.showLabel = '';
			}
		},
		//input 搜索 防抖
		handleInput() {
			if (this.timer) {
				clearTimeout(this.timer);
				this.timer = null;
			}
			this.timer = setTimeout(() => {
				this.filterList(this.showLabel);
			}, 200);
		},
		// 对数据进行搜索过滤
		filterList(val) {
			this.showList = this.data.filter((item) => {
				return this.labelShow(item).includes(val);
			});
		},
		// 清空
		clear() {
			this.selectedValue = [];
			this.selectedItem = [];
			this.showLabel = '';
			this.placeholderLabel = this.placeholder;
			this.isAllSelected = false;
		},
		// 显示popover事件重置列表
		popoverShow() {
			this.$refs.virtualList.reset();
		},
		// 隐藏popover事件重置
		popoverHide() {
			this.showList = this.data || [];
			if (this.multiple) {
				this.showLabel = '';
				this.$emit('input', this.selectedValue);
				this.$emit('change', this.selectedValue);
			} else {
				this.showLabel = this.singleShowLabel;
				let val = this.selectedValue.length ? this.selectedValue[0] : '';
				this.$emit('input', val);
				this.$emit('change', val);
			}
		},

		// element-ui触发formItem相关方法
		dispatch: function dispatch(componentName, eventName, params) {
			var parent = this.$parent || this.$root;
			var name = parent.$options.componentName;

			while (parent && (!name || name !== componentName)) {
				parent = parent.$parent;

				if (parent) {
					name = parent.$options.componentName;
				}
			}
			if (parent) {
				parent.$emit.apply(parent, [eventName].concat(params));
			}
		},
		broadcast: function broadcast(componentName, eventName, params) {
			_broadcast.call(this, componentName, eventName, params);
		}
	}
};
</script>
<style lang="scss">
.long-selector {
	display: inline-block;
	width: 100%;
	.el-icon-arrow-down {
		color: #c0c4cc;
		font-size: 14px;
		transition: transform 0.3s;
		transform: rotate(0);
		cursor: pointer;
	}
	.el-icon-circle-close {
		color: #c0c4cc;
	}
	.el-icon-arrow-down.is-reverse {
		transform: rotate(180deg);
	}
	.el-tag__close.el-icon-close {
		background-color: #c0c4cc;
	}
	.long-selector-multiple {
		background-color: #fff;
		border-radius: 4px;
		border: 1px solid #dcdfe6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		padding: 0 5px 0 15px;
		height: 32px;
		width: 100%;
	}
	.long-selector-multiple.focus {
		border-color: #7e3689;
	}
	.long-selector-multiple_tag {
		display: flex;
		flex-wrap: nowrap;
		transform: translateX(-10px);
	}
	.long-selector-multiple_input {
		border: none;
		outline: none;
		font-size: 13px;
		color: #606266;
		background-color: #fff;
		flex: 1;
		width: 10%;
	}
	.long-selector-multiple_input::placeholder {
		color: #c0c4cc;
	}
	.long-selector-multiple_input::-webkit-input-placeholder {
		color: #c0c4cc;
	}
	.long-selector-multiple_icon {
		width: 25px;
	}
}

.long-selector-popover {
	padding: 6px 0;
	.item-list {
		max-height: 360px;
		overflow: auto;
	}
	.item-list.disabled {
		pointer-events: none;
		overflow: hidden;
		opacity: 0.5;
		cursor: not-allowed;
	}
	.empty-text {
		text-align: center;
		color: #999;
		font-size: 14px;
		line-height: 30px;
	}
}
.long-selector-item {
	font-size: 14px;
	padding: 0 20px;
	position: relative;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: #606266;
	height: 34px;
	line-height: 34px;
	box-sizing: border-box;
	cursor: pointer;
}

.long-selector-item:hover {
	background-color: #f5f7fa;
}
.long-selector-item.selected {
	color: #7e3689;
	font-weight: 700;
}
.is-multiple .long-selector-item {
	padding-right: 40px;
}
.is-multiple .long-selector-item.selected::after {
	position: absolute;
	right: 20px;
	font-family: element-icons;
	content: '\e6da';
	font-size: 12px;
	font-weight: 700;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.el-form-item.is-error .long-selector .long-selector-multiple {
	border-color: #f56c6c;
}
</style>
