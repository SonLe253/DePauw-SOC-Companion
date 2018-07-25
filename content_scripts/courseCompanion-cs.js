chrome.runtime.sendMessage({action: "show"});

/* TODO (ARRAY VERSION): 
    - Revise code logic
    - Revise updateConflict logic, and fix problem where 2 course conflict, remove 1 but the other still marked red
    - Sync the color between course in toptable w/ coursetable (Done, but still need to fix border color, and in case color change to red)
    - If course offer P/F, tell user in textarea
    - If course is ARR, waitlisted or filled, change state to yellow (where to do this? add course or update table)
*/

//Name Description Params Return
//GG JS Style Guide

var green = '#c8f08c';
var yellow = '#f0e68c';
var red = '#f0b48c';

$('table:nth-child(5) tbody').attr('id','courseTable');//add main table tag //this should be moved to main funct after document.ready tho

//Course constructor
function Course(pSOC, pCrse, pDesc, pCred, pTime, pArea, pCmp, pPf, pCond, pInst, pRoom){ //later get individual Inst Room
    this.SOC = pSOC;
    this.crse = pCrse;
    this.desc = pDesc;
    this.cred = pCred;
    this.time = pTime;
    this.area = pArea;
    this.comp = pCmp;
    this.inst = pInst;
    this.room = pRoom;
    this.pf = pPf;
    this.cond = pCond;
    this.state = green;
    this.lab = false;
    // should i do H/L also?
} 

function injectDOM(){
    //the following lines are for injecting checkboxes
    $('#courseTable tr:nth-child(2)').prepend("<td></td>"); 
    $('#courseTable tr[valign="top"]').each(function(index){
        $(this).attr('id', $('td:nth-child(1)',this).text());
        $(this).prepend("<td></td>");
        $('td:first-child', this).prepend('<input type="checkbox">');
    });
    
    //the following lines are for adding add-in table
    $('body').prepend('<table id="topTable" style="border-collapse:collapse;border-spacing:0"></table>');
    
    $('#topTable').html('<thead><tr><th id="creditCount" colspan="10">Credit selected: 0</th></tr>//<tr style="background-color:#fcff2f;text-align:center"><td>SOC</td><td>Course</td><td>Description</td><td>Credit</td><td>Time</td><td>Area</td><td>Comp</td><td>Instructor</td><td>Room</td><td>Grade</td></tr><tbody id="courseInfo"></tbody>');
    
    $('#topTable td, #topTable th').css({'font-family':'Arial, sans-serif','font-size':'12px','padding':'10px 5px','border-style':'solid','border-width':'1px','border-color':'black','text-align':'center'}); //deleted property: 'word-break':'normal','overflow':'hidden'
}

function checkConflict(time1, time2){
    if(time1.match('ARR') || time2.match('ARR')){
        console.log('ARR check.');
        return false;
    } 
    
    var timeArray1 = time1.split(' ');
    var timeArray2 = time2.split(' ');
    
    var day1= timeArray1[timeArray1.length-1].replace(/\s+/, ''); //replace use regex to remove whitespace
    //console.log(day1); for testing
    var day2= timeArray2[timeArray2.length-1].replace(/\s+/, '').split('');
    //console.log(day2); for testing
    
    var dayConflict = false;
    for(var i=0; i<day2.length;i++){
        if(day1.includes(day2[i])){
            dayConflict = true;
        }
    }
    if(!dayConflict){
        return false;
    }
    
    function timeToDecimal(tString){
        var arr = tString.split(':');
        return parseInt(arr[0])*1 + parseInt(arr[1])/60;
    }
    
    var timeData1 = timeArray1[0].split('-');
    var timeData2 = timeArray2[0].split('-');
    
    var timeStart1 = timeToDecimal(timeData1[0]);
    var timeEnd1 = timeToDecimal(timeData1[1]);
    
    var timeStart2 = timeToDecimal(timeData2[0]);
    var timeEnd2 = timeToDecimal(timeData2[1]);
    
    if(timeStart1 < 8){
        timeStart1 += 12;
        timeEnd1 += 12;
    }
    
    else if(timeEnd1 < 8){
        timeEnd1 +=12;
    }
    
    if(timeStart2 < 8){
        timeStart2 += 12;
        timeEnd2 += 12;
    }
    
    else if(timeStart2 < 8){
        timeEnd2 +=12;
    }
    
    if(timeStart1 === timeStart2 || timeEnd1 === timeEnd2){
        return true;
    }
    else if(timeStart1<timeStart2){
        if(timeEnd1 < timeStart2){return false;}
        else{return true;}
    }
    else{
        if(timeEnd2<timeStart1){return false;}
        else{return true;}
    }
}

//iterate through table, check conflict for each course
function updateConflict(){
    var order = addOrder.length;
    var timeList = [];
    for(var i=0; i < order; i++){
        timeList[i] = $('td:nth-child(5)','#'+ (i+1) +'').text();
    }
    console.log(timeList);
    
    for(var j=0; j < order-1; j++){
        for(var k=j+1; k < order; k++){
            if(checkConflict(timeList[j],timeList[k])){ 
                $('#'+ (j+1)+ ', #' + (k+1)+ '').css('background-color', red);
                //update the state of that course, for now I don't think it is necessary
            }
            /*else{
                if($('#'+ (j+1)+ '').css('background-color') === red){
                    $('#'+ (j+1)+ '').css('background-color', green);
                }
                else if($('#'+ (k+1)+ '').css('background-color') === red){
                    $('#'+ (k+1)+ '').css('background-color', green);
                }
            }*/
            console.log(checkConflict(timeList[j],timeList[k])); //for testing, commented when done
        }
    }
} //have it done, but logic-wise? Also have a problem with coloring, pick 2 conflict and remove one, still have one red

//hard-reset version
function updateCredit(){
    var totalCredit = 0.0;
    $('#courseInfo tr').each(function(){
        if($(this).attr('class') != "lab"){
        totalCredit += parseFloat($('td:nth-child(4)',this).text());
        }
    })
    
    $('#creditCount').html('Credit selected: ' + totalCredit +''); //update the total credit
    if((totalCredit < 3.0 && totalCredit>0)|| totalCredit > 4.5){
        $('#creditCount').css("background-color", red); //not ok
    }
    else if(totalCredit === 0){
        $('#creditCount').css("background-color", '#FFFFFF'); //reset
    }
    else{
        $('#creditCount').css("background-color", green); //ok
    }   
}

var addOrder = [];

function addCourse(tr){
    var courseData = [];
    
    $(tr).children('td').each(function(){
        var data = $(this).text();
        courseData.push(data);
    });
    
    var instRoom = courseData[11].split(/([A-Z][A-Z].*)/);
    
    var course = new Course(courseData[1],courseData[2],courseData[3],courseData[4],courseData[5],
                            courseData[6],courseData[7],courseData[9],courseData[10],instRoom[0],instRoom[1]);
    var labRegex = /(L[A-Z])$/;
    var next = $(tr).next();
    if(labRegex.test($('td:nth-child(2)', next).text())){
        course.lab = true;
        console.log("Class w/ lab");
    }
            
    addOrder.push(course.SOC);
    
    $('#courseInfo').append('<tr id="'+ addOrder.length + '" style="background-color:'+ course.state + '"><td><button>' + course.SOC + 
                                '</button></td><td>'+ course.crse + '</td><td>' + course.desc + '</td><td>' + course.cred + '</td><td>' + course.time + 
                                '</td><td>' + course.area + '</td><td>' + course.comp + '</td><td>' + course.inst + '</td><td>' + course.room + '</td><td></td></tr>');
        
        $('#'+ addOrder.length +' button').click(function(){
            $(tr)[0].scrollIntoView();
        })
        $(tr).css('background-color', course.state);
        
        
        if(course.lab){
            addOrder.push(course.SOC+' lab');
            console.log("Add lab");
            //value.labTime = next.children(':nth-child(5)').text(); left here just in case if need lab time
            
            $('#courseInfo').append('<tr id="'+ addOrder.length + '" class="lab" style="background-color:'+ course.state + '"><td>' +
                                    next.children(':nth-child(2)').text() +'</td><td></td><td>'+ next.children(':nth-child(3)').text() +'</td><td></td><td>' +
                                    next.children(':nth-child(5)').text() + '</td><td></td><td></td><td></td><td>' + 
                                    next.children(':nth-child(10)').text() + '</td><td></td></tr>');
            next.css({'background-color': course.state, 'border-color': course.state});
        }
     $('#courseInfo td').css({'font-family':'Arial, sans-serif','font-size':'12px','padding':'10px 5px','border-style':'solid','border-width':'1px','overflow':'hidden','border-color':'black'});
}

function removeCourse(tr){
    var id = $(tr).attr('id');
    var index = addOrder.indexOf(id);
    //console.log(addOrder.indexOf(id));
    
    //lab situation
    if($(tr).next().children().text() != ''){
        $('#'+ (addOrder.indexOf(id) +1).toString() +'').remove();
        $('#'+ (addOrder.indexOf(id) +2).toString() +'').remove();
        addOrder.splice(index,2);
        console.log(addOrder);
        $(tr).next().css('background-color', 'white');
    }
    else{
        $('#'+ (addOrder.indexOf(id) +1).toString() +'').remove();
        addOrder.splice(index,1);
        console.log(addOrder);
    }
    //uncolor checked box tr
    $(tr).css('background-color', 'white');
    //if there is a lab, then uncolor it too
    
    
    var reOrd = 1;
    $('#courseInfo tr').each(function(){
        $(this).attr('id', reOrd.toString());
        reOrd++;
    })
}

function checkCB(){
    $("input:checkbox").change(function(){
        var tr = $(this).closest('tr');
        if(this.checked){
            addCourse(tr);
            //console.log(addOrder);
            updateConflict();
            updateCredit();
        }
        else{
            removeCourse(tr);
            updateConflict();
            updateCredit();
        }
    });
}

$(document).ready(function(){
    injectDOM();
    checkCB();
})

/*how to find lab for courses that have lab?
    - if Next <tr td:nth-child(2)> matches /LA$/, add that <tr> into table
    - if the 4th <tr> have an id, then next <tr> will be lab, add it to table
    - add id for lab (necessary? consider running time)
*/


