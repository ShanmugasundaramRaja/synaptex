// Feature detection for canvas and CSS3 animations
(function () {
    $.support.canvas = 'getContext' in document.createElement('canvas');
    $.support.css3Animation = (function () {
        var sp = $('<span>');
        return (
            sp.css("-webkit-animation") !== undefined ||
            sp.css("-moz-animation") !== undefined ||
            sp.css("animation") !== undefined
        );
    })();
})();

$(window).on("load", function () {
    var imgPath = "newsassets/img/";

    // Define 6 paper covers:
    var papers = [
        {
            line1: "SYNAPTEX",
            line2: "turns to importing!",
            subtitle: "The new importer in town",
            centerImage: "paper_center.jpg"
        },
        {
            line1: "SYNAPTEX",
            line2: "making waves",
            subtitle: "Expanding to Eastern Europe",
            centerImage: "paper_center2.jpg"
        },
        {
            line1: "SYNAPTEX",
            line2: "now a Quality Controller",
            subtitle: "Best compliance standards in Europe",
            centerImage: "paper_center3.jpg"
        },
        {
            line1: "SYNAPTEX",
            line2: "Your Forwarding Experts",
            subtitle: "Consult to ship today!",
            centerImage: "paper_center4.jpg"
        },
        {
            line1: "SYNAPTEX",
            line2: "Takes on Insurance",
            subtitle: "Maritime, In-land, On-Road insurance suggestions",
            centerImage: "paper_center5.jpg"
        },
        {
            line1: "SYNAPTEX",
            line2: "enters warehousing",
            subtitle: "Flexible Warehousing made possible",
            centerImage: "paper_center6.jpg"
        }
    ];

    // Check whether canvas and CSS3 animations are supported:
    if (!$.support.canvas) {
        $('#fin').html('Sorry, your browser does not<br />support &lt;canvas&gt;').show();
        return;
    }

    if (!$.support.css3Animation) {
        $('#fin').html('Sorry, your browser does not<br />support CSS3 Animations').show();
        return;
    }

    // Loop through each paper definition
    $.each(papers, function (i, paper) {
        $.when(
            loadImage(imgPath + "paper_top.png"),
            loadImage(imgPath + "paper_left.png"),
            loadImage(imgPath + paper.centerImage),  // dynamic center image
            loadImage(imgPath + "paper_right.png")
        ).then(function (imgTop, imgLeft, imgCenter, imgRight) {
            var canvas = document.createElement("canvas"),
                c = canvas.getContext("2d");

            canvas.width = 717;
            canvas.height = 526;

            c.drawImage(imgTop, 0, 0);
            c.drawImage(imgLeft, 0, 12);
            c.drawImage(imgCenter, 14, 12);
            c.drawImage(imgRight, 711, 12);

            drawText(paper.line1, paper.line2, paper.subtitle, c, 358, 250);

            setTimeout(function () {
                $("body").append(canvas);
            }, i * 5800);
        });
    });

    // Fade in the logo after all canvases are shown
    $('#fin').delay(papers.length * 5800).fadeIn();

    /*------------------------
        Helper functions
    ------------------------*/

    // Load an image by URL and resolve a jQuery.Deferred:
    function loadImage(src) {
        var def = new $.Deferred(),
            img = new Image();

        img.onload = function () {
            def.resolve(img);
        };

        img.onerror = function () {
            def.reject("Failed to load image: " + src);
        };

        img.src = src;
        return def.promise();
    }

    // Draw two lines of text and a subtitle on the canvas
    function drawText(line1, line2, subtitle, c, x, y) {
        c.font = "65px Anton,Calibri";
        c.textAlign = "center";
        c.fillStyle = "#3e3e3e";

        c.fillText(line1.toUpperCase(), x, y);
        c.fillText(line2.toUpperCase(), x, y + 80);

        c.font = "italic 20px Georgia,serif";
        c.fillStyle = "#737373";

        c.fillText(subtitle, x, y + 120);
    }
});
