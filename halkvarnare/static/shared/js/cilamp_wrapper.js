
function addImageToDiv(divId, imgUrl, imgId) {
    console.log("Adding image id " + imgId + " to div id " + divId + " image url " + imgUrl)
    $(divId).prepend($('<img>',
    {
        id: imgId,
        src: imgUrl,
        class: 'u-max-full-width'
    }
    ))
    $("#"+imgId).hide()
}

function nameToId(name) { return name + "Image"; }

var numcolors = colors.length
var colortable = {}

var cilamp_wrapper = {

    initDiv: function(divId) {
        console.log("Initializing " + numcolors + " color table.")
        for(i=0; i<numcolors; i++) {
            var colorObj = colors[i]
            colortable[colorObj.name] = colorObj
            addImageToDiv(divId, colorObj.imageSrc, nameToId(colorObj.name))
        }
    },

    setColorByName: function(systemid, colorName) {
        console.log("Showing color " + colorName)

        setTimeout(function() {
            $('#' + nameToId(colorName)).show()
            $.each(colors, function(index, colorObj) {
                var name = colorObj.name
                if(name != colorName)
                    $('#' + nameToId(name)).hide()
            })
        }, 850)

        var colorHex = colortable[colorName].colorHex
        console.log("Setting " + systemid + " to color " + colorHex)
        cilamp_wrapper.setState(systemid, colorHex)
    },

    setState: function(systemid, color, period) {
        var endpoint = 'https://api.cilamp.se/v1/' + systemid + '/'

        var packet = {
            color: color
        }

        if (period) {
            packet.period = period
        }

        var request = { method: "POST", url: endpoint, data: packet }
    //console.log('request: ', request);
    $.ajax(request).fail(function(err) { console.log(err) })
}

}

