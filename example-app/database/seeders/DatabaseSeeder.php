<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * 
     */
    public function run(): void
    {
        
        User::factory(10)->create();

   
        User::create([
            'name' => 'aya',
            'email' => 'aya@gmail.com',
            'password' => Hash::make('aya2050'), 
        ]);
    }
}

