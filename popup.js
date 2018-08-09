//Popup button event handler: Send message to content scripts and create notification.
$(document).ready(function(){
    $('#save').click(function(){
        chrome.tabs.query({active:true, currentWindow: true},
        function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "save"});
        });
        
        var opt = {
                type: "basic",
                title: "Input saved!",
                message: "User picked courses and grade input have been saved!",
                iconUrl: "image/saveIcon.png"
                }
        chrome.notifications.create('save', opt);
    });
    
     $('#reset').click(function(){
        chrome.tabs.query({active:true, currentWindow: true},
        function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "reset"});
        });
        
        var opt = {
                type: "basic",
                title: "Input reset!",
                message: "User picked courses and grade input have been reset!",
                iconUrl: "image/resetIcon.png"
                }
        chrome.notifications.create('reset', opt);
    });
    
    $('#export').click(function(){
        chrome.tabs.query({active:true, currentWindow: true},
        function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "export"});
        });
        
        var opt = {
                type: "basic",
                title: "Input exported!",
                message: "User picked courses have been exported to local storage!",
                iconUrl: "image/saveIcon.png"
                }
        chrome.notifications.create('export', opt);
    });
});