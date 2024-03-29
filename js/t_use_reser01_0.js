
$(function(){
    if(JSON.parse(localStorage.getItem("load"))) {
        let obj = JSON.parse(localStorage.getItem("load"));
        let num = obj["page"], char = obj["char"], name = obj["name"];
        $(".formBox").load(`../t_use/t_use_reser01_${num}.html`);
        $(".tapBox a").not(`:eq(${num-1})`).removeClass("active_tap");
        $(".tapBox a").eq(num-1).addClass("active_tap");
    } else {
      $(".formBox").load("../t_use/t_use_reser01_1.html");
      localStorage.setItem("load",JSON.stringify({page:1}))
    }
    $("header")
      .hide()
      .load("../header/header.html")
      .ready(function(){ $("header").show() })
    $("footer").load("../footer/footer.html");
      //localStorage setting
      localStorage.setItem("payment_list","[]");
      if ( !localStorage.getItem("ticketBasket") ) {
        localStorage.setItem("ticketBasket", "[]");
      }
      // page load
      $(".tapBox_btn").each(function (i) {
        $(this).click(function () {
          $(".formBox").children().remove();
          $(".formBox").load(`../t_use/t_use_reser01_${i + 1}.html`);
          localStorage.setItem("load",`{"page":${i+1}}`)
          $(".tapBox a").not($(this)).removeClass("active_tap");
          $(this).addClass("active_tap");
        });
      });
      // basket setting
      const basketList = JSON.parse(localStorage.getItem("ticketBasket"));
      for( const key in basketList ) {
        const $listSetting = $("<li class='rb_l_list'></li>");
        const $closeBtn = $("<a href='#none' class='rb_remove'></a>");
        $closeBtn.click(function(){
          $(this).parent().remove();
    
          const getList = JSON.parse(localStorage.getItem("ticketBasket"));
          localStorage.setItem("ticketBasket",JSON.stringify(getList));
        });
        
        //불러오기
      }
      // 결제페이지 이동 클릭 시 확인 //
      $(".pageBtn_next").on("click",function(){
        const q = JSON.parse(localStorage.getItem("ticketBasket"));
        if( q.length == 0 ) {
          alert("구매내역이 없습니다.");
        } else {
          location.href = "/t_use/t_use_reser03.html";
        }
      })
});