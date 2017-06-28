(function () {
    let date = new Date();

    $.ajax({
        url: './comment/',
        type: 'GET',
        data: {contents: 'test',
                date: date},
        dataType: 'json',
    })
        .done(function (json) {
            console.log("success");
            console.log(json);
        })
        .fail(function () {
            console.log("error");
        })
        .always(function () {
            console.log("complete");
        });
})();
