define(['../../../../lib/configBase/ConfigBase'], function(ConfigBase) {
    // var CONFIG = [
    //     {
    //         fieldId: 'width',
    //         label: window.lanto.$i18n('static_components_cardPlugin_Bar_config_config_js_1'),
    //         value: 400,
    //         type: 'input',
    //         unit: 'px',
    //         rules: [
    //             {
    //                 required: true,
    //                 message: window.lanto.$i18n('static_components_cardPlugin_Bar_config_config_js_2')
    //             },
    //             {
    //                 min: 30,
    //                 max: 2560,
    //                 message: window.lanto.$i18n('static_components_cardPlugin_Bar_config_config_js_3')
    //             }
    //         ]
    //     },
    //     {
    //         fieldId: 'height',
    //         label: window.lanto.$i18n('static_components_cardPlugin_Bar_config_config_js_4'),
    //         value: 300,
    //         type: 'input',
    //         unit: 'px',
    //         rules: [
    //             {
    //                 required: true,
    //                 message: window.lanto.$i18n('static_components_cardPlugin_Bar_config_config_js_2')
    //             },
    //             {
    //                 min: 30,
    //                 max: 1440,
    //                 message: window.lanto.$i18n('static_components_cardPlugin_Bar_config_config_js_5')
    //             }
    //         ]
    //     },
    //     {
    //         fieldId: 'backgroundColor',
    //         label: window.lanto.$i18n('static_components_cardPlugin_Bar_config_config_js_6'),
    //         value: '#ffffff',
    //         type: 'color'
    //     },
    //     {
    //         fieldId: 'paddingTop',
    //         label: window.lanto.$i18n('static_components_cardPlugin_Bar_config_config_js_7'),
    //         value: 0,
    //         type: 'input'
    //     },
    //     {
    //         fieldId: 'paddingRight',
    //         label: window.lanto.$i18n('static_components_cardPlugin_Bar_config_config_js_8'),
    //         value: 0,
    //         type: 'input'
    //     },
    //     {
    //         fieldId: 'paddingBottom',
    //         label: window.lanto.$i18n('static_components_cardPlugin_Bar_config_config_js_9'),
    //         value: 0,
    //         type: 'input'
    //     },
    //     {
    //         fieldId: 'paddingLeft',
    //         label: window.lanto.$i18n('static_components_cardPlugin_Bar_config_config_js_10'),
    //         value: 0,
    //         type: 'input'
    //     },
    //     {
    //         fieldId: 'border',
    //         label: window.lanto.$i18n('static_components_cardPlugin_Bar_config_config_js_11'),
    //         type: 'border',
    //         value: '1px solid #000000',
    //         options: {
    //             color: '#000000',
    //             borderWidth: 1,
    //             style: 'solid'
    //         }
    //     }
    // ]
    const mapRangeConfig = [
        {
            fieldId: 'range',
            value: '',
            label: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_154'),
            type: 'group',
            children: [
                {
                    fieldId: 'visualMap.show',
                    label: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_26'),
                    value: true,
                    type: 'switch',
                    options: { activeText: '', activeValue: true, inactiveText: '', inactiveValue: false }
                },
                {
                    fieldId: 'visualMap.min',
                    label: window.lanto.$i18n('static_components_cardPlugin_distributionMap_config_config_js_26'),
                    value: 0,
                    type: 'inputNumber',
                    options: { min: -Infinity, max: Infinity },
                    rules: [
                        { type: 'integer' },
                        {
                            required: true,
                            message: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_2')
                        }
                    ]
                },
                {
                    fieldId: 'visualMap.max',
                    label: window.lanto.$i18n('static_components_cardPlugin_distributionMap_config_config_js_27'),
                    value: 10000,
                    options: { min: -Infinity, max: Infinity },
                    type: 'inputNumber',
                    rules: [
                        { type: 'integer' },
                        {
                            required: true,
                            message: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_2')
                        }
                    ]
                },
                {
                    fieldId: 'visualMap.inRange.color.0',
                    label: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_157'),
                    value: '#E0FFFF',
                    type: 'color?type=pure'
                },
                {
                    fieldId: 'visualMap.inRange.color.1',
                    label: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_158'),
                    value: '#00AC2B',
                    type: 'color?type=pure'
                },
                {
                    fieldId: 'visualMap.text.1',
                    label: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_159'),
                    value: 'Low',
                    type: 'input',
                    rules: [
                        { type: 'string' },
                        {
                            min: 0,
                            max: 64,
                            message: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_145')
                        }
                    ]
                },
                {
                    fieldId: 'visualMap.text.0',
                    label: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_160'),
                    value: 'High',
                    type: 'input',
                    rules: [
                        { type: 'string' },
                        {
                            min: 0,
                            max: 64,
                            message: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_145')
                        }
                    ]
                },
                {
                    fieldId: 'visualMap.textStyle.color',
                    label: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_103'),
                    value: '#1b1b1b',
                    type: 'color?type=pure'
                },
                {
                    fieldId: 'visualMap.textStyle.fontSize',
                    label: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_46'),
                    value: '12',
                    type: 'inputNumber',
                    options: { max: 256, min: 10 },
                    unit: 'px',
                    rules: [
                        {
                            required: true,
                            message: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_2')
                        },
                        { type: 'integer' },
                        {
                            type: 'number',
                            message: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_6')
                        }
                    ]
                },
                {
                    fieldId: 'visualMap.textStyle.fontFamily',
                    label: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_45'),
                    value: 'sans-serif',
                    type: 'select',
                    options: [
                        { value: 'sans-serif', label: 'sans-serif' },
                        { value: 'monospace', label: 'monospace' },
                        { value: 'Arial', label: 'Arial' },
                        { value: 'Courier New', label: 'Courier New' },
                        { value: 'Microsoft YaHei', label: 'Microsoft YaHei' }
                    ]
                },
                {
                    fieldId: 'visualMap.textStyle.fontStyle',
                    label: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_161'),
                    value: 'normal',
                    type: 'select',
                    options: [
                        {
                            value: 'normal',
                            label: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_17')
                        },
                        {
                            value: 'italic',
                            label: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_24')
                        }
                    ]
                },
                {
                    fieldId: 'visualMap.textStyle.fontWeight',
                    label: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_43'),
                    value: 'normal',
                    type: 'select',
                    options: [
                        {
                            value: 'normal',
                            label: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_41')
                        },
                        {
                            value: 'bold',
                            label: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_18')
                        }
                    ]
                }
            ]
        }
    ] // required: true, // required: true,
    const mapSeriesConfig = [
        {
            fieldId: 'series[@].itemStyle.normal.label.show',
            label: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_38'),
            value: true,
            type: 'switch',
            options: { activeText: '', activeValue: true, inactiveText: '', inactiveValue: false }
        },
        {
            fieldId: 'series[@].itemStyle.normal.label.textStyle.color',
            label: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_40'),
            value: 'rgba(54,56,60,1)',
            type: 'color?type=pure'
        },
        {
            fieldId: 'series[@].itemStyle.normal.label.textStyle.fontStyle',
            label: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_23'),
            value: 'normal',
            type: 'select',
            options: [
                {
                    value: 'normal',
                    label: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_41')
                },
                {
                    value: 'italic',
                    label: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_24')
                }
            ]
        },
        {
            fieldId: 'series[@].itemStyle.normal.label.textStyle.fontWeight',
            label: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_43'),
            value: 'normal',
            type: 'select',
            options: [
                {
                    value: 'normal',
                    label: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_17')
                },
                { value: 'bold', label: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_18') }
            ]
        },
        {
            fieldId: 'series[@].itemStyle.normal.label.textStyle.fontFamily',
            label: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_45'),
            value: 'sans-serif',
            type: 'select',
            options: [
                { value: 'sans-serif', label: 'sans-serif' },
                { value: 'monospace', label: 'monospace' },
                { value: 'Arial', label: 'Arial' },
                { value: 'Courier New', label: 'Courier New' },
                { value: 'Microsoft YaHei', label: 'Microsoft YaHei' }
            ]
        },
        {
            fieldId: 'series[@].itemStyle.normal.label.textStyle.fontSize',
            label: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_46'),
            value: '12',
            type: 'inputNumber',
            unit: 'px',
            options: { max: 256, min: 10 },
            rules: [
                {
                    required: true,
                    message: window.lanto.$i18n('static_components_plugin_LtCardView_config_config_js_2')
                }
            ]
        }
    ]
    const mapCommonConfig = [
        {
            fieldId: 'common',
            value: '',
            label: window.lanto.$i18n('dist_static_components_plugin_LtCardView_i18n_zh_js_94'),
            type: 'group',
            children: [
                {
                    fieldId: 'series[0]._region',
                    label: window.lanto.$i18n(
                        'src_components_home_business_card_editorsContainer_featureDialog_vue_32'
                    ),
                    value: window.lanto.$i18n(
                        'src_components_home_business_card_editorsContainer_featureDialog_vue_33'
                    ),
                    type: 'select',
                    options: [
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_33'
                            ),
                            value: '中国'
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_34'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_34'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_35'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_35'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_36'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_36'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_37'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_37'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_38'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_38'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_39'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_39'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_40'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_40'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_41'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_41'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_42'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_42'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_43'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_43'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_44'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_44'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_45'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_45'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_46'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_46'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_47'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_47'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_48'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_48'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_49'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_49'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_50'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_50'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_51'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_51'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_52'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_52'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_53'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_53'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_54'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_54'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_55'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_55'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_56'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_56'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_57'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_57'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_58'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_58'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_59'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_59'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_60'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_60'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_61'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_61'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_62'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_62'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_63'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_63'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_64'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_64'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_65'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_65'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_66'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_66'
                            )
                        },
                        {
                            label: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_67'
                            ),
                            value: window.lanto.$i18n(
                                'src_components_home_business_card_editorsContainer_featureDialog_vue_67'
                            )
                        }
                    ]
                }
            ]
        }
    ]
    return ConfigBase.extend({
        init: function() {
            this._super()
            this.name = window.lanto.$i18n('static_components_cardPlugin_distributionMap_config_config_js_1')
            this.type = 'distributionMap'
            this.group = 'card'
            this.rules = [{ dimension: { count: 1, operator: 'eq', axis: 'y' }, measure: { count: 1, operator: 'eq' } }]
            this.mergeConfig = {
                commonConfig: [].concat([], this.chartsCommonConfig, mapCommonConfig, mapRangeConfig),
                seriesConfig: [].concat([], mapSeriesConfig),
                paddingConfig: []
            }
        },
        // configProvider: function() {
        //     return {
        //         common: CONFIG.reduce(function(o, c) {
        //             o[c.fieldId] = c.value
        //             return o
        //         }, {})
        //     }
        // },
        // configForSettingProvider: function() {
        //     return _.filter(CONFIG, function(field) {
        //         return field.fieldId !== 'width' || field.fieldId !== 'height'
        //     })
        // },
        // menuSettingProvider(plugin) {
        //     var menus = this._super.apply(this, arguments)
        //     menus = menus.filter(function(n) {
        //         return n.name !== 'copy'
        //     })
        //     if (plugin.config.comment.state) {
        //         menus.push(
        //             {
        //                 name: window.lanto.$i18n('static_components_cardPlugin_Bar_config_config_js_13'),
        //                 handler: function() {}
        //             },
        //             {
        //                 name: window.lanto.$i18n('static_components_cardPlugin_Bar_config_config_js_14'),
        //                 handler: function(evt, inst, api) {
        //                     api.setConfig({ comment: { state: false, content: '' } })
        //                 }
        //             }
        //         )
        //     } else {
        //         menus.push({
        //             name: window.lanto.$i18n('static_components_cardPlugin_Bar_config_config_js_15'),
        //             handler: function(evt, inst, api) {
        //                 api.setConfig({
        //                     comment: {
        //                         state: true,
        //                         content: 'xx'
        //                     }
        //                 })
        //             }
        //         })
        //     }
        //     return menus
        // }, //推荐权重
        weight() {
            let [initWeight, wd] = [0, this.countWD()] //初始化权重 为0 不推荐 , 获取维度度量个数
            let w = wd.dimension
            let d = wd.measure
            if (!w.length || !d.length) return 0
            if (w.length && d.length && w.length === 1 && d.length === 1) {
                initWeight++
                if (w.axis === 'y' && d.length === 1) {
                    initWeight++
                }
            }
            return initWeight
        },
        weigthDescription: '1个维度, 1个度量',
        supportLegend() {
            return { isSupport: false, isDimension: false, isPie: false, isMeasure: false, isSingle: false }
        },
        editAbility() {
            return { player: false, order: false }
        }
    })
})
