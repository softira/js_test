/*
 * 基于单例设计模式来管理商城排序的代码
 */
let shopModule = (function () {
  //想要操作谁，就先获取谁（项目中尽可能把创建变量提前并放在一起）
  let $navList = $('.rank a'),
    $cardBox = $('.user'),
    $cardList = null,
    _DATA = null,
    HTML = '';

  //=>queryData:从服务器获取数据
  function queryData() {
    $.ajax({
      url: 'json/list.json',
      type: 'GET',
      async: false,
      success: result => {
        //从服务器获取数据成功会执行SUCCESS，RESULT存储的就是获取到的数据（并且数据默认就已经转换为JSON格式的对象）
        _DATA = result;
      }
    });
  }

  //=>bindHTML:把数据绑定在页面中
  function bindHTML() {

    if (!_DATA || _DATA.length === 0) return;
    $.each(_DATA, (index, item) => {
      let {
        name,
        age
      } = item;
      HTML += `<div data-name="${name}" data-age="${age}">
                <p>姓名：${name}</p>
                <p>年龄：${age}</p>
              </div>`;
    });
    $cardBox.html(HTML);
    //=>获取所有的CARD
    $cardList = $cardBox.children('.user div');
  }

  //sortHandle:实现商城排序
  function sortHandle() {
    $navList.attr('type', -1);
    $navList.on('click', function () {
      //=>THIS:当前点击的LI（原生JS对象） => $(THIS)变为JQ对象
      let $this = $(this),
        rank = $this.attr('rank');
      $this.attr('type', $this.attr('type') * -1).siblings().attr('type', -1);
      $cardList.sort((A, B) => {
        let $A = $(A),
          $B = $(B);
        $A = $A.attr(rank);
        $B = $B.attr(rank);
        if (rank === 'data-name') {
          return $A.localeCompare($B) * $this.attr('type');
        } else {
          return ($A - $B) * $this.attr('type');
        }

      });
      $cardList.each((index, item) => $cardBox.append(item));
    });
  }

  return {
    //=>当前模块的入口：想让商城排序开始执行，我们只需要执行INIT，在INIT中会按照顺序，依次完成具体的业务逻辑
    init() { //init:function(){}
      queryData();
      bindHTML();
      sortHandle();
    }
  }
})();

shopModule.init();