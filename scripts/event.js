//Event page: Content script event listeners.
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action == "show") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.pageAction.show(tabs[0].id);
        });
    }
    
    if (request.action == "saveDOM") {
             var opt = {
                type: "basic",
                title: "Input saved!",
                message: "User picked courses and grade input have been saved!",
                iconUrl: "image/saveIcon.png"
            }
            chrome.notifications.create('save', opt);
        }
    
    if (request.action == "resetDOM") {
             var opt = {
                type: "basic",
                title: "Input reset!",
                message: "User picked courses and grade input have been reset!",
                iconUrl: "image/resetIcon.png"
            }
            chrome.notifications.create('reset', opt);
    }
    
    if (request.action == "updateGrade") {
             var opt = {
                type: "basic",
                title: "Expected GPA updated!",
                message: "User expected GPA has been updated!",
                iconUrl: "image/saveIcon.png"
            }
            chrome.notifications.create('update', opt);
    }
    
    if (request.action == "loaded") {
             var opt = {
                type: "basic",
                title: "Input loaded!",
                message: "User picked courses and grade input from previous sessions have been loaded!",
                iconUrl: "image/saveIcon.png"
            }
            chrome.notifications.create('loaded', opt);
    }
    
    if (request.action == "availSem"){
        var opt = {
            type: "basic",
            title: "Adjustment period for "+ request.semester + request.schoolYear +" is available!",
            message: "Click this notification to go to adjustment menu page.",
            iconUrl: "image/saveIcon.png"
        }
        chrome.notifications.create('sem', opt);
    }
    
    if (request.action == "availLogin"){
        var opt = {
            type: "basic",
            title: "Adjustment period is available!",
            message: "Login to e-Services to see the available adjustment period.",
            iconUrl: "image/saveIcon.png"
        }
        chrome.notifications.create('login', opt);
    }
});

chrome.notifications.onClicked.addListener(function(thisId){
    if(thisId == 'sem'){
        chrome.tabs.create({url: 'https://my.depauw.edu/e/student/courseadjustments/first_adjust_menu.asp'});}
});