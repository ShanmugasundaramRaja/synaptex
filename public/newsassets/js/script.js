// Feature detection for canvas and CSS3 animations
(function () {
    $.support.canvas = 'getContext' in document.createElement('canvas');
    $.support.css3Animation = (function () {
        var sp = $('<span>');
        return (
            sp.css("animation") !== undefined ||
            sp.css("-webkit-animation") !== undefined ||
            sp.css("-moz-animation") !== undefined
        );
    })();
})();

$(window).on("load", function () {
    var imgPath = "newsassets/img/";

    // Define 6 paper covers
    var papers = [
        { line1: "SYNAPTEX", line2: "turns to importing!", subtitle: "The new importer in town", centerImage: "paper_center.jpg" },
        { line1: "SYNAPTEX", line2: "making waves", subtitle: "Expanding to Eastern Europe", centerImage: "paper_center2.jpg" },
        { line1: "SYNAPTEX", line2: "now a Quality Controller", subtitle: "Best compliance standards in Europe", centerImage: "paper_center3.jpg" },
        { line1: "SYNAPTEX", line2: "Your Forwarding Experts", subtitle: "Consult to ship today!", centerImage: "paper_center4.jpg" },
        { line1: "SYNAPTEX", line2: "Takes on Insurance", subtitle: "Maritime, In-land, On-Road insurance suggestions", centerImage: "paper_center5.jpg" },
        { line1: "SYNAPTEX", line2: "enters warehousing", subtitle: "Flexible Warehousing made possible", centerImage: "paper_center6.jpg" }
    ];

    // Fallbacks for unsupported browsers
    if (!$.support.canvas) {
        $('#fin').html('Sorry, your browser does not support &lt;canvas&gt;').show();
        return;
    }

    if (!$.support.css3Animation) {
        $('#fin').html('Sorry, your browser does not support CSS3 Animations').show();
        return;
    }

    // Loop through papers and create canvas for each
    $.each(papers, function (i, paper) {
        $.when(
            loadImage(imgPath + "paper_top.png"),
            loadImage(imgPath + "paper_left.png"),
            loadImage(imgPath + paper.centerImage),
            loadImage(imgPath + "paper_right.png")
        ).then(function (imgTop, imgLeft, imgCenter, imgRight) {

            var canvas = document.createElement("canvas"),
                c = canvas.getContext("2d");

            // Responsive scaling based on viewport
            var scale = Math.min(window.innerWidth / 717, window.innerHeight / 526, 1);
            canvas.width = 717 * scale;
            canvas.height = 526 * scale;

            c.drawImage(imgTop, 0, 0, canvas.width, canvas.height * 0.2);
            c.drawImage(imgLeft, 0, canvas.height * 0.02, canvas.width * 0.02, canvas.height * 0.96);
            c.drawImage(imgCenter, canvas.width * 0.02, canvas.height * 0.02, canvas.width * 0.96, canvas.height * 0.96);
            c.drawImage(imgRight, canvas.width - canvas.width * 0.02, canvas.height * 0.02, canvas.width * 0.02, canvas.height * 0.96);

            drawText(paper.line1, paper.line2, paper.subtitle, c, canvas.width / 2, canvas.height / 2, scale);

            // Append with staggered delay
            setTimeout(function () {
                $("body").append(canvas);
                $(canvas).css('animation', 'newspin 6s linear forwards');
            }, i * 5800);
        });
    });

    // Show final logo after all canvases
    $('#fin').delay(papers.length * 5800).fadeIn();

    // ------------------------
    // Helper functions
    // ------------------------

    function loadImage(src) {
        var def = new $.Deferred(),
            img = new Image();
        img.onload = function () { def.resolve(img); };
        img.onerror = function () { def.reject("Failed to load image: " + src); };
        img.src = src;
        return def.promise();
    }

    function drawText(line1, line2, subtitle, c, x, y, scale) {
        c.font = `${65 * scale}px Anton, Calibri`;
        c.textAlign = "center";
        c.fillStyle = "#3e3e3e";
        c.fillText(line1.toUpperCase(), x, y - 20 * scale);
        c.fillText(line2.toUpperCase(), x, y + 50 * scale);

        c.font = `italic ${20 * scale}px Georgia, serif`;
        c.fillStyle = "#737373";
        c.fillText(subtitle, x, y + 100 * scale);
    }

    // Optional: re-scale canvases on window resize
    $(window).on('resize', function () {
        $('canvas').each(function () {
            var scale = Math.min(window.innerWidth / 717, window.innerHeight / 526, 1);
            this.width = 717 * scale;
            this.height = 526 * scale;
            // NOTE: you might need to re-draw the content here if scaling is required dynamically
        });
    });
});
