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
                iconUrl: "saveIcon.png"
                }
        chrome.notifications.create('save', opt, function(){});
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
                iconUrl: "resetIcon.png"
                }
        chrome.notifications.create('save', opt, function(){});
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
                iconUrl: "saveIcon.png"
                }
        chrome.notifications.create('export', opt, function(){});
    });
});