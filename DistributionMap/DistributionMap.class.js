define(['lib/echartBase/ChartBase', 'lib/echarts/echarts', './regionMap'], function(ChartBase, echarts, regionMap) {
    const Util = new window.lanto.modules.common_Util()
    const CONFIG = new window.lanto.modules.Common_config()
    const configFlag = CONFIG.common.flag
    const RootLevel = ['北京', '天津', '重庆', '上海', '香港', '台湾', '澳门']
    class distributionMap extends ChartBase {
        constructor(option = {}) {
            super(option)
            this._stackAr = option._stackAr || []
            Object.defineProperty(this, '_stackAr', {
                get() {
                    let option = this.option
                    return (option && option._stackAr) || []
                },
                set(val) {
                    let option = this.option
                    option && (option._stackAr = val)
                }
            })
        }
        getFirstChildNameByIndex(index = 0) {
            let name = this._stackAr[0] || '北京'
            if (index === 0) return name
            let parent = name
            for (var i = 1; i <= index; i++) {
                parent = name
                name = this._stackAr[i]
                if (!name) {
                    name = echarts.getMap(parent).geoJson.features[0].properties.name
                }
            }
            return name
        }
        beforeQuery(ins) {
            let params = ins.initParams || { xAxis: [], yAxis: [] }
            let axis = params.xAxis.concat(params.yAxis)
            let $level = axis.filter(p => p._$type === 'level')[0]
            let $filter = (params.filter || []).filter(p => p.target !== 'map-query')
            if (!$level || $level.children.length < 2) return
            let parent = ''
            for (
                let i = 0, childs = $level.children, len = childs.length - 1;
                i < len && RootLevel.indexOf(parent) < 0;
                i++
            ) {
                // TODO
                let { columnName, flowId, dataType } = childs[i]
                parent = this.getFirstChildNameByIndex(i)
                if (!$filter.some(p => p.condition.field.flowId === flowId)) {
                    $filter.push({
                        $pId: $level.flowId,
                        columnName: columnName,
                        target: 'map-query',
                        condition: {
                            children: [],
                            field: {
                                columnName,
                                flowId,
                                dataType
                            },
                            operator: '1',
                            relation: '1',
                            values: [parent]
                        },
                        dataType: dataType,
                        flowId: flowId + '_isHidden',
                        isHidden: true,
                        type: 'dimension'
                    })
                }
            }
            params.filter = $filter
            ins.requestParams = ins._createParams()
        }
        getColunmnsByName(name, list) {
            let card = this.card
            if (!card) return
            list = list || card.xAxis.concat(card.yAxis)
            for (var i = 0, len = list.length; i < len; i++) {
                if (list[i].columnName === name || list[i].children.map(p => p.columnName).join(configFlag) === name) {
                    return list[i]
                }
            }
        }
        parseStack(data) {
            let _stackAr
            // if ((_stackAr = this._cacheStack)) {
            //     this._cacheStack = null
            //     return _stackAr
            // }
            if (!data.rs || !data.rs.value) return this._stackAr
            let values = (data.rs && data.rs.value) || []
            let _vs = values[0]
            if (!_vs) return []
            let cols = _vs.map(name => this.getColunmnsByName(name)).filter(p => p._$type === 'level')
            if (cols.length !== 1) return [] // TODO 地图现只支持一个维度分组
            let $levelNames = cols[0].children.map(p => p.columnName).join(configFlag)
            let index = _vs.indexOf($levelNames)
            if (isNaN(index) || index < 0) return []
            _stackAr = values[1][index].split(configFlag).slice(0, cols[0].children.length - 1)
            if (
                _stackAr.length < this._stackAr.length &&
                values.some(p => p[index] === this._stackAr.join(configFlag))
            ) {
                _stackAr = this._stackAr.slice(0, _stackAr.length)
            }
            let stackStr = _stackAr.join(configFlag)
            if (values.slice(1).some(p => p[index].indexOf(stackStr) < 0)) {
                if (!this._stackAr.length) {
                    _stackAr = ['北京']
                } else {
                    _stackAr = this._stackAr.slice(0, _stackAr.length)
                }
            }
            //mod by halvee.L 1-14 修改问题 直辖市需要处理
            if (_stackAr.length && RootLevel.indexOf(_stackAr[0]) > -1) {
                _stackAr = [_stackAr[0]]
            }
            return _stackAr
        }
        setDataSource(data = this.chartsCacheData, card = {}, type) {
            this._stackAr = this.parseStack(data)
            this._setFormatter(card)
            let option = this.option
            let series = option && option.series[0]
            let region = option.series[0]._region
            let superFn = super.setDataSource
            // option && (option._stackAr = this._stackAr.slice())
            let that = this
            delete series.center
            let fn = cur => {
                let regionName = 'China'
                that._mapRegion = []
                that._fillData = []
                cur.features.forEach(v => {
                    regionName = v.properties.name
                    that._mapRegion.push(v.properties.name)
                    for (let key in regionMap) {
                        if (key === v.properties.name) {
                            regionName = regionMap[key]
                            break
                        }
                    }
                    let fillData = { name: regionName, value: 0 }
                    that._fillData.push(fillData)
                })
                that._fillData.push({
                    name: window.lanto.$i18n('DistributionMap:plugins_DistributionMap_cities_config_js_456'),
                    value: 0
                })
                that.convertData(data, card)
                let area = !_.isEmpty(that._stackAr) ? that._stackAr.slice(-1)[0] : _region
                if (area !== 'China') {
                    for (let key in regionMap) {
                        if (regionMap[key] === area) {
                            area = key
                            break
                        }
                    }
                }
                series.mapType = area
                superFn.call(that, data, card, type)
            }
            let [cur, curMap] = ['China', {}]
            let curR = 'China'
            let handlerGeo = geo => {
                if (option && !_.isEmpty(that._stackAr)) {
                    let l = that._stackAr.length
                    for (let i = 0; i < l; i++) {
                        curR = that._stackAr[i]
                        for (let key in regionMap) {
                            if (key === curR || regionMap[key] === curR) {
                                curR = key
                                break
                            }
                        }
                        curMap = echarts.getMap(curR)
                        if (!curMap) {
                            cur = geo.features.filter(v => v.properties.name === curR)[0]
                            if (cur) {
                                if (series.mapType === that._stackAr[i]) {
                                    that.loadJson(cur.id || cur.properties.id, series.mapType, fn)
                                } else {
                                    if (i === l - 1) {
                                        that.loadJson(cur.id || cur.properties.id, curR, fn)
                                    } else {
                                        that.loadJson(cur.id || cur.properties.id, curR, handlerGeo)
                                    }
                                }
                                break
                            }
                        } else {
                            if (i === l - 1) {
                                fn(curMap.geoJson)
                            } else {
                                geo = curMap.geoJson
                            }
                        }
                    }
                } else if (series._region) {
                    if (region === '中国') {
                        series.mapType = 'China'
                        fn(geo)
                    } else {
                        curMap = echarts.getMap(series._region)
                        if (!curMap) {
                            cur = geo.features.filter(v => v.properties.name === series._region)[0]
                            that.loadJson(cur.id || cur.properties.id, cur.properties.name, fn)
                        } else {
                            fn(curMap.geoJson)
                        }
                    }
                }
            }
            let _region = region === '中国' ? 'China' : region
            let initMap = echarts.getMap(_region)
            let value = data.rs && data.rs.value
            if (!_.isEmpty(value)) {
                let dimen = value[0][0] || ''
                if (dimen.indexOf(configFlag) > -1 && _.isEmpty(that._stackAr)) {
                    that._stackAr = [window.lanto.$i18n('DistributionMap:lib_pluginSchema_js_170')]
                }
            }
            if (!initMap) {
                this.loadJson('China', 'China', handlerGeo)
            } else {
                handlerGeo(initMap.geoJson)
            }
            //window.echartsMap = echartsMap
            // let that = this
            //let region = this.getDrillParams(data)
            // let mapType = series.mapType
            //  let cur = echarts.getMap(mapType)
        }
        setOption(options) {
            let that = this
            let fn = super.setOption
            if (options && options.series) {
                let series = options.series[0]
                // series.center = ['50%', '50%']
                //let nameMap = series.nameMap
                let region = series._region
                let mapType = series.mapType
                for (let key in regionMap) {
                    if (regionMap[key] === region) {
                        region = key
                        break
                    }
                }
                if (!_.isEmpty(that._stackAr)) {
                    super.setOption(options)
                    return
                }
                let handlerFn = geo => {
                    let name = 'China'
                    let t = []
                    //if (geo.cp) {
                    series.center = geo.cp || [108.9236, 34.5408] //[111.8848, 32.0856]
                    // } else {
                    //     delete series.center
                    // }

                    that._mapRegion = []
                    that._fillData = []
                    geo.features.forEach(v => {
                        name = v.properties.name
                        that._mapRegion.push(v.properties.name)
                        for (let key in regionMap) {
                            t.push(v.properties.name)
                            if (key === v.properties.name) {
                                name = regionMap[key]
                            }
                        }
                        let fillData = { name: name, value: 0 }
                        that._fillData.push(fillData)
                    })
                    that._fillData.push({
                        name: window.lanto.$i18n('DistributionMap:plugins_DistributionMap_cities_config_js_456'),
                        value: 0
                    })
                    series.data = series.data = _.uniq(_.union(series.data, that._fillData), 'name')
                    series.mapType = region === '中国' ? 'China' : region
                    fn.call(that, options)
                }
                if (region === '中国') {
                    if (mapType !== 'China') {
                        series.mapType = 'China'
                    }
                    super.setOption(options)
                    return
                }
                let curMap = echarts.getMap(region)
                if (!curMap) {
                    let initMap = echarts.getMap('China')
                    if (!initMap) {
                        super.setOption(options)
                        return
                    }
                    let cur = initMap.geoJson.features.filter(v => v.properties.name === region)[0]
                    that.loadJson(cur.id || cur.properties.id, region, geo => {
                        handlerFn(geo)
                    })
                } else {
                    handlerFn(curMap.geoJson)
                }
                return
            }
            super.setOption(options)
        }
        loadJson(id, name, callback) {
            if (id.length === 4) {
                id += '00'
            }
            // let that = this
            let url = 'static/components/cardPlugin/DistributionMap/geoJson/' + id + '.json'
            $.getJSON(url, geoJson => {
                echarts.registerMap(name, geoJson)
                callback && callback(geoJson)
            })
        }
        convertData(respone = {}, card) {
            let _self = this
            _self._data = []
            _self.maxData = 0

            let data = respone.rs && respone.rs.value && respone.rs.value
            if (!_.isEmpty(data)) {
                data.shift()
                let len = this._mapRegion.length
                for (let i = 0, l = data.length; i < l; i++) {
                    let obj = {}
                    obj.name = data[i][0]
                    obj.value = data[i][1]
                    if (_self.maxData < data[i][1]) {
                        _self.maxData = data[i][1]
                    }
                    let names = obj.name.split(configFlag)
                    if (RootLevel.indexOf(names[0]) > -1) {
                        obj.name = names.slice(0, 2).pop()
                    } else {
                        obj.name = obj.name.split(configFlag).pop()
                    }
                    // if (/-/.test(obj.name)) {
                    //     obj.name = obj.name.slice(obj.name.indexOf('-') + 1, obj.name.length)
                    //     for (let i = 0; i < len; i++) {
                    //         if (this._mapRegion[i].indexOf(obj.name) !== -1) {
                    //             obj.name = this._mapRegion[i]
                    //             break
                    //         }
                    //     }
                    // }
                    _self._data.push(obj)
                }
            }
            _self._echartsMapConvertData()
        }
        getClickDimVal(params, columnName) {
            let option = this.option.baseOption || this.option
            let nameMap = option.series[0].nameMap
            let that = this
            let source = {}
            //add by wt-sf2069 2018-05-18 兼容未知情况下dataset不存在的问题
            //add by wt-sf2069 2018-06-28 添加缓存数据做支撑
            if (option.dataset) {
                source = option.dataset
            } else if (
                !option.dataset &&
                this.chartsCacheData &&
                this.chartsCacheData.rs &&
                this.chartsCacheData.rs.value
            ) {
                source = { dimensions: this.chartsCacheData.rs.value[0] }
            } else {
                return ''
            }
            let area = ['北京', '天津', '重庆', '上海', '香港', '台湾', '澳门']
            if (!that._stackAr) {
                that._stackAr = []
            } else if (that._stackAr.length === 2 || area.indexOf(that._stackAr[0]) !== -1) {
                return ''
            }
            // let defaultVal
            // if (source.source && source.source[0] && params.event.type === 'click') {
            //     for (let key in nameMap) {
            //         if (nameMap[key] === params.name) {
            //             defaultVal = key
            //         }
            //     }
            //     defaultVal = defaultVal || params.name
            //     option._stackAr.push(defaultVal)
            // }

            let name = source.dimensions[0]
            let _name = name.split('-')
            if (_name.length === 1) {
                return params.name
            } else {
                name = source.source[0][0]
                _name = name.split('-')
                _name.splice(_name.length - 1, _name.length - 1, params.name)
                return _name.join('-')
            }
        }
        load(options, parent) {
            let that = this
            let superFn = super.load
            if (options.option && options.option.series) {
                let fn = cur => {
                    let name = 'China'
                    that._mapRegion = []
                    that._fillData = []
                    cur.features.forEach(v => {
                        name = v.properties.name
                        that._mapRegion.push(v.properties.name)
                        for (let key in regionMap) {
                            if (key === v.properties.name) {
                                name = regionMap[key]
                                break
                            }
                        }
                        let fillData = { name: name, value: 0 }
                        that._fillData.push(fillData)
                    })
                    that._fillData.push({
                        name: window.lanto.$i18n('DistributionMap:plugins_DistributionMap_cities_config_js_456'),
                        value: 0
                    })
                    series.data = series.data = _.uniq(_.union(series.data, that._fillData), 'name')
                    series.mapType = region === '中国' ? 'China' : region
                    superFn.call(that, options, parent)
                }

                let series = options.option.series[0]
                let nameMap = series.nameMap
                let region = series._region
                let mapType = series.mapType
                if (!_.isEmpty(that._stackAr) && (region === '中国' || region === 'China')) {
                    super.load(options, parent)
                    return
                }
                for (let key in nameMap) {
                    if (nameMap[key] === region) {
                        region = key
                        break
                    }
                }
                for (let key in regionMap) {
                    if (key === region) {
                        series._region = regionMap[key]
                        break
                    }
                }
                let initMap = echarts.getMap('China')
                let curMap = echarts.getMap(region)
                if (region !== '中国' && initMap) {
                    //delete options.option._stackAr
                    if (!initMap) {
                        that.loadJson('China', 'China', geoJson => {
                            series.mapType = region
                            let cur = geoJson.features.filter(v => {
                                return v.properties.name === region
                            })[0]
                            that.loadJson(cur.id || cur.properties.id, region, fn)
                        })
                    } else if (!curMap) {
                        series.mapType = region
                        let cur = initMap.geoJson.features.filter(v => {
                            return v.properties.name === region
                        })[0]
                        that.loadJson(cur.id || cur.properties.id, region, fn)
                    } else {
                        fn(curMap.geoJson)
                    }
                } else if (initMap && region === '中国' && mapType !== 'China') {
                    fn(initMap.geoJson)
                } else {
                    super.load(options, parent)
                }
                return
            }
            super.load(options, parent)

            //super.load(options, parent)
        }
        parseEventParams(params) {
            let _stackAr = this._stackAr || []
            params.name = [..._stackAr, params.name].join(configFlag)
            return params
        }
        mapLocation(key, axis, series, seriesType, timeline, changeMap, option) {
            if (!option.visualMap) {
                option.visualMap = {
                    // type: 'piecewise',
                    min: 0,
                    max: 10000,
                    inRange: { color: ['#d9edf8', '#6ca3c8'] },
                    text: ['High', 'Low'],
                    calculable: true,
                    show: true,
                    hoverLink: true,
                    textStyle: {
                        color: '#e2e2e2',
                        fontSize: '12',
                        fontFamily: 'sans-serif',
                        fontStyle: 'normal',
                        fontWeight: 'normal'
                    }
                }
            }
            Object.assign(seriesType, {
                selectedMode: 'single',
                showLegendSymbol: false,
                aspectScale: '0.8',
                scaleLimit: { min: 0.3 },
                layoutCenter: ['50%', '50%'],
                roam: true,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            fontSize: 12,
                            align: 'center',
                            textStyle: {
                                color: 'rgba(54,56,60,1)',
                                fontSize: '12',
                                fontStyle: 'normal',
                                fontWeight: 'normal',
                                fontFamily: 'sans-serif'
                            }
                        },
                        areaStyle: { color: '#d3d3d3' }
                    },
                    emphasis: { label: { show: true }, areaStyle: { color: '#fe994e' } }
                }
            })
            axis.main.data.forEach((fitem, fidx) => {
                let name =
                    fitem.children && fitem.children.length
                        ? fitem.children.map(innerItem => innerItem.columnName).join(configFlag)
                        : fitem.columnName
                axis.second.data.forEach((sitem, sidx) => {
                    let serie
                    if (sitem.flowId in changeMap) {
                        let mapSerie =
                            changeMap[sitem.flowId].filter(v => {
                                if (fitem.children && fitem.children.length) {
                                    let { itemName, value } = v.encode
                                    let re =
                                        itemName.split('-').some(v => name.split('-').indexOf(v) > -1) &&
                                        value === sitem.columnName
                                    return re
                                } else {
                                    return v.encode.itemName === name && v.encode.value === sitem.columnName
                                }
                            })[0] || seriesType
                        serie = Object.assign({}, mapSerie, {
                            encode: {
                                itemName: name,
                                value: sitem.columnName
                            },
                            _$id: sitem.flowId
                        })
                    } else {
                        serie = Object.assign({}, seriesType, {
                            encode: {
                                itemName: name,
                                value: sitem.columnName
                            },
                            _$id: sitem.flowId
                        })
                    }
                    series.push(serie)
                })
            })
        }
        _echartsMapConvertData(type) {
            let series = this.option.series[0]
            series.data = _.uniq(_.union(this._data, this._fillData), 'name')
            series.nameMap = regionMap
            delete series.radius
            delete series.center
            //delete series.encode
            delete this.option.dataset
        }
        _matchStyleConfig(chartsOptions, path, value) {
            // if (path === 'series[0]._region' && value === 'China') {
            //     value = '中国'
            // }
            //let reg = /(\w+)(?:\[(\d+)\])?(?:\[(\d+)\])?/
            let reg = /(\w+)(?:\[(\d+)\])?/
            path = path.split('.')
            path = path.map(key => {
                let result = key.match(reg)
                result.shift()
                return result
            })
            path = [].concat.apply([], path).filter(key => key !== undefined)
            let last = path.pop()
            let data = path.reduce((o, c, i, arr) => {
                if (o[c] === undefined) {
                    if (arr.length <= i + 1) {
                        o[c] = /\d+/.test(last) ? [] : {}
                    } else {
                        o[c] = arr[i + 1] && /\d+/.test(arr[i + 1]) ? [] : {}
                    }
                }
                return o[c]
            }, chartsOptions)
            if (value !== undefined) {
                // 临时处理颜色问题
                if (_.isNull(value) && /background/i.test(last)) {
                    value = 'rgba(255, 255, 255, 0)'
                }
                last.indexOf('@') > -1 ? this._specialProp(data, last, value) : (data[last] = value)
            } else {
                return data[last]
            }
        }
        _setFormatter(card) {
            let option = this.option
            //目前分布图只支持一个维度一个指标,只取1
            let rule = card.xAxis[0].type === 'dimension' ? card.yAxis[0].$format : card.xAxis[0].$format
            if (!option.tooltip) {
                option.tooltip = {}
            }
            Object.assign(option.tooltip, {
                trigger: 'item',
                formatter: function(params) {
                    return params.name + ':  ' + Util(rule, params.value)
                }
            })
        }
    }
    return distributionMap
})
