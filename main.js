var apiKey = '<YOUR-API-KEY>';
var ably = new Ably.Realtime({ 
    key: apiKey
});

var metaChannel = ably.channels.get("[meta]channel.lifecycle");
var resultArea = document.getElementById("result");
resultArea.scrollTop = resultArea.scrollHeight;