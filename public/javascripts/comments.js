$(document).ready(function() {
    $("#postComment").click(function() {
        var myobj = { Name: $("#name").val(), Comment: $("#comment").val() };
        var jobj = JSON.stringify(myobj);
        $("#json").text(jobj);
        var url = "comment";
        $.ajax({
            url: url,
            type: "POST",
            data: jobj,
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus) {
                $("#done").html(textStatus);
            }
        })
        $("#name").val("");
        $("#comment").val("");
    });
    $("#getComments").click(function() {
        $("#name").html("");
        $("#comment").html("");
        $.getJSON('comment', function(data) {
            console.log(data);
            var everything = "<ul>";
            for (var comment in data) {
                var com = data[comment];
                everything += "<li> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
            }
            everything += "</ul>";
            $("#comments").html(everything);
        })
    })
    $("#deleteComments").click(function() {
        $("#comments").html("");
        $.ajax({
            url: "/delete",
            type: "DELETE",
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus) {
                $("#done").html(textStatus);
            }
        })
    })
    $("#searchButton").click(function() {
        console.log($("#name").val());
       // var data = JSON.stringify({ Name: $("#name").val(), Comment: $("#comment").val() });
        $.ajax({
            url: "/search",
            type: "GET",
            data: {str:$("#name").val()},
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus) {
                console.log(data);
            var everything = "<ul>";
            for (var comment in data) {
                var com = data[comment];
                everything += "<li> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
            }
            everything += "</ul>";
            $("#queryResults").html(everything);
            }
        })
        $("#name").html("");
        $("#comment").html("");
        $("#queryResults").html("");
    })

});
