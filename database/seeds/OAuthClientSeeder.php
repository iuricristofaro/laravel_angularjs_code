<?php

use Illuminate\Database\Seeder;

class OAuthClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('oauth_clients')->insert([
            [
                'id' => 'appid1',
                'secret' => 'secret',
                'name' => 'App AngularJS',
                'created_at' =>  '05/01/2017',
                'updated_at' =>  '05/01/2017',
            ]
        ]);
    }
}
