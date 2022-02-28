let filterModule = (function () {
  //=>准备两组数据
  let _SELECT = [{
    type: 1,
    name: "苹果"
  }];
  let _DATA = [{
    type: 1,
    text: "品牌",
    content: ["苹果", "小米", "华为", "vivo"]
  }, {
    type: 2,
    text: "尺寸",
    content: ["5.0-5.5英寸", "6.0英寸及以上"]
  }, {
    type: 3,
    text: "网络",
    content: ["3G", "4G", "5G"]
  }]

  //=>需要操作的元素
  let $typeBox = $('#type'),
    $chooseBox = $('#choose');

  //=>根据数据渲染视图
  function render() {
    //=>待选区
    let str = ``;
    _DATA.forEach(item => {
      let {
        type,
        text,
        content
      } = item;
      str += `<li _type="${type}">
      ${text}：
      ${content.map(A => `<a href="javascript:;">${A}</a>`).join(' ')}
      </li>`;
    });
    $typeBox.html(str);
    //=>选择区
    str = `你的选择：`;
    _SELECT.sort((A, B) => A.type - B.type);
    _SELECT.forEach(item => {
      str += `<mark>${item.name}<a href="javascript:;" _type="${item.type}">X</a></mark>`;
    });
    $chooseBox.html(str);
    //=>渲染完，绑定事件
    handle();
    handleSelect();
  }

  //=>待选区绑定点击事件
  function handle() {
    $typeBox.find('a').click(function () {
      let $this = $(this),
        obj = {};
      //=>构建存储的内容
      obj.type = parseFloat($this.parent().attr('_type'));
      obj.name = $this.text().trim(); //trim()去除字符串中的首尾空格
      //=>点击谁就把谁存储到_SELECT中
      //1.存储之前，先看看原有数组是否存在TYPE和当前存储这一项相同的，有相同的就替换
      _SELECT.forEach((item, index) => {
        if (item.type === obj.type) {
          _SELECT.splice(index, 1);
        }
      });
      _SELECT.push(obj);
      render();
    });
  }

  //=>待选区绑定点击事件
  function handleSelect() {
    $chooseBox.find('a').click(function () {
      let $this = $(this),
        _type = parseFloat($this.attr('_type'));
      _SELECT.forEach((item, index) => {
        if (item.type === _type) {
          _SELECT.splice(index, 1);
        }
      });
      render();
    });
  }

  return {
    init() {
      render();
    }
  }
})();
filterModule.init();