function search_movie(){
    $('#movie-list').html('')

    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataTyper: 'json',
        data: {
            'apikey' : '71a6d9cc',
            's': $('#search-input').val()
        },
        success: function(movie){
            if(movie.Response == "True"){
                
                var movies = movie.Search
                $.each(movies, function(i, data){
                    $('#movie-list').append(`
                    <div class="row justify-content-center">
                        <div class="col-md-4 mb-3 ml-3">
                            <div class="card" style="width: 14rem;">
                                <img src="` + data.Poster + `" class="card-img-top" alt="...">
                                <div class="card-body">
                                <h5 class="card-title">` + data.Title + `</h5>
                                <h6 class="card-title">` + data.Year + `</h6>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+data.imdbID+`">Detail</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    `)
                })

                $('#search-input').val()

            }else{
                $('#movie-list').html(`
                    <div class="col">
                        <h1 class="text-center">Movie Not Found</h1>
                    </div>
                `)
            }
        }
    })
}

$('#search-button').on('click', function(){
    search_movie()
})


$('#search-input').on('keyup', function(event){
    if(event.keyCode === 13){
        search_movie()
    }
})

$('#movie-list').on('click', '.see-detail', function(){
    
    // console.log($(this).data('id'))
    $.ajax({
        url: 'http://omdbapi.com',
        dataType: 'json',
        type: 'get',
        data : {
            'apikey' : '71a6d9cc',
            'i': $(this).data('id')
        },
        success : function (detail){
            if(detail.Response === "True"){
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+detail.Poster+`" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item"><h3>`+detail.Title+`</h3></li>
                                <li class="list-group-item"> Released : `+detail.Released+`</li>
                                <li class="list-group-item"> Genre : `+detail.Genre+`</li>
                                <li class="list-group-item"> Director : `+detail.Director+`</li>
                                <li class="list-group-item"> Actors : `+detail.Actors+`</li>
                            </ul>
                            </div>
                        </div
                    </div>
                `)
            }
        }
    })

})