
var csColumnNames = [];
var globFunctionCall;

var csWebGrid = {
    container: {},
    data: {},
    header: [],

    init: function(container, data) {
        csColumnNames = [];
        container = container;
        this.container = container;
        this.data = data;
        this.header = (function() {
            var headArray = [];
            var counter = 0;
            Object.keys(data[0]).forEach(function(e) {
                var cssClass = 'csWebGridRow' + counter;
                var style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML = "." + cssClass + ' { }';
                headArray.push(e);
                counter++;
            });
            return headArray;
        })();
        this.createGrid();
    },

    createGrid: function() {
        var htmlOutput = "<div class='csWebGridContainer'>";
        htmlOutput += "<div id='csWebGridHeaderID' class='csWebGridRowHeader' value='0'>";
        var counter = 0;
        this.header.forEach(function(e) {
            htmlOutput += "<div class='csWebGridDefault csWebGridColumn" + counter + " csWebGridHeader' value='" + e + "'><b>" + e + "</b></div>";
            csColumnNames.push("csWebGridColumn" + counter);
            counter++;
        });
        htmlOutput += "</div>";
        htmlOutput += "<div class='csWebGridInnerContainer'>"
        for (var x = 0; x < this.data.length; x++) {
            var rowType = "";
            if(isEven(x)){
                rowType = "csWebGridRowEven";
            }else{
                rowType = "csWebGridRowOdd";
            }
            htmlOutput += "<div class='csWebGridRow " + rowType + "' value='" + x + "'>";
            for (var headCount = 0; headCount < this.header.length; headCount++) {
                htmlOutput += "<div class='csWebGridDefault csWebGridColumn" + headCount + " " + rowType + "' value='" + this.data[x][this.header[headCount]] + "'>" + this.data[x][this.header[headCount]] + "</div>";
            }
            htmlOutput += "</div>";
        }
        htmlOutput += "</div>";
        htmlOutput += "</div>";
        $("#" + this.container).html(htmlOutput);
        for(var rowCount = 0; rowCount < this.header.length; rowCount++){
            var cssClass = "csWebGridColumn" + rowCount;
            this.makeResizable(cssClass);
        }
        $(".csWebGridInnerContainer").on("scroll", function(){
             $(".csWebGridRowHeader").scrollLeft($(".csWebGridInnerContainer").scrollLeft());
             if($(".csWebGridInnerContainer").scrollLeft() !== $(".csWebGridRowHeader").scrollLeft()){
                 $(".csWebGridInnerContainer").scrollLeft($(".csWebGridRowHeader").scrollLeft());
             }
        });
    },

    addOnClick: function(columnNumber, functionCall){
        var browser = Object.create(testBrowser);
        browser.init();
        $(".csWebGridColumn" + columnNumber).css("cursor","pointer");
        // $(".csWebGridRow").on("click",".csWebGridColumn" + columnNumber,function(e){
        //     functionCall($(e.toElement).attr("value"));
        // });
        $(".csWebGridRow").on("click",".csWebGridColumn" + columnNumber,function(e){
            if(browser.isIE){
                functionCall(e.currentTarget.attributes[2].value);
            }
            if(browser.isChrome){
                functionCall($(e.toElement).attr("value"));
            }
            if(browser.isFirefox){
                functionCall(e.currentTarget.attributes[0].value);
            }
            if(browser.isSafari){
                functionCall($(e.toElement).attr("value"));
            }
        });
    },

    makeResizable: function(cssClass){
        $("." + cssClass).resizable({
            handles: 'e',
            minWidth: 25,
            maxWidth: 1000,
            resize: function(event, ui) {
                var currentWidth = ui.size.width;
                $("." + cssClass).width(currentWidth);
                //setGridWidths();
                //for(var x=0; x < )
            }
        });
    }
}

var columnObject = {
    name: "",
    width: "",
    values: [],

    init: function(name){
        this.name = name;
    },

    setWidth: function(){

    }
}

var testObject = {
    name: "",
    email: "",
    domain: "",
    location: ""
}

function isEven(n) {
   return n % 2 == 0;
}

function isOdd(n) {
   return Math.abs(n % 2) == 1;
}

var testData = {
    testObjects: [],

    init: function() {
        test1 = Object.create(testObject);
        test1.name = "Tom";
        test1.email = "tom.digby@westrock.com";
        test1.domain = "westrock";
        test1.location = "Norcross";
        this.testObjects.push(test1);

        test2 = Object.create(testObject);
        test2.name = "Blake";
        test2.email = "blake.mcdonald@westrock.com";
        test2.domain = "rocktenn";
        test2.location = "Tucson";
        this.testObjects.push(test2);

        test3 = Object.create(testObject);
        test3.name = "Mike";
        test3.email = "mike.wade@westrock.com";
        test3.domain = "MWV";
        test3.location = "San Diego";
        this.testObjects.push(test3);

        test4 = Object.create(testObject);
        test4.name = "Cody";
        test4.email = "Cody.Smith@westrock.com";
        test4.domain = "westrock";
        test4.location = "Dominican Republic";
        this.testObjects.push(test4);
    }
}

function setGridWidths(){
    var totalWidth = 0;
    totalWidth += csColumnNames.length * 2 + csColumnNames.length * 4;
    csColumnNames.forEach(function(className){
        totalWidth += $("." + className).width();
    });
    $(".csWebGridRow").width(totalWidth);
    $(".csWebGridRowHeader").width(totalWidth);
    $(".csWebGridInnerContainer").width(totalWidth);
    if($(".csWebGridRow").width() > $(".csWebGridContainer").width()){
        $(".csWebGridContainer").css({overflowX: 'scroll'});
    }else{
        $(".csWebGridContainer").css({overflowX: 'hidden'});
    }
}

var testBrowser = {
    isOpera: false,
    isFirefox: false,
    isSafari: false,
    isIE: false,
    isEdge: false,
    isChrome: false,
    isBlink: false,

    init: function(){
        // Opera 8.0+
        try{this.isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;}catch(e){}
        // Firefox 1.0+
        try{this.isFirefox = typeof InstallTrigger !== 'undefined';}catch(e){}
        // At least Safari 3+: "[object HTMLElementConstructor]"
        try{this.isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;}catch(e){}
        // Internet Explorer 6-11
        try{this.isIE = /*@cc_on!@*/false || !!document.documentMode;}catch(e){}
        // Edge 20+
        try{this.isEdge = !isIE && !!window.StyleMedia;}catch(e){}
        // Chrome 1+
        try{this.isChrome = !!window.chrome && !!window.chrome.webstore;}catch(e){}
        // Blink engine detection
        try{this.isBlink = (isChrome || isOpera) && !!window.CSS;}catch(e){}
    }
}

function RunTest(){
    var test = Object.create(testData);
    test.init();
    var grid = Object.create(csWebGrid);
    grid.init("UICustomGrid",test.testObjects);
}

function MakeResizable(cssClass){
    $("." + cssClass).resizable({
        handles: 'e',
        minWidth: 25,
        maxWidth: 400,
        resize: function(event, ui) {
            var currentWidth = ui.size.width;
            $("." + cssClass).width(currentWidth);
            setGridWidths();

            //for(var x=0; x < )
        }
    });
}

function AddOnClick(columnNumber, functionCall){
    $(".csWebGridColumn" + columnNumber).css("cursor","pointer");
    //$(".csWebGridRow").on("click",".csWebGridColumn" + columnNumber,function(e){functionCall($(e.toElement).attr("value"));})
    $(".csWebGridRow").on("click",".csWebGridColumn" + columnNumber,function(e){
        csCallFunction($(e.toElement).attr("value"),functionCall);
    });
}
