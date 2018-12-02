Component({
  properties: {
    index: {
      type: Number,
      /* 数据改变时调用 observer */
      observer: function(newVal, oldVal, changedPath) {
        let val = newVal < 10 ? '0' + newVal : newVal
        this.setData({
          /* 不要修改本身 index, 容易无限循环 */
          _index: val
        })
      }
    }
  },
  /**
   * 组件的初始数据, data 的值也会被页面绑定, data 的值不可以从组件外部设置
   * 使用 text 组件会出现双文字的情况
   */
  data: {
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    year: Number,
    month: String,
    _index: String
  },
  /* 组件生命周期函数, 组件布局完成后执行 */
  ready: function() {
    let date = new Date()
    let month = date.getMonth()
    let year = date.getFullYear()
    this.setData({
      month: this.data.months[month],
      year: year
    })
  }
})
