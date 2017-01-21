<?php



Route::get('/', function () {
    return view('app');
});


Route::post('oauth/accees_token', function() {
	return Response::json(Authorizer::issueAccessToken());
});


Route::group(['middleware'=>'oauth'], function() {


	Route::resource('client', 'ClientController', ['except'=>['create', 'edit']]);
	
	Route::group(['middleware'=> 'CheckProjectOwner'], function() {
	
		Route::resource('project', 'ProjectController', ['except'=>['create', 'edit']]);

	});

	Route::group(['prefix'=>'project'], function() {

		Route::get('{id}/note', 'ProjectNoteController@index');
		Route::post('{id}/note', 'ProjectNoteController@store');
		Route::put('{id}/note/{noteId}', 'ProjectNoteController@show');
		Route::delete('note/{id}', 'ProjectNoteController@destroy');

		Route::get('{id}/file', 'ProjectFileController@index');
        Route::get('{id}/file/{fileId}', 'ProjectFileController@show');
        Route::get('{id}/file/{fileId}/download', 'ProjectFileController@showFile');
        Route::post('{id}/file', 'ProjectFileController@store');
        Route::put('{id}/file/{fileId}', 'ProjectFileController@update');
        Route::delete('{id}/file/{fileId}', 'ProjectFileController@destroy');

	});	
});





