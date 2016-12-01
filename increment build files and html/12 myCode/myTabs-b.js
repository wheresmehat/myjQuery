$.fn.tabs = function() {

    var listLinks = this.find("li a");

    $.each(listLinks, function(i, a) {

        var $a = $([a]);    // wrapping each 'a' returned from each in a $ so we can use attr method below

        if (i !== 0) {                      // don't hide the first element
        
            $($a.attr("href")).hide();      // hide elements who's id is the same as the a's href

        }

    });

    listLinks.bind("click", function() {

        var clickHref = $([this]).attr("href");

        $.each(listLinks, function(i, a) {

            var $a = $([a]);  

            $($a.attr("href")).hide();      // hide elements who's id is the same as the a's href
      
        });

        $(clickHref).show();

    });

};

$("#breeds").tabs();

