var apiKey = '<YOUR-API-KEY>';
var ably = new Ably.Realtime({ 
    key: apiKey
});

var metaChannel = ably.channels.get("[meta]channel.lifecycle");
var resultArea = document.getElementById("result");
resultArea.scrollTop = resultArea.scrollHeight;

metaChannel.subscribe('channel.opened', (msg) => {
    var msgJSONobj = JSON.parse(JSON.stringify(msg.data));
    resultArea.value += ('[META DATA - ' + (new Date().toLocaleTimeString()) + ' ]: Channel "' + msgJSONobj.name + '" has been activated globally\n')
})

metaChannel.subscribe('channel.closed', (msg) => {
    var msgJSONobj = JSON.parse(JSON.stringify(msg.data));
    resultArea.value += ('[META DATA - ' + (new Date().toLocaleTimeString()) + ' ]: Channel "' + msgJSONobj.name + '" has been deactivated globally\n')
})

metaChannel.subscribe('channel.region.active', (msg) => {
    var msgJSONobj = JSON.parse(JSON.stringify(msg.data));
    resultArea.value += ('[META DATA - ' + (new Date().toLocaleTimeString()) + ' ]: Channel "' + msgJSONobj.name + '" has been activated in ' + msgJSONobj.region + ' region\n')
})

metaChannel.subscribe('channel.region.inactive', (msg) => {
    var msgJSONobj = JSON.parse(JSON.stringify(msg.data));
    resultArea.value += ('[META DATA - ' + (new Date().toLocaleTimeString()) + ' ]: Channel "' + msgJSONobj.name + '" has been deactivated in ' + msgJSONobj.region + ' region\n')
})

function createChannel() {
    var channelName = document.getElementById('create-ch-name').value
    if (channelName == "") {
        alert('Enter a channel name to attach');
    }
    else {
        var channel = ably.channels.get(channelName)
        resultArea.value += ('[LOCAL LOG - ' + (new Date().toLocaleTimeString()) + ' ]: Channel instance obtained for "' + channelName + '" \n')
        var chList = document.getElementById('attached-channels');
        chList.options[chList.options.length] = new Option(channelName, channelName);
        var channelInstances = document.getElementById('channel-instances');
        channelInstances.options[channelInstances.options.length] = new Option(channelName, channelName);
    }

}

function attachChannel() {
    var channelsList = document.getElementById("channel-instances");
    var chToAttach = channelsList.options[channelsList.selectedIndex].text;
    var channel = ably.channels.get(chToAttach)
    if (chToAttach == 'None') {
        alert('Select a channel to delete')
    }
    else {
        channel.attach(() => {
            resultArea.value += ('[LOCAL LOG - ' + (new Date().toLocaleTimeString()) + ' ]: Channel "' + channel.name + '" is now attached\n');
        })
    }

}

function detachChannel() {
    var channelsList = document.getElementById("attached-channels");
    var chToDetach = channelsList.options[channelsList.selectedIndex].text;
    var channel = ably.channels.get(chToDetach)
    if (chToDetach == 'None') {
        alert('Select a channel to delete')
    }
    else {
        channel.detach(() => {
            resultArea.value += ('[LOCAL LOG - ' + (new Date().toLocaleTimeString()) + ' ]: Channel "' + channel.name + '" is now detached\n');
        })
    }
}