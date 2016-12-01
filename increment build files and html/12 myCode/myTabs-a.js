$.fn.tabs = function() {

    $("div").hide();

    $("div:first-of-type").show();

    $("a").bind("click", function() {
    
        var clickedBreed = this.getAttribute("href");

        $("div").hide();

        $(clickedBreed).show();
    

    });

};

$("#breeds").tabs();

