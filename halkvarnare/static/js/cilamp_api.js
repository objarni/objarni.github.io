var cilamp = {
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

