window.addEventListener('load', function () {
    /*---------1.轮播图---------*/
    (function () {
        //1.获取需要的标签
        var casualContent = myTool.$('casual_content');
        var contentImg = casualContent.children;
        var casualControl = myTool.$('casual_control');
        var casualControlBottom = casualControl.children[2];
        //console.log(contentImg.length);

        // 更改背景颜色
        var bgColorArr = ['#0037b5', '#bd91ff', '#6e02ad', '#10358e', '#f38120'];
        var lkCasual = myTool.$('lk_casual');
        //lkCasual.style.backgroundColor = bgColorArr[0];

        //2.全局索引
        var iNOW = 0;

        //3.动态创建下面的指示器
        for (var i = 0; i < contentImg.length; i++) {
            var li = document.createElement('li'); // <li></li>
            //li.innerText = contentImg.length - i;
            casualControlBottom.insertBefore(li, casualControlBottom.children[0]);
        }

        //4.让第一个选中
        casualControlBottom.children[0].className = 'current';

        //5.让除了第一张的幻灯片归位
        var scrollImgWidth = casualContent.offsetWidth;
        for (var j = 1; j < contentImg.length; j++) {
            contentImg[j].style.left = scrollImgWidth + 'px';
        }

        // 6. 处理左右点击
        var cPrev = casualControl.children[0];
        var cNext = casualControl.children[1];
        // 点击左边
        cPrev.addEventListener('click', function () {
            myTool.buffer(contentImg[iNOW], {"left": scrollImgWidth});
            iNOW--;
            if (iNOW < 0) {
                iNOW = contentImg.length - 1;
            }
            contentImg[iNOW].style.left = -scrollImgWidth + 'px';
            myTool.buffer(contentImg[iNOW], {'left': 0});
            changeIndex();

            // 改变背景颜色
            lkCasual.style.backgroundColor = bgColorArr[iNOW];

        });
        // 点击右边
        cNext.addEventListener('click', function () {
            autoPlay();
        });
        // 底部的处理
        for (var k = 0; k < casualControlBottom.children.length; k++) {
            var bottomLi = casualControlBottom.children[k];
            (function (index) {
                bottomLi.addEventListener('mouseover', function () {
                    if (index > iNOW) {
                        myTool.buffer(contentImg[iNOW], {"left": -scrollImgWidth});
                        contentImg[index].style.left = scrollImgWidth + 'px';
                        iNOW = index;
                        myTool.buffer(contentImg[iNOW], {"left": 0});
                    } else if (index < iNOW) {
                        myTool.buffer(contentImg[iNOW], {"left": scrollImgWidth});
                        contentImg[index].style.left = -scrollImgWidth + 'px';
                        iNOW = index;
                        myTool.buffer(contentImg[iNOW], {"left": 0});

                    }
                    // 切换索引
                    changeIndex();
                    // 改变背景颜色
                    lkCasual.style.backgroundColor = bgColorArr[iNOW];

                })
            })(k)
        }

        // 7. 切换索引
        function changeIndex() {
            for (var i = 0; i < casualControlBottom.children.length; i++) {
                casualControlBottom.children[i].className = '';
            }
            // 当前的被选中
            casualControlBottom.children[iNOW].className = 'current';
        }

        //8.设置定时器
        var timerId = setInterval(autoPlay, 2000);

        // 9. 设置和清除定时器
        casualContent.parentNode.addEventListener('mouseover', function () {
            clearInterval(timerId);
        });
        casualContent.parentNode.addEventListener('mouseout', function () {
            timerId = setInterval(autoPlay, 2000);
        });

        function autoPlay() {
            myTool.buffer(contentImg[iNOW], {"left": -scrollImgWidth});
            iNOW++;
            if (iNOW >= contentImg.length) {
                iNOW = 0;
            }
            contentImg[iNOW].style.left = scrollImgWidth + 'px';
            myTool.buffer(contentImg[iNOW], {'left': 0});
            changeIndex();

            // 改变背景颜色
            lkCasual.style.backgroundColor = bgColorArr[iNOW];
        }
    })();
    /*----------------2.倒计时---------------------*/
    (function () {
        var time = 8 * 60 * 60, hour, min, second;
        var MSSpan = myTool.$('s_kill_time').children;

        var timerId = setInterval(function () {
            time--;
            if (time <= 0) {
                clearInterval(timerId);
            }
            hour = Math.floor(time / (60 * 60));
            min = Math.floor(time % (60 * 60) / 60);
            second = Math.floor(time % 60);

            MSSpan[1].innerText = size(hour);
            MSSpan[3].innerText = size(min);
            MSSpan[5].innerText = size(second);
        }, 1000);

        function size(num) {
            return num < 10 ? '0' + num : num;
        }
    })();

});