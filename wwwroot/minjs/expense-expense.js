var expensemodule=angular.module("app-mps",[]);expensemodule.controller("expense-expense",["$scope","$http",function(o,a){var t=[];o.wait=!0,a.get("/Expense/LoadExpenseHeaders").then(function(e){t=e.data,o.ExpenseHeaderList=t,o.wait=!1},function(e){alert(e.statusText),o.wait=!1}),o.changed=function(){o.ExpenseHeaderList=o.searchtext?performfilter(o.searchtext):t},performfilter=function(e){return filterby=e.toLocaleLowerCase(),t.filter(function(e){return-1!=e.expenseHeaderName.toLocaleLowerCase().indexOf(filterby)})},o.getExpense=function(e,t,n){var a=(i=new Date).getDate(),s=i.getMonth()+1;a<10&&(a="0"+a),s<10&&(s="0"+s);var i,r={expenseId:e,expenseName:t,expenseDesc:n,expenseDate:i=a+"-"+s+"-"+i.getFullYear(),studentSlabLinkedId:0};o.expense=r,o.studentList=[]},o.getStudents=function(){o.wait=!0,a.get("/Expense/LoadStudentListForExpense").then(function(e){var n=[];n.push({studentSlabId:0,studentName:"No linked student"}),$.each(e.data.students,function(e,t){n.push(t)}),o.studentList=n,o.wait=!1},function(e){alert("Could not load student list\n"+e.statusText),o.wait=!1})},o.addExpense=function(){o.wait=!0;var e=new Date(Number($("#expenseDate").val().split("-")[2]),Number($("#expenseDate").val().split("-")[1])-1,Number($("#expenseDate").val().split("-")[0])+1,0,0,0).toUTCString();if(o.expense.expenseDate=e,0<$("#expenseAttachment1").val().length){$("#fileicon1").html('<i class="fa fa-refresh fa-spin"></i>');var t=document.getElementById("expenseAttachment1").files[0],n=new FileReader;n.addEventListener("load",function(){o.expense.expenseAttachment1=t.name+"~"+n.result,$("#fileicon1").html(""),a.post("/Expense/AddExpense",o.expense).then(function(e){e.data.res?(o.wait=!1,alert(e.data.status),window.location.reload(!0)):(o.wait=!1,alert(e.data.status+"\n"+e.data.errors))},function(e){o.wait=!1,alert(e.statusText)})},!1),t&&n.readAsDataURL(t)}else a.post("/Expense/AddExpense",o.expense).then(function(e){e.data.res?(o.wait=!1,alert(e.data.status),window.location.reload()):(o.wait=!1,alert(e.data.status+"\n"+e.data.errors))},function(e){o.wait=!1,alert(e.statusText)})}}]);