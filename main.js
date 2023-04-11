// ==UserScript==
// @name        Sellasist - zaznaczanie
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Dawid Grubba
// @match        https://premiumlashes.sellasist.pl/admin/orders/edit/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sellasist.pl
// @grant        none
// @require https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function() {
    'use strict';

    const articles = $('.prod');
    var items = JSON.parse(localStorage.getItem('checked'));

    if(!items)
    {
     var items = [];
    }

    articles.each(function(i, obj) {
        var objchild = $(obj).find('.order_product').attr("rel");

        $(obj).css('position', 'relative')
        $(obj).attr('id', objchild);

        if(items.includes($(obj).attr('id')))
        {
            obj.innerHTML += '<input class="activeItemCheckbox" data-parent="'+objchild+'" type="checkbox" style="position:absolute;right:5px;bottom:5px;">'
            addBorder($(obj));
        } else
        {
            obj.innerHTML += '<input class="activeItemCheckbox" data-parent="'+objchild+'" type="checkbox" style="position:absolute;right:5px;bottom:5px;">'
            removeBorder($(obj));
        }

    });

    if(items)
    {
        items.forEach((element) => {
            addBorder($('#' + element));
        });
    }

    Array.prototype.remove = function(x) {
        var i;
        for(i in this){
            if(this[i])
            {
                if(this[i].toString() == x.toString()){
                    this.splice(i,1)
                }
            }
        }
    }

    function addBorder(item)
    {
        item.css('border', "1px solid green");
        item.css('background', "#ddffdd");
        item.addClass('activeItem');
        item.find('.activeItemCheckbox').attr('checked', true);
    }

    function removeBorder(item)
    {
        item.css('border', "1px solid transparent");
        item.css('background', "white");
        item.removeClass('activeItem');
        item.find('.activeItemCheckbox').attr('checked', false);
    }

    function itemClick(item)
    {
        if(item.hasClass('activeItem'))
        {
            removeBorder(item);
            deleteFromLocalStorage(item);
        } else
        {
            addBorder(item);
            addToLocalStorage(item);
        }
    }

    function addToLocalStorage(item)
    {
        const items = localStorage.getItem('checked');
        if(items)
        {
            var arr = JSON.parse(items);
        } else
        {
            var arr = [];
        }

        arr.push(item.attr('id'));
        localStorage.setItem("checked", JSON.stringify(arr));
    }

    function deleteFromLocalStorage(item)
    {
        const items = JSON.parse(localStorage.getItem('checked'));
        console.log(items);
        console.log(item.attr('id'));
        items.remove(item.attr('id'))

        localStorage.setItem("checked", JSON.stringify(items));


    }

    $( ".activeItemCheckbox" ).click(function() {
        var parent = $(this).attr("data-parent");
        itemClick($('#' + parent));
    });
})();
