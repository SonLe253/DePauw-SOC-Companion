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
                iconUrl: "saveIcon.png"
            }
            chrome.notifications.create('save', opt);
        }
    
    if (request.action == "resetDOM") {
             var opt = {
                type: "basic",
                title: "Input reset!",
                message: "User picked courses and grade input have been reset!",
                iconUrl: "resetIcon.png"
            }
            chrome.notifications.create('reset', opt);
    }
    
    if (request.action == "updateGrade") {
             var opt = {
                type: "basic",
                title: "Expected GPA updated!",
                message: "User expected GPA has been updated!",
                iconUrl: "saveIcon.png"
            }
            chrome.notifications.create('update', opt);
    }
    
    if (request.action == "availSem"){
        var opt = {
            type: "basic",
            title: "Adjustment period for "+ request.semester + request.schoolYear +" is available!",
            message: "Click this notification to go to adjustment menu page.",
            iconUrl: "saveIcon.png"
        }
        chrome.notifications.create('sem', opt);
    }
});

chrome.notifications.onClicked.addListener(function(thisId){
    if(thisId == 'sem'){
        chrome.tabs.create({url: 'https://my.depauw.edu/e/student/courseadjustments/first_adjust_menu.asp'});}
});